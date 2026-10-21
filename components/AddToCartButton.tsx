"use client";

import { useCartStore } from "@/store/cart-store";

type AddToCartButtonProps = {
  product: {
    id: number;
    title: string;
    price: number;
  };
};

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const addItem = useCartStore((action) => action.addItem);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      title: product.title,
      price: product.price,
    });
    console.log("Add product to cart:", product.id);
  };

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      className="mt-6 rounded-md bg-primary px-5 py-2.5 text-primary-foreground hover:opacity-90"
    >
      Add to cart
    </button>
  );
}
