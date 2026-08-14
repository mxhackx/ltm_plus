"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "@/../public/logo.png";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import "@/app/globals.css";

import {
  Moon,
  Sun,
  ShoppingCart,
  Menu,
  X,
  ChevronRight,
  Home,
  Package,
  Info,
  UserRound,
  ArrowRight,
  Loader2,
  Phone as phone
} from "lucide-react";

// ======================================================
// TYPES
// ======================================================

type User = {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
};

// ======================================================
// DONNÉES DU HEADER
// ======================================================

const HEADER_DATA = {
  theme: {
    storageKey: "dark",
    defaultDark: true,
    ariaLabel: "Changer de thème",
  },

  user: {
    storageKey: "user",
  },

  supplier: {
    whatsapp: {
      number: "22997000000",
      href: "https://wa.me/22997000000",
      ariaLabel: "Contacter le fournisseur sur WhatsApp",
      title: "WhatsApp",
    },
  },

  logo: {
    alt: "LTM+ logo",
    href: "/",
  },

  navigation: {
    links: [
      {
        name: "Accueil",
        href: "/",
        icon: Home,
      },
      {
        name: "Catalogue",
        href: "/catalog",
        icon: Package,
      },
      {
        name: "Panier",
        href: "/panier",
        icon: ShoppingCart,
      },
      {
        name: "Contact",
        href: "/contact",
        icon: phone,
      },
      {
        name: "À propos",
        href: "/about",
        icon: Info,
      },
      {
        name: "Mon espace",
        href: "/dashboard",
        icon: UserRound,
      },
    ],
  },

  actions: {
    contact: {
      href: "/contact",
      label: "Contact",
      ariaLabel: "Contact",
    },

    cart: {
      href: "/panier",
      label: "Panier",
      ariaLabel: "Panier",
    },

    dashboard: {
      href: "/dashboard",
      label: "Mon espace",
      ariaLabel: "Mon espace client",
    },

    menu: {
      open: "Ouvrir le menu",
      close: "Fermer le menu",
    },
  },

  mobileMenu: {
    contact: {
      href: "/contact",
      label: "Nous contacter",
    },
  },
} as const;

// ======================================================
// DARK MODE
// ======================================================

export function getDarkLocaltorage(
  data: string = HEADER_DATA.theme.storageKey
): boolean | undefined {
  const darkStorage = localStorage.getItem(data);

  if (!darkStorage) return undefined;

  return darkStorage === "true";
}

export const handleDark = (next: boolean) => {
  if (next) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  return next;
};

export const handleDarkClick = (
  setDark: React.Dispatch<React.SetStateAction<boolean>>
): void => {
  setDark((prev) => handleDark(!prev));
};

// ======================================================
// RECUPERATION UTILISATEUR
// ======================================================

async function getCurrentUser(): Promise<User | null> {
  try {
    const storedUser = localStorage.getItem(
      HEADER_DATA.user.storageKey
    );

    if (!storedUser) {
      return null;
    }

    const user = JSON.parse(storedUser);

    if (
      !user ||
      !user.firstName ||
      !user.lastName ||
      !user.email ||
      !user.telephone
    ) {
      return null;
    }

    return user;
  } catch (error) {
    console.error(
      "Impossible de récupérer l'utilisateur :",
      error
    );

    return null;
  }
}

// ======================================================
// CREATION UTILISATEUR
// ======================================================

async function createUser(user: User): Promise<User> {
  localStorage.setItem(
    HEADER_DATA.user.storageKey,
    JSON.stringify(user)
  );

  /*
   * FUTURE API
   *
   * Cette partie pourra être réactivée
   * lorsque /api/user sera disponible.
   */

  /*
  try {
    await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
  } catch {
    // API indisponible pour le moment
  }
  */

  return user;
}

// ======================================================
// THEME TOGGLE
// ======================================================

