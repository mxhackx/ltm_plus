"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { cookies } from "next/headers";

// ======================================================
// CONFIGURATION
// ======================================================

const SESSION_COOKIE = "session_token";

const SESSION_DURATION =
  1000 * 60 * 60 * 24 * 30; // 30 jours

// ======================================================
// TYPE UTILISATEUR
// ======================================================

export type AuthUser = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
};

// ======================================================
// TYPE REPONSE AUTH
// ======================================================

type AuthResponse =
  | {
      success: true;
      user: AuthUser;
    }
  | {
      success: false;
      error: string;
    };

// ======================================================
// FORMAT USER
// ======================================================

function formatAuthUser(user: {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
}): AuthUser {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    telephone: user.telephone,
  };
}

// ======================================================
// CREATION SESSION
// ======================================================

async function createSession(userId: number) {
  // ====================================================
  // GENERATION TOKEN
  // ====================================================

  const token = crypto
    .randomBytes(32)
    .toString("hex");

  // ====================================================
  // EXPIRATION
  // ====================================================

  const expiresAt = new Date(
    Date.now() + SESSION_DURATION
  );

  // ====================================================
  // CREATION SESSION EN DB
  // ====================================================

  // IMPORTANT :
  // Dans Prisma, Session ne possède pas de champ "token".
  // Le token est stocké directement dans "id".

  await prisma.session.create({
    data: {
      id: token,
      userId,
      expiresAt,
    },
  });

  // ====================================================
  // CREATION COOKIE
  // ====================================================

  const cookieStore = await cookies();

  cookieStore.set({
    name: SESSION_COOKIE,
    value: token,
    httpOnly: true,
    secure:
      process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });

  return token;
}

// ======================================================
// INSCRIPTION
// ======================================================

