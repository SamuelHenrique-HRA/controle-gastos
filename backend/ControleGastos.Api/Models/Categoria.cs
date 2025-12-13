using ControleGastos.Api.Enums;

namespace ControleGastos.Api.Models;

public class Categoria
{
    public int Id { get; set; }
    public string Descricao { get; set; } = string.Empty;
    public FinalidadeCategoria Finalidade { get; set; }
}
