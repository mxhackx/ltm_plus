"use client";

import { useRouter } from "next/navigation";
import {
  LogOut,
  Package,
  ShoppingBag,
  Users,
} from "lucide-react";
import "@/app/globals.css";
export default function AdminPage() {
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem("admin");

    router.replace("/admin/login");
  }

  return (
    <main className="min-h-screen">

      {/* HEADER ADMIN */}

      <header className="border-b border-neutral-200 bg-white dark:border-white/10 dark:bg-[#0d0d0d]">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">

          <div>

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--orange)]">
              Administration
            </p>

            <h1 className="mt-1 text-xl font-bold">
              Dashboard
            </h1>

          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-100 dark:border-red-500/20 dark:bg-red-500/5"
          >
            <LogOut size={16} />

            Déconnexion
          </button>

        </div>

      </header>

      {/* CONTENU */}

      <div className="mx-auto max-w-7xl px-5 py-10">

        <h2 className="text-2xl font-bold">
          Vue d'ensemble
        </h2>

        <p className="mt-2 text-sm text-neutral-500">
          Gérez votre boutique depuis cet espace.
        </p>

        {/* STATISTIQUES */}

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          <div className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03]">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--orange)]/10 text-[var(--orange)]">
              <ShoppingBag size={20} />
            </div>

            <p className="mt-5 text-xs uppercase tracking-wider text-neutral-400">
              Commandes
            </p>

            <p className="mt-2 text-3xl font-bold">
              0
            </p>

          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03]">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
              <Package size={20} />
            </div>

            <p className="mt-5 text-xs uppercase tracking-wider text-neutral-400">
              Produits
            </p>

            <p className="mt-2 text-3xl font-bold">
              0
            </p>

          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03]">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-green-500">
              <Users size={20} />
            </div>

            <p className="mt-5 text-xs uppercase tracking-wider text-neutral-400">
              Clients
            </p>

            <p className="mt-2 text-3xl font-bold">
              0
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}