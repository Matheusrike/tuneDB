# Relatório de Projeto - API e CLI para Registro de Músicas

## Objetivo do Projeto

Desenvolver uma CLI interativa utilizando bibliotecas como Inquirer para interação, Chalk para estilização e Axios para realizar requisições a uma API REST.

A API deve contar com rotas GET, POST, PUT, PATCH, DELETE e OPTIONS, todas com tratamento de erros adequado, além de exigir autenticação via cabeçalho HTTP em rotas que envolvam ações de inserção, atualização ou remoção de dados.

---

## Como executar o projeto

1- Clone o repositório git em um diretório local;

```bash
git clone https://github.com/Matheusrike/tuneDB.git
```

2 - Acesse o diretório via Bash / CMD;

3 - Na pasta, acesse o diretório `server` e instale as dependências;

```bash
npm i
```

4 - Execute o projeto usando o NodeJS;

```bash
npm run dev
```

5 - Deixe seu terminal rodando. Em um novo terminal, acesse novamente o diretório do projeto na pasta `client`;

6 - Instale as dependências do cliente;

```bash
npm i
```

7 - Execute o cliente;

```bash
npm run dev
```

---

## Rotas disponíveis

### **GET | `/music` |** Traz todas as músicas salvas

#### CLI

```bash
**Selecione uma das opções abaixo:
-------------------------------------------------------------------------
> Consultar registro de músicas
- Adicionar música ao registro**
- Atualizar registro de músicas
- Remover música do registro

Selecione o tipo de consulta:
-------------------------------------------------------------------------
> Ver todas as músicas
- Consultar por ID**
```

#### Respostas

| Código de Status | Descrição |
| ---------------- | --------- |
| 200              | Sucesso   |

###### Exemplo de resposta:

```json
[
  {
    "id": 1,
    "title": "Bohemian Rhapsody",
    "album": "A Night at the Opera",
    "artist": "Queen",
    "duration": "5:55"
  },
  {
    "id": 2,
    "title": "Hotel California",
    "album": "Hotel California",
    "artist": "Eagles",
    "duration": "6:30"
  },
  {...}
]
```

---

### **GET | `/music/{id}` |** Retorna a música com o id passado na URL

#### CLI

```bash
**Selecione uma das opções abaixo:
-------------------------------------------------------------------------
> Consultar registro de músicas
- Adicionar música ao registro**
**- Atualizar registro de músicas
- Remover música do registro

Selecione o tipo de consulta:
-------------------------------------------------------------------------
- Ver todas as músicas
> Consultar por ID

Informe o ID da música:
-------------------------------------------------------------------------
ID: {id}**
```

#### Respostas

| Código de Status | Descrição                                                     |
| ---------------- | ------------------------------------------------------------- |
| 200              | Sucesso                                                       |
| 404              | Nenhuma música com o id {id} foi encontrada, tente novamente. |

###### Exemplo de resposta:

```json
{
	"id": 1,
	"title": "Bohemian Rhapsody",
	"album": "A Night at the Opera",
	"artist": "Queen",
	"duration": "5:55"
}
```

---

### **POST | `/music` |** Adiciona uma nova música

#### CLI

```bash
**Selecione uma das opções abaixo:**
-------------------------------------------------------------------------
- **Consultar registro de músicas
> Adicionar música ao registro**
**- Atualizar registro de músicas
- Remover música do registro

Informe o token de acesso:**
-------------------------------------------------------------------------
**Token:** segredo

**Informe os dados da música:**
-------------------------------------------------------------------------
**Título:** {title}
**Álbum:** {album}
**Artista:** {artist}
**Duração(MM:SS):** {00:00}
```

#### Requisição

###### Headers\*:

| Nome          | Valor   |
| ------------- | ------- |
| Authorization | segredo |

###### Body\*:

```json
{
	"title": "string",
	"album": "string",
	"artist": "string",
	"duration": "string"
}
```

