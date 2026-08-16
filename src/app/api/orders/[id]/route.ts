import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/actions/auth";
import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  request: Request,
  { params }: RouteContext
) {
  try {
    // ==========================================================
    // UTILISATEUR CONNECTÉ
    // ==========================================================

    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          error: "Non authentifié",
        },
        {
          status: 401,
        }
      );
    }

    // ==========================================================
    // ID DE LA COMMANDE
    // ==========================================================

    const { id } = await params;

    const orderId = Number(id);

    if (!Number.isInteger(orderId) || orderId <= 0) {
      return NextResponse.json(
        {
          error: "Identifiant de commande invalide",
        },
        {
          status: 400,
        }
      );
    }

    // ==========================================================
    // COMMANDE
    // ==========================================================

    const order = await prisma.order.findFirst({
      where: {
        id: orderId,

        // IMPORTANT :
        // l'utilisateur ne peut récupérer
        // que SES propres commandes.
        userId: user.id,
      },

      include: {
        items: {
          orderBy: {
            id: "asc",
          },

          include: {
            product: true,
          },
        },
      },
    });

    // ==========================================================
    // COMMANDE INTROUVABLE
    // ==========================================================

    if (!order) {
      return NextResponse.json(
        {
          error: "Commande introuvable",
        },
        {
          status: 404,
        }
      );
    }

    // ==========================================================
    // RESPONSE
    // ==========================================================

    return NextResponse.json({
      order,
    });
  } catch (error) {
    console.error(
      "GET /api/orders/[id] ERROR:",
      error
    );

    return NextResponse.json(
      {
        error: "Erreur interne du serveur",
      },
      {
        status: 500,
      }
    );
  }
}