"use client";

import {
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
  ShoppingBag,
} from "lucide-react";
import Image, { type StaticImageData } from "next/image";
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

type Product = {
  img: StaticImageData;
  name: string;
  description: string;
  category: string;
  dimension: string;
  barprice: number;
  price: number;
};

const CATALOG_DATA = {
  currency: "F CFA",

  categories: [
    "Toutes catégories",
    "Tube IRL",
    "Tube ICTA",
    "Gaine annelée",
  ],

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

  products: [
    {
      img: tube,
      name: "Tube IRL 3221",
      description:
        "Tube électrique rigide gris pour installation apparente",
      category: "Tube IRL",
      dimension: "Ø20 x 2000 mm",
      barprice: 2500,
      price: 2000,
    },
    {
      img: tube,
      name: "Tube IRL 3222",
      description:
        "Tube électrique rigide gris haute résistance",
      category: "Tube IRL",
      dimension: "Ø25 x 2000 mm",
      barprice: 2900,
      price: 2400,
    },
    {
      img: tube,
      name: "Tube ICTA 3421",
      description:
        "Tube électrique cintrable pour encastrement",
      category: "Tube ICTA",
      dimension: "Ø16 x 25 m",
      barprice: 1800,
      price: 1500,
    },
    {
      img: tube,
      name: "Tube ICTA 3422",
      description:
        "Tube électrique cintrable renforcé",
      category: "Tube ICTA",
      dimension: "Ø20 x 25 m",
      barprice: 2100,
      price: 1750,
    },
    {
      img: tube,
      name: "Gaine annelée GA16",
      description:
        "Gaine annelée souple pour câblage domestique",
      category: "Gaine annelée",
      dimension: "Ø16 x 50 m",
      barprice: 3200,
      price: 2800,
    },
    {
      img: tube,
      name: "Gaine annelée GA20",
      description:
        "Gaine annelée souple double isolation",
      category: "Gaine annelée",
      dimension: "Ø20 x 50 m",
      barprice: 3600,
      price: 3100,
    },
    {
      img: tube,
      name: "Tube IRL 3223",
      description:
        "Tube électrique rigide gris pour tableau",
      category: "Tube IRL",
      dimension: "Ø32 x 2000 mm",
      barprice: 3300,
      price: 2700,
    },
    {
      img: tube,
      name: "Tube ICTA 3423",
      description:
        "Tube électrique cintrable industriel",
      category: "Tube ICTA",
      dimension: "Ø25 x 25 m",
      barprice: 2500,
      price: 2100,
    },
    {
      img: tube,
      name: "Gaine annelée GA25",
      description:
        "Gaine annelée souple haute température",
      category: "Gaine annelée",
      dimension: "Ø25 x 25 m",
      barprice: 3900,
      price: 3400,
    },
    {
      img: tube,
      name: "Tube IRL 3224",
      description:
        "Tube électrique rigide gris pour extérieur",
      category: "Tube IRL",
      dimension: "Ø40 x 2000 mm",
      barprice: 4200,
      price: 3600,
    },
  ] satisfies Product[],
};

export function getOrders(setLocal: (orders: object[]) => void) {
  const existingOrders = localStorage.getItem("orders");

  if (existingOrders) {
    setLocal(JSON.parse(existingOrders));
  }
}

