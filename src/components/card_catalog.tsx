"use client";

import Image, { StaticImageData } from "next/image";
import { ArrowRight, ShoppingCart, Tag } from "lucide-react";
import { Button } from "./ui/button";

interface CatalogCardProps {
  img: string | StaticImageData;
  price: number;
  description: string;
  barprice?: number;
  devise?: string;
  width?: number;
  onOrder?: () => void;
  onCommand?: () => void;
  text: string;
}

export default function CatalogCard({
  img,
  price,
  description,
  barprice,
  devise = "FCFA",
  width = 180,
  onOrder,
  onCommand,
  text = "Commander",
}: CatalogCardProps) {
  const hasDiscount =
    barprice !== undefined && barprice > price;

  const discountPercentage = hasDiscount
    ? Math.round(
        ((barprice - price) / barprice) * 100
      )
    : 0;

  const handleCommand = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    onCommand?.();
  };

  return (
    <article
      onClick={onOrder}
      className="
        group
        relative
        flex
        w-full
        max-w-sm
        cursor-pointer
        flex-col
        overflow-hidden
        rounded-3xl
        border
        border-neutral-200
        bg-white
        text-neutral-900
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-(--orange)/30
        hover:shadow-xl
        hover:shadow-black/5
        dark:border-white/10
        dark:bg-[#111]
        dark:text-white
        dark:hover:border-(--orange)/30
        dark:hover:shadow-black/30
      "
    >

      {/* =====================================================
          IMAGE
      ===================================================== */}

      <div
        className="
          relative
          flex
          min-h-[240px]
          items-center
          justify-center
          overflow-hidden
          border-b
          border-neutral-100
          bg-neutral-50
          p-7
          dark:border-white/5
          dark:bg-white/[0.025]
        "
      >

        {/* GLOW */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            h-40
            w-40
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-(--orange)
            opacity-0
            blur-[70px]
            transition-opacity
            duration-500
            group-hover:opacity-10
            dark:group-hover:opacity-15
          "
        />

        {/* BADGE PROMOTION */}

        {hasDiscount && (
          <div
            className="
              absolute
              left-4
              top-4
              z-10
              flex
              items-center
              gap-1.5
              rounded-full
              bg-(--orange)
              px-2.5
              py-1
              text-[10px]
              font-bold
              uppercase
              tracking-wide
              text-black
              shadow-[0_0_20px_-7px_var(--orange)]
            "
          >
            <Tag size={11} />

            -{discountPercentage}%
          </div>
        )}

        {/* IMAGE */}

        <Image
          src={img}
          alt={description}
          width={width}
          height={width}
          sizes="(max-width: 640px) 70vw, 240px"
          className="
            relative
            z-[1]
            h-auto
            max-h-52
            w-auto
            max-w-[85%]
            object-contain
            transition-transform
            duration-500
            ease-out
            group-hover:scale-110
          "
        />

      </div>


      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div
        className="
          flex
          flex-1
          flex-col
          gap-4
          p-5
        "
      >

        {/* DESCRIPTION */}

        <div className="min-h-[48px]">

          <h3
            className="
              line-clamp-2
              text-base
              font-semibold
              leading-6
              tracking-tight
              transition-colors
              duration-200
              group-hover:text-(--orange)
              sm:text-lg
            "
          >
            {description}
          </h3>

        </div>


        {/* PRIX */}

        <div className="flex items-end justify-between gap-3">

          <div className="flex flex-col">

            {hasDiscount && (
              <span
                className="
                  text-xs
                  text-neutral-400
                  line-through
                  dark:text-neutral-500
                "
              >
                {barprice.toLocaleString("fr-FR")}{" "}
                {devise}
              </span>
            )}

            <div className="flex items-baseline gap-1.5">

              <span
                className="
                  text-xl
                  font-bold
                  tracking-tight
                  sm:text-2xl
                "
              >
                {price.toLocaleString("fr-FR")}
              </span>

              <span
                className="
                  text-xs
                  font-medium
                  text-neutral-400
                  dark:text-neutral-500
                "
              >
                {devise}
              </span>

            </div>

          </div>

          {/* PETIT INDICATEUR */}

          {hasDiscount && (
            <span
              className="
                rounded-full
                bg-green-500/10
                px-2
                py-1
                text-[10px]
                font-semibold
                text-green-600
                dark:text-green-400
              "
            >
              Économie
            </span>
          )}

        </div>


        {/* SEPARATOR */}

        <div
          className="
            h-px
            w-full
            bg-neutral-100
            dark:bg-white/10
          "
        />


        {/* BUTTON */}

        <Button
          type="button"
          onClick={handleCommand}
          className="
            group/button
            mt-auto
            h-11
            w-full
            rounded-xl
            bg-(--orange)
            font-semibold
            text-black
            shadow-[0_0_20px_-8px_var(--orange)]
            transition-all
            duration-300
            hover:brightness-110
            hover:shadow-[0_0_25px_-5px_var(--orange)]
            active:scale-[0.98]
          "
        >

          <ShoppingCart
            size={17}
            className="
              mr-2
              transition-transform
              duration-300
              group-hover/button:-translate-x-0.5
            "
          />

          {text}

          <ArrowRight
            size={16}
            className="
              ml-auto
              transition-transform
              duration-300
              group-hover/button:translate-x-1
            "
          />

        </Button>

      </div>

    </article>
  );
}