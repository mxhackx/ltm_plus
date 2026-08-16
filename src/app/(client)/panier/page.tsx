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
    continueShopping: "← Continuer mes achats",
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

// Modifier à true lorsque la livraison est activée
const shipping = false;

// ============================================================
// IDENTIFIER UN PRODUIT
// ============================================================

function getProductKey(product: Product) {
  return product.id;
}

// ============================================================
// REGROUPER LES PRODUITS
// ============================================================

function getUniqueProducts(
  products: Product[]
): CartProduct[] {
  const groupedProducts =
    new Map<number, CartProduct>();

  for (const product of products) {
    const key = getProductKey(product);

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
    useState<"website" | "whatsapp">(
      "website"
    );

  const [loaded, setLoaded] =
    useState(false);

  const [fullName, setFullName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [address, setAddress] =
    useState("");

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  // ==========================================================
  // PRODUITS REGROUPÉS
  // ==========================================================

  const ITEMS = useMemo(() => {
    return getUniqueProducts(local);
  }, [local]);

  // ==========================================================
  // NOMBRE TOTAL D'ARTICLES
  // ==========================================================

  const totalItems = useMemo(() => {
    return ITEMS.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );
  }, [ITEMS]);

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
          item.price * item.quantity
        );
      },
      0
    );
  }, [ITEMS]);

  const total =
    subtotal +
    (shipping ? SHIPPING : 0);

  // ==========================================================
  // SUPPRIMER COMPLÈTEMENT UN PRODUIT
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

      // Produit introuvable
      if (index === -1) {
        return previous;
      }

      // Copie du tableau
      const newLocal = [...previous];

      // Supprime UNE SEULE occurrence
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
      quantity: _quantity,
      ...product
    } = item;

    setLocal((previous) => [
      ...previous,
      product,
    ]);
  }

  // ==========================================================
  // VALIDATION INFORMATIONS CLIENT
  // ==========================================================

  function validateCustomerInformation() {
    if (!fullName.trim()) {
      setError(
        "Veuillez renseigner votre nom complet."
      );

      return false;
    }

    if (!phone.trim()) {
      setError(
        "Veuillez renseigner votre numéro de téléphone."
      );

      return false;
    }

    if (!address.trim()) {
      setError(
        "Veuillez renseigner votre adresse de livraison."
      );

      return false;
    }

    return true;
  }

  // ==========================================================
  // CRÉER LA COMMANDE
  // ==========================================================

  async function createOrder(
    products: Product[]
  ) {
    const groupedProducts =
      getUniqueProducts(products);

    const items =
      groupedProducts.map(
        (item) => ({
          productId: item.id,
          quantity: item.quantity,
        })
      );

    const response =
      await fetch(
        "/api/orders",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            items,

            customer: {
              fullName:
                fullName.trim(),

              phone:
                phone.trim(),

              address:
                address.trim(),
            },
          }),
        }
      );

    let data: any;

    try {
      data =
        await response.json();
    } catch {
      throw new Error(
        "Réponse invalide du serveur."
      );
    }

    if (!response.ok) {
      throw new Error(
        data?.error ||
          data?.message ||
          "Impossible d'enregistrer la commande."
      );
    }

    return data;
  }

  // ==========================================================
  // VIDER LE PANIER
  // ==========================================================

  function clearCart() {
    localStorage.setItem(
      "orders",
      JSON.stringify([])
    );

    setLocal([]);
  }

  // ==========================================================
  // VALIDATION DE LA COMMANDE
  // ==========================================================

  async function handleSubmitOrder() {
    if (
      ITEMS.length === 0 ||
      isSubmitting
    ) {
      return;
    }

    setError("");
    setSuccess("");

    if (
      !validateCustomerInformation()
    ) {
      return;
    }

    const productsToOrder = [
      ...local,
    ];

    setIsSubmitting(true);

    try {
      const result =
        await createOrder(
          productsToOrder
        );

      console.log(
        "Commande créée :",
        result
      );

      // ======================================================
      // WHATSAPP
      // ======================================================

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

        const message =
`Bonjour, je souhaite passer la commande suivante :

${orderMessage}

Nom : ${fullName.trim()}
Téléphone : ${phone.trim()}
Adresse : ${address.trim()}

Total : ${total.toLocaleString(
          "fr-FR"
        )} ${TEXT.currency}`;

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
      }

      // ======================================================
      // VIDER LE PANIER
      // ======================================================

      clearCart();

      // ======================================================
      // RESET FORMULAIRE
      // ======================================================

      setFullName("");
      setPhone("");
      setAddress("");

      // ======================================================
      // SUCCÈS
      // ======================================================

      setSuccess(
        `Votre commande #${result.order.id} a été enregistrée avec succès.`
      );

    } catch (error) {
      console.error(
        "SUBMIT_ORDER_ERROR:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Une erreur est survenue lors de la commande."
      );

    } finally {
      setIsSubmitting(false);
    }
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
            {totalItems}{" "}
            {TEXT.cart.items}
          </p>

        </div>

      </div>

      {/* ======================================================
          MESSAGES
          ====================================================== */}

      {success && (
        <div
          className="
            mb-6
            rounded-xl
            border
            border-green-200
            bg-green-50
            p-4
            text-sm
            text-green-700
            dark:border-green-500/20
            dark:bg-green-500/10
            dark:text-green-400
          "
        >
          {success}
        </div>
      )}

      {error && (
        <div
          className="
            mb-6
            rounded-xl
            border
            border-red-200
            bg-red-50
            p-4
            text-sm
            text-red-600
            dark:border-red-500/20
            dark:bg-red-500/10
            dark:text-red-400
          "
        >
          {error}
        </div>
      )}

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
            PANIER
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

                    {/* IMAGE */}

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

                    {/* PRODUIT */}

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

                        <div className="min-w-0">

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

                      {/* QUANTITÉ + PRIX */}

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

                          {/* MOINS */}

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

                          {/* QUANTITÉ */}

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

                        {/* PRIX */}

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

          {/* CONTINUER */}

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
            RÉCAPITULATIF
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

            {/* HEADER */}

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

            {/* PRIX */}

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

                <span className="text-neutral-500">
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

                  <span className="text-neutral-500">
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

            {/* LIVRAISON */}

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
                value={fullName}
                onChange={(event) =>
                  setFullName(
                    event.target.value
                  )
                }
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
                value={phone}
                onChange={(event) =>
                  setPhone(
                    event.target.value
                  )
                }
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
                value={address}
                onChange={(event) =>
                  setAddress(
                    event.target.value
                  )
                }
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

            {/* MODE DE COMMANDE */}

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

                {/* SITE */}

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

                {/* WHATSAPP */}

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

            {/* ERREUR */}

            {error && (
              <div className="px-6 pb-4">

                <div
                  className="
                    rounded-xl
                    bg-red-50
                    p-3
                    text-sm
                    text-red-600
                    dark:bg-red-500/10
                    dark:text-red-400
                  "
                >
                  {error}
                </div>

              </div>
            )}

            {/* SUBMIT */}

            <div className="p-6 pt-0">

              <button
                type="button"
                onClick={
                  handleSubmitOrder
                }
                disabled={
                  ITEMS.length === 0 ||
                  isSubmitting
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

                {isSubmitting
                  ? "Enregistrement..."
                  : orderMethod ===
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