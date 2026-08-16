"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  Package,
  ShoppingBag,
  Clock3,
  CheckCircle2,
  XCircle,
  UserRound,
  Mail,
  Phone,
  Trash2,
  AlertTriangle,
  FileText,
  Download,
  MessageCircle,
} from "lucide-react";

import jsPDF from "jspdf";

import {
  deleteCurrentUser,
  deleteOrder,
} from "@/lib/actions/account";

import "@/app/globals.css";

// ============================================================
// TYPES
// ============================================================

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
};

type OrderItem = {
  id: number;
  quantity: number;
  price: number;
  name: string;
  category: string;
  description: string;
  dimensions: string;
};

type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "DELIVERED"
  | "CANCELLED";

type Order = {
  id: number;
  date: string;
  total: number;
  status: OrderStatus;
  items: OrderItem[];
};

type DashboardClientProps = {
  user: User;
  orders: Order[];
};

// ============================================================
// TEXTES
// ============================================================

const DASHBOARD_DATA = {
  page: {
    badge: "Espace client",
    title: "Bonjour",
    description:
      "Retrouvez vos informations et suivez l'ensemble de vos commandes.",
    catalog: "Retour au catalogue",
  },

  profile: {
    title: "Mes informations",
    firstName: "Prénom",
    lastName: "Nom",
    email: "Email",
    telephone: "Téléphone",
    fallback: "Non renseigné",
    deleteAccount: "Supprimer mon compte",
    deleteAccountDescription:
      "Cette action supprimera définitivement vos informations et vos commandes.",
    deleteAccountConfirm:
      "Voulez-vous vraiment supprimer votre compte ? Cette action est irréversible.",
  },

  statistics: {
    orders: {
      label: "Commandes",
      singular: "commande",
      plural: "commandes",
    },

    active: {
      label: "En cours",
      singular: "commande active",
      plural: "commandes actives",
    },

    spent: {
      label: "Total achats",
      description: "toutes commandes confondues",
    },
  },

  history: {
    eyebrow: "Historique",
    title: "Vos commandes",
    orderCount: {
      singular: "commande",
      plural: "commandes",
    },
  },

  order: {
    total: "Total",
    quantity: "Quantité",
    whatsapp: "Commander via WhatsApp",

    article: {
      singular: "article",
      plural: "articles",
    },

    details: "Voir la commande",
    delete: "Supprimer",
    quote: "Générer le devis",

    previewMore: "autre article",
    previewMorePlural: "autres articles",

    noItems: "Cette commande ne contient aucun article.",

    productWithoutName: "Produit sans nom",
    product: "Produit",

    unknownDate: "Date inconnue",

    statuses: {
      pending: "En attente",
      confirmed: "Confirmée",
      delivered: "Livrée",
      cancelled: "Annulée",
    },

    empty: {
      title: "Aucune commande",
      description:
        "Vous n'avez encore passé aucune commande. Découvrez nos produits et trouvez ce dont vous avez besoin.",
      action: "Voir le catalogue",
    },
  },
} as const;

// ============================================================
// STATUS
// ============================================================

const STATUS_CONFIG: Record<
  OrderStatus,
  {
    label: string;
    className: string;
    icon: typeof Clock3;
  }
> = {
  PENDING: {
    label: DASHBOARD_DATA.order.statuses.pending,
    className:
      "bg-(--orange)/10 text-(--orange)",
    icon: Clock3,
  },

  CONFIRMED: {
    label: DASHBOARD_DATA.order.statuses.confirmed,
    className:
      "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    icon: CheckCircle2,
  },

  DELIVERED: {
    label: DASHBOARD_DATA.order.statuses.delivered,
    className:
      "bg-green-500/10 text-green-600 dark:text-green-400",
    icon: CheckCircle2,
  },

  CANCELLED: {
    label: DASHBOARD_DATA.order.statuses.cancelled,
    className:
      "bg-red-500/10 text-red-600 dark:text-red-400",
    icon: XCircle,
  },
};

