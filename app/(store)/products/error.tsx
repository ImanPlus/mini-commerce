"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-bold">Something went wrong</h1>

      <p className="mt-3 text-muted-foreground">
        We couldn&apos;t load the products.
      </p>

      <button
        onClick={() => reset()}
        className="mt-6 rounded-md border px-4 py-2"
      >
        Try again
      </button>
    </main>
  );
}
