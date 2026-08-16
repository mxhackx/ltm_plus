import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

// ======================================================
// PRODUITS
// ======================================================

const products = [
  {
    name: "Tube IRL 3221",
    description:
      "Tube électrique rigide gris pour installation apparente",
    category: "Tube IRL",
    dimensions: "Ø20 x 2000 mm",
    wasPrice: 2500,
    price: 2000,
  },

  {
    name: "Tube IRL 3222",
    description:
      "Tube électrique rigide gris haute résistance",
    category: "Tube IRL",
    dimensions: "Ø25 x 2000 mm",
    wasPrice: 2900,
    price: 2400,
  },

  {
    name: "Tube ICTA 3421",
    description:
      "Tube électrique cintrable pour encastrement",
    category: "Tube ICTA",
    dimensions: "Ø16 x 25 m",
    wasPrice: 1800,
    price: 1500,
  },

  {
    name: "Tube ICTA 3422",
    description:
      "Tube électrique cintrable renforcé",
    category: "Tube ICTA",
    dimensions: "Ø20 x 25 m",
    wasPrice: 2100,
    price: 1750,
  },

  {
    name: "Gaine annelée GA16",
    description:
      "Gaine annelée souple pour câblage domestique",
    category: "Gaine annelée",
    dimensions: "Ø16 x 50 m",
    wasPrice: 3200,
    price: 2800,
  },

  {
    name: "Gaine annelée GA20",
    description:
      "Gaine annelée souple double isolation",
    category: "Gaine annelée",
    dimensions: "Ø20 x 50 m",
    wasPrice: 3600,
    price: 3100,
  },

  {
    name: "Tube IRL 3223",
    description:
      "Tube électrique rigide gris pour tableau",
    category: "Tube IRL",
    dimensions: "Ø32 x 2000 mm",
    wasPrice: 3300,
    price: 2700,
  },

  {
    name: "Tube ICTA 3423",
    description:
      "Tube électrique cintrable industriel",
    category: "Tube ICTA",
    dimensions: "Ø25 x 25 m",
    wasPrice: 2500,
    price: 2100,
  },

  {
    name: "Gaine annelée GA25",
    description:
      "Gaine annelée souple haute température",
    category: "Gaine annelée",
    dimensions: "Ø25 x 25 m",
    wasPrice: 3900,
    price: 3400,
  },

  {
    name: "Tube IRL 3224",
    description:
      "Tube électrique rigide gris pour extérieur",
    category: "Tube IRL",
    dimensions: "Ø40 x 2000 mm",
    wasPrice: 4200,
    price: 3600,
  },
];

// ======================================================
// SEED
// ======================================================

async function main() {
  console.log("🌱 Début du seed...\n");

  for (const product of products) {
    const result = await prisma.product.create({
      data: product,
    });

    console.log(
      `✓ Produit ${result.id} — ${result.name}`
    );
  }

  console.log(
    `\n✅ ${products.length} produits enregistrés avec succès.`
  );
}

// ======================================================
// EXECUTION
// ======================================================

main()
  .catch((error) => {
    console.error(
      "\n❌ Erreur pendant le seed :",
      error
    );

    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });