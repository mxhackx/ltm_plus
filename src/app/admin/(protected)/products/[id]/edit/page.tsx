import {
  ArrowLeft,
  CalendarDays,
  ImageIcon,
  Package,
  Tag,
} from "lucide-react";

import Link from "next/link";
import Image from "next/image";

import { getProduct } from "@/lib/actions/admin/products";
import EditProductForm from "@/components/edit-product-form";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const productId = Number(id);

  if (!Number.isInteger(productId)) {
    return <ProductNotFound />;
  }

  const product = await getProduct(productId);

  if (!product) {
    return <ProductNotFound />;
  }

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
          <Link
            href="/admin/products"
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

            Retour aux produits
          </Link>

          <div className="mt-6">
            <p
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.2em]
                text-(--orange)
              "
            >
              Administration
            </p>

            <h1
              className="
                mt-2
                text-3xl
                font-bold
                tracking-tight
                sm:text-4xl
              "
            >
              Modifier le produit
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
              Modifiez les informations et l&apos;image
              de ce produit.
            </p>
          </div>
        </header>

        {/* ==================================================
            PRODUCT EDIT
        ================================================== */}

        <section
          className="
            mt-10
            grid
            gap-6
            lg:grid-cols-[0.8fr_1.2fr]
          "
        >
          {/* ==================================================
              IMAGE PREVIEW
          ================================================== */}

          <div
            className="
              h-fit
              overflow-hidden
              rounded-3xl
              border
              border-neutral-200
              bg-neutral-50
              dark:border-white/10
              dark:bg-white/[0.03]
            "
          >
            <div
              className="
                border-b
                border-neutral-200
                p-5
                dark:border-white/10
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
                <ImageIcon size={15} />

                Aperçu du produit
              </div>
            </div>

            <div
              className="
                relative
                aspect-square
                w-full
                bg-neutral-100
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
                    p-8
                  "
                  sizes="
                    (max-width: 1024px) 100vw,
                    40vw
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
                    gap-3
                    text-neutral-400
                  "
                >
                  <Package size={42} />

                  <p className="text-sm">
                    Aucune image
                  </p>
                </div>
              )}
            </div>

            {/* PRODUCT INFO */}

            <div
              className="
                border-t
                border-neutral-200
                p-5
                dark:border-white/10
              "
            >
              <h2
                className="
                  text-lg
                  font-bold
                "
              >
                {product.name}
              </h2>

              <div
                className="
                  mt-4
                  grid
                  grid-cols-2
                  gap-3
                "
              >
                <PreviewInfo
                  icon={<Tag size={14} />}
                  label="Catégorie"
                  value={product.category}
                />

                <PreviewInfo
                  icon={<CalendarDays size={14} />}
                  label="Créé"
                  value={formatDate(
                    product.createdAt
                  )}
                />
              </div>
            </div>
          </div>

          {/* ==================================================
              FORM
          ================================================== */}

          <EditProductForm product={product} />
        </section>
      </div>
    </main>
  );
}

// ============================================================
// PREVIEW INFO
// ============================================================

function PreviewInfo({
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
        {value}
      </p>
    </div>
  );
}

// ============================================================
// NOT FOUND
// ============================================================

function ProductNotFound() {
  return (
    <main
      className="
        flex
        min-h-screen
        items-center
        justify-center
        bg-white
        dark:bg-[#090909]
      "
    >
      <div className="text-center">
        <Package
          size={40}
          className="
            mx-auto
            text-neutral-400
          "
        />

        <h1
          className="
            mt-4
            text-xl
            font-bold
          "
        >
          Produit introuvable
        </h1>

        <Link
          href="/admin/products"
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
          "
        >
          <ArrowLeft size={14} />

          Retour aux produits
        </Link>
      </div>
    </main>
  );
}

// ============================================================
// DATE
// ============================================================

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}