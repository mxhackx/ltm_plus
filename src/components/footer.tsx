import Image from "next/image";
import Link from "next/link";
import logo from "@/../public/logo.png";

import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Home,
  Package,
  Contact,
  ArrowUpRight,
} from "lucide-react";

const NAV_LINKS = [
  { name: "Accueil", href: "/", icon: Home },
  { name: "Catalogue", href: "/catalog", icon: Package },
  { name: "Contact", href: "/contact", icon: Contact },
];

const SERVICES = ["Fabrication de tuyaux", "Distribution", "Conseils techniques"];
const CONTACT = ["Contact", "+229 01 97 28 09 76", "email@gmail.com"];
const ADRESS = ["Adresse", `Lot F634 Parcelle "M"`, "Tokan, Abomey-Calavi"];
const HORAIRE = ["Horaires", "Du lundi au vendredi", "07h00 – 22h00"];
const NAVIGATION = ["Navigation", "Nos services", ];
const SOCIETY = "LTM+";
const DESCRIPTION = "Fabricant de tubes électriques offrant des produits fiables, résistants et conformes aux normes de qualité.";
const COPYRIGHT = ". Tous droits réservés.";

function ConduitLine({ className = "" }: { className?: string }) {
  return (
    <div className={`relative h-px w-full ${className}`} aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-transparent" />
      <div className="absolute left-[8%] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full border border-black/25 bg-[#150d08]" />
      <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/25 bg-[#150d08]" />
      <div className="absolute left-[92%] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full border border-black/25 bg-[#150d08]" />
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="">
      <section className="bg-(--orange) text-black">
        <div className="mx-auto grid max-w-6xl gap-8 divide-y divide-black/15 px-6 py-10 md:grid-cols-3 md:divide-x md:divide-y-0">
          <div className="flex flex-col gap-3 pb-6 md:px-8 md:pb-0 items-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/60">
              {CONTACT[0]}
            </p>
            <a href="tel:+22901972809876" className="flex items-center gap-3 hover:underline">
              <Phone size={18} strokeWidth={2} />
              {CONTACT[1]}
            </a>
            <a href="mailto:email@gmail.com" className="flex items-center gap-3 hover:underline">
              <Mail size={18} strokeWidth={2} />
              {CONTACT[2]}
            </a>
          </div>

          <div className="flex flex-col gap-3 py-6 md:px-8 md:py-0 items-center">
            <p className="text-xs font-;semibold uppercase tracking-[0.2em] text-black/60">
              {ADRESS[0]}
            </p>
            <div className="flex items-start gap-3">
              <MapPin size={18} strokeWidth={2} className="mt-0.5 shrink-0" />
              <p className="leading-6">
                {ADRESS[1]}
                <br />
                {ADRESS[2]}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-6 md:px-8 md:pt-0 items-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/60">
              {HORAIRE[0]}
            </p>
            <div className="flex items-start gap-3">
              <Clock size={18} strokeWidth={2} className="mt-0.5 shrink-0" />
              <p className="leading-6">
                {HORAIRE[1]}
                <br />
                {HORAIRE[2]}
              </p>
            </div>
          </div>
        </div>
      </section>

      <ConduitLine className="bg-(--orange) p-3"/>

      <section className="bg-linear-to-b from-[#2a1810] to-[#150d08] px-6 py-14 text-white">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-4">
          <div className="flex flex-col gap-4">
            <div className="relative h-[56px] w-[56px] overflow-hidden rounded-full ring-2 ring-(--orange)">
              <Image src={logo} alt="LTM+ Logo" fill className="object-cover" />
            </div>
            <p className="text-sm text-white/70">Qualité · Résistance · Performance</p>
          </div>
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-white/45">
              {NAVIGATION[0]}
            </h3>
            <nav className="flex flex-col gap-3">
              {NAV_LINKS.map(({ name, href, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="group flex items-center gap-3 text-sm text-white/85 transition hover:text-(--orange)"
                >
                  <Icon size={18} strokeWidth={2} />
                  {name}
                  <ArrowUpRight
                    size={13}
                    strokeWidth={2}
                    className="opacity-0 transition group-hover:opacity-100"
                  />
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-white/45">
              {NAVIGATION[1]}
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-white/85">
              {SERVICES.map((service) => (
                <li key={service} className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-(--orange)" />
                  {service}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-white/45">
              {SOCIETY}
            </h3>
            <p className="text-sm leading-7 text-white/70">
              {DESCRIPTION}
            </p>
          </div>
        </div>
      </section>

      <div className="border-t border-white/10 bg-[#0f0906] py-5 text-center text-sm text-white/40">
        {`©`} {new Date().getFullYear()} {SOCIETY}{COPYRIGHT}
      </div>
    </footer>
  );
}