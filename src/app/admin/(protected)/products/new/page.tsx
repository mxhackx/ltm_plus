"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ImagePlus,
  Loader2,
  Plus,
  Trash2,
} from "lucide-react";
import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
} from "react";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

export default function NewProductPage() {
  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  // ======================================================
  // IMAGE
  // ======================================================

  function handleImageChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    setError("");
    setSuccess("");

    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    // Type
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setError(
        "Format non autorisé. Utilisez une image JPG, PNG ou WEBP."
      );

      event.target.value = "";
      return;
    }

    // Taille
    if (file.size > MAX_IMAGE_SIZE) {
      setError("L'image ne doit pas dépasser 5 Mo.");

      event.target.value = "";
      return;
    }

    // Nettoyage de l'ancien preview
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    const objectUrl = URL.createObjectURL(file);

    setImage(file);
    setPreview(objectUrl);
  }

  function removeImage() {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setImage(null);
    setPreview("");
  }

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  // ======================================================
  // SUBMIT
  // ======================================================

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    if (!image) {
      setError("Veuillez sélectionner une image.");
      setLoading(false);
      return;
    }

    const form = new FormData(event.currentTarget);

    // L'image est ajoutée directement au FormData
    form.set("image", image);

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        body: form,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error ||
            "Impossible de créer le produit."
        );
      }

      setSuccess("Produit créé avec succès !");

      // Reset formulaire
      event.currentTarget.reset();

      // Reset image
      if (preview) {
        URL.revokeObjectURL(preview);
      }

      setImage(null);
      setPreview("");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Une erreur est survenue."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-4xl">

        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="mb-8 flex items-center gap-4">
          <Link
            href="/admin/products"
            className="flex h-10 w-10 items-center justify-center rounded-lg border bg-white text-gray-600 transition hover:bg-gray-100"
          >
            <ArrowLeft size={20} />
          </Link>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Ajouter un produit
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Ajoutez un nouveau produit au catalogue LTM+.
            </p>
          </div>
        </div>

        {/* ==================================================
            SUCCESS
        ================================================== */}

        {success && (
          <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
            ✓ {success}
          </div>
        )}

        {/* ==================================================
            ERROR
        ================================================== */}

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        {/* ==================================================
            FORM
        ================================================== */}

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* ==================================================
              INFORMATIONS
          ================================================== */}

          <section className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-lg font-semibold text-gray-900">
              Informations générales
            </h2>

            <div className="space-y-5">

              {/* NOM */}

              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Nom du produit *
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  disabled={loading}
                  placeholder="Tube électrique orange"
                  className="w-full rounded-lg border px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100 disabled:bg-gray-100"
                />
              </div>

              {/* CATEGORIE */}

              <div>
                <label
                  htmlFor="category"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Catégorie *
                </label>

                <input
                  id="category"
                  name="category"
                  type="text"
                  required
                  disabled={loading}
                  placeholder="Tubes électriques"
                  className="w-full rounded-lg border px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100 disabled:bg-gray-100"
                />
              </div>

              {/* DIMENSIONS */}

              <div>
                <label
                  htmlFor="dimensions"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Dimensions *
                </label>

                <input
                  id="dimensions"
                  name="dimensions"
                  type="text"
                  required
                  disabled={loading}
                  placeholder="20mm × 50m"
                  className="w-full rounded-lg border px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100 disabled:bg-gray-100"
                />
              </div>

              {/* DESCRIPTION */}

              <div>
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Description *
                </label>

                <textarea
                  id="description"
                  name="description"
                  required
                  disabled={loading}
                  rows={6}
                  placeholder="Description détaillée du produit..."
                  className="w-full resize-none rounded-lg border px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100 disabled:bg-gray-100"
                />
              </div>
            </div>
          </section>

          {/* ==================================================
              PRIX
          ================================================== */}

          <section className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-lg font-semibold text-gray-900">
              Tarification
            </h2>

            <div className="grid gap-5 md:grid-cols-2">

              {/* PRIX */}

              <div>
                <label
                  htmlFor="price"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Prix actuel *
                </label>

                <div className="relative">
                  <input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    step="1"
                    required
                    disabled={loading}
                    placeholder="5000"
                    className="w-full rounded-lg border px-4 py-3 pr-16 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100 disabled:bg-gray-100"
                  />

                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                    FCFA
                  </span>
                </div>
              </div>

              {/* ANCIEN PRIX */}

              <div>
                <label
                  htmlFor="wasPrice"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Ancien prix
                </label>

                <div className="relative">
                  <input
                    id="wasPrice"
                    name="wasPrice"
                    type="number"
                    min="0"
                    step="1"
                    disabled={loading}
                    placeholder="6000"
                    className="w-full rounded-lg border px-4 py-3 pr-16 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100 disabled:bg-gray-100"
                  />

                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                    FCFA
                  </span>
                </div>

                <p className="mt-1 text-xs text-gray-500">
                  Laissez vide si le produit n'est pas en promotion.
                </p>
              </div>
            </div>
          </section>

          {/* ==================================================
              IMAGE
          ================================================== */}

          <section className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="mb-2 text-lg font-semibold text-gray-900">
              Image du produit
            </h2>

            <p className="mb-6 text-sm text-gray-500">
              Sélectionnez une image depuis votre ordinateur.
            </p>

            {!preview ? (
              <label
                htmlFor="image"
                className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-10 text-center transition hover:border-orange-400 hover:bg-orange-50"
              >
                <ImagePlus
                  size={42}
                  className="mb-4 text-gray-400"
                />

                <p className="text-sm font-medium text-gray-700">
                  Choisir une image
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  JPG, PNG ou WEBP — maximum 5 Mo
                </p>

                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageChange}
                  disabled={loading}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="overflow-hidden rounded-xl border bg-gray-50">

                <div className="relative aspect-video w-full">
                  <Image
                    src={preview}
                    alt="Aperçu du produit"
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </div>

                <div className="flex items-center justify-between border-t bg-white p-4">

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-gray-800">
                      {image?.name}
                    </p>

                    <p className="text-xs text-gray-500">
                      {image
                        ? `${(
                            image.size /
                            1024 /
                            1024
                          ).toFixed(2)} Mo`
                        : ""}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={removeImage}
                    disabled={loading}
                    className="ml-4 flex shrink-0 items-center gap-2 rounded-lg border px-3 py-2 text-sm text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                  >
                    <Trash2 size={16} />
                    Changer
                  </button>

                  <input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleImageChange}
                    disabled={loading}
                    className="hidden"
                  />
                </div>
              </div>
            )}
          </section>

          {/* ==================================================
              ACTIONS
          ================================================== */}

          <div className="flex justify-end gap-3">

            <Link
              href="/admin/products"
              className="rounded-lg border bg-white px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
            >
              Annuler
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                  Création...
                </>
              ) : (
                <>
                  <Plus size={18} />
                  Créer le produit
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}