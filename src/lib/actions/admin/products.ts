"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/actions/admin/auth";

import fs from "fs/promises";
import path from "path";

export async function getProducts() {
  await requireAdmin();

  return prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },

    include: {
      orderItems: {
        select: {
          id: true,
          quantity: true,
        },
      },
    },
  });
}

export async function getProduct(id: number) {
  await requireAdmin();

  return prisma.product.findUnique({
    where: {
      id,
    },
  });
}

// ============================================================
// UPDATE PRODUCT
// ============================================================

export async function updateProduct(
  id: number,
  formData: FormData
) {
  await requireAdmin();

  const name = String(
    formData.get("name") || ""
  ).trim();

  const price = Number(
    formData.get("price")
  );

  const wasPriceValue = String(
    formData.get("wasPrice") || ""
  ).trim();

  const wasPrice = wasPriceValue
    ? Number(wasPriceValue)
    : null;

  const dimensions = String(
    formData.get("dimensions") || ""
  ).trim();

  const category = String(
    formData.get("category") || ""
  ).trim();

  const description = String(
    formData.get("description") || ""
  ).trim();

  const image = formData.get("image");

  if (!name) {
    throw new Error(
      "Le nom du produit est obligatoire."
    );
  }

  if (!Number.isFinite(price) || price < 0) {
    throw new Error(
      "Le prix du produit est invalide."
    );
  }

  if (!dimensions) {
    throw new Error(
      "Les dimensions sont obligatoires."
    );
  }

  if (!category) {
    throw new Error(
      "La catégorie est obligatoire."
    );
  }

  if (!description) {
    throw new Error(
      "La description est obligatoire."
    );
  }

  // ==========================================================
  // IMAGE
  // ==========================================================

  let imageUrl: string | undefined;

  if (
    image instanceof File &&
    image.size > 0
  ) {
    // --------------------------------------------------------
    // Vérifier le type
    // --------------------------------------------------------

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/avif",
    ];

    if (!allowedTypes.includes(image.type)) {
      throw new Error(
        "Format d'image non supporté."
      );
    }

    // --------------------------------------------------------
    // Vérifier la taille
    // --------------------------------------------------------

    if (image.size > 5 * 1024 * 1024) {
      throw new Error(
        "L'image ne doit pas dépasser 5 Mo."
      );
    }

    // --------------------------------------------------------
    // Extension
    // --------------------------------------------------------

    const extension =
      getImageExtension(image.type);

    // --------------------------------------------------------
    // Nom sécurisé
    // --------------------------------------------------------

    const fileName =
      `product-${id}-${Date.now()}${extension}`;

    // --------------------------------------------------------
    // Dossier public/products
    // --------------------------------------------------------

    const productsDirectory =
      path.join(
        process.cwd(),
        "public",
        "products"
      );

    await fs.mkdir(
      productsDirectory,
      {
        recursive: true,
      }
    );

    // --------------------------------------------------------
    // Chemin complet
    // --------------------------------------------------------

    const filePath =
      path.join(
        productsDirectory,
        fileName
      );

    // --------------------------------------------------------
    // Sauvegarder le fichier
    // --------------------------------------------------------

    const bytes =
      await image.arrayBuffer();

    const buffer =
      Buffer.from(bytes);

    await fs.writeFile(
      filePath,
      buffer
    );

    // --------------------------------------------------------
    // URL publique
    // --------------------------------------------------------

    imageUrl =
      `/products/${fileName}`;
  }

  // ==========================================================
  // UPDATE DATABASE
  // ==========================================================

  const product =
    await prisma.product.update({
      where: {
        id,
      },

      data: {
        name,
        price,
        wasPrice,
        dimensions,
        category,
        description,

        ...(imageUrl
          ? {
              imageUrl,
            }
          : {}),
      },
    });

  // ==========================================================
  // REVALIDATE
  // ==========================================================

  revalidatePath(
    "/admin/products"
  );

  revalidatePath(
    `/admin/products/${id}/edit`
  );

  return {
    success: true,
    imageUrl: product.imageUrl,
  };
}

// ============================================================
// IMAGE EXTENSION
// ============================================================

function getImageExtension(
  mimeType: string
) {
  switch (mimeType) {
    case "image/jpeg":
      return ".jpg";

    case "image/png":
      return ".png";

    case "image/webp":
      return ".webp";

    case "image/avif":
      return ".avif";

    default:
      throw new Error(
        "Format d'image non supporté."
      );
  }
}