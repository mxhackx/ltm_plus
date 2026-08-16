"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

// ======================================================
// TYPE DONNEES UTILISATEUR
// ======================================================

type CreateUserData = {
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  password: string;
};

// ======================================================
// CREATION UTILISATEUR
// ======================================================

export async function createUser(
  data: CreateUserData
) {
  try {
    // ====================================================
    // NORMALISATION
    // ====================================================

    const firstName =
      data.firstName.trim();

    const lastName =
      data.lastName.trim();

    const email =
      data.email
        .trim()
        .toLowerCase();

    const telephone =
      data.telephone.trim();

    const password =
      data.password;

    // ====================================================
    // VALIDATION CHAMPS
    // ====================================================

    if (
      !firstName ||
      !lastName ||
      !email ||
      !telephone ||
      !password
    ) {
      return {
        success: false,
        error:
          "Veuillez remplir tous les champs.",
      };
    }

    // ====================================================
    // VALIDATION MOT DE PASSE
    // ====================================================

    if (password.length < 8) {
      return {
        success: false,
        error:
          "Le mot de passe doit contenir au moins 8 caractères.",
      };
    }

    // ====================================================
    // VERIFICATION EMAIL EXISTANT
    // ====================================================

    const existingUser =
      await prisma.profile.findUnique({
        where: {
          email,
        },
      });

    if (existingUser) {
      return {
        success: false,
        error:
          "Un compte existe déjà avec cette adresse email.",
      };
    }

    // ====================================================
    // HASH MOT DE PASSE
    // ====================================================

    const passwordHash =
      await bcrypt.hash(
        password,
        12
      );

    // ====================================================
    // CREATION UTILISATEUR
    // ====================================================

    const user =
      await prisma.profile.create({
        data: {
          firstName,
          lastName,
          email,
          telephone,
          passwordHash,
        },
      });

    // ====================================================
    // REPONSE
    // ====================================================

    return {
      success: true,

      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        telephone: user.telephone,
      },
    };
  } catch (error) {
    // ====================================================
    // EMAIL DEJA UTILISE
    // ====================================================

    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return {
        success: false,
        error:
          "Un compte existe déjà avec cette adresse email.",
      };
    }

    // ====================================================
    // ERREUR GENERALE
    // ====================================================

    console.error(
      "CREATE_USER_ERROR:",
      error
    );

    return {
      success: false,
      error:
        "Impossible de créer votre compte.",
    };
  }
}