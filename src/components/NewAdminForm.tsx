"use client";

import { useActionState } from "react";
import {
  UserPlus,
  UserRound,
  Mail,
  LockKeyhole,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import { createAdmin } from "@/lib/actions/admin/admins";

type State = {
  success: boolean;
  message: string;
};

const initialState: State = {
  success: false,
  message: "",
};

export default function NewAdminForm() {
  const [state, formAction, pending] = useActionState(
    createAdmin,
    initialState
  );

  return (
    <form
      action={formAction}
      className="
        mt-10
        overflow-hidden
        rounded-3xl
        border
        border-neutral-200
        bg-neutral-50
        dark:border-white/10
        dark:bg-white/[0.03]
      "
    >
      <div className="space-y-6 p-5 sm:p-7">

        {/* MESSAGE */}

        {state.message && (
          <div
            className={`
              flex
              items-start
              gap-3
              rounded-2xl
              border
              p-4
              text-sm
              ${
                state.success
                  ? `
                    border-green-200
                    bg-green-50
                    text-green-700
                    dark:border-green-500/20
                    dark:bg-green-500/5
                    dark:text-green-400
                  `
                  : `
                    border-red-200
                    bg-red-50
                    text-red-700
                    dark:border-red-500/20
                    dark:bg-red-500/5
                    dark:text-red-400
                  `
              }
            `}
          >
            {state.success ? (
              <CheckCircle2
                size={18}
                className="mt-0.5 shrink-0"
              />
            ) : (
              <AlertCircle
                size={18}
                className="mt-0.5 shrink-0"
              />
            )}

            <p>{state.message}</p>
          </div>
        )}

        {/* PRENOM */}

        <div>
          <label
            htmlFor="firstName"
            className="
              mb-2
              block
              text-xs
              font-semibold
            "
          >
            Prénom
          </label>

          <div className="relative">
            <UserRound
              size={17}
              className="
                pointer-events-none
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-neutral-400
              "
            />

            <input
              id="firstName"
              name="firstName"
              type="text"
              required
              autoComplete="given-name"
              placeholder="Jean"
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
                placeholder:text-neutral-400
                focus:border-(--orange)
                focus:ring-2
                focus:ring-(--orange)/10
                dark:border-white/10
                dark:bg-white/[0.03]
              "
            />
          </div>
        </div>

        {/* NOM */}

        <div>
          <label
            htmlFor="lastName"
            className="
              mb-2
              block
              text-xs
              font-semibold
            "
          >
            Nom
          </label>

          <div className="relative">
            <UserRound
              size={17}
              className="
                pointer-events-none
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-neutral-400
              "
            />

            <input
              id="lastName"
              name="lastName"
              type="text"
              required
              autoComplete="family-name"
              placeholder="Dupont"
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
                placeholder:text-neutral-400
                focus:border-(--orange)
                focus:ring-2
                focus:ring-(--orange)/10
                dark:border-white/10
                dark:bg-white/[0.03]
              "
            />
          </div>
        </div>

        {/* EMAIL */}

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
            Adresse email
          </label>

          <div className="relative">
            <Mail
              size={17}
              className="
                pointer-events-none
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-neutral-400
              "
            />

            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="admin@example.com"
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
                placeholder:text-neutral-400
                focus:border-(--orange)
                focus:ring-2
                focus:ring-(--orange)/10
                dark:border-white/10
                dark:bg-white/[0.03]
              "
            />
          </div>
        </div>

        {/* MOT DE PASSE */}

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
              size={17}
              className="
                pointer-events-none
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-neutral-400
              "
            />

            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              placeholder="Minimum 8 caractères"
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
                placeholder:text-neutral-400
                focus:border-(--orange)
                focus:ring-2
                focus:ring-(--orange)/10
                dark:border-white/10
                dark:bg-white/[0.03]
              "
            />
          </div>

          <p
            className="
              mt-2
              text-xs
              text-neutral-400
            "
          >
            Le mot de passe doit contenir au
            moins 8 caractères.
          </p>
        </div>
      </div>

      {/* FOOTER */}

      <div
        className="
          flex
          flex-col-reverse
          gap-3
          border-t
          border-neutral-200
          p-5
          dark:border-white/10
          sm:flex-row
          sm:justify-end
          sm:p-7
        "
      >
        <button
          type="button"
          onClick={() => window.history.back()}
          className="
            inline-flex
            items-center
            justify-center
            rounded-xl
            border
            border-neutral-200
            px-5
            py-3
            text-xs
            font-semibold
            text-neutral-600
            transition
            hover:bg-neutral-100
            dark:border-white/10
            dark:text-neutral-300
            dark:hover:bg-white/5
          "
        >
          Annuler
        </button>

        <button
          type="submit"
          disabled={pending}
          className="
            inline-flex
            items-center
            justify-center
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
          <UserPlus size={15} />

          {pending
            ? "Création..."
            : "Créer l'administrateur"}
        </button>
      </div>
    </form>
  );
}