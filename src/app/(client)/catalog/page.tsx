"use client";

import {
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
  ShoppingBag,
} from "lucide-react";

import Image from "next/image";
import tube from "@/../public/tube.jpg";

import CatalogCard from "@/components/card_catalog";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";

import { Button } from "@/components/ui/button";

// ============================================================
// TYPES
// ============================================================

type Product = {
  id: number;
  name: string;
  description: string;
  category: string;
  dimensions: string;
  wasPrice: number | null;
  price: number;
};

// Produit utilisé par le panier
type CartProduct = Product;

// ============================================================
// CATALOGUE
// ============================================================

const CATALOG_DATA = {
  currency: "F CFA",

  labels: {
    technicalSheet: "Fiche technique",

    search: "Rechercher",

    noProduct:
      "Aucun produit ne correspond à votre recherche. Essayez un autre mot-clé ou une autre catégorie.",

    product: {
      dimension: "Dimension",
      category: "Catégorie",
      oldPrice: "Prix barré",
      price: "Prix",
    },

    navigation: {
      previousProduct: "Produit précédent",
      nextProduct: "Produit suivant",
      viewProduct: "Voir",
    },

    order: "Commander",

    searchInput: {
      placeholder: "Rechercher un tube, une gaine…",
      ariaLabel: "Rechercher un produit",
    },

    categoryFilter: "Filtrer par catégorie",

    results: {
      singular: "produit",
      plural: "produits",
    },
  },
};

// ============================================================
// LOCAL STORAGE
// ============================================================

export function getOrders(
  setLocal: (orders: CartProduct[]) => void
) {
  const existingOrders = localStorage.getItem("orders");

  if (!existingOrders) {
    setLocal([]);
    return;
  }

  try {
    const parsed = JSON.parse(existingOrders);

    if (Array.isArray(parsed)) {
      setLocal(parsed);
    } else {
      setLocal([]);
    }
  } catch {
    localStorage.removeItem("orders");
    setLocal([]);
  }
}

// ============================================================
// PAGE CATALOGUE
// ============================================================

