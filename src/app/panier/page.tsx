"use client";

import { Minus, Plus, Trash2, ShoppingBag, CreditCard } from "lucide-react";

const items = [
  {
    id: 1,
    name: "Tube électrique",
    description: "10 mm × 20 mm × 30 mm",
    price: 20000,
    quantity: 1,
  },
  {
    id: 2,
    name: "Tube électrique",
    description: "15 mm × 25 mm × 40 mm",
    price: 15000,
    quantity: 2,
  },
  {
    id: 3,
    name: "Tube électrique",
    description: "20 mm × 30 mm × 50 mm",
    price: 25000,
    quantity: 1,
  },
];

export default function Cart() {
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = 2000;
  const total = subtotal + shipping;

  return (
    <main className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-16">
      <div className="mb-8 sm:mb-10">
        <div className="mb-3 flex items-center gap-2 text-sm font-medium text-[var(--orange)]">
          <ShoppingBag size={18} />
          Mon panier
        </div>

        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
              Votre panier
            </h1>

            <p className="mt-2 text-sm text-neutral-500 sm:text-base">
              Vérifiez vos articles avant de passer votre commande.
            </p>
          </div>

          <p className="text-sm text-neutral-500">
            {items.length} articles
          </p>
        </div>
      </div>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
        <section className="space-y-4">
          {items.map((item) => (
            <article
              key={item.id}
              className="group rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5 dark:border-white/10 dark:bg-white/[0.03]"
            >
              <div className="flex gap-4 sm:gap-5">
                <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-neutral-100 sm:h-28 sm:w-28 dark:bg-white/5">
                  <div className="flex h-full items-center justify-center text-xs text-neutral-400">
                    Image
                  </div>
                </div>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h2 className="truncate text-base font-semibold text-neutral-900 sm:text-lg dark:text-white">
                        {item.name}
                      </h2>

                      <p className="mt-1 text-xs text-neutral-500 sm:text-sm">
                        {item.description}
                      </p>
                    </div>

                    <button
                      type="button"
                      aria-label={`Supprimer ${item.name}`}
                      className="shrink-0 rounded-lg p-2 text-neutral-400 transition hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-5">
                    <div className="flex items-center rounded-lg border border-neutral-200 dark:border-white/10">
                      <button
                        type="button"
                        className="flex h-9 w-9 items-center justify-center text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-white/10 dark:hover:text-white"
                      >
                        <Minus size={15} />
                      </button>

                      <span className="w-9 text-center text-sm font-semibold text-neutral-900 dark:text-white">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        className="flex h-9 w-9 items-center justify-center text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-white/10 dark:hover:text-white"
                      >
                        <Plus size={15} />
                      </button>
                    </div>
                    <p className="text-base font-bold text-[var(--orange)] sm:text-lg">
                      {(item.price * item.quantity).toLocaleString("fr-FR")} FCFA
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}

          <div className="pt-2">
            <a
              href="/catalog"
              className="text-sm font-medium text-neutral-500 transition hover:text-[var(--orange)]"
            >
              ← Continuer mes achats
            </a>
          </div>
        </section>

        <aside className="lg:sticky lg:top-24">
          <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
            <div className="border-b border-neutral-200 p-6 dark:border-white/10">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
                Récapitulatif
              </h2>

              <p className="mt-1 text-sm text-neutral-500">
                Votre commande
              </p>
            </div>

            {/* Prices */}
            <div className="space-y-4 border-b border-neutral-200 p-6 dark:border-white/10">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Sous-total</span>
                <span className="font-medium text-neutral-900 dark:text-white">
                  {subtotal.toLocaleString("fr-FR")} FCFA
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Livraison</span>
                <span className="font-medium text-neutral-900 dark:text-white">
                  {shipping.toLocaleString("fr-FR")} FCFA
                </span>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="font-semibold text-neutral-900 dark:text-white">
                  Total
                </span>

                <span className="text-xl font-bold text-[var(--orange)]">
                  {total.toLocaleString("fr-FR")} FCFA
                </span>
              </div>
            </div>

            <div className="space-y-4 p-6">
              <div>
                <h3 className="font-semibold text-neutral-900 dark:text-white">
                  Informations
                </h3>

                <p className="mt-1 text-xs text-neutral-500">
                  Où devons-nous vous livrer ?
                </p>
              </div>

              <input
                type="text"
                placeholder="Nom complet"
                className="h-11 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-[var(--orange)] dark:border-white/10 dark:bg-white/5 dark:text-white"
              />

              <input
                type="tel"
                placeholder="Téléphone"
                className="h-11 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-[var(--orange)] dark:border-white/10 dark:bg-white/5 dark:text-white"
              />

              <textarea
                rows={3}
                placeholder="Adresse de livraison"
                className="w-full resize-none rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-[var(--orange)] dark:border-white/10 dark:bg-white/5 dark:text-white"
              />
            </div>

            <div className="border-t border-neutral-200 p-6 dark:border-white/10">
              <div className="mb-4 flex items-center gap-2">
                <CreditCard size={18} className="text-[var(--orange)]" />

                <h3 className="font-semibold text-neutral-900 dark:text-white">
                  Paiement
                </h3>
              </div>

              <div className="space-y-2">
                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-neutral-200 p-3 text-sm transition hover:border-[var(--orange)] dark:border-white/10">
                  <input
                    type="radio"
                    name="payment"
                    value="mtn"
                    className="accent-[var(--orange)]"
                  />
                  <span className="text-neutral-700 dark:text-white/80">
                    MTN Money
                  </span>
                </label>

                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-neutral-200 p-3 text-sm transition hover:border-[var(--orange)] dark:border-white/10">
                  <input
                    type="radio"
                    name="payment"
                    value="moov"
                    className="accent-[var(--orange)]"
                  />
                  <span className="text-neutral-700 dark:text-white/80">
                    Moov Money
                  </span>
                </label>
              </div>
            </div>

            <div className="p-6 pt-0">
              <button
                type="button"
                className="h-12 w-full rounded-xl bg-[var(--orange)] font-semibold text-white shadow-[0_8px_25px_-10px_var(--orange)] transition hover:brightness-110 hover:shadow-[0_10px_30px_-10px_var(--orange)] active:scale-[0.99]"
              >
                Valider la commande
              </button>

              <p className="mt-3 text-center text-xs text-neutral-400">
                Vous pourrez confirmer votre commande avant paiement.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
