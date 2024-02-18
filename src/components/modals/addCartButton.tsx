import { type Product } from "@/types";
import { useCart } from "react-use-cart";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function AddCartButton({ data }: { data: Product }) {
  const { addItem, inCart } = useCart();

  return (
    <button
      onClick={() => {
        addItem(data);
        (document.getElementById("cartModal") as HTMLFormElement).showModal();
      }}
      className={`${
        inCart(data.id) &&
        "border-emerald-600 bg-emerald-600 hover:text-emerald-600"
      } ${
        data.availability === "out of stock" &&
        "pointer-events-none border-slate-500 bg-slate-500"
      } rounded border-2 border-blue-600 bg-blue-600 p-2.5 text-center text-sm font-medium text-white transition hover:bg-white hover:text-blue-600 focus:outline-none focus:ring-0 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 max-sm:p-1 lg:p-1.5`}
    >
      {inCart(data.id) ? (
        <ShoppingCartIcon fontSize="small" />
      ) : (
        <AddShoppingCartIcon fontSize="small" />
      )}
    </button>
  );
}
