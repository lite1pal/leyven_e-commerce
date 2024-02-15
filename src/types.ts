export type Product = {
  id: string;
  unique_id: string;
  unique_id_1c: string;
  title: string;
  price: number;
  categoryId: string;
  quantity: number;
  barcode?: string;
  artycul?: string;
  discount: number;
  rating?: string;
  img: string;
  images: string[];
  availability: "in stock" | "out of stock";
  keywords?: string;
  description: string;
  breadcrumbs: string;
  country?: string;
  brand?: string;
  info: JSON[];
  reviews?: Review[];
  cartProducts?: [];
  orderProducts?: [];
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