#### Respostas

| Código de Status | Descrição                             |
| ---------------- | ------------------------------------- |
| 201              | Música adicionada com sucesso!        |
| 400              | Requisição inválida, tente novamente. |

---

### **PUT | `/music/{id}` |** Atualiza completamente os dados de uma música já registrada

#### CLI

```bash
**Selecione uma das opções abaixo:**
-------------------------------------------------------------------------
- **Consultar registro de músicas
- Adicionar música ao registro**
**> Atualizar registro de músicas
- Remover música do registro

Informe o token de acesso:**
-------------------------------------------------------------------------
**Token:** segredo

**Selecione o tipo de atualização:
-------------------------------------------------------------------------
> Atualizar completamente
- Atualizar parcialmente**

**Informe o ID da música:
-------------------------------------------------------------------------
ID: {id}**

**Informe os novos dados da música:**
-------------------------------------------------------------------------
**Título:** {title}
**Álbum:** {album}
**Artista:** {artist}
**Duração(MM:SS):** {00:00}
```

#### Requisição

###### Headers\*:

| Nome          | Valor   |
| ------------- | ------- |
| Authorization | segredo |

###### Body\*:

```json
{
	"title": "string",
	"album": "string",
	"artist": "string",
	"duration": "string"
}
```

#### Respostas

| Código de Status | Descrição                                                     |
| ---------------- | ------------------------------------------------------------- |
| 200              | Música atualizada com sucesso!                                |
| 400              | Requisição inválida, tente novamente.                         |
| 404              | Nenhuma música com o id {id} foi encontrada, tente novamente. |

---

### **PATCH | `/music/{id}` |** Atualiza parcialmente os dados de uma música já registrada

#### CLI

```bash
**Selecione uma das opções abaixo:**
-------------------------------------------------------------------------
- **Consultar registro de músicas
- Adicionar música ao registro**
**> Atualizar registro de músicas
- Remover música do registro

Informe o token de acesso:**
-------------------------------------------------------------------------
**Token:** segredo

**Selecione o tipo de atualização:
-------------------------------------------------------------------------
- Atualizar completamente
> Atualizar parcialmente

Informe o ID da música:
-------------------------------------------------------------------------
ID: {id}**

**Informe o que deseja alterar no registro:
[Deixe em branco para manter o valor atual]**
-------------------------------------------------------------------------
**Título:** {title}
**Álbum:** {album}
**Artista:** {artist}
**Duração(MM:SS):** {00:00}
```

#### Requisição

###### Headers\*:

| Nome          | Valor   |
| ------------- | ------- |
| Authorization | segredo |

###### Body\*:

```json
{
	"title": "string",
	"album": "string",
	"artist": "string",
	"duration": "string"
}
```

#### Respostas

| Código de Status | Descrição                                                     |
| ---------------- | ------------------------------------------------------------- |
| 200              | Música atualizada com sucesso!                                |
| 400              | Requisição inválida, tente novamente.                         |
| 404              | Nenhuma música com o id {id} foi encontrada, tente novamente. |

---

### **DELETE | `/music/{id}` |** Remove uma música registrada

#### CLI

```bash
**Selecione uma das opções abaixo:**
-------------------------------------------------------------------------
- **Consultar registro de músicas
- Adicionar música ao registro**
- **Atualizar registro de músicas
> Remover música do registro

Informe o token de acesso:**
-------------------------------------------------------------------------
**Token:** segredo

**Informe o ID da música:
-------------------------------------------------------------------------
ID: {id}**
```

#### Requisição

###### Headers\*:

| Nome          | Valor   |
| ------------- | ------- |
| Authorization | segredo |

#### Respostas

| Código de Status | Descrição                                                     |
| ---------------- | ------------------------------------------------------------- |
| 200              | Música removida com sucesso!                                  |
| 404              | Nenhuma música com o id {id} foi encontrada, tente novamente. |
