"use client";

import Image, { StaticImageData } from "next/image";
import { Button } from "./ui/button";

interface CatalogCardProps {
  img: string | StaticImageData;
  price: number;
  description: string;
  barprice?: number;
  devise?: string;
  width?: number;
  onOrder?: () => void;
}

export default function CatalogCard({
  img,
  price,
  description,
  barprice,
  devise = "FCFA",
  width = 180,
  onOrder,
}: CatalogCardProps) {
  return (
    <article className="group flex w-full max-w-sm flex-col overflow-hidden rounded-2xl border bg-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center justify-center bg-muted/30 p-6">
        <Image
          src={img}
          alt={description}
          width={width}
          height={width}
          className="h-auto max-h-52 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <h3 className="line-clamp-2 text-lg font-semibold leading-tight">
          {description}
        </h3>

        <div className="flex items-center gap-3">
          {barprice !== undefined && (
            <span className="text-sm text-muted-foreground line-through">
              {barprice.toLocaleString("fr-FR")} {devise}
            </span>
          )}

          <span className="text-xl font-bold">
            {price.toLocaleString("fr-FR")} {devise}
          </span>
        </div>

        <Button
          type="button"
          onClick={onOrder}
          className="mt-auto w-full"
        >
          Commander
        </Button>
      </div>
    </article>
  );
}
