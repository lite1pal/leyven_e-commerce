import CardSearch from "@/components/cards/cardSearch";
import { type Product } from "@/types";

export default function SearchResults({ data }: { data: Product[] }) {
  return (
    <>
      {data.length > 0 && (
        <div className="min-h-96 flex flex-col gap-2 bg-white p-5">
          {data.map((product) => {
            return <CardSearch key={product.id} data={product} />;
          })}
        </div>
      )}
    </>
  );
}
