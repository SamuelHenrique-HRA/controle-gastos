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
 * Totais gerais do relatório
 */
export interface RelatorioTotalGeral {
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}

/**
 * Estrutura completa retornada pela API
 */
export interface RelatorioTotaisPorPessoa {
  pessoas: RelatorioPessoa[];
  totalGeral: RelatorioTotalGeral;
}
