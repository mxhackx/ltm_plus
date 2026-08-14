"use client";

import Link from "next/link";
import Image from "next/image";
import worker from "@/../public/worker.jpeg";
import tube from "@/../public/tube.jpg";

import {
  ShoppingCart,
  ArrowRight,
  MessageCircle,
  Star,
} from "lucide-react";

import "@/app/globals.css";
import { Button } from "@/components/ui/button";
import MyCard from "@/components/card";

const HOME_DATA = {
  company: {
    name: "LTM+ Industries",
  },

  whatsapp: {
    number: "2290197280976",
    message:
      "Bonjour, je souhaite avoir des informations sur vos produits.",
    label: "Contacter sur WhatsApp",
  },

  hero: {
    title: {
      first: "Exigez",
      highlightedFirst: "plus.",
      second: "Choisissez",
      highlightedSecond: "LTM+",
    },

    description:
      "Des tubes électriques de qualité, conçus pour protéger vos installations et répondre aux exigences des professionnels comme des particuliers.",

    image: {
      alt: "Technicien LTM+ sur une ligne de production de tubes électriques",
    },

    actions: {
      primary: {
        label: "Achetez maintenant",
        href: "/catalog",
      },

      secondary: {
        label: "Catalogue",
        href: "/catalog",
      },
    },
  },

  catalogue: {
    sectionLabel: "Sélection",
    title: "Produits populaires",
    link: "Voir le catalogue →",
    href: "/catalog",

    products: [
      {
        img: tube,
        name: "Tube IRL 3221",
        price: 2000,
        barprice: 3000,
      },
      {
        img: tube,
        name: "Tube ICTA 3421",
        price: 1500,
        barprice: 1800,
      },
      {
        img: tube,
        name: "Gaine annelée GA16",
        price: 2800,
        barprice: 3200,
      },
    ],
  },

  quality: {
    sectionLabel: "Notre savoir-faire",

    title: "De la matière au produit.",

    description:
      "Chaque étape de notre fabrication est pensée pour garantir fiabilité, résistance et qualité à nos produits.",

    steps: [
      {
        number: "01",
        title: "Matière première",
        description:
          "Nous sélectionnons des résines et alliages certifiés, choisis pour leur tenue mécanique et leur résistance au feu, avant chaque cycle de production.",
      },
      {
        number: "02",
        title: "Fabrication",
        description:
          "Extrusion, cintrage et calibrage sont réalisés sur nos lignes automatisées, avec un contrôle dimensionnel à chaque étape du process.",
      },
      {
        number: "03",
        title: "Contrôle qualité",
        description:
          "Chaque lot est testé en isolation électrique et en résistance à l'écrasement avant d'être conditionné et livré à nos clients.",
      },
    ],
  },

  reviews: {
    sectionLabel: "Ils nous font confiance",

    title: "L'avis de nos clients.",

    items: [
      {
        name: "Jean K.",
        avatar: "J",
        rating: 5,
        text:
          "Des produits de qualité et un service sérieux. Je recommande LTM+ pour les travaux électriques.",
      },
      {
        name: "Patrick A.",
        avatar: "P",
        rating: 5,
        text:
          "Les tubes sont solides et correspondent parfaitement à mes besoins. Très bonne expérience.",
      },
      {
        name: "David S.",
        avatar: "D",
        rating: 4,
        text:
          "Bonne qualité des produits et livraison rapide. Une entreprise professionnelle.",
      },
      {
        name: "Michel T.",
        avatar: "M",
        rating: 5,
        text:
          "Très satisfait de la qualité. Les produits sont résistants et bien finis.",
      },
    ],
  },

  currency: "F",
} as const;

