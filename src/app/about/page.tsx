import Image from "next/image";
import work from "@/../public/worker.jpeg";
import { Award, ShieldCheck, Truck, Users } from "lucide-react";

export default function About() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <section className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600">
            À propos de nous
          </span>

          <h1 className="mt-6 text-5xl font-bold leading-tight">
            Votre partenaire en matériel électrique.
          </h1>

          <p className="mt-6 text-lg leading-8 text-neutral-600">
            Depuis plusieurs années, nous accompagnons les particuliers et les
            professionnels en proposant des équipements électriques fiables,
            durables et au meilleur prix.
          </p>

          <div className="mt-10 flex gap-4">
            <div>
              <h2 className="text-4xl font-bold text-[var(--orange)]">500+</h2>
              <p className="text-neutral-500">Clients satisfaits</p>
            </div>

            <div>
              <h2 className="text-4xl font-bold text-[var(--orange)]">1000+</h2>
              <p className="text-neutral-500">Produits vendus</p>
            </div>

            <div>
              <h2 className="text-4xl font-bold text-[var(--orange)]">5★</h2>
              <p className="text-neutral-500">Service client</p>
            </div>
          </div>
        </div>

        <div className="relative h-[550px] overflow-hidden rounded-3xl">
          <Image
            src={work}
            alt="Notre entreprise"
            fill
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          <div className="absolute bottom-8 left-8 rounded-2xl bg-white/10 p-6 text-white backdrop-blur-lg">
            <h3 className="text-2xl font-bold">
              Plus qu'un fournisseur.
            </h3>

            <p className="mt-2 text-white/80">
              Nous aidons nos clients à réaliser leurs projets en toute
              confiance.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-24">
        <h2 className="mb-10 text-center text-4xl font-bold">
          Pourquoi nous choisir ?
        </h2>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
            <Award className="mb-5 text-orange-500" size={40} />

            <h3 className="text-xl font-semibold">
              Qualité
            </h3>

            <p className="mt-3 text-neutral-500">
              Des produits sélectionnés auprès de fabricants reconnus.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
            <ShieldCheck className="mb-5 text-orange-500" size={40} />

            <h3 className="text-xl font-semibold">
              Garantie
            </h3>

            <p className="mt-3 text-neutral-500">
              Des produits fiables avec un excellent service après-vente.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
            <Truck className="mb-5 text-orange-500" size={40} />

            <h3 className="text-xl font-semibold">
              Livraison rapide
            </h3>

            <p className="mt-3 text-neutral-500">
              Livraison partout au Bénin dans les meilleurs délais.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
            <Users className="mb-5 text-orange-500" size={40} />

            <h3 className="text-xl font-semibold">
              Accompagnement
            </h3>

            <p className="mt-3 text-neutral-500">
              Notre équipe vous conseille selon vos besoins.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-24 rounded-3xl bg-[var(--orange)] p-14 text-white">
        <h2 className="text-4xl font-bold">
          Notre mission
        </h2>

        <p className="mt-6 max-w-4xl text-lg leading-8 text-white/90">
          Offrir aux particuliers, artisans et entreprises des solutions
          électriques de qualité, accessibles et adaptées à tous leurs projets.
          Nous mettons l' accent sur la satisfaction client, la disponibilité des
          produits et un accompagnement personnalisé.
        </p>
      </section>
    </main>
  );
}