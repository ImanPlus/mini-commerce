"use server"

import { productSchema } from "@/lib/schemas/product-schema";
import { Product } from "@/lib/products-api";
import { revalidatePath, updateTag } from "next/cache";
import { db } from "@/src/prisma/db";

type CreateProductData = Omit<Product, "id">
type UpdateProductData = Omit<Product, "id">

export async function createProduct(data: CreateProductData) {
  const validatedData = productSchema.parse(data);

  await db.orm.public.Product
    .create({
      title: validatedData.title,
      description: validatedData.description,
      price: validatedData.price,
      category: validatedData.category
    });

  updateTag("products")
  updateTag("categories");

  // const response = await fetch("https://dummyjson.com/products/add", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(validatedData)
  // });

  // if (!response.ok) {
  //   throw new Error("Failed to create product")
  // }

  // await response.json();

  revalidatePath("/products");
  revalidatePath("/admin/products")
  // redirect('/admin/products')
}

export async function updateProduct(id: string, data: UpdateProductData) {
  const validatedData = productSchema.parse(data);

  await db.orm.public.Product
    .where({ id: Number(id) })
    .update({
      title: validatedData.title,
      description: validatedData.description,
      price: validatedData.price,
      category: validatedData.category,
    });

  updateTag("products");
  updateTag(`product-${id}`);
  updateTag("categories");

  // const response = await fetch(`https://dummyjson.com/products/${id}`, {
  //   method: "PUT",
  //   headers: {
  //     "Content-Type": "application/json"
  //   },
  //   body: JSON.stringify(validatedData)
  // });

  // if (!response.ok) {
  //   throw new Error("Failed to update product")
  // }

  // await response.json();

  revalidatePath("/products")
  revalidatePath("/admin/products")
  revalidatePath(`/admin/products/${id}`)

  // redirect("/admin/products")
}

export async function deleteProduct(id: string) {
  await db.orm.public.Product
    .where({ id: Number(id) })
    .delete();

  updateTag("products")
  updateTag(`product-${id}`);
  updateTag("categories");

  // const response = await fetch(`https://dummyjson.com/products/${id}`, {
  //   method: "DELETE"
  // })

  // if (!response.ok) {
  //   throw new Error("Failed to delete product")
  // }

  // await response.json();

  revalidatePath("/products")
  revalidatePath("/admin/products")
  // redirect("/admin/products")
}

