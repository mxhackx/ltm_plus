import {
  CalendarDays,
  Check,
  ChevronRight,
  ArrowLeft,
  MapPin,
  Package,
  Phone,
  ShoppingBag,
  UserRound,
} from "lucide-react";

import Link from "next/link";

import { getOrders } from "@/lib/actions/admin/orders";
import OrderActions from "@/components/order-actions";

export default async function AdminOrdersPage() {
  const orders = await getOrders();

  const pendingCount = orders.filter(
    (order) => order.status === "PENDING"
  ).length;

  const confirmedCount = orders.filter(
    (order) => order.status === "CONFIRMED"
  ).length;

  const deliveredCount = orders.filter(
    (order) => order.status === "DELIVERED"
  ).length;

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
              gap-5
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
                Commandes
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
                Gérez les commandes de vos clients et
                suivez leur progression.
              </p>
            </div>

            {/* TOTAL */}

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
              <ShoppingBag
                size={15}
                className="text-(--orange)"
              />

              {orders.length}{" "}
              {orders.length > 1
                ? "commandes"
                : "commande"}
            </div>
          </div>
        </header>

        {/* ==================================================
            STATISTIQUES
        ================================================== */}

        <section
          className="
            mt-8
            grid
            gap-3
            sm:grid-cols-3
          "
        >
          <StatCard
            icon={<Package size={17} />}
            label="En attente"
            value={pendingCount}
          />

          <StatCard
            icon={<Check size={17} />}
            label="Confirmées"
            value={confirmedCount}
          />

          <StatCard
            icon={<ShoppingBag size={17} />}
            label="Livrées"
            value={deliveredCount}
          />
        </section>

        {/* ==================================================
            ORDERS
        ================================================== */}

        <section className="mt-8">
          {orders.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
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
// ORDER CARD
// ============================================================

function OrderCard({
  order,
}: {
  order: {
    id: number;
    totalPrice: number;
    status: string;
    fullName: string;
    phone: string;
    address: string;
    createdAt: Date;

    user: {
      id: number;
      firstName: string;
      lastName: string;
      email: string;
    };

    items: {
      id: number;
      quantity: number;
      unitPrice: number;

      product: {
        id: number;
        name: string;
      };
    }[];
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
            <ShoppingBag size={20} />
          </div>

          <div className="min-w-0">
            <div
              className="
                flex
                flex-wrap
                items-center
                gap-2
              "
            >
              <h2
                className="
                  text-sm
                  font-bold
                "
              >
                Commande #{order.id}
              </h2>

              <StatusBadge status={order.status} />
            </div>

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
        </div>

        {/* TOTAL */}

        <div className="text-left sm:text-right">
          <p
            className="
              text-[10px]
              font-semibold
              uppercase
              tracking-wider
              text-neutral-400
            "
          >
            Total
          </p>

          <p
            className="
              mt-1
              text-lg
              font-bold
            "
          >
            {formatPrice(order.totalPrice)}
          </p>
        </div>
      </div>

      {/* ==================================================
          CONTENT
      ================================================== */}

      <div className="p-5 sm:p-6">
        {/* ==================================================
            CLIENT + LIVRAISON
        ================================================== */}

        <div
          className="
            grid
            gap-3
            lg:grid-cols-3
          "
        >
          {/* CLIENT */}

          <InfoBox
            icon={<UserRound size={15} />}
            label="Client"
          >
            <p className="text-sm font-semibold">
              {order.fullName}
            </p>

            <p
              className="
                mt-1
                truncate
                text-xs
                text-neutral-400
              "
            >
              {order.user.email}
            </p>
          </InfoBox>

          {/* TELEPHONE */}

          <InfoBox
            icon={<Phone size={15} />}
            label="Téléphone"
          >
            <a
              href={`tel:${order.phone}`}
              className="
                text-sm
                font-semibold
                transition
                hover:text-(--orange)
              "
            >
              {order.phone || "Non renseigné"}
            </a>
          </InfoBox>

          {/* ADRESSE */}

          <InfoBox
            icon={<MapPin size={15} />}
            label="Adresse de livraison"
          >
            <p
              className="
                text-sm
                font-semibold
                leading-5
              "
            >
              {order.address || "Non renseignée"}
            </p>
          </InfoBox>
        </div>

        {/* ==================================================
            PRODUITS
        ================================================== */}

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
            <Package size={15} />

            Produits
          </div>

          <div
            className="
              overflow-hidden
              rounded-2xl
              border
              border-neutral-200
              dark:border-white/10
            "
          >
            {order.items.map((item, index) => (
              <div
                key={item.id}
                className={`
                  flex
                  flex-col
                  gap-3
                  bg-white
                  p-4
                  dark:bg-white/[0.025]
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                  ${
                    index !== order.items.length - 1
                      ? "border-b border-neutral-200 dark:border-white/10"
                      : ""
                  }
                `}
              >
                <div className="min-w-0">
                  <p
                    className="
                      truncate
                      text-sm
                      font-semibold
                    "
                  >
                    {item.product.name}
                  </p>

                  <p
                    className="
                      mt-1
                      text-xs
                      text-neutral-400
                    "
                  >
                    {formatPrice(item.unitPrice)} ×{" "}
                    {item.quantity}
                  </p>
                </div>

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    text-sm
                    font-bold
                  "
                >
                  {formatPrice(
                    item.unitPrice * item.quantity
                  )}

                  <ChevronRight
                    size={15}
                    className="text-neutral-400"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ==================================================
            ACTIONS
        ================================================== */}

        <OrderActions
          orderId={order.id}
          status={order.status}
        />
      </div>
    </article>
  );
}

// ============================================================
// INFO BOX
// ============================================================

function InfoBox({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
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
          mb-2
          flex
          items-center
          gap-2
          text-xs
          text-neutral-400
        "
      >
        {icon}

        {label}
      </div>

      {children}
    </div>
  );
}

// ============================================================
// STAT CARD
// ============================================================

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-neutral-200
        bg-neutral-50
        p-4
        dark:border-white/10
        dark:bg-white/[0.03]
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
        "
      >
        <div
          className="
            flex
            items-center
            gap-2
            text-xs
            text-neutral-400
          "
        >
          {icon}

          {label}
        </div>

        <span
          className="
            text-xl
            font-bold
          "
        >
          {value}
        </span>
      </div>
    </div>
  );
}

// ============================================================
// STATUS BADGE
// ============================================================

function StatusBadge({
  status,
}: {
  status: string;
}) {
  return (
    <span
      className={`
        rounded-full
        px-2.5
        py-1
        text-[10px]
        font-semibold
        ${getStatusClass(status)}
      `}
    >
      {formatStatus(status)}
    </span>
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
        <ShoppingBag size={28} />
      </div>

      <h2
        className="
          mt-5
          text-xl
          font-bold
        "
      >
        Aucune commande
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
        Aucune commande n&apos;a encore été
        enregistrée.
      </p>
    </div>
  );
}

// ============================================================
// DATE
// ============================================================

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

// ============================================================
// PRICE
// ============================================================

function formatPrice(price: number) {
  return (
    new Intl.NumberFormat("fr-FR").format(price) +
    " FCFA"
  );
}

// ============================================================
// STATUS TEXT
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
// STATUS COLOR
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