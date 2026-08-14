"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  LockKeyhole,
  ShieldCheck,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [error, setError] = useState("");

  const [loading, setLoading] =
    useState(false);

  // ============================================================
  // VERIFIER SI DEJA CONNECTE
  // ============================================================

  useEffect(() => {
    const isAdmin =
      localStorage.getItem("admin") === "true";

    if (isAdmin) {
      router.replace("/admin");
    }
  }, [router]);

  // ============================================================
  // CONNEXION
  // ============================================================

  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    // ----------------------------------------------------------
    // VERIFICATION DES CHAMPS
    // ----------------------------------------------------------

    if (!email.trim()) {
      setError(
        "Veuillez renseigner votre adresse email."
      );

      return;
    }

    if (!password.trim()) {
      setError(
        "Veuillez renseigner votre mot de passe."
      );

      return;
    }

    setLoading(true);

    // ----------------------------------------------------------
    // AUTHENTIFICATION TEMPORAIRE
    // ----------------------------------------------------------
    //
    // Pour le moment :
    //
    // Email    : admin@example.com
    // Password : admin123
    //
    // Plus tard cette partie sera remplacée par
    // une vraie vérification avec ton backend / Prisma.
    //
    // ----------------------------------------------------------

    const ADMIN_EMAIL =
      "admin@example.com";

    const ADMIN_PASSWORD =
      "admin123";

    if (
      email.trim().toLowerCase() !==
        ADMIN_EMAIL ||
      password !== ADMIN_PASSWORD
    ) {
      setError(
        "Email ou mot de passe incorrect."
      );

      setLoading(false);

      return;
    }

    // ----------------------------------------------------------
    // ENREGISTRER L'ADMIN
    // ----------------------------------------------------------

    localStorage.setItem(
      "admin",
      "true"
    );

    // Optionnel : garder l'identité de l'admin
    localStorage.setItem(
      "admin_user",
      JSON.stringify({
        email: ADMIN_EMAIL,
      })
    );

    // ----------------------------------------------------------
    // REDIRECTION
    // ----------------------------------------------------------

    router.replace("/admin");
  }

  // ============================================================
  // RENDU
  // ============================================================

  return (
    <main
      className="
        flex
        min-h-screen
        items-center
        justify-center
        bg-neutral-100
        px-5
        py-10
        dark:bg-[#090909]
      "
    >
      <div className="w-full max-w-md">

        {/* ======================================================
            LOGO / ICON
        ====================================================== */}

        <div className="mb-8 text-center">

          <div
            className="
              mx-auto
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-2xl
              bg-(--orange)/10
              text-(--orange)
            "
          >
            <ShieldCheck size={32} />
          </div>

          <p
            className="
              mt-6
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.25em]
              text-(--orange)
            "
          >
            Administration
          </p>

          <h1
            className="
              mt-2
              text-3xl
              font-bold
              tracking-tight
              text-neutral-900
              dark:text-white
            "
          >
            Connexion
          </h1>

          <p
            className="
              mx-auto
              mt-3
              max-w-sm
              text-sm
              leading-6
              text-neutral-500
              dark:text-neutral-400
            "
          >
            Connectez-vous à votre espace
            d'administration.
          </p>

        </div>

        {/* ======================================================
            FORMULAIRE
        ====================================================== */}

        <form
          onSubmit={handleSubmit}
          className="
            overflow-hidden
            rounded-3xl
            border
            border-neutral-200
            bg-white
            p-6
            shadow-sm
            dark:border-white/10
            dark:bg-white/[0.03]
            sm:p-8
          "
        >

          {/* ====================================================
              EMAIL
          ==================================================== */}

          <div>

            <label
              htmlFor="email"
              className="
                mb-2
                block
                text-sm
                font-semibold
                text-neutral-900
                dark:text-white
              "
            >
              Adresse email
            </label>

            <div className="relative">

              <div
                className="
                  pointer-events-none
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-neutral-400
                "
              >
                <ShieldCheck size={17} />
              </div>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                placeholder="admin@example.com"
                autoComplete="email"
                disabled={loading}
                className="
                  h-12
                  w-full
                  rounded-xl
                  border
                  border-neutral-200
                  bg-neutral-50
                  pl-11
                  pr-4
                  text-sm
                  text-neutral-900
                  outline-none
                  transition
                  placeholder:text-neutral-400
                  focus:border-(--orange)
                  focus:ring-2
                  focus:ring-(--orange)/10
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                  dark:border-white/10
                  dark:bg-white/5
                  dark:text-white
                "
              />

            </div>

          </div>

          {/* ====================================================
              PASSWORD
          ==================================================== */}

          <div className="mt-5">

            <label
              htmlFor="password"
              className="
                mb-2
                block
                text-sm
                font-semibold
                text-neutral-900
                dark:text-white
              "
            >
              Mot de passe
            </label>

            <div className="relative">

              <div
                className="
                  pointer-events-none
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-neutral-400
                "
              >
                <LockKeyhole size={17} />
              </div>

              <input
                id="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                placeholder="Votre mot de passe"
                autoComplete="current-password"
                disabled={loading}
                className="
                  h-12
                  w-full
                  rounded-xl
                  border
                  border-neutral-200
                  bg-neutral-50
                  pl-11
                  pr-12
                  text-sm
                  text-neutral-900
                  outline-none
                  transition
                  placeholder:text-neutral-400
                  focus:border-(--orange)
                  focus:ring-2
                  focus:ring-(--orange)/10
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                  dark:border-white/10
                  dark:bg-white/5
                  dark:text-white
                "
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    (previous) =>
                      !previous
                  )
                }
                disabled={loading}
                aria-label={
                  showPassword
                    ? "Masquer le mot de passe"
                    : "Afficher le mot de passe"
                }
                className="
                  absolute
                  right-3
                  top-1/2
                  flex
                  h-8
                  w-8
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-lg
                  text-neutral-400
                  transition
                  hover:bg-neutral-100
                  hover:text-neutral-700
                  dark:hover:bg-white/10
                  dark:hover:text-white
                "
              >
                {showPassword ? (
                  <EyeOff size={17} />
                ) : (
                  <Eye size={17} />
                )}
              </button>

            </div>

          </div>

          {/* ====================================================
              ERREUR
          ==================================================== */}

          {error && (
            <div
              className="
                mt-5
                flex
                items-start
                gap-3
                rounded-xl
                border
                border-red-200
                bg-red-50
                p-3
                text-red-600
                dark:border-red-500/20
                dark:bg-red-500/5
                dark:text-red-400
              "
            >

              <AlertCircle
                size={17}
                className="mt-0.5 shrink-0"
              />

              <p className="text-xs leading-5">
                {error}
              </p>

            </div>
          )}

          {/* ====================================================
              SUBMIT
          ==================================================== */}

          <button
            type="submit"
            disabled={loading}
            className="
              group
              mt-6
              flex
              h-12
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-(--orange)
              text-sm
              font-semibold
              text-white
              shadow-[0_8px_25px_-10px_var(--orange)]
              transition
              hover:brightness-110
              active:scale-[0.99]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >

            {loading ? (
              <>
                <span
                  className="
                    h-4
                    w-4
                    animate-spin
                    rounded-full
                    border-2
                    border-white/30
                    border-t-white
                  "
                />

                Connexion...
              </>
            ) : (
              <>
                Se connecter

                <ArrowRight
                  size={16}
                  className="
                    transition-transform
                    group-hover:translate-x-0.5
                  "
                />
              </>
            )}

          </button>

        </form>

        {/* ======================================================
            INFORMATIONS DEV
        ====================================================== */}

        <div
          className="
            mt-5
            rounded-2xl
            border
            border-dashed
            border-neutral-300
            bg-neutral-50
            p-4
            dark:border-white/10
            dark:bg-white/[0.02]
          "
        >

          <p
            className="
              text-center
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.15em]
              text-neutral-400
            "
          >
            Mode développement
          </p>

          <div
            className="
              mt-3
              space-y-1
              text-center
              text-xs
              text-neutral-500
            "
          >
            <p>
              Email :{" "}
              <span className="font-medium">
                admin@example.com
              </span>
            </p>

            <p>
              Mot de passe :{" "}
              <span className="font-medium">
                admin123
              </span>
            </p>
          </div>

        </div>

      </div>
    </main>
  );
}