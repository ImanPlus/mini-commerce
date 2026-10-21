"use client";

import { useCartStore } from "@/store/cart-store";
import Link from "next/link";

export default function MiniCart() {
  const items = useCartStore((state) => state.items);
  const hasHydrated = useCartStore((state) => state.hasHydrated);

  const totalPrice = items.reduce((total, item) => {
    return total + item.quantity * item.price;
  }, 0);

  return (
    <div className="w-full rounded-lg border bg-background p-4  shadow-lg">
      <h2 className="text-lg font-semibold">Shopping Cart</h2>

      {!hasHydrated ? (
        <p className="mt-4 text-sm text-muted-foreground">Loading cart...</p>
      ) : items.length === 0 ? (
        <p className="mt-4 text-sm text-muted-foreground">
          Your cart is empty.
        </p>
      ) : (
        <>
          <div className="mt-4 max-h-64 space-y-4 overflow-y-auto">
            {items.map((item) => (
              <div key={item.productId} className="flex justify-between gap-4">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{item.title}</p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Quantity: {item.quantity}
                  </p>
                </div>

                <p className="shrink-0 text-sm font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 border-t pt-4">
            <p className="font-semibold">Total: ${totalPrice.toFixed(2)}</p>

            <Link
              href="/cart"
              className="mt-4 block rounded-md border px-4 py-2 text-center text-sm hover:bg-muted"
            >
              View Cart
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
