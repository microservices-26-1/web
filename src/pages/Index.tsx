import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { productApi } from "@/api/client";
import { ProductCard } from "@/components/ProductCard";
import { ProductGridSkeleton } from "@/components/ProductCardSkeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero.jpg";

const Index = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: productApi.list,
  });

  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("Todos");

  const categories = useMemo(() => {
    const set = new Set<string>();
    products?.forEach((p) => set.add(p.category));
    return ["Todos", ...Array.from(set)];
  }, [products]);

  const filtered = useMemo(() => {
    return (products ?? []).filter((p) => {
      const matchesQ = p.name.toLowerCase().includes(query.toLowerCase());
      const matchesCat = activeCategory === "Todos" || p.category === activeCategory;
      return matchesQ && matchesCat;
    });
  }, [products, query, activeCategory]);

  useEffect(() => {
    document.title = "Nimbus — Loja de tecnologia minimalista";
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-hero">
        <div className="container grid gap-10 py-16 md:grid-cols-2 md:items-center md:py-24">
          <div className="space-y-6 animate-fade-in">
            <span className="inline-flex items-center rounded-full border border-border/60 bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground">
              Nova coleção · Outono
            </span>
            <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
              Tecnologia que<br />simplesmente funciona.
            </h1>
            <p className="max-w-md text-base text-muted-foreground md:text-lg">
              Áudio, wearables e computadores de alto desempenho — selecionados com cuidado,
              entregues sem complicação.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full px-6">
                <a href="#catalog">
                  Ver catálogo
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-6">
                <Link to="/orders">Meus pedidos</Link>
              </Button>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border/60 shadow-lg">
            <img
              src={heroImg}
              alt="Coleção de produtos de tecnologia Nimbus"
              width={1536}
              height={768}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Catálogo */}
      <section id="catalog" className="container py-16 md:py-20">
        <div className="mb-8 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
              Catálogo
            </h2>
            <p className="mt-2 text-muted-foreground">
              {filtered.length} produto{filtered.length === 1 ? "" : "s"} disponíveis
            </p>
          </div>
          <div className="flex w-full max-w-md gap-2 md:w-80">
            <Input
              placeholder="Buscar produtos..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-10 rounded-full border-border/60 bg-card"
            />
          </div>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`rounded-full border px-4 py-1.5 text-sm transition-all ${
                activeCategory === c
                  ? "border-foreground bg-foreground text-background"
                  : "border-border/60 bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {isLoading ? (
          <ProductGridSkeleton />
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border py-16 text-center text-muted-foreground">
            Nenhum produto encontrado.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Index;