export async function registerUser(data: {
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  password: string;
  confirmPassword: string;
}): Promise<AuthResponse> {
  try {
    // ====================================================
    // NORMALISATION
    // ====================================================

    const firstName =
      data.firstName.trim();

    const lastName =
      data.lastName.trim();

    const email =
      data.email.trim().toLowerCase();

    const telephone =
      data.telephone.trim();

    const password =
      data.password;

    const confirmPassword =
      data.confirmPassword;

    // ====================================================
    // VALIDATION CHAMPS
    // ====================================================

    if (
      !firstName ||
      !lastName ||
      !email ||
      !telephone ||
      !password ||
      !confirmPassword
    ) {
      return {
        success: false,
        error:
          "Veuillez remplir tous les champs.",
      };
    }

    // ====================================================
    // VALIDATION EMAIL
    // ====================================================

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return {
        success: false,
        error:
          "Veuillez entrer une adresse email valide.",
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

    if (password !== confirmPassword) {
      return {
        success: false,
        error:
          "Les mots de passe ne correspondent pas.",
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
    // HASH PASSWORD
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
    // CREATION SESSION
    // ====================================================

    await createSession(user.id);

    // ====================================================
    // REPONSE
    // ====================================================

    return {
      success: true,
      user: formatAuthUser(user),
    };
  } catch (error) {
    console.error(
      "REGISTER_USER_ERROR:",
      error
    );

    return {
      success: false,
      error:
        "Impossible de créer votre compte.",
    };
  }
}

// ======================================================
// CONNEXION
// ======================================================

export async function loginUser(data: {
  email: string;
  password: string;
}): Promise<AuthResponse> {
  try {
    // ====================================================
    // NORMALISATION
    // ====================================================

    const email =
      data.email.trim().toLowerCase();

    const password =
      data.password;

    // ====================================================
    // VALIDATION
    // ====================================================

    if (!email || !password) {
      return {
        success: false,
        error:
          "Veuillez remplir tous les champs.",
      };
    }

    // ====================================================
    // RECHERCHE UTILISATEUR
    // ====================================================

    const user =
      await prisma.profile.findUnique({
        where: {
          email,
        },
      });

    if (!user) {
      return {
        success: false,
        error:
          "Email ou mot de passe incorrect.",
      };
    }

    // ====================================================
    // VERIFICATION PASSWORD
    // ====================================================

    const passwordValid =
      await bcrypt.compare(
        password,
        user.passwordHash
      );

    if (!passwordValid) {
      return {
        success: false,
        error:
          "Email ou mot de passe incorrect.",
      };
    }

    // ====================================================
    // SUPPRESSION SESSIONS EXPIREES
    // ====================================================

    await prisma.session.deleteMany({
      where: {
        userId: user.id,
        expiresAt: {
          lt: new Date(),
        },
      },
    });

    // ====================================================
    // CREATION NOUVELLE SESSION
    // ====================================================

    await createSession(user.id);

    // ====================================================
    // REPONSE
    // ====================================================

    return {
      success: true,
      user: formatAuthUser(user),
    };
  } catch (error) {
    console.error(
      "LOGIN_USER_ERROR:",
      error
    );

    return {
      success: false,
      error:
        "Impossible de vous connecter.",
    };
  }
}

// ======================================================
// UTILISATEUR CONNECTE
// ======================================================

export async function getCurrentUser(): Promise<
  AuthUser | null
> {
  try {
    // ====================================================
    // COOKIE
    // ====================================================

    const cookieStore =
      await cookies();

    const token =
      cookieStore.get(
        SESSION_COOKIE
      )?.value;

    if (!token) {
      return null;
    }

    // ====================================================
    // RECHERCHE SESSION
    // ====================================================

    // IMPORTANT :
    // Le token est stocké dans Session.id

    const session =
      await prisma.session.findUnique({
        where: {
          id: token,
        },
        include: {
          user: true,
        },
      });

    // ====================================================
    // SESSION INEXISTANTE
    // ====================================================

    if (!session) {
      cookieStore.delete(
        SESSION_COOKIE
      );

      return null;
    }

    // ====================================================
    // SESSION EXPIREE
    // ====================================================

    if (
      session.expiresAt.getTime() <=
      Date.now()
    ) {
      await prisma.session.delete({
        where: {
          id: session.id,
        },
      });

      cookieStore.delete(
        SESSION_COOKIE
      );

      return null;
    }

    // ====================================================
    // UTILISATEUR
    // ====================================================

    return formatAuthUser(
      session.user
    );
  } catch (error) {
    console.error(
      "GET_CURRENT_USER_ERROR:",
      error
    );

    return null;
  }
}

// ======================================================
// VERIFICATION AUTHENTIFICATION
// ======================================================

export async function isAuthenticated(): Promise<boolean> {
  const user =
    await getCurrentUser();

  return user !== null;
}

// ======================================================
// DECONNEXION
// ======================================================

export async function logoutUser(): Promise<
  | {
      success: true;
    }
  | {
      success: false;
      error: string;
    }
> {
  try {
    // ====================================================
    // COOKIE
    // ====================================================

    const cookieStore =
      await cookies();

    const token =
      cookieStore.get(
        SESSION_COOKIE
      )?.value;

    // ====================================================
    // SUPPRESSION SESSION DB
    // ====================================================

    if (token) {
      // IMPORTANT :
      // Le token correspond à Session.id

      await prisma.session.deleteMany({
        where: {
          id: token,
        },
      });
    }

    // ====================================================
    // SUPPRESSION COOKIE
    // ====================================================

    cookieStore.delete(
      SESSION_COOKIE
    );

    return {
      success: true,
    };
  } catch (error) {
    console.error(
      "LOGOUT_USER_ERROR:",
      error
    );

    // ====================================================
    // FALLBACK COOKIE
    // ====================================================

    try {
      const cookieStore =
        await cookies();

      cookieStore.delete(
        SESSION_COOKIE
      );
    } catch {
      // Rien à faire
    }

    return {
      success: false,
      error:
        "Impossible de vous déconnecter.",
    };
  }
}