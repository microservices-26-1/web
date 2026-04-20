import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { exchangeApi } from "@/api/client";
import { ExchangeRate } from "@/types";

interface CurrencyContextValue {
  currency: string;
  setCurrency: (c: string) => void;
  rates: ExchangeRate[];
  format: (priceInUsd: number) => string;
  convert: (priceInUsd: number) => number;
}

const CurrencyContext = createContext<CurrencyContextValue | undefined>(undefined);
const STORAGE_KEY = "nimbus.currency";

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<string>(
    () => localStorage.getItem(STORAGE_KEY) ?? "USD"
  );
  const [rates, setRates] = useState<ExchangeRate[]>([]);

  useEffect(() => {
    exchangeApi.rates("USD").then(setRates).catch(() => setRates([]));
  }, []);

  const setCurrency = (c: string) => {
    setCurrencyState(c);
    localStorage.setItem(STORAGE_KEY, c);
  };

  const value = useMemo<CurrencyContextValue>(() => {
    const rate = rates.find((r) => r.target === currency)?.rate ?? 1;
    return {
      currency,
      setCurrency,
      rates,
      convert: (priceInUsd) => priceInUsd * rate,
      format: (priceInUsd) =>
        new Intl.NumberFormat(currency === "BRL" ? "pt-BR" : currency === "EUR" ? "de-DE" : "en-US", {
          style: "currency",
          currency,
          maximumFractionDigits: 2,
        }).format(priceInUsd * rate),
    };
  }, [currency, rates]);

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
}
