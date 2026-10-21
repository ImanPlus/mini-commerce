import ProductForm from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-bold">Add Product</h1>

      <p className="mt-2 text-muted-foreground">Create new product</p>

      <ProductForm />
    </main>
  );
}
