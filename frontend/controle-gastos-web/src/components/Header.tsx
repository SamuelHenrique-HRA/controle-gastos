import { Link } from "react-router-dom";

/**
 * Menu de navegação principal
 */
export default function Header() {
  return (
    <nav style={{ padding: 16, borderBottom: "1px solid #ccc" }}>
      <Link to="/pessoas">Pessoas</Link> |{" "}
      <Link to="/categorias">Categorias</Link> |{" "}
      <Link to="/transacoes">Transações</Link> |{" "}
      <Link to="/relatorios">Relatórios</Link>
    </nav>
  );
}
