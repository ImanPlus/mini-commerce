export default function Footer() {
  return (
    <footer className="border-t py-3 text-center text-sm text-muted-foreground">
      <p>© {new Date().getFullYear()} MiniCommerce · Built by Iman Jalali</p>
      <div className="mt-2 flex justify-center gap-4">
        <a
          href="https://github.com/ImanPlus"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/iman-jalali/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground"
        >
          LinkedIn
        </a>
      </div>
    </footer>
  );
}