export default function Home() {
  const {
    company,
    whatsapp,
    hero,
    catalogue,
    quality,
    reviews,
    currency,
  } = HOME_DATA;

  const whatsappUrl = `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(
    whatsapp.message
  )}`;

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-neutral-900 transition-colors duration-300 dark:bg-[#090909] dark:text-white">
      <main>

        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="relative overflow-hidden bg-[#120b07]">

          {/* BACKGROUND */}

          <div className="absolute inset-0">

            <Image
              src={worker}
              alt={hero.image.alt}
              fill
              preload
              sizes="100vw"
              className="
                object-cover
                object-[68%_center]
                sm:object-[65%_center]
                lg:object-[62%_center]
              "
            />

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-b
                from-[#120b07]/75
                via-[#120b07]/75
                to-[#120b07]
                sm:bg-gradient-to-r
                sm:from-[#120b07]
                sm:via-[#120b07]/80
                sm:to-[#120b07]/20
              "
            />

            <div className="absolute inset-0 bg-[#120b07]/25 sm:hidden" />

            <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#120b07] to-transparent" />
          </div>

          {/* ORANGE GLOW */}

          <div
            aria-hidden="true"
            className="
              absolute
              -left-24
              top-[28%]
              h-56
              w-56
              rounded-full
              bg-(--orange)
              opacity-[0.12]
              blur-[100px]
              sm:-left-20
              sm:top-[35%]
              sm:h-[28rem]
              sm:w-[28rem]
              sm:blur-[140px]
            "
          />

          {/* HERO CONTENT */}

          <div
            className="
              relative
              z-10
              mx-auto
              max-w-7xl
              px-5
              pb-0
              pt-28
              sm:px-8
              sm:pt-32
              lg:px-12
              lg:pt-40
            "
          >

            <div className="max-w-xl sm:max-w-2xl">

              {/* COMPANY */}

              <div className="mb-5 flex items-center gap-3 sm:mb-6">

                <span className="h-px w-7 bg-(--orange) sm:w-10" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-(--orange) sm:text-sm sm:tracking-[0.28em]">
                  {company.name}
                </span>

              </div>

              {/* TITLE */}

              <h1
                className="
                  max-w-[340px]
                  text-[2.65rem]
                  font-bold
                  leading-[0.98]
                  tracking-[-0.04em]
                  text-white
                  sm:max-w-none
                  sm:text-5xl
                  md:text-6xl
                  lg:text-7xl
                "
              >
                {hero.title.first}{" "}

                <span className="text-(--orange)">
                  {hero.title.highlightedFirst}
                </span>

                <br />

                {hero.title.second}{" "}

                <span className="text-(--orange)">
                  {hero.title.highlightedSecond}
                </span>
              </h1>

              {/* DESCRIPTION */}

              <p
                className="
                  mt-6
                  max-w-[340px]
                  text-sm
                  leading-6
                  text-white/65
                  sm:mt-7
                  sm:max-w-xl
                  sm:text-lg
                  sm:leading-8
                "
              >
                {hero.description}
              </p>

              {/* ACTIONS */}

              <div
                className="
                  mt-7
                  flex
                  flex-col
                  gap-3
                  pb-12
                  sm:mt-9
                  sm:flex-row
                  sm:items-center
                  sm:gap-4
                  sm:pb-20
                "
              >

                <Link
                  href={hero.actions.primary.href}
                  className="w-full sm:w-auto"
                >
                  <Button
                    className="
                      h-12
                      w-full
                      rounded-full
                      bg-(--orange)
                      px-6
                      text-white
                      shadow-[0_0_35px_-10px_var(--orange)]
                      transition
                      duration-300
                      hover:brightness-110
                      sm:w-auto
                      sm:px-7
                    "
                  >
                    {hero.actions.primary.label}

                    <ArrowRight size={17} />
                  </Button>
                </Link>

                <Link
                  href={hero.actions.secondary.href}
                  className="w-full sm:w-auto"
                >
                  <Button
                    className="
                      h-12
                      w-full
                      rounded-full
                      border
                      border-white/20
                      bg-white/[0.06]
                      px-6
                      text-white
                      backdrop-blur-md
                      transition
                      duration-300
                      hover:border-(--orange)/60
                      hover:bg-(--orange)/10
                      sm:w-auto
                      sm:px-7
                    "
                  >
                    <ShoppingCart
                      size={18}
                      className="text-(--orange)"
                    />

                    {hero.actions.secondary.label}
                  </Button>
                </Link>

              </div>

            </div>

            {/* =================================================
                FEATURED PRODUCTS
            ================================================= */}

            <div
              className="
                relative
                z-20
                -mx-5
                w-full
                border-t
                border-white/10
                px-5
                py-7
                sm:mx-0
                sm:px-0
                sm:py-9
              "
            >

              <div className="mb-4 flex items-end justify-between sm:mb-5">

                <div>

                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/40 sm:text-[10px]">
                    {catalogue.sectionLabel}
                  </p>

                  <h2 className="mt-1 text-sm font-medium text-white/80 sm:text-base">
                    {catalogue.title}
                  </h2>

                </div>

                <Link
                  href={catalogue.href}
                  className="
                    hidden
                    text-xs
                    text-white/50
                    transition
                    hover:text-(--orange)
                    sm:block
                  "
                >
                  {catalogue.link}
                </Link>

              </div>

              <div
                className="
                  -mx-5
                  flex
                  gap-4
                  overflow-x-auto
                  px-5
                  pb-4
                  pt-1
                  scrollbar-none
                  sm:mx-0
                  sm:gap-5
                  sm:px-0
                "
              >

                {catalogue.products.map((item) => (

                  <div
                    key={item.name}
                    className="
                      w-[210px]
                      shrink-0
                      sm:w-[245px]
                      lg:w-[255px]
                    "
                  >
                    <MyCard
                      img={item.img}
                      name={item.name}
                      price={item.price}
                      barprice={item.barprice}
                      alt={item.name}
                      devise={currency}
                    />
                  </div>

                ))}

              </div>

            </div>

          </div>

          <div className="h-3 sm:h-6" />

        </section>

        {/* =====================================================
            QUALITY / PROCESS
        ===================================================== */}

        <section
          className="
            mx-auto
            w-full
            max-w-7xl
            px-5
            py-20
            sm:px-8
            sm:py-24
            lg:px-12
            lg:py-28
          "
        >

          {/* HEADER */}

          <div className="max-w-2xl">

            <div className="mb-4 flex items-center gap-3">

              <span className="h-px w-8 bg-(--orange) sm:w-10" />

              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-(--orange) sm:text-xs sm:tracking-[0.22em]">
                {quality.sectionLabel}
              </p>

            </div>

            <h2
              className="
                text-3xl
                font-bold
                leading-tight
                tracking-tight
                text-neutral-900
                dark:text-white
                sm:text-4xl
                lg:text-5xl
              "
            >
              {quality.title}
            </h2>

            <p
              className="
                mt-4
                max-w-xl
                text-sm
                leading-6
                text-neutral-500
                dark:text-neutral-400
                sm:mt-5
                sm:text-base
                sm:leading-7
              "
            >
              {quality.description}
            </p>

          </div>

          {/* STEPS */}

          <div
            className="
              mt-12
              grid
              gap-10
              sm:mt-16
              md:grid-cols-3
              md:gap-8
              lg:mt-20
            "
          >

            {quality.steps.map((step) => (

              <div
                key={step.number}
                className="
                  group
                  border-t
                  border-neutral-200
                  pt-5
                  dark:border-white/10
                  sm:pt-6
                "
              >

                <div className="flex items-center justify-between">

                  <span className="text-sm font-bold text-(--orange)">
                    {step.number}
                  </span>

                  <span className="h-px w-0 bg-(--orange) transition-all duration-500 group-hover:w-10" />

                </div>

                <h3
                  className="
                    mt-4
                    text-xl
                    font-semibold
                    text-neutral-900
                    transition-colors
                    duration-300
                    group-hover:text-(--orange)
                    dark:text-white
                    sm:mt-5
                    sm:text-2xl
                  "
                >
                  {step.title}
                </h3>

                <p
                  className="
                    mt-3
                    text-sm
                    leading-6
                    text-neutral-500
                    dark:text-neutral-400
                    sm:mt-4
                    sm:leading-7
                  "
                >
                  {step.description}
                </p>

                <div
                  className="
                    mt-5
                    h-1
                    w-8
                    rounded-full
                    bg-(--orange)/60
                    transition-all
                    duration-300
                    group-hover:w-14
                    group-hover:bg-(--orange)
                  "
                />

              </div>

            ))}

          </div>

        </section>

        {/* =====================================================
            REVIEWS
        ===================================================== */}

        <section
          className="
            mx-auto
            w-full
            max-w-7xl
            px-5
            pb-20
            sm:px-8
            sm:pb-24
            lg:px-12
            lg:pb-28
          "
        >

          {/* REVIEW HEADER */}

          <div className="mb-8 flex flex-col items-center text-center sm:mb-10">

            <div className="mb-3 flex items-center gap-3">

              <span className="h-px w-7 bg-(--orange) sm:w-10" />

              <p
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.22em]
                  text-(--orange)
                  sm:text-xs
                "
              >
                {reviews.sectionLabel}
              </p>

              <span className="h-px w-7 bg-(--orange) sm:w-10" />

            </div>

            <h2
              className="
                text-2xl
                font-bold
                tracking-tight
                text-neutral-900
                dark:text-white
                sm:text-3xl
                lg:text-4xl
              "
            >
              {reviews.title}
            </h2>

          </div>

          {/* REVIEW CARDS */}

          <div
            className="
              -mx-5
              flex
              gap-4
              overflow-x-auto
              px-5
              pb-4
              scrollbar-none
              sm:mx-0
              sm:grid
              sm:grid-cols-2
              sm:gap-5
              sm:overflow-visible
              sm:px-0
              lg:grid-cols-4
            "
          >

            {reviews.items.map((review) => (

              <article
                key={review.name}
                className="
                  relative
                  flex
                  aspect-square
                  w-[250px]
                  shrink-0
                  flex-col
                  overflow-hidden
                  rounded-2xl
                  border
                  border-neutral-200
                  bg-white
                  p-5
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-(--orange)/40
                  hover:shadow-[0_15px_40px_-20px_var(--orange)]
                  dark:border-white/10
                  dark:bg-[#111]
                  sm:w-auto
                  sm:p-6
                "
              >

                {/* ORANGE CORNER */}

                <div
                  className="
                    absolute
                    right-0
                    top-0
                    h-16
                    w-16
                    rounded-bl-[100%]
                    bg-(--orange)/10
                  "
                />

                {/* USER */}

                <div className="relative flex items-center gap-3">

                  <div
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-(--orange)
                      text-base
                      font-bold
                      text-black
                      shadow-[0_0_20px_-8px_var(--orange)]
                    "
                  >
                    {review.avatar}
                  </div>

                  <div className="min-w-0">

                    <p
                      className="
                        truncate
                        text-sm
                        font-semibold
                        text-neutral-900
                        dark:text-white
                      "
                    >
                      {review.name}
                    </p>

                    <div className="mt-1 flex gap-0.5">

                      {Array.from({ length: 5 }).map(
                        (_, index) => (
                          <Star
                            key={index}
                            size={12}
                            strokeWidth={1.5}
                            className={
                              index < review.rating
                                ? "fill-(--orange) text-(--orange)"
                                : "text-neutral-300 dark:text-white/15"
                            }
                          />
                        )
                      )}

                    </div>

                  </div>

                </div>

                {/* REVIEW */}

                <div className="relative mt-6 flex flex-1 flex-col justify-between">

                  <p
                    className="
                      text-sm
                      leading-6
                      text-neutral-500
                      dark:text-neutral-400
                    "
                  >
                    “{review.text}”
                  </p>

                  <div className="flex items-center justify-between">

                    <span className="h-1 w-8 rounded-full bg-(--orange)" />

                    <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-300 dark:text-white/20">
                      Client
                    </span>

                  </div>

                </div>

              </article>

            ))}

          </div>

        </section>

      </main>

      {/* =====================================================
          WHATSAPP
      ===================================================== */}

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={whatsapp.label}
        title={whatsapp.label}
        className="
          fixed
          bottom-5
          right-5
          z-50
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-full
          bg-[#25D366]
          text-white
          shadow-[0_8px_30px_-8px_rgba(37,211,102,0.8)]
          transition-all
          duration-300
          hover:scale-110
          hover:bg-[#20bd5a]
          active:scale-95
          sm:bottom-7
          sm:right-7
          sm:h-14
          sm:w-14
        "
      >
        <MessageCircle
          size={24}
          strokeWidth={2.2}
          className="sm:h-7 sm:w-7"
        />

        <span
          className="
            absolute
            right-0
            top-0
            h-3
            w-3
            rounded-full
            border-2
            border-white
            bg-[#25D366]
          "
        />
      </a>

    </div>
  );
}