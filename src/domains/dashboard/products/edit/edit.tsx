import PageHeader from "../../components/pageHeader";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { API_URL } from "@/config/api";

interface IProps {
  id: string;
}

export default async function EditProductView({ id }: IProps) {
  const res = await fetch(`${API_URL}/product?id=${id}`, { cache: "no-store" });
  const data = await res.json();
  return (
    <div className="flex flex-col gap-4">
      <PageHeader iconBack Icon={ArrowBackIcon}>
        Редагування товару: {data.title}
      </PageHeader>
    </div>
  );
}
