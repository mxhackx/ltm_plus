"use client"
import Link from "next/link";
import Image from "next/image";
import logo from  "@/../public/logo.png";
import worker from "@/../public/worker.jpeg";
import { Moon, Phone, ShoppingCart, Sun } from "lucide-react";
import "@/app/globals.css";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import Header, {getDarkLocaltorage, handleDark, handleDarkClick} from "@/components/header";
import MyCard from "@/components/card";
import tube from "@/../public/tube.jpg";
import Footer from "@/components/footer";
import Circle from "@/components/circle";
export default function Home() {
  const links = [
    {name: "Accueil", href: "/"},
    {name: "Catalogue", href: "/catalog"},
    {name: "Contactez nous", href: "/contact"},
  ];
  const hero = "Exigez plus. Choisissez LTM+";
  const sub_hero = "Des tubes électriques de qualité, conçus pour protéger vos installations et répondre aux exigences des professionnels comme des particuliers.";
  const cta = ["Achetez maintenant", "Catalogue"];
  const [dark, setDark] = useState(true);

  useEffect(() => {
      const isDark = getDarkLocaltorage();
  
      if (isDark !== undefined)
        setDark((prev) => handleDark(isDark));
  }, []);
  const head = true;
  useEffect(() => localStorage.setItem("dark", dark ? "true" : "false"), [dark]);
  return (
    <div className="transition-all ease-in">
      {head ? <header className="">
        {!head && <div className="dark:bg-red-400 bg-[#ff9b44] rounded-full w-[50%] h-[50%] blur-[700px] my-[-250px] fixed ml-[50%]"></div>}
        <nav className="flex flex-row justify-between items-center mx-20 py-5">
          <div className="relative">
            <Link href="/" className="cursor-pointer relative">
              <Image className="absolute" src={logo} alt="LTM+ logo" width={60}></Image>
              <div className="bg-(--orange) p-7 rounded-full blur-xl"></div>
            </Link>
          </div>
          <div className="flex w-1/2 justify-between">
          <div className="flex gap-10">
            {links.map(({name, href}, index) => <Link key={`${index}${name}`} href={href} className="hover:text-(--orange) hover:underline hover:transition-all hover:ease-in">{name}</Link>)}
          </div>
          <div className="flex gap-10">
            <button onClick={() => handleDarkClick(setDark)}>{dark ? <Sun size={22}/> : <Moon size={22}/>}</button>
            <Phone></Phone>
            <ShoppingCart></ShoppingCart>
          </div>
          </div>
        </nav>
      </header> : <Header></Header>}
      <section className="flex flex-col w-[95%] mx-auto">
        <div className="flex flex-row w-full items-center">
        <section className="w-1/2 flex flex-col gap-y-10">
          <h1 className="text-5xl">
            {
              hero.split(" ").map((text, index) => {
                const key = index.toString() + text.toLowerCase();

                if (index % 4 == 0)
                  return <span key={key} className="text-black-400 dark:text-white">{text + " "}</span>;
                else if ((index % 4) == 1)
                  return <span key={key} className="text-(--orange)">{text}<br/></span>
                else if (index % 4 == 2)
                  return <span key={key} className="text-black-400 dark:text-white">{text + " "}</span>;
                else if ((index % 4) == 3)
                  return <strong key={key} className="text-(--orange)">{text}</strong>;
              }
            )
            }
          </h1>
          <p className="text-lg">{sub_hero}</p>
          <div className="flex gap-x-10">
          {
            cta.map((txt, index) => {
              const key = `${index}${txt.toLowerCase()}`;
              return <Link href="/about" key={key}>{(index % 2 == 0) ? <Button className="text-white border-0 bg-(--orange) myshadow">{txt}</Button> : <Button key={key} className="text-(--orange) bg-transparent border-(--orange) border-2"><ShoppingCart></ShoppingCart>{txt}</Button>}</Link>;
            })
          }
          </div>
        </section>
        <section className="w-1/2 flex-1">
        <div className="relative">
          <Image src={worker} alt="LTM+" className="rounded-2xl" width={1000}></Image>
          
        </div>
        </section>
        </div>
        {<div className="flex gap-10 mt-[-40px]">
            <MyCard img={tube} name="Tube" price={2000} barprice={3000} alt="Tube electrique" devise="F"></MyCard>
            <MyCard img={tube} name="Tube" price={2000} barprice={3000} alt="Tube electrique" devise="F"></MyCard>
            <MyCard img={tube} name="Tube" price={2000} barprice={3000} alt="Tube electrique" devise="F"></MyCard>
        </div>}

      </section>
      <section className="w-full mt-20 px-10 mx-auto">
        <p className="text-xl mb-5">De la matiere au produit</p>
        <p className="text-2xl mb-10 text-(--orange)">{`Notre processus de fabrication`.toUpperCase()}</p>
        <br/>
        <div className="flex gap-10 w-full justify-around">
          <Circle width="w-1/3"></Circle>
          <Circle width="w-1/3"></Circle>
          <Circle width="w-1/3"></Circle>
        </div>
        <br/>
        <div className="flex gap-10">
          <div className="w-1/3">
            <p className="text-2xl mb-5">01 - Index</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, eum sed. Sapiente similique voluptatem quod doloribus asperiores eius rerum nesciunt dolore quaerat earum. Sed, porro similique libero cupiditate eum accusamus.</p>
          </div>
          <div className="w-1/3">
            <p className="text-2xl mb-5">02 - Index</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, eum sed. Sapiente similique voluptatem quod doloribus asperiores eius rerum nesciunt dolore quaerat earum. Sed, porro similique libero cupiditate eum accusamus.</p>
          </div>
          <div className="w-1/3">
            <p className="text-2xl mb-5">03 - Index</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, eum sed. Sapiente similique voluptatem quod doloribus asperiores eius rerum nesciunt dolore quaerat earum. Sed, porro similique libero cupiditate eum accusamus.</p>
          </div>
        </div>
      </section>
      <Footer></Footer>
    </div>
  );
}
