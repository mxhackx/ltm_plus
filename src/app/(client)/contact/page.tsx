"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Factory, Phone, ShoppingBag } from "lucide-react";
import work from "@/../public/worker.jpeg";
import Image from "next/image";
import { contactSchema } from "@/lib/validations/contact";
import { insertContact } from "@/lib/actions/contact";

const CONTACT_DATA = {
  content: {
    badge: "Contact",

    title: "Parlons de votre projet.",

    description:
      "Vous avez un besoin en tubes électriques ou souhaitez en savoir plus sur nos produits ? Remplissez le formulaire ci-dessous et notre équipe vous répondra dans les meilleurs délais.",

    form: {
      fields: {
        name: {
          id: "name",
          name: "name",
          placeholder: "Votre nom",
        },

        email: {
          id: "email",
          name: "email",
          type: "email",
          placeholder: "Votre adresse e-mail",
        },

        phone: {
          id: "phone",
          name: "phone",
          placeholder: "Votre numéro de téléphone",
        },

        service: {
          name: "service",
          placeholder: "Sélectionnez un service",

          options: [
            "Fabrication",
            "Achat",
            "Vente",
            "Distribution",
            "Conseils techniques",
          ],
        },

        question: {
          id: "question",
          name: "question",
          placeholder:
            "Décrivez votre besoin ou votre projet...",
          rows: 5,
        },
      },

      buttons: {
        submit: "Envoyer le message",
        submitting: "Envoi en cours...",
      },

      messages: {
        genericServerError:
          "Une erreur est survenue. Veuillez réessayer.",

        serverUnavailable:
          "Impossible de contacter le serveur. Veuillez réessayer.",
      },
    },

    contactCards: [
      {
        type: "phone",
        title: "Téléphone",
        value: "+229 01 97 28 09 76",
      },

      {
        type: "services",
        title: "Services",
        value: "Fabrication • Vente • Distribution",
      },

      {
        type: "office",
        title: "Bureau",
        value: "Tokan, Abomey-Calavi",
      },
    ],

    image: {
      alt: "Technicien LTM+ sur une ligne de production",

      title:
        "Des solutions électriques conçues pour durer.",

      description:
        "De la fabrication à la distribution, LTM+ vous accompagne avec des produits fiables, résistants et adaptés aux exigences de vos installations.",
    },

    location: {
      title: "Nous trouver",

      address:
        "Tokan, Abomey-Calavi, Bénin",

      mapTitle: "Localisation de LTM+",

      mapUrl:
        "https://www.google.com/maps?q=Cotonou,Benin&output=embed",
    },
  },
} as const;

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    question: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    question: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setIsSubmitting(true);

    setErrors({
      name: "",
      email: "",
      phone: "",
      service: "",
      question: "",
    });

    setServerError("");
    setSuccessMessage("");

    // =========================
    // VALIDATION CLIENT
    // =========================

    const validationResult = contactSchema.safeParse(form);

    if (!validationResult.success) {
      const fieldErrors =
        validationResult.error.flatten().fieldErrors;

      setErrors({
        name: fieldErrors.name?.[0] || "",
        email: fieldErrors.email?.[0] || "",
        phone: fieldErrors.phone?.[0] || "",
        service: fieldErrors.service?.[0] || "",
        question: fieldErrors.question?.[0] || "",
      });

      setIsSubmitting(false);

      console.log(
        "Validation errors:",
        validationResult.error.flatten()
      );

      return;
    }

    // =========================
    // SERVER ACTION
    // =========================

    try {
      const result = await insertContact(
        validationResult.data
      );

      // Erreur renvoyée par la Server Action
      if ("error" in result) {
        setServerError(
          result.error ||
            CONTACT_DATA.content.form.messages
              .genericServerError
        );

        return;
      }

      // Succès
      setSuccessMessage(result.message);

      setForm({
        name: "",
        email: "",
        phone: "",
        service: "",
        question: "",
      });

      setErrors({
        name: "",
        email: "",
        phone: "",
        service: "",
        question: "",
      });
    } catch (error) {
      console.error(
        "Erreur lors de l'envoi du formulaire :",
        error
      );

      setServerError(
        CONTACT_DATA.content.form.messages
          .serverUnavailable
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const { content } = CONTACT_DATA;

  return (
    <main className="mx-auto grid min-h-screen w-full max-w-7xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-2 lg:gap-14 lg:px-10 lg:py-16">

      {/* FORMULAIRE */}

      <section className="flex flex-col">
        <span className="mb-3 text-sm font-semibold uppercase tracking-widest text-orange-500">
          {content.badge}
        </span>

        <h1 className="mb-4 text-4xl font-bold leading-tight text-neutral-900 sm:text-5xl dark:text-white">
          {content.title}
        </h1>

        <p className="mb-8 max-w-md text-sm leading-6 text-neutral-500 sm:mb-10 sm:text-base">
          {content.description}
        </p>

        <form
          className="grid gap-4 sm:gap-5"
          onSubmit={handleSubmit}
        >
          {/* NAME */}

          <input
            id={content.form.fields.name.id}
            name={content.form.fields.name.name}
            placeholder={
              content.form.fields.name.placeholder
            }
            className="h-12 w-full rounded-xl border border-neutral-300 bg-white px-4 text-sm outline-none transition focus:border-orange-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            value={form.name}
          />

          {errors.name && (
            <p className="text-sm text-red-500">
              {errors.name}
            </p>
          )}

          {/* EMAIL */}

          <input
            id={content.form.fields.email.id}
            name={content.form.fields.email.name}
            type={content.form.fields.email.type}
            placeholder={
              content.form.fields.email.placeholder
            }
            className="h-12 w-full rounded-xl border border-neutral-300 bg-white px-4 text-sm outline-none transition focus:border-orange-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
            value={form.email}
          />

          {errors.email && (
            <p className="text-sm text-red-500">
              {errors.email}
            </p>
          )}

          {/* PHONE */}

          <input
            id={content.form.fields.phone.id}
            name={content.form.fields.phone.name}
            placeholder={
              content.form.fields.phone.placeholder
            }
            className="h-12 w-full rounded-xl border border-neutral-300 bg-white px-4 text-sm outline-none transition focus:border-orange-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
            onChange={(e) =>
              setForm({
                ...form,
                phone: e.target.value,
              })
            }
            value={form.phone}
          />

          {errors.phone && (
            <p className="text-sm text-red-500">
              {errors.phone}
            </p>
          )}

          {/* SERVICE */}

          <select
            name={content.form.fields.service.name}
            className="h-12 w-full rounded-xl border border-neutral-300 bg-white px-4 text-sm text-neutral-600 outline-none transition focus:border-orange-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
            onChange={(e) =>
              setForm({
                ...form,
                service: e.target.value,
              })
            }
            value={form.service}
          >
            <option value="" disabled>
              {content.form.fields.service.placeholder}
            </option>

            {content.form.fields.service.options.map(
              (service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              )
            )}
          </select>

          {errors.service && (
            <p className="text-sm text-red-500">
              {errors.service}
            </p>
          )}

          {/* QUESTION */}

          <textarea
            id={content.form.fields.question.id}
            name={content.form.fields.question.name}
            placeholder={
              content.form.fields.question.placeholder
            }
            rows={content.form.fields.question.rows}
            className="w-full resize-none rounded-xl border border-neutral-300 bg-white p-4 text-sm outline-none transition focus:border-orange-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
            onChange={(e) =>
              setForm({
                ...form,
                question: e.target.value,
              })
            }
            value={form.question}
          />

          {errors.question && (
            <p className="text-sm text-red-500">
              {errors.question}
            </p>
          )}

          {/* SUBMIT */}

          <Button
            type="submit"
            className="mt-1 h-12 w-full rounded-xl bg-orange-500 text-white hover:bg-orange-600 sm:mt-2"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? content.form.buttons.submitting
              : content.form.buttons.submit}
          </Button>

          {serverError && (
            <p className="text-sm text-red-500">
              {serverError}
            </p>
          )}

          {successMessage && (
            <p className="text-sm text-green-500">
              {successMessage}
            </p>
          )}
        </form>

        {/* CONTACT CARDS */}

        <div className="mt-10 grid grid-cols-1 gap-3 sm:mt-12 sm:grid-cols-3 sm:gap-4">
          {content.contactCards.map((card) => {
            const Icon =
              card.type === "phone"
                ? Phone
                : card.type === "services"
                ? ShoppingBag
                : Factory;

            return (
              <div
                key={card.type}
                className="rounded-2xl bg-neutral-100 p-4 sm:p-5 dark:bg-white/5"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-500/10">
                  <Icon
                    className="text-orange-500"
                    size={19}
                  />
                </div>

                <p className="font-semibold text-neutral-900 dark:text-white">
                  {card.title}
                </p>

                <p className="mt-1 text-sm text-neutral-500">
                  {card.value}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* IMAGE + MAP */}

      <section className="flex flex-col gap-5">
        {/* IMAGE */}

        <div className="relative h-[420px] overflow-hidden rounded-3xl sm:h-[500px] lg:h-[560px]">
          <Image
            src={work}
            alt={content.image.alt}
            fill
            priority
            className="object-cover"
          />

          {/* Gradient orange */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#C65D18]/95 via-[#C65D18]/35 to-transparent" />

          {/* Légère couche sombre */}
          <div className="absolute inset-0 bg-black/10" />

          {/* TEXTE */}

          <div className="absolute bottom-6 left-5 right-5 rounded-2xl border border-white/20 bg-black/20 p-5 text-white backdrop-blur-md sm:bottom-8 sm:left-8 sm:right-8 sm:p-6">
            <div className="mb-3 h-1 w-10 rounded-full bg-[var(--orange)]" />

            <p className="text-xl font-bold leading-tight sm:text-2xl">
              {content.image.title}
            </p>

            <p className="mt-2 max-w-xl text-sm leading-6 text-white/85 sm:mt-3">
              {content.image.description}
            </p>
          </div>
        </div>

        {/* MAP */}

        <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-100 dark:border-white/10 dark:bg-white/5">
          <div className="flex items-center justify-between px-5 py-4">
            <div>
              <p className="font-semibold text-neutral-900 dark:text-white">
                {content.location.title}
              </p>

              <p className="text-sm text-neutral-500">
                {content.location.address}
              </p>
            </div>
          </div>

          <div className="h-[280px] w-full sm:h-[320px]">
            <iframe
              title={content.location.mapTitle}
              src={content.location.mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </main>
  );
}