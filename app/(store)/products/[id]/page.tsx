import AddToCartButton from "@/components/AddToCartButton";
import { getProduct } from "@/lib/products-api";
import { notFound } from "next/navigation";

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
      <h1 className="text-3xl font-bold">{product.title}</h1>

      <p className="mt-4 text-muted-foreground">{product.description}</p>

      <p className="mt-6 text-xl font-semibold">${product.price}</p>

      <AddToCartButton product={product} />
    </main>
  );
}
