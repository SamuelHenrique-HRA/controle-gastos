import type { RelatorioPessoa } from "./RelatorioPessoa";

export interface RelatorioTotaisPorPessoa {
  pessoas: RelatorioPessoa[];
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}
