import Pessoas from "./pages/Pessoas";
import Categorias from "./pages/Categorias";
import Transacoes from "./pages/Transacoes";
import Relatorios from "./pages/Relatorios";

export default function App() {
  return (
    <div>
      <nav>
        <a href="/">Pessoas</a> |{" "}
        <a href="/categorias">Categorias</a> |{" "}
        <a href="/transacoes">Transações</a> |{" "}
        <a href="/relatorios">Relatórios</a>
      </nav>

      {/* Roteamento simples */}
      {window.location.pathname === "/" && <Pessoas />}
      {window.location.pathname === "/categorias" && <Categorias />}
      {window.location.pathname === "/transacoes" && <Transacoes />}
      {window.location.pathname === "/relatorios" && <Relatorios />}
    </div>
  );
}
