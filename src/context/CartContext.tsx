import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { CartItem } from "@/types";

const API = "/api";

interface CartContextValue {
  items: CartItem[];
  add: (productId: string, quantity?: number) => void;
  remove: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
  count: number;
  checkout: () => Promise<{ error: string | null }>;  // ← novo
}

const CartContext = createContext<CartContextValue | undefined>(undefined);
const STORAGE_KEY = "doceria.cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      add: (productId, quantity = 1) =>
        setItems((prev) => {
          const existing = prev.find((i) => i.productId === productId);
          if (existing) {
            return prev.map((i) =>
              i.productId === productId ? { ...i, quantity: i.quantity + quantity } : i
            );
          }
          return [...prev, { productId, quantity }];
        }),
      remove: (productId) =>
        setItems((prev) => prev.filter((i) => i.productId !== productId)),
      setQuantity: (productId, quantity) =>
        setItems((prev) =>
          quantity <= 0
            ? prev.filter((i) => i.productId !== productId)
            : prev.map((i) => (i.productId === productId ? { ...i, quantity } : i))
        ),
      clear: () => setItems([]),
      count: items.reduce((s, i) => s + i.quantity, 0),

      checkout: async () => {                          // ← novo
        try {
          const res = await fetch(`${API}/orders`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              items: items.map((i) => ({
                idProduct: i.productId,
                quantity: i.quantity,
              })),
            }),
          });
          if (!res.ok) return { error: "Erro ao finalizar pedido" };
          setItems([]);                                // limpa o carrinho após sucesso
          return { error: null };
        } catch {
          return { error: "Erro de conexão" };
        }
      },
    }),
    [items]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}