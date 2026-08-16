"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/actions/admin/auth";

export async function getClients() {
  await requireAdmin();

  return prisma.profile.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      orders: {
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          totalPrice: true,
          status: true,
          createdAt: true,
        },
      },
    },
  });
}