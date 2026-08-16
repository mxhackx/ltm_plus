import {
  ArrowLeft,
  Mail,
  Phone,
  CalendarDays,
  MessageSquare,
  UserRound,
  BriefcaseBusiness,
} from "lucide-react";

import Link from "next/link";

import { getContacts } from "@/lib/actions/admin/contacts";
import ContactActions from "@/components/contact-actions";

export default async function AdminContactsPage() {
  const contacts = await getContacts();

  return (
    <main
      className="
        min-h-screen
        bg-white
        text-neutral-900
        dark:bg-[#090909]
        dark:text-white
      "
    >
      <div
        className="
          mx-auto
          max-w-7xl
          px-5
          py-10
          sm:px-8
          lg:px-10
        "
      >
        {/* ==================================================
            HEADER
        ================================================== */}

        <header>
          {/* RETOUR ADMIN */}

          <Link
            href="/admin"
            className="
              inline-flex
              items-center
              gap-2
              text-xs
              font-semibold
              text-neutral-400
              transition
              hover:text-(--orange)
            "
          >
            <ArrowLeft size={14} />

            Retour au tableau de bord
          </Link>

          <p
            className="
              mt-6
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.2em]
              text-(--orange)
            "
          >
            Administration
          </p>

          <div
            className="
              mt-2
              flex
              flex-col
              gap-4
              sm:flex-row
              sm:items-end
              sm:justify-between
            "
          >
            <div>
              <h1
                className="
                  text-3xl
                  font-bold
                  tracking-tight
                  sm:text-4xl
                "
              >
                Messages de contact
              </h1>

              <p
                className="
                  mt-2
                  max-w-xl
                  text-sm
                  leading-6
                  text-neutral-500
                  dark:text-neutral-400
                "
              >
                Consultez les demandes envoyées
                depuis le formulaire de contact.
              </p>
            </div>

            {/* COMPTEUR */}

            <div
              className="
                inline-flex
                w-fit
                items-center
                gap-2
                rounded-xl
                border
                border-neutral-200
                bg-neutral-50
                px-4
                py-2.5
                text-xs
                font-semibold
                dark:border-white/10
                dark:bg-white/[0.03]
              "
            >
              <MessageSquare
                size={15}
                className="text-(--orange)"
              />

              {contacts.length}{" "}
              {contacts.length > 1
                ? "messages"
                : "message"}
            </div>
          </div>
        </header>

        {/* ==================================================
            CONTACTS
        ================================================== */}

        <section className="mt-10">
          {contacts.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="space-y-4">
              {contacts.map((contact) => (
                <ContactCard
                  key={contact.id}
                  contact={contact}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

// ============================================================
// CONTACT CARD
// ============================================================

function ContactCard({
  contact,
}: {
  contact: {
    id: number;
    name: string;
    email: string;
    phone: string;
    question: string;
    service: string;
    createdAt: Date;
  };
}) {
  return (
    <article
      className="
        overflow-hidden
        rounded-3xl
        border
        border-neutral-200
        bg-neutral-50
        transition
        hover:border-(--orange)/30
        hover:shadow-lg
        hover:shadow-black/5
        dark:border-white/10
        dark:bg-white/[0.03]
      "
    >
      {/* ==================================================
          CARD HEADER
      ================================================== */}

      <div
        className="
          flex
          flex-col
          gap-4
          border-b
          border-neutral-200
          p-5
          dark:border-white/10
          sm:flex-row
          sm:items-center
          sm:justify-between
          sm:px-6
        "
      >
        <div
          className="
            flex
            min-w-0
            items-center
            gap-4
          "
        >
          {/* AVATAR */}

          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-(--orange)/10
              text-(--orange)
            "
          >
            <UserRound size={20} />
          </div>

          {/* NOM + EMAIL */}

          <div className="min-w-0">
            <h2
              className="
                truncate
                text-sm
                font-bold
              "
            >
              {contact.name}
            </h2>

            <p
              className="
                mt-1
                truncate
                text-xs
                text-neutral-400
              "
            >
              {contact.email}
            </p>
          </div>
        </div>

        {/* DATE */}

        <div
          className="
            flex
            items-center
            gap-2
            text-xs
            text-neutral-400
          "
        >
          <CalendarDays size={14} />

          {formatDate(contact.createdAt)}
        </div>
      </div>

      {/* ==================================================
          INFORMATIONS
      ================================================== */}

      <div className="p-5 sm:p-6">
        <div
          className="
            grid
            gap-3
            sm:grid-cols-2
          "
        >
          {/* EMAIL */}

          <InfoItem
            icon={<Mail size={15} />}
            label="Email"
            value={contact.email}
          />

          {/* TELEPHONE */}

          <InfoItem
            icon={<Phone size={15} />}
            label="Téléphone"
            value={contact.phone}
          />

          {/* SERVICE */}

          <InfoItem
            icon={<BriefcaseBusiness size={15} />}
            label="Service"
            value={contact.service}
          />
        </div>

        {/* ==================================================
            QUESTION
        ================================================== */}

        <div
          className="
            mt-4
            rounded-2xl
            border
            border-neutral-200
            bg-white
            p-5
            dark:border-white/10
            dark:bg-white/[0.025]
          "
        >
          <div
            className="
              flex
              items-center
              gap-2
              text-xs
              font-semibold
              text-neutral-400
            "
          >
            <MessageSquare size={15} />

            Message
          </div>

          <p
            className="
              mt-3
              whitespace-pre-wrap
              text-sm
              leading-7
              text-neutral-700
              dark:text-neutral-300
            "
          >
            {contact.question}
          </p>
        </div>

        {/* ==================================================
            ACTIONS
        ================================================== */}

        <ContactActions
          contact={{
            id: contact.id,
            name: contact.name,
            email: contact.email,
            phone: contact.phone,
            question: contact.question,
            service: contact.service,
          }}
        />
      </div>
    </article>
  );
}

// ============================================================
// INFO ITEM
// ============================================================

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-neutral-200
        bg-white
        p-4
        dark:border-white/10
        dark:bg-white/[0.025]
      "
    >
      <div
        className="
          flex
          items-center
          gap-2
          text-neutral-400
        "
      >
        {icon}

        <span className="text-xs">
          {label}
        </span>
      </div>

      <p
        className="
          mt-2
          truncate
          text-sm
          font-semibold
        "
      >
        {value || "Non renseigné"}
      </p>
    </div>
  );
}

// ============================================================
// EMPTY STATE
// ============================================================

function EmptyState() {
  return (
    <div
      className="
        rounded-3xl
        border
        border-dashed
        border-neutral-200
        bg-neutral-50
        px-6
        py-16
        text-center
        dark:border-white/10
        dark:bg-white/[0.025]
      "
    >
      <div
        className="
          mx-auto
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-2xl
          bg-(--orange)/10
          text-(--orange)
        "
      >
        <MessageSquare size={28} />
      </div>

      <h2
        className="
          mt-5
          text-xl
          font-bold
        "
      >
        Aucun message
      </h2>

      <p
        className="
          mx-auto
          mt-2
          max-w-md
          text-sm
          leading-6
          text-neutral-500
          dark:text-neutral-400
        "
      >
        Aucun message de contact n&apos;a encore
        été envoyé.
      </p>
    </div>
  );
}

// ============================================================
// DATE
// ============================================================

function formatDate(date: Date) {
  return new Intl.DateTimeFormat(
    "fr-FR",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  ).format(new Date(date));
}