import { API_URL } from "@/config/api";

export default async function CategoryHeader({
  categoryId,
}: {
  categoryId: string;
}) {
  const res = await fetch(`${API_URL}/category?id=${categoryId}`);
  const data = await res.json();
  const { category } = data;
  return (
    <div className={`px-4 font-sans text-3xl font-medium text-slate-900`}>
      {category.title}
    </div>
  );
}
