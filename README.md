# Sistema de Controle de Gastos Residenciais

Este projeto foi desenvolvido como parte de um **teste técnico**, com o objetivo de implementar um sistema simples e funcional para **controle de gastos residenciais**, respeitando regras de negócio específicas e boas práticas de desenvolvimento.

A aplicação é composta por um **backend em .NET (Web API)** e um **frontend em React com TypeScript**, mantendo clara separação de responsabilidades entre as camadas.

---

##  Objetivo do Sistema

Permitir o cadastro e gerenciamento de:

* Pessoas
* Categorias financeiras
* Transações (receitas e despesas)

Além disso, o sistema disponibiliza **relatórios consolidados**, permitindo visualizar:

* Totais de receitas, despesas e saldo por pessoa
* Totais gerais de todas as pessoas cadastradas

---

##  Tecnologias Utilizadas

### Backend

* **C#**
* **.NET (ASP.NET Web API)**
* **Entity Framework Core**
* **SQLite** (persistência local)

### Frontend

* **React**
* **TypeScript**
* **Axios** (consumo da API)

---

##  Estrutura do Projeto

```
controle-gastos/
├── backend/
│   └── ControleGastos.Api
│       ├── Controllers
│       ├── Models
│       ├── Enums
│       ├── Data
│       └── Program.cs
│
├── frontend/
│   ├── src/
│   │   ├── api
│   │   ├── pages
│   │   ├── types
│   │   ├── components
│   │   └── App.tsx
│
├── README.md
└── .gitignore
```

---

##  Funcionalidades Implementadas

###  Cadastro de Pessoas

* Criação de pessoas
* Listagem de pessoas
* Exclusão de pessoas
* **Exclusão em cascata** das transações vinculadas (regra aplicada no backend)

Campos:

* Identificador (gerado automaticamente)
* Nome
* Idade (número inteiro positivo)

---

###  Cadastro de Categorias

* Criação de categorias
* Listagem de categorias

Campos:

* Identificador
* Descrição
* Finalidade:

  * Despesa
  * Receita

---

###  Cadastro de Transações

* Criação de transações
* Listagem de transações

Campos:

* Identificador
* Descrição
* Valor (decimal positivo)
* Tipo (Despesa ou Receita)
* Categoria
* Pessoa

#### Regras de Negócio Aplicadas:

* Pessoas **menores de 18 anos não podem cadastrar receitas**
* Categorias devem ser **compatíveis com o tipo da transação**
* Todas as validações são aplicadas:

  * No **backend** (garantia de integridade)
  * No **frontend** (melhor experiência do usuário)

---

###  Relatórios

* Relatório de totais por pessoa:

  * Total de receitas
  * Total de despesas
  * Saldo (receita – despesa)
* Totais gerais consolidados ao final do relatório

Endpoint:

```
GET /api/Relatorios/totais-por-pessoa
```

---

##  Como Executar o Projeto

###  Backend

1. Acesse a pasta do backend:

```bash
cd backend/ControleGastos.Api
```

2. Restaure os pacotes:

```bash
dotnet restore
```

3. Atualize o banco de dados:

```bash
dotnet ef database update
```

4. Execute a aplicação:

```bash
dotnet run
```

A API ficará disponível em:

```
http://localhost:5028
```

Swagger:

```
http://localhost:5028/swagger
```

---

###  Frontend

1. Acesse a pasta do frontend:

```bash
cd frontend
```

2. Instale as dependências:

```bash
npm install
```

3. Execute o projeto:

```bash
npm run dev
```

A aplicação estará disponível em:

```
http://localhost:5173
```

---

##  Observações Importantes

* O projeto **não utiliza CSS ou bibliotecas visuais externas**, mantendo foco total nas regras de negócio e na lógica solicitada.
* A persistência dos dados é garantida via **SQLite**, mantendo os registros mesmo após reinicialização do sistema.
* O código contém **comentários explicativos**, facilitando entendimento e manutenção.
* Todas as decisões técnicas foram tomadas visando **clareza, simplicidade e aderência ao enunciado**.

---

## Conclusão

Este projeto atende integralmente aos requisitos propostos, priorizando:

* Clareza de regras de negócio
* Boas práticas em .NET e React
* Código limpo e organizado
* Separação adequada entre backend e frontend
