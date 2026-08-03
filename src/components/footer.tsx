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
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20">

      {/* Informations */}
      <section className="grid gap-8 bg-[var(--orange)] px-6 py-10 text-center md:grid-cols-3">

        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Contact</h3>

          <div className="flex items-center justify-center gap-2">
            <Phone size={18} />
            <p>+229 01 97 28 09 76</p>
          </div>

          <div className="flex items-center justify-center gap-2">
            <Mail size={18} />
            <p>email@gmail.com</p>
          </div>
        </div>

        <div className="space-y-3 border-y border-black py-6 md:border-x md:border-y-0 md:py-0">
          <h3 className="text-lg font-semibold">Adresse</h3>

          <div className="flex items-center justify-center gap-2">
            <MapPin size={18} />
            <div>
              <p>lot F634 Parcelle {`"M"`}</p>
              <p>Tokan, Abomey-Calavi</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Horaires</h3>

          <div className="flex items-center justify-center gap-2">
            <Clock size={18} />
            <p>Du lundi au vendredi<br />07h00 - 22h00</p>
          </div>
        </div>

      </section>

      {/* Bas du footer */}
      <section className="grid gap-10 bg-[#363636] px-6 py-10 text-white md:grid-cols-4">

        {/* Logo */}
        <div className="flex flex-col items-center gap-3">
          <Image
            src={logo}
            width={60}
            alt="LTM+ Logo"
          />
          <p className="text-center">
            Qualité • Résistance • Performance
          </p>
        </div>
        <div>
          <h3 className="mb-4 font-semibold">Navigation</h3>

          <nav className="flex flex-col gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 transition hover:text-orange-300"
            >
              <Home size={18} />
              Accueil
            </Link>

            <Link
              href="/catalog"
              className="flex items-center gap-2 transition hover:text-orange-300"
            >
              <Package size={18} />
              Catalogue
            </Link>

            <Link
              href="/contact"
              className="flex items-center gap-2 transition hover:text-orange-300"
            >
              <Contact size={18} />
              Contact
            </Link>
          </nav>
        </div>
        <div>
          <h3 className="mb-4 font-semibold">Nos services</h3>

          <ul className="space-y-3 text-sm">
            <li>Fabrication de tuyaux</li>
            <li>Distribution</li>
            <li>Conseils techniques</li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 font-semibold">LTM+</h3>

          <p className="text-sm leading-7 text-gray-300">
            Fabricant de tubes électriques offrant des produits
            fiables, résistants et conformes aux normes de qualité.
          </p>
        </div>

      </section>
      <div className="border-t border-white/10 bg-[#2b2b2b] py-5 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} LTM+. Tous droits réservés.
      </div>
    </footer>
  );
}