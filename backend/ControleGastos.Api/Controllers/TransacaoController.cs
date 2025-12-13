using ControleGastos.Api.Data;
using ControleGastos.Api.Enums;
using ControleGastos.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.Api.Controllers;

/// <summary>
/// Controller responsável pelo gerenciamento de transações financeiras.
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class TransacaoController : ControllerBase
{
    private readonly AppDbContext _context;

    public TransacaoController(AppDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Cria uma nova transação respeitando as regras de negócio.
    /// </summary>
    [HttpPost]
    public async Task<IActionResult> CriarTransacao(Transacao transacao)
    {
        // Verifica se a pessoa existe
        var pessoa = await _context.Pessoas.FindAsync(transacao.PessoaId);
        if (pessoa == null)
            return BadRequest("Pessoa não encontrada.");

        // Verifica se a categoria existe
        var categoria = await _context.Categorias.FindAsync(transacao.CategoriaId);
        if (categoria == null)
            return BadRequest("Categoria não encontrada.");

        // Regra 1: menor de idade só pode despesa
        if (pessoa.Idade < 18 && transacao.Tipo == TipoTransacao.Receita)
            return BadRequest("Menores de idade não podem registrar receitas.");

        // Regra 2: categoria compatível com o tipo
        if (categoria.Finalidade == FinalidadeCategoria.Despesa && transacao.Tipo == TipoTransacao.Receita)
            return BadRequest("Categoria de despesa não pode ser usada para receita.");

        if (categoria.Finalidade == FinalidadeCategoria.Receita && transacao.Tipo == TipoTransacao.Despesa)
            return BadRequest("Categoria de receita não pode ser usada para despesa.");

        _context.Transacoes.Add(transacao);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(ListarTransacoes), new { id = transacao.Id }, transacao);
    }

    /// <summary>
    /// Lista todas as transações cadastradas.
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Transacao>>> ListarTransacoes()
    {
        var transacoes = await _context.Transacoes
            .Include(t => t.Pessoa)
            .Include(t => t.Categoria)
            .ToListAsync();

        return Ok(transacoes);
    }
}
