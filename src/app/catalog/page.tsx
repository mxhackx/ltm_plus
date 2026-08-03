"use client"
import { ChevronLeft, ChevronRight, ChevronRightCircle, Search } from "lucide-react";
import Image from "next/image";
import tube from "@/../public/tube.jpg";
import CatalogCard from "@/components/card_catalog";
import { useState } from "react";
export default function Catalog(){
    const [caroussel, setCaroussel] = useState(0);
    const caroussel_length = 3;

    const catalog = [
        {
            img: tube,
            description: "Texte de description",
            barprice: 2000,
            price: 3000,
        },
        {
            img: tube,
            description: "Texte de description",
            barprice: 2000,
            price: 3000,
        },
        {
            img: tube,
            description: "Texte de description",
            barprice: 2000,
            price: 3000,
        },
        {
            img: tube,
            description: "Texte de description",
            barprice: 2000,
            price: 3000,
        },
        {
            img: tube,
            description: "Texte de description",
            barprice: 2000,
            price: 3000,
        },
        {
            img: tube,
            description: "Texte de description",
            barprice: 2000,
            price: 3000,
        },
        {
            img: tube,
            description: "Texte de description",
            barprice: 2000,
            price: 3000,
        },
        {
            img: tube,
            description: "Texte de description",
            barprice: 2000,
            price: 3000,
        },
        {
            img: tube,
            description: "Texte de description",
            barprice: 2000,
            price: 3000,
        },
        {
            img: tube,
            description: "Texte de description",
            barprice: 2000,
            price: 3000,
        },
    ];

  return (
    <main className="flex flex-col w-full">
        <section className="flex flex-col my-10 justify-between px-10 items-center w-[95%]">
            <div className="flex justify-between items-center w-[80%] gap-4">
                <div className="flex flex-col">
                    <div className="flex items-center">
                        <ChevronLeft onClick={() => {setCaroussel((prev) => Math.max((prev - 1), 0))}} size={30} className="hover:cursor-pointer hover:bg-red-200 hover:rounded-full hover:scale-110 transition-all ease-in duration-150 hover:p-1"></ChevronLeft>
                        <Image src={tube} alt="Tube"/>
                        <ChevronRight onClick={() => {setCaroussel((prev) => Math.min((prev + 1), caroussel_length - 1))}} size={30} className="hover:cursor-pointer hover:bg-red-200 hover:rounded-full hover:scale-110 transition-all ease-in duration-150 hover:p-1"></ChevronRight>
                    </div>
                    <div className="flex gap-4 justify-center">
                        {Array.from({length: caroussel_length}).map((el, id) => <span key={`${id}_carroussel`} className={`p-2  ${caroussel == id ? "bg-amber-600": "dark:bg-white bg-black"} rounded-full`}></span>)}
                    </div>
                </div>
                <div className="flex flex-col gap-10">
                    <p>World</p>
                    <table className="h-40">
                        <thead>
                            <tr>
                                <th className="p-2" colSpan={4}>Fiche descriptive de tube electrique</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="">
                                <th className="">Name</th>
                                <th className="">Description</th>
                                <th className="">Price</th>
                                <th className="">Dimension</th>
                            </tr>
                            <tr className="">
                                <td className="">Name</td>
                                <td className="">Descrption</td>
                                <td className="">Price</td>
                                <td className="">Dimension</td>
                            </tr>
                        </tbody>
                    </table>
                    <p>Hello</p>
                </div>
            </div>
            <div className="flex justify-center items-center gap-4 w-[50%] mt-10">
                <input type="text" className="w-full p-2 rounded-md border-2 border-black dark:border-white" placeholder="Search"/>
                <button className="p-2 rounded-md bg-black dark:bg-white text-white dark:text-black hover:scale-110 transition-all ease-in duration-150"><Search size={20}></Search></button>
                <select className="p-2 rounded-md border-2 border-black dark:border-white">
                    <option>Category 1</option>
                    <option>Category 2</option>
                    <option>Category 3</option>
                </select>
                <select className="p-2 rounded-md border-2 border-black dark:border-white">
                    <option>Category 1</option>
                    <option>Category 2</option>
                    <option>Category 3</option>
                </select>
            </div>
        </section>
        <hr className="border-1 border-black dark:border-white"/>
        <section className="my-4">
            <div>
            </div>
            <div className="flex gap-10 p-10 flex-wrap w-full">
                {catalog.map((item, index) => <CatalogCard {...item} key={`${index}_${item.description}`}></CatalogCard>)}
            </div>
        </section>
    </main>
  );
}