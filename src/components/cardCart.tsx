import { Card, CardContent } from "@mui/joy";
import { Rating } from "flowbite-react";
import { useRouter } from "next/navigation";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { API_URL } from "@/config/api";
import { useCart } from "react-use-cart";
import Link from "next/link";

export default function CardCart({ cartProduct }: { cartProduct: any }) {
  const router = useRouter();

  const { removeItem, updateItemQuantity } = useCart();

  return (
    <Card
      orientation="horizontal"
      variant="outlined"
      sx={{ width: "100%", position: "relative" }}
    >
      <div className="h-44 w-36 ml-3">
        <img
          className={`w-full h-full object-contain rounded-lg`}
          src={cartProduct.img}
          loading="lazy"
          alt=""
        />
      </div>
      <CardContent>
        <Link href={`/product/${cartProduct.id}`}>
          <div className="cursor-pointer max-h-32 overflow-y-hidden font-medium hover:underline">
            {cartProduct.title}
          </div>
        </Link>
        <Rating style={{ paddingBlock: "0.5rem" }}>
          <Rating.Star />
          <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">
            {cartProduct.rating}
          </p>
          <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />
          <a className="text-sm cursor-pointer font-medium text-gray-900 underline hover:no-underline dark:text-white">
            0 відгуків
          </a>
        </Rating>
        <div className="flex items-center justify-between">
          <span className="text-2xl max-sm:text-lg font-medium text-gray-900 dark:text-white">
            {/* {cartProduct.product.price} */}
            {cartProduct.itemTotal}.00 UAH
          </span>
        </div>
        <div className="max-sm:text-sm mt-4 w-fit flex gap-4 rounded-full border border-gray-500 border-opacity-80 px-5 py-1">
          <div
            onClick={() =>
              updateItemQuantity(cartProduct.id, cartProduct.quantity - 1)
            }
            className={`cursor-pointer opacity-60 transition hover:opacity-40`}
          >
            -
          </div>
          <div className="md:text-lg max-sm:w-11 2xl:text-xl">
            {cartProduct.quantity} шт.
          </div>
          <div
            onClick={() =>
              updateItemQuantity(cartProduct.id, cartProduct.quantity + 1)
            }
            className={`cursor-pointer opacity-60 transition hover:opacity-40`}
          >
            +
          </div>
        </div>
      </CardContent>
      <div
        onClick={() => removeItem(cartProduct.id)}
        className="max-sm:absolute max-sm:top-1 max-sm:left-1 transition duration-300 hover:text-blue-600 cursor-pointer border-2 border-blue-600 border-opacity-0 hover:border-opacity-100 p-1  rounded-lg h-fit"
      >
        <DeleteIcon />
      </div>
    </Card>
  );
}
