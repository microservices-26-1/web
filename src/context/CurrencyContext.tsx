import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { exchangeApi } from "@/api/client";

interface CurrencyContextValue {
  currency: string;
  setCurrency: (c: string) => void;
  format: (priceInBrl: number) => string;
  convert: (priceInBrl: number) => number;
}

const BASE = "BRL";
const TARGETS = ["BRL", "USD", "EUR"];
const STORAGE_KEY = "doceria.currency";

const CurrencyContext = createContext<CurrencyContextValue | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<string>(
    () => localStorage.getItem(STORAGE_KEY) ?? BASE
  );
  const [rates, setRates] = useState<Record<string, number>>({ BRL: 1 });

  useEffect(() => {
    Promise.all(
      TARGETS.map((t) =>
        exchangeApi.get(BASE, t).then((r) => [t, r.rate] as const).catch(() => [t, 1] as const)
      )
    ).then((entries) => setRates(Object.fromEntries(entries)));
  }, []);

  const setCurrency = (c: string) => {
    setCurrencyState(c);
    localStorage.setItem(STORAGE_KEY, c);
  };

  const value = useMemo<CurrencyContextValue>(() => {
    const rate = rates[currency] ?? 1;
    return {
      currency,
      setCurrency,
      convert: (priceInBrl) => priceInBrl * rate,
      format: (priceInBrl) =>
        new Intl.NumberFormat(
          currency === "BRL" ? "pt-BR" : currency === "EUR" ? "de-DE" : "en-US",
          { style: "currency", currency, maximumFractionDigits: 2 }
        ).format(priceInBrl * rate),
    };
  }, [currency, rates]);

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
}
