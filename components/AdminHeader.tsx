import { auth } from "@/auth";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import ThemeToggle from "./ThemeToggle";
import MobileMenu from "./MobileMenu";

export default async function AdminHeader() {
  const session = await auth();

  return (
    <header className="border-b bg-background">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <Link href="/admin" className="text-xl font-bold tracking-tight">
            MiniCommerce
          </Link>

          <span className="rounded-md bg-muted px-2 py-1 text-xs font-medium">
            Admin
          </span>
        </div>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/admin/products"
            className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            Products
          </Link>

          <Link
            href="/admin/products/new"
            className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            Add Product
          </Link>

          <span className="whitespace-nowrap px-2 text-sm text-muted-foreground">
            {session?.user?.name}
          </span>

          <LogoutButton />

          <ThemeToggle />
        </div>

        {/* Mobile navigation */}
        <div className="flex items-center gap-2 md:hidden">
          <MobileMenu
            variant="admin"
            userName={session?.user?.name}
            userRole={session?.user?.role}
          />

          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