function ThemeToggle({
  dark,
  setDark,
}: {
  dark: boolean;
  setDark: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label={HEADER_DATA.theme.ariaLabel}
      onClick={() => handleDarkClick(setDark)}
      className="
        relative
        flex
        h-7
        w-14
        shrink-0
        items-center
        justify-between
        rounded-full
        border
        border-black/15
        bg-black/5
        px-1.5
        dark:border-white/15
        dark:bg-white/5
      "
    >
      <span
        className={`
          absolute
          left-1
          top-1
          flex
          h-5
          w-5
          items-center
          justify-center
          rounded-full
          bg-(--orange)
          shadow-[0_0_10px_-1px_var(--orange)]
          transition-transform
          duration-300
          ${
            dark
              ? "translate-x-0"
              : "translate-x-[26px]"
          }
        `}
      >
        {dark ? (
          <Moon
            size={13}
            className="text-black"
          />
        ) : (
          <Sun
            size={13}
            className="text-black"
          />
        )}
      </span>
    </button>
  );
}

// ======================================================
// MODAL CREATION COMPTE
// ======================================================

function CreateAccountModal({
  onClose,
  onCreated,
}: {
  onClose: () => void;
  onCreated: (user: User) => void;
}) {
  const [form, setForm] = useState<User>({
    firstName: "",
    lastName: "",
    email: "",
    telephone: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (
      !form.firstName.trim() ||
      !form.lastName.trim() ||
      !form.email.trim() ||
      !form.telephone.trim()
    ) {
      setError(
        "Veuillez remplir tous les champs."
      );

      return;
    }

    setLoading(true);

    try {
      const user = await createUser({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        telephone: form.telephone.trim(),
      });

      onCreated(user);
    } catch {
      setError(
        "Impossible de créer votre compte."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-black/30
        p-4
        backdrop-blur-md
        dark:bg-black/60
      "
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="
          relative
          w-full
          max-w-md
          overflow-hidden
          rounded-3xl
          border
          border-black/10
          bg-white
          p-6
          shadow-2xl
          dark:border-white/10
          dark:bg-[#111]
          sm:p-8
        "
      >
        {/* GLOW */}

        <div
          className="
            pointer-events-none
            absolute
            -right-20
            -top-20
            h-48
            w-48
            rounded-full
            bg-(--orange)
            opacity-10
            blur-[80px]
          "
        />

        {/* CLOSE */}

        <button
          type="button"
          onClick={onClose}
          className="
            absolute
            right-4
            top-4
            rounded-full
            p-2
            text-neutral-400
            transition
            hover:bg-black/5
            hover:text-(--orange)
            dark:hover:bg-white/10
          "
        >
          <X size={18} />
        </button>

        {/* ICON */}

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
          <UserRound size={25} />
        </div>

        {/* TITLE */}

        <div className="relative mt-5">
          <p
            className="
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.2em]
              text-(--orange)
            "
          >
            Espace client
          </p>

          <h2
            className="
              mt-1
              text-2xl
              font-bold
              tracking-tight
              text-neutral-900
              dark:text-white
            "
          >
            Créez votre compte
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
            Créez votre espace client pour retrouver
            facilement vos commandes et votre
            historique d'achats.
          </p>
        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="relative mt-7 space-y-4"
        >
          {/* PRENOM + NOM */}

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="firstName"
                className="
                  mb-1.5
                  block
                  text-xs
                  font-medium
                  text-neutral-600
                  dark:text-neutral-300
                "
              >
                Prénom
              </label>

              <input
                id="firstName"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="Jean"
                autoComplete="given-name"
                className="
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-neutral-200
                  bg-neutral-50
                  px-3.5
                  text-sm
                  outline-none
                  transition
                  placeholder:text-neutral-400
                  focus:border-(--orange)
                  focus:ring-2
                  focus:ring-(--orange)/10
                  dark:border-white/10
                  dark:bg-white/5
                  dark:text-white
                "
              />
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="
                  mb-1.5
                  block
                  text-xs
                  font-medium
                  text-neutral-600
                  dark:text-neutral-300
                "
              >
                Nom
              </label>

              <input
                id="lastName"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Dupont"
                autoComplete="family-name"
                className="
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-neutral-200
                  bg-neutral-50
                  px-3.5
                  text-sm
                  outline-none
                  transition
                  placeholder:text-neutral-400
                  focus:border-(--orange)
                  focus:ring-2
                  focus:ring-(--orange)/10
                  dark:border-white/10
                  dark:bg-white/5
                  dark:text-white
                "
              />
            </div>
          </div>

          {/* EMAIL */}

          <div>
            <label
              htmlFor="email"
              className="
                mb-1.5
                block
                text-xs
                font-medium
                text-neutral-600
                dark:text-neutral-300
              "
            >
              Adresse email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="jean@email.com"
              autoComplete="email"
              className="
                h-11
                w-full
                rounded-xl
                border
                border-neutral-200
                bg-neutral-50
                px-3.5
                text-sm
                outline-none
                transition
                placeholder:text-neutral-400
                focus:border-(--orange)
                focus:ring-2
                focus:ring-(--orange)/10
                dark:border-white/10
                dark:bg-white/5
                dark:text-white
              "
            />
          </div>

          {/* TELEPHONE */}

          <div>
            <label
              htmlFor="telephone"
              className="
                mb-1.5
                block
                text-xs
                font-medium
                text-neutral-600
                dark:text-neutral-300
              "
            >
              Téléphone
            </label>

            <input
              id="telephone"
              name="telephone"
              type="tel"
              value={form.telephone}
              onChange={handleChange}
              placeholder="+229 97 00 00 00"
              autoComplete="tel"
              className="
                h-11
                w-full
                rounded-xl
                border
                border-neutral-200
                bg-neutral-50
                px-3.5
                text-sm
                outline-none
                transition
                placeholder:text-neutral-400
                focus:border-(--orange)
                focus:ring-2
                focus:ring-(--orange)/10
                dark:border-white/10
                dark:bg-white/5
                dark:text-white
              "
            />
          </div>

          {/* ERROR */}

          {error && (
            <p
              className="
                rounded-xl
                bg-red-500/10
                px-3
                py-2.5
                text-xs
                text-red-500
              "
            >
              {error}
            </p>
          )}

          {/* SUBMIT */}

          <button
            type="submit"
            disabled={loading}
            className="
              flex
              h-11
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-(--orange)
              text-sm
              font-semibold
              text-black
              shadow-[0_0_25px_-8px_var(--orange)]
              transition
              hover:brightness-110
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {loading ? (
              <>
                <Loader2
                  size={17}
                  className="animate-spin"
                />

                Création...
              </>
            ) : (
              <>
                Créer mon compte

                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

// ======================================================
// HEADER
// ======================================================

export default function Header() {
  const [dark, setDark] = useState(
    HEADER_DATA.theme.defaultDark
  );

  const [menu, setMenu] = useState(false);

  const [user, setUser] = useState<User | null>(
    null
  );

  const [showAccountModal, setShowAccountModal] =
    useState(false);

  const pathname = usePathname();

  const router = useRouter();

  const {
    navigation,
    actions,
    logo: logoData,
  } = HEADER_DATA;

  // ====================================================
  // INITIALISATION
  // ====================================================

  useEffect(() => {
    const isDark = getDarkLocaltorage();

    if (isDark !== undefined) {
      setDark(handleDark(isDark));
    } else {
      handleDark(
        HEADER_DATA.theme.defaultDark
      );
    }

    getCurrentUser().then((currentUser) => {
      setUser(currentUser);
    });
  }, []);

  // ====================================================
  // THEME
  // ====================================================

  useEffect(() => {
    localStorage.setItem(
      HEADER_DATA.theme.storageKey,
      dark ? "true" : "false"
    );
  }, [dark]);

  // ====================================================
  // MENU
  // ====================================================

  useEffect(() => {
    document.body.style.overflow =
      menu || showAccountModal
        ? "hidden"
        : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menu, showAccountModal]);

  // ====================================================
  // ESC
  // ====================================================

  useEffect(() => {
    const handleEscape = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        setMenu(false);
        setShowAccountModal(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  // ====================================================
  // COMPTE CREE
  // ====================================================

  const handleUserCreated = (
    newUser: User
  ) => {
    setUser(newUser);
    setShowAccountModal(false);

    router.push(
      actions.dashboard.href
    );
  };

  // ====================================================
  // NOM AFFICHÉ
  // ====================================================

  const userDisplayName =
    user?.firstName ||
    user?.email ||
    "";

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <header className="relative z-30">

      {/* =================================================
          NAVBAR
      ================================================= */}

      <nav
        className="
          flex
          items-center
          justify-between
          px-6
          py-4
        "
      >

        {/* =================================================
            LOGO
        ================================================= */}

        <Link
          href={logoData.href}
          className="
            relative
            h-11
            w-11
            overflow-hidden
            rounded-full
            transition
            hover:scale-105
          "
        >
          <Image
            src={logo}
            alt={logoData.alt}
            fill
            priority
            className="object-cover"
          />
        </Link>

        {/* =================================================
            DESKTOP NAVIGATION
        ================================================= */}

        <div
          className="
            hidden
            items-center
            gap-7
            text-sm
            text-neutral-700
            dark:text-white/85
            md:flex
          "
        >
          {navigation.links.map(
            ({ name, href }) => {
              const active =
                pathname === href;

              /*
               * MON ESPACE
               */

              if (
                href ===
                actions.dashboard.href
              ) {
                return (
                  <button
                    key={href}
                    type="button"
                    onClick={() => {
                      if (!user) {
                        setShowAccountModal(
                          true
                        );
                      } else {
                        router.push(href);
                      }
                    }}
                    className={`
                      transition
                      hover:text-(--orange)
                      ${
                        active
                          ? "text-(--orange) underline underline-offset-8"
                          : ""
                      }
                    `}
                  >
                    {name}
                  </button>
                );
              }

              return (
                <Link
                  key={href}
                  href={href}
                  className={`
                    transition
                    hover:text-(--orange)
                    ${
                      active
                        ? "text-(--orange) underline underline-offset-8"
                        : ""
                    }
                  `}
                >
                  {name}
                </Link>
              );
            }
          )}
        </div>

        {/* =================================================
            ACTIONS
        ================================================= */}

        <div
          className="
            flex
            items-center
            gap-1
            text-neutral-800
            dark:text-white
          "
        >

          {/* THEME */}

          <ThemeToggle
            dark={dark}
            setDark={setDark}
          />

          {/* =================================================
              WHATSAPP
          ================================================= */}

          <a
            href={
              HEADER_DATA.supplier.whatsapp.href
            }
            target="_blank"
            rel="noopener noreferrer"
            aria-label={
              HEADER_DATA.supplier.whatsapp
                .ariaLabel
            }
            title={
              HEADER_DATA.supplier.whatsapp.title
            }
            className="
              rounded-full
              p-2
              transition
              hover:bg-black/5
              hover:text-(--orange)
              dark:hover:bg-white/10
            "
          >
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.57-.01-.198 0-.52.075-.792.372-.273.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982 1-3.648-.235-.374a9.87 9.87 0 1 1 8.372 4.632m8.6-18.8A12.06 12.06 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.95 11.95 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.88 11.88 0 0 0-3.292-8.366" />
            </svg>
          </a>

          {/* =================================================
              PANIER
          ================================================= */}

          <Link
            href={actions.cart.href}
            aria-label={
              actions.cart.ariaLabel
            }
            className="
              rounded-full
              p-2
              transition
              hover:bg-black/5
              hover:text-(--orange)
              dark:hover:bg-white/10
            "
          >
            <ShoppingCart size={20} />
          </Link>

          {/* =================================================
              ESPACE CLIENT
          ================================================= */}

          {user ? (
            <button
              type="button"
              onClick={() =>
                router.push(
                  actions.dashboard.href
                )
              }
              title={user.email}
              className="
                flex
                items-center
                gap-2
                rounded-full
                p-1
                pr-2.5
                transition
                hover:bg-black/5
                dark:hover:bg-white/10
              "
            >
              {/* AVATAR */}

              <div
                className="
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-(--orange)
                  text-xs
                  font-bold
                  text-black
                  shadow-[0_0_15px_-5px_var(--orange)]
                "
              >
                {user.firstName
                  .charAt(0)
                  .toUpperCase()}
              </div>

              {/* NOM */}

              <span
                className="
                  hidden
                  max-w-[100px]
                  truncate
                  text-xs
                  font-semibold
                  lg:block
                "
              >
                {userDisplayName}
              </span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() =>
                setShowAccountModal(
                  true
                )
              }
              aria-label={
                actions.dashboard
                  .ariaLabel
              }
              title={
                actions.dashboard.label
              }
              className="
                rounded-full
                p-2
                transition
                hover:bg-black/5
                hover:text-(--orange)
                dark:hover:bg-white/10
              "
            >
              <UserRound size={20} />
            </button>
          )}

          {/* =================================================
              MENU MOBILE
          ================================================= */}

          <button
            type="button"
            aria-label={
              actions.menu.open
            }
            aria-expanded={menu}
            onClick={() =>
              setMenu(true)
            }
            className="
              rounded-full
              p-2
              transition
              hover:bg-black/5
              hover:text-(--orange)
              dark:hover:bg-white/10
              md:hidden
            "
          >
            <Menu size={20} />
          </button>
        </div>
      </nav>

      {/* =================================================
          OVERLAY MOBILE
      ================================================= */}

      <div
        onClick={() =>
          setMenu(false)
        }
        aria-hidden={!menu}
        className={`
          fixed
          inset-0
          z-40
          bg-black/5
          backdrop-blur-sm
          transition-all
          duration-300
          dark:bg-black/20
          md:hidden
          ${
            menu
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
      />

      {/* =================================================
          MENU MOBILE
      ================================================= */}

      <aside
        aria-hidden={!menu}
        className={`
          fixed
          right-0
          top-0
          z-50
          h-screen
          w-[320px]
          max-w-[90%]
          overflow-y-auto
          border-l
          border-black/10
          bg-white/30
          p-6
          text-neutral-900
          shadow-2xl
          backdrop-blur-2xl
          backdrop-saturate-150
          transition-transform
          duration-300
          dark:border-white/10
          dark:bg-[#100906]/35
          dark:text-white
          md:hidden
          ${
            menu
              ? "translate-x-0"
              : "translate-x-full"
          }
        `}
      >

        {/* GLOW */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -left-20
            -top-20
            h-64
            w-64
            rounded-full
            bg-(--orange)
            opacity-10
            blur-[100px]
            dark:opacity-15
          "
        />

        {/* =================================================
            HEADER MENU
        ================================================= */}

        <div
          className="
            relative
            mb-10
            flex
            items-center
            justify-between
          "
        >

          {/* USER / LOGO */}

          {user ? (
            <button
              type="button"
              onClick={() => {
                setMenu(false);

                router.push(
                  actions.dashboard.href
                );
              }}
              className="
                flex
                items-center
                gap-3
              "
            >
              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  bg-(--orange)
                  font-bold
                  text-black
                "
              >
                {user.firstName
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <div className="text-left">
                <p className="text-sm font-semibold">
                  {user.firstName}
                </p>

                <p className="max-w-[150px] truncate text-[10px] text-neutral-500 dark:text-neutral-400">
                  {user.email}
                </p>
              </div>
            </button>
          ) : (
            <div
              className="
                relative
                h-[44px]
                w-[44px]
                overflow-hidden
                rounded-full
                ring-2
                ring-(--orange)
              "
            >
              <Image
                src={logo}
                alt={logoData.alt}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* CLOSE */}

          <button
            type="button"
            onClick={() =>
              setMenu(false)
            }
            aria-label={
              actions.menu.close
            }
            className="
              rounded-full
              p-2
              text-neutral-800
              transition
              hover:bg-black/5
              hover:text-(--orange)
              dark:text-white
              dark:hover:bg-white/10
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* =================================================
            LIENS
        ================================================= */}

        <div
          className="
            relative
            flex
            flex-col
            gap-2.5
          "
        >
          {navigation.links.map(
            ({
              name,
              href,
              icon: Icon,
            }) => {
              const active =
                pathname === href;

              /*
               * MON ESPACE
               */

              if (
                href ===
                actions.dashboard.href
              ) {
                return (
                  <button
                    key={href}
                    type="button"
                    onClick={() => {
                      if (!user) {
                        setMenu(false);

                        setShowAccountModal(
                          true
                        );
                      } else {
                        setMenu(false);

                        router.push(
                          href
                        );
                      }
                    }}
                    className={`
                      flex
                      w-full
                      items-center
                      gap-3
                      rounded-xl
                      border
                      px-4
                      py-3
                      text-left
                      transition
                      ${
                        active
                          ? `
                            border-(--orange)
                            bg-(--orange)
                            text-black
                            shadow-[0_0_20px_-8px_var(--orange)]
                          `
                          : `
                            border-black/5
                            bg-black/5
                            text-neutral-800
                            hover:border-(--orange)/30
                            hover:bg-(--orange)/10
                            hover:text-(--orange)
                            dark:border-white/5
                            dark:bg-white/5
                            dark:text-white/85
                            dark:hover:border-(--orange)/30
                            dark:hover:bg-white/10
                            dark:hover:text-(--orange)
                          `
                      }
                    `}
                  >
                    {Icon && <Icon size={18} />}

                    <span className="flex-1">
                      {name}
                    </span>

                    <ChevronRight
                      size={16}
                      className="opacity-50"
                    />
                  </button>
                );
              }

              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() =>
                    setMenu(false)
                  }
                  className={`
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    border
                    px-4
                    py-3
                    transition
                    ${
                      active
                        ? `
                          border-(--orange)
                          bg-(--orange)
                          text-black
                          shadow-[0_0_20px_-8px_var(--orange)]
                        `
                        : `
                          border-black/5
                          bg-black/5
                          text-neutral-800
                          hover:border-(--orange)/30
                          hover:bg-(--orange)/10
                          hover:text-(--orange)
                          dark:border-white/5
                          dark:bg-white/5
                          dark:text-white/85
                          dark:hover:border-(--orange)/30
                          dark:hover:bg-white/10
                          dark:hover:text-(--orange)
                        `
                    }
                  `}
                >
                  {Icon && <Icon size={18} />}

                  <span className="flex-1">
                    {name}
                  </span>

                  <ChevronRight
                    size={16}
                    className="opacity-50"
                  />
                </Link>
              );
            }
          )}
        </div>

        {/* =================================================
            CONTACT MOBILE
        ================================================= */}

        <div
          className="
            absolute
            bottom-8
            left-6
            right-6
          "
        >
          <Link
            href={
              HEADER_DATA.mobileMenu
                .contact.href
            }
            onClick={() =>
              setMenu(false)
            }
            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-full
              bg-(--orange)
              py-3
              font-medium
              text-black
              shadow-[0_0_25px_-6px_var(--orange)]
              transition
              hover:brightness-110
            "
          >
            {HEADER_DATA.mobileMenu.contact.label}
          </Link>
        </div>
      </aside>

      {/* =================================================
          MODAL CREATION COMPTE
      ================================================= */}

      {showAccountModal && (
        <CreateAccountModal
          onClose={() =>
            setShowAccountModal(false)
          }
          onCreated={handleUserCreated}
        />
      )}
    </header>
  );
}