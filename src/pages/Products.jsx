import { useSearchParams } from "react-router";
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
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

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

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

  const { data: categories } = useCategories();

  let products = data?.products || [];

  // Sorting
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

  const handleCategory = (value) => {
    setParams({
      q: search,
      category: value,
      sort,
    });
  };

  const clearFilters = () => {
    setParams({ q: search, sort });
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

  if (!data?.products?.length) {
    return (
      <p className="text-center text-muted-foreground">No products found.</p>
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Products</h1>

      <div className="flex gap-8">
        {/* Sidebar (Desktop) */}
        <aside className="hidden w-64 space-y-6 lg:block">
          <h2 className="text-lg font-semibold">Filters</h2>

          <div className="space-y-2">
            {categories?.map((cat) => {
              const value = typeof cat === "string" ? cat : cat.slug;
              const label = typeof cat === "string" ? cat : cat.name;

              return (
                <Button
                  key={value}
                  variant={category === value ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => handleCategory(value)}
                >
                  {label}
                </Button>
              );
            })}
          </div>

          <Button variant="ghost" className="w-full" onClick={clearFilters}>
            Clear filters
          </Button>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Mobile Filters */}
          <div className="mb-4 flex items-center justify-between lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">Filters</Button>
              </SheetTrigger>

              <SheetContent side="left" className="w-64 space-y-6">
                <h2 className="text-lg font-semibold">Filters</h2>

                {categories?.map((cat) => {
                  const value = typeof cat === "string" ? cat : cat.slug;
                  const label = typeof cat === "string" ? cat : cat.name;

                  return (
                    <Button
                      key={value}
                      variant={category === value ? "default" : "outline"}
                      className="w-full justify-start"
                      onClick={() => handleCategory(value)}
                    >
                      {label}
                    </Button>
                  );
                })}

                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={clearFilters}
                >
                  Clear filters
                </Button>
              </SheetContent>
            </Sheet>
          </div>

          {/* Search + Sort */}
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <Input
              placeholder="Search products..."
              value={search}
              onChange={handleSearch}
              className="md:max-w-sm"
            />

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
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="price-asc">Price: Low → High</SelectItem>
                <SelectItem value="price-desc">Price: High → Low</SelectItem>
                <SelectItem value="rating-desc">Top Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Products Grid */}
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
