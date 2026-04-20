export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // in base currency (USD)
  currency: string;
  stock: number;
  category: string;
  image: string;
  rating?: number;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export type OrderStatus = "pending" | "paid" | "shipped" | "delivered" | "cancelled";

export interface OrderLine {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  createdAt: string;
  status: OrderStatus;
  currency: string;
  total: number;
  lines: OrderLine[];
}

export interface ExchangeRate {
  base: string;
  target: string;
  rate: number;
}
