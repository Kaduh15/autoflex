import { useQuery } from "@tanstack/react-query";

import { getProducts } from "@/http/get-products";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
}
