import { z } from "zod";

export const contactSchema = z.object({
  name: z
  .string()
  .trim()
  .min(5, "Le nom doit contenir au moins deux mots de 2 caractères")
  .max(50, "Le nom ne doit pas dépasser 50 caractères")
  .regex(
    /^[A-Za-zÀ-ÖØ-öø-ÿ]{2,} [A-Za-zÀ-ÖØ-öø-ÿ]{2,}$/,
    "Le nom doit contenir exactement deux mots de 2 caractères minimum"
  ),
  email: z
    .string()
    .trim()
    .email("Adresse email invalide")
    ,
  phone: z
  .string()
  .trim()
  .regex(
    /^\+?[0-9\s\-()]{8,20}$/,
    "Numéro de téléphone invalide"
  ),

  service: z
    .string()
    .min(1, "Veuillez sélectionner un service"),

  question: z
    .string()
    .min(5, "Votre message est trop court")
    .max(500, "Votre message est trop long")
    .trim(),
});
