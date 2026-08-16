import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://ltm-plus.vercel.app"),

  title: {
    default: "LTM+ Industries | Tubes électriques au Bénin",
    template: "%s | LTM+ Industries",
  },

  description:
    "LTM+ Industries est spécialisée dans la production et la vente de tubes électriques orange au Bénin. Découvrez nos produits et solutions pour vos installations électriques.",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "LTM+ Industries | Tubes électriques au Bénin",
    description:
      "Découvrez les tubes électriques orange et les solutions proposées par LTM+ Industries au Bénin.",
    url: "/",
    siteName: "LTM+ Industries",
    locale: "fr_BJ",
    type: "website",
    images: [
      {
        url: "https://ltm-plus.vercel.app/logo.png",
        width: 630,
        height: 630,
        alt: "LTM+ Industries",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "LTM+ Industries | Tubes électriques au Bénin",
    description:
      "Découvrez les tubes électriques orange et les solutions proposées par LTM+ Industries au Bénin.",
    images: ["https://ltm-plus.vercel.app/logo.png"],
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "https://ltm-plus.vercel.app/logo.png",
    apple: "https://ltm-plus.vercel.app/logo.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "LTM+ Industries",
  url: "https://ltm-plus.vercel.app",
  logo: "https://ltm-plus.vercel.app/logo.png",
  description:
    "LTM+ Industries est spécialisée dans la production et la vente de tubes électriques orange au Bénin.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </head>

      <body>{children}</body>
    </html>
  );
}