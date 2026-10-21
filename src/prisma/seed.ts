import "dotenv/config";
import { db } from "./db";
import bcrypt from "bcryptjs";

async function main() {
  const adminName = process.env.ADMIN_NAME;
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  const userName = process.env.USER_NAME;
  const userEmail = process.env.USER_EMAIL;
  const userPassword = process.env.USER_PASSWORD;

  if (
    !adminName ||
    !adminEmail ||
    !adminPassword ||
    !userName ||
    !userEmail ||
    !userPassword
  ) {
    throw new Error("Missing required user environment variables.");
  }

  const existingProduct = await db.orm.public.Product.first({
    title: "Seed Product",
  });

  if (!existingProduct) {
    await db.orm.public.Product.create({
      title: "Seed Product",
      description: "This product was created by the Prisma seed script.",
      price: 29.99,
      category: "seed",
    });

    console.log("Seed product created.");
  }


  const existingAdmin = await db.orm.public.User.first({
    email: adminEmail,
  });

  if (!existingAdmin) {
    const adminPasswordHash = await bcrypt.hash(adminPassword, 10);

    await db.orm.public.User.create({
      name: adminName,
      email: adminEmail,
      passwordHash: adminPasswordHash,
      role: "admin"
    })

    console.log("Admin user created.");
  }

  const existingUser = await db.orm.public.User.first({
    email: userEmail,
  })

  if (!existingUser) {
    const userPasswordHash = await bcrypt.hash(userPassword, 10);

    await db.orm.public.User.create({
      name: userName,
      email: userEmail,
      passwordHash: userPasswordHash,
      role: "user"
    })

    console.log("Normal user created.");
  }

  console.log("Seed completed successfully.");
}

main().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});