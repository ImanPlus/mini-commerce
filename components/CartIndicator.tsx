"use client";

import { useCartStore } from "@/store/cart-store";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import MiniCart from "./store/MiniCart";

export default function CartIndicator() {
  const itemCount = useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0),
  );

  const hasHydrated = useCartStore((state) => state.hasHydrated);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="group relative">
      <button
        type="button"
        onClick={() => {
          setIsOpen((prevState) => !prevState);
        }}
        className="relative rounded-md p-2 transition-colors hover:bg-muted"
        aria-label={`Shopping cart, ${hasHydrated ? itemCount : 0} items`}
        aria-expanded={isOpen}
        aria-controls="mini-cart"
      >
        <ShoppingCart className="h-5 w-5" />

        {hasHydrated && itemCount > 0 && (
          <span
            style={{ backgroundColor: "red" }}
            className="absolute -right-1 -top-1 flex items-center justify-center rounded-full
          px-1 text-xs text-primary-foreground"
          >
            {itemCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          id="mini-cart"
          className="
      fixed left-1/2 top-20 z-50 w-[calc(100vw-2rem)]
      max-w-80 -translate-x-1/2
      md:absolute md:left-auto md:right-0 md:top-full
      md:w-80 md:translate-x-0 md:pt-2
    "
        >
          <MiniCart />
        </div>
      )}
    </div>
  );
}
