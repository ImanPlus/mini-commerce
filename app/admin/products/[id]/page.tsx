import ProductForm from "@/components/admin/ProductForm";
import { getProduct } from "@/lib/products-api";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;

  const product = await getProduct(id);

  if (!product) {
   notFound();
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-bold">Edit Product</h1>

      <p className="mt-2 text-muted-foreground">Editing: {product.title}</p>

      <ProductForm product={product} />
    </main>
  );
}
