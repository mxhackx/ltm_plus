"use server";

import { revalidatePath } from "next/cache";

import { getCurrentUser } from "@/lib/actions/auth";
import { prisma } from "@/lib/prisma";

// ============================================================
// RÉCUPÉRER LES COMMANDES DE L'UTILISATEUR
// ============================================================

export async function getCurrentUserOrders() {
  const user = await getCurrentUser();

  if (!user) {
    return [];
  }

  const orders = await prisma.order.findMany({
    where: {
      userId: user.id,
    },

    include: {
      items: {
        include: {
          product: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return orders.map((order) => ({
    id: order.id,

    date: order.createdAt.toISOString(),

    updatedAt: order.updatedAt.toISOString(),

    total: order.totalPrice,

    status: order.status,

    fullName: order.fullName,

    phone: order.phone,

    address: order.address,

    items: order.items.map((item) => ({
      id: item.id,

      quantity: item.quantity,

      price: item.unitPrice,

      name: item.product.name,

      category: item.product.category,

      description: item.product.description,

      dimensions: item.product.dimensions,
    })),
  }));
}

// ============================================================
// RÉCUPÉRER UNE COMMANDE
// ============================================================

export async function getOrderById(orderId: number) {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const order = await prisma.order.findFirst({
    where: {
      id: orderId,

      // IMPORTANT :
      // empêche un utilisateur de consulter
      // la commande d'un autre utilisateur
      userId: user.id,
    },

    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!order) {
    return null;
  }

  return {
    id: order.id,

    date: order.createdAt.toISOString(),

    updatedAt: order.updatedAt.toISOString(),

    total: order.totalPrice,

    status: order.status,

    fullName: order.fullName,

    phone: order.phone,

    address: order.address,

    items: order.items.map((item) => ({
      id: item.id,

      quantity: item.quantity,

      unitPrice: item.unitPrice,

      product: {
        id: item.product.id,

        name: item.product.name,

        price: item.product.price,

        wasPrice: item.product.wasPrice,

        dimensions: item.product.dimensions,

        category: item.product.category,

        description: item.product.description,
      },
    })),
  };
}

// ============================================================
// SUPPRIMER UNE COMMANDE
// ============================================================

export async function deleteOrder(orderId: number) {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Utilisateur non connecté.");
  }

  // Vérification de propriété
  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      userId: user.id,
    },

    select: {
      id: true,
    },
  });

  if (!order) {
    throw new Error(
      "Commande introuvable ou accès refusé."
    );
  }

  // Les OrderItem doivent être supprimés
  // avant la commande.

  await prisma.orderItem.deleteMany({
    where: {
      orderId: order.id,
    },
  });

  await prisma.order.delete({
    where: {
      id: order.id,
    },
  });

  revalidatePath("/dashboard");

  revalidatePath(
    `/dashboard/orders/${orderId}`
  );
}

// ============================================================
// SUPPRIMER LE COMPTE
// ============================================================

export async function deleteCurrentUser() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Utilisateur non connecté.");
  }

  await prisma.$transaction(async (tx) => {
    // --------------------------------------------------------
    // 1. Récupérer les commandes
    // --------------------------------------------------------

    const orders = await tx.order.findMany({
      where: {
        userId: user.id,
      },

      select: {
        id: true,
      },
    });

    const orderIds = orders.map(
      (order) => order.id
    );

    // --------------------------------------------------------
    // 2. Supprimer les OrderItem
    // --------------------------------------------------------

    if (orderIds.length > 0) {
      await tx.orderItem.deleteMany({
        where: {
          orderId: {
            in: orderIds,
          },
        },
      });
    }

    // --------------------------------------------------------
    // 3. Supprimer les commandes
    // --------------------------------------------------------

    await tx.order.deleteMany({
      where: {
        userId: user.id,
      },
    });

    // --------------------------------------------------------
    // 4. Supprimer les sessions
    // --------------------------------------------------------

    await tx.session.deleteMany({
      where: {
        userId: user.id,
      },
    });

    // --------------------------------------------------------
    // 5. Supprimer le profil
    // --------------------------------------------------------

    await tx.profile.delete({
      where: {
        id: user.id,
      },
    });
  });

  revalidatePath("/account");

  return {
    success: true,
  };
}