"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "@/../public/logo.png";
import Link from "next/link";
import {
  Moon,
  Sun,
  Phone,
  ShoppingCart,
  Menu,
  X,
  ChevronRight,
  PhoneCall,
} from "lucide-react";
export function getDarkLocaltorage(data:string = "dark") : boolean | undefined {
  const darkStorage = localStorage.getItem(data);

  if (!darkStorage)
    return undefined;
  return darkStorage === "true" ? true : false;
}

export const handleDark = (prev: any) => {
  const next = prev;

  if (next)
    document.documentElement.classList.add("dark");
  else
    document.documentElement.classList.remove("dark");
  return next;
};

export const handleDarkClick = (setDark: React.Dispatch<React.SetStateAction<boolean>>) : void => setDark((prev) => handleDark(!prev));

export default function Header() {
  const [dark, setDark] = useState(false);
  const [menu, setMenu] = useState(false);
  const links = [
    { name: "Accueil", href: "/" },
    { name: "Catalogue", href: "/catalog" },
    { name: "Panier", href: "/panier" },
    { name: "Contact", href: "/contact" },
    { name: "À propos", href: "/about" },
  ];

  useEffect(() => {
    const isDark = getDarkLocaltorage();

    if (isDark !== undefined)
      setDark((prev) => handleDark(isDark));
  }, []);

  useEffect(() => localStorage.setItem("dark", dark ? "true" : "false"), [dark]);
  return (
    <header className={`sticky top-0 z-50 bg-[var(--orange)] shadow-lg font-mono`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
        <div className="flex gap-5">
          <Link href="/" className="flex items-center gap-3">
            <Image src={logo} width={40} alt="LTM+ logo" priority/>
          </Link>
          <button className="rounded-full p-2 transition hover:bg-black/10" onClick={() => handleDarkClick(setDark)}>
            {dark ? <Sun size={22}/> : <Moon size={22}/>}
          </button>
        </div>
        <div className="flex gap-5">
          <Link href="/contact" className="rounded-full p-2 transition hover:bg-black/10">
            <Phone size={22}></Phone>
          </Link>
          <Link href="/catalog" className="rounded-full p-2 transition hover:bg-black/10">
            <ShoppingCart size={22}/>
          </Link>
          <button onClick={() => setMenu(true)} className="rounded-full p-2 transition hover:bg-black/10">
            <Menu size={22}/>
          </button>
        </div>
        {menu && (<div onClick={() => setMenu(false)} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"></div>)}
        {menu && <aside className={`text-white fixed right-0 top-0 z-50 h-screen w-[320px] max-w-[90%] p-6 shadow-2xl transition-transform duration-1000 ${menu ? "translate-x-0" : "translate-x-7"}`}>
          <div className="flex items-center justify-between mb-10">
            <Image src={logo} width={55} alt="LTM+ logo"/>
            <button onClick={() => setMenu(false)} className="rounded-full p-2 hover:bg-black/10">
              <X/>
            </button>
          </div>
          <div className="flex flex-col gap-4">
            {links.map((link)=>(
              <Link
                key={link.href}
                href={link.href}
                onClick={()=>setMenu(false)}
                className="
                  flex
                  items-center
                  justify-between
                  rounded-xl
                  bg-white/20
                  px-4
                  py-3
                  transition
                  hover:bg-white/30
                "
              >
                {link.name}
                <ChevronRight size={18}/>
              </Link>
            ))}
          </div>
          <div className="absolute bottom-10 left-6 right-6">
            <Link
              href="/contact"
              className="
                flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-black
                dark:bg-white
                dark:text-black
                py-3
                text-white
              "
            >
              <Phone size={18}/>
              Nous contacter
            </Link>
          </div>
        </aside>}
      </nav>
    </header>
  );
}