import Link from "next/link";

export default async function AdminPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <Link
        href="/admin/products"
        className="mt-4 inline-block underline underline-offset-4 hover:text-blue-500"
      >
        Manage Products
      </Link>
    </main>
  );
}
