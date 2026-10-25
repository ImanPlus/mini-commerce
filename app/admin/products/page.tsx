import { auth } from "@/auth";
import DeleteProductButton from "@/components/admin/DeleteProductButton";
import { getProducts } from "@/lib/products-api";
import { clsx } from "cn";
import { PackagePlus, Store } from "lucide-react";
import Link from "next/link";

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
  }>;
}) {
  const params = await searchParams;
  const rawPage = Number(params.page);

  const page = Number.isInteger(rawPage) && rawPage >= 1 ? rawPage : 1;

  const pageSize = 3;

  let { products, total } = await getProducts({ page });

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const validPage = Math.min(page, totalPages);

  if (validPage !== page) {
    ({ products, total } = await getProducts({
      page: validPage,
    }));
  }

  const session = await auth();
  console.log(session);

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="mt-2 text-muted-foreground">Manage your products</p>
        </div>

        <Link
          href="/products"
          className="rounded-md bg-primary px-4 py-2 text-primary-foreground text-center"
        >
          GO to Store
          <Store className="h-5 w-5 inline ml-2" />
        </Link>

        <Link
          href="/admin/products/new"
          className="rounded-md bg-primary px-4 py-2 text-primary-foreground text-center"
        >
          Add Product
          <PackagePlus className="h-5 w-5 inline ml-2" />
        </Link>
      </div>

      {/* Products */}
      {products.length === 0 ? (
        <div className="rounded-lg border p-8 text-center">
          <h2 className="text-lg font-semibold">No products found</h2>

          <p className="mt-2 text-sm text-muted-foreground">
            There are no products to display
          </p>

          <Link
            href="/admin/products/new"
            className="mt-4 inline-block rounded-md bg-primary px-4 py-2 text-primary-foreground"
          >
            Add Product
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col gap-3 rounded-lg border p-4 
            sm:flex-row sm:items-center sm:justify-between hover:scale-105"
            >
              <div>
                <h2 className="font-medium">{product.title}</h2>
                <p className="text-sm text-muted-foreground">
                  {product.category}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <span className="font-medium">${product.price}</span>

                <Link
                  href={`/admin/products/${product.id}`}
                  className="text-sm underline underline-offset-4"
                >
                  Edit
                </Link>

                <DeleteProductButton productId={product.id} />
              </div>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-6 flex justify-center items-center gap-2">
          <Link
            href={`/admin/products?page=${page - 1}`}
            className={clsx("rounded-md border px-3 py-2", {
              "pointer-events-none opacity-50": page === 1,
            })}
          >
            Previous
          </Link>

          {Array.from({ length: totalPages }, (_, index) => {
            const pageNumber = index + 1;

            return (
              <Link
                key={pageNumber}
                href={`/admin/products?page=${pageNumber}`}
                className={clsx("rounded-md border px-3 py-2 cursor-pointer", {
                  "bg-primary text-primary-foreground": page === pageNumber,
                })}
              >
                {pageNumber}
              </Link>
            );
          })}

          <Link
            href={`/admin/products?page=${page + 1}`}
            className={clsx("rounded-md border px-3 py-2", {
              "pointer-events-none opacity-50": page === totalPages,
            })}
          >
            Next
          </Link>
        </div>
      )}
    </main>
  );
}
