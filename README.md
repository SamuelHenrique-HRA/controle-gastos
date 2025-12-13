# Controle de Gastos Residenciais – Backend

Este projeto consiste no **backend de um sistema de controle de gastos residenciais**, desenvolvido como teste técnico, com foco em **boas práticas, regras de negócio claras e organização de código**.

A aplicação foi construída como uma **Web API em .NET**, separada do front-end, utilizando persistência em banco de dados relacional local.


## 🛠 Tecnologias Utilizadas

- **.NET 8**
- **ASP.NET Core Web API**
- **Entity Framework Core**
- **SQLite** (persistência local)
- **Swagger** (documentação da API)
- **Git / GitHub**


## 📁 Estrutura do Projeto

backend/
└─ ControleGastos.Api/
├─ Controllers/ → Endpoints da API
├─ Data/ → DbContext e configuração do banco
├─ Models/ → Entidades do domínio
├─ Enums/ → Enumerações (TipoTransacao, FinalidadeCategoria)
├─ DTOs/ → Objetos de transferência de dados
├─ Migrations/ → Migrations do Entity Framework
├─ Program.cs → Configuração da aplicação



## 📌 Funcionalidades Implementadas

### 👤 Cadastro de Pessoas
- Criar pessoa
- Listar pessoas
- Excluir pessoa
- Ao excluir uma pessoa, **todas as suas transações são removidas**

Campos:
- Id (gerado automaticamente)
- Nome
- Idade


### 🗂 Cadastro de Categorias
- Criar categoria
- Listar categorias

Campos:
- Id (gerado automaticamente)
- Descrição
- Finalidade:
  - Despesa
  - Receita
  - Ambas


### 💰 Cadastro de Transações
- Criar transação
- Listar transações

Regras de negócio:
- Pessoas **menores de 18 anos** só podem registrar **despesas**
- A **categoria deve ser compatível** com o tipo da transação
- Transação deve estar vinculada a uma pessoa existente

Campos:
- Id (gerado automaticamente)
- Descrição
- Valor (positivo)
- Tipo (Despesa / Receita)
- Categoria
- Pessoa


### 📊 Relatórios

#### 🔹 Totais por Pessoa
- Total de receitas
- Total de despesas
- Saldo (receitas - despesas)
- Total geral consolidado



## ▶️ Como Executar o Projeto

### Pré-requisitos
- .NET SDK 8 instalado
- Git


### Passo a passo

1️⃣ Clonar o repositório:
```bash
git clone https://github.com/SEU-USUARIO/controle-gastos.git

2️⃣ Acessar o backend:
cd backend/ControleGastos.Api

3️⃣ Restaurar dependências:
dotnet restore


4️⃣ Criar o banco de dados:
dotnet ef database update


5️⃣ Executar a aplicação:
dotnet run


6️⃣ Acessar o Swagger:
http://localhost:5028/swagger
