import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Package } from "lucide-react";
import { orderApi } from "@/api/client";
import { useCurrency } from "@/context/CurrencyContext";
import { Button } from "@/components/ui/button";
import { OrderStatus } from "@/types";

const statusLabel: Record<OrderStatus, string> = {
  pending: "Pendente",
  paid: "Pago",
  shipped: "Enviado",
  delivered: "Entregue",
  cancelled: "Cancelado",
};

const statusClasses: Record<OrderStatus, string> = {
  pending: "bg-warning/15 text-warning-foreground border-warning/30 text-warning",
  paid: "bg-foreground/5 text-foreground border-border",
  shipped: "bg-foreground/5 text-foreground border-border",
  delivered: "bg-success/10 text-success border-success/30",
  cancelled: "bg-destructive/10 text-destructive border-destructive/30",
};

const Orders = () => {
  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: orderApi.list,
  });
  const { format } = useCurrency();

  useEffect(() => {
    document.title = "Meus pedidos — Maison Doce";
  }, []);

  return (
    <div className="container py-10 md:py-16">
      <header className="mb-10 flex flex-col gap-2">
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Meus pedidos
        </h1>
        <p className="text-muted-foreground">
          Acompanhe o status dos pedidos consumidos da Order API.
        </p>
      </header>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-28 animate-pulse rounded-2xl bg-muted" />
          ))}
        </div>
      ) : !orders || orders.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border py-16 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <Package className="h-5 w-5 text-muted-foreground" />
          </div>
          <p className="mt-4 text-muted-foreground">Você ainda não fez nenhum pedido.</p>
          <Button asChild className="mt-6 rounded-full">
            <Link to="/">Ver vitrine</Link>
          </Button>
        </div>
      ) : (
        <ul className="space-y-3">
          {orders.map((o) => (
            <li
              key={o.id}
              className="rounded-2xl border border-border/60 bg-card p-5 transition-colors hover:border-border"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Pedido</p>
                  <p className="font-mono text-sm font-medium">#{o.id}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Data</p>
                  <p className="text-sm">
                    {new Date(o.createdAt).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total</p>
                  <p className="text-sm font-semibold tabular-nums">
                    {format(o.total)}
                  </p>
                </div>
                <span
                  className={`self-center rounded-full border px-3 py-1 text-xs font-medium ${statusClasses[o.status]}`}
                >
                  {statusLabel[o.status]}
                </span>
              </div>
              <div className="mt-4 border-t border-border/60 pt-4">
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  {o.lines.map((l) => (
                    <li key={l.productId} className="flex justify-between gap-4">
                      <span>
                        {l.quantity}× {l.productName}
                      </span>
                      <span className="tabular-nums">
                        {format(l.unitPrice * l.quantity)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Orders;
