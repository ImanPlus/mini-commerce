import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { auth } from "@/auth";
import LogoutButton from "./LogoutButton";
import CartIndicator from "./CartIndicator";
import MobileMenu from "./MobileMenu";

export default async function Navbar() {
  const session = await auth();

  return (
    <header className="border-b bg-background">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-xl font-bold tracking-tight">
          MiniCommerce
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/products"
            className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            Products
          </Link>

          <Link
            href="/about"
            className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            About
          </Link>

          <CartIndicator />

          {session?.user ? (
            <>
              <span className="px-2 text-sm text-muted-foreground">
                {session.user.name}
              </span>

              {session.user.role === "admin" && (
                <Link
                  href="/admin"
                  className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
                >
                  Admin
                </Link>
              )}

              <LogoutButton />
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
              >
                Register
              </Link>
            </>
          )}

          <ThemeToggle />
        </div>

        {/* Mobile navigation */}
        <div className="flex items-center gap-2 md:hidden">
          <CartIndicator />

          <MobileMenu
            userName={session?.user?.name}
            userRole={session?.user?.role}
          />

          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
