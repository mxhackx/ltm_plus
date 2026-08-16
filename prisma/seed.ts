import "dotenv/config";

import bcrypt from "bcryptjs";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  // ==========================================================
  // VARIABLES D'ENVIRONNEMENT
  // ==========================================================

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error(
      "ADMIN_EMAIL et ADMIN_PASSWORD doivent être définis dans .env"
    );
  }

  // ==========================================================
  // HASH DU MOT DE PASSE
  // ==========================================================

  const passwordHash = await bcrypt.hash(
    password,
    12
  );

  // ==========================================================
  // CREATION / MISE A JOUR DE L'ADMIN
  // ==========================================================

  const admin = await prisma.admin.upsert({
    where: {
      email,
    },

    update: {
      passwordHash,
    },

    create: {
      firstName: "Admin",
      lastName: "Principal",
      email,
      passwordHash,
    },
  });

  // ==========================================================
  // LOG
  // ==========================================================

  console.log("");
  console.log("=================================");
  console.log("ADMIN INITIALISÉ");
  console.log("=================================");
  console.log(`ID    : ${admin.id}`);
  console.log(`Email : ${admin.email}`);
  console.log("=================================");
  console.log("");
}

main()
  .catch((error) => {
    console.error("SEED_ERROR:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });