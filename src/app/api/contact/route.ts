import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validations/contact";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    console.log("1 - POST reçu");

    const body = await request.json();
    console.log("2 - Body :", body);

    const validationResult = contactSchema.safeParse(body);
    console.log("3 - Validation :", validationResult.success);

    if (!validationResult.success) {
      console.log("Validation error :", validationResult.error);

      return NextResponse.json(
        {
          error: "Veuillez vérifier les informations saisies",
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    console.log("4 - Création Prisma");

    const contact = await prisma.contact.create({
      data: validationResult.data,
    });

    console.log("5 - Contact créé :", contact);

    return NextResponse.json(
      {
        message: "Votre message a bien été envoyé",
        contact,
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("ERREUR POST CONTACT :", error);

    return NextResponse.json(
      {
        error: "Erreur lors de la création du contact",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}