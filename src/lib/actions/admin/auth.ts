"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import crypto from "crypto";

import { prisma } from "@/lib/prisma";

// ============================================================
// CONSTANTES
// ============================================================

const ADMIN_SESSION_COOKIE = "admin_session";

const SESSION_DURATION = 1000 * 60 * 60 * 24 * 7;

// ============================================================
// GET CURRENT ADMIN
// ============================================================

export async function getCurrentAdmin() {
  const cookieStore = await cookies();

  const sessionId = cookieStore.get(
    ADMIN_SESSION_COOKIE
  )?.value;

  if (!sessionId) {
    return null;
  }

  const session =
    await prisma.adminSession.findUnique({
      where: {
        id: sessionId,
      },

      include: {
        admin: true,
      },
    });

  if (!session) {
    return null;
  }

  // Session expirée

  if (
    session.expiresAt.getTime() <
    Date.now()
  ) {
    await prisma.adminSession.delete({
      where: {
        id: session.id,
      },
    });

    return null;
  }

  return session.admin;
}

// ============================================================
// LOGIN ADMIN
// ============================================================

export async function loginAdmin(
  email: string,
  password: string
) {
  const normalizedEmail =
    email.trim().toLowerCase();

  if (!normalizedEmail || !password) {
    throw new Error(
      "Email et mot de passe requis."
    );
  }

  const admin =
    await prisma.admin.findUnique({
      where: {
        email: normalizedEmail,
      },
    });

  if (!admin) {
    throw new Error(
      "Email ou mot de passe incorrect."
    );
  }

  const passwordValid =
    await bcrypt.compare(
      password,
      admin.passwordHash
    );

  if (!passwordValid) {
    throw new Error(
      "Email ou mot de passe incorrect."
    );
  }

  const sessionId =
    crypto.randomUUID();

  const expiresAt =
    new Date(
      Date.now() +
        SESSION_DURATION
    );

  await prisma.adminSession.create({
    data: {
      id: sessionId,
      adminId: admin.id,
      expiresAt,
    },
  });

  const cookieStore =
    await cookies();

  cookieStore.set(
    ADMIN_SESSION_COOKIE,
    sessionId,
    {
      httpOnly: true,
      secure:
        process.env.NODE_ENV ===
        "production",
      sameSite: "lax",
      expires: expiresAt,
      path: "/",
    }
  );

  return {
    success: true,
  };
}

// ============================================================
// LOGOUT ADMIN
// ============================================================

export async function logoutAdmin() {
  const cookieStore =
    await cookies();

  const sessionId =
    cookieStore.get(
      ADMIN_SESSION_COOKIE
    )?.value;

  if (sessionId) {
    await prisma.adminSession.deleteMany({
      where: {
        id: sessionId,
      },
    });
  }

  cookieStore.delete(
    ADMIN_SESSION_COOKIE
  );

  redirect("/admin/login");
}

// ============================================================
// PROTECTION ADMIN
// ============================================================

export async function requireAdmin() {
  const admin =
    await getCurrentAdmin();

  if (!admin) {
    redirect("/admin/login");
  }

  return admin;
}