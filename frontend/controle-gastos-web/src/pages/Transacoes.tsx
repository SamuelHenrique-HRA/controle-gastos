import { useEffect, useState } from "react";
import api from "../api/api";
import type { Pessoa } from "../types/Pessoa";
import type { Categoria } from "../types/Categoria";
import type { Transacao } from "../types/Transacao";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

/**
 * Tela de cadastro e listagem de transações.
 *
 * Regras aplicadas:
 * - Menores de idade NÃO podem cadastrar receitas
 * - Categoria deve ser compatível com o tipo da transação
 * - Valor deve ser maior que zero
 * - Contrato respeita ENUM numérico do backend
 */
export default function Transacoes() {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState<number>(0);
  const [tipo, setTipo] = useState<number>(1); // 1 = Despesa | 2 = Receita
  const [pessoaId, setPessoaId] = useState<number>(0);
  const [categoriaId, setCategoriaId] = useState<number>(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /**
   * Carrega pessoas, categorias e transações
   */
  async function carregarDados() {
    try {
      const [pessoasRes, categoriasRes, transacoesRes] = await Promise.all([
        api.get<Pessoa[]>("/Pessoa"),
        api.get<Categoria[]>("/Categoria"),
        api.get<Transacao[]>("/Transacao"),
      ]);

      setPessoas(pessoasRes.data);
      setCategorias(categoriasRes.data);
      setTransacoes(transacoesRes.data);
    } catch {
      setError("Erro ao carregar dados.");
    } finally {
      setLoading(false);
    }
  }

  /**
   * Verifica se a pessoa selecionada é menor de idade
   */
  function pessoaMenorDeIdade(): boolean {
    const pessoa = pessoas.find((p) => p.id === pessoaId);
    return pessoa ? pessoa.idade < 18 : false;
  }

  /**
   * Retorna apenas categorias compatíveis com o tipo selecionado
   */
  function categoriasPermitidas() {
    return categorias.filter((c) => {
      if (tipo === 1) return c.finalidade === 1 || c.finalidade === 3;
      if (tipo === 2) return c.finalidade === 2 || c.finalidade === 3;
      return false;
    });
  }

  /**
   * Cria uma nova transação respeitando todas as regras
   */
  async function criarTransacao() {
    if (!descricao || valor <= 0 || !pessoaId || !categoriaId) {
      setError("Preencha todos os campos corretamente.");
      return;
    }

    if (pessoaMenorDeIdade() && tipo === 2) {
      setError("Menores de idade não podem cadastrar receitas.");
      return;
    }

    try {
      setError("");

      await api.post("/Transacao", {
        descricao,
        valor,
        tipo,        // ENUM numérico
        pessoaId,    // FK válida
        categoriaId // FK válida
      });

      // Limpa formulário
      setDescricao("");
      setValor(0);
      setCategoriaId(0);

      carregarDados();
    } catch {
      setError("Erro ao cadastrar transação.");
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

  if (loading) return <Loading />;

  return (
    <div>
      <h2>Transações</h2>

      {error && <ErrorMessage message={error} />}

      {/* Formulário */}
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />

        <input
          type="number"
          placeholder="Valor"
          value={valor || ""}
          onChange={(e) => setValor(Number(e.target.value))}
        />

        <select value={tipo} onChange={(e) => setTipo(Number(e.target.value))}>
          <option value={1}>Despesa</option>
          <option value={2}>Receita</option>
        </select>

        <select value={pessoaId} onChange={(e) => setPessoaId(Number(e.target.value))}>
          <option value={0}>Selecione a pessoa</option>
          {pessoas.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nome} ({p.idade} anos)
            </option>
          ))}
        </select>

        <select
          value={categoriaId}
          onChange={(e) => setCategoriaId(Number(e.target.value))}
        >
          <option value={0}>Selecione a categoria</option>
          {categoriasPermitidas().map((c) => (
            <option key={c.id} value={c.id}>
              {c.descricao}
            </option>
          ))}
        </select>

        <button onClick={criarTransacao}>Adicionar</button>
      </div>

      {/* Listagem */}
      <ul>
        {transacoes.map((t) => (
          <li key={t.id}>
            {t.descricao} — R$ {t.valor.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}
