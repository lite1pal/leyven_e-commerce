import { API_URL } from "@/config/api";
import SectionHeader from "../section-header";
import SwiperComponent from "../base/Swiper";
import SwiperComponentRelatedProducts from "../base/SwiperRelatedProducts";

export default async function RelatedProducts({
  id,
  header,
  type,
}: {
  id?: string;
  header: string;
  type?: string;
}) {
  const endpoint = `${API_URL}/relatedProducts?id=${id}`;
  // gets products for the catalog
  const res = await fetch(endpoint, { next: { revalidate: 360 } });

  const data = await res.json();

  if (!Array.isArray(data)) {
    return <div className="my-10 py-10"></div>;
  }

  return (
    <div className="flex flex-col gap-7 px-7 py-5">
      <SectionHeader>{header}</SectionHeader>
      <div className="flex gap-2 overflow-x-hidden">
        <SwiperComponentRelatedProducts data={data} type="relatedProducts" />
      </div>
    </div>
  );
}
