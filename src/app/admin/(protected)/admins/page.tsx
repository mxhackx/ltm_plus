import Link from "next/link";
import {
  ArrowLeft,
  UserCog,
  UserPlus,
  Trash2,
  Mail,
  CalendarDays,
} from "lucide-react";

import {
  getAdmins,
  deleteAdmin,
} from "@/lib/actions/admin/admins";

export default async function AdminsPage() {
  const admins = await getAdmins();

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
          max-w-6xl
          px-5
          py-10
          sm:px-8
          lg:px-10
        "
      >
        {/* ==================================================
            HEADER
        ================================================== */}

        <header
          className="
            flex
            flex-col
            gap-5
            border-b
            border-neutral-200
            pb-8
            dark:border-white/10
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div>
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

              Retour au dashboard
            </Link>

            <div className="mt-5 flex items-center gap-4">
              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  bg-(--orange)/10
                  text-(--orange)
                "
              >
                <UserCog size={24} />
              </div>

              <div>
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
                    mt-1
                    text-2xl
                    font-bold
                    sm:text-3xl
                  "
                >
                  Administrateurs
                </h1>
              </div>
            </div>

            <p
              className="
                mt-4
                max-w-xl
                text-sm
                leading-6
                text-neutral-500
                dark:text-neutral-400
              "
            >
              Gérez les comptes ayant accès à
              l'espace d'administration.
            </p>
          </div>

          {/* ==================================================
              CREER ADMIN
          ================================================== */}

          <Link
            href="/admin/admins/new"
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-(--orange)
              px-5
              py-3
              text-xs
              font-semibold
              text-white
              transition
              hover:brightness-110
            "
          >
            <UserPlus size={16} />

            Nouvel administrateur
          </Link>
        </header>

        {/* ==================================================
            STATISTIQUE
        ================================================== */}

        <section
          className="
            mt-8
            rounded-2xl
            border
            border-neutral-200
            bg-neutral-50
            p-5
            dark:border-white/10
            dark:bg-white/[0.03]
          "
        >
          <p
            className="
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.18em]
              text-neutral-400
            "
          >
            Administrateurs
          </p>

          <p
            className="
              mt-2
              text-2xl
              font-bold
            "
          >
            {admins.length}
          </p>

          <p
            className="
              mt-1
              text-xs
              text-neutral-400
            "
          >
            {admins.length > 1
              ? "comptes administrateurs"
              : "compte administrateur"}
          </p>
        </section>

        {/* ==================================================
            LISTE
        ================================================== */}

        <section className="mt-8">
          {admins.length === 0 ? (
            <div
              className="
                rounded-3xl
                border
                border-dashed
                border-neutral-200
                bg-neutral-50
                px-6
                py-14
                text-center
                dark:border-white/10
                dark:bg-white/[0.025]
              "
            >
              <div
                className="
                  mx-auto
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
                <UserCog size={26} />
              </div>

              <h2
                className="
                  mt-5
                  text-lg
                  font-bold
                "
              >
                Aucun administrateur
              </h2>

              <p
                className="
                  mt-2
                  text-sm
                  text-neutral-500
                  dark:text-neutral-400
                "
              >
                Aucun compte administrateur
                n'est actuellement enregistré.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {admins.map((admin) => (
                <article
                  key={admin.id}
                  className="
                    rounded-2xl
                    border
                    border-neutral-200
                    bg-white
                    p-5
                    transition
                    hover:border-(--orange)/20
                    dark:border-white/10
                    dark:bg-white/[0.025]
                  "
                >
                  <div
                    className="
                      flex
                      flex-col
                      gap-5
                      sm:flex-row
                      sm:items-center
                      sm:justify-between
                    "
                  >
                    {/* INFOS */}

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
                          h-12
                          w-12
                          shrink-0
                          items-center
                          justify-center
                          rounded-2xl
                          bg-(--orange)/10
                          text-sm
                          font-bold
                          text-(--orange)
                        "
                      >
                        {admin.firstName
                          .charAt(0)
                          .toUpperCase()}
                        {admin.lastName
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <div className="min-w-0">
                        <h2
                          className="
                            truncate
                            text-sm
                            font-bold
                          "
                        >
                          {admin.firstName}{" "}
                          {admin.lastName}
                        </h2>

                        <div
                          className="
                            mt-1
                            flex
                            items-center
                            gap-2
                            text-xs
                            text-neutral-400
                          "
                        >
                          <Mail size={13} />

                          <span className="truncate">
                            {admin.email}
                          </span>
                        </div>

                        <div
                          className="
                            mt-1
                            flex
                            items-center
                            gap-2
                            text-xs
                            text-neutral-400
                          "
                        >
                          <CalendarDays
                            size={13}
                          />

                          <span>
                            Créé le{" "}
                            {formatDate(
                              admin.createdAt
                            )}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* SUPPRESSION */}

                    <form
                      action={deleteAdmin}
                    >
                      <input
                        type="hidden"
                        name="adminId"
                        value={admin.id}
                      />

                      <button
                        type="submit"
                        className="
                          inline-flex
                          w-full
                          items-center
                          justify-center
                          gap-2
                          rounded-xl
                          border
                          border-red-200
                          bg-red-50
                          px-4
                          py-2.5
                          text-xs
                          font-semibold
                          text-red-500
                          transition
                          hover:bg-red-100
                          dark:border-red-500/20
                          dark:bg-red-500/5
                          dark:hover:bg-red-500/10
                          sm:w-auto
                        "
                      >
                        <Trash2 size={15} />

                        Supprimer
                      </button>
                    </form>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

// ============================================================
// DATE
// ============================================================

function formatDate(date: Date) {
  return new Intl.DateTimeFormat(
    "fr-FR",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }
  ).format(date);
}