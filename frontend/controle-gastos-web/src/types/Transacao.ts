export interface Transacao {
  id: number;
  descricao: string;
  valor: number;
  tipo: number; // 1 = Despesa | 2 = Receita
  pessoaId: number;
  categoriaId: number;
}
