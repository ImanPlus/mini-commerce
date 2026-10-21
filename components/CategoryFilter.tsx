"use client";

import { useRouter, useSearchParams } from "next/navigation";

type categoriesProps = {
  categories: string[]
}

export default function CategoryFilter({categories}: categoriesProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }

    params.delete("page")

    router.push(`/products?${params.toString()}`);
  };

  return (
    <select
      defaultValue={searchParams.get("category") ?? ""}
      onChange={(event) => handleCategoryChange(event.target.value)}
    >
      <option value="">All categories</option>

      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
}
