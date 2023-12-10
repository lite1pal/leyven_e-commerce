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
      <BasicBreadcrumbs />
      <div className="px-7">
        <TabsComponent data={data} />
      </div>
    </div>
  );
}
