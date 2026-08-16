import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  Package,
  Phone,
  ShoppingBag,
  UserRound,
  XCircle,
} from "lucide-react";

import {
  getCurrentUser,
  } from "@/lib/actions/auth";

import {
  getOrderById,
} from "@/lib/actions/account";

// ============================================================
// TYPES
// ============================================================

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

// ============================================================
// STATUS
// ============================================================

const STATUS_CONFIG = {
  PENDING: {
    label: "En attente",

    description:
      "Votre commande a bien été enregistrée et attend sa confirmation.",

    className:
      "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",

    icon: Clock3,
  },

  CONFIRMED: {
    label: "Confirmée",

    description:
      "Votre commande a été confirmée.",

    className:
      "bg-blue-500/10 text-blue-600 dark:text-blue-400",

    icon: CheckCircle2,
  },

  DELIVERED: {
    label: "Livrée",

    description:
      "Votre commande a été livrée.",

    className:
      "bg-green-500/10 text-green-600 dark:text-green-400",

    icon: CheckCircle2,
  },

  CANCELLED: {
    label: "Annulée",

    description:
      "Cette commande a été annulée.",

    className:
      "bg-red-500/10 text-red-600 dark:text-red-400",

    icon: XCircle,
  },
} as const;

// ============================================================
// UTILITAIRES
// ============================================================

function formatPrice(value: number) {
  return `${new Intl.NumberFormat(
    "fr-FR"
  ).format(value)} F`;
}

function formatDate(date: string) {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Date inconnue";
  }

  return new Intl.DateTimeFormat(
    "fr-FR",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",

      hour: "2-digit",
      minute: "2-digit",
    }
  ).format(parsedDate);
}

function formatOrderId(id: number) {
  return String(id).padStart(6, "0");
}

// ============================================================
// PAGE
// ============================================================

