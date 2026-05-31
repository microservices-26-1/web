import { Link } from "react-router-dom";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Forbidden() {
  return (
    <div className="container flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-16 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <ShieldAlert className="h-7 w-7 text-muted-foreground" />
      </div>
      <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Erro 403</p>
      <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        Acesso negado
      </h1>
      <p className="mt-3 max-w-md text-sm text-muted-foreground">
        Você está autenticado, mas não tem permissão para acessar este recurso.
        Caso acredite que isso é um engano, entre em contato com o suporte.
      </p>
      <div className="mt-8 flex gap-3">
        <Button asChild variant="outline">
          <Link to="/">Voltar à vitrine</Link>
        </Button>
        <Button asChild>
          <Link to="/orders">Meus pedidos</Link>
        </Button>
      </div>
    </div>
  );
}