// ============================================================
// UTILITAIRES
// ============================================================

function formatPrice(value: number) {
  return `${new Intl.NumberFormat("fr-FR").format(value)} F`;
}

function formatDate(date: string) {
  if (!date) {
    return DASHBOARD_DATA.order.unknownDate;
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return DASHBOARD_DATA.order.unknownDate;
  }

  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(parsedDate);
}

function formatOrderId(id: number) {
  return String(id).padStart(6, "0");
}

function getOrderTotal(order: Order) {
  return order.total;
}

// ============================================================
// PDF
// ============================================================

function generateQuotePDF(order: Order, user: User) {
  const doc = new jsPDF();

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const margin = 20;

  const orderNumber = formatOrderId(order.id);
  const quoteNumber = `DEVIS-${orderNumber}`;
  const date = formatDate(order.date);

  const items = order.items;
  const orderTotal = getOrderTotal(order);

  // ==========================================================
  // HEADER
  // ==========================================================

  doc.setFillColor(249, 115, 22);

  doc.rect(
    0,
    0,
    pageWidth,
    8,
    "F"
  );

  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(30, 30, 30);

  doc.text("DEVIS", margin, 28);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 100, 100);

  doc.text(
    quoteNumber,
    pageWidth - margin,
    22,
    {
      align: "right",
    }
  );

  doc.text(
    date,
    pageWidth - margin,
    29,
    {
      align: "right",
    }
  );

  // ==========================================================
  // ENTREPRISE
  // ==========================================================

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(30, 30, 30);

  doc.text(
    "Votre entreprise",
    margin,
    48
  );

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(90, 90, 90);

  doc.text(
    "Équipements électriques",
    margin,
    55
  );

  doc.text(
    "Téléphone : +229 XX XX XX XX",
    margin,
    61
  );

  doc.text(
    "Email : contact@example.com",
    margin,
    67
  );

  // ==========================================================
  // CLIENT
  // ==========================================================

  const clientX = pageWidth / 2 + 5;

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(30, 30, 30);

  doc.text("Client", clientX, 48);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(90, 90, 90);

  const clientName =
    `${user.firstName} ${user.lastName}`;

  doc.text(
    clientName,
    clientX,
    55
  );

  if (user.email) {
    doc.text(
      user.email,
      clientX,
      61
    );
  }

  if (user.telephone) {
    doc.text(
      user.telephone,
      clientX,
      67
    );
  }

  // ==========================================================
  // SEPARATION
  // ==========================================================

  doc.setDrawColor(220, 220, 220);

  doc.line(
    margin,
    77,
    pageWidth - margin,
    77
  );

  // ==========================================================
  // TABLEAU
  // ==========================================================

  let y = 90;

  const colProduct = margin;
  const colQuantity = 112;
  const colUnit = 137;
  const colTotal = 174;

  doc.setFillColor(245, 245, 245);

  doc.rect(
    margin,
    y - 6,
    pageWidth - margin * 2,
    12,
    "F"
  );

  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(60, 60, 60);

  doc.text(
    "PRODUIT",
    colProduct,
    y
  );

  doc.text(
    "QTÉ",
    colQuantity,
    y
  );

  doc.text(
    "PRIX UNIT.",
    colUnit,
    y
  );

  doc.text(
    "TOTAL",
    colTotal,
    y
  );

  y += 12;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(50, 50, 50);

  // ==========================================================
  // PRODUITS
  // ==========================================================

  items.forEach((item) => {
    const quantity = Number(item.quantity || 1);
    const unitPrice = Number(item.price || 0);
    const productTotal = unitPrice * quantity;

    if (y > 265) {
      doc.addPage();
      y = 25;
    }

    doc.text(
      item.name ||
        DASHBOARD_DATA.order.productWithoutName,
      colProduct,
      y
    );

    doc.text(
      String(quantity),
      colQuantity,
      y
    );

    doc.text(
      formatPrice(unitPrice),
      colUnit,
      y
    );

    doc.text(
      formatPrice(productTotal),
      colTotal,
      y
    );

    y += 10;

    if (item.description) {
      doc.setFontSize(7);
      doc.setTextColor(130, 130, 130);

      const description =
        doc.splitTextToSize(
          item.description,
          85
        );

      doc.text(
        description,
        colProduct,
        y
      );

      y += description.length * 4;

      doc.setFontSize(8);
      doc.setTextColor(50, 50, 50);
    }

    doc.setDrawColor(
      235,
      235,
      235
    );

    doc.line(
      margin,
      y,
      pageWidth - margin,
      y
    );

    y += 7;
  });

  // ==========================================================
  // TOTAL
  // ==========================================================

  y += 8;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 100, 100);

  doc.text(
    "Sous-total",
    130,
    y
  );

  doc.setFont("helvetica", "bold");
  doc.setTextColor(30, 30, 30);

  doc.text(
    formatPrice(orderTotal),
    pageWidth - margin,
    y,
    {
      align: "right",
    }
  );

  y += 10;

  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(249, 115, 22);

  doc.text("TOTAL", 130, y);

  doc.text(
    formatPrice(orderTotal),
    pageWidth - margin,
    y,
    {
      align: "right",
    }
  );

  // ==========================================================
  // CONDITIONS
  // ==========================================================

  y += 25;

  if (y > pageHeight - 40) {
    doc.addPage();
    y = 30;
  }

  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(50, 50, 50);

  doc.text(
    "Conditions",
    margin,
    y
  );

  y += 7;

  doc.setFont(
    "helvetica",
    "normal"
  );

  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);

  doc.text(
    "Ce devis est généré automatiquement à partir de votre commande.",
    margin,
    y
  );

  y += 5;

  doc.text(
    "Les prix sont exprimés en FCFA.",
    margin,
    y
  );

  // ==========================================================
  // FOOTER
  // ==========================================================

  doc.setDrawColor(
    220,
    220,
    220
  );

  doc.line(
    margin,
    pageHeight - 20,
    pageWidth - margin,
    pageHeight - 20
  );

  doc.setFontSize(7);
  doc.setTextColor(
    150,
    150,
    150
  );

  doc.text(
    "Document généré automatiquement",
    pageWidth / 2,
    pageHeight - 12,
    {
      align: "center",
    }
  );

  doc.save(
    `${quoteNumber}.pdf`
  );
}

