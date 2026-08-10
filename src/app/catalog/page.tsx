"use client";

import { ChevronLeft, ChevronRight, Search, SlidersHorizontal } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import tube from "@/../public/tube.jpg";
import CatalogCard from "@/components/card_catalog";
import { useMemo, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";


type Product = {
  img: StaticImageData;
  name: string;
  description: string;
  category: string;
  dimension: string;
  barprice: number;
  price: number;
};

const CATEGORIES = ["Toutes catégories", "Tube IRL", "Tube ICTA", "Gaine annelée"] as const;

const CATALOG: Product[] = [
  { img: tube, name: "Tube IRL 3221", description: "Tube électrique rigide gris pour installation apparente", category: "Tube IRL", dimension: "Ø20 x 2000 mm", barprice: 2500, price: 2000 },
  { img: tube, name: "Tube IRL 3222", description: "Tube électrique rigide gris haute résistance", category: "Tube IRL", dimension: "Ø25 x 2000 mm", barprice: 2900, price: 2400 },
  { img: tube, name: "Tube ICTA 3421", description: "Tube électrique cintrable pour encastrement", category: "Tube ICTA", dimension: "Ø16 x 25 m", barprice: 1800, price: 1500 },
  { img: tube, name: "Tube ICTA 3422", description: "Tube électrique cintrable renforcé", category: "Tube ICTA", dimension: "Ø20 x 25 m", barprice: 2100, price: 1750 },
  { img: tube, name: "Gaine annelée GA16", description: "Gaine annelée souple pour câblage domestique", category: "Gaine annelée", dimension: "Ø16 x 50 m", barprice: 3200, price: 2800 },
  { img: tube, name: "Gaine annelée GA20", description: "Gaine annelée souple double isolation", category: "Gaine annelée", dimension: "Ø20 x 50 m", barprice: 3600, price: 3100 },
  { img: tube, name: "Tube IRL 3223", description: "Tube électrique rigide gris pour tableau", category: "Tube IRL", dimension: "Ø32 x 2000 mm", barprice: 3300, price: 2700 },
  { img: tube, name: "Tube ICTA 3423", description: "Tube électrique cintrable industriel", category: "Tube ICTA", dimension: "Ø25 x 25 m", barprice: 2500, price: 2100 },
  { img: tube, name: "Gaine annelée GA25", description: "Gaine annelée souple haute température", category: "Gaine annelée", dimension: "Ø25 x 25 m", barprice: 3900, price: 3400 },
  { img: tube, name: "Tube IRL 3224", description: "Tube électrique rigide gris pour extérieur", category: "Tube IRL", dimension: "Ø40 x 2000 mm", barprice: 4200, price: 3600 },
];

const HERO_SLIDES = CATALOG.slice();



export default function Catalog() {
  const [slide, setSlide] = useState(0);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>(CATEGORIES[0]);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CATALOG.filter((item) => {
      const matchesQuery =
        q === "" ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);
      const matchesCategory = category === CATEGORIES[0] || item.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [query, category]);

  const hero = HERO_SLIDES[slide];

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    setQuery(inputRef.current?.value ?? "");
  }

  return (
    <main className="flex flex-col w-full bg-[#F6F5F1] text-[#14171A] dark:bg-[#14171A] dark:text-[#F6F5F1]">
      <section className="flex flex-col gap-8 px-6 md:px-10 py-12 max-w-6xl mx-auto w-full">
        <div className="grid md:grid-cols-[1.1fr_1fr] gap-10 items-start">
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-full aspect-4/3 rounded-lg overflow-hidden border border-[#DADFE3] dark:border-[#2A2E33] bg-white dark:bg-[#1B1F23]">
              <Image src={hero.img} alt={hero.name} fill className="object-cover" priority />
              <button
                type="button"
                onClick={() => setSlide((prev) => Math.max(prev - 1, 0))}
                aria-label="Produit précédent"
                disabled={slide === 0}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/90 dark:bg-black/60 hover:scale-110 disabled:opacity-30 disabled:hover:scale-100 transition-transform"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                type="button"
                onClick={() => setSlide((prev) => Math.min(prev + 1, HERO_SLIDES.length - 1))}
                aria-label="Produit suivant"
                disabled={slide === HERO_SLIDES.length - 1}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/90 dark:bg-black/60 hover:scale-110 disabled:opacity-30 disabled:hover:scale-100 transition-transform"
              >
                <ChevronRight size={22} />
              </button>
            </div>
            <div className="flex gap-2">
              {HERO_SLIDES.map((item, id) => (
                <button
                  key={item.name}
                  type="button"
                  aria-label={`Voir ${item.name}`}
                  aria-current={slide === id}
                  onClick={() => setSlide(id)}
                  className={`h-2 rounded-full transition-all ${
                    slide === id ? "w-6 bg-[#F5C518]" : "w-2 bg-[#DADFE3] dark:bg-[#2A2E33]"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <p className="font-mono text-xs tracking-widest uppercase text-[#C97D3E]">
              Fiche technique
            </p>
            <h1 className="text-2xl md:text-3xl font-bold">{hero.name}</h1>
            <p className="text-sm text-[#4B5157] dark:text-[#A9B0B6]">{hero.description}</p>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-3 font-mono text-sm border-t border-[#DADFE3] dark:border-[#2A2E33] pt-4">
              <div>
                <dt className="text-[#7A828A]">Dimension</dt>
                <dd>{hero.dimension}</dd>
              </div>
              <div>
                <dt className="text-[#7A828A]">Catégorie</dt>
                <dd>{hero.category}</dd>
              </div>
              <div>
                <dt className="text-[#7A828A]">Prix barré</dt>
                <dd className="line-through">{hero.barprice.toLocaleString("fr-FR")} F CFA</dd>
              </div>
              <div>
                <dt className="text-[#7A828A]">Prix</dt>
                <dd className="text-[#C97D3E] font-bold">
                  {hero.price.toLocaleString("fr-FR")} F CFA
                </dd>
              </div>
            </dl>
          </div>
          <Button className="bg-white w-full p-4">Commander</Button>
          </div>
        <form onSubmit={handleSearch} className="flex flex-wrap items-center gap-3 mt-4">
          <div className="flex-1 min-w-[220px] flex items-center gap-2 border border-[#DADFE3] dark:border-[#2A2E33] rounded-md px-3 py-2 bg-white dark:bg-[#1B1F23]">
            <Search size={18} className="text-[#7A828A]" aria-hidden />
            <input
              ref={inputRef}
              type="text"
              placeholder="Rechercher un tube, une gaine…"
              aria-label="Rechercher un produit"
              className="w-full bg-transparent outline-none text-sm"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-[#14171A] text-white dark:bg-[#F5C518] dark:text-[#14171A] text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Rechercher
          </button>
          <div className="flex items-center gap-2 border border-[#DADFE3] dark:border-[#2A2E33] rounded-md px-3 py-2 bg-white dark:bg-[#1B1F23]">
            <SlidersHorizontal size={16} className="text-[#7A828A]" aria-hidden />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              aria-label="Filtrer par catégorie"
              className="bg-transparent outline-none text-sm"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </form>
      </section>

      <hr className="border-[#DADFE3] dark:border-[#2A2E33]" />

      <section className="px-6 md:px-10 py-10 max-w-6xl mx-auto w-full">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-lg font-semibold">
            {filtered.length} produit{filtered.length > 1 ? "s" : ""}
          </h2>
        </div>

        {filtered.length === 0 ? (
          <p className="text-sm text-[#7A828A] py-16 text-center">
            Aucun produit ne correspond à votre recherche. Essayez un autre mot-clé ou une autre
            catégorie.
          </p>
        ) : (
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((item) => {
              const id = CATALOG.findIndex((product) => product.name === item.name);
              return <CatalogCard key={item.name} {...item} onOrder={() => {setSlide(id)}}/>
             })}
          </div>
        )}
      </section>
    </main>
  );
}
