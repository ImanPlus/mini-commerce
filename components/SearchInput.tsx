"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get("search") ?? "";
  const [value, setValue] = useState(currentSearch);

  useEffect(() => {
    if (value === currentSearch) {
      return;
    }

    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set("search", value);
      } else {
        params.delete("search");
      }

      params.delete("page");

      router.replace(`/products?${params.toString()}`);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, currentSearch, router, searchParams]);

  return (
    <Input
      placeholder="Search products..."
      className="max-w-sm"
      value={value}
      onChange={(event) => setValue(event.target.value)}
    />
  );
}
