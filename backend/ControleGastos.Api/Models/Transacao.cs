using ControleGastos.Api.Enums;

namespace ControleGastos.Api.Models;

public class Transacao
{
    public int Id { get; set; }

    public string Descricao { get; set; } = string.Empty;

    public decimal Valor { get; set; }

    public TipoTransacao Tipo { get; set; }

    public int PessoaId { get; set; }
    public Pessoa? Pessoa { get; set; }   // ✅ ANULÁVEL

    public int CategoriaId { get; set; }
    public Categoria? Categoria { get; set; } // ✅ ANULÁVEL
}
