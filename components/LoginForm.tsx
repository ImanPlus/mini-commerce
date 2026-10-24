"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { loginSchema } from "@/lib/schemas/auth-schema";
import { useCartStore } from "@/store/cart-store";

export default function LoginForm() {
  const router = useRouter();
  const clearCart = useCartStore((action) => action.clearCart);

  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<"email" | "password", string>>
  >({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setFieldErrors({});
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);

    const email = formData.get("email");
    const password = formData.get("password");

    const validation = loginSchema.safeParse({
      email,
      password,
    });

    if (!validation.success) {
      const errors = validation.error.flatten().fieldErrors;

      setFieldErrors({
        email: errors.email?.[0],
        password: errors.password?.[0],
      });

      setIsLoading(false);
      return;
    }

    try {
      const result = await signIn("credentials", {
        email: validation.data.email,
        password: validation.data.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
        return;
      }
      clearCart();

      router.push("/");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="w-full max-w-sm space-y-4"
    >
      <h1 className="text-2xl font-bold">Login</h1>

      <div className="space-y-1">
        <Input type="email" placeholder="Email" name="email" />

        {fieldErrors.email && (
          <p className="text-sm text-destructive">{fieldErrors.email}</p>
        )}
      </div>

      <div className="space-y-1">
        <Input type="password" placeholder="Password" name="password" />

        {fieldErrors.password && (
          <p className="text-sm text-destructive">{fieldErrors.password}</p>
        )}
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Login"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
}
