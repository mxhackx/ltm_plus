import { Metadata } from "next";

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
        url: "/logo.jpg",
        width: 1200,
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
    images: ["/logo.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};
export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html>
      <head>
        <title>LTM+ Industries</title>
      </head>
      {children}
    </html>
  );
}
