import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from "./src/prisma/db";
import bcrypt from "bcryptjs";
import { loginSchema } from "./lib/schemas/auth-schema";

type UserRole = "admin" | "user";

function isUserRole(role: unknown): role is UserRole {
  return role === "admin" || role === "user"
}

export const { auth, handlers } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email"
        },
        password: {
          label: "Password",
          type: "password"
        },
      },

      async authorize(credentials) {
         const validation = loginSchema.safeParse({
          email: credentials?.email,
          password: credentials?.password
         })

        // if (!credentials?.email || !credentials?.password) {
        //   return null;
        // }
        if(!validation.success){
          return null
        }

       const { email, password } = validation.data;

        const user = await db.orm.public.User.first({
          email,
        })

        if (!user) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          password,
          user.passwordHash
        )

        if (!isPasswordValid) {
          return null;
        }

        if (!isUserRole(user.role)) {
          return null;
        }

        return {
          id: String(user.id),
          name: user.name,
          email: user.email,
          role: user.role as "admin" | "user"
        }

        // if (
        //   credentials?.email === "iman@example.com" &&
        //   credentials?.password === "123456"
        // ) {
        //   return {
        //     id: "1",
        //     name: "Iman",
        //     email: "iman@example.com",
        //     role: "admin",
        //   };
        // }

        // if (
        //   credentials?.email === "user@example.com" &&
        //   credentials?.password === "123456"
        // ) {
        //   return {
        //     id: "2",
        //     name: "Normal User",
        //     email: "user@example.com",
        //     role: "user"
        //   }
        // }

        // return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }

      return token
    },

    async session({ session, token }) {
      if (session.user && isUserRole(token.role)) {
        session.user.role = token.role;
      }

      return session;
    }
  }
});