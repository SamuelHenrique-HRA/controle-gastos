import { useEffect, useState } from "react";
import  api  from "../api/api";
import type { Pessoa } from "../types/Pessoa";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

/**
 * Página responsável pelo cadastro e listagem de pessoas.
 * Regras atendidas:
 * - Criação
 * - Listagem
 * - Deleção
 * - Exclusão em cascata das transações (regra aplicada no backend)
 */
export default function Pessoas() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  /**
   * Busca todas as pessoas cadastradas na API
   */
  const carregarPessoas = async () => {
    try {
      setLoading(true);
      const response = await api.get<Pessoa[]>("/Pessoa");
      setPessoas(response.data);
    } catch {
      setErro("Erro ao carregar pessoas.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Cria uma nova pessoa
   */
  const criarPessoa = async () => {
    if (!nome || idade <= 0) {
      setErro("Informe um nome e uma idade válida.");
      return;
    }

    try {
      await api.post("/Pessoa", { nome, idade });
      setNome("");
      setIdade(0);
      carregarPessoas();
    } catch {
      setErro("Erro ao cadastrar pessoa.");
    }
  };

  /**
   * Remove uma pessoa pelo ID
   * OBS: As transações são removidas automaticamente (cascade delete)
   */
  const deletarPessoa = async (id: number) => {
    if (!confirm("Deseja realmente excluir esta pessoa?")) return;

    try {
      await api.delete(`/Pessoa/${id}`);
      carregarPessoas();
    } catch {
      setErro("Erro ao excluir pessoa.");
    }
  };

  useEffect(() => {
    carregarPessoas();
  }, []);

  if (loading) return <Loading />;

  return (
    <div>
      <h2>Pessoas</h2>

      {erro && <ErrorMessage message={erro} />}

      {/* Formulário de cadastro */}
      <div>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          type="number"
          placeholder="Idade"
          value={idade || ""}
          onChange={(e) => setIdade(Number(e.target.value))}
        />

        <button onClick={criarPessoa}>Adicionar</button>
      </div>

      {/* Listagem */}
      <ul>
        {pessoas.map((pessoa) => (
          <li key={pessoa.id}>
            {pessoa.nome} - {pessoa.idade} anos{" "}
            <button onClick={() => deletarPessoa(pessoa.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
