"use server"

import { registerSchema } from "@/lib/schemas/auth-schema";
import { db } from "@/src/prisma/db";
import bcrypt from "bcryptjs";

export async function registerUser(formData: FormData) {
  const parsedData = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword")
  })

  if (!parsedData.success) {
    return {
      success: false,
      fieldErrors: parsedData.error.flatten().fieldErrors,
    }
  }

  const { name, email, password } = parsedData.data;

  try {
    const existingUser = await db.orm.public.User.first({
      email
    })

    if (existingUser) {
      return {
        success: false,
        error: "An account with this email already exists"
      }
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await db.orm.public.User.create({
      name,
      email,
      passwordHash,
      role: "user",
    })

    return { success: true };

  } catch (error) {
    console.error("Registration failed:", error);

    return {
      success: false,
      error: "Registration failed. Please try again.",
    }
  }

}

