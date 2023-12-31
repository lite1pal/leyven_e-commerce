import { API_URL } from "@/config/api";

export default async function sitemap() {
  const res = await fetch(`${API_URL}/products?getAll=true`);
  const allProducts = await res.json();

  const products = allProducts.map((product: any) => ({
    url: `https://www.leyven.com.ua/product/${product.id}`,
    lastModified: new Date().toISOString(),
  }));

  const routes = [
    "",
    "/product",
    "/about",
    "/contacts",
    "allProducts",
    "search",
    "/category",
    "/category/goduvannya-domashnih-tvarin",
    "/category/tovari-dlya-progulyanok",
    "/category/tovari-dlya-komfortu",
    "/category/tovari-dlya-doglyadu",
    "/category/veterinarni-zasobi-preparati",
  ].map((route) => ({
    url: `https://www.leyveb.com.ua${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...products];
}
