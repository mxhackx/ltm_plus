import { NextResponse } from "next/server";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.STORAGE_DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        id: "asc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("GET_PRODUCTS_ERROR:", error);

    return NextResponse.json(
      {
        error: "Impossible de récupérer les produits.",
      },
      {
        status: 500,
      }
    );
  } finally {
    await prisma.$disconnect();
  }
}