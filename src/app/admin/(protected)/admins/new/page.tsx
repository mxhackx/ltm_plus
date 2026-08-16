import Link from "next/link";
import {
  ArrowLeft,
  UserPlus,
} from "lucide-react";

import NewAdminForm from "@/components/NewAdminForm";
export default function NewAdminPage() {
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
          max-w-2xl
          px-5
          py-10
          sm:px-8
          lg:py-16
        "
      >
        <Link
          href="/admin/admins"
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
          Retour aux administrateurs
        </Link>

        <header className="mt-8">
          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-(--orange)/10
              text-(--orange)
            "
          >
            <UserPlus size={26} />
          </div>

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

          <h1
            className="
              mt-2
              text-3xl
              font-bold
              tracking-tight
            "
          >
            Nouvel administrateur
          </h1>

          <p
            className="
              mt-3
              max-w-lg
              text-sm
              leading-6
              text-neutral-500
              dark:text-neutral-400
            "
          >
            Créez un nouveau compte administrateur.
            Tous les administrateurs disposent des mêmes
            privilèges.
          </p>
        </header>

        <NewAdminForm />

        <div
          className="
            mt-5
            rounded-2xl
            border
            border-(--orange)/15
            bg-(--orange)/5
            p-4
          "
        >
          <p
            className="
              text-xs
              leading-5
              text-neutral-500
              dark:text-neutral-400
            "
          >
            <span
              className="
                font-semibold
                text-(--orange)
              "
            >
              Accès administrateur :
            </span>{" "}
            ce compte pourra accéder à l'ensemble
            de l'espace d'administration et gérer les
            autres administrateurs.
          </p>
        </div>
      </div>
    </main>
  );
}