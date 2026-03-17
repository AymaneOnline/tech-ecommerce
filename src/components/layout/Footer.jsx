export default function Footer() {
  return (
    <footer className="border-t mt-10">
      <div className="mx-auto max-w-6xl p-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} TechStore. All rights reserved.
      </div>
    </footer>
  );
}