// ============================================================
// DASHBOARD
// ============================================================

export default function DashboardClient({
  user,
  orders,
}: DashboardClientProps) {
  const [currentOrders, setCurrentOrders] =
    useState<Order[]>(orders);

  const [deletingOrderId, setDeletingOrderId] =
    useState<number | null>(null);

  const [deletingAccount, setDeletingAccount] =
    useState(false);

  // ==========================================================
  // STATISTIQUES
  // ==========================================================

  const statistics = useMemo(() => {
    const total = currentOrders.length;

    const active =
      currentOrders.filter(
        (order) =>
          order.status !== "DELIVERED" &&
          order.status !== "CANCELLED"
      ).length;

    const spent =
      currentOrders.reduce(
        (total, order) =>
          total + getOrderTotal(order),
        0
      );

    return {
      total,
      active,
      spent,
    };
  }, [currentOrders]);

  // ==========================================================
  // WHATSAPP
  // ==========================================================

  function handleWhatsAppOrder(order: Order) {
    if (order.items.length === 0) {
      return;
    }

    const orderNumber =
      formatOrderId(order.id);

    const orderTotal =
      getOrderTotal(order);

    const customerName =
      `${user.firstName} ${user.lastName}`;

    const productsMessage =
      order.items
        .map((item, index) => {
          const quantity =
            Number(item.quantity || 1);

          const price =
            Number(item.price || 0);

          const itemTotal =
            price * quantity;

          return `${index + 1}. ${
            item.name ||
            DASHBOARD_DATA.order.productWithoutName
          }
Quantité : ${quantity}
Prix unitaire : ${formatPrice(price)}
Total : ${formatPrice(itemTotal)}`;
        })
        .join("\n\n");

    const message =
      `Bonjour, je souhaite commander la commande #${orderNumber}.

Client : ${customerName}${
        user.telephone
          ? `\nTéléphone : ${user.telephone}`
          : ""
      }${
        user.email
          ? `\nEmail : ${user.email}`
          : ""
      }

Produits :

${productsMessage}

Total : ${formatPrice(orderTotal)}

Merci.`;

    const phoneNumber =
      "2290197280976";

    const whatsappUrl =
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
        message
      )}`;

    window.open(
      whatsappUrl,
      "_blank",
      "noopener,noreferrer"
    );
  }

  // ==========================================================
  // SUPPRIMER COMMANDE
  // ==========================================================

  async function handleDeleteOrder(
    orderId: number
  ) {
    const confirmed =
      window.confirm(
        "Voulez-vous vraiment supprimer cette commande ?"
      );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingOrderId(orderId);

      await deleteOrder(orderId);

      setCurrentOrders((orders) =>
        orders.filter(
          (order) => order.id !== orderId
        )
      );
    } catch (error) {
      console.error(
        "DELETE_ORDER_ERROR:",
        error
      );

      window.alert(
        "Impossible de supprimer cette commande."
      );
    } finally {
      setDeletingOrderId(null);
    }
  }

  // ==========================================================
  // SUPPRIMER COMPTE
  // ==========================================================

  async function handleDeleteAccount() {
    const confirmed =
      window.confirm(
        DASHBOARD_DATA.profile.deleteAccountConfirm
      );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingAccount(true);

      await deleteCurrentUser();

      window.location.href = "/";
    } catch (error) {
      console.error(
        "DELETE_ACCOUNT_ERROR:",
        error
      );

      window.alert(
        "Impossible de supprimer votre compte."
      );

      setDeletingAccount(false);
    }
  }

  // ==========================================================
  // RENDU
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
          max-w-6xl
          px-5
          py-12
          sm:px-8
          sm:py-16
          lg:px-10
          lg:py-20
        "
      >
        {/* ==================================================
            HEADER
        ================================================== */}

        <header
          className="
            mx-auto
            max-w-3xl
            text-center
          "
        >
          <div
            className="
              mx-auto
              mb-4
              flex
              w-fit
              items-center
              gap-2
              rounded-full
              border
              border-(--orange)/20
              bg-(--orange)/5
              px-3
              py-1.5
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.2em]
              text-(--orange)
            "
          >
            <ShoppingBag size={13} />

            {DASHBOARD_DATA.page.badge}
          </div>

          <h1
            className="
              text-3xl
              font-bold
              tracking-tight
              sm:text-4xl
              lg:text-5xl
            "
          >
            {DASHBOARD_DATA.page.title}{" "}
            {user.firstName}
          </h1>

          <p
            className="
              mx-auto
              mt-4
              max-w-xl
              text-sm
              leading-6
              text-neutral-500
              dark:text-neutral-400
              sm:text-base
              sm:leading-7
            "
          >
            {DASHBOARD_DATA.page.description}
          </p>

          <Link
            href="/catalog"
            className="
              group
              mx-auto
              mt-6
              inline-flex
              items-center
              gap-2
              text-sm
              font-semibold
              text-(--orange)
            "
          >
            {DASHBOARD_DATA.page.catalog}

            <ArrowRight
              size={16}
              className="
                transition-transform
                group-hover:translate-x-1
              "
            />
          </Link>
        </header>

        {/* ==================================================
            PROFIL
        ================================================== */}

        <section
          className="
            mx-auto
            mt-12
            max-w-4xl
          "
        >
          <div
            className="
              overflow-hidden
              rounded-3xl
              border
              border-neutral-200
              bg-neutral-50
              dark:border-white/10
              dark:bg-white/[0.03]
            "
          >
            <div className="p-5 sm:p-6">
              <div
                className="
                  flex
                  flex-col
                  gap-6
                  sm:flex-row
                  sm:items-center
                "
              >
                <div
                  className="
                    flex
                    h-16
                    w-16
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    bg-(--orange)/10
                    text-(--orange)
                  "
                >
                  <UserRound size={28} />
                </div>

                <div className="min-w-0">
                  <p
                    className="
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.18em]
                      text-(--orange)
                    "
                  >
                    {DASHBOARD_DATA.profile.title}
                  </p>

                  <h2
                    className="
                      mt-1
                      text-xl
                      font-bold
                    "
                  >
                    {user.firstName}{" "}
                    {user.lastName}
                  </h2>
                </div>
              </div>

              <div
                className="
                  mt-6
                  grid
                  gap-3
                  sm:grid-cols-3
                "
              >
                {/* PRENOM */}

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
                    <UserRound size={15} />

                    <span className="text-xs">
                      {DASHBOARD_DATA.profile.firstName}
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
                    {user.firstName ||
                      DASHBOARD_DATA.profile.fallback}
                  </p>
                </div>

                {/* EMAIL */}

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
                    <Mail size={15} />

                    <span className="text-xs">
                      {DASHBOARD_DATA.profile.email}
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
                    {user.email ||
                      DASHBOARD_DATA.profile.fallback}
                  </p>
                </div>

                {/* TELEPHONE */}

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
                    <Phone size={15} />

                    <span className="text-xs">
                      {DASHBOARD_DATA.profile.telephone}
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
                    {user.telephone ||
                      DASHBOARD_DATA.profile.fallback}
                  </p>
                </div>
              </div>

              {/* SUPPRESSION COMPTE */}

              <div
                className="
                  mt-6
                  border-t
                  border-neutral-200
                  pt-6
                  dark:border-white/10
                "
              >
                <div
                  className="
                    flex
                    flex-col
                    gap-4
                    rounded-2xl
                    border
                    border-red-200
                    bg-red-50
                    p-4
                    dark:border-red-500/20
                    dark:bg-red-500/[0.05]
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                  "
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-red-500/10
                        text-red-500
                      "
                    >
                      <AlertTriangle size={18} />
                    </div>

                    <div>
                      <p
                        className="
                          text-sm
                          font-semibold
                          text-red-600
                          dark:text-red-400
                        "
                      >
                        {DASHBOARD_DATA.profile.deleteAccount}
                      </p>

                      <p
                        className="
                          mt-1
                          max-w-lg
                          text-xs
                          leading-5
                          text-red-500/70
                          dark:text-red-400/70
                        "
                      >
                        {
                          DASHBOARD_DATA.profile
                            .deleteAccountDescription
                        }
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={deletingAccount}
                    onClick={handleDeleteAccount}
                    className="
                      inline-flex
                      shrink-0
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      border
                      border-red-200
                      bg-white
                      px-4
                      py-2.5
                      text-xs
                      font-semibold
                      text-red-500
                      transition
                      hover:bg-red-100
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                      dark:border-red-500/20
                      dark:bg-red-500/5
                      dark:hover:bg-red-500/10
                    "
                  >
                    <Trash2 size={15} />

                    {deletingAccount
                      ? "Suppression..."
                      : DASHBOARD_DATA.profile.deleteAccount}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            STATISTIQUES
        ================================================== */}

        <section
          className="
            mx-auto
            mt-8
            grid
            max-w-4xl
            gap-3
            sm:grid-cols-3
            sm:gap-4
          "
        >
          {/* COMMANDES */}

          <div
            className="
              rounded-2xl
              border
              border-neutral-200
              bg-neutral-50
              p-5
              dark:border-white/10
              dark:bg-white/[0.03]
            "
          >
            <div className="flex items-center justify-between">
              <span
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-neutral-400
                "
              >
                {DASHBOARD_DATA.statistics.orders.label}
              </span>

              <div
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-xl
                  bg-(--orange)/10
                  text-(--orange)
                "
              >
                <ShoppingBag size={16} />
              </div>
            </div>

            <p className="mt-4 text-2xl font-bold">
              {statistics.total}
            </p>

            <p className="mt-1 text-xs text-neutral-400">
              {statistics.total > 1
                ? DASHBOARD_DATA.statistics.orders.plural
                : DASHBOARD_DATA.statistics.orders.singular}
            </p>
          </div>

          {/* ACTIVES */}

          <div
            className="
              rounded-2xl
              border
              border-neutral-200
              bg-neutral-50
              p-5
              dark:border-white/10
              dark:bg-white/[0.03]
            "
          >
            <div className="flex items-center justify-between">
              <span
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-neutral-400
                "
              >
                {DASHBOARD_DATA.statistics.active.label}
              </span>

              <div
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-xl
                  bg-blue-500/10
                  text-blue-500
                "
              >
                <Clock3 size={16} />
              </div>
            </div>

            <p className="mt-4 text-2xl font-bold">
              {statistics.active}
            </p>

            <p className="mt-1 text-xs text-neutral-400">
              {statistics.active > 1
                ? DASHBOARD_DATA.statistics.active.plural
                : DASHBOARD_DATA.statistics.active.singular}
            </p>
          </div>

          {/* TOTAL ACHATS */}

          <div
            className="
              rounded-2xl
              border
              border-neutral-200
              bg-neutral-50
              p-5
              dark:border-white/10
              dark:bg-white/[0.03]
            "
          >
            <div className="flex items-center justify-between">
              <span
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-neutral-400
                "
              >
                {DASHBOARD_DATA.statistics.spent.label}
              </span>

              <div
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-xl
                  bg-green-500/10
                  text-green-500
                "
              >
                <Package size={16} />
              </div>
            </div>

            <p className="mt-4 text-2xl font-bold">
              {formatPrice(statistics.spent)}
            </p>

            <p className="mt-1 text-xs text-neutral-400">
              {DASHBOARD_DATA.statistics.spent.description}
            </p>
          </div>
        </section>

        {/* ==================================================
            HISTORIQUE
        ================================================== */}

        {currentOrders.length > 0 && (
          <section
            className="
              mx-auto
              mt-14
              max-w-4xl
            "
          >
            <div
              className="
                mb-5
                flex
                items-end
                justify-between
              "
            >
              <div>
                <p
                  className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                    text-(--orange)
                  "
                >
                  {DASHBOARD_DATA.history.eyebrow}
                </p>

                <h2
                  className="
                    mt-1
                    text-xl
                    font-bold
                    sm:text-2xl
                  "
                >
                  {DASHBOARD_DATA.history.title}
                </h2>
              </div>

              <span className="text-xs text-neutral-400">
                {currentOrders.length}{" "}
                {currentOrders.length > 1
                  ? DASHBOARD_DATA.history.orderCount.plural
                  : DASHBOARD_DATA.history.orderCount.singular}
              </span>
            </div>

            <div className="space-y-4">
              {currentOrders.map((order) => {
                const status =
                  STATUS_CONFIG[order.status];

                const StatusIcon =
                  status.icon;

                const items = order.items;

                const orderTotal =
                  getOrderTotal(order);

                const previewItems =
                  items.slice(0, 3);

                const remainingItems =
                  Math.max(
                    items.length - 3,
                    0
                  );

                return (
                  <article
                    key={order.id}
                    className="
                      overflow-hidden
                      rounded-3xl
                      border
                      border-neutral-200
                      bg-white
                      transition
                      duration-300
                      hover:border-(--orange)/30
                      hover:shadow-lg
                      hover:shadow-black/5
                      dark:border-white/10
                      dark:bg-white/[0.025]
                    "
                  >
                    {/* HEADER */}

                    <div
                      className="
                        flex
                        flex-col
                        gap-4
                        border-b
                        border-neutral-100
                        p-5
                        dark:border-white/10
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                        sm:px-6
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
                          <h3
                            className="
                              text-sm
                              font-bold
                            "
                          >
                            #{formatOrderId(order.id)}
                          </h3>

                          <span
                            className={`
                              inline-flex
                              items-center
                              gap-1.5
                              rounded-full
                              px-2.5
                              py-1
                              text-[10px]
                              font-semibold
                              ${status.className}
                            `}
                          >
                            <StatusIcon size={12} />

                            {status.label}
                          </span>
                        </div>

                        <div
                          className="
                            mt-2
                            flex
                            items-center
                            gap-2
                            text-xs
                            text-neutral-400
                          "
                        >
                          <CalendarDays size={13} />

                          {formatDate(order.date)}
                        </div>
                      </div>

                      <div className="sm:text-right">
                        <p
                          className="
                            text-[10px]
                            uppercase
                            tracking-[0.15em]
                            text-neutral-400
                          "
                        >
                          {DASHBOARD_DATA.order.total}
                        </p>

                        <p
                          className="
                            mt-1
                            text-xl
                            font-bold
                            text-(--orange)
                          "
                        >
                          {formatPrice(orderTotal)}
                        </p>
                      </div>
                    </div>

                    {/* PRODUITS */}

                    <div className="p-5 sm:p-6">
                      {items.length === 0 ? (
                        <div
                          className="
                            rounded-2xl
                            border
                            border-dashed
                            border-neutral-200
                            p-6
                            text-center
                            text-sm
                            text-neutral-400
                            dark:border-white/10
                          "
                        >
                          {DASHBOARD_DATA.order.noItems}
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {previewItems.map((item) => {
                            const quantity =
                              Number(
                                item.quantity || 1
                              );

                            const price =
                              Number(
                                item.price || 0
                              );

                            return (
                              <div
                                key={item.id}
                                className="
                                  flex
                                  items-center
                                  gap-3
                                  rounded-2xl
                                  border
                                  border-neutral-200
                                  bg-neutral-50
                                  p-3
                                  dark:border-white/10
                                  dark:bg-white/[0.025]
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
                                  <Package size={22} />
                                </div>

                                <div
                                  className="
                                    min-w-0
                                    flex-1
                                  "
                                >
                                  <p
                                    className="
                                      truncate
                                      text-sm
                                      font-semibold
                                    "
                                  >
                                    {item.name ||
                                      DASHBOARD_DATA.order.productWithoutName}
                                  </p>

                                  <p
                                    className="
                                      mt-1
                                      truncate
                                      text-xs
                                      text-neutral-400
                                    "
                                  >
                                    {item.category ||
                                      DASHBOARD_DATA.order.product}

                                    {" · "}

                                    ×{quantity}
                                  </p>

                                  {item.dimensions && (
                                    <p
                                      className="
                                        mt-1
                                        truncate
                                        text-[11px]
                                        text-neutral-400
                                      "
                                    >
                                      {item.dimensions}
                                    </p>
                                  )}
                                </div>

                                <p
                                  className="
                                    shrink-0
                                    text-sm
                                    font-bold
                                    text-(--orange)
                                  "
                                >
                                  {formatPrice(
                                    price * quantity
                                  )}
                                </p>
                              </div>
                            );
                          })}

                          {remainingItems > 0 && (
                            <p
                              className="
                                px-1
                                text-xs
                                text-neutral-400
                              "
                            >
                              + {remainingItems}{" "}
                              {remainingItems > 1
                                ? DASHBOARD_DATA.order.previewMorePlural
                                : DASHBOARD_DATA.order.previewMore}
                            </p>
                          )}
                        </div>
                      )}

                      {/* FOOTER */}

                      <div
                        className="
                          mt-5
                          flex
                          flex-col
                          gap-3
                          border-t
                          border-neutral-100
                          pt-5
                          dark:border-white/10
                          sm:flex-row
                          sm:items-center
                          sm:justify-between
                        "
                      >
                        <div>
                          <p
                            className="
                              text-xs
                              text-neutral-400
                            "
                          >
                            {items.length}{" "}
                            {items.length > 1
                              ? DASHBOARD_DATA.order.article.plural
                              : DASHBOARD_DATA.order.article.singular}
                          </p>

                          <p
                            className="
                              mt-1
                              text-sm
                              font-bold
                            "
                          >
                            {formatPrice(orderTotal)}
                          </p>
                        </div>

                        {/* ACTIONS */}

                        <div
                          className="
                            flex
                            flex-wrap
                            items-center
                            gap-2
                          "
                        >
                          {/* WHATSAPP */}

                          <button
                            type="button"
                            onClick={() =>
                              handleWhatsAppOrder(
                                order
                              )
                            }
                            disabled={
                              items.length === 0
                            }
                            className="
                              inline-flex
                              items-center
                              justify-center
                              gap-2
                              rounded-xl
                              bg-green-600
                              px-4
                              py-2.5
                              text-xs
                              font-semibold
                              text-white
                              transition
                              hover:bg-green-700
                              disabled:cursor-not-allowed
                              disabled:opacity-40
                            "
                          >
                            <MessageCircle size={15} />

                            {DASHBOARD_DATA.order.whatsapp}
                          </button>

                          {/* PDF */}

                          <button
                            type="button"
                            onClick={() =>
                              generateQuotePDF(
                                order,
                                user
                              )
                            }
                            className="
                              inline-flex
                              items-center
                              justify-center
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
                              hover:bg-(--orange)/5
                              hover:text-(--orange)
                              dark:border-white/10
                              dark:bg-white/[0.03]
                              dark:text-neutral-300
                              dark:hover:bg-(--orange)/10
                              dark:hover:text-(--orange)
                            "
                          >
                            <FileText size={15} />

                            {DASHBOARD_DATA.order.quote}

                            <Download size={13} />
                          </button>

                          {/* DELETE */}

                          <button
                            type="button"
                            disabled={
                              deletingOrderId ===
                              order.id
                            }
                            onClick={() =>
                              handleDeleteOrder(
                                order.id
                              )
                            }
                            className="
                              inline-flex
                              items-center
                              justify-center
                              gap-2
                              rounded-xl
                              border
                              border-red-200
                              bg-red-50
                              px-4
                              py-2.5
                              text-xs
                              font-semibold
                              text-red-500
                              transition
                              hover:bg-red-100
                              disabled:cursor-not-allowed
                              disabled:opacity-50
                              dark:border-red-500/20
                              dark:bg-red-500/5
                              dark:hover:bg-red-500/10
                            "
                          >
                            <Trash2 size={15} />

                            {deletingOrderId ===
                            order.id
                              ? "Suppression..."
                              : DASHBOARD_DATA.order.delete}
                          </button>

                          {/* DETAILS */}

                          <Link
                            href={`/dashboard/orders/${order.id}`}
                            className="
                              group/link
                              inline-flex
                              items-center
                              justify-center
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
                            {DASHBOARD_DATA.order.details}

                            <ChevronRight
                              size={15}
                              className="
                                transition-transform
                                group-hover/link:translate-x-0.5
                              "
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {/* ==================================================
            AUCUNE COMMANDE
        ================================================== */}

        {currentOrders.length === 0 && (
          <section
            className="
              mx-auto
              mt-14
              max-w-4xl
            "
          >
            <div
              className="
                rounded-3xl
                border
                border-dashed
                border-neutral-200
                bg-neutral-50
                px-6
                py-14
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
                <ShoppingBag size={28} />
              </div>

              <h2
                className="
                  mt-5
                  text-xl
                  font-bold
                "
              >
                {DASHBOARD_DATA.order.empty.title}
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
                {DASHBOARD_DATA.order.empty.description}
              </p>

              <Link
                href="/catalog"
                className="
                  mt-6
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-(--orange)
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:brightness-110
                "
              >
                {DASHBOARD_DATA.order.empty.action}

                <ArrowRight size={16} />
              </Link>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}