export default async function OrderPage({
  params,
}: PageProps) {
  const user = await getCurrentUser();

  // ----------------------------------------------------------
  // AUTHENTIFICATION
  // ----------------------------------------------------------

  if (!user) {
    redirect("/login");
  }

  // ----------------------------------------------------------
  // PARAMÈTRE ID
  // ----------------------------------------------------------

  const { id } = await params;

  const orderId = Number(id);

  if (
    !Number.isInteger(orderId) ||
    orderId <= 0
  ) {
    notFound();
  }

  // ----------------------------------------------------------
  // COMMANDE
  // ----------------------------------------------------------

  const order =
    await getOrderById(orderId);

  if (!order) {
    notFound();
  }

  // ----------------------------------------------------------
  // STATUS
  // ----------------------------------------------------------

  const status =
    STATUS_CONFIG[order.status];

  const StatusIcon =
    status.icon;

  // ----------------------------------------------------------
  // CALCUL
  // ----------------------------------------------------------

  const itemsCount =
    order.items.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );

  // ==========================================================
  // RENDER
  // ==========================================================

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
          w-full
          max-w-5xl
          px-5
          py-10
          sm:px-8
          sm:py-14
          lg:px-10
          lg:py-16
        "
      >
        {/* ==================================================
            RETOUR
        ================================================== */}

        <Link
          href="/dashboard"
          className="
            group
            inline-flex
            items-center
            gap-2
            text-sm
            font-semibold
            text-neutral-500
            transition
            hover:text-(--orange)
            dark:text-neutral-400
          "
        >
          <ArrowLeft
            size={16}
            className="
              transition-transform
              group-hover:-translate-x-1
            "
          />

          Retour à mes commandes
        </Link>

        {/* ==================================================
            HEADER
        ================================================== */}

        <header
          className="
            mt-8
            flex
            flex-col
            gap-5
            border-b
            border-neutral-200
            pb-8
            dark:border-white/10
            sm:flex-row
            sm:items-end
            sm:justify-between
          "
        >
          <div>
            <div
              className="
                flex
                flex-wrap
                items-center
                gap-3
              "
            >
              <span
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  bg-(--orange)/10
                  px-3
                  py-1.5
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-(--orange)
                "
              >
                <ShoppingBag size={13} />

                Commande
              </span>

              <span
                className={`
                  inline-flex
                  items-center
                  gap-1.5
                  rounded-full
                  px-3
                  py-1.5
                  text-xs
                  font-semibold
                  ${status.className}
                `}
              >
                <StatusIcon size={14} />

                {status.label}
              </span>
            </div>

            <h1
              className="
                mt-4
                text-3xl
                font-bold
                tracking-tight
                sm:text-4xl
              "
            >
              #{formatOrderId(order.id)}
            </h1>

            <div
              className="
                mt-3
                flex
                items-center
                gap-2
                text-sm
                text-neutral-400
              "
            >
              <CalendarDays size={15} />

              {formatDate(order.date)}
            </div>
          </div>

          <div
            className="
              sm:text-right
            "
          >
            <p
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-neutral-400
              "
            >
              Total
            </p>

            <p
              className="
                mt-1
                text-2xl
                font-bold
                text-(--orange)
              "
            >
              {formatPrice(order.total)}
            </p>
          </div>
        </header>

        {/* ==================================================
            STATUS
        ================================================== */}

        <section
          className="
            mt-8
            rounded-3xl
            border
            border-neutral-200
            bg-neutral-50
            p-5
            dark:border-white/10
            dark:bg-white/[0.03]
            sm:p-6
          "
        >
          <div
            className="
              flex
              items-start
              gap-4
            "
          >
            <div
              className={`
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-2xl
                ${status.className}
              `}
            >
              <StatusIcon size={21} />
            </div>

            <div>
              <h2
                className="
                  text-sm
                  font-bold
                "
              >
                {status.label}
              </h2>

              <p
                className="
                  mt-1
                  text-sm
                  leading-6
                  text-neutral-500
                  dark:text-neutral-400
                "
              >
                {status.description}
              </p>
            </div>
          </div>
        </section>

        {/* ==================================================
            CONTENU
        ================================================== */}

        <div
          className="
            mt-8
            grid
            gap-6
            lg:grid-cols-[1fr_320px]
          "
        >
          {/* =================================================
              PRODUITS
          ================================================= */}

          <section>
            <div
              className="
                rounded-3xl
                border
                border-neutral-200
                bg-white
                dark:border-white/10
                dark:bg-white/[0.025]
              "
            >
              <div
                className="
                  border-b
                  border-neutral-100
                  p-5
                  dark:border-white/10
                  sm:p-6
                "
              >
                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-4
                  "
                >
                  <div>
                    <p
                      className="
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.18em]
                        text-(--orange)
                      "
                    >
                      Détails
                    </p>

                    <h2
                      className="
                        mt-1
                        text-xl
                        font-bold
                      "
                    >
                      Articles
                    </h2>
                  </div>

                  <span
                    className="
                      rounded-full
                      bg-neutral-100
                      px-3
                      py-1.5
                      text-xs
                      font-semibold
                      text-neutral-500
                      dark:bg-white/10
                      dark:text-neutral-300
                    "
                  >
                    {itemsCount}{" "}
                    {itemsCount > 1
                      ? "articles"
                      : "article"}
                  </span>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                {order.items.length === 0 ? (
                  <div
                    className="
                      rounded-2xl
                      border
                      border-dashed
                      border-neutral-200
                      p-8
                      text-center
                      text-sm
                      text-neutral-400
                      dark:border-white/10
                    "
                  >
                    Aucun article dans cette
                    commande.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {order.items.map(
                      (item) => {
                        const itemTotal =
                          item.unitPrice *
                          item.quantity;

                        return (
                          <article
                            key={item.id}
                            className="
                              rounded-2xl
                              border
                              border-neutral-200
                              bg-neutral-50
                              p-4
                              dark:border-white/10
                              dark:bg-white/[0.025]
                            "
                          >
                            <div
                              className="
                                flex
                                gap-4
                              "
                            >
                              <div
                                className="
                                  flex
                                  h-14
                                  w-14
                                  shrink-0
                                  items-center
                                  justify-center
                                  rounded-xl
                                  bg-(--orange)/10
                                  text-(--orange)
                                "
                              >
                                <Package
                                  size={23}
                                />
                              </div>

                              <div
                                className="
                                  min-w-0
                                  flex-1
                                "
                              >
                                <div
                                  className="
                                    flex
                                    flex-col
                                    gap-2
                                    sm:flex-row
                                    sm:items-start
                                    sm:justify-between
                                  "
                                >
                                  <div>
                                    <h3
                                      className="
                                        text-sm
                                        font-bold
                                      "
                                    >
                                      {
                                        item.product
                                          .name
                                      }
                                    </h3>

                                    <p
                                      className="
                                        mt-1
                                        text-xs
                                        text-neutral-400
                                      "
                                    >
                                      {
                                        item
                                          .product
                                          .category
                                      }
                                    </p>
                                  </div>

                                  <p
                                    className="
                                      text-sm
                                      font-bold
                                      text-(--orange)
                                    "
                                  >
                                    {formatPrice(
                                      itemTotal
                                    )}
                                  </p>
                                </div>

                                <div
                                  className="
                                    mt-3
                                    flex
                                    flex-wrap
                                    gap-x-5
                                    gap-y-2
                                    text-xs
                                    text-neutral-400
                                  "
                                >
                                  <span>
                                    Quantité :{" "}
                                    <strong
                                      className="
                                        font-semibold
                                        text-neutral-600
                                        dark:text-neutral-300
                                      "
                                    >
                                      {
                                        item.quantity
                                      }
                                    </strong>
                                  </span>

                                  <span>
                                    Prix unitaire :{" "}
                                    <strong
                                      className="
                                        font-semibold
                                        text-neutral-600
                                        dark:text-neutral-300
                                      "
                                    >
                                      {formatPrice(
                                        item.unitPrice
                                      )}
                                    </strong>
                                  </span>

                                  {item.product
                                    .dimensions && (
                                    <span>
                                      Dimensions :{" "}
                                      {
                                        item.product
                                          .dimensions
                                      }
                                    </span>
                                  )}
                                </div>

                                {item.product
                                  .description && (
                                  <p
                                    className="
                                      mt-3
                                      text-xs
                                      leading-5
                                      text-neutral-500
                                      dark:text-neutral-400
                                    "
                                  >
                                    {
                                      item.product
                                        .description
                                    }
                                  </p>
                                )}
                              </div>
                            </div>
                          </article>
                        );
                      }
                    )}
                  </div>
                )}
              </div>

              {/* ============================================
                  TOTAL
              ============================================ */}

              <div
                className="
                  border-t
                  border-neutral-100
                  p-5
                  dark:border-white/10
                  sm:p-6
                "
              >
                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-4
                  "
                >
                  <span
                    className="
                      text-sm
                      font-semibold
                      text-neutral-500
                    "
                  >
                    Total de la commande
                  </span>

                  <span
                    className="
                      text-xl
                      font-bold
                      text-(--orange)
                    "
                  >
                    {formatPrice(
                      order.total
                    )}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              INFORMATIONS
          ================================================= */}

          <aside className="space-y-6">
            {/* CLIENT */}

            <section
              className="
                rounded-3xl
                border
                border-neutral-200
                bg-white
                p-5
                dark:border-white/10
                dark:bg-white/[0.025]
                sm:p-6
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >
                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-(--orange)/10
                    text-(--orange)
                  "
                >
                  <UserRound size={19} />
                </div>

                <div>
                  <p
                    className="
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.16em]
                      text-(--orange)
                    "
                  >
                    Client
                  </p>

                  <h2
                    className="
                      mt-0.5
                      text-sm
                      font-bold
                    "
                  >
                    Informations client
                  </h2>
                </div>
              </div>

              <div
                className="
                  mt-5
                  space-y-4
                "
              >
                <div>
                  <p
                    className="
                      text-[10px]
                      uppercase
                      tracking-wider
                      text-neutral-400
                    "
                  >
                    Nom
                  </p>

                  <p
                    className="
                      mt-1
                      text-sm
                      font-semibold
                    "
                  >
                    {order.fullName}
                  </p>
                </div>

                <div>
                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      text-neutral-400
                    "
                  >
                    <Phone size={13} />

                    <span
                      className="
                        text-[10px]
                        uppercase
                        tracking-wider
                      "
                    >
                      Téléphone
                    </span>
                  </div>

                  <p
                    className="
                      mt-1
                      text-sm
                      font-semibold
                    "
                  >
                    {order.phone}
                  </p>
                </div>
              </div>
            </section>

            {/* LIVRAISON */}

            <section
              className="
                rounded-3xl
                border
                border-neutral-200
                bg-white
                p-5
                dark:border-white/10
                dark:bg-white/[0.025]
                sm:p-6
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >
                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-(--orange)/10
                    text-(--orange)
                  "
                >
                  <MapPin size={19} />
                </div>

                <div>
                  <p
                    className="
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.16em]
                      text-(--orange)
                    "
                  >
                    Livraison
                  </p>

                  <h2
                    className="
                      mt-0.5
                      text-sm
                      font-bold
                    "
                  >
                    Adresse
                  </h2>
                </div>
              </div>

              <div
                className="
                  mt-5
                  rounded-2xl
                  bg-neutral-50
                  p-4
                  text-sm
                  leading-6
                  text-neutral-600
                  dark:bg-white/[0.03]
                  dark:text-neutral-300
                "
              >
                {order.address}
              </div>
            </section>

            {/* RÉCAPITULATIF */}

            <section
              className="
                rounded-3xl
                border
                border-neutral-200
                bg-neutral-50
                p-5
                dark:border-white/10
                dark:bg-white/[0.03]
                sm:p-6
              "
            >
              <h2
                className="
                  text-sm
                  font-bold
                "
              >
                Résumé
              </h2>

              <div
                className="
                  mt-4
                  space-y-3
                "
              >
                <div
                  className="
                    flex
                    justify-between
                    gap-4
                    text-xs
                  "
                >
                  <span
                    className="
                      text-neutral-400
                    "
                  >
                    Articles
                  </span>

                  <span
                    className="
                      font-semibold
                    "
                  >
                    {itemsCount}
                  </span>
                </div>

                <div
                  className="
                    flex
                    justify-between
                    gap-4
                    text-xs
                  "
                >
                  <span
                    className="
                      text-neutral-400
                    "
                  >
                    Statut
                  </span>

                  <span
                    className="
                      font-semibold
                    "
                  >
                    {status.label}
                  </span>
                </div>

                <div
                  className="
                    border-t
                    border-neutral-200
                    pt-3
                    dark:border-white/10
                  "
                >
                  <div
                    className="
                      flex
                      justify-between
                      gap-4
                    "
                  >
                    <span
                      className="
                        text-sm
                        font-semibold
                      "
                    >
                      Total
                    </span>

                    <span
                      className="
                        text-sm
                        font-bold
                        text-(--orange)
                      "
                    >
                      {formatPrice(
                        order.total
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}