"use client";

import { createProduct, updateProduct } from "@/actions/product-actions";
import {
  type ProductFormData,
  productSchema,
} from "@/lib/schemas/product-schema";
import { Product } from "@/lib/products-api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type ProductFormProps = {
  product?: Product;
};

export default function ProductForm({ product }: ProductFormProps) {
  const [error, setError] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: product?.title ?? "",
      price: product?.price ?? 0,
      category: product?.category ?? "",
      description: product?.description ?? "",
    },
  });

  const onSubmit = async (data: ProductFormData) => {
    setError("");

    try {
      if (product) {
        await updateProduct(String(product.id), data);
        router.push("/admin/products");
        return;
      }

      await createProduct(data);
      router.push("/admin/products");
    } catch (error) {
      console.log(error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium">
          Title
        </label>

        <input
          id="title"
          {...register("title")}
          className="w-full rounded-md border px-3 py-2"
        />
        {errors.title && (
          <p className="text-sm text-destructive">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="price" className="text-sm font-medium">
          Price
        </label>

        <input
          id="price"
          type="number"
          step="0.01"
          {...register("price", {
            setValueAs: (value) => (value === "" ? undefined : Number(value)),
          })}
          className="w-full rounded-md border px-3 py-2"
        />
        {errors.price && (
          <p className="text-sm text-destructive">{errors.price.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="category" className="text-sm font-medium">
          Category
        </label>

        <input
          id="category"
          {...register("category")}
          className="w-full rounded-md border px-3 py-2"
        />
        {errors.category && (
          <p className="text-sm text-destructive">{errors.category.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium">
          Description
        </label>

        <textarea
          id="description"
          rows={5}
          {...register("description")}
          className="w-full rounded-md border px-3 py-2"
        />
        {errors.description && (
          <p className="text-sm text-destructive">
            {errors.description.message}
          </p>
        )}
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <button
        className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting
          ? product
            ? "Updating..."
            : "Creating..."
          : product
            ? "Update Product"
            : "Create Product"}
      </button>
    </form>
  );
}
