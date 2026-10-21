"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function SortFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }

    params.delete("page");

    router.push(`/products?${params.toString()}`);
  };
  return (
    <select
      defaultValue={searchParams.get("sort") ?? ""}
      onChange={(event) => handleSortChange(event.target.value)}
    >
      <option value="">Default</option>
      <option value="price-asc">Price: Low to Hight</option>
      <option value="price-desc">Price: Hight to Low </option>
    </select>
  );
}