export default function Catalog() {
  // ==========================================================
  // PRODUITS DEPUIS LA DB
  // ==========================================================

  const [products, setProducts] = useState<Product[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  // ==========================================================
  // ETATS
  // ==========================================================

  const [slide, setSlide] = useState(0);

  const [query, setQuery] = useState("");

  const [category, setCategory] = useState(
    "Toutes catégories"
  );

  const [local, setLocal] = useState<CartProduct[]>([]);

  const [showSuccess, setShowSuccess] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const successTimeout =
    useRef<NodeJS.Timeout | null>(null);

  // ==========================================================
  // RECUPERATION DES PRODUITS
  // ==========================================================

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/products", {
          method: "GET",
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(
            "Impossible de récupérer les produits."
          );
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error(
            "Les données reçues sont invalides."
          );
        }

        setProducts(data);

      } catch (error) {
        console.error("LOAD_PRODUCTS_ERROR:", error);

        setError(
          "Impossible de charger les produits."
        );
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  // ==========================================================
  // CHARGER LE PANIER
  // ==========================================================

  useEffect(() => {
    getOrders(setLocal);
  }, []);

  // ==========================================================
  // SAUVEGARDER LE PANIER
  // ==========================================================

  function saveOrder(orders: CartProduct[]) {
    localStorage.setItem(
      "orders",
      JSON.stringify(orders)
    );

    setLocal(orders);
  }

  // ==========================================================
  // AJOUTER AU PANIER
  // ==========================================================

  function addOrders(order: CartProduct) {
    const existingOrders =
      localStorage.getItem("orders");

    let ordersArray: CartProduct[] = [];

    if (existingOrders) {
      try {
        const parsed = JSON.parse(existingOrders);

        if (Array.isArray(parsed)) {
          ordersArray = parsed;
        }
      } catch {
        ordersArray = [];
      }
    }

    ordersArray.push(order);

    saveOrder(ordersArray);
  }

  // ==========================================================
  // MESSAGE SUCCES
  // ==========================================================

  function showOrderSuccess() {
    setShowSuccess(true);

    if (successTimeout.current) {
      clearTimeout(successTimeout.current);
    }

    successTimeout.current = setTimeout(() => {
      setShowSuccess(false);
    }, 2000);
  }

  // ==========================================================
  // CATEGORIES
  // ==========================================================

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(
        products.map((product) => product.category)
      )
    );

    return [
      "Toutes catégories",
      ...uniqueCategories,
    ];
  }, [products]);

  // ==========================================================
  // FILTRAGE
  // ==========================================================

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return products.filter((item) => {
      const matchesQuery =
        q === "" ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);

      const matchesCategory =
        category === "Toutes catégories" ||
        item.category === category;

      return (
        matchesQuery &&
        matchesCategory
      );
    });
  }, [
    products,
    query,
    category,
  ]);

  // ==========================================================
  // PRODUIT HERO
  // ==========================================================

  const hero =
    products[slide] ?? null;

  // ==========================================================
  // RECHERCHE
  // ==========================================================

  function handleSearch(
    e: FormEvent
  ) {
    e.preventDefault();

    setQuery(
      inputRef.current?.value ?? ""
    );
  }

  // ==========================================================
  // PRODUIT PRECEDENT
  // ==========================================================

  function previousProduct() {
    setSlide((prev) =>
      Math.max(prev - 1, 0)
    );
  }

  // ==========================================================
  // PRODUIT SUIVANT
  // ==========================================================

  function nextProduct() {
    setSlide((prev) =>
      Math.min(
        prev + 1,
        products.length - 1
      )
    );
  }

  // ==========================================================
  // COMMANDER PRODUIT HERO
  // ==========================================================

  function handleCommand() {
    if (!hero) {
      return;
    }

    const data: CartProduct = {
      id: hero.id,

      name: hero.name,

      description: hero.description,

      category: hero.category,

      dimensions: hero.dimensions,

      wasPrice: hero.wasPrice,

      price: hero.price,
    };

    addOrders(data);

    showOrderSuccess();
  }

  // ==========================================================
  // CHARGEMENT
  // ==========================================================

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F6F5F1] text-[#14171A] dark:bg-[#14171A] dark:text-[#F6F5F1]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-[var(--orange)] border-t-transparent" />

          <p className="text-sm text-[#7A828A]">
            Chargement des produits...
          </p>
        </div>
      </main>
    );
  }

  // ==========================================================
  // ERREUR
  // ==========================================================

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F6F5F1] px-5 text-[#14171A] dark:bg-[#14171A] dark:text-[#F6F5F1]">
        <div className="max-w-md rounded-2xl border border-red-300 bg-white p-8 text-center shadow-sm dark:border-red-500/30 dark:bg-[#1B1F23]">
          <p className="text-sm font-medium text-red-500">
            {error}
          </p>

          <button
            type="button"
            onClick={() =>
              window.location.reload()
            }
            className="mt-5 rounded-xl bg-[var(--orange)] px-5 py-2.5 text-sm font-semibold text-white"
          >
            Réessayer
          </button>
        </div>
      </main>
    );
  }

  // ==========================================================
  // AUCUN PRODUIT
  // ==========================================================

  if (products.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F6F5F1] text-[#14171A] dark:bg-[#14171A] dark:text-[#F6F5F1]">
        <div className="text-center">
          <Search
            size={35}
            className="mx-auto mb-4 text-[var(--orange)]"
          />

          <h1 className="text-xl font-bold">
            Aucun produit
          </h1>

          <p className="mt-2 text-sm text-[#7A828A]">
            Aucun produit n'est actuellement disponible.
          </p>
        </div>
      </main>
    );
  }

  // ==========================================================
  // RENDU
  // ==========================================================

  return (
    <main className="min-h-screen w-full bg-[#F6F5F1] text-[#14171A] dark:bg-[#14171A] dark:text-[#F6F5F1]">

      {/* =====================================================
          SUCCESS
      ===================================================== */}

      {showSuccess && (
        <div className="fixed left-1/2 top-5 z-50 flex -translate-x-1/2 items-center gap-2 rounded-xl border border-green-400/20 bg-white px-5 py-3 text-sm font-medium text-green-500 shadow-xl dark:border-green-500/30 dark:bg-[#1B1F23]">

          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--orange)]/10 text-xs font-bold">
            ✓
          </span>

          Commande ajoutée au panier

        </div>
      )}

      {/* =====================================================
          HERO
      ===================================================== */}

      {hero && (
        <section className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-14">

          {/* HEADER */}

          <div className="mb-8">

            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--orange)]">
              Catalogue
            </p>

            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">

              <div>

                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Nos produits
                </h1>

                <p className="mt-2 max-w-2xl text-sm text-[#6B737A] dark:text-[#A9B0B6] sm:text-base">
                  Découvrez notre sélection de tubes et gaines électriques pour vos installations.
                </p>

              </div>

              <div className="hidden h-1 w-20 rounded-full bg-[var(--orange)] sm:block" />

            </div>

          </div>

          {/* HERO GRID */}

          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">

            {/* IMAGE */}

            <div className="flex flex-col gap-4">

              <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#DADFE3] bg-white shadow-sm dark:border-[#2A2E33] dark:bg-[#1B1F23]">

                <Image
                  src={tube}
                  alt={hero.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.02]"
                  priority
                />

                {/* CATEGORY */}

                <div className="absolute left-4 top-4 rounded-full border border-[var(--orange)]/30 bg-[var(--orange)] px-3 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur-md">
                  {hero.category}
                </div>

                {/* PREVIOUS */}

                <button
                  type="button"
                  onClick={
                    previousProduct
                  }
                  aria-label={
                    CATALOG_DATA.labels.navigation.previousProduct
                  }
                  disabled={slide === 0}
                  className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#14171A] shadow-lg backdrop-blur transition hover:scale-105 hover:text-[var(--orange)] disabled:cursor-not-allowed disabled:opacity-30 dark:bg-black/70 dark:text-white"
                >
                  <ChevronLeft size={20} />
                </button>

                {/* NEXT */}

                <button
                  type="button"
                  onClick={
                    nextProduct
                  }
                  aria-label={
                    CATALOG_DATA.labels.navigation.nextProduct
                  }
                  disabled={
                    slide ===
                    products.length - 1
                  }
                  className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#14171A] shadow-lg backdrop-blur transition hover:scale-105 hover:text-[var(--orange)] disabled:cursor-not-allowed disabled:opacity-30 dark:bg-black/70 dark:text-white"
                >
                  <ChevronRight size={20} />
                </button>

                {/* NUMBER */}

                <div className="absolute bottom-4 right-4 rounded-full bg-black/65 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                  {slide + 1} / {products.length}
                </div>

              </div>

              {/* DOTS */}

              <div className="flex justify-center gap-1.5">

                {products.map(
                  (item, id) => (
                    <button
                      key={item.id}
                      type="button"
                      aria-label={`${CATALOG_DATA.labels.navigation.viewProduct} ${item.name}`}
                      aria-current={
                        slide === id
                      }
                      onClick={() =>
                        setSlide(id)
                      }
                      className={`h-1.5 rounded-full transition-all ${
                        slide === id
                          ? "w-7 bg-[var(--orange)]"
                          : "w-1.5 bg-[#D2D6D9] dark:bg-[#34393E]"
                      }`}
                    />
                  )
                )}

              </div>

            </div>

            {/* PRODUCT INFO */}

            <div className="flex flex-col justify-center">

              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--orange)]">
                {CATALOG_DATA.labels.technicalSheet}
              </p>

              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                {hero.name}
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#5F666D] dark:text-[#A9B0B6]">
                {hero.description}
              </p>

              {/* TECHNICAL INFO */}

              <div className="mt-6 grid grid-cols-2 gap-3">

                <div className="rounded-xl border border-[#DADFE3] bg-white p-4 transition hover:border-[var(--orange)]/40 dark:border-[#2A2E33] dark:bg-[#1B1F23]">

                  <p className="text-xs text-[#7A828A]">
                    {CATALOG_DATA.labels.product.dimension}
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    {hero.dimensions}
                  </p>

                </div>

                <div className="rounded-xl border border-[#DADFE3] bg-white p-4 transition hover:border-[var(--orange)]/40 dark:border-[#2A2E33] dark:bg-[#1B1F23]">

                  <p className="text-xs text-[#7A828A]">
                    {CATALOG_DATA.labels.product.category}
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    {hero.category}
                  </p>

                </div>

              </div>

              {/* PRICE */}

              <div className="mt-5 rounded-xl border border-[var(--orange)]/20 bg-white p-5 shadow-sm dark:border-[var(--orange)]/20 dark:bg-[#1B1F23]">

                {hero.wasPrice !== null && (
                  <>
                    <p className="text-xs text-[#7A828A]">
                      {CATALOG_DATA.labels.product.oldPrice}
                    </p>

                    <p className="mt-1 text-sm text-[#7A828A] line-through">
                      {hero.wasPrice.toLocaleString("fr-FR")}{" "}
                      {CATALOG_DATA.currency}
                    </p>
                  </>
                )}

                <div className="mt-2 flex items-end justify-between gap-3">

                  <div>

                    <p className="text-xs text-[#7A828A]">
                      {CATALOG_DATA.labels.product.price}
                    </p>

                    <p className="text-2xl font-bold text-[var(--orange)]">
                      {hero.price.toLocaleString("fr-FR")}{" "}
                      <span className="text-sm font-medium">
                        {CATALOG_DATA.currency}
                      </span>
                    </p>

                  </div>

                  <span className="rounded-full bg-[var(--orange)]/10 px-3 py-1 text-xs font-semibold text-[var(--orange)]">
                    Offre actuelle
                  </span>

                </div>

              </div>

              {/* COMMAND */}

              <Button
                type="button"
                onClick={
                  handleCommand
                }
                className="mt-5 h-12 w-full rounded-xl bg-[var(--orange)] text-white shadow-[0_8px_25px_-10px_var(--orange)] transition hover:brightness-110 hover:shadow-[0_10px_30px_-10px_var(--orange)] active:scale-[0.99]"
              >
                <ShoppingBag size={18} />

                {CATALOG_DATA.labels.order}
              </Button>

            </div>

          </div>

          {/* =================================================
              SEARCH / FILTER
          ================================================= */}

          <div className="mt-12 rounded-2xl border border-[#DADFE3] bg-white p-4 shadow-sm dark:border-[#2A2E33] dark:bg-[#1B1F23]">

            <form
              onSubmit={handleSearch}
              className="flex flex-col gap-3 md:flex-row"
            >

              {/* SEARCH */}

              <div className="flex h-11 flex-1 items-center gap-3 rounded-xl border border-[#DADFE3] bg-[#F8F8F6] px-4 transition focus-within:border-[var(--orange)] dark:border-[#2A2E33] dark:bg-[#14171A]">

                <Search
                  size={18}
                  className="shrink-0 text-[var(--orange)]"
                  aria-hidden
                />

                <input
                  ref={inputRef}
                  type="text"
                  placeholder={
                    CATALOG_DATA.labels.searchInput.placeholder
                  }
                  aria-label={
                    CATALOG_DATA.labels.searchInput.ariaLabel
                  }
                  className="w-full bg-transparent text-sm outline-none placeholder:text-[#9AA1A7]"
                />

              </div>

              {/* SEARCH BUTTON */}

              <button
                type="submit"
                className="h-11 rounded-xl bg-[var(--orange)] px-6 text-sm font-semibold text-white shadow-sm transition hover:brightness-110 active:scale-[0.98]"
              >
                {CATALOG_DATA.labels.search}
              </button>

              {/* FILTER */}

              <div className="flex h-11 items-center gap-2 rounded-xl border border-[#DADFE3] bg-[#F8F8F6] px-4 transition focus-within:border-[var(--orange)] dark:border-[#2A2E33] dark:bg-[#14171A]">

                <SlidersHorizontal
                  size={16}
                  className="text-[var(--orange)]"
                  aria-hidden
                />

                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(
                      e.target.value
                    )
                  }
                  aria-label={
                    CATALOG_DATA.labels.categoryFilter
                  }
                  className="w-full bg-transparent text-sm outline-none"
                >
                  {categories.map(
                    (c) => (
                      <option
                        key={c}
                        value={c}
                      >
                        {c}
                      </option>
                    )
                  )}
                </select>

              </div>

            </form>

          </div>

        </section>
      )}

      {/* =====================================================
          PRODUCTS
      ===================================================== */}

      <section className="border-t border-[#DADFE3] dark:border-[#2A2E33]">

        <div className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-14">

          {/* HEADER */}

          <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--orange)]">
                Collection
              </p>

              <h2 className="mt-1 text-xl font-bold sm:text-2xl">
                Tous nos produits
              </h2>

            </div>

            <div className="rounded-full border border-[var(--orange)]/20 bg-[var(--orange)]/5 px-4 py-2 text-sm text-[#626A71] dark:text-[#A9B0B6]">

              <span className="font-semibold text-[var(--orange)]">
                {filtered.length}
              </span>{" "}

              {filtered.length > 1
                ? CATALOG_DATA.labels.results.plural
                : CATALOG_DATA.labels.results.singular}

            </div>

          </div>

          {/* EMPTY */}

          {filtered.length === 0 ? (

            <div className="rounded-2xl border border-dashed border-[var(--orange)]/30 py-20 text-center dark:border-[var(--orange)]/20">

              <Search
                size={30}
                className="mx-auto mb-4 text-[var(--orange)]"
              />

              <p className="mx-auto max-w-md text-sm text-[#7A828A]">
                {CATALOG_DATA.labels.noProduct}
              </p>

            </div>

          ) : (

            /* PRODUCT GRID */

            <div
              className="
                grid
                grid-cols-1
                justify-items-center
                gap-5
                sm:grid-cols-2
                lg:grid-cols-4
              "
            >

              {filtered.map(
                (item) => {

                  const productIndex =
                    products.findIndex(
                      (product) =>
                        product.id ===
                        item.id
                    );

                  return (
                    <CatalogCard
                      key={item.id}

                      /*
                       * L'image n'est pas encore
                       * stockée dans PostgreSQL.
                       *
                       * On utilise donc tube.jpg
                       * temporairement.
                       */
                      img={tube}

                      id={item.id}

                      name={item.name}

                      description={
                        item.description
                      }

                      category={
                        item.category
                      }

                      dimension={
                        item.dimensions
                      }

                      wasPrice={
                        item.wasPrice ?? 0
                      }

                      price={
                        item.price
                      }

                      onOrder={() =>
                        setSlide(
                          productIndex
                        )
                      }

                      onCommand={() => {

                        setSlide(
                          productIndex
                        );

                        const data: CartProduct =
                          {
                            id: item.id,

                            name:
                              item.name,

                            description:
                              item.description,

                            category:
                              item.category,

                            dimensions:
                              item.dimensions,

                            wasPrice:
                              item.wasPrice,

                            price:
                              item.price,
                          };

                        addOrders(
                          data
                        );

                        showOrderSuccess();
                      }}
                    />
                  );
                }
              )}

            </div>

          )}

        </div>

      </section>

    </main>
  );
}