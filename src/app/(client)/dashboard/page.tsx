import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/actions/auth";
import { getCurrentUserOrders } from "@/lib/actions/account";

import DashboardClient from "@/components/DashboardClient";

export default async function AccountPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const orders = await getCurrentUserOrders();

  return (
    <DashboardClient
      user={{
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        telephone: user.telephone,
      }}
      orders={orders}
    />
  );
}