"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Factory, Phone, ShoppingBag } from "lucide-react";
import work from "@/../public/worker.jpeg";
import Image from "next/image";
import { contactSchema } from "@/lib/validations/contact";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    question: ""
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    question: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsSubmitting(true);

    setErrors({
      name: "",
      email: "",
      phone: "",
      service: "",
      question: ""
    });

    setServerError("");
    setSuccessMessage("");

    const validationResult = contactSchema.safeParse(form);

    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors;

      setErrors({
        name: fieldErrors.name?.[0] || "",
        email: fieldErrors.email?.[0] || "",
        phone: fieldErrors.phone?.[0] || "",
        service: fieldErrors.service?.[0] || "",
        question: fieldErrors.question?.[0] || ""
      });

      setIsSubmitting(false);

      console.log(
        "Validation errors:",
        validationResult.error.flatten()
      );

      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validationResult.data),
      });

      // On récupère d'abord la réponse sous forme de texte
      const text = await response.text();

      console.log("STATUS :", response.status);
      console.log("RESPONSE :", text);

      // On essaie ensuite de convertir le texte en JSON
      let data;

      try {
        data = text ? JSON.parse(text) : {};
      } catch (error) {
        console.log("Réponse invalide du serveur :", error);

        setServerError(
          "Le serveur a renvoyé une réponse invalide."
        );

        return;
      }

      if (!response.ok) {
        setServerError(
          data.error ||
            "Une erreur est survenue. Veuillez réessayer."
        );

        return;
      }

      setSuccessMessage(data.message);

      setForm({
        name: "",
        email: "",
        phone: "",
        service: "",
        question: ""
      });

      setErrors({
        name: "",
        email: "",
        phone: "",
        service: "",
        question: ""
      });

      console.log("Data reçue :", data);

    } catch (error) {
      console.error("Error submitting form:", error);

      setServerError(
        "Impossible de contacter le serveur. Veuillez réessayer."
      );

    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="mx-auto grid min-h-screen w-full max-w-7xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-2 lg:gap-14 lg:px-10 lg:py-16">
      <section className="flex flex-col">
        <span className="mb-3 text-sm font-semibold uppercase tracking-widest text-orange-500">
          Contact
        </span>

        <h1 className="mb-4 text-4xl font-bold leading-tight text-neutral-900 sm:text-5xl dark:text-white">
          Let's work together.
        </h1>

        <p className="mb-8 max-w-md text-sm leading-6 text-neutral-500 sm:mb-10 sm:text-base">
          Have an idea or a project? Fill out the form below and I'll get back
          to you as soon as possible.
        </p>

        <form
          className="grid gap-4 sm:gap-5"
          onSubmit={handleSubmit}
        >
          <input
            id="name"
            name="name"
            placeholder="Your name"
            className="h-12 w-full rounded-xl border border-neutral-300 bg-white px-4 text-sm outline-none transition focus:border-orange-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            value={form.name}
          />

          {errors.name && (
            <p className="text-sm text-red-500">
              {errors.name}
            </p>
          )}

          <input
            id="email"
            name="email"
            type="email"
            placeholder="Your email"
            className="h-12 w-full rounded-xl border border-neutral-300 bg-white px-4 text-sm outline-none transition focus:border-orange-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            value={form.email}
          />

          {errors.email && (
            <p className="text-sm text-red-500">
              {errors.email}
            </p>
          )}

          <input
            id="phone"
            name="phone"
            placeholder="Phone number"
            className="h-12 w-full rounded-xl border border-neutral-300 bg-white px-4 text-sm outline-none transition focus:border-orange-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
            value={form.phone}
          />

          {errors.phone && (
            <p className="text-sm text-red-500">
              {errors.phone}
            </p>
          )}

          <select
            name="service"
            className="h-12 w-full rounded-xl border border-neutral-300 bg-white px-4 text-sm text-neutral-600 outline-none transition focus:border-orange-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
            onChange={(e) =>
              setForm({ ...form, service: e.target.value })
            }
            value={form.service}
          >
            <option value="" disabled>
              Select a service
            </option>
            <option>Production</option>
            <option>Achat</option>
            <option>Vente</option>
          </select>

          {errors.service && (
            <p className="text-sm text-red-500">
              {errors.service}
            </p>
          )}

          <textarea
            id="question"
            name="question"
            placeholder="Tell me about your project..."
            rows={5}
            className="w-full resize-none rounded-xl border border-neutral-300 bg-white p-4 text-sm outline-none transition focus:border-orange-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
            onChange={(e) =>
              setForm({ ...form, question: e.target.value })
            }
            value={form.question}
          />

          {errors.question && (
            <p className="text-sm text-red-500">
              {errors.question}
            </p>
          )}

          <Button
            type="submit"
            className="mt-1 h-12 w-full rounded-xl bg-orange-500 text-white hover:bg-orange-600 sm:mt-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
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

        <div className="mt-10 grid grid-cols-1 gap-3 sm:mt-12 sm:grid-cols-3 sm:gap-4">
          <div className="rounded-2xl bg-neutral-100 p-4 sm:p-5 dark:bg-white/5">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-500/10">
              <Phone className="text-orange-500" size={19} />
            </div>

            <p className="font-semibold text-neutral-900 dark:text-white">
              Phone
            </p>

            <p className="mt-1 text-sm text-neutral-500">
              +229 XX XX XX XX
            </p>
          </div>

          <div className="rounded-2xl bg-neutral-100 p-4 sm:p-5 dark:bg-white/5">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-500/10">
              <ShoppingBag className="text-orange-500" size={19} />
            </div>

            <p className="font-semibold text-neutral-900 dark:text-white">
              Services
            </p>

            <p className="mt-1 text-sm text-neutral-500">
              Fabrication • Vente • Livraison
            </p>
          </div>

          <div className="rounded-2xl bg-neutral-100 p-4 sm:p-5 dark:bg-white/5">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-500/10">
              <Factory className="text-orange-500" size={19} />
            </div>

            <p className="font-semibold text-neutral-900 dark:text-white">
              Office
            </p>

            <p className="mt-1 text-sm text-neutral-500">
              Cotonou, Benin
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-5">
        <div className="relative h-[420px] overflow-hidden rounded-3xl sm:h-[500px] lg:h-[560px]">
          <Image
            src={work}
            alt="Worker"
            fill
            priority
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          <div className="absolute bottom-6 left-5 right-5 rounded-2xl border border-white/20 bg-white/10 p-5 text-white backdrop-blur-lg sm:bottom-8 sm:left-8 sm:right-8 sm:p-6">
            <p className="text-xl font-bold leading-tight sm:text-2xl">
              Building digital experiences that make an impact.
            </p>

            <p className="mt-2 text-sm leading-5 text-white/80 sm:mt-3">
              From websites to AI solutions, let's create something exceptional
              together.
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-100 dark:border-white/10 dark:bg-white/5">
          <div className="flex items-center justify-between px-5 py-4">
            <div>
              <p className="font-semibold text-neutral-900 dark:text-white">
                Find us
              </p>

              <p className="text-sm text-neutral-500">
                Cotonou, Benin
              </p>
            </div>
          </div>

          <div className="h-[280px] w-full sm:h-[320px]">
            <iframe
              title="LTM+ location"
              src="https://www.google.com/maps?q=Cotonou,Benin&output=embed"
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