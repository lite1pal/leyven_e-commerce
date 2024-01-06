import { API_URL } from "@/config/api";

export default async function sitemap() {
  const res = await fetch(`${API_URL}/products?getAll=true`);
  const allProducts = await res.json();

  const products = allProducts.map((product: any) => ({
    url: `http://localhost:3000/product/${product.id}`,
    lastModified: new Date().toISOString(),
  }));

  const routes = ["", "/product", "/about", "/contacts", "/category"].map(
    (route) => ({
      url: `http://localhost:3000${route}`,
      lastModified: new Date().toISOString(),
    }),
  );

  return [...routes, ...products];
}
