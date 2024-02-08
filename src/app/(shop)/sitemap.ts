import { API_URL } from "@/config/api";
import { slugifyString } from "@/libs/utils";

export default async function sitemap() {
  const res = await fetch(`${API_URL}/products?getAll=true`);
  const allProducts = await res.json();

  const res_2 = await fetch(`${API_URL}/categories`);
  const allCategories = await res_2.json();

  const categories = allCategories.map((category: any) => ({
    url: `https://www.leyven.com.ua/category/${
      category.categoryId
    }-${slugifyString(category.title)}`,
    lastModified: new Date().toISOString(),
  }));

  const products = allProducts.map((product: any) => ({
    url: `https://www.leyven.com.ua/product/${product.id}-${slugifyString(
      product.title,
    )}`,
    lastModified: new Date().toISOString(),
  }));

  const routes = [
    "",
    "/product",
    "/about",
    "/contacts",
    "/allProducts",
    "/search",
    "/paymentAndShipping",
  ].map((route) => ({
    url: `https://www.leyven.com.ua${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...categories, ...products];
}
