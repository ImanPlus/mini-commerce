export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
      <div className="mb-8">
        <div className="h-9 w-48 animate-pulse rounded-md bg-muted" />
        <div className="mt-3 h-5 w-64 animate-pulse rounded-md bg-muted" />
      </div>

      <div className="space-y-4">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="h-20 animate-pulse rounded-lg border bg-muted/30"
          />
        ))}
      </div>
    </main>
  );
}
