"use client";

import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  Globe,
  MessageCircle,
} from "lucide-react";
import { getOrders } from "../catalog/page";
import { useEffect, useMemo, useState } from "react";

// ============================================================
// TYPES
// ============================================================

type Product = {
  id: number;
  name: string;
  price: number;
  barprice?: number;
  category: string;
  description: string;
  dimension?: string;
};

type CartProduct = Product & {
  quantity: number;
};

type Order = {
  id: string;
  date: string;
  total: number;
  status: "pending" | "delivered" | "cancelled";
  items: CartProduct[];
};

// ============================================================
// TEXTES
// ============================================================

const TEXT = {
  cart: {
    label: "Mon panier",

    title: "Votre panier",

    description:
      "Vérifiez vos articles avant de passer votre commande.",

    items: "articles",

    image: "Image",

    continueShopping:
      "← Continuer mes achats",

    delete: "Supprimer",
  },

  summary: {
    title: "Récapitulatif",

    order: "Votre commande",

    subtotal: "Sous-total",

    shipping: "Livraison",

    total: "Total",
  },

  delivery: {
    title: "Informations de livraison",

    description:
      "Indiquez-nous où nous devons vous livrer.",

    fullName: "Nom complet",

    phone: "Téléphone",

    address: "Adresse de livraison",
  },

  orderMethod: {
    title: "Mode de commande",

    description:
      "Choisissez comment vous souhaitez finaliser votre commande.",

    website: "Commander sur le site",

    websiteDescription:
      "Votre commande sera enregistrée et vous pourrez suivre son évolution depuis votre espace.",

    whatsapp: "Commander via WhatsApp",

    whatsappDescription:
      "Votre commande sera enregistrée puis vous pourrez échanger directement avec nous sur WhatsApp.",
  },

  order: {
    submit: "Valider la commande",

    whatsappSubmit:
      "Commander via WhatsApp",

    confirmation:
      "Votre commande sera enregistrée et vous pourrez suivre son évolution.",
  },

  currency: "FCFA",
};

// ============================================================
// LIVRAISON
// ============================================================

const SHIPPING = 2000;

// Modifier à false si la livraison n'est pas activée
const shipping = false;

// ============================================================
// IDENTIFIER UN PRODUIT
// ============================================================

/*
 * Deux produits sont considérés comme identiques SI :
 *
 * - leur nom est identique
 * - leur prix est identique
 * - leur description est identique
 *
 * L'id n'est volontairement PAS utilisé.
 */

function getProductKey(
  product: Product
) {
  return JSON.stringify([
    product.name,
    product.price,
    product.description,
  ]);
}

// ============================================================
// REGROUPER LES PRODUITS
// ============================================================

function getUniqueProducts(
  products: Product[]
): CartProduct[] {
  const groupedProducts =
    new Map<string, CartProduct>();

  for (const product of products) {
    const key =
      getProductKey(product);

    const existing =
      groupedProducts.get(key);

    if (existing) {
      existing.quantity += 1;
    } else {
      groupedProducts.set(key, {
        ...product,
        quantity: 1,
      });
    }
  }

  return Array.from(
    groupedProducts.values()
  );
}

// ============================================================
// PAGE PANIER
// ============================================================

