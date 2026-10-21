"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { registerUser } from "@/actions/auth-actions";
import { signIn } from "next-auth/react";

export default function RegisterForm() {
  const router = useRouter();

  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<"name" | "email" | "password" | "confirmPassword", string>>
  >({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setFieldErrors({});
    setIsLoading(true);

    try {
      const formData = new FormData(event.currentTarget);

      const result = await registerUser(formData);

      if (!result.success) {
        if ("fieldErrors" in result && result.fieldErrors) {
          setFieldErrors({
            name: result.fieldErrors.name?.[0],
            email: result.fieldErrors.email?.[0],
            password: result.fieldErrors.password?.[0],
            confirmPassword: result.fieldErrors.confirmPassword?.[0],
          });
        } else {
          setError(
            "error" in result
              ? (result.error ?? "Registration failed")
              : "Registration failed",
          );
        }
        return;
      }

      const loginResult = await signIn("credentials", {
        email: String(formData.get("email")),
        password: String(formData.get("password")),
        redirect: false,
      });

      if (loginResult?.error) {
        router.push("/login");
        return;
      }

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
      className="w-full max-w-sm space-y-4 p-2 md:p-0"
    >
      <h1 className="text-2xl font-bold">Create an account</h1>

      <div className="space-y-1">
        <Input
          type="text"
          name="name"
          placeholder="Full name"
          required
          minLength={2}
          aria-invalid={Boolean(fieldErrors.name)}
          aria-describedby={fieldErrors.name ? "name-error" : undefined}
        />

        {fieldErrors.name && (
          <p id="name-error" className="text-sm text-destructive">
            {fieldErrors.name}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Input
          type="email"
          name="email"
          placeholder="Email"
          required
          aria-invalid={Boolean(fieldErrors.email)}
          aria-describedby={fieldErrors.email ? "email-error" : undefined}
        />

        {fieldErrors.email && (
          <p id="email-error" className="text-sm text-destructive">
            {fieldErrors.email}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Input
          type="password"
          name="password"
          placeholder="Password"
          required
          minLength={6}
          aria-invalid={Boolean(fieldErrors.password)}
          aria-describedby={fieldErrors.password ? "password-error" : undefined}
        />

        {fieldErrors.password && (
          <p id="password-error" className="text-sm text-destructive">
            {fieldErrors.password}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          required
          minLength={6}
          aria-invalid={Boolean(fieldErrors.confirmPassword)}
          aria-describedby={
            fieldErrors.confirmPassword ? "confirm-password-error" : undefined
          }
        />

        {fieldErrors.confirmPassword && (
          <p id="confirm-password-error" className="text-sm text-destructive">
            {fieldErrors.confirmPassword}
          </p>
        )}
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Creating account..." : "Register"}
      </Button>
    </form>
  );
}
