import Image from "next/image";

export default function MyCard({name, img, alt, price, barprice, devise = "F"} : {name:string, img: any, alt: string, price:number, barprice: number, devise: string}){
    return (
    <div className="flex flex-col-reverse relative items-center">
        <div className="flex flex-col">
            <div className="flex flex-col p-6 rounded-xl mylinear">
                <p>{name}</p>
                <div className="flex flex-row justify-between gap-5">
                    <p>{price} {devise}</p>
                    <p className="line-through">{barprice} {devise}</p>
                </div>
            </div>
        </div>
        <Image src={img} alt={alt ?? "Image"} width={60} className="my-[-20px] z-0"></Image>
    </div>
    );
}
