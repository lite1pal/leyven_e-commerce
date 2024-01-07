type Product = {
  id: string;
  title: string;
  discount: number;
  rating: string;
  img: string;
  availability: "instock" | "out of stock";
  description: string;
  breadcrumbs: string;
  country: string;
  brand: string;
  info: JSON[];
  reviews?: [];
  cartProducts?: [];
  orderProducts?: [];
};

type Review = {
  id: string;
  text: string;
  rating: string | number;
  user?: {};
  userId: string;
  product?: {};
  productId: string;
  createdAt: Date;
  updatedAt: Date;
};
