"use client";

import Link from "next/link";
import Image from "next/image";
import worker from "@/../public/worker.jpeg";
import tube from "@/../public/tube.jpg";
import { ShoppingCart, ArrowRight } from "lucide-react";
import "@/app/globals.css";
import { Button } from "@/components/ui/button";
import MyCard from "@/components/card";

const FEATURED = [
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
];

const PROCESS_STEPS = [
  {
    n: "01",
    title: "Matière première",
    text: "Nous sélectionnons des résines et alliages certifiés, choisis pour leur tenue mécanique et leur résistance au feu, avant chaque cycle de production.",
  },
  {
    n: "02",
    title: "Fabrication",
    text: "Extrusion, cintrage et calibrage sont réalisés sur nos lignes automatisées, avec un contrôle dimensionnel à chaque étape du process.",
  },
  {
    n: "03",
    title: "Contrôle qualité",
    text: "Chaque lot est testé en isolation électrique et en résistance à l'écrasement avant d'être conditionné et livré à nos clients.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-neutral-900 transition-colors duration-300 dark:bg-[#090909] dark:text-white">
      <main>
        <section className="relative overflow-hidden bg-[#120b07]">
          <div className="absolute inset-0">
            <Image
              src={worker}
              alt="Technicien LTM+ sur une ligne de production de tubes électriques"
              fill
              priority
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
                absolute inset-0
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
            <div
              className="
                max-w-xl
                sm:max-w-2xl
              "
            >
              <div className="mb-5 flex items-center gap-3 sm:mb-6">
                <span className="h-px w-7 bg-(--orange) sm:w-10" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-(--orange) sm:text-sm sm:tracking-[0.28em]">
                  LTM+ Industries
                </span>
              </div>
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
                Exigez{" "}
                <span className="text-(--orange)">plus.</span>
                <br />
                Choisissez{" "}
                <span className="text-(--orange)">LTM+</span>
              </h1>
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
                Des tubes électriques de qualité, conçus pour protéger vos
                installations et répondre aux exigences des professionnels
                comme des particuliers.
              </p>
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
                <Link href="/catalog" className="w-full sm:w-auto">
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
                    Achetez maintenant
                    <ArrowRight size={17} />
                  </Button>
                </Link>

                <Link href="/catalog" className="w-full sm:w-auto">
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
                    Catalogue
                  </Button>
                </Link>
              </div>
            </div>
            <div
              className="
                relative
                z-20
                -mx-5
                border-t
                border-white/10
                px-5
                py-7
                sm:mx-0
                sm:px-0
                sm:py-9
                w-full
              "
            >
              <div className="mb-4 flex items-end justify-between sm:mb-5">
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/40 sm:text-[10px]">
                    Sélection
                  </p>

                  <h2 className="mt-1 text-sm font-medium text-white/80 sm:text-base">
                    Produits populaires
                  </h2>
                </div>

                <Link
                  href="/catalog"
                  className="
                    hidden
                    text-xs
                    text-white/50
                    transition
                    hover:text-(--orange)
                    sm:block
                  "
                >
                  Voir le catalogue →
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
                {FEATURED.map((item) => (
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
                      devise="F"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="h-3 sm:h-6" />
        </section>
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
            lg:py-32
          "
        >
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-(--orange) sm:w-10" />

              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-(--orange) sm:text-xs sm:tracking-[0.22em]">
                Notre savoir-faire
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
              De la matière au produit.
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
              Chaque étape de notre fabrication est pensée pour garantir
              fiabilité, résistance et qualité à nos produits.
            </p>
          </div>
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
            {PROCESS_STEPS.map((step) => (
              <div
                key={step.n}
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
                    {step.n}
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
                  {step.text}
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
      </main>
    </div>
  );
}
