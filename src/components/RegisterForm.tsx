"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Loader2,
  Lock,
  Mail,
  Phone,
  User,
  X,
} from "lucide-react";

import { registerUser } from "@/lib/actions/auth";

type UserType = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
};

type RegisterFormProps = {
  onClose: () => void;
  onRegistered: (user: UserType) => void;
  onLogin: () => void;
};

export default function RegisterForm({
  onClose,
  onRegistered,
  onLogin,
}: RegisterFormProps) {
  const router = useRouter();

  const [firstName, setFirstName] =
    useState("");

  const [lastName, setLastName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [telephone, setTelephone] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    setLoading(true);

    try {
      const result =
        await registerUser({
          firstName,
          lastName,
          email,
          telephone,
          password,
          confirmPassword,
        });

      if (!result.success) {
        setError(result.error);
        return;
      }

      onRegistered(result.user);

      onClose();

      router.refresh();

      router.push("/dashboard");
    } catch (error) {
      console.error(
        "REGISTER_CLIENT_ERROR:",
        error
      );

      setError(
        "Impossible de créer votre compte."
      );
    } finally {
      setLoading(false);
    }
  };

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
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <div
        className="
          relative
          my-8
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
        {/* GLOW */}

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

        {/* CLOSE */}

        <button
          type="button"
          onClick={onClose}
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

        {/* ICON */}

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
          <User size={24} />
        </div>

        {/* TITLE */}

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
            Créer un compte
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
            Créez votre compte pour passer
            et suivre vos commandes.
          </p>
        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="
            relative
            mt-6
            space-y-4
          "
        >
          {/* NOM */}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="register-firstName"
                className="
                  mb-1.5
                  block
                  text-xs
                  font-medium
                  text-neutral-600
                  dark:text-neutral-300
                "
              >
                Prénom
              </label>

              <input
                id="register-firstName"
                type="text"
                value={firstName}
                onChange={(event) => {
                  setFirstName(
                    event.target.value
                  );
                  setError("");
                }}
                autoComplete="given-name"
                className="
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-neutral-200
                  bg-neutral-50
                  px-3
                  text-sm
                  outline-none
                  transition
                  focus:border-(--orange)
                  focus:ring-2
                  focus:ring-(--orange)/10
                  dark:border-white/10
                  dark:bg-white/5
                  dark:text-white
                "
              />
            </div>

            <div>
              <label
                htmlFor="register-lastName"
                className="
                  mb-1.5
                  block
                  text-xs
                  font-medium
                  text-neutral-600
                  dark:text-neutral-300
                "
              >
                Nom
              </label>

              <input
                id="register-lastName"
                type="text"
                value={lastName}
                onChange={(event) => {
                  setLastName(
                    event.target.value
                  );
                  setError("");
                }}
                autoComplete="family-name"
                className="
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-neutral-200
                  bg-neutral-50
                  px-3
                  text-sm
                  outline-none
                  transition
                  focus:border-(--orange)
                  focus:ring-2
                  focus:ring-(--orange)/10
                  dark:border-white/10
                  dark:bg-white/5
                  dark:text-white
                "
              />
            </div>
          </div>

          {/* EMAIL */}

          <div>
            <label
              htmlFor="register-email"
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
                id="register-email"
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(
                    event.target.value
                  );
                  setError("");
                }}
                autoComplete="email"
                placeholder="jean@email.com"
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
                  dark:border-white/10
                  dark:bg-white/5
                  dark:text-white
                "
              />
            </div>
          </div>

          {/* TELEPHONE */}

          <div>
            <label
              htmlFor="register-phone"
              className="
                mb-1.5
                block
                text-xs
                font-medium
                text-neutral-600
                dark:text-neutral-300
              "
            >
              Téléphone
            </label>

            <div className="relative">
              <Phone
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
                id="register-phone"
                type="tel"
                value={telephone}
                onChange={(event) => {
                  setTelephone(
                    event.target.value
                  );
                  setError("");
                }}
                autoComplete="tel"
                placeholder="+229..."
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
                  dark:border-white/10
                  dark:bg-white/5
                  dark:text-white
                "
              />
            </div>
          </div>

          {/* PASSWORD */}

          <div>
            <label
              htmlFor="register-password"
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
                id="register-password"
                type="password"
                value={password}
                onChange={(event) => {
                  setPassword(
                    event.target.value
                  );
                  setError("");
                }}
                autoComplete="new-password"
                placeholder="8 caractères minimum"
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
                  dark:border-white/10
                  dark:bg-white/5
                  dark:text-white
                "
              />
            </div>
          </div>

          {/* CONFIRMATION */}

          <div>
            <label
              htmlFor="register-confirm-password"
              className="
                mb-1.5
                block
                text-xs
                font-medium
                text-neutral-600
                dark:text-neutral-300
              "
            >
              Confirmer le mot de passe
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
                id="register-confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(event) => {
                  setConfirmPassword(
                    event.target.value
                  );
                  setError("");
                }}
                autoComplete="new-password"
                placeholder="••••••••"
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
                  dark:border-white/10
                  dark:bg-white/5
                  dark:text-white
                "
              />
            </div>
          </div>

          {/* ERROR */}

          {error && (
            <p
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

          {/* SUBMIT */}

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

                Création...
              </>
            ) : (
              <>
                Créer mon compte
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* LOGIN */}

        <div
          className="
            relative
            mt-5
            border-t
            border-black/10
            pt-5
            text-center
            dark:border-white/10
          "
        >
          <p className="text-xs text-neutral-500">
            Vous avez déjà un compte ?
          </p>

          <button
            type="button"
            onClick={onLogin}
            className="
              mt-1
              text-sm
              font-semibold
              text-(--orange)
              hover:underline
            "
          >
            Se connecter
          </button>
        </div>
      </div>
    </div>
  );
}