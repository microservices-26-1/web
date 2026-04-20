export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 py-10">
      <div className="container flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
        <p>© {new Date().getFullYear()} Nimbus. Demo de e-commerce com microserviços.</p>
        <p className="font-mono text-xs">
          Product API · Order API · Exchange API
        </p>
      </div>
    </footer>
  );
}
