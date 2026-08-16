"use server";

import { revalidatePath } from "next/cache";
import { put } from "@vercel/blob";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/actions/admin/auth";

// ============================================================
// TYPES / CONSTANTS
// ============================================================

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
];

// ============================================================
// GET PRODUCTS
// ============================================================

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

// ============================================================
// GET PRODUCT
// ============================================================

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

  // ==========================================================
  // RECUPERATION DES CHAMPS
  // ==========================================================

  const name = String(
    formData.get("name") || ""
  ).trim();

  const priceValue = String(
    formData.get("price") || ""
  ).trim();

  const wasPriceValue = String(
    formData.get("wasPrice") || ""
  ).trim();

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

  // ==========================================================
  // VALIDATION NOM
  // ==========================================================

  if (!name) {
    throw new Error(
      "Le nom du produit est obligatoire."
    );
  }

  // ==========================================================
  // VALIDATION PRIX
  // ==========================================================

  const price = Number(priceValue);

  if (
    !Number.isInteger(price) ||
    price < 0
  ) {
    throw new Error(
      "Le prix du produit est invalide."
    );
  }

  // ==========================================================
  // VALIDATION ANCIEN PRIX
  // ==========================================================

  let wasPrice: number | null = null;

  if (wasPriceValue !== "") {
    wasPrice = Number(wasPriceValue);

    if (
      !Number.isInteger(wasPrice) ||
      wasPrice < 0
    ) {
      throw new Error(
        "L'ancien prix est invalide."
      );
    }

    if (wasPrice <= price) {
      throw new Error(
        "L'ancien prix doit être supérieur au prix actuel."
      );
    }
  }

  // ==========================================================
  // VALIDATION DIMENSIONS
  // ==========================================================

  if (!dimensions) {
    throw new Error(
      "Les dimensions sont obligatoires."
    );
  }

  // ==========================================================
  // VALIDATION CATEGORIE
  // ==========================================================

  if (!category) {
    throw new Error(
      "La catégorie est obligatoire."
    );
  }

  // ==========================================================
  // VALIDATION DESCRIPTION
  // ==========================================================

  if (!description) {
    throw new Error(
      "La description est obligatoire."
    );
  }

  // ==========================================================
  // IMAGE
  // ==========================================================

  let imageUrl: string | undefined;

  if (image instanceof File && image.size > 0) {
    // --------------------------------------------------------
    // TYPE
    // --------------------------------------------------------

    if (!ALLOWED_IMAGE_TYPES.includes(image.type)) {
      throw new Error(
        "Format d'image non supporté. Utilisez JPG, PNG, WEBP ou AVIF."
      );
    }

    // --------------------------------------------------------
    // TAILLE
    // --------------------------------------------------------

    if (image.size > MAX_IMAGE_SIZE) {
      throw new Error(
        "L'image ne doit pas dépasser 5 Mo."
      );
    }

    // --------------------------------------------------------
    // EXTENSION
    // --------------------------------------------------------

    const extension =
      getImageExtension(image.type);

    // --------------------------------------------------------
    // NOM DU FICHIER
    // --------------------------------------------------------

    const fileName =
      `products/product-${id}-${crypto.randomUUID()}${extension}`;

    // --------------------------------------------------------
    // UPLOAD VERCEL BLOB
    // --------------------------------------------------------

    const blob = await put(
      fileName,
      image,
      {
        access: "public",
      }
    );

    // --------------------------------------------------------
    // URL
    // --------------------------------------------------------

    imageUrl = blob.url;
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
  // REVALIDATION
  // ==========================================================

  revalidatePath(
    "/admin/products"
  );

  revalidatePath(
    `/admin/products/${id}/edit`
  );

  revalidatePath(
    "/catalog"
  );

  // ==========================================================
  // RETURN
  // ==========================================================

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
): string {
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