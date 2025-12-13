using ControleGastos.Api.Data;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// ==============================
// CONFIGURAÇÃO DO BANCO (SQLite)
// ==============================
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=controle-gastos.db")
);

// ==============================
// CONFIGURAÇÃO DOS CONTROLLERS
// - Ignora ciclos de referência
// ==============================
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    });

// ==============================
// SWAGGER
// ==============================
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// ==============================
// PIPELINE HTTP
// ==============================
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapControllers();

app.Run();
