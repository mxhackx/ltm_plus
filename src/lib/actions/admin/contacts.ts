"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/actions/admin/auth";

export async function getContacts() {
  await requireAdmin();

  return prisma.contact.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function deleteContact(id: number) {
  await requireAdmin();

  await prisma.contact.delete({
    where: {
      id,
    },
  });

  revalidatePath("/admin/contacts");
}