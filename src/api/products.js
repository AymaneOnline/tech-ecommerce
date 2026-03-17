export async function fetchProducts({ search = "", category = "" }) {
  let url = "https://dummyjson.com/products";

  if (search) {
    url = `https://dummyjson.com/products/search?q=${search}`;
  }

  if (category) {
    url = `https://dummyjson.com/products/category/${category}`;
  }

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export async function fetchProductById(id) {
  const res = await fetch(`https://dummyjson.com/products/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
}
