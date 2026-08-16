import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

async function main() {
  const password = "CHANGE_ME";

  const passwordHash =
    await bcrypt.hash(
      password,
      12
    );

  const admin =
    await prisma.admin.create({
      data: {
        firstName: "Admin",
        lastName: "Principal",
        email: "admin@example.com",
        passwordHash,
      },
    });

  console.log(
    "Admin créé :",
    admin.email
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });