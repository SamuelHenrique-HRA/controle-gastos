import { useEffect, useState } from "react";
import api from "../api/api";
import type { RelatorioTotaisPorPessoa } from "../types/RelatorioPessoa";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

export default function Relatorios() {
  const [relatorio, setRelatorio] = useState<RelatorioTotaisPorPessoa | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function carregarRelatorio() {
    try {
      const response = await api.get<RelatorioTotaisPorPessoa>(
        "/Relatorios/totais-por-pessoa"
      );
      setRelatorio(response.data);
    } catch {
      setError("Erro ao carregar relatório.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarRelatorio();
  }, []);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!relatorio) return null;

  return (
    <div>
      <h2>Relatórios por Pessoa</h2>

      <ul>
        {relatorio.pessoas.map((p) => (
          <li key={p.pessoaId}>
            <strong>{p.nome}</strong> —  
            Receitas: R$ {p.totalReceitas.toFixed(2)} |  
            Despesas: R$ {p.totalDespesas.toFixed(2)} |  
            Saldo: R$ {p.saldo.toFixed(2)}
          </li>
        ))}
      </ul>

      <hr />

      <h3>Total Geral</h3>
      <p>Receitas: R$ {relatorio.totalGeral.totalReceitas.toFixed(2)}</p>
      <p>Despesas: R$ {relatorio.totalGeral.totalDespesas.toFixed(2)}</p>
      <p>
        <strong>Saldo: R$ {relatorio.totalGeral.saldo.toFixed(2)}</strong>
      </p>
    </div>
  );
}
