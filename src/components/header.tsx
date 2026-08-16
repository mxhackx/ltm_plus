"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "@/../public/logo.png";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

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
  LogOut,
  Phone,
  Loader2,
} from "lucide-react";

import {
  getCurrentUser,
  logoutUser,
} from "@/lib/actions/auth";

import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";

import "@/app/globals.css";

// ======================================================
// TYPES
// ======================================================

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
};

// ======================================================
// DONNÉES
// ======================================================

const HEADER_DATA = {
  theme: {
    storageKey: "dark",
    defaultDark: true,
    ariaLabel: "Changer de thème",
  },

  supplier: {
    whatsapp: {
      number: "22997000000",
      href: "https://wa.me/22997000000",
      ariaLabel:
        "Contacter le fournisseur sur WhatsApp",
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
        icon: Phone,
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

    login: {
      label: "Connexion",
      ariaLabel: "Se connecter",
    },

    register: {
      label: "Créer un compte",
      ariaLabel: "Créer un compte",
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
// THEME
// ======================================================

function getDarkStorage(): boolean | undefined {
  const value = localStorage.getItem(
    HEADER_DATA.theme.storageKey
  );

  if (value === null) {
    return undefined;
  }

  return value === "true";
}

function applyDarkMode(dark: boolean) {
  if (dark) {
    document.documentElement.classList.add(
      "dark"
    );
  } else {
    document.documentElement.classList.remove(
      "dark"
    );
  }

  return dark;
}

// ======================================================
// THEME TOGGLE
// ======================================================

function ThemeToggle({
  dark,
  setDark,
}: {
  dark: boolean;
  setDark: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}) {
  const handleClick = () => {
    setDark((previous) => {
      const next = !previous;

      applyDarkMode(next);

      localStorage.setItem(
        HEADER_DATA.theme.storageKey,
        String(next)
      );

      return next;
    });
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label={
        HEADER_DATA.theme.ariaLabel
      }
      onClick={handleClick}
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
// HEADER
// ======================================================

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  // ====================================================
  // ÉTATS
  // ====================================================

  const [dark, setDark] = useState(
    HEADER_DATA.theme.defaultDark
  );

  const [menu, setMenu] = useState(false);

  const [user, setUser] =
    useState<User | null>(null);

  const [loadingUser, setLoadingUser] =
    useState(true);

  const [showLogin, setShowLogin] =
    useState(false);

  const [showRegister, setShowRegister] =
    useState(false);

  const [loggingOut, setLoggingOut] =
    useState(false);

  // ====================================================
  // INITIALISATION
  // ====================================================

  useEffect(() => {
    // ----------------------------------------------
    // THEME
    // ----------------------------------------------

    const storedTheme =
      getDarkStorage();

    if (storedTheme !== undefined) {
      setDark(
        applyDarkMode(storedTheme)
      );
    } else {
      applyDarkMode(
        HEADER_DATA.theme.defaultDark
      );
    }

    // ----------------------------------------------
    // UTILISATEUR
    // ----------------------------------------------

    async function loadUser() {
      try {
        const currentUser =
          await getCurrentUser();

        setUser(currentUser);
      } catch (error) {
        console.error(
          "HEADER_USER_ERROR:",
          error
        );

        setUser(null);
      } finally {
        setLoadingUser(false);
      }
    }

    loadUser();
  }, []);

  // ====================================================
  // BODY SCROLL
  // ====================================================

  useEffect(() => {
    document.body.style.overflow =
      menu ||
      showLogin ||
      showRegister
        ? "hidden"
        : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [
    menu,
    showLogin,
    showRegister,
  ]);

  // ====================================================
  // ESC
  // ====================================================

  useEffect(() => {
    const handleEscape = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        setMenu(false);
        setShowLogin(false);
        setShowRegister(false);
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
  // CONNEXION
  // ====================================================

  const handleLogin = () => {
    setMenu(false);
    setShowRegister(false);
    setShowLogin(true);
  };

  // ====================================================
  // UTILISATEUR CONNECTÉ
  // ====================================================

  const handleLoggedIn = (
    loggedUser: User
  ) => {
    setUser(loggedUser);

    setShowLogin(false);
    setShowRegister(false);
    setMenu(false);

    router.refresh();
    router.push("/dashboard");
  };

  // ====================================================
  // INSCRIPTION
  // ====================================================

  const handleRegister = () => {
    setMenu(false);
    setShowLogin(false);
    setShowRegister(true);
  };

  // ====================================================
  // INSCRIPTION TERMINÉE
  // ====================================================

  const handleRegistered = (
    registeredUser: User
  ) => {
    setUser(registeredUser);

    setShowRegister(false);
    setShowLogin(false);
    setMenu(false);

    router.refresh();
    router.push("/dashboard");
  };

  // ====================================================
  // LOGOUT
  // ====================================================

  const handleLogout = async () => {
    if (loggingOut) {
      return;
    }

    setLoggingOut(true);

    try {
      const result =
        await logoutUser();

      if (!result.success) {
        console.error(
          result.error
        );

        return;
      }

      setUser(null);
      setMenu(false);

      router.refresh();
      router.push("/");
    } catch (error) {
      console.error(
        "LOGOUT_CLIENT_ERROR:",
        error
      );
    } finally {
      setLoggingOut(false);
    }
  };

  // ====================================================
  // ESPACE CLIENT
  // ====================================================

  const handleDashboard = () => {
    if (loadingUser) {
      return;
    }

    if (!user) {
      setMenu(false);
      setShowLogin(true);
      return;
    }

    setMenu(false);

    router.push(
      HEADER_DATA.actions.dashboard.href
    );
  };

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
          href={HEADER_DATA.logo.href}
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
            alt={HEADER_DATA.logo.alt}
            fill
            priority
            className="object-cover"
          />
        </Link>

        {/* =================================================
            DESKTOP NAV
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
          {HEADER_DATA.navigation.links.map(
            ({ name, href }) => {
              const active =
                pathname === href;

              // ------------------------------------------
              // MON ESPACE
              // ------------------------------------------

              if (
                href ===
                HEADER_DATA.actions.dashboard
                  .href
              ) {
                return (
                  <button
                    key={href}
                    type="button"
                    onClick={
                      handleDashboard
                    }
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

              // ------------------------------------------
              // LIEN NORMAL
              // ------------------------------------------

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

          {/* =================================================
              THEME
          ================================================= */}

          <ThemeToggle
            dark={dark}
            setDark={setDark}
          />

          {/* =================================================
              WHATSAPP
          ================================================= */}

          <a
            href={
              HEADER_DATA.supplier.whatsapp
                .href
            }
            target="_blank"
            rel="noopener noreferrer"
            aria-label={
              HEADER_DATA.supplier.whatsapp
                .ariaLabel
            }
            title={
              HEADER_DATA.supplier.whatsapp
                .title
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
            href={
              HEADER_DATA.actions.cart.href
            }
            aria-label={
              HEADER_DATA.actions.cart
                .ariaLabel
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
              UTILISATEUR
          ================================================= */}

          {loadingUser ? (
            <div
              className="
                rounded-full
                p-2
              "
            >
              <Loader2
                size={20}
                className="animate-spin"
              />
            </div>
          ) : user ? (

            /* =============================================
               UTILISATEUR CONNECTÉ
            ============================================= */

            <button
              type="button"
              onClick={
                handleDashboard
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
                "
              >
                {user.firstName
                  .charAt(0)
                  .toUpperCase()}
              </div>

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
                {user.firstName}
              </span>
            </button>

          ) : (

            /* =============================================
               UTILISATEUR NON CONNECTÉ
            ============================================= */

            <div
              className="
                hidden
                items-center
                gap-2
                md:flex
              "
            >

              {/* CONNEXION */}

              <button
                type="button"
                onClick={
                  handleLogin
                }
                className="
                  rounded-lg
                  px-3
                  py-2
                  text-sm
                  font-medium
                  transition
                  hover:bg-black/5
                  hover:text-(--orange)
                  dark:hover:bg-white/10
                "
              >
                {
                  HEADER_DATA
                    .actions
                    .login
                    .label
                }
              </button>

              {/* INSCRIPTION */}

              <button
                type="button"
                onClick={
                  handleRegister
                }
                className="
                  rounded-lg
                  bg-(--orange)
                  px-3
                  py-2
                  text-sm
                  font-semibold
                  text-black
                  shadow-[0_0_20px_-8px_var(--orange)]
                  transition
                  hover:brightness-110
                "
              >
                {
                  HEADER_DATA
                    .actions
                    .register
                    .label
                }
              </button>

            </div>
          )}

          {/* =================================================
              MOBILE MENU BUTTON
          ================================================= */}

          <button
            type="button"
            aria-label={
              menu
                ? HEADER_DATA.actions.menu.close
                : HEADER_DATA.actions.menu.open
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
          MOBILE OVERLAY
      ================================================= */}

      <div
        onClick={() =>
          setMenu(false)
        }
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
          MOBILE MENU
      ================================================= */}

      <aside
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

        {/* =================================================
            GLOW
        ================================================= */}

        <div
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
            MENU HEADER
        ================================================= */}

        <div
          className="
            relative
            mb-8
            flex
            items-center
            justify-between
          "
        >

          {user ? (

            <button
              type="button"
              onClick={() => {
                setMenu(false);

                router.push(
                  HEADER_DATA
                    .actions
                    .dashboard
                    .href
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

                <p
                  className="
                    text-sm
                    font-semibold
                  "
                >
                  {user.firstName}
                </p>

                <p
                  className="
                    max-w-[150px]
                    truncate
                    text-[10px]
                    text-neutral-500
                    dark:text-neutral-400
                  "
                >
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
                alt={
                  HEADER_DATA.logo.alt
                }
                fill
                className="object-cover"
              />
            </div>
          )}

          <button
            type="button"
            onClick={() =>
              setMenu(false)
            }
            aria-label={
              HEADER_DATA.actions.menu
                .close
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
            LINKS
        ================================================= */}

        <div
          className="
            relative
            flex
            flex-col
            gap-2.5
          "
        >

          {HEADER_DATA.navigation.links.map(
            ({
              name,
              href,
              icon: Icon,
            }) => {

              const active =
                pathname === href;

              // ------------------------------------------
              // MON ESPACE
              // ------------------------------------------

              if (
                href ===
                HEADER_DATA.actions.dashboard
                  .href
              ) {
                return (
                  <button
                    key={href}
                    type="button"
                    onClick={() => {
                      handleDashboard();
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
                          ? "border-(--orange) bg-(--orange) text-black"
                          : "border-black/5 bg-black/5 text-neutral-800 hover:border-(--orange)/30 hover:bg-(--orange)/10 hover:text-(--orange) dark:border-white/5 dark:bg-white/5 dark:text-white/85"
                      }
                    `}
                  >
                    <Icon size={18} />

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

              // ------------------------------------------
              // LIEN NORMAL
              // ------------------------------------------

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
                        ? "border-(--orange) bg-(--orange) text-black"
                        : "border-black/5 bg-black/5 text-neutral-800 hover:border-(--orange)/30 hover:bg-(--orange)/10 hover:text-(--orange) dark:border-white/5 dark:bg-white/5 dark:text-white/85"
                    }
                  `}
                >
                  <Icon size={18} />

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
            LOGIN / REGISTER
        ================================================= */}

        {!user && !loadingUser && (
          <div
            className="
              relative
              mt-5
              grid
              grid-cols-2
              gap-2
            "
          >

            {/* CONNEXION */}

            <button
              type="button"
              onClick={
                handleLogin
              }
              className="
                rounded-xl
                border
                border-black/10
                bg-black/5
                px-3
                py-3
                text-sm
                font-semibold
                transition
                hover:border-(--orange)
                hover:text-(--orange)
                dark:border-white/10
                dark:bg-white/5
              "
            >
              Connexion
            </button>

            {/* INSCRIPTION */}

            <button
              type="button"
              onClick={
                handleRegister
              }
              className="
                rounded-xl
                bg-(--orange)
                px-3
                py-3
                text-sm
                font-semibold
                text-black
                transition
                hover:brightness-110
              "
            >
              Inscription
            </button>

          </div>
        )}

        {/* =================================================
            LOGOUT
        ================================================= */}

        {user && (
          <button
            type="button"
            disabled={loggingOut}
            onClick={handleLogout}
            className="
              relative
              mt-5
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-red-500/20
              bg-red-500/5
              px-4
              py-3
              text-sm
              font-medium
              text-red-500
              transition
              hover:bg-red-500/10
              disabled:opacity-50
            "
          >

            {loggingOut ? (
              <Loader2
                size={17}
                className="animate-spin"
              />
            ) : (
              <LogOut size={17} />
            )}

            {loggingOut
              ? "Déconnexion..."
              : "Se déconnecter"}

          </button>
        )}

        {/* =================================================
            CONTACT
        ================================================= */}

        <div
          className="
            relative
            mt-5
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
            {
              HEADER_DATA
                .mobileMenu
                .contact
                .label
            }
          </Link>
        </div>

      </aside>

      {/* =================================================
          LOGIN MODAL
      ================================================= */}

      {showLogin && (
        <LoginForm
          onClose={() =>
            setShowLogin(false)
          }
          onLoggedIn={
            handleLoggedIn
          }
        />
      )}

      {/* =================================================
          REGISTER MODAL
      ================================================= */}

      {showRegister && (
        <RegisterForm
          onClose={() =>
            setShowRegister(false)
          }
          onRegistered={
            handleRegistered
          }
          onLogin={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
        />
      )}

    </header>
  );
}