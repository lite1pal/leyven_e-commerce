import BasicBreadcrumbs from "@/components/breadCrumbs";
import TabsComponent from "./components/tabs";
import { API_URL } from "@/config/api";

interface IProps {
  id: string;
}

export default async function ProductView({ id }: IProps) {
  const res = await fetch(`${API_URL}/product?id=${id}`);
  const data = await res.json();

  return (
    <div>
      <BasicBreadcrumbs {...{ data }} />
      <div className="px-7 pb-10">
        <TabsComponent data={data} />
      </div>
      <div className="flex px-7 py-6 flex-col gap-3">
        <p className="text-slate-700">
          <strong>Застереження!</strong> Будь ласка, перед купівлею зверніться
          до ветеринарного лікаря за рекомендацією! Ми не надаємо консультацій
          щодо підбору препаратів та не несемо відповідальності за їх
          застосування без призначення, адже Ви ризикуєте зашкодити своєму
          улюбленцю!
        </p>

        {/* <p>{data.description.slice(257, 2000)}</p> */}
      </div>
    </div>
  );
}
