import { API_CONFIG, USE_MOCKS } from "./config";
import { Product, Order, ExchangeRate, CartItem } from "@/types";
import { mockProducts, mockOrders, mockRates } from "./mocks";

const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

async function request<T>(baseUrl: string, path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${baseUrl}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (!res.ok) {
    throw new Error(`API ${baseUrl}${path} failed [${res.status}]: ${await res.text()}`);
  }
  return res.json();
}

/* -------------------- Product API -------------------- */
export const productApi = {
  async list(): Promise<Product[]> {
    if (USE_MOCKS) {
      await delay();
      return mockProducts;
    }
    return request<Product[]>(API_CONFIG.productApi, "/products");
  },
  async get(id: string): Promise<Product | undefined> {
    if (USE_MOCKS) {
      await delay();
      return mockProducts.find((p) => p.id === id);
    }
    return request<Product>(API_CONFIG.productApi, `/products/${id}`);
  },
};

/* -------------------- Order API -------------------- */
export const orderApi = {
  async list(): Promise<Order[]> {
    if (USE_MOCKS) {
      await delay();
      const local = JSON.parse(localStorage.getItem("nimbus.orders") ?? "[]") as Order[];
      return [...local, ...mockOrders];
    }
    return request<Order[]>(API_CONFIG.orderApi, "/orders");
  },
  async create(items: CartItem[], currency: string): Promise<Order> {
    if (USE_MOCKS) {
      await delay(500);
      const products = await productApi.list();
      const lines = items
        .map((it) => {
          const p = products.find((x) => x.id === it.productId)!;
          return {
            productId: p.id,
            productName: p.name,
            quantity: it.quantity,
            unitPrice: p.price,
          };
        });
      const total = lines.reduce((s, l) => s + l.unitPrice * l.quantity, 0);
      const order: Order = {
        id: `ord-${Math.floor(1000 + Math.random() * 9000)}`,
        createdAt: new Date().toISOString(),
        status: "paid",
        currency,
        total,
        lines,
      };
      const local = JSON.parse(localStorage.getItem("nimbus.orders") ?? "[]") as Order[];
      localStorage.setItem("nimbus.orders", JSON.stringify([order, ...local]));
      return order;
    }
    return request<Order>(API_CONFIG.orderApi, "/orders", {
      method: "POST",
      body: JSON.stringify({ items, currency }),
    });
  },
};

/* -------------------- Exchange API -------------------- */
export const exchangeApi = {
  async rates(base = "USD"): Promise<ExchangeRate[]> {
    if (USE_MOCKS) {
      await delay(150);
      return mockRates.filter((r) => r.base === base);
    }
    return request<ExchangeRate[]>(API_CONFIG.exchangeApi, `/rates?base=${base}`);
  },
};
