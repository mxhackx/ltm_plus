"use client"
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { Button } from "./ui/button";
function handleClick(){

}
interface Catalog {
    img: string | StaticImport,
    price: number,
    description: string,
    barprice: number,
    index: number,
    devise?: string,
    width?: number,
    onOrder: FunctionConstructor,
};
export default function CatalogCard({img, price, description, barprice, onOrder, index, devise = "FCFA", width = 180} : Catalog) {
    return (
    <div className="rounded-2xl p-6 flex flex-col bg-(--orange) border-2">
        <Image src={img} alt={description} width={width} className="bg-white rounded-2xl mb-10"/>
        <p className="mb-4">{description}</p>
        <div className="flex justify-between mb-4">
            <span className="line-through text-[#4bcece]">
                {`${barprice} ${devise}`}
            </span>
            <span>
                {`${price} ${devise}`}
            </span>
        </div>
        <Button onClick={handleClick}>Commander</Button>
    </div>);
}
