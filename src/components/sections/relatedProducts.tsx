import { API_URL } from "@/config/api";
import Card from "../cards/card";
import SectionHeader from "../base/SectionHeader";
import SwiperComponent from "../base/Swiper";

export default async function RelatedProducts({
  id,
  header,
}: {
  id?: string;
  header: string;
}) {
  const endpoint = id
    ? `${API_URL}/relatedProducts?id=${id}`
    : `${API_URL}/relatedProducts`;
  // gets products for the catalog
  const res = await fetch(endpoint, {
    cache: "no-store",
  });

  const data = await res.json();

  return (
    <div className="flex flex-col gap-7 px-7 py-5">
      <SectionHeader>{header}</SectionHeader>
      <div className="flex gap-2 overflow-x-scroll">
        <SwiperComponent data={data} type="related products" />
      </div>
    </div>
  );
}
