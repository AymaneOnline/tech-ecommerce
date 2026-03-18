import { Link } from "react-router";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center py-20">
        <h1 className="text-4xl font-bold md:text-6xl">
          Discover the Latest Tech
        </h1>

        <p className="mt-4 max-w-xl text-muted-foreground">
          Explore top gadgets, laptops, and accessories at the best prices.
        </p>

        <Link to="/products">
          <Button className="mt-6">Shop Now</Button>
        </Link>
      </section>
    </div>
  );
}
