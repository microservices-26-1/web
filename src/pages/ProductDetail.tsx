import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Check, ShoppingBag, Star } from "lucide-react";
import { productApi } from "@/api/client";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const { add } = useCart();
  const { format } = useCurrency();

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => productApi.get(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (product) document.title = `${product.name} — Maison Doce`;
  }, [product]);

  if (isLoading) {
    return (
      <div className="container py-16">
        <div className="grid gap-12 md:grid-cols-2">
          <div className="aspect-square animate-pulse rounded-2xl bg-muted" />
          <div className="space-y-4">
            <div className="h-4 w-24 animate-pulse rounded bg-muted" />
            <div className="h-10 w-3/4 animate-pulse rounded bg-muted" />
            <div className="h-24 w-full animate-pulse rounded bg-muted" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-24 text-center">
        <h1 className="text-2xl font-semibold">Doce não encontrado</h1>
        <Button asChild className="mt-6 rounded-full">
          <Link to="/">Voltar à vitrine</Link>
        </Button>
      </div>
    );
  }

  const handleAdd = () => {
    add(product.id);
    toast.success(`${product.name} adicionado ao carrinho`);
  };

  const handleBuy = () => {
    add(product.id);
    navigate("/cart");
  };

  return (
    <div className="container py-10 md:py-16">
      <Link
        to="/"
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Vitrine
      </Link>

      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <div className="overflow-hidden rounded-3xl border border-border/60 bg-subtle">
          <img
            src={product.image}
            alt={product.name}
            width={768}
            height={768}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col">
          <span className="text-xs uppercase tracking-wide text-muted-foreground">
            {product.category}
          </span>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight md:text-4xl">
            {product.name}
          </h1>

          {product.rating && (
            <div className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground">
              <Star className="h-4 w-4 fill-foreground text-foreground" />
              <span className="font-medium text-foreground">{product.rating}</span>
              <span>· avaliações verificadas</span>
            </div>
          )}

          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <div className="mt-8 flex items-baseline gap-3">
            <span className="text-3xl font-semibold tabular-nums">
              {format(product.price)}
            </span>
            <span className="text-sm text-muted-foreground">à vista</span>
          </div>

          <div className="mt-2 flex items-center gap-2 text-sm">
            {product.stock > 0 ? (
              <>
                <Check className="h-4 w-4 text-success" />
                <span className="text-muted-foreground">
                  {product.stock} unidades disponíveis hoje
                </span>
              </>
            ) : (
              <span className="text-destructive">Esgotado por hoje</span>
            )}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              onClick={handleBuy}
              disabled={product.stock === 0}
              className="rounded-full px-8"
            >
              Comprar agora
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleAdd}
              disabled={product.stock === 0}
              className="rounded-full px-8"
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              Adicionar ao carrinho
            </Button>
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-border/60 pt-8 text-sm">
            <div>
              <dt className="text-muted-foreground">Código</dt>
              <dd className="mt-1 font-mono">{product.id}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Validade</dt>
              <dd className="mt-1">Até 5 dias refrigerado</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Entrega</dt>
              <dd className="mt-1">Grátis acima de R$ 150</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Preparo</dt>
              <dd className="mt-1">Feito no dia do pedido</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
