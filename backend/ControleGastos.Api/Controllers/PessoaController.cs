using ControleGastos.Api.Data;
using ControleGastos.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.Api.Controllers;

/// <summary>
/// Controller responsável pelo gerenciamento de pessoas.
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class PessoaController : ControllerBase
{
    private readonly AppDbContext _context;

    public PessoaController(AppDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Cria uma nova pessoa.
    /// </summary>
    [HttpPost]
    public async Task<IActionResult> CriarPessoa(Pessoa pessoa)
    {
        if (pessoa.Idade < 0)
            return BadRequest("Idade inválida.");

        _context.Pessoas.Add(pessoa);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(ListarPessoas), new { id = pessoa.Id }, pessoa);
    }

    /// <summary>
    /// Lista todas as pessoas cadastradas.
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Pessoa>>> ListarPessoas()
    {
        var pessoas = await _context.Pessoas.ToListAsync();
        return Ok(pessoas);
    }

    /// <summary>
    /// Remove uma pessoa pelo id.
    /// As transações associadas serão removidas automaticamente (cascade).
    /// </summary>
    [HttpDelete("{id}")]
    public async Task<IActionResult> RemoverPessoa(int id)
    {
        var pessoa = await _context.Pessoas.FindAsync(id);

        if (pessoa == null)
            return NotFound("Pessoa não encontrada.");

        _context.Pessoas.Remove(pessoa);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
