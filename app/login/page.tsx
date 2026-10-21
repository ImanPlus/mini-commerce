import { auth } from "@/auth";
import LoginForm from "@/components/LoginForm";
import { redirect } from "next/navigation";
import { Suspense } from "react";

async function LoginContent() {
  const session = await auth();

  if (session?.user) {
    if (session.user.role === "admin") {
      redirect("/admin");
    }

    redirect("/");
  }

  return (
    <main className="flex min-h-[70vh] items-center justify-center">
      <LoginForm />
    </main>
  );
}

export default async function LoginPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-[70vh] items-center justify-center">
          Loading...
        </main>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
