import { Card, CardContent } from "@mui/joy";
import { Rating } from "flowbite-react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCart } from "react-use-cart";
import Link from "next/link";

export default function CardCart({ cartProduct }: { cartProduct: any }) {
  const { removeItem, updateItemQuantity } = useCart();

  return (
    <Card
      orientation="horizontal"
      variant="outlined"
      sx={{ width: "100%", position: "relative" }}
    >
      <div className="ml-3 h-44 w-36">
        <img
          className={`h-full w-full rounded-lg object-contain`}
          src={cartProduct.img}
          loading="lazy"
          alt=""
        />
      </div>
      <CardContent>
        <Link prefetch={false} href={`/product/${cartProduct.id}`}>
          <div className="max-h-32 cursor-pointer overflow-y-hidden font-medium hover:underline">
            {cartProduct.title}
          </div>
        </Link>
        <Rating style={{ paddingBlock: "0.5rem" }}>
          <Rating.Star />
          {/* <p className="ml-2 text-sm font-bold dark:text-white">
            {cartProduct.rating}
          </p> */}
          <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />
          <a className="cursor-pointer text-sm font-medium dark:text-white">
            0 відгуків
          </a>
        </Rating>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-medium dark:text-white max-sm:text-lg">
            {/* {cartProduct.product.price} */}
            {cartProduct.itemTotal}.00 UAH
          </span>
        </div>
        <div className="mt-4 flex w-fit gap-4 rounded-full border border-gray-500 border-opacity-80 px-5 py-1 max-sm:text-sm">
          <div
            onClick={() =>
              updateItemQuantity(cartProduct.id, cartProduct.quantity - 1)
            }
            className={`cursor-pointer opacity-60 transition hover:opacity-40`}
          >
            -
          </div>
          <div className="max-sm:w-11 md:text-lg 2xl:text-xl">
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
        className="h-fit cursor-pointer rounded-lg border-2 border-blue-600 border-opacity-0 p-1 transition duration-300 hover:border-opacity-100 hover:text-blue-600 max-sm:absolute  max-sm:left-1 max-sm:top-1"
      >
        <DeleteIcon />
      </div>
    </Card>
  );
}
