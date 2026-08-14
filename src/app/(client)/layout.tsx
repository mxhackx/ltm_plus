import Header from "@/components/header";
import Footer from "@/components/footer";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "LTM+",
  description: "Enteprise de production et de vente de tubes electriques orange",
};
export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <body>
        <Header></Header>
        {children}
        <Footer></Footer>
    </body>
  );
}
