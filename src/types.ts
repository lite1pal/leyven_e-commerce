export type Product = {
  id: string;
  title: string;
  price: number;
  discount: number;
  rating: string;
  img: string;
  availability: "in stock" | "out of stock";
  description: string;
  breadcrumbs: string;
  country: string;
  brand: string;
  info: JSON[];
  reviews?: Review[];
  cartProducts?: [];
  orderProducts?: [];
};

export type Review = {
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