export default function Cart() {
  // ==========================================================
  // ÉTATS
  // ==========================================================

  const [local, setLocal] =
    useState<Product[]>([]);

  const [orderMethod, setOrderMethod] =
    useState<
      "website" | "whatsapp"
    >("website");

  const [loaded, setLoaded] =
    useState(false);

  // ==========================================================
  // PRODUITS REGROUPÉS
  // ==========================================================

  const ITEMS = useMemo(() => {
    return getUniqueProducts(local);
  }, [local]);

  // ==========================================================
  // CHARGEMENT DU PANIER
  // ==========================================================

  useEffect(() => {
    getOrders((products) => {
      setLocal(products);

      setLoaded(true);
    });
  }, []);

  // ==========================================================
  // SYNCHRONISATION LOCALSTORAGE
  // ==========================================================

  useEffect(() => {
    if (!loaded) {
      return;
    }

    localStorage.setItem(
      "orders",
      JSON.stringify(local)
    );
  }, [local, loaded]);

  // ==========================================================
  // PRIX
  // ==========================================================

  const subtotal = useMemo(() => {
    return ITEMS.reduce(
      (total, item) => {
        return (
          total +
          item.price *
            item.quantity
        );
      },
      0
    );
  }, [ITEMS]);

  const total =
    subtotal +
    (shipping ? SHIPPING : 0);

  // ==========================================================
  // SUPPRIMER COMPLETEMENT UN PRODUIT
  // ==========================================================

  function handleRemoveCategory(
    item: CartProduct
  ) {
    const itemKey =
      getProductKey(item);

    setLocal((previous) => {
      return previous.filter(
        (product) =>
          getProductKey(product) !==
          itemKey
      );
    });
  }

  // ==========================================================
  // RETIRER UNE UNITÉ
  // ==========================================================

  function handleRemoveOne(
    item: CartProduct
  ) {
    const itemKey =
      getProductKey(item);

    setLocal((previous) => {
      const index =
        previous.findIndex(
          (product) =>
            getProductKey(product) ===
            itemKey
        );

      if (index === -1) {
        return previous;
      }

      const newLocal = [
        ...previous,
      ];

      newLocal.splice(index, 1);

      return newLocal;
    });
  }

  // ==========================================================
  // AJOUTER UNE UNITÉ
  // ==========================================================

  function handleAdd(
    item: CartProduct
  ) {
    const {
      quantity,
      ...product
    } = item;

    setLocal((previous) => {
      return [
        ...previous,
        product,
      ];
    });
  }

  // ==========================================================
  // LIRE TOTAL_ORDERS
  // ==========================================================

  function getStoredOrders(): Order[] {
    const storedTotalOrders =
      localStorage.getItem(
        "total_orders"
      );

    if (!storedTotalOrders) {
      return [];
    }

    try {
      const parsed =
        JSON.parse(
          storedTotalOrders
        );

      if (!Array.isArray(parsed)) {
        return [];
      }

      return parsed;
    } catch (error) {
      console.error(
        "Impossible de lire total_orders",
        error
      );

      return [];
    }
  }

  // ==========================================================
  // ENREGISTRER LA COMMANDE
  // ==========================================================

  function saveOrder(
    products: Product[]
  ) {
    if (products.length === 0) {
      return;
    }

    // ========================================================
    // RÉCUPÉRER LES ANCIENNES COMMANDES
    // ========================================================

    const totalOrders =
      getStoredOrders();

    // ========================================================
    // REGROUPER LES PRODUITS
    // ========================================================

    const groupedProducts =
      getUniqueProducts(products);

    // ========================================================
    // CALCULER LE TOTAL
    // ========================================================

    const orderTotal =
      groupedProducts.reduce(
        (total, item) => {
          return (
            total +
            item.price *
              item.quantity
          );
        },
        0
      ) +
      (shipping ? SHIPPING : 0);

    // ========================================================
    // CREER LA COMMANDE
    // ========================================================

    const newOrder: Order = {
      id: crypto.randomUUID(),

      date: new Date().toISOString(),

      total: orderTotal,

      status: "pending",

      items: groupedProducts,
    };

    // ========================================================
    // AJOUTER LA NOUVELLE COMMANDE
    // ========================================================

    totalOrders.push(
      newOrder
    );

    // ========================================================
    // SAUVEGARDER TOTAL_ORDERS
    // ========================================================

    localStorage.setItem(
      "total_orders",
      JSON.stringify(
        totalOrders
      )
    );

    // ========================================================
    // VIDER LE PANIER
    // ========================================================

    localStorage.setItem(
      "orders",
      JSON.stringify([])
    );

    setLocal([]);
  }

  // ==========================================================
  // VALIDATION DE LA COMMANDE
  // ==========================================================

  function handleSubmitOrder() {
    if (ITEMS.length === 0) {
      return;
    }

    /*
     * Copie du panier AVANT de le vider.
     */

    const productsToOrder = [
      ...local,
    ];

    // ========================================================
    // WHATSAPP
    // ========================================================

    if (
      orderMethod ===
      "whatsapp"
    ) {
      const orderMessage =
        ITEMS.map(
          (item) =>
            `${item.name} × ${item.quantity} — ${(
              item.price *
              item.quantity
            ).toLocaleString(
              "fr-FR"
            )} ${TEXT.currency}`
        ).join("\n");

      const message = `Bonjour, je souhaite passer la commande suivante :

${orderMessage}

Total : ${total.toLocaleString(
        "fr-FR"
      )} ${TEXT.currency}`;

      // ======================================================
      // ENREGISTRER LA COMMANDE
      // ======================================================

      saveOrder(
        productsToOrder
      );

      // ======================================================
      // OUVRIR WHATSAPP
      // ======================================================

      const encodedMessage =
        encodeURIComponent(
          message
        );

      const phoneNumber =
        "2290197280976";

      const whatsappUrl =
        `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

      window.open(
        whatsappUrl,
        "_blank",
        "noopener,noreferrer"
      );

      return;
    }

    // ========================================================
    // COMMANDE SUR LE SITE
    // ========================================================

    saveOrder(
      productsToOrder
    );

    console.log(
      "Commande enregistrée sur le site."
    );
  }

  // ==========================================================
  // RENDU
  // ==========================================================

  return (
    <main
      className="
        mx-auto
        w-full
        max-w-7xl
        px-5
        py-10
        sm:px-8
        lg:px-10
        lg:py-16
      "
    >

      {/* ======================================================
          HEADER
          ====================================================== */}

      <div className="mb-8 sm:mb-10">

        <div
          className="
            mb-3
            flex
            items-center
            gap-2
            text-sm
            font-medium
            text-[var(--orange)]
          "
        >
          <ShoppingBag size={18} />

          {TEXT.cart.label}
        </div>

        <div
          className="
            flex
            flex-col
            justify-between
            gap-2
            sm:flex-row
            sm:items-end
          "
        >

          <div>

            <h1
              className="
                text-3xl
                font-bold
                tracking-tight
                text-neutral-900
                sm:text-4xl
                dark:text-white
              "
            >
              {TEXT.cart.title}
            </h1>

            <p
              className="
                mt-2
                text-sm
                text-neutral-500
                sm:text-base
              "
            >
              {TEXT.cart.description}
            </p>

          </div>

          <p
            className="
              text-sm
              text-neutral-500
            "
          >
            {ITEMS.length}{" "}
            {TEXT.cart.items}
          </p>

        </div>

      </div>

      {/* ======================================================
          CONTENT
          ====================================================== */}

      <div
        className="
          grid
          gap-8
          lg:grid-cols-[minmax(0,1fr)_380px]
          lg:items-start
        "
      >

        {/* ====================================================
            CART
            ==================================================== */}

        <section className="space-y-4">

          {ITEMS.length === 0 ? (

            <div
              className="
                rounded-2xl
                border
                border-dashed
                border-neutral-300
                p-10
                text-center
                dark:border-white/10
              "
            >

              <ShoppingBag
                size={40}
                className="
                  mx-auto
                  mb-4
                  text-neutral-400
                "
              />

              <p
                className="
                  text-sm
                  text-neutral-500
                "
              >
                Votre panier est vide.
              </p>

            </div>

          ) : (

            ITEMS.map((item) => {

              const productKey =
                getProductKey(item);

              return (
                <article
                  key={productKey}
                  className="
                    group
                    rounded-2xl
                    border
                    border-neutral-200
                    bg-white
                    p-4
                    shadow-sm
                    transition
                    hover:shadow-md
                    sm:p-5
                    dark:border-white/10
                    dark:bg-white/[0.03]
                  "
                >

                  <div
                    className="
                      flex
                      gap-4
                      sm:gap-5
                    "
                  >

                    {/* ==================================================
                        IMAGE
                        ================================================== */}

                    <div
                      className="
                        h-24
                        w-24
                        shrink-0
                        overflow-hidden
                        rounded-xl
                        bg-neutral-100
                        sm:h-28
                        sm:w-28
                        dark:bg-white/5
                      "
                    >

                      <div
                        className="
                          flex
                          h-full
                          items-center
                          justify-center
                          text-xs
                          text-neutral-400
                        "
                      >
                        {TEXT.cart.image}
                      </div>

                    </div>

                    {/* ==================================================
                        PRODUCT
                        ================================================== */}

                    <div
                      className="
                        flex
                        min-w-0
                        flex-1
                        flex-col
                      "
                    >

                      <div
                        className="
                          flex
                          items-start
                          justify-between
                          gap-3
                        "
                      >

                        <div
                          className="
                            min-w-0
                          "
                        >

                          <h2
                            className="
                              truncate
                              text-base
                              font-semibold
                              text-neutral-900
                              sm:text-lg
                              dark:text-white
                            "
                          >
                            {item.name}
                          </h2>

                          <p
                            className="
                              mt-1
                              text-xs
                              text-neutral-500
                              sm:text-sm
                            "
                          >
                            {item.description}
                          </p>

                        </div>

                        {/* SUPPRIMER */}

                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveCategory(
                              item
                            )
                          }
                          aria-label={`${TEXT.cart.delete} ${item.name}`}
                          className="
                            shrink-0
                            rounded-lg
                            p-2
                            text-neutral-400
                            transition
                            hover:bg-red-50
                            hover:text-red-500
                            dark:hover:bg-red-500/10
                          "
                        >
                          <Trash2
                            size={18}
                          />
                        </button>

                      </div>

                      {/* ==================================================
                          QUANTITY + PRICE
                          ================================================== */}

                      <div
                        className="
                          mt-auto
                          flex
                          flex-wrap
                          items-end
                          justify-between
                          gap-3
                          pt-5
                        "
                      >

                        <div
                          className="
                            flex
                            items-center
                            rounded-lg
                            border
                            border-neutral-200
                            dark:border-white/10
                          "
                        >

                          {/* MINUS */}

                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveOne(
                                item
                              )
                            }
                            disabled={
                              item.quantity <=
                              1
                            }
                            aria-label={`Retirer un ${item.name}`}
                            className="
                              flex
                              h-9
                              w-9
                              items-center
                              justify-center
                              text-neutral-500
                              transition
                              hover:bg-neutral-100
                              hover:text-neutral-900
                              disabled:pointer-events-none
                              disabled:opacity-40
                              dark:hover:bg-white/10
                              dark:hover:text-white
                            "
                          >
                            <Minus
                              size={15}
                            />
                          </button>

                          {/* QUANTITE */}

                          <span
                            className="
                              w-9
                              text-center
                              text-sm
                              font-semibold
                              text-neutral-900
                              dark:text-white
                            "
                          >
                            {item.quantity}
                          </span>

                          {/* PLUS */}

                          <button
                            type="button"
                            onClick={() =>
                              handleAdd(
                                item
                              )
                            }
                            aria-label={`Ajouter un ${item.name}`}
                            className="
                              flex
                              h-9
                              w-9
                              items-center
                              justify-center
                              text-neutral-500
                              transition
                              hover:bg-neutral-100
                              hover:text-neutral-900
                              dark:hover:bg-white/10
                              dark:hover:text-white
                            "
                          >
                            <Plus
                              size={15}
                            />
                          </button>

                        </div>

                        {/* PRIX TOTAL */}

                        <p
                          className="
                            text-base
                            font-bold
                            text-[var(--orange)]
                            sm:text-lg
                          "
                        >
                          {(
                            item.price *
                            item.quantity
                          ).toLocaleString(
                            "fr-FR"
                          )}{" "}
                          {TEXT.currency}
                        </p>

                      </div>

                    </div>

                  </div>

                </article>
              );
            })

          )}

          <div className="pt-2">

            <a
              href="/catalog"
              className="
                text-sm
                font-medium
                text-neutral-500
                transition
                hover:text-[var(--orange)]
              "
            >
              {TEXT.cart.continueShopping}
            </a>

          </div>

        </section>

        {/* ====================================================
            SUMMARY
            ==================================================== */}

        <aside
          className="
            lg:sticky
            lg:top-24
          "
        >

          <div
            className="
              overflow-hidden
              rounded-3xl
              border
              border-neutral-200
              bg-white
              shadow-sm
              dark:border-white/10
              dark:bg-white/[0.03]
            "
          >

            {/* ==================================================
                SUMMARY HEADER
                ================================================== */}

            <div
              className="
                border-b
                border-neutral-200
                p-6
                dark:border-white/10
              "
            >

              <h2
                className="
                  text-xl
                  font-bold
                  text-neutral-900
                  dark:text-white
                "
              >
                {TEXT.summary.title}
              </h2>

              <p
                className="
                  mt-1
                  text-sm
                  text-neutral-500
                "
              >
                {TEXT.summary.order}
              </p>

            </div>

            {/* ==================================================
                PRICES
                ================================================== */}

            <div
              className="
                space-y-4
                border-b
                border-neutral-200
                p-6
                dark:border-white/10
              "
            >

              <div
                className="
                  flex
                  justify-between
                  text-sm
                "
              >

                <span
                  className="
                    text-neutral-500
                  "
                >
                  {TEXT.summary.subtotal}
                </span>

                <span
                  className="
                    font-medium
                    text-neutral-900
                    dark:text-white
                  "
                >
                  {subtotal.toLocaleString(
                    "fr-FR"
                  )}{" "}
                  {TEXT.currency}
                </span>

              </div>

              {shipping && (

                <div
                  className="
                    flex
                    justify-between
                    text-sm
                  "
                >

                  <span
                    className="
                      text-neutral-500
                    "
                  >
                    {TEXT.summary.shipping}
                  </span>

                  <span
                    className="
                      font-medium
                      text-neutral-900
                      dark:text-white
                    "
                  >
                    {SHIPPING.toLocaleString(
                      "fr-FR"
                    )}{" "}
                    {TEXT.currency}
                  </span>

                </div>

              )}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  pt-2
                "
              >

                <span
                  className="
                    font-semibold
                    text-neutral-900
                    dark:text-white
                  "
                >
                  {TEXT.summary.total}
                </span>

                <span
                  className="
                    text-xl
                    font-bold
                    text-[var(--orange)]
                  "
                >
                  {total.toLocaleString(
                    "fr-FR"
                  )}{" "}
                  {TEXT.currency}
                </span>

              </div>

            </div>

            {/* ==================================================
                DELIVERY
                ================================================== */}

            <div className="space-y-4 p-6">

              <div>

                <h3
                  className="
                    font-semibold
                    text-neutral-900
                    dark:text-white
                  "
                >
                  {TEXT.delivery.title}
                </h3>

                <p
                  className="
                    mt-1
                    text-xs
                    text-neutral-500
                  "
                >
                  {TEXT.delivery.description}
                </p>

              </div>

              <input
                type="text"
                placeholder={
                  TEXT.delivery.fullName
                }
                className="
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-neutral-200
                  bg-neutral-50
                  px-4
                  text-sm
                  text-neutral-900
                  outline-none
                  transition
                  placeholder:text-neutral-400
                  focus:border-[var(--orange)]
                  dark:border-white/10
                  dark:bg-white/5
                  dark:text-white
                "
              />

              <input
                type="tel"
                placeholder={
                  TEXT.delivery.phone
                }
                className="
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-neutral-200
                  bg-neutral-50
                  px-4
                  text-sm
                  text-neutral-900
                  outline-none
                  transition
                  placeholder:text-neutral-400
                  focus:border-[var(--orange)]
                  dark:border-white/10
                  dark:bg-white/5
                  dark:text-white
                "
              />

              <textarea
                rows={3}
                placeholder={
                  TEXT.delivery.address
                }
                className="
                  w-full
                  resize-none
                  rounded-xl
                  border
                  border-neutral-200
                  bg-neutral-50
                  p-4
                  text-sm
                  text-neutral-900
                  outline-none
                  transition
                  placeholder:text-neutral-400
                  focus:border-[var(--orange)]
                  dark:border-white/10
                  dark:bg-white/5
                  dark:text-white
                "
              />

            </div>

            {/* ==================================================
                ORDER METHOD
                ================================================== */}

            <div
              className="
                border-t
                border-neutral-200
                p-6
                dark:border-white/10
              "
            >

              <div className="mb-4">

                <h3
                  className="
                    font-semibold
                    text-neutral-900
                    dark:text-white
                  "
                >
                  {TEXT.orderMethod.title}
                </h3>

                <p
                  className="
                    mt-1
                    text-xs
                    text-neutral-500
                  "
                >
                  {TEXT.orderMethod.description}
                </p>

              </div>

              <div className="space-y-3">

                {/* ==================================================
                    WEBSITE
                    ================================================== */}

                <label
                  className={`
                    block
                    cursor-pointer
                    rounded-xl
                    border
                    p-4
                    transition
                    ${
                      orderMethod ===
                      "website"
                        ? "border-[var(--orange)] bg-[var(--orange)]/5"
                        : "border-neutral-200 dark:border-white/10"
                    }
                  `}
                >

                  <div
                    className="
                      flex
                      items-start
                      gap-3
                    "
                  >

                    <input
                      type="radio"
                      name="orderMethod"
                      value="website"
                      checked={
                        orderMethod ===
                        "website"
                      }
                      onChange={() =>
                        setOrderMethod(
                          "website"
                        )
                      }
                      className="
                        mt-1
                        accent-[var(--orange)]
                      "
                    />

                    <div
                      className="
                        flex
                        min-w-0
                        gap-4
                      "
                    >

                      <Globe
                        size={24}
                        strokeWidth={2}
                        className="
                          mt-0.5
                          shrink-0
                          text-[var(--orange)]
                        "
                      />

                      <div className="min-w-0">

                        <p
                          className="
                            text-sm
                            font-semibold
                            text-neutral-900
                            dark:text-white
                          "
                        >
                          {
                            TEXT
                              .orderMethod
                              .website
                          }
                        </p>

                        <p
                          className="
                            mt-1
                            text-xs
                            leading-relaxed
                            text-neutral-500
                          "
                        >
                          {
                            TEXT
                              .orderMethod
                              .websiteDescription
                          }
                        </p>

                      </div>

                    </div>

                  </div>

                </label>

                {/* ==================================================
                    WHATSAPP
                    ================================================== */}

                <label
                  className={`
                    block
                    cursor-pointer
                    rounded-xl
                    border
                    p-4
                    transition
                    ${
                      orderMethod ===
                      "whatsapp"
                        ? "border-green-500 bg-green-500/5"
                        : "border-neutral-200 dark:border-white/10"
                    }
                  `}
                >

                  <div
                    className="
                      flex
                      items-start
                      gap-3
                    "
                  >

                    <input
                      type="radio"
                      name="orderMethod"
                      value="whatsapp"
                      checked={
                        orderMethod ===
                        "whatsapp"
                      }
                      onChange={() =>
                        setOrderMethod(
                          "whatsapp"
                        )
                      }
                      className="
                        mt-1
                        accent-green-500
                      "
                    />

                    <div
                      className="
                        flex
                        min-w-0
                        gap-4
                      "
                    >

                      <MessageCircle
                        size={24}
                        strokeWidth={2}
                        className="
                          mt-0.5
                          shrink-0
                          text-green-600
                        "
                      />

                      <div className="min-w-0">

                        <p
                          className="
                            text-sm
                            font-semibold
                            text-neutral-900
                            dark:text-white
                          "
                        >
                          {
                            TEXT
                              .orderMethod
                              .whatsapp
                          }
                        </p>

                        <p
                          className="
                            mt-1
                            text-xs
                            leading-relaxed
                            text-neutral-500
                          "
                        >
                          {
                            TEXT
                              .orderMethod
                              .whatsappDescription
                          }
                        </p>

                      </div>

                    </div>

                  </div>

                </label>

              </div>

            </div>

            {/* ==================================================
                SUBMIT
                ================================================== */}

            <div className="p-6 pt-0">

              <button
                type="button"
                onClick={
                  handleSubmitOrder
                }
                disabled={
                  ITEMS.length === 0
                }
                className={`
                  h-12
                  w-full
                  rounded-xl
                  font-semibold
                  text-white
                  transition
                  active:scale-[0.99]
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                  ${
                    orderMethod ===
                    "whatsapp"
                      ? "bg-green-600 shadow-[0_8px_25px_-10px_#16a34a] hover:brightness-110"
                      : "bg-[var(--orange)] shadow-[0_8px_25px_-10px_var(--orange)] hover:brightness-110"
                  }
                `}
              >

                {orderMethod ===
                "whatsapp"
                  ? TEXT.order
                      .whatsappSubmit
                  : TEXT.order.submit}

              </button>

              <p
                className="
                  mt-3
                  text-center
                  text-xs
                  text-neutral-400
                "
              >
                {
                  TEXT.order
                    .confirmation
                }
              </p>

            </div>

          </div>

        </aside>

      </div>

    </main>
  );
}