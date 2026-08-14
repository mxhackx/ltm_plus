"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import "@/app/globals.css"
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const admin =
      localStorage.getItem("admin") === "true";

    setIsAdmin(admin);
    setLoading(false);

    if (!admin && pathname !== "/admin/login") {
      router.replace("/admin/login");
    }
  }, [pathname, router]);

  if (loading) {
    return (
        <body>
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-neutral-500">
          Chargement...
        </p>
      </div>
      </body>
    );
  }
  if (pathname === "/admin/login") {
    return <body>{children}</body>;
  }
  if (!isAdmin) {
    return null;
  }

  return (
    <body>
    <div className="min-h-screen bg-neutral-100 dark:bg-[#090909]">
      {children}
    </div>
    </body>
  );
}