import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/api/products";

export function useProducts({ search, category }) {
  return useQuery({
    queryKey: ["products", search, category],
    queryFn: () => fetchProducts({ search, category }),
  });
}
