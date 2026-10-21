import Link from "next/link";

export default function ProductNotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-bold">Product not found</h1>
      
      <p className="mt-3 text-muted-foreground">
          The product you&apos;re looking for doesn&apos;t exist.
      </p>

      <Link href="/products" className="mt-6 underline underline-offset-4">
        Back to products
      </Link>
    </main>
  );
}