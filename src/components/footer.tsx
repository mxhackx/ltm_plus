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

const FOOTER_DATA = {
  company: {
    name: "LTM+",

    description:
      "Fabricant de tubes électriques offrant des produits fiables, résistants et conformes aux normes de qualité.",

    qualities: "Qualité · Résistance · Performance",

    copyright: ". Tous droits réservés.",
  },

  contact: {
    title: "Contact",

    phone: {
      display: "+229 01 97 28 09 76",
      href: "tel:+2290197280976",
    },

    email: {
      display: "email@gmail.com",
      href: "mailto:email@gmail.com",
    },
  },

  address: {
    title: "Adresse",
    line1: 'Lot F634 Parcelle "M"',
    line2: "Tokan, Abomey-Calavi",
  },

  openingHours: {
    title: "Horaires",
    days: "Du lundi au vendredi",
    hours: "07h00 – 22h00",
  },

  navigation: {
    title: "Navigation",

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
        name: "Contact",
        href: "/contact",
        icon: Contact,
      },
    ],
  },

  services: {
    title: "Nos services",

    items: [
      "Fabrication de tuyaux",
      "Distribution",
      "Conseils techniques",
    ],
  },

  logo: {
    alt: "LTM+ Logo",
  },
} as const;

export default function Footer() {
  const {
    company,
    contact,
    address,
    openingHours,
    navigation,
    services,
    logo: logoData,
  } = FOOTER_DATA;

  return (
    <footer>
      {/* =====================================================
          CONTACT / ADDRESS / HOURS
      ===================================================== */}

      <section className="bg-(--orange) text-black">
        <div
          className="
            mx-auto
            grid
            max-w-6xl
            gap-7
            px-6
            py-8
            md:grid-cols-3
          "
        >
          {/* CONTACT */}

          <div
            className="
              flex
              flex-col
              items-center
              justify-center
              gap-2
              text-center
              md:px-6
            "
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/55">
              {contact.title}
            </p>

            <a
              href={contact.phone.href}
              className="
                flex
                items-center
                gap-2
                text-sm
                font-medium
                transition-opacity
                hover:opacity-60
              "
            >
              <Phone size={17} strokeWidth={2} />

              {contact.phone.display}
            </a>

            <a
              href={contact.email.href}
              className="
                flex
                items-center
                gap-2
                text-sm
                text-black/70
                transition-opacity
                hover:opacity-60
              "
            >
              <Mail size={16} strokeWidth={2} />

              {contact.email.display}
            </a>
          </div>

          {/* ADDRESS */}

          <div
            className="
              flex
              flex-col
              items-center
              justify-center
              gap-2
              border-t
              border-black/10
              pt-6
              text-center
              md:border-l
              md:border-t-0
              md:px-6
              md:pt-0
            "
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/55">
              {address.title}
            </p>

            <div className="flex items-start justify-center gap-2 text-sm">
              <MapPin
                size={17}
                strokeWidth={2}
                className="mt-0.5 shrink-0"
              />

              <p className="leading-5">
                {address.line1}
                <br />
                <span className="text-black/65">
                  {address.line2}
                </span>
              </p>
            </div>
          </div>

          {/* OPENING HOURS */}

          <div
            className="
              flex
              flex-col
              items-center
              justify-center
              gap-2
              border-t
              border-black/10
              pt-6
              text-center
              md:border-l
              md:border-t-0
              md:px-6
              md:pt-0
            "
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/55">
              {openingHours.title}
            </p>

            <div className="flex items-start justify-center gap-2 text-sm">
              <Clock
                size={17}
                strokeWidth={2}
                className="mt-0.5 shrink-0"
              />

              <p className="leading-5">
                {openingHours.days}
                <br />

                <span className="font-semibold">
                  {openingHours.hours}
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          MAIN FOOTER
      ===================================================== */}

      <section
        className="
          bg-linear-to-b
          from-[#2a1810]
          to-[#150d08]
          px-6
          py-10
          text-white
          sm:py-12
        "
      >
        <div
          className="
            mx-auto
            grid
            max-w-6xl
            gap-9
            text-center
            sm:gap-10
            md:grid-cols-4
            md:text-left
          "
        >
          {/* BRAND */}

          <div
            className="
              flex
              flex-col
              items-center
              justify-start
              md:items-start
            "
          >
            <Link
              href="/"
              className="
                relative
                h-14
                w-14
                overflow-hidden
                rounded-full
                ring-2
                ring-(--orange)
                transition
                hover:scale-105
              "
            >
              <Image
                src={logo}
                alt={logoData.alt}
                fill
                className="object-cover"
              />
            </Link>

            <p
              className="
                mt-3
                text-xs
                font-medium
                tracking-wide
                text-white/60
                md:text-left
              "
            >
              {company.qualities}
            </p>
          </div>

          {/* NAVIGATION */}

          <div>
            <h3 className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
              {navigation.title}
            </h3>

            <nav className="flex flex-col items-center gap-2.5 md:items-start">
              {navigation.links.map(
                ({ name, href, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className="
                      group
                      flex
                      items-center
                      gap-2.5
                      text-sm
                      text-white/75
                      transition
                      hover:text-(--orange)
                    "
                  >
                    <Icon
                      size={16}
                      strokeWidth={2}
                      className="text-white/45 transition group-hover:text-(--orange)"
                    />

                    <span>{name}</span>

                    <ArrowUpRight
                      size={12}
                      strokeWidth={2}
                      className="
                        opacity-0
                        transition
                        group-hover:translate-x-0.5
                        group-hover:-translate-y-0.5
                        group-hover:opacity-100
                      "
                    />
                  </Link>
                )
              )}
            </nav>
          </div>

          {/* SERVICES */}

          <div>
            <h3 className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
              {services.title}
            </h3>

            <ul className="flex flex-col items-center gap-2.5 text-sm text-white/75 md:items-start">
              {services.items.map((service) => (
                <li
                  key={service}
                  className="flex items-center gap-2.5"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-(--orange)" />

                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* COMPANY DESCRIPTION */}

          <div>
            <h3 className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
              {company.name}
            </h3>

            <p className="text-sm leading-6 text-white/60">
              {company.description}
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          COPYRIGHT
      ===================================================== */}

      <div
        className="
          bg-[#0f0906]
          px-6
          py-4
          text-center
          text-xs
          text-white/35
        "
      >
        © {new Date().getFullYear()} {company.name}
        {company.copyright}
      </div>
    </footer>
  );
}
