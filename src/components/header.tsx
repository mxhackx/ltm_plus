"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "@/../public/logo.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Moon,
  Sun,
  Phone,
  ShoppingCart,
  Menu,
  X,
  ChevronRight,
  Home,
  Package,
  Info,
} from "lucide-react";

export function getDarkLocaltorage(
  data: string = "dark"
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

const LINKS = [
  { name: "Accueil", href: "/", icon: Home },
  { name: "Catalogue", href: "/catalog", icon: Package },
  { name: "Panier", href: "/panier", icon: ShoppingCart },
  { name: "Contact", href: "/contact", icon: Phone },
  { name: "À propos", href: "/about", icon: Info },
];

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
      aria-label="Changer de thème"
      onClick={() => handleDarkClick(setDark)}
      className="relative flex h-7 w-14 shrink-0 items-center justify-between rounded-full border border-black/15 bg-black/5 px-1.5 dark:border-white/15 dark:bg-white/5"
    >
      <span
        className={`absolute left-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-(--orange) shadow-[0_0_10px_-1px_var(--orange)] transition-transform duration-300 ${
          dark ? "translate-x-0" : "translate-x-[26px]"
        }`}
      >
        {dark ? (
          <Moon size={13} className="text-black" />
        ) : (
          <Sun size={13} className="text-black" />
        )}
      </span>
    </button>
  );
}

export default function Header() {
  const [dark, setDark] = useState(true);
  const [menu, setMenu] = useState(false);
  const pathname = usePathname();

  // Initialisation du thème
  useEffect(() => {
    const isDark = getDarkLocaltorage();

    if (isDark !== undefined) {
      setDark(handleDark(isDark));
    } else {
      handleDark(true);
    }
  }, []);

  // Sauvegarde du thème
  useEffect(() => {
    localStorage.setItem("dark", dark ? "true" : "false");
  }, [dark]);

  // Bloque le scroll lorsque le menu mobile est ouvert
  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menu]);

  // Fermer le menu avec Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenu(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <header className="relative z-30">
      <nav className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="relative h-11 w-11 overflow-hidden rounded-full">
          <Image
            src={logo}
            alt="LTM+ logo"
            fill
            priority
            className="object-cover"
          />
        </Link>

        {/* Navigation desktop uniquement */}
        <div className="hidden items-center gap-7 text-sm text-neutral-700 dark:text-white/85 md:flex">
          {LINKS.map(({ name, href }) => {
            const active = pathname === href;

            return (
              <Link
                key={href}
                href={href}
                className={`transition hover:text-(--orange) ${
                  active
                    ? "text-(--orange) underline underline-offset-8"
                    : ""
                }`}
              >
                {name}
              </Link>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 text-neutral-800 dark:text-white">
          <ThemeToggle dark={dark} setDark={setDark} />

          {/* Contact */}
          <Link
            href="/contact"
            aria-label="Contact"
            className="rounded-full p-2 transition hover:bg-black/5 hover:text-(--orange) dark:hover:bg-white/10"
          >
            <Phone size={20} />
          </Link>

          {/* Catalogue */}
          <Link
            href="/catalog"
            aria-label="Catalogue"
            className="rounded-full p-2 transition hover:bg-black/5 hover:text-(--orange) dark:hover:bg-white/10"
          >
            <ShoppingCart size={20} />
          </Link>

          {/* Bouton hamburger : MOBILE UNIQUEMENT */}
          <button
            type="button"
            aria-label="Ouvrir le menu"
            aria-expanded={menu}
            onClick={() => setMenu(true)}
            className="rounded-full p-2 transition hover:bg-black/5 hover:text-(--orange) dark:hover:bg-white/10 md:hidden"
          >
            <Menu size={20} />
          </button>
        </div>
      </nav>

      {/* =========================================================
          MENU MOBILE
          Tout ce qui suit est caché sur desktop
          ========================================================= */}

      {/* Overlay + blur de la page */}
      <div
        onClick={() => setMenu(false)}
        aria-hidden={!menu}
        className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-md transition-all duration-300 md:hidden ${
          menu
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* Menu mobile */}
      <aside
        aria-hidden={!menu}
        className={`fixed right-0 top-0 z-50 h-screen w-[320px] max-w-[90%] overflow-y-auto border-l border-white/15 bg-gradient-to-br from-(--orange)/30 via-black/80 to-black p-6 text-white shadow-2xl backdrop-blur-2xl backdrop-saturate-150 transition-transform duration-300 md:hidden ${
          menu ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Glow décoratif */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-(--orange) opacity-30 blur-[90px]"
        />

        {/* Header du menu */}
        <div className="relative mb-10 flex items-center justify-between">
          <div className="relative h-[44px] w-[44px] overflow-hidden rounded-full ring-2 ring-(--orange)">
            <Image
              src={logo}
              alt="LTM+ logo"
              fill
              className="object-cover"
            />
          </div>

          <button
            type="button"
            onClick={() => setMenu(false)}
            aria-label="Fermer le menu"
            className="rounded-full p-2 transition hover:bg-white/10"
          >
            <X size={20} />
          </button>
        </div>

        {/* Liens */}
        <div className="relative flex flex-col gap-2.5">
          {LINKS.map(({ name, href, icon: Icon }) => {
            const active = pathname === href;

            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMenu(false)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                  active
                    ? "bg-(--orange) text-black"
                    : "bg-white/10 text-white/85 hover:bg-white/20"
                }`}
              >
                <Icon size={18} />

                <span className="flex-1">{name}</span>

                <ChevronRight size={16} className="opacity-60" />
              </Link>
            );
          })}
        </div>

        {/* Bouton contact */}
        <div className="absolute bottom-8 left-6 right-6">
          <Link
            href="/contact"
            onClick={() => setMenu(false)}
            className="flex items-center justify-center gap-2 rounded-full bg-(--orange) py-3 font-medium text-black shadow-[0_0_25px_-6px_var(--orange)] transition hover:brightness-110"
          >
            <Phone size={18} />
            Nous contacter
          </Link>
        </div>
      </aside>
    </header>
  );
}
