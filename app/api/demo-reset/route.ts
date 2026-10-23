import { NextResponse } from "next/server";
import { db } from "@/src/prisma/db";
import { revalidatePath } from "next/cache";

const demoProducts = [
  {
    title: "Seed Product",
    description: "This product was created by the Prisma seed script.",
    price: 29.99,
    category: "seed",
  },
];

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  const authorization = request.headers.get("authorization");

  if (!secret || authorization !== `Bearer ${secret}`) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const existingProducts = await db.orm.public.Product
      .select("id")
      .all();

    for (const product of existingProducts) {
      await db.orm.public.Product
        .where({ id: product.id })
        .delete();
    }

    for (const product of demoProducts) {
      await db.orm.public.Product.create(product);
    }

    revalidatePath("/products");
    revalidatePath("/admin/products");

    return NextResponse.json({
      success: true,
      message: "Demo products reset successfully.",
    });
  } catch (error) {
    console.error("Demo reset failed:", error);

    return NextResponse.json(
      { error: "Demo reset failed." },
      { status: 500 },
    );
  }
}