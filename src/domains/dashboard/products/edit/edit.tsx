import PageHeader from "../../components/pageHeader";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { API_URL } from "@/config/api";
import { type Product } from "@/types";
import EditForm from "./components/editForm";

interface IProps {
  id: string;
}

export default async function EditProductView({ id }: IProps) {
  const res = await fetch(`${API_URL}/product?id=${id}&dashboard=true`, {
    next: { revalidate: 0 },
  });
  const data: Product = await res.json();
  return (
    <div className="flex flex-col gap-4">
      <PageHeader iconBack Icon={ArrowBackIcon}>
        Редагування товару: {data.title}
      </PageHeader>
      <EditForm {...{ data }} />
    </div>
  );
}
