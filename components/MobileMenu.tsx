"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { Button } from "@/components/ui/button";

type MobileMenuProps = {
  userName?: string | null;
  userRole?: string | null;
  variant?: "store" | "admin";
};

export default function MobileMenu({
  userName,
  userRole,
  variant = "store",
}: MobileMenuProps) {
  const isAdmin = variant === "admin";

  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon" aria-label="Open navigation menu">
            <Menu className="h-5 w-5" />
          </Button>
        }
      />

      <SheetContent side="right" className="w-72">
        <SheetHeader>
          <SheetTitle>MiniCommerce {isAdmin && "Admin"}</SheetTitle>
        </SheetHeader>

        <nav className="mt-6 flex flex-col gap-2">
          {isAdmin ? (
            <>
              <SheetClose>
                <Link
                  href="/admin"
                  className="block w-full rounded-md px-3 py-2 text-left text-sm font-medium hover:bg-muted"
                >
                  Dashboard
                </Link>
              </SheetClose>

              <SheetClose>
                <Link
                  href="/admin/products"
                  className="block w-full rounded-md px-3 py-2 text-left text-sm font-medium hover:bg-muted"
                >
                  Products
                </Link>
              </SheetClose>

              <SheetClose>
                <Link
                  href="/admin/products/new"
                  className="block w-full rounded-md px-3 py-2 text-left text-sm font-medium hover:bg-muted"
                >
                  Add Product
                </Link>
              </SheetClose>

              <div className="my-2 border-t" />

              <SheetClose>
                <Link
                  href="/"
                  className="block w-full rounded-md px-3 py-2 text-left text-sm font-medium hover:bg-muted"
                >
                  Back to Store
                </Link>
              </SheetClose>
            </>
          ) : (
            <>
              <SheetClose>
                <Link
                  href="/products"
                  className="block w-full rounded-md px-3 py-2 text-left text-sm font-medium hover:bg-muted"
                >
                  Products
                </Link>
              </SheetClose>

              <SheetClose>
                <Link
                  href="/about"
                  className="block w-full rounded-md px-3 py-2 text-left text-sm font-medium hover:bg-muted"
                >
                  About
                </Link>
              </SheetClose>

              {userName && userRole === "admin" && (
                <SheetClose>
                  <Link
                    href="/admin"
                    className="block w-full rounded-md px-3 py-2 text-left text-sm font-medium hover:bg-muted"
                  >
                    Admin
                  </Link>
                </SheetClose>
              )}

              {userName ? (
                <>
                  <div className="border-t pt-4">
                    <p className="px-3 text-sm text-muted-foreground">
                      {userName}
                    </p>
                  </div>

                  <div className="px-3 py-2">
                    <LogoutButton />
                  </div>
                </>
              ) : (
                <>
                  <SheetClose>
                    <Link
                      href="/login"
                      className="block w-full rounded-md px-3 py-2 text-left text-sm font-medium hover:bg-muted"
                    >
                      Login
                    </Link>
                  </SheetClose>

                  <SheetClose>
                    <Link
                      href="/register"
                      className="block w-full rounded-md px-3 py-2 text-left text-sm font-medium hover:bg-muted"
                    >
                      Register
                    </Link>
                  </SheetClose>
                </>
              )}
            </>
          )}
        </nav>

        {isAdmin && userName && (
          <div className="mt-4 border-t pt-4">
            <p className="px-3 text-sm text-muted-foreground">{userName}</p>

            <div className="px-3 py-2">
              <LogoutButton />
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
