"use server"
import {prisma} from "@/lib/prisma";
type ContactData = {
  name: string;
  email: string;
  phone: string;
  service: string;
  question: string;
};

export async function insertContact(body: ContactData) {
  try {
    const contact = await prisma.contact.create({
      data: body,
    });

    return {
      message: "Votre message a bien été envoyé",
      contact,
    };
  } catch (error) {
    return {
      error: "Erreur lors de la création du contact",
      details:
        error instanceof Error
          ? error.message
          : String(error),
    };
  }
}