"use client";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ reset }: ErrorPageProps) {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
      <div className="rounded-lg border p-6">
        <h2 className="text-xl font-semibold">Something went wrong</h2>

        <p className="mt-2 text-sm text-muted-foreground">
          {" "}
          We couldn&apos;t load the products.
        </p>

        <button
          type="button"
          onClick={() => reset()}
          className="mt-4 rounded-md bg-primary px-4 py-2 text-primary-foreground"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
