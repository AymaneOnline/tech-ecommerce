import { useSearchParams } from "react-router";
import { useProducts } from "@/hooks/useProducts";
import ProductCard from "@/components/product/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useDebounce } from "use-debounce";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

  const sort = params.get("sort") || "";

  const { data, isLoading, error } = useProducts({
    search: debouncedSearch,
    category,
  });

  let products = data?.products || [];

  if (sort === "price-asc") {
    products = [...products].sort((a, b) => a.price - b.price);
  }

  if (sort === "price-desc") {
    products = [...products].sort((a, b) => b.price - a.price);
  }

  if (sort === "rating-desc") {
    products = [...products].sort((a, b) => b.rating - a.rating);
  }

  const handleSearch = (e) => {
    setParams({ q: e.target.value, category, sort });
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

  if (!data?.products?.length) {
    return (
      <p className="text-center text-muted-foreground">No products found.</p>
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
                sort,
              })
            }
          >
            {cat}
          </Button>
        ))}

        {/* Clear filter */}
        <Button variant="ghost" onClick={() => setParams({ q: search, sort })}>
          All
        </Button>
      </div>

      <div className="mb-6 flex items-center justify-between">
        {/* Search already here */}

        <Select
          value={sort}
          onValueChange={(value) =>
            setParams({
              q: search,
              category,
              sort: value,
            })
          }
        >
          <SelectTrigger className="w-45">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="price-asc">Price: Low → High</SelectItem>
            <SelectItem value="price-desc">Price: High → Low</SelectItem>
            <SelectItem value="rating-desc">Top Rated</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
