import { Product, Order, ExchangeRate, CartItem } from "@/types";

const API = "/api";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (!res.ok) {
    throw new Error(`API ${path} falhou [${res.status}]: ${await res.text()}`);
  }
  return res.json();
}

export const productApi = {
  list: () => request<Product[]>("/products"),
  get: (id: string) => request<Product>(`/products/${id}`),
  create: (product: Omit<Product, "id">) =>
    request<Product>("/products", { method: "POST", body: JSON.stringify(product) }),
  remove: (id: string) => request<void>(`/products/${id}`, { method: "DELETE" }),
};

export const orderApi = {
  list: () => request<Order[]>("/orders"),
  get: (id: string) => request<Order>(`/orders/${id}`),
  create: (items: CartItem[], currency: string) =>
    request<Order>("/orders", {
      method: "POST",
      body: JSON.stringify({ items, currency }),
    }),
};

export const exchangeApi = {
  get: (from: string, to: string) => request<ExchangeRate>(`/exchange/${from}/${to}`),
};