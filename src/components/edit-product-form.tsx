"use client";

import {
  ImageIcon,
  Save,
  Tag,
  Ruler,
  Euro,
  FileText,
  Package,
  Upload,
  X,
} from "lucide-react";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { updateProduct } from "@/lib/actions/admin/products";

type Product = {
  id: number;
  name: string;
  price: number;
  wasPrice: number | null;
  dimensions: string;
  category: string;
  description: string;
  imageUrl: string | null;
};

export default function EditProductForm({
  product,
}: {
  product: Product;
}) {
  const [name, setName] = useState(product.name);

  const [price, setPrice] = useState(
    String(product.price)
  );

  const [wasPrice, setWasPrice] = useState(
    product.wasPrice
      ? String(product.wasPrice)
      : ""
  );

  const [dimensions, setDimensions] = useState(
    product.dimensions
  );

  const [category, setCategory] = useState(
    product.category
  );

  const [description, setDescription] =
    useState(product.description);

  const [imageUrl, setImageUrl] = useState(
    product.imageUrl || ""
  );

  const [selectedImage, setSelectedImage] =
    useState<File | null>(null);

  const [previewUrl, setPreviewUrl] = useState(
    product.imageUrl || ""
  );

  const [loading, setLoading] = useState(false);

  const fileInputRef =
    useRef<HTMLInputElement>(null);

  // ============================================================
  // IMAGE PREVIEW
  // ============================================================

  useEffect(() => {
    if (!selectedImage) {
      return;
    }

    const objectUrl =
      URL.createObjectURL(selectedImage);

    setPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [selectedImage]);

  // ============================================================
  // SELECT IMAGE
  // ============================================================

  function handleImageChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    // Vérification type
    if (!file.type.startsWith("image/")) {
      alert("Veuillez sélectionner une image.");
      return;
    }

    // 5 MB maximum
    if (file.size > 5 * 1024 * 1024) {
      alert(
        "L'image ne doit pas dépasser 5 Mo."
      );
      return;
    }

    setSelectedImage(file);
  }

  // ============================================================
  // REMOVE SELECTED IMAGE
  // ============================================================

  function removeSelectedImage() {
    setSelectedImage(null);

    setPreviewUrl(imageUrl);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  // ============================================================
  // SUBMIT
  // ============================================================

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("price", price);
      formData.append("wasPrice", wasPrice);
      formData.append("dimensions", dimensions);
      formData.append("category", category);
      formData.append("description", description);

      if (selectedImage) {
        formData.append(
          "image",
          selectedImage
        );
      }

      const result = await updateProduct(
        product.id,
        formData
      );

      if (!result.success) {
        throw new Error(result.message);
      }

      if (result.imageUrl) {
        setImageUrl(result.imageUrl);
        setPreviewUrl(result.imageUrl);
      }

      setSelectedImage(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      alert("Produit mis à jour.");
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Une erreur est survenue."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="
        rounded-3xl
        border
        border-neutral-200
        bg-neutral-50
        p-5
        dark:border-white/10
        dark:bg-white/[0.03]
        sm:p-6
      "
    >
      {/* ==================================================
          TITLE
      ================================================== */}

      <div
        className="
          flex
          items-center
          gap-3
          border-b
          border-neutral-200
          pb-5
          dark:border-white/10
        "
      >
        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            bg-(--orange)/10
            text-(--orange)
          "
        >
          <Package size={18} />
        </div>

        <div>
          <h2 className="text-sm font-bold">
            Informations du produit
          </h2>

          <p
            className="
              mt-1
              text-xs
              text-neutral-400
            "
          >
            Modifiez les informations du produit.
          </p>
        </div>
      </div>

      {/* ==================================================
          NAME
      ================================================== */}

      <div className="mt-5">
        <Label
          icon={<Package size={14} />}
          text="Nom du produit"
        />

        <input
          value={name}
          onChange={(event) =>
            setName(event.target.value)
          }
          required
          className={inputClass}
          placeholder="Nom du produit"
        />
      </div>

      {/* ==================================================
          PRICE
      ================================================== */}

      <div
        className="
          mt-5
          grid
          gap-4
          sm:grid-cols-2
        "
      >
        <div>
          <Label
            icon={<Euro size={14} />}
            text="Prix actuel"
          />

          <input
            type="number"
            min="0"
            value={price}
            onChange={(event) =>
              setPrice(event.target.value)
            }
            required
            className={inputClass}
            placeholder="50000"
          />
        </div>

        <div>
          <Label
            icon={<Euro size={14} />}
            text="Ancien prix"
          />

          <input
            type="number"
            min="0"
            value={wasPrice}
            onChange={(event) =>
              setWasPrice(event.target.value)
            }
            className={inputClass}
            placeholder="60000"
          />
        </div>
      </div>

      {/* ==================================================
          CATEGORY + DIMENSIONS
      ================================================== */}

      <div
        className="
          mt-5
          grid
          gap-4
          sm:grid-cols-2
        "
      >
        <div>
          <Label
            icon={<Tag size={14} />}
            text="Catégorie"
          />

          <input
            value={category}
            onChange={(event) =>
              setCategory(event.target.value)
            }
            required
            className={inputClass}
            placeholder="Électricité"
          />
        </div>

        <div>
          <Label
            icon={<Ruler size={14} />}
            text="Dimensions"
          />

          <input
            value={dimensions}
            onChange={(event) =>
              setDimensions(event.target.value)
            }
            required
            className={inputClass}
            placeholder="100 × 50 × 30 cm"
          />
        </div>
      </div>

      {/* ==================================================
          IMAGE
      ================================================== */}

      <div className="mt-5">
        <Label
          icon={<ImageIcon size={14} />}
          text="Image du produit"
        />

        {/* INPUT FILE CACHÉ */}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/avif"
          onChange={handleImageChange}
          className="hidden"
        />

        {/* PREVIEW */}

        <div
          className="
            overflow-hidden
            rounded-2xl
            border
            border-neutral-200
            bg-white
            dark:border-white/10
            dark:bg-white/[0.025]
          "
        >
          {previewUrl ? (
            <div
              className="
                relative
                aspect-video
                w-full
              "
            >
              <Image
                src={previewUrl}
                alt={name}
                fill
                className="object-contain p-5"
                sizes="(max-width: 640px) 100vw, 600px"
              />

              {/* NOUVELLE IMAGE SÉLECTIONNÉE */}

              {selectedImage && (
                <div
                  className="
                    absolute
                    left-3
                    top-3
                    rounded-full
                    bg-green-500
                    px-3
                    py-1.5
                    text-[10px]
                    font-semibold
                    text-white
                  "
                >
                  Nouvelle image
                </div>
              )}
            </div>
          ) : (
            <div
              className="
                flex
                aspect-video
                flex-col
                items-center
                justify-center
                gap-3
                text-neutral-400
              "
            >
              <ImageIcon size={40} />

              <p className="text-xs">
                Aucune image sélectionnée
              </p>
            </div>
          )}

          {/* ACTIONS IMAGE */}

          <div
            className="
              flex
              flex-wrap
              gap-2
              border-t
              border-neutral-200
              p-3
              dark:border-white/10
            "
          >
            <button
              type="button"
              onClick={() =>
                fileInputRef.current?.click()
              }
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-(--orange)
                px-4
                py-2.5
                text-xs
                font-semibold
                text-white
                transition
                hover:brightness-110
              "
            >
              <Upload size={14} />

              {previewUrl
                ? "Changer l'image"
                : "Choisir une image"}
            </button>

            {selectedImage && (
              <button
                type="button"
                onClick={removeSelectedImage}
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-neutral-200
                  bg-white
                  px-4
                  py-2.5
                  text-xs
                  font-semibold
                  text-neutral-600
                  transition
                  hover:border-red-500/30
                  hover:text-red-500
                  dark:border-white/10
                  dark:bg-white/[0.03]
                  dark:text-neutral-300
                "
              >
                <X size={14} />

                Annuler
              </button>
            )}
          </div>
        </div>

        {/* NOM FICHIER */}

        {selectedImage && (
          <p
            className="
              mt-2
              truncate
              text-[11px]
              text-neutral-400
            "
          >
            Fichier sélectionné :{" "}
            <span className="font-semibold">
              {selectedImage.name}
            </span>
          </p>
        )}

        <p
          className="
            mt-2
            text-[11px]
            leading-5
            text-neutral-400
          "
        >
          PNG, JPG, WEBP ou AVIF · 5 Mo maximum.
        </p>
      </div>

      {/* ==================================================
          DESCRIPTION
      ================================================== */}

      <div className="mt-5">
        <Label
          icon={<FileText size={14} />}
          text="Description"
        />

        <textarea
          value={description}
          onChange={(event) =>
            setDescription(event.target.value)
          }
          required
          rows={7}
          className={`${inputClass} resize-none`}
          placeholder="Description du produit..."
        />
      </div>

      {/* ==================================================
          SUBMIT
      ================================================== */}

      <div
        className="
          mt-6
          flex
          justify-end
        "
      >
        <button
          type="submit"
          disabled={loading}
          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            bg-(--orange)
            px-5
            py-3
            text-xs
            font-semibold
            text-white
            transition
            hover:brightness-110
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          <Save size={15} />

          {loading
            ? "Enregistrement..."
            : "Enregistrer les modifications"}
        </button>
      </div>
    </form>
  );
}

// ============================================================
// LABEL
// ============================================================

function Label({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <label
      className="
        mb-2
        flex
        items-center
        gap-2
        text-xs
        font-semibold
        text-neutral-500
        dark:text-neutral-400
      "
    >
      {icon}

      {text}
    </label>
  );
}

// ============================================================
// INPUT STYLE
// ============================================================

const inputClass = `
  w-full
  rounded-xl
  border
  border-neutral-200
  bg-white
  px-4
  py-3
  text-sm
  outline-none
  transition
  placeholder:text-neutral-400
  focus:border-(--orange)
  focus:ring-2
  focus:ring-(--orange)/10
  dark:border-white/10
  dark:bg-white/[0.025]
  dark:text-white
`;