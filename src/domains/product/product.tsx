import BasicBreadcrumbs from "@/components/breadCrumbs";
import TabsComponent from "./components/tabs";
import { API_URL } from "@/config/api";
import parse from "html-react-parser";
import { Suspense } from "react";
import { auth } from "@/app/api/auth/[...nextauth]/auth";

interface IProps {
  id: string;
}

export default async function ProductView({ id }: IProps) {
  const res = await fetch(`${API_URL}/product?id=${id}`, { cache: "no-store" });
  const data = await res.json();

  const session = await auth();

  const parsedHTML = parse(data.description.replace(/\./g, "<br />"));

  return (
    <div>
      <BasicBreadcrumbs {...{ data }} />
      <div className="px-7 pb-10">
        <TabsComponent data={data} session={session} />
      </div>
      <div className="flex flex-col gap-3 px-7 py-6">
        <p className=" text-slate-700 lg:w-1/2 xl:w-1/2">
          <strong>Застереження!</strong> Будь ласка, перед купівлею зверніться
          до ветеринарного лікаря за рекомендацією! Ми не надаємо консультацій
          щодо підбору препаратів та не несемо відповідальності за їх
          застосування без призначення, адже Ви ризикуєте зашкодити своєму
          улюбленцю!
        </p>
      </div>
    </div>
  );
}
