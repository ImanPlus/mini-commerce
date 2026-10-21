"use client";

import { useCartStore } from "@/store/cart-store";
import Link from "next/link";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const hasHydrated = useCartStore((state) => state.hasHydrated);
  const updateQuantity = useCartStore((action) => action.updateQuantity);
  const removeItem = useCartStore((action) => action.removeItem);

  const totalPrice = items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  if (!hasHydrated) {
    return (
      <main className="mx-auto w-full max-w-6xl px-6 py-10">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <p className="mt-6 text-muted-foreground">Loading cart...</p>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="mx-auto w-full max-w-6xl px-6 py-10">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <p className="mt-6 text-muted-foreground"> Your cart is empty.</p>

        <Link
          href="/products"
          className="mt-6 inline-block rounded-md bg-primary px-5 py-2.5 text-primary-foreground
        hover:opacity-90"
        >
          Browse products
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
      <h1 className="text-3xl font-bold">Shopping Cart</h1>

      <div className="mt-8 space-y-4">
        {items.map((item) => (
          <div
            key={item.productId}
            className="flex items-center justify-between gap-4 rounded-lg border p-4"
          >
            <div>
              <h2 className="font-semibold">{item.title}</h2>

              <p className="mt-1 text-sm text-muted-foreground">
                ${item.price.toFixed(2)} each
              </p>

              {/* <p className="mt-1 text-sm">Quantity: {item.quantity}</p>

              <p className="font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </p> */}

              <div className="mt-3 flex items-center gap-3">
                <span className="text-sm">Quantity:</span>

                <button
                  type="button"
                  onClick={() => {
                    updateQuantity(item.productId, item.quantity - 1);
                  }}
                  className="flex h-8 w-8 items-center justify-center rounded-md border hover:bg-muted"
                  aria-label={`Decrease quantity of ${item.title}`}
                >
                  -
                </button>

                <span className="min-w-5">{item.quantity}</span>

                <button
                  type="button"
                  onClick={() => {
                    updateQuantity(item.productId, item.quantity + 1);
                  }}
                  className="flex h-8 w-8 items-center justify-center rounded-md border hover:bg-muted"
                  aria-label={`Increase quantity of ${item.title}`}
                >
                  +
                </button>
              </div>

              <p className="font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </p>

              <button
                type="button"
                onClick={() => {
                  removeItem(item.productId);
                }}
                className="mt-2 text-sm hover:underline cursor-pointer"
                style={{ color: "red" }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t pt-6">
        <p className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</p>

        <Link
          href="/products"
          className="mt-4 inline-block rounded-md border px-5 py-2.5 hover:bg-muted"
        >
          Continue shopping
        </Link>
      </div>
    </main>
  );
}
