import Link from "next/link";
import {
  ClipboardList,
  Package,
  MessageSquare,
  Users,
  UserCog,
  LogOut,
} from "lucide-react";

import {
  requireAdmin,
  logoutAdmin,
} from "@/lib/actions/admin/auth";

export default async function AdminPage() {
  const admin = await requireAdmin();

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
              "
            >
              Bonjour {admin.firstName}
            </h1>

            <p
              className="
                mt-2
                text-sm
                text-neutral-500
                dark:text-neutral-400
              "
            >
              Gérez votre boutique depuis cet espace.
            </p>
          </div>

          <form action={logoutAdmin}>
            <button
              type="submit"
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                border
                border-neutral-200
                px-4
                py-2.5
                text-xs
                font-semibold
                transition
                hover:border-red-300
                hover:bg-red-50
                hover:text-red-500
                dark:border-white/10
                dark:hover:border-red-500/20
                dark:hover:bg-red-500/5
              "
            >
              <LogOut size={15} />
              Déconnexion
            </button>
          </form>
        </header>

        {/* ==================================================
            ADMINISTRATION
        ================================================== */}

        <section
          className="
            mt-10
            grid
            gap-4
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          <AdminCard
            href="/admin/orders"
            icon={<ClipboardList size={22} />}
            title="Commandes"
            description="Voir et gérer toutes les commandes."
          />

          <AdminCard
            href="/admin/products"
            icon={<Package size={22} />}
            title="Produits"
            description="Gérer le catalogue."
          />

          <AdminCard
            href="/admin/contacts"
            icon={<MessageSquare size={22} />}
            title="Contacts"
            description="Consulter les demandes clients."
          />

          <AdminCard
            href="/admin/customers"
            icon={<Users size={22} />}
            title="Clients"
            description="Consulter les clients."
          />

          <AdminCard
            href="/admin/admins"
            icon={<UserCog size={22} />}
            title="Administrateurs"
            description="Créer et supprimer les comptes administrateurs."
          />
        </section>
      </div>
    </main>
  );
}

// ============================================================
// ADMIN CARD
// ============================================================

function AdminCard({
  href,
  icon,
  title,
  description,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="
        group
        rounded-3xl
        border
        border-neutral-200
        bg-neutral-50
        p-6
        transition
        hover:-translate-y-1
        hover:border-(--orange)/30
        hover:shadow-lg
        dark:border-white/10
        dark:bg-white/[0.03]
      "
    >
      <div
        className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-xl
          bg-(--orange)/10
          text-(--orange)
        "
      >
        {icon}
      </div>

      <h2
        className="
          mt-5
          text-lg
          font-bold
        "
      >
        {title}
      </h2>

      <p
        className="
          mt-2
          text-sm
          leading-6
          text-neutral-500
          dark:text-neutral-400
        "
      >
        {description}
      </p>
    </Link>
  );
}