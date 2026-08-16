"use client";

import {
  Check,
  PackageCheck,
  X,
} from "lucide-react";

import { updateOrderStatus } from "@/lib/actions/admin/orders";

export default function OrderActions({
  orderId,
  status,
}: {
  orderId: number;
  status: string;
}) {
  async function handleStatusChange(
    newStatus:
      | "CONFIRMED"
      | "DELIVERED"
      | "CANCELLED"
  ) {
    if (newStatus === "CANCELLED") {
      const confirmed = window.confirm(
        "Voulez-vous vraiment annuler cette commande ?"
      );

      if (!confirmed) {
        return;
      }
    }

    if (newStatus === "CONFIRMED") {
      const confirmed = window.confirm(
        "Voulez-vous valider cette commande ?"
      );

      if (!confirmed) {
        return;
      }
    }

    if (newStatus === "DELIVERED") {
      const confirmed = window.confirm(
        "Confirmer que cette commande a été livrée ?"
      );

      if (!confirmed) {
        return;
      }
    }

    await updateOrderStatus(
      orderId,
      newStatus
    );
  }

  return (
    <div
      className="
        mt-5
        flex
        flex-wrap
        gap-2
      "
    >
      {/* ==================================================
          PENDING
      ================================================== */}

      {status === "PENDING" && (
        <>
          <button
            type="button"
            onClick={() =>
              handleStatusChange("CONFIRMED")
            }
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-green-600
              px-4
              py-2.5
              text-xs
              font-semibold
              text-white
              transition
              hover:bg-green-700
            "
          >
            <Check size={14} />
            Valider la commande
          </button>

          <button
            type="button"
            onClick={() =>
              handleStatusChange("CANCELLED")
            }
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              border
              border-red-500/20
              bg-red-500/10
              px-4
              py-2.5
              text-xs
              font-semibold
              text-red-600
              transition
              hover:bg-red-500/20
              dark:text-red-400
            "
          >
            <X size={14} />
            Annuler
          </button>
        </>
      )}

      {/* ==================================================
          CONFIRMED
      ================================================== */}

      {status === "CONFIRMED" && (
        <>
          <button
            type="button"
            onClick={() =>
              handleStatusChange("DELIVERED")
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
            <PackageCheck size={14} />
            Marquer comme livrée
          </button>

          <button
            type="button"
            onClick={() =>
              handleStatusChange("CANCELLED")
            }
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              border
              border-red-500/20
              bg-red-500/10
              px-4
              py-2.5
              text-xs
              font-semibold
              text-red-600
              transition
              hover:bg-red-500/20
              dark:text-red-400
            "
          >
            <X size={14} />
            Annuler
          </button>
        </>
      )}

      {/* ==================================================
          DELIVERED
      ================================================== */}

      {status === "DELIVERED" && (
        <div
          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            bg-green-500/10
            px-4
            py-2.5
            text-xs
            font-semibold
            text-green-600
            dark:text-green-400
          "
        >
          <PackageCheck size={14} />
          Commande livrée
        </div>
      )}

      {/* ==================================================
          CANCELLED
      ================================================== */}

      {status === "CANCELLED" && (
        <div
          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            bg-red-500/10
            px-4
            py-2.5
            text-xs
            font-semibold
            text-red-600
            dark:text-red-400
          "
        >
          <X size={14} />
          Commande annulée
        </div>
      )}
    </div>
  );
}