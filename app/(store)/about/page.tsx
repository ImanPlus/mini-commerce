import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-4xl space-y-10 px-4 py-12">
      {/* About MiniCommerce */}
      <section className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">
          About MiniCommerce
        </h1>

        <p className="text-lg leading-8 text-muted-foreground">
          MiniCommerce is a full-stack e-commerce application developed by Iman
          Jalali as a learning project to deepen my understanding of Next.js and
          its capabilities.
        </p>

        <p className="leading-7 text-muted-foreground">
          The project gave me hands-on experience building a complete web
          application, from frontend development to backend logic and database
          integration.
        </p>
      </section>

      {/* Key Features */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Key Features</h2>

        <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
          <li>User registration and authentication</li>
          <li>Role-based access control for admin and regular users</li>
          <li>Product management (CRUD)</li>
          <li>Database integration and persistent data storage</li>
          <li>Protected admin routes</li>
          <li>Form validation and error handling</li>
        </ul>
      </section>

      {/* Technologies Used */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          Technologies Used
        </h2>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border p-4">
            <h3 className="font-medium">Frontend</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Next.js, React, TypeScript, Tailwind CSS
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="font-medium">Backend</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Next.js Server Actions
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="font-medium">Database</h3>
            <p className="mt-1 text-sm text-muted-foreground">PostgreSQL</p>
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="font-medium">ORM</h3>
            <p className="mt-1 text-sm text-muted-foreground">Prisma</p>
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="font-medium">Authentication</h3>
            <p className="mt-1 text-sm text-muted-foreground">Auth.js</p>
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="font-medium">Validation & Forms</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Zod, React Hook Form
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="font-medium">UI Components</h3>
            <p className="mt-1 text-sm text-muted-foreground">shadcn/ui</p>
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="font-medium">Deployment</h3>
            <p className="mt-1 text-sm text-muted-foreground">Vercel</p>
          </div>
        </div>
      </section>

      {/* About the Developer */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          About the Developer
        </h2>

        <p className="leading-7 text-muted-foreground">
          I&apos;m a Junior Front-End Developer focused on React, Next.js, and
          TypeScript. I built MiniCommerce to strengthen my practical knowledge
          of Next.js and gain experience working with backend functionality,
          databases, authentication, and access control.
        </p>
      </section>

      {/* Connect with Me */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          Connect with Me
        </h2>

        <div className="flex flex-wrap gap-4">
          <Link
            href="https://github.com/ImanPlus"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            GitHub
          </Link>

          <Link
            href="https://www.linkedin.com/in/iman-jalali/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            LinkedIn
          </Link>
        </div>
      </section>
    </main>
  );
}
