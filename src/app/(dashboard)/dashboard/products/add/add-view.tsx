import PageHeader from "../../../page-header";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddForm from "./components/addForm";

export default async function AddProductView() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader iconBack Icon={ArrowBackIcon}>
        Створення товару
      </PageHeader>
      {/* <AddForm /> */}
    </div>
  );
}
