using ControleGastos.Api.Data;
using ControleGastos.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.Api.Controllers;

/// <summary>
/// Controller responsável pelo gerenciamento de categorias.
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class CategoriaController : ControllerBase
{
    private readonly AppDbContext _context;

    public CategoriaController(AppDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Cria uma nova categoria.
    /// </summary>
    [HttpPost]
    public async Task<IActionResult> CriarCategoria(Categoria categoria)
    {
        if (string.IsNullOrWhiteSpace(categoria.Descricao))
            return BadRequest("Descrição é obrigatória.");

        _context.Categorias.Add(categoria);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(ListarCategorias), new { id = categoria.Id }, categoria);
    }

    /// <summary>
    /// Lista todas as categorias cadastradas.
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Categoria>>> ListarCategorias()
    {
        var categorias = await _context.Categorias.ToListAsync();
        return Ok(categorias);
    }
}
