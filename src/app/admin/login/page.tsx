"use client";

import { FormEvent, useState } from "react";
import { LockKeyhole, Mail } from "lucide-react";

import { loginAdmin } from "@/lib/actions/admin/auth";
import "@/app/globals.css"

export default function AdminLoginPage() {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      await loginAdmin(
        email,
        password
      );

      window.location.href =
        "/admin";
    } catch (error) {
      console.error(
        "ADMIN_LOGIN_ERROR:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Impossible de se connecter."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <body>
    <main
      className="
        flex
        min-h-screen
        items-center
        justify-center
        bg-white
        px-5
        text-neutral-900
        dark:bg-[#090909]
        dark:text-white
      "
    >
      <div
        className="
          w-full
          max-w-md
          rounded-3xl
          border
          border-neutral-200
          bg-neutral-50
          p-6
          shadow-sm
          dark:border-white/10
          dark:bg-white/[0.03]
          sm:p-8
        "
      >
        <div className="text-center">
          <div
            className="
              mx-auto
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
            <LockKeyhole size={25} />
          </div>

          <h1
            className="
              mt-5
              text-2xl
              font-bold
            "
          >
            Administration
          </h1>

          <p
            className="
              mt-2
              text-sm
              text-neutral-500
              dark:text-neutral-400
            "
          >
            Connectez-vous à votre
            espace administrateur.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="
            mt-8
            space-y-4
          "
        >
          <div>
            <label
              htmlFor="email"
              className="
                mb-2
                block
                text-xs
                font-semibold
              "
            >
              Email
            </label>

            <div className="relative">
              <Mail
                size={16}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-neutral-400
                "
              />

              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) =>
                  setEmail(
                    event.target.value
                  )
                }
                className="
                  w-full
                  rounded-xl
                  border
                  border-neutral-200
                  bg-white
                  py-3
                  pl-11
                  pr-4
                  text-sm
                  outline-none
                  transition
                  focus:border-(--orange)
                  dark:border-white/10
                  dark:bg-white/[0.03]
                "
                placeholder="admin@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="
                mb-2
                block
                text-xs
                font-semibold
              "
            >
              Mot de passe
            </label>

            <div className="relative">
              <LockKeyhole
                size={16}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-neutral-400
                "
              />

              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) =>
                  setPassword(
                    event.target.value
                  )
                }
                className="
                  w-full
                  rounded-xl
                  border
                  border-neutral-200
                  bg-white
                  py-3
                  pl-11
                  pr-4
                  text-sm
                  outline-none
                  transition
                  focus:border-(--orange)
                  dark:border-white/10
                  dark:bg-white/[0.03]
                "
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {error && (
            <div
              className="
                rounded-xl
                border
                border-red-200
                bg-red-50
                px-4
                py-3
                text-xs
                text-red-600
                dark:border-red-500/20
                dark:bg-red-500/5
                dark:text-red-400
              "
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              rounded-xl
              bg-(--orange)
              px-4
              py-3
              text-sm
              font-semibold
              text-white
              transition
              hover:brightness-110
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {loading
              ? "Connexion..."
              : "Se connecter"}
          </button>
        </form>
      </div>
    </main>
    </body>
  );
}