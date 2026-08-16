"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import {
  requireAdmin,
} from "@/lib/actions/admin/auth";

import bcrypt from "bcryptjs";

// ============================================================
// CREER UN ADMIN
// ============================================================
export type CreateAdminState = {
  success: boolean;
  message: string;
};

export async function createAdmin(
  previousState: CreateAdminState,
  formData: FormData
): Promise<CreateAdminState> {
  try {
    // ----------------------------------------------------------
    // Vérifier que l'utilisateur actuel est admin
    // ----------------------------------------------------------

    await requireAdmin();

    // ----------------------------------------------------------
    // Récupérer les données
    // ----------------------------------------------------------

    const firstName = String(
      formData.get("firstName") ?? ""
    ).trim();

    const lastName = String(
      formData.get("lastName") ?? ""
    ).trim();

    const email = String(
      formData.get("email") ?? ""
    )
      .trim()
      .toLowerCase();

    const password = String(
      formData.get("password") ?? ""
    );

    // ----------------------------------------------------------
    // Validation
    // ----------------------------------------------------------

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password
    ) {
      return {
        success: false,
        message:
          "Tous les champs sont obligatoires.",
      };
    }

    if (password.length < 8) {
      return {
        success: false,
        message:
          "Le mot de passe doit contenir au moins 8 caractères.",
      };
    }

    // ----------------------------------------------------------
    // Vérifier si l'email existe déjà
    // ----------------------------------------------------------

    const existingAdmin =
      await prisma.admin.findUnique({
        where: {
          email,
        },
        select: {
          id: true,
        },
      });

    if (existingAdmin) {
      return {
        success: false,
        message:
          "Un administrateur avec cet email existe déjà.",
      };
    }

    // ----------------------------------------------------------
    // Hash du mot de passe
    // ----------------------------------------------------------

    const passwordHash =
      await bcrypt.hash(password, 12);

    // ----------------------------------------------------------
    // Créer l'admin
    // ----------------------------------------------------------

    await prisma.admin.create({
      data: {
        firstName,
        lastName,
        email,
        passwordHash,
      },
    });

    // ----------------------------------------------------------
    // Rafraîchir
    // ----------------------------------------------------------

    revalidatePath("/admin/admins");

    return {
      success: true,
      message:
        "L'administrateur a été créé avec succès.",
    };
  } catch (error) {
    console.error(
      "CREATE_ADMIN_ERROR:",
      error
    );

    return {
      success: false,
      message:
        "Impossible de créer l'administrateur.",
    };
  }
}
// ============================================================
// RECUPERER TOUS LES ADMINS
// ============================================================

export async function getAdmins() {
  await requireAdmin();

  const admins =
    await prisma.admin.findMany({
      orderBy: {
        createdAt: "desc",
      },

      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        createdAt: true,
      },
    });

  return admins;
}

// ============================================================
// SUPPRIMER UN ADMIN
// ============================================================

export async function deleteAdmin(
  formData: FormData
) {
  const currentAdmin =
    await requireAdmin();

  const adminId =
    Number(
      formData.get("adminId")
    );

  // ----------------------------------------------------------
  // Validation
  // ----------------------------------------------------------

  if (!Number.isInteger(adminId)) {
    throw new Error(
      "Administrateur invalide."
    );
  }

  // ----------------------------------------------------------
  // Empêcher l'admin de supprimer son propre compte
  // ----------------------------------------------------------

  if (adminId === currentAdmin.id) {
    throw new Error(
      "Vous ne pouvez pas supprimer votre propre compte."
    );
  }

  // ----------------------------------------------------------
  // Vérifier que l'admin existe
  // ----------------------------------------------------------

  const admin =
    await prisma.admin.findUnique({
      where: {
        id: adminId,
      },

      select: {
        id: true,
      },
    });

  if (!admin) {
    throw new Error(
      "Administrateur introuvable."
    );
  }

  // ----------------------------------------------------------
  // Supprimer l'admin
  // ----------------------------------------------------------

  await prisma.admin.delete({
    where: {
      id: adminId,
    },
  });

  // ----------------------------------------------------------
  // Rafraîchir
  // ----------------------------------------------------------

  revalidatePath("/admin/admins");

  return {
    success: true,
  };
}