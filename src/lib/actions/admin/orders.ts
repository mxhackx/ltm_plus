"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/actions/admin/auth";

export async function getOrders() {
  await requireAdmin();

  return prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },

    include: {
      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      },

      items: {
        orderBy: {
          id: "asc",
        },

        select: {
          id: true,
          quantity: true,
          unitPrice: true,

          product: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });
}

export async function updateOrderStatus(
  orderId: number,
  status:
    | "PENDING"
    | "CONFIRMED"
    | "DELIVERED"
    | "CANCELLED"
) {
  await requireAdmin();

  await prisma.order.update({
    where: {
      id: orderId,
    },

    data: {
      status,
    },
  });

  revalidatePath("/admin/orders");
  revalidatePath("/admin/clients");
}