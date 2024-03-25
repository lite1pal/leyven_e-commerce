import FullFeaturedCrudGrid from "./components/data-table";
import { CardTitle } from "@/components/ui/card";

export default async function ProductsView() {
  return (
    <div className="mx-auto py-10">
      <CardTitle className="py-3 text-3xl">Управління товарами</CardTitle>
      <FullFeaturedCrudGrid />
    </div>
  );
}
