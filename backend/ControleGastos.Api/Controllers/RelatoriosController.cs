using ControleGastos.Api.Data;
using ControleGastos.Api.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.Api.Controllers;

/// <summary>
/// Controller responsável por relatórios e consultas agregadas.
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class RelatoriosController : ControllerBase
{
    private readonly AppDbContext _context;

    public RelatoriosController(AppDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Retorna os totais de receitas, despesas e saldo por pessoa,
    /// além do total geral.
    /// </summary>
    [HttpGet("totais-por-pessoa")]
    public async Task<IActionResult> TotaisPorPessoa()
    {
        var pessoas = await _context.Pessoas
            .Include(p => p.Transacoes)
            .ToListAsync();

        var resultadoPorPessoa = pessoas.Select(p =>
        {
            var totalReceitas = p.Transacoes
                .Where(t => t.Tipo == TipoTransacao.Receita)
                .Sum(t => t.Valor);

            var totalDespesas = p.Transacoes
                .Where(t => t.Tipo == TipoTransacao.Despesa)
                .Sum(t => t.Valor);

            return new
            {
                PessoaId = p.Id,
                Nome = p.Nome,
                TotalReceitas = totalReceitas,
                TotalDespesas = totalDespesas,
                Saldo = totalReceitas - totalDespesas
            };
        }).ToList();

        var totalGeralReceitas = resultadoPorPessoa.Sum(r => r.TotalReceitas);
        var totalGeralDespesas = resultadoPorPessoa.Sum(r => r.TotalDespesas);

        var respostaFinal = new
        {
            Pessoas = resultadoPorPessoa,
            TotalGeral = new
            {
                TotalReceitas = totalGeralReceitas,
                TotalDespesas = totalGeralDespesas,
                Saldo = totalGeralReceitas - totalGeralDespesas
            }
        };

        return Ok(respostaFinal);
    }
}
