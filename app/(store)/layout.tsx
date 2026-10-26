import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Suspense } from "react";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense fallback={<header className="h-16 border-b bg-background" />}>
        <Navbar />
      </Suspense>
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
