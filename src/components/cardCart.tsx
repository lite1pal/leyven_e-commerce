import { Card, CardContent } from "@mui/joy";
import { Rating } from "flowbite-react";
import { useRouter } from "next/navigation";
import CloseIcon from "@mui/icons-material/Close";
import { API_URL } from "@/config/api";
import { useCart } from "react-use-cart";

export default function CardCart({ cartProduct }: { cartProduct: any }) {
  const router = useRouter();

  const { removeItem, updateItemQuantity } = useCart();

  return (
    <Card
      key={cartProduct.id}
      orientation="horizontal"
      variant="outlined"
      sx={{ width: "100%" }}
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
        <div
          onClick={() => router.push(`/product/${cartProduct.id}`)}
          className="cursor-pointer font-medium hover:underline"
        >
          {cartProduct.title}
        </div>
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
        <div className="mt-4 w-fit flex gap-4 rounded-full border border-gray-500 border-opacity-80 px-5 py-1">
          <div
            onClick={() =>
              updateItemQuantity(cartProduct.id, cartProduct.quantity - 1)
            }
            className={`cursor-pointer opacity-60 transition hover:opacity-40`}
          >
            -
          </div>
          <div className="md:text-lg 2xl:text-xl">
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
        className="p-1 cursor-pointer transition rounded-lg hover:bg-slate-200 h-fit"
      >
        <CloseIcon />
      </div>
    </Card>
  );
}
