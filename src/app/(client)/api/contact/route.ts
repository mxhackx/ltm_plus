import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validations/contact";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validationResult = contactSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Veuillez vérifier les informations saisies",
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }
    const contact = await prisma.contact.create({
      data: validationResult.data,
    });
    return NextResponse.json(
      {
        message: "Votre message a bien été envoyé",
        contact,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Erreur lors de la création du contact",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
