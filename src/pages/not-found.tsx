import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <p className="text-xl text-muted-foreground mb-8">Página não encontrada</p>
      <Link href="/" className="text-primary hover:underline">
        Voltar para o inicio
      </Link>
    </div>
  );
}
