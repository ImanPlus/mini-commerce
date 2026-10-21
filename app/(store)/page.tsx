import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <section className="flex flex-1 items-center justify-center">
      <div className="max-w-2xl space-y-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight mt-2">
          Everything you need, in one place.
        </h1>

        <p className="text-muted-foreground">
          Discover products, explore categories, and manage your store with
          MiniCommerce.
        </p>

        <Link href="/products">
          <Button>Explore Products</Button>
        </Link>
      </div>
    </section>
  );
}
