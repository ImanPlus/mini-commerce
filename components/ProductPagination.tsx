"use client";

import { clsx } from "cn";
import { useRouter, useSearchParams } from "next/navigation";

type ProductPaginationProps = {
  currentPage: number;
  totalPages: number;
};

function getPageNumbers(
  currentPage: number,
  totalPage: number,
): (number | "...")[] {
  if (totalPage <= 7) {
    return Array.from({ length: totalPage }, (_, index) => index + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "...", totalPage];
  }

  if (currentPage >= totalPage - 3) {
    return [
      1,
      "...",
      totalPage - 4,
      totalPage - 3,
      totalPage - 2,
      totalPage - 1,
      totalPage,
    ];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPage,
  ];
}

export default function ProductPagination({
  currentPage,
  totalPages,
}: ProductPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", page.toString());

    router.push(`/products?${params.toString()}`);
  };

  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <div className="mt-8 flex flex-col items-center gap-3">
      <div className="flex items-center gap-2">
        <button
          onClick={() => goToPage(currentPage - 1)}
          className={clsx("rounded-md border px-3 py-2", {
            "pointer-events-none opacity-50": currentPage === 1,
          })}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {pages.map((page, index) =>
          page === "..." ? (
            <span key={`ellipsis-${index}`} className="px-2">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={clsx(
                "cursor-pointer",
                currentPage === page ? "font-bold underline" : "",
              )}
            >
              {page}
            </button>
          ),
        )}
        <button
          onClick={() => goToPage(currentPage + 1)}
          className={clsx("rounded-md border px-3 py-2", {
            "pointer-events-none opacity-50": currentPage === totalPages,
          })}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      <p className="text-sm text-muted-foreground">
        Page {currentPage} of {totalPages}
      </p>
    </div>
  );
}
