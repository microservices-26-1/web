import { Link } from "react-router-dom";
import { Product } from "@/types";
import { useCurrency } from "@/context/CurrencyContext";

interface Props {
  product: Product;
}

export function ProductCard({ product }: Props) {
  const { format } = useCurrency();
  const lowStock = product.stock > 0 && product.stock <= 5;

  return (
    <Link
      to={`/product/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition-all duration-300 ease-smooth hover:border-border hover:shadow-md"
    >
      <div className="relative aspect-square overflow-hidden bg-subtle">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={768}
          height={768}
          className="h-full w-full object-cover transition-transform duration-500 ease-smooth group-hover:scale-[1.03]"
        />
        {product.stock === 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-foreground/90 px-2.5 py-1 text-xs font-medium text-background">
            Esgotado
          </span>
        )}
        {lowStock && (
          <span className="absolute left-3 top-3 rounded-full bg-warning px-2.5 py-1 text-xs font-medium text-warning-foreground">
            Últimas {product.stock} un.
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <span className="text-xs uppercase tracking-wide text-muted-foreground">
          {product.category}
        </span>
        <h3 className="text-base font-medium text-foreground">{product.name}</h3>
        <p className="mt-2 text-base font-semibold tabular-nums">
          {format(product.price)}
        </p>
      </div>
    </Link>
  );
}
