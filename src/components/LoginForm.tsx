"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  ArrowRight,
  Loader2,
  Lock,
  Mail,
  UserPlus,
  X,
} from "lucide-react";

import { loginUser } from "@/lib/actions/auth";

// ======================================================
// TYPES
// ======================================================

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
};

type LoginFormProps = {
  onClose: () => void;
  onLoggedIn: (user: User) => void;

  // Permet de passer vers RegisterForm
  onRegister: () => void;
};

// ======================================================
// COMPONENT
// ======================================================

export default function LoginForm({
  onClose,
  onLoggedIn,
  onRegister,
}: LoginFormProps) {
  const router = useRouter();

  // ====================================================
  // STATE
  // ====================================================

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  // ====================================================
  // LOGIN
  // ====================================================

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    // ==================================================
    // NORMALISATION
    // ==================================================

    const cleanEmail =
      email.trim().toLowerCase();

    // ==================================================
    // VALIDATION CLIENT
    // ==================================================

    if (!cleanEmail || !password) {
      setError(
        "Veuillez remplir tous les champs."
      );

      return;
    }

    // ==================================================
    // LOADING
    // ==================================================

    setLoading(true);

    try {
      // ==================================================
      // APPEL SERVER ACTION
      // ==================================================

      const result =
        await loginUser({
          email: cleanEmail,
          password,
        });

      // ==================================================
      // ERREUR
      // ==================================================

      if (!result.success) {
        setError(result.error);

        return;
      }

      onLoggedIn(result.user);
    } catch (error) {
      console.error(
        "LOGIN_CLIENT_ERROR:",
        error
      );

      setError(
        "Impossible de vous connecter. Veuillez réessayer."
      );
    } finally {
      setLoading(false);
    }
  };

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        overflow-y-auto
        bg-black/30
        p-4
        backdrop-blur-md
        dark:bg-black/60
      "
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      {/* =================================================
          CARD
      ================================================= */}

      <div
        className="
          relative
          w-full
          max-w-md
          overflow-hidden
          rounded-3xl
          border
          border-black/10
          bg-white
          p-6
          shadow-2xl
          dark:border-white/10
          dark:bg-[#111]
          sm:p-8
        "
      >
        {/* =================================================
            GLOW
        ================================================= */}

        <div
          className="
            pointer-events-none
            absolute
            -right-20
            -top-20
            h-48
            w-48
            rounded-full
            bg-(--orange)
            opacity-10
            blur-[80px]
          "
        />

        {/* =================================================
            CLOSE
        ================================================= */}

        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          className="
            absolute
            right-4
            top-4
            rounded-full
            p-2
            text-neutral-400
            transition
            hover:bg-black/5
            hover:text-(--orange)
            dark:hover:bg-white/10
          "
        >
          <X size={18} />
        </button>

        {/* =================================================
            ICON
        ================================================= */}

        <div
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-(--orange)/10
            text-(--orange)
          "
        >
          <Lock size={24} />
        </div>

        {/* =================================================
            TITLE
        ================================================= */}

        <div className="relative mt-5">
          <p
            className="
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.2em]
              text-(--orange)
            "
          >
            Espace client
          </p>

          <h2
            className="
              mt-1
              text-2xl
              font-bold
              tracking-tight
              text-neutral-900
              dark:text-white
            "
          >
            Connexion
          </h2>

          <p
            className="
              mt-2
              text-sm
              leading-6
              text-neutral-500
              dark:text-neutral-400
            "
          >
            Connectez-vous à votre espace
            client pour retrouver vos
            commandes.
          </p>
        </div>

        {/* =================================================
            FORM
        ================================================= */}

        <form
          onSubmit={handleSubmit}
          className="
            relative
            mt-6
            space-y-4
          "
        >
          {/* =================================================
              EMAIL
          ================================================= */}

          <div>
            <label
              htmlFor="login-email"
              className="
                mb-1.5
                block
                text-xs
                font-medium
                text-neutral-600
                dark:text-neutral-300
              "
            >
              Adresse email
            </label>

            <div className="relative">
              <Mail
                size={17}
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-neutral-400
                "
              />

              <input
                id="login-email"
                name="email"
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(
                    event.target.value
                  );

                  setError("");
                }}
                placeholder="jean@email.com"
                autoComplete="email"
                disabled={loading}
                className="
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-neutral-200
                  bg-neutral-50
                  pl-10
                  pr-3
                  text-sm
                  outline-none
                  transition
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

          {/* =================================================
              PASSWORD
          ================================================= */}

          <div>
            <label
              htmlFor="login-password"
              className="
                mb-1.5
                block
                text-xs
                font-medium
                text-neutral-600
                dark:text-neutral-300
              "
            >
              Mot de passe
            </label>

            <div className="relative">
              <Lock
                size={17}
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-neutral-400
                "
              />

              <input
                id="login-password"
                name="password"
                type="password"
                value={password}
                onChange={(event) => {
                  setPassword(
                    event.target.value
                  );

                  setError("");
                }}
                placeholder="••••••••"
                autoComplete="current-password"
                disabled={loading}
                className="
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-neutral-200
                  bg-neutral-50
                  pl-10
                  pr-3
                  text-sm
                  outline-none
                  transition
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

          {/* =================================================
              ERROR
          ================================================= */}

          {error && (
            <p
              role="alert"
              className="
                rounded-xl
                bg-red-500/10
                px-3
                py-2.5
                text-xs
                leading-5
                text-red-500
              "
            >
              {error}
            </p>
          )}

          {/* =================================================
              SUBMIT
          ================================================= */}

          <button
            type="submit"
            disabled={loading}
            className="
              flex
              h-11
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-(--orange)
              text-sm
              font-semibold
              text-black
              shadow-[0_0_25px_-8px_var(--orange)]
              transition
              hover:brightness-110
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {loading ? (
              <>
                <Loader2
                  size={17}
                  className="animate-spin"
                />

                Connexion...
              </>
            ) : (
              <>
                Se connecter

                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* =================================================
            REGISTER
        ================================================= */}

        <div
          className="
            relative
            mt-6
            border-t
            border-black/10
            pt-5
            dark:border-white/10
          "
        >
          <p
            className="
              text-center
              text-xs
              text-neutral-500
              dark:text-neutral-400
            "
          >
            Vous n'avez pas encore de compte ?
          </p>

          <button
            type="button"
            onClick={onRegister}
            disabled={loading}
            className="
              mt-3
              flex
              h-11
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-(--orange)/30
              bg-(--orange)/5
              text-sm
              font-semibold
              text-(--orange)
              transition
              hover:bg-(--orange)/10
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <UserPlus size={17} />

            Créer un compte
          </button>
        </div>
      </div>
    </div>
  );
}