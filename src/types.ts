export type Product = {
  id: string;
  unique_id: string;
  title: string;
  price: number;
  quantity?: number;
  barcode?: string;
  artycul?: string;
  discount?: number;
  rating?: string;
  img?: string;
  availability: "in stock" | "out of stock";
  description?: string;
  breadcrumbs?: string;
  country?: string;
  brand?: string;
  info: JSON[];
  reviews?: Review[];
  cartProducts?: [];
  orderProducts?: [];
  createdAt?: Date;
  updatedAt?: Date;
};

export type Review = {
  id: string;
  text: string;
  rating: string | number;
  user?: { name: string };
  userId: string;
  product?: {};
  productId: string;
  createdAt: Date;
  updatedAt: Date;
};
