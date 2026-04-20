import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShoppingBag, Package, LogOut, LogIn } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function Header() {
  const { count } = useCart();
  const { currency, setCurrency } = useCurrency();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm transition-colors ${
      isActive ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
    }`;

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-foreground" aria-hidden />
          <span className="font-display text-lg font-semibold tracking-tight">Nimbus</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <NavLink to="/" end className={navClass}>
            Catálogo
          </NavLink>
          <NavLink to="/orders" className={navClass}>
            Pedidos
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <Select value={currency} onValueChange={setCurrency}>
            <SelectTrigger className="h-9 w-[88px] border-border/60 bg-transparent text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">USD</SelectItem>
              <SelectItem value="BRL">BRL</SelectItem>
              <SelectItem value="EUR">EUR</SelectItem>
            </SelectContent>
          </Select>

          <Link
            to="/orders"
            className="hidden h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:inline-flex"
            aria-label="Pedidos"
          >
            <Package className="h-[18px] w-[18px]" />
          </Link>

          <Link
            to="/cart"
            className="relative inline-flex h-9 items-center gap-2 rounded-md px-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label={`Carrinho com ${count} itens`}
          >
            <ShoppingBag className="h-[18px] w-[18px]" />
            <span className="font-medium">{count}</span>
          </Link>

          {user ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
              className="h-9 gap-1.5 text-muted-foreground hover:text-foreground"
              aria-label="Sair"
            >
              <LogOut className="h-[16px] w-[16px]" />
              <span className="hidden sm:inline">Sair</span>
            </Button>
          ) : (
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="h-9 gap-1.5 text-muted-foreground hover:text-foreground"
            >
              <Link to="/login" aria-label="Entrar">
                <LogIn className="h-[16px] w-[16px]" />
                <span className="hidden sm:inline">Entrar</span>
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
