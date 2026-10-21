import { z } from "zod"

export const productSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters"),
  price: z.number({
    error: "Please enter a valid number"
  }).positive("Price must be greater than 0"),
  category: z.string().trim().min(1, "Category is required"),
  description: z.string().trim().min(10, "Description must be at least 10 characters")
});

export type ProductFormData = z.infer<typeof productSchema>