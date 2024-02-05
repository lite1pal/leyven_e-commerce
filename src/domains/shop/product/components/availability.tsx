import { type Product } from "@/types";
import UnarchiveIcon from "@mui/icons-material/Unarchive";

export default function ProductAvailability({ data }: { data: Product }) {
  return (
    <div className="flex items-center gap-1 text-xs sm:text-base">
      {data.availability === "in stock" ? (
        <>
          {/* <UnarchiveIcon color="success" fontSize="small" /> */}
          <div className="text-green-500">В наявності</div>
        </>
      ) : (
        <div className="text-slate-500">Немає на складі</div>
      )}
    </div>
  );
}
