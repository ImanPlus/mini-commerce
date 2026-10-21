export default function ForbiddenPage() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold">403</h1>

        <h2 className="mt-2 text-2xl font-semibold">Access Denied</h2>

        <p className="mt-2 text-muted-foreground"> You don&apos;t have permission to access this page.</p>
      </div>
    </main>
  );
}