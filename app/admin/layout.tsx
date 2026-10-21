import AdminHeader from "@/components/AdminHeader";
import React, { Suspense } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense
        fallback={
          <header className="border-b bg-background px-6 py-4">
            Loading admin...
          </header>
        }
      >
        <AdminHeader />
      </Suspense>

      <main className="flex-1">{children}</main>
    </>
  );
}
