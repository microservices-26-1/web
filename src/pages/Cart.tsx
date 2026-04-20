import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react";
import { productApi, orderApi } from "@/api/client";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Cart = () => {
  const navigate = useNavigate();
  const { items, setQuantity, remove, clear } = useCart();
  const { format, currency } = useCurrency();
  const [placing, setPlacing] = useState(false);

  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: productApi.list,
  });

  const checkout = useMutation({
    mutationFn: () => orderApi.create(items, currency),
    onSuccess: (order) => {
      clear();
      toast.success("Pedido confirmado!", {
        description: `#${order.id} criado com sucesso.`,
      });
      navigate("/orders");
    },
    onError: (err) =>
      toast.error("Falha ao criar pedido", { description: (err as Error).message }),
    onSettled: () => setPlacing(false),
  });

  const lines =
    products && items.length
      ? items
          .map((item) => {
            const p = products.find((x) => x.id === item.productId);
            return p ? { ...p, quantity: item.quantity } : null;
          })
          .filter(Boolean)
      : [];

  const subtotal = lines.reduce((s, l) => s + (l!.price * l!.quantity), 0);
  const shipping = subtotal > 200 || subtotal === 0 ? 0 : 15;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="container py-20 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <ShoppingBag className="h-7 w-7 text-muted-foreground" />
        </div>
        <h1 className="mt-6 font-display text-2xl font-semibold">Seu carrinho está vazio</h1>
        <p className="mt-2 text-muted-foreground">
          Explore o catálogo e adicione produtos para continuar.
        </p>
        <Button asChild className="mt-8 rounded-full px-6">
          <Link to="/">Ver catálogo</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-10 md:py-16">
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Continuar comprando
      </Link>

      <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
        Carrinho
      </h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
        <ul className="divide-y divide-border/60 rounded-2xl border border-border/60 bg-card">
          {lines.map((l) => (
            <li key={l!.id} className="flex gap-4 p-4 sm:p-5">
              <Link
                to={`/product/${l!.id}`}
                className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-subtle sm:h-28 sm:w-28"
              >
                <img
                  src={l!.image}
                  alt={l!.name}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </Link>
              <div className="flex flex-1 flex-col justify-between gap-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      {l!.category}
                    </p>
                    <Link
                      to={`/product/${l!.id}`}
                      className="font-medium hover:underline"
                    >
                      {l!.name}
                    </Link>
                  </div>
                  <button
                    onClick={() => remove(l!.id)}
                    className="text-muted-foreground transition-colors hover:text-destructive"
                    aria-label="Remover"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center rounded-full border border-border/60">
                    <button
                      onClick={() => setQuantity(l!.id, l!.quantity - 1)}
                      className="flex h-8 w-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                      aria-label="Diminuir"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm tabular-nums">
                      {l!.quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(l!.id, l!.quantity + 1)}
                      className="flex h-8 w-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                      aria-label="Aumentar"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <p className="font-medium tabular-nums">
                    {format(l!.price * l!.quantity)}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit space-y-4 rounded-2xl border border-border/60 bg-card p-6">
          <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            Resumo
          </h2>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd className="tabular-nums">{format(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Frete</dt>
              <dd className="tabular-nums">
                {shipping === 0 ? "Grátis" : format(shipping)}
              </dd>
            </div>
          </dl>
          <div className="flex justify-between border-t border-border/60 pt-4 text-base font-semibold">
            <span>Total</span>
            <span className="tabular-nums">{format(total)}</span>
          </div>
          <Button
            size="lg"
            className="mt-2 w-full rounded-full"
            disabled={placing || checkout.isPending}
            onClick={() => {
              setPlacing(true);
              checkout.mutate();
            }}
          >
            {checkout.isPending ? "Processando..." : "Finalizar compra"}
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Pagamento simulado · integração com Order API
          </p>
        </aside>
      </div>
    </div>
  );
};

export default Cart;
