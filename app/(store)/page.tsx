import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <section className="flex flex-1 items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl space-y-8 text-center">
        <div className="space-y-6">
          <h1 className="mt-2 text-4xl font-bold tracking-tight">
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

        <div className="space-y-4 rounded-lg border p-6 text-left">
          <div className="space-y-1 text-center">
            <h2 className="text-xl font-semibold">Demo Access</h2>
            <p className="text-sm text-muted-foreground">
              Use the demo accounts below to explore MiniCommerce.
            </p>
          </div>

          <div className="space-y-2 rounded-md bg-muted p-4">
            <h3 className="font-semibold">Admin Account</h3>
            <p className="text-sm">
              <span className="font-medium">Email:</span> admindemo@gmail.com
            </p>
            <p className="text-sm">
              <span className="font-medium">Password:</span> admin240@demo
            </p>
            <p className="text-xs text-muted-foreground">
              Manage products and explore admin features.
            </p>
            <Link href="/login">
              <Button variant="outline" size="sm" className="mt-2">
                Admin Login
              </Button>
            </Link>
          </div>

          <div className="space-y-2 rounded-md bg-muted p-4">
            <h3 className="font-semibold">User Account</h3>
            <p className="text-sm">
              <span className="font-medium">Email:</span> userdemo@gmail.com
            </p>
            <p className="text-sm">
              <span className="font-medium">Password:</span> user260@demo
            </p>
            <p className="text-xs text-muted-foreground">
              Explore the store as a regular user.
            </p>
            <Link href="/login">
              <Button variant="outline" size="sm" className="mt-2">
                User Login
              </Button>
            </Link>
          </div>

          <p className="text-xs text-muted-foreground">
            These are public demo accounts. Please do not store personal or
            sensitive information in them.
          </p>
        </div>
      </div>
    </section>
  );
}
