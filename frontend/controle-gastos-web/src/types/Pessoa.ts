/**
 * Representa o resumo financeiro de uma pessoa
 */
export interface RelatorioPessoa {
  pessoaId: number;
  nome: string;
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}

/**
 * Estrutura completa retornada pelo endpoint de relatórios
 */
export interface RelatorioTotaisPorPessoa {
  pessoas: RelatorioPessoa[];
  totalGeralReceitas: number;
  totalGeralDespesas: number;
  saldoGeral: number;
}
