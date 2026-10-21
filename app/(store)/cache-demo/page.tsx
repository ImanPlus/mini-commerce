"use cache"

async function getMessage() {
  return `Generated at ${new Date().toLocaleTimeString()}`;
}

export default async function CacheDemoPage() {
  const message = await getMessage();

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-3xl font-bold">Cache Demo</h1>

      <p className="mt-4">{message}</p>
    </main>
  );
}
