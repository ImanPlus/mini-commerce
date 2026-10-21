import CategoryFilter from "@/components/CategoryFilter";
import ProductCard from "@/components/ProductCard";
import ProductPagination from "@/components/ProductPagination";
import SearchInput from "@/components/SearchInput";
import SortFilter from "@/components/SortFilter";
import { getCategories, getProducts } from "@/lib/products-api";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
};

type ProductsPageProps = {
  searchParams: Promise<{
    search?: string;
    category?: string;
    sort?: string;
    page?: string;
  }>;
};

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const categories = await getCategories();

  const { search, category, sort, page } = await searchParams;

  const parsedPage = Number(page);
  const currentPage =
    Number.isInteger(parsedPage) && parsedPage >= 1 ? parsedPage : 1;

  const { products, total } = await getProducts({
    search,
    category,
    sort,
    page: currentPage,
  });

  const pageSize = 3;
  const totalPages = Math.ceil(total / pageSize);
  const validPage = Math.min(currentPage, totalPages || 1);

  let finalProducts = products;

  if (validPage !== currentPage) {
    const result = await getProducts({
      search,
      category,
      sort,
      page: validPage,
    });

    finalProducts = result.products;
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-10">
      <h1 className="mb-8 text-3xl font-bold">Products</h1>

      <div className="mb-8 flex gap-4">
        <SearchInput />
        <CategoryFilter categories={categories} />
        <SortFilter />
      </div>

      {finalProducts.length === 0 ? (
        <div className="rounded-lg border p-8 text-center">
          <h2 className="text-lg font-semibold">No products found</h2>

          <p className="mt-2 text-sm text-muted-foreground">
            {" "}
            Try changing your search or filter.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {finalProducts.map((product: Product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              description={product.description}
              price={product.price}
            />
          ))}
        </div>
      )}

      <ProductPagination currentPage={validPage} totalPages={totalPages || 1} />
    </div>
  );
}
