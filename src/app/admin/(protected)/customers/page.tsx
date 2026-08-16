import {
  ArrowLeft,
  CalendarDays,
  Mail,
  Phone,
  ShoppingBag,
  UserRound,
  Euro,
} from "lucide-react";

import Link from "next/link";

import { getClients } from "@/lib/actions/admin/clients";

export default async function AdminClientsPage() {
  const clients = await getClients();

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

            Retour à l'administration
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
                Clients
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
                Consultez les clients inscrits et leur
                activité sur votre boutique.
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
              <UserRound
                size={15}
                className="text-(--orange)"
              />

              {clients.length}{" "}
              {clients.length > 1
                ? "clients"
                : "client"}
            </div>
          </div>
        </header>

        {/* ==================================================
            CLIENTS
        ================================================== */}

        <section className="mt-10">
          {clients.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="space-y-4">
              {clients.map((client) => (
                <ClientCard
                  key={client.id}
                  client={client}
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
// CLIENT CARD
// ============================================================

function ClientCard({
  client,
}: {
  client: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    telephone: string;
    createdAt: Date;

    orders: {
      id: number;
      totalPrice: number;
      status: string;
      createdAt: Date;
    }[];
  };
}) {
  const fullName =
    `${client.firstName} ${client.lastName}`.trim();

  const totalOrders = client.orders.length;

  const totalSpent = client.orders.reduce(
    (total, order) => total + order.totalPrice,
    0
  );

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
          HEADER
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

          {/* NOM */}

          <div className="min-w-0">
            <h2
              className="
                truncate
                text-sm
                font-bold
              "
            >
              {fullName || "Client sans nom"}
            </h2>

            <p
              className="
                mt-1
                truncate
                text-xs
                text-neutral-400
              "
            >
              Client #{client.id}
            </p>
          </div>
        </div>

        {/* DATE D'INSCRIPTION */}

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

          Inscrit le {formatDate(client.createdAt)}
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
            lg:grid-cols-4
          "
        >
          {/* EMAIL */}

          <InfoItem
            icon={<Mail size={15} />}
            label="Email"
            value={client.email}
          />

          {/* TELEPHONE */}

          <InfoItem
            icon={<Phone size={15} />}
            label="Téléphone"
            value={client.telephone}
          />

          {/* COMMANDES */}

          <InfoItem
            icon={<ShoppingBag size={15} />}
            label="Commandes"
            value={`${totalOrders} ${
              totalOrders > 1
                ? "commandes"
                : "commande"
            }`}
          />

          {/* TOTAL */}

          <InfoItem
            icon={<Euro size={15} />}
            label="Total dépensé"
            value={formatPrice(totalSpent)}
          />
        </div>

        {/* ==================================================
            COMMANDES
        ================================================== */}

        {client.orders.length > 0 && (
          <div className="mt-5">
            <div
              className="
                mb-3
                flex
                items-center
                gap-2
                text-xs
                font-semibold
                text-neutral-400
              "
            >
              <ShoppingBag size={15} />

              Dernières commandes
            </div>

            <div className="space-y-2">
              {client.orders.slice(0, 5).map((order) => (
                <div
                  key={order.id}
                  className="
                    flex
                    flex-col
                    gap-2
                    rounded-2xl
                    border
                    border-neutral-200
                    bg-white
                    p-4
                    dark:border-white/10
                    dark:bg-white/[0.025]
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                  "
                >
                  <div>
                    <p className="text-sm font-semibold">
                      Commande #{order.id}
                    </p>

                    <p
                      className="
                        mt-1
                        text-xs
                        text-neutral-400
                      "
                    >
                      {formatDate(order.createdAt)}
                    </p>
                  </div>

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                    "
                  >
                    <span
                      className={`
                        rounded-full
                        px-2.5
                        py-1
                        text-[10px]
                        font-semibold
                        ${getStatusClass(order.status)}
                      `}
                    >
                      {formatStatus(order.status)}
                    </span>

                    <span
                      className="
                        text-sm
                        font-bold
                      "
                    >
                      {formatPrice(order.totalPrice)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {client.orders.length > 5 && (
              <p
                className="
                  mt-3
                  text-center
                  text-xs
                  text-neutral-400
                "
              >
                + {client.orders.length - 5} autres
                commandes
              </p>
            )}
          </div>
        )}

        {/* ==================================================
            ACTIONS
        ================================================== */}

        <div
          className="
            mt-5
            flex
            flex-wrap
            gap-2
          "
        >
          {/* EMAIL */}

          <a
            href={`mailto:${client.email}`}
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

            Envoyer un email
          </a>

          {/* TELEPHONE */}

          {client.telephone && (
            <a
              href={`tel:${client.telephone}`}
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
        </div>
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
        <UserRound size={28} />
      </div>

      <h2
        className="
          mt-5
          text-xl
          font-bold
        "
      >
        Aucun client
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
        Aucun client inscrit n&apos;a encore été
        enregistré.
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

// ============================================================
// PRIX
// ============================================================

function formatPrice(price: number) {
  return (
    new Intl.NumberFormat("fr-FR").format(price) +
    " FCFA"
  );
}

// ============================================================
// STATUS
// ============================================================

function formatStatus(status: string) {
  switch (status) {
    case "PENDING":
      return "En attente";

    case "CONFIRMED":
      return "Confirmée";

    case "DELIVERED":
      return "Livrée";

    case "CANCELLED":
      return "Annulée";

    default:
      return status;
  }
}

// ============================================================
// STATUS CLASS
// ============================================================

function getStatusClass(status: string) {
  switch (status) {
    case "PENDING":
      return `
        bg-yellow-500/10
        text-yellow-600
        dark:text-yellow-400
      `;

    case "CONFIRMED":
      return `
        bg-blue-500/10
        text-blue-600
        dark:text-blue-400
      `;

    case "DELIVERED":
      return `
        bg-green-500/10
        text-green-600
        dark:text-green-400
      `;

    case "CANCELLED":
      return `
        bg-red-500/10
        text-red-600
        dark:text-red-400
      `;

    default:
      return `
        bg-neutral-500/10
        text-neutral-500
      `;
  }
}