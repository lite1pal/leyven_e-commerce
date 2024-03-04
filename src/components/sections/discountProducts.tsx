import { API_URL } from "@/config/api";
import SectionHeader from "../section-header";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import SwiperComponent from "../base/Swiper";

export default async function DiscountProducts({ header }: { header: string }) {
  // gets products for the catalog
  const res = await fetch(`${API_URL}/discountProducts`, {
    next: { revalidate: 360 },
  });

  const data = await res.json();

  return (
    <div className="flex flex-col gap-7 px-7 py-5">
      <SectionHeader>{header}</SectionHeader>
      <div className="flex gap-2 overflow-x-hidden">
        <SwiperComponent data={data} type="discount products" />
      </div>
    </div>
  );
}
