import { Link } from "react-router";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="space-y-16">
      {/* 🦸 HERO SECTION */}
      <section className="flex flex-col items-center text-center py-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Discover Amazing Products
        </h1>

        <p className="mt-4 max-w-xl text-muted-foreground">
          Browse a wide range of products with a modern and seamless shopping
          experience.
        </p>

        <Link to="/products" className="mt-6">
          <Button size="lg" className="transition active:scale-95">
            Shop Now
          </Button>
        </Link>
      </section>

      {/* 🧱 FEATURES */}
      <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border p-6 text-center">
          <h3 className="font-semibold">Wide Selection</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Explore products across multiple categories.
          </p>
        </div>

        <div className="rounded-2xl border p-6 text-center">
          <h3 className="font-semibold">Fast Experience</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Smooth browsing with instant search and infinite scrolling.
          </p>
        </div>

        <div className="rounded-2xl border p-6 text-center">
          <h3 className="font-semibold">Modern UI</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Clean and responsive design built with the latest tools.
          </p>
        </div>
      </section>

      {/* 🛍️ CTA SECTION */}
      <section className="text-center py-12 border rounded-2xl">
        <h2 className="text-2xl font-semibold">Start Shopping Today</h2>

        <p className="mt-2 text-muted-foreground">
          Find the best products at great prices.
        </p>

        <Link to="/products" className="mt-4 inline-block">
          <Button size="lg" variant="outline">
            Browse Products
          </Button>
        </Link>
      </section>
    </div>
  );
}
