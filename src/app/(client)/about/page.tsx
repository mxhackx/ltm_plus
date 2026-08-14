import Image from "next/image";
import work from "@/../public/worker.jpeg";
import {
  Award,
  ShieldCheck,
  Truck,
  Users,
  ArrowRight,
} from "lucide-react";

export default function About() {
  const ABOUT = {
    hero: {
      badge: "À propos de nous",
      title: "Votre partenaire en matériel électrique.",
      description:
        "Depuis plusieurs années, nous accompagnons les particuliers et les professionnels en proposant des équipements électriques fiables, durables et au meilleur prix.",
    },

    stats: [
      {
        value: "500+",
        label: "Clients satisfaits",
      },
      {
        value: "1000+",
        label: "Produits vendus",
      },
      {
        value: "5★",
        label: "Service client",
      },
    ],

    image: {
      alt: "Notre entreprise",
      title: "Plus qu'un fournisseur.",
      description:
        "Nous aidons nos clients à réaliser leurs projets en toute confiance.",
    },

    advantages: {
      title: "Pourquoi nous choisir ?",
      description:
        "Nous mettons notre expertise et notre engagement au service de chacun de vos projets.",

      items: [
        {
          title: "Qualité",
          description:
            "Des produits sélectionnés auprès de fabricants reconnus.",
          icon: Award,
        },
        {
          title: "Garantie",
          description:
            "Tous nos produits sont garantis et conformes aux normes de sécurité.",
          icon: ShieldCheck,
        },
        {
          title: "Livraison rapide",
          description:
            "Nous assurons une livraison rapide et fiable pour tous vos achats.",
          icon: Truck,
        },
        {
          title: "Accompagnement",
          description:
            "Notre équipe vous conseille selon vos besoins.",
          icon: Users,
        },
      ],
    },

    mission: {
      title: "Notre mission",
      description:
        "Offrir aux particuliers, artisans et entreprises des solutions électriques de qualité, accessibles et adaptées à tous leurs projets. Nous mettons l'accent sur la satisfaction client, la disponibilité des produits et un accompagnement personnalisé.",
    },
  };

  return (
    <main className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
      {/* HERO */}
      <section className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* TEXT */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--orange)]/20 bg-[var(--orange)]/10 px-4 py-2 text-sm font-semibold text-[var(--orange)]">
            <span className="h-2 w-2 rounded-full bg-[var(--orange)]" />
            {ABOUT.hero.badge}
          </div>

          <h1 className="mt-6 max-w-2xl text-4xl font-bold leading-tight tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl dark:text-white">
            {ABOUT.hero.title}
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-neutral-600 sm:text-lg dark:text-neutral-400">
            {ABOUT.hero.description}
          </p>

          {/* STATS */}
          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-neutral-200 pt-8 dark:border-white/10">
            {ABOUT.stats.map((stat) => (
              <div key={stat.label}>
                <h2 className="text-3xl font-bold text-[var(--orange)] sm:text-4xl">
                  {stat.value}
                </h2>

                <p className="mt-1 text-xs text-neutral-500 sm:text-sm dark:text-neutral-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* IMAGE */}
        <div className="relative h-[420px] overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-100 shadow-sm sm:h-[500px] lg:h-[550px] dark:border-white/10 dark:bg-white/5">
          <Image
            src={work}
            alt={ABOUT.image.alt}
            fill
            priority
            className="object-cover transition duration-700 hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          {/* IMAGE CONTENT */}
          <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8">
            <div className="rounded-2xl border border-white/20 bg-black/20 p-5 text-white backdrop-blur-md sm:p-6">
              <div className="mb-3 h-1 w-10 rounded-full bg-[var(--orange)]" />

              <h3 className="text-xl font-bold sm:text-2xl">
                {ABOUT.image.title}
              </h3>

              <p className="mt-2 max-w-md text-sm leading-6 text-white/80 sm:text-base">
                {ABOUT.image.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section className="mt-24 lg:mt-32">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[var(--orange)]/10 px-4 py-2 text-sm font-semibold text-[var(--orange)]">
            <span className="h-2 w-2 rounded-full bg-[var(--orange)]" />
            Nos engagements
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
            {ABOUT.advantages.title}
          </h2>

          <p className="mt-4 text-sm leading-7 text-neutral-500 sm:text-base dark:text-neutral-400">
            {ABOUT.advantages.description}
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {ABOUT.advantages.items.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group rounded-2xl border border-neutral-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[var(--orange)]/40 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-[var(--orange)]/40"
              >
                {/* ICON */}
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--orange)]/10 transition duration-300 group-hover:bg-[var(--orange)]">
                  <Icon
                    size={24}
                    className="text-[var(--orange)] transition duration-300 group-hover:text-white"
                  />
                </div>

                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-neutral-500 dark:text-neutral-400">
                  {item.description}
                </p>

                <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-[var(--orange)] opacity-0 transition duration-300 group-hover:opacity-100">
                  En savoir plus
                  <ArrowRight size={14} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* MISSION */}
      <section className="relative mt-24 overflow-hidden rounded-3xl bg-[var(--orange)] p-8 text-white sm:p-12 lg:mt-32 lg:p-14">
        {/* Decorative elements */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10" />
        <div className="absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-black/10" />

        <div className="relative z-10 max-w-4xl">
          <div className="mb-5 inline-flex items-center rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
            Notre engagement
          </div>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {ABOUT.mission.title}
          </h2>

          <p className="mt-6 text-base leading-8 text-white/90 sm:text-lg">
            {ABOUT.mission.description}
          </p>
        </div>
      </section>
    </main>
  );
}