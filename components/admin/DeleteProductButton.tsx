"use client";

import { deleteProduct } from "@/actions/product-actions";
import { useState, useTransition } from "react";

type DeleteProductButtonProps = {
  productId: number;
};

export default function DeleteProductButton({
  productId,
}: DeleteProductButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmed) return;

    setError("");

    startTransition(async () => {
      try {
        await deleteProduct(String(productId));
      } catch {
        setError("Failed to delete product. Please try again.");
      }
    });
  };

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        disabled={isPending}
        onClick={handleDelete}
        className="text-sm text-destructive underline underline-offset-4 cursor-pointer
        disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? "Deleting..." : "Delete"}
      </button>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
