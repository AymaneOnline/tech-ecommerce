import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { Link } from "react-router";
import { toast } from "sonner";

export default function ProductCard({ product }) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <Card className="group overflow-hidden rounded-2xl border transition-all duration-300 hover:shadow-xl py-0">
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />

        {/* Optional overlay (nice effect) */}
        <div className="pointer-events-none absolute inset-0 bg-black/0 transition group-hover:bg-black/5" />
      </div>

      <CardContent className="space-y-3 p-4">
        {/* Title */}
        <Link to={`/products/${product.id}`}>
          <h3 className="line-clamp-1 text-sm font-semibold transition group-hover:text-primary">
            {product.title}
          </h3>
        </Link>

        {/* Price + Rating */}
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold">${product.price.toLocaleString()}</p>

          <span className="text-sm text-muted-foreground">
            ⭐ {product.rating}
          </span>
        </div>

        {/* Button */}
        <Button
          className="w-full transition active:scale-95"
          onClick={() => {
            addToCart(product);

            toast("Added to cart", {
              description: product.title,
            });
          }}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}
