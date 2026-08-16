import { redirect } from "next/navigation";

import { getCurrentAdmin } from "@/lib/actions/admin/auth";
import "@/app/globals.css"
export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect("/admin/login");
  }

  return (
    <body>
    <div className="min-h-screen bg-neutral-100 text-neutral-900 dark:bg-[#090909] dark:text-white">
      {children}
    </div>
    </body>
  );
}