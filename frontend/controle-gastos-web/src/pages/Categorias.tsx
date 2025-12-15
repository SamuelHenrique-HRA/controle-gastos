import { useEffect, useState } from "react";
import api from "../api/api";
import type { Categoria } from "../types/Categoria";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

/**
 * Tela responsável pelo cadastro e listagem de categorias.
 * Cada categoria possui uma FINALIDADE:
 * 1 - Despesa
 * 2 - Receita
 * 3 - Ambas
 *
 * Essa informação será usada posteriormente
 * para validar o tipo das transações.
 */
export default function Categorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [descricao, setDescricao] = useState("");
  const [finalidade, setFinalidade] = useState<number>(1); // 1 = Despesa

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /**
   * Busca todas as categorias cadastradas na API
   */
  async function carregarCategorias() {
    try {
      setLoading(true);
      const response = await api.get<Categoria[]>("/Categoria");
      setCategorias(response.data);
    } catch {
      setError("Erro ao carregar categorias.");
    } finally {
      setLoading(false);
    }
  }

  /**
   * Cria uma nova categoria respeitando
   * o contrato esperado pelo backend (ENUM numérico)
   */
  async function criarCategoria() {
    if (!descricao.trim()) {
      setError("A descrição da categoria é obrigatória.");
      return;
    }

    try {
      setError("");

      await api.post("/Categoria", {
        descricao,
        finalidade, // enviado como número (enum)
      });

      // Limpa formulário após sucesso
      setDescricao("");
      setFinalidade(1);

      // Atualiza listagem
      carregarCategorias();
    } catch {
      setError("Erro ao cadastrar categoria.");
    }
  }

  useEffect(() => {
    carregarCategorias();
  }, []);

  return (
    <div>
      <h2>Categorias</h2>

      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}

      {/* Formulário de cadastro */}
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Descrição da categoria"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />

        <select
          value={finalidade}
          onChange={(e) => setFinalidade(Number(e.target.value))}
        >
          <option value={1}>Despesa</option>
          <option value={2}>Receita</option>
          <option value={3}>Ambas</option>
        </select>

        <button onClick={criarCategoria}>Adicionar</button>
      </div>

      {/* Listagem de categorias */}
      <ul>
        {categorias.map((categoria) => (
          <li key={categoria.id}>
            {categoria.descricao} —{" "}
            <strong>
              {categoria.finalidade === 1 && "Despesa"}
              {categoria.finalidade === 2 && "Receita"}
              {categoria.finalidade === 3 && "Ambas"}
            </strong>
          </li>
        ))}
      </ul>
    </div>
  );
}
