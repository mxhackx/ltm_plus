"use client";

import {
  Mail,
  Phone,
  Trash2,
  MessageCircle,
} from "lucide-react";

import { deleteContact } from "@/lib/actions/admin/contacts";

type Contact = {
  id: number;
  name: string;
  email: string;
  phone: string;
  question: string;
  service: string;
};

export default function ContactActions({
  contact,
}: {
  contact: Contact;
}) {
  async function handleDelete() {
    const confirmed = window.confirm(
      `Supprimer définitivement le message de ${contact.name} ?`
    );

    if (!confirmed) return;

    await deleteContact(contact.id);
  }

  function handleWhatsApp() {
    if (!contact.phone) {
      alert("Ce contact n'a pas de numéro de téléphone.");
      return;
    }

    const message = `Bonjour ${contact.name},

Nous avons bien reçu votre demande concernant le service "${contact.service}".

Votre message :
${contact.question}

Nous revenons vers vous concernant votre demande.

Cordialement.`;

    const phone = contact.phone.replace(/\D/g, "");

    const whatsappUrl =
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");

    setTimeout(async () => {
      const confirmed = window.confirm(
        "Le message WhatsApp a été ouvert. Voulez-vous supprimer ce contact de la base de données ?"
      );

      if (confirmed) {
        await deleteContact(contact.id);
      }
    }, 500);
  }

  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {/* EMAIL */}

      <a
        href={`mailto:${contact.email}`}
        className="
          inline-flex
          items-center
          gap-2
          rounded-xl
          bg-(--orange)
          px-4
          py-2.5
          text-xs
          font-semibold
          text-white
          transition
          hover:brightness-110
        "
      >
        <Mail size={14} />
        Répondre par email
      </a>

      {/* TELEPHONE */}

      {contact.phone && (
        <a
          href={`tel:${contact.phone}`}
          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            border
            border-neutral-200
            bg-white
            px-4
            py-2.5
            text-xs
            font-semibold
            text-neutral-700
            transition
            hover:border-(--orange)/30
            hover:text-(--orange)
            dark:border-white/10
            dark:bg-white/[0.03]
            dark:text-neutral-300
          "
        >
          <Phone size={14} />
          Appeler
        </a>
      )}

      {/* WHATSAPP */}

      {contact.phone && (
        <button
          type="button"
          onClick={handleWhatsApp}
          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            border
            border-green-500/20
            bg-green-500/10
            px-4
            py-2.5
            text-xs
            font-semibold
            text-green-600
            transition
            hover:bg-green-500/20
            dark:text-green-400
          "
        >
          <MessageCircle size={14} />
          Transférer vers WhatsApp
        </button>
      )}

      {/* SUPPRIMER */}

      <button
        type="button"
        onClick={handleDelete}
        className="
          inline-flex
          items-center
          gap-2
          rounded-xl
          border
          border-red-500/20
          bg-red-500/10
          px-4
          py-2.5
          text-xs
          font-semibold
          text-red-600
          transition
          hover:bg-red-500/20
          dark:text-red-400
        "
      >
        <Trash2 size={14} />
        Supprimer
      </button>
    </div>
  );
}