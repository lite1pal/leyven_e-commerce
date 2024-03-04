import { API_URL } from "@/config/api";
import SectionHeader from "../section-header";
import SwiperComponent from "../base/Swiper";

export default async function NewProducts() {
  const endpoint = `${API_URL}/relatedProducts`;
  // gets products for the catalog
  const res = await fetch(endpoint, { next: { revalidate: 360 } });

  const data = await res.json();

  if (!Array.isArray(data)) {
    return <div className="my-10 py-10"></div>;
  }

  return (
    <div className="flex gap-2 overflow-x-hidden">
      <SwiperComponent data={data} type="newProducts" />
    </div>
  );
}
