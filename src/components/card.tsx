import Image, { type ImageProps } from "next/image";

type MyCardProps = {
  name: string;
  img: ImageProps["src"];
  alt?: string;
  price: number;
  barprice: number;
  devise?: string;
  indicatif?: string;
};

export default function MyCard({
  name,
  img,
  alt = "Produit",
  price,
  barprice,
  devise = "F",
  indicatif = "Prix indicatif",
}: MyCardProps) {
  return (
    <article className="group relative w-full max-w-[260px]">
      <div className="relative z-10 mx-auto -mb-8 flex h-28 w-28 items-center justify-center overflow-hidden transition duration-300 group-hover:-translate-y-1">
        <Image
          src={img}
          alt={alt}
          fill
          sizes="112px"
          className="object-contain p-3 transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-neutral-200 mylinear px-5 pb-5 pt-11 shadow-md transition duration-300 group-hover:-translate-y-1 group-hover:shadow-xl dark:border-white/10 dark:bg-neutral-900">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-(--orange) opacity-10 blur-2xl transition duration-300 group-hover:opacity-20"
        />

        <h3 className="relative truncate text-sm font-semibold text-neutral-900 dark:text-white">
          {name}
        </h3>

        <div className="relative mt-3 flex items-end justify-between gap-3">
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold text-(--orange)">
              {price.toLocaleString("fr-FR")}
            </span>

            <span className="text-xs font-medium text-neutral-500">
              {devise}
            </span>
          </div>

          <span className="text-xs text-neutral-400 line-through">
            {barprice.toLocaleString("fr-FR")} {devise}
          </span>
        </div>

        <div className="mt-4 h-px w-full bg-neutral-100 dark:bg-white/10" />

        <p className="mt-3 text-[11px] text-neutral-400">
          {indicatif}
        </p>
      </div>
    </article>
  );
}
