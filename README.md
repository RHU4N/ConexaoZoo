# ConexaoZoo

Aplicação web em Node.js para gerenciamento de animais e trabalhadores de um zoológico. O sistema usa páginas renderizadas no servidor com Handlebars e persiste os dados em MySQL por meio do Sequelize.

## Funcionalidades

- listar animais cadastrados;
- adicionar, editar e excluir animais;
- listar trabalhadores;
- adicionar, editar e excluir trabalhadores;
- renderizar telas HTML com Handlebars;
- sincronizar os models com o banco de dados.

## Modelo de dados

### Animais

| Campo        | Tipo    | Descrição                           |
| ------------ | ------- | ----------------------------------- |
| `id`         | inteiro | Identificador gerado pelo Sequelize |
| `especie`    | texto   | Espécie do animal                   |
| `quantidade` | inteiro | Quantidade de animais               |
| `habitate`   | texto   | Habitat do animal                   |

### Trabalhadores

| Campo    | Tipo    | Descrição                           |
| -------- | ------- | ----------------------------------- |
| `id`     | inteiro | Identificador gerado pelo Sequelize |
| `nome`   | texto   | Nome do trabalhador                 |
| `funcao` | texto   | Função exercida no zoológico        |

## Tecnologias

- Node.js;
- Express 4;
- Sequelize 6;
- MySQL2;
- Express Handlebars;
- Body Parser;
- CSS e imagens locais.

## Estrutura do projeto

```text
ConexaoZoo/
├── server.js                         # Servidor e definição das rotas
├── package.json
├── zooSql.sql                         # Criação do banco zoologico
├── controllers/
│   ├── animaisController.js            # CRUD de animais
│   └── trabalhadoresController.js     # CRUD de trabalhadores
├── models/
│   ├── index.js                       # Conexão Sequelize
│   ├── Animais.js
│   └── Trabalhadores.js
├── views/
│   ├── layout.handlebars
│   ├── listaAnimais.handlebars
│   ├── adicionarAnimal.handlebars
│   ├── editaAnimal.handlebars
│   ├── listaTrabalhadores.handlebars
│   ├── adicionarTrabalhador.handlebars
│   ├── editaTrabalhador.handlebars
│   └── partials/
└── public/
	├── css/estilo.css
	└── images/
```

## Banco de dados

A aplicação usa a seguinte configuração padrão no model de conexão:

```text
Banco: zoologico
Host: localhost
Usuário: root
Senha: root
```

O arquivo `zooSql.sql` cria o banco:

```sql
CREATE DATABASE zoologico;
USE zoologico;
```

As tabelas são sincronizadas automaticamente pelos models com `sync({ alter: true })`. Essa configuração é conveniente para estudo, mas deve ser substituída por migrations em produção.

## Requisitos

- Node.js;
- npm;
- MySQL Server em execução na porta padrão `3306`;
- usuário MySQL com acesso ao banco `zoologico`.

## Como executar

Na raiz do projeto, instale as dependências:

```bash
npm install
```

Inicie o servidor:

```bash
npm start
```

A aplicação ficará disponível em:

```text
http://localhost:3001
```

Para desenvolvimento com Nodemon:

```bash
npx nodemon server.js
```

## Rotas

### Animais

| Método | Rota                   | Descrição                      |
| ------ | ---------------------- | ------------------------------ |
| `GET`  | `/`                    | Lista os animais               |
| `GET`  | `/animais/adicionar`   | Exibe o formulário de cadastro |
| `POST` | `/animais`             | Cadastra um animal             |
| `GET`  | `/animais/:id/edita`   | Exibe o formulário de edição   |
| `POST` | `/animais/:id/edita`   | Atualiza um animal             |
| `GET`  | `/animais/:id/excluir` | Exclui um animal               |

### Trabalhadores

| Método | Rota                         | Descrição                      |
| ------ | ---------------------------- | ------------------------------ |
| `GET`  | `/trabalhadores/lista`       | Lista os trabalhadores         |
| `GET`  | `/trabalhadores/adicionar`   | Exibe o formulário de cadastro |
| `POST` | `/trabalhadores`             | Cadastra um trabalhador        |
| `GET`  | `/trabalhadores/:id/editar`  | Exibe o formulário de edição   |
| `POST` | `/trabalhadores/:id/editar`  | Atualiza um trabalhador        |
| `GET`  | `/trabalhadores/:id/excluir` | Exclui um trabalhador          |

## Fluxo de uso

1. Inicie o MySQL.
2. Execute a aplicação.
3. Acesse `/` para gerenciar animais.
4. Acesse `/trabalhadores/lista` para gerenciar trabalhadores.
5. Use os links de adicionar, editar e excluir disponíveis nas páginas.

## Observações

- As credenciais do banco estão escritas diretamente em `models/index.js`; altere-as antes de compartilhar o projeto.
- A exclusão é acionada por requisições `GET`; em aplicações reais, prefira `DELETE` e confirmação da operação.
- Não há autenticação ou autorização implementada.
- Os models usam `alter: true`, o que modifica a estrutura do banco automaticamente durante a execução.
- O script `npm test` ainda é apenas um placeholder.

## Status

Projeto de estudo sobre Express, Sequelize, MySQL, Handlebars e operações CRUD em uma aplicação web.