export default function Catalog() {
  const [slide, setSlide] = useState(0);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>(
    CATALOG_DATA.categories[0]
  );

  const [local, setLocal] = useState<object[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const successTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    getOrders(setLocal);
  }, []);

  function saveOrder(orders: object[]) {
    localStorage.setItem("orders", JSON.stringify(orders));
    setLocal(orders);
  }

  function addOrders(order: object) {
    const existingOrders = localStorage.getItem("orders");

    let ordersArray: object[] = [];

    if (existingOrders) {
      ordersArray = JSON.parse(existingOrders);
    }

    ordersArray.push(order);

    saveOrder(ordersArray);
  }

  function showOrderSuccess() {
    setShowSuccess(true);

    if (successTimeout.current) {
      clearTimeout(successTimeout.current);
    }

    successTimeout.current = setTimeout(() => {
      setShowSuccess(false);
    }, 2000);
  }

  function handleCommand() {
    const product = CATALOG_DATA.products[slide];

    const data = {
      id: Date.now(),
      price: product.price,
      wasPrice: product.barprice,
      dimensions: product.dimension,
      category: product.category,
      description: product.description,
      name: product.name,
    };

    addOrders(data);
    showOrderSuccess();
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return CATALOG_DATA.products.filter((item) => {
      const matchesQuery =
        q === "" ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);

      const matchesCategory =
        category === CATALOG_DATA.categories[0] ||
        item.category === category;

      return matchesQuery && matchesCategory;
    });
  }, [query, category]);

  const hero = CATALOG_DATA.products[slide];

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    setQuery(inputRef.current?.value ?? "");
  }

  function previousProduct() {
    setSlide((prev) => Math.max(prev - 1, 0));
  }

  function nextProduct() {
    setSlide((prev) =>
      Math.min(prev + 1, CATALOG_DATA.products.length - 1)
    );
  }

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
          HERO / PRODUCT
      ===================================================== */}

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
                Découvrez notre sélection de tubes et gaines électriques
                pour vos installations.
              </p>
            </div>

            <div className="hidden h-1 w-20 rounded-full bg-[var(--orange)] sm:block" />
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">

          {/* =================================================
              IMAGE
          ================================================= */}

          <div className="flex flex-col gap-4">

            <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#DADFE3] bg-white shadow-sm dark:border-[#2A2E33] dark:bg-[#1B1F23]">

              <Image
                src={hero.img}
                alt={hero.name}
                fill
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
                onClick={previousProduct}
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
                onClick={nextProduct}
                aria-label={
                  CATALOG_DATA.labels.navigation.nextProduct
                }
                disabled={
                  slide === CATALOG_DATA.products.length - 1
                }
                className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#14171A] shadow-lg backdrop-blur transition hover:scale-105 hover:text-[var(--orange)] disabled:cursor-not-allowed disabled:opacity-30 dark:bg-black/70 dark:text-white"
              >
                <ChevronRight size={20} />
              </button>

              {/* NUMBER */}

              <div className="absolute bottom-4 right-4 rounded-full bg-black/65 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                {slide + 1} / {CATALOG_DATA.products.length}
              </div>
            </div>

            {/* DOTS */}

            <div className="flex justify-center gap-1.5">
              {CATALOG_DATA.products.map((item, id) => (
                <button
                  key={item.name}
                  type="button"
                  aria-label={`${CATALOG_DATA.labels.navigation.viewProduct} ${item.name}`}
                  aria-current={slide === id}
                  onClick={() => setSlide(id)}
                  className={`h-1.5 rounded-full transition-all ${
                    slide === id
                      ? "w-7 bg-[var(--orange)]"
                      : "w-1.5 bg-[#D2D6D9] dark:bg-[#34393E]"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* =================================================
              PRODUCT INFO
          ================================================= */}

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
                  {hero.dimension}
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

              <p className="text-xs text-[#7A828A]">
                {CATALOG_DATA.labels.product.oldPrice}
              </p>

              <p className="mt-1 text-sm text-[#7A828A] line-through">
                {hero.barprice.toLocaleString("fr-FR")}{" "}
                {CATALOG_DATA.currency}
              </p>

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
              onClick={handleCommand}
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
                onChange={(e) => setCategory(e.target.value)}
                aria-label={CATALOG_DATA.labels.categoryFilter}
                className="w-full bg-transparent text-sm outline-none"
              >
                {CATALOG_DATA.categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

            </div>

          </form>
        </div>

      </section>

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

            /* =================================================
               PRODUCT GRID
            ================================================= */

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

              {filtered.map((item) => {

                const id = CATALOG_DATA.products.findIndex(
                  (product) => product.name === item.name
                );

                return (
                  <CatalogCard
                    key={item.name}
                    {...item}
                    onOrder={() => setSlide(id)}
                    onCommand={() => {

                      setSlide(id);

                      const data = {
                        id: Date.now(),
                        price: item.price,
                        wasPrice: item.barprice,
                        dimensions: item.dimension,
                        category: item.category,
                        description: item.description,
                        name: item.name,
                      };

                      addOrders(data);
                      showOrderSuccess();
                    }}
                  />
                );

              })}

            </div>

          )}

        </div>

      </section>

    </main>
  );
}