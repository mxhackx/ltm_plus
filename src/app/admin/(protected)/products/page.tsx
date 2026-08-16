import {
  Archive,
  ArrowLeft,
  CalendarDays,
  Edit3,
  ImageIcon,
  Package,
  Plus,
  ShoppingBag,
  Tag,
  Trash2,
} from "lucide-react";

import Image from "next/image";
import Link from "next/link";

import { getProducts } from "@/lib/actions/admin/products";

export default async function AdminProductsPage() {
  const products = await getProducts();

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
                Produits
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
                Gérez les produits disponibles dans
                votre boutique.
              </p>
            </div>

            <div
              className="
                flex
                flex-wrap
                items-center
                gap-2
              "
            >
              {/* COMPTEUR */}

              <div
                className="
                  inline-flex
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
                <Package
                  size={15}
                  className="text-(--orange)"
                />

                {products.length}{" "}
                {products.length > 1
                  ? "produits"
                  : "produit"}
              </div>

              {/* AJOUTER */}

              <Link
                href="/admin/products/new"
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
                <Plus size={15} />

                Ajouter un produit
              </Link>
            </div>
          </div>
        </header>

        {/* ==================================================
            PRODUCTS
        ================================================== */}

        <section className="mt-10">
          {products.length === 0 ? (
            <EmptyState />
          ) : (
            <div
              className="
                grid
                gap-4
                sm:grid-cols-2
                xl:grid-cols-3
              "
            >
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
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
// PRODUCT CARD
// ============================================================

function ProductCard({
  product,
}: {
  product: {
    id: number;
    name: string;
    price: number;
    wasPrice: number | null;
    dimensions: string;
    category: string;
    description: string;
    imageUrl: string | null;
    createdAt: Date;
    updatedAt: Date;

    orderItems: {
      id: number;
      quantity: number;
    }[];
  };
}) {
  const quantitySold = product.orderItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <article
      className="
        flex
        flex-col
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
          IMAGE
      ================================================== */}

      <div
        className="
          relative
          aspect-[16/10]
          w-full
          overflow-hidden
          border-b
          border-neutral-200
          bg-neutral-100
          dark:border-white/10
          dark:bg-white/[0.02]
        "
      >
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="
              object-contain
              p-6
              transition
              duration-300
            "
            sizes="
              (max-width: 640px) 100vw,
              (max-width: 1280px) 50vw,
              33vw
            "
          />
        ) : (
          <div
            className="
              flex
              h-full
              flex-col
              items-center
              justify-center
              gap-2
              text-neutral-400
            "
          >
            <ImageIcon size={38} />

            <span className="text-xs">
              Aucune image
            </span>
          </div>
        )}

        {/* CATEGORY */}

        <span
          className="
            absolute
            right-4
            top-4
            rounded-full
            border
            border-white/20
            bg-black/50
            px-3
            py-1.5
            text-[10px]
            font-semibold
            text-white
            backdrop-blur-md
          "
        >
          {product.category}
        </span>
      </div>

      {/* ==================================================
          PRODUCT HEADER
      ================================================== */}

      <div
        className="
          flex
          items-start
          justify-between
          gap-4
          border-b
          border-neutral-200
          p-5
          dark:border-white/10
        "
      >
        <div
          className="
            flex
            min-w-0
            items-center
            gap-3
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
            <Package size={20} />
          </div>

          <div className="min-w-0">
            <h2
              className="
                truncate
                text-sm
                font-bold
              "
            >
              {product.name}
            </h2>

            <p
              className="
                mt-1
                text-xs
                text-neutral-400
              "
            >
              Produit #{product.id}
            </p>
          </div>
        </div>
      </div>

      {/* ==================================================
          CONTENT
      ================================================== */}

      <div className="flex flex-1 flex-col p-5">
        {/* PRIX */}

        <div>
          <p
            className="
              text-[10px]
              font-semibold
              uppercase
              tracking-wider
              text-neutral-400
            "
          >
            Prix
          </p>

          <div
            className="
              mt-1
              flex
              items-center
              gap-2
            "
          >
            <span
              className="
                text-2xl
                font-bold
              "
            >
              {formatPrice(product.price)}
            </span>

            {product.wasPrice && (
              <span
                className="
                  text-xs
                  text-neutral-400
                  line-through
                "
              >
                {formatPrice(product.wasPrice)}
              </span>
            )}
          </div>
        </div>

        {/* DESCRIPTION */}

        <p
          className="
            mt-4
            line-clamp-3
            text-sm
            leading-6
            text-neutral-600
            dark:text-neutral-400
          "
        >
          {product.description}
        </p>

        {/* INFOS */}

        <div
          className="
            mt-5
            grid
            grid-cols-2
            gap-2
          "
        >
          <InfoItem
            icon={<Tag size={14} />}
            label="Catégorie"
            value={product.category}
          />

          <InfoItem
            icon={<Archive size={14} />}
            label="Dimensions"
            value={product.dimensions}
          />

          <InfoItem
            icon={<ShoppingBag size={14} />}
            label="Vendus"
            value={`${quantitySold}`}
          />

          <InfoItem
            icon={<CalendarDays size={14} />}
            label="Créé le"
            value={formatShortDate(product.createdAt)}
          />
        </div>

        {/* ==================================================
            ACTIONS
        ================================================== */}

        <div
          className="
            mt-auto
            flex
            gap-2
            pt-5
          "
        >
          <Link
            href={`/admin/products/${product.id}/edit`}
            className="
              inline-flex
              flex-1
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
            <Edit3 size={14} />

            Modifier
          </Link>

          <button
            type="button"
            className="
              inline-flex
              items-center
              justify-center
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
      </div>

      {/* ==================================================
          FOOTER
      ================================================== */}

      <div
        className="
          border-t
          border-neutral-200
          px-5
          py-3
          text-[10px]
          text-neutral-400
          dark:border-white/10
        "
      >
        Dernière modification :{" "}
        {formatShortDate(product.updatedAt)}
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
        rounded-xl
        border
        border-neutral-200
        bg-white
        p-3
        dark:border-white/10
        dark:bg-white/[0.025]
      "
    >
      <div
        className="
          flex
          items-center
          gap-1.5
          text-neutral-400
        "
      >
        {icon}

        <span className="text-[10px]">
          {label}
        </span>
      </div>

      <p
        className="
          mt-1
          truncate
          text-xs
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
        <Package size={28} />
      </div>

      <h2
        className="
          mt-5
          text-xl
          font-bold
        "
      >
        Aucun produit
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
        Aucun produit n&apos;est actuellement
        enregistré dans votre catalogue.
      </p>

      <Link
        href="/admin/products/new"
        className="
          mt-5
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
        <Plus size={14} />

        Ajouter un produit
      </Link>
    </div>
  );
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
// DATE
// ============================================================

function formatShortDate(date: Date) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}