import { db } from "@/src/prisma/db";
import { cacheTag } from "next/cache";

export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
}

// type ProductsResponse = {
//   products: Product[];
// }

type ProductFilters = {
  search?: string;
  category?: string;
  sort?: string;
  page?: number;
}

export async function getProducts(filters?: ProductFilters) {
  "use cache"

  cacheTag("products")

  // const products = await db.orm.public.Product.all();

  // const response = await fetch("https://dummyjson.com/products?limit=6");

  // if (!response.ok) {
  //   throw new Error("Failed to fetch products");
  // }

  // const data: ProductsResponse = await response.json();

  const search = filters?.search?.toLowerCase();
  const category = filters?.category;
  const sort = filters?.sort;
  const page = filters?.page ?? 1;
  const pageSize = 3;

  // let filteredProducts = data.products;
  // let filteredProducts = [...products];

  let query = db.orm.public.Product;

  if (search) {
    query = query.where((p) => p.title.ilike(`%${search}%`));
  }

  // if (search) {
  //   filteredProducts = filteredProducts.filter((product) =>
  //     product.title.toLowerCase().includes(search)
  //   )
  // }

  if (category) {
    query = query.where((p) => p.category.eq(category));
  }

  // if (category) {
  //   filteredProducts = filteredProducts.filter((product) =>
  //     product.category === category
  //   )
  // }

  if (sort === "price-asc") {
    query = query.orderBy((p) => p.price.asc())
  }

  if (sort === "price-desc") {
    query = query.orderBy((p) => p.price.desc());
  }

  // if (sort === "price-asc") {
  //   filteredProducts.sort((a, b) => a.price - b.price);
  // }

  // if (sort === "price-desc") {
  //   filteredProducts.sort((a, b) => b.price - a.price);
  // }

  const totalResult = await query.aggregate((a) => ({
    total: a.count(),
  }))

  const total = totalResult.total;

  const startIndex = (page - 1) * pageSize;
  query = query
    .limit(pageSize)
    .offset(startIndex);
  // const endIndex = startIndex + pageSize;

  const products = await query.all();

  return {
    // products: filteredProducts.slice(startIndex, endIndex),
    // total: filteredProducts.length
    products,
    total
  }
}

export async function getProduct(id: string): Promise<Product | null> {
  "use cache"

  cacheTag(`product-${id}`);

  const productId = Number(id);

  if (!Number.isInteger(productId) || productId <= 0) {
    return null;
  }

  const product = await db.orm.public.Product.first({
    id: productId,
  });

  if (!product) {
    return null;
  }

  return {
    id: Number(product.id),
    title: String(product.title),
    description: String(product.description),
    price: Number(product.price),
    category: String(product.category),
  }

  // const response = await fetch(`https://dummyjson.com/products/${id}`);

  // if (!response.ok) {
  //   return null;
  // }

  // return response.json();
}

export async function getCategories() {
  "use cache"

  cacheTag("categories");

  const categories = await db.orm.public.Product
    .select("category")
    .distinct("category")
    .all();

  return categories.map((item) => item.category)
}