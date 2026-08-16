import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";
import { requireAdmin } from "@/lib/actions/admin/auth";

const adapter = new PrismaPg({
  connectionString: process.env.STORAGE_DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        id: "asc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("GET_PRODUCTS_ERROR:", error);

    return NextResponse.json(
      {
        error: "Impossible de récupérer les produits.",
      },
      {
        status: 500,
      }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const formData = await request.formData();

    const name = formData.get("name");
    const price = formData.get("price");
    const wasPrice = formData.get("wasPrice");
    const dimensions = formData.get("dimensions");
    const category = formData.get("category");
    const description = formData.get("description");
    const image = formData.get("image");

    // ======================================================
    // VALIDATION DES CHAMPS
    // ======================================================

    if (
      typeof name !== "string" ||
      typeof price !== "string" ||
      typeof dimensions !== "string" ||
      typeof category !== "string" ||
      typeof description !== "string"
    ) {
      return NextResponse.json(
        {
          error: "Données du formulaire invalides.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !name.trim() ||
      !dimensions.trim() ||
      !category.trim() ||
      !description.trim()
    ) {
      return NextResponse.json(
        {
          error: "Tous les champs obligatoires doivent être renseignés.",
        },
        {
          status: 400,
        }
      );
    }

    // ======================================================
    // VALIDATION DU PRIX
    // ======================================================

    const parsedPrice = Number(price);

    if (!Number.isInteger(parsedPrice) || parsedPrice < 0) {
      return NextResponse.json(
        {
          error: "Le prix doit être un nombre entier positif.",
        },
        {
          status: 400,
        }
      );
    }

    let parsedWasPrice: number | null = null;

    if (
      typeof wasPrice === "string" &&
      wasPrice.trim() !== ""
    ) {
      parsedWasPrice = Number(wasPrice);

      if (
        !Number.isInteger(parsedWasPrice) ||
        parsedWasPrice < 0
      ) {
        return NextResponse.json(
          {
            error: "L'ancien prix doit être un nombre entier positif.",
          },
          {
            status: 400,
          }
        );
      }

      if (parsedWasPrice <= parsedPrice) {
        return NextResponse.json(
          {
            error:
              "L'ancien prix doit être supérieur au prix actuel.",
          },
          {
            status: 400,
          }
        );
      }
    }

    // ======================================================
    // VALIDATION IMAGE
    // ======================================================

    if (!(image instanceof File)) {
      return NextResponse.json(
        {
          error: "Une image est obligatoire.",
        },
        {
          status: 400,
        }
      );
    }

    if (image.size === 0) {
      return NextResponse.json(
        {
          error: "L'image sélectionnée est vide.",
        },
        {
          status: 400,
        }
      );
    }

    if (image.size > MAX_IMAGE_SIZE) {
      return NextResponse.json(
        {
          error: "L'image ne doit pas dépasser 5 Mo.",
        },
        {
          status: 400,
        }
      );
    }

    if (!ALLOWED_IMAGE_TYPES.includes(image.type)) {
      return NextResponse.json(
        {
          error: "Format d'image non autorisé. Utilisez JPG, PNG ou WEBP.",
        },
        {
          status: 400,
        }
      );
    }

    // ======================================================
    // UPLOAD VERCEL BLOB
    // ======================================================

    const extension =
      image.type === "image/jpeg"
        ? "jpg"
        : image.type.split("/")[1];

    const safeName = name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const fileName = `products/${safeName}-${crypto.randomUUID()}.${extension}`;

    const blob = await put(fileName, image, {
      access: "public",
    });

    // ======================================================
    // CREATION PRODUIT
    // ======================================================

    const product = await prisma.product.create({
      data: {
        name: name.trim(),
        price: parsedPrice,
        wasPrice: parsedWasPrice,
        dimensions: dimensions.trim(),
        category: category.trim(),
        description: description.trim(),
        imageUrl: blob.url,
      },
    });

    return NextResponse.json(
      {
        message: "Produit créé avec succès.",
        product,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("CREATE_PRODUCT_ERROR:", error);

    return NextResponse.json(
      {
        error: "Impossible de créer le produit.",
      },
      {
        status: 500,
      }
    );
  } finally {
    await prisma.$disconnect();
  }
}