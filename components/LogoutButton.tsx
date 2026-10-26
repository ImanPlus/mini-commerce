"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { useCartStore } from "@/store/cart-store";

export default function LogoutButton() {
  const clearCart = useCartStore((action) => action.clearCart);

  const handleLogout = async () => {
    clearCart();

    await signOut({
      callbackUrl: "/login",
    });
  };

  return (
    <Button
      variant="outline"
      onClick={handleLogout}
      className="rounded-md bg-destructive dark:bg-destructive px-4 py-2 text-sm text-destructive-foreground"
    >
      Logout
    </Button>
  );
}
