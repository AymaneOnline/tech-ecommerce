import { useSearchParams } from "react-router";
import { useProducts } from "@/hooks/useProducts";
import ProductCard from "@/components/product/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useDebounce } from "use-debounce";

const categories = [
  "smartphones",
  "laptops",
  "fragrances",
  "skincare",
  "groceries",
  "home-decoration",
];

function ProductSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-48 w-full rounded-xl" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-10 w-full rounded-lg" />
    </div>
  );
}

export default function Products() {
  const [params, setParams] = useSearchParams();

  const search = params.get("q") || "";
  const [debouncedSearch] = useDebounce(search, 500);

  const category = params.get("category") || "";

  const { data, isLoading, error } = useProducts({
    search: debouncedSearch,
    category,
  });

  const handleSearch = (e) => {
    setParams({ q: e.target.value, category });
  };

  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) return <p>Something went wrong</p>;

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Products</h1>
      <div className="mb-6">
        <Input
          placeholder="Search products..."
          value={search}
          onChange={handleSearch}
        />
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={category === cat ? "default" : "outline"}
            onClick={() =>
              setParams({
                q: search,
                category: cat,
              })
            }
          >
            {cat}
          </Button>
        ))}

        {/* Clear filter */}
        <Button variant="ghost" onClick={() => setParams({ q: search })}>
          All
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
