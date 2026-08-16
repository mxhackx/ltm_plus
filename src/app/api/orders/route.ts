import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/actions/auth";

// ======================================================
// TYPES
// ======================================================

type OrderItemInput = {
  productId: number;
  quantity: number;
};

type CreateOrderBody = {
  items: OrderItemInput[];

  customer: {
    fullName: string;
    phone: string;
    address: string;
  };
};

// ======================================================
// POST /api/orders
// ======================================================
export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "Vous devez être connecté.",
        },
        {
          status: 401,
        }
      );
    }

    const orders = await prisma.order.findMany({
      where: {
        userId: user.id,
      },

      orderBy: {
        createdAt: "desc",
      },

      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("GET_ORDERS_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Impossible de récupérer vos commandes.",
      },
      {
        status: 500,
      }
    );
  }
}
export async function POST(
  request: NextRequest
) {
  try {
    // ====================================================
    // VÉRIFIER L'AUTHENTIFICATION
    // ====================================================

    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Vous devez être connecté pour passer une commande.",
        },
        {
          status: 401,
        }
      );
    }

    // ====================================================
    // RÉCUPÉRER LES DONNÉES
    // ====================================================

    let body: CreateOrderBody;

    try {
      body =
        (await request.json()) as CreateOrderBody;
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Données invalides.",
        },
        {
          status: 400,
        }
      );
    }

    const { items, customer } = body;

    // ====================================================
    // VALIDATION DU CLIENT
    // ====================================================

    if (!customer) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Les informations du client sont obligatoires.",
        },
        {
          status: 400,
        }
      );
    }

    const fullName =
      customer.fullName?.trim();

    const phone =
      customer.phone?.trim();

    const address =
      customer.address?.trim();

    if (!fullName) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Le nom complet est obligatoire.",
        },
        {
          status: 400,
        }
      );
    }

    if (!phone) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Le numéro de téléphone est obligatoire.",
        },
        {
          status: 400,
        }
      );
    }

    if (!address) {
      return NextResponse.json(
        {
          success: false,
          error:
            "L'adresse de livraison est obligatoire.",
        },
        {
          status: 400,
        }
      );
    }

    // ====================================================
    // VALIDATION DU PANIER
    // ====================================================

    if (
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Le panier est vide.",
        },
        {
          status: 400,
        }
      );
    }

    // ====================================================
    // VALIDATION DES ARTICLES
    // ====================================================

    for (const item of items) {
      if (
        !item ||
        !Number.isInteger(item.productId) ||
        !Number.isInteger(item.quantity) ||
        item.productId <= 0 ||
        item.quantity <= 0
      ) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Chaque article doit avoir un produit valide et une quantité supérieure à 0.",
          },
          {
            status: 400,
          }
        );
      }
    }

    // ====================================================
    // ÉVITER LES DOUBLONS DE PRODUCT ID
    // ====================================================

    const productIds = items.map(
      (item) => item.productId
    );

    const uniqueProductIds =
      new Set(productIds);

    if (
      uniqueProductIds.size !==
      productIds.length
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Un même produit ne peut apparaître qu'une seule fois dans la commande.",
        },
        {
          status: 400,
        }
      );
    }

    // ====================================================
    // RÉCUPÉRER LES PRODUITS
    // ====================================================

    const products =
      await prisma.product.findMany({
        where: {
          id: {
            in: productIds,
          },
        },
      });

    // ====================================================
    // VÉRIFIER QUE TOUS LES PRODUITS EXISTENT
    // ====================================================

    if (
      products.length !==
      uniqueProductIds.size
    ) {
      const existingIds =
        new Set(
          products.map(
            (product) => product.id
          )
        );

      const missingProducts =
        productIds.filter(
          (id) =>
            !existingIds.has(id)
        );

      return NextResponse.json(
        {
          success: false,
          error:
            "Un ou plusieurs produits n'existent pas.",
          missingProducts,
        },
        {
          status: 404,
        }
      );
    }

    // ====================================================
    // CALCUL DU TOTAL CÔTÉ SERVEUR
    // ====================================================

    let totalPrice = 0;

    const orderItems = [];

    for (const item of items) {
      const product =
        products.find(
          (product) =>
            product.id ===
            item.productId
        );

      if (!product) {
        return NextResponse.json(
          {
            success: false,
            error:
              `Produit ${item.productId} introuvable.`,
          },
          {
            status: 404,
          }
        );
      }

      const itemTotal =
        product.price *
        item.quantity;

      totalPrice += itemTotal;

      orderItems.push({
        productId: product.id,
        quantity: item.quantity,
        unitPrice: product.price,
      });
    }

    // ====================================================
    // CRÉER LA COMMANDE
    // ====================================================

    const order =
      await prisma.$transaction(
        async (tx) => {
          const newOrder =
            await tx.order.create({
              data: {
                // ==========================================
                // UTILISATEUR CONNECTÉ
                // ==========================================

                userId: user.id,

                // ==========================================
                // PRIX
                // ==========================================

                totalPrice,

                // ==========================================
                // INFORMATIONS DE LIVRAISON
                // ==========================================

                fullName,
                phone,
                address,

                // ==========================================
                // ARTICLES
                // ==========================================

                items: {
                  create: orderItems,
                },
              },

              include: {
                items: {
                  include: {
                    product: true,
                  },
                },
              },
            });

          return newOrder;
        }
      );

    // ====================================================
    // RÉPONSE
    // ====================================================

    return NextResponse.json(
      {
        success: true,

        message:
          "Commande créée avec succès.",

        order: {
          id: order.id,

          userId: order.userId,

          totalPrice:
            order.totalPrice,

          fullName:
            order.fullName,

          phone:
            order.phone,

          address:
            order.address,

          status:
            order.status,

          createdAt:
            order.createdAt,

          updatedAt:
            order.updatedAt,

          items: order.items.map(
            (item) => ({
              id: item.id,

              productId:
                item.productId,

              quantity:
                item.quantity,

              unitPrice:
                item.unitPrice,

              product: {
                id: item.product.id,

                name:
                  item.product.name,

                price:
                  item.product.price,

                description:
                  item.product.description,

                category:
                  item.product.category,

                dimensions:
                  item.product.dimensions,
              },
            })
          ),
        },
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "CREATE_ORDER_ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        error:
          "Impossible de créer la commande.",
      },
      {
        status: 500,
      }
    );
  }
}