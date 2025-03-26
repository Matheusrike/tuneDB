import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
	res.status(200).send(`<body>
		<style>
body {
    font-family: Barlow, sans-serif;
    line-height: 1.6;
    padding: 20px;
    margin: 0;
}
pre {
    background: #2d2d2d;
    border-radius: 4px;
    margin: 0.5em 0;
	color: #fff;
	padding: 12px;
}
code {
    font-family: 'Fira Code', Consolas, Monaco, monospace;
}
:not(pre) > code {
    background: #f0f0f0;
    padding: 2px 4px;
    border-radius: 3px;
    color: #e83e8c;
}
img { max-width: 100%; }
table {
    border-collapse: collapse;
    width: 100%;
    margin: 1em 0;
}
th, td {
    border: 1px solid #ddd;
    padding: 8px;
}
th { background-color: #f4f4f4; }
blockquote {
    border-left: 4px solid #ddd;
    padding-left: 1em;
    margin-left: 0;
    color: #666;
}

h1 {
    font-size: 2.2em;
    color: #2c3e50;
    border-bottom: 2px solid #eee;
    padding-bottom: 0.5rem;
    margin: 1.5rem 0;
}

h2 {
    font-size: 1.8em;
    color: #34495e;
    margin: 1.5rem 0;
}

h3 {
    font-size: 1.4em;
    color: #455a64;
}
                    
		</style>
                <h1>Relatório de Projeto - API e CLI para Registro de Músicas</h1>
<h2>Objetivo do Projeto</h2>
<p>Desenvolver uma CLI interativa utilizando bibliotecas como <strong>Inquirer</strong> para interação, <strong>Chalk</strong> para estilização e <strong>Axios</strong> para realizar requisições a uma API REST.</p>
<p>A API deve contar com rotas <strong>GET</strong>, <strong>POST</strong>, <strong>PUT</strong>, <strong>PATCH</strong>, <strong>DELETE</strong> e <strong>OPTIONS</strong>, todas com tratamento de erros adequado, além de exigir autenticação via cabeçalho HTTP em rotas que envolvam ações de inserção, atualização ou remoção de dados.</p>
<hr>
<h2>Como executar o projeto</h2>
<p>1- Clone o repositório git em um diretório local;</p>
<pre class="language-bash" tabindex="0"><code class="language-bash"><span class="token function">git</span> clone https://github.com/Matheusrike/tuneDB.git
</code></pre>
<p>2 - Acesse o diretório via Bash / CMD;</p>
<p>3 - Na pasta, acesse o diretório <strong><code>server</code></strong> e instale as dependências;</p>
<pre class="language-bash" tabindex="0"><code class="language-bash"><span class="token function">npm</span> i
</code></pre>
<p>4 - Execute o projeto usando o NodeJS;</p>
<pre class="language-bash" tabindex="0"><code class="language-bash"><span class="token function">npm</span> run dev
</code></pre>
<p>5 - Deixe seu terminal rodando. Em um novo terminal, acesse novamente o diretório do projeto na pasta <strong><code>client</code></strong>;</p>
<p>6 - Instale as dependências do cliente;</p>
<pre class="language-bash" tabindex="0"><code class="language-bash"><span class="token function">npm</span> i
</code></pre>
<p>7 - Execute o cliente;</p>
<pre class="language-bash" tabindex="0"><code class="language-bash"><span class="token function">npm</span> run dev
</code></pre>
<hr>
<h2>Rotas disponíveis</h2>
<h3><strong>GET | <code>/music</code> |</strong> Traz todas as músicas salvas</h3>
<h4>CLI</h4>
<pre class="language-bash" tabindex="0"><code class="language-bash">Selecione uma das opções abaixo:
-------------------------------------------------------------------------
<span class="token operator">&gt;</span> Consultar registro de músicas
- Adicionar música ao registro**
- Atualizar registro de músicas
- Remover música <span class="token keyword">do</span> registro

Selecione o tipo de consulta:
-------------------------------------------------------------------------
<span class="token operator">&gt;</span> Ver todas as músicas
- Consultar por ID
</code></pre>
<h4>Respostas</h4>
<table>
<thead>
<tr>
<th>Código de Status</th>
<th>Descrição</th>
</tr>
</thead>
<tbody><tr>
<td>200</td>
<td>Sucesso</td>
</tr>
</tbody></table>
<h5>Exemplo de resposta:</h5>
<pre class="language-json" tabindex="0"><code class="language-json">[
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
</code></pre>
<hr>
<h3><strong>GET | <code>/music/{id}</code> |</strong> Retorna a música com o id passado na URL</h3>
<h4>CLI</h4>
<pre class="language-bash" tabindex="0"><code class="language-bash">Selecione uma das opções abaixo:
-------------------------------------------------------------------------
<span class="token operator">&gt;</span> Consultar registro de músicas
- Adicionar música ao registro**
- Atualizar registro de músicas
- Remover música <span class="token keyword">do</span> registro

Selecione o tipo de consulta:
-------------------------------------------------------------------------
- Ver todas as músicas
<span class="token operator">&gt;</span> Consultar por ID

Informe o ID da música:
-------------------------------------------------------------------------
ID: <span class="token punctuation">{</span>id<span class="token punctuation">}</span>
</code></pre>
<h4>Respostas</h4>
<table>
<thead>
<tr>
<th>Código de Status</th>
<th>Descrição</th>
</tr>
</thead>
<tbody><tr>
<td>200</td>
<td>Sucesso</td>
</tr>
<tr>
<td>404</td>
<td>Nenhuma música com o id {id} foi encontrada, tente novamente.</td>
</tr>
</tbody></table>
<h5>Exemplo de resposta:</h5>
<pre class="language-json" tabindex="0"><code class="language-json">{
	"id": 1,
	"title": "Bohemian Rhapsody",
	"album": "A Night at the Opera",
	"artist": "Queen",
	"duration": "5:55"
}
</code></pre>
<hr>
<h3><strong>POST | <code>/music</code> |</strong> Adiciona uma nova música</h3>
<h4>CLI</h4>
<pre class="language-bash" tabindex="0"><code class="language-bash">**Selecione uma das opções abaixo:**
-------------------------------------------------------------------------
- **Consultar registro de músicas
<span class="token operator">&gt;</span> Adicionar música ao registro**
- Atualizar registro de músicas
- Remover música <span class="token keyword">do</span> registro

Informe o token de acesso:
-------------------------------------------------------------------------
Token: segredo

Informe os dados da música:
-------------------------------------------------------------------------
Título: <span class="token punctuation">{</span>title<span class="token punctuation">}</span>
Álbum: <span class="token punctuation">{</span>album<span class="token punctuation">}</span>
Artista: <span class="token punctuation">{</span>artist<span class="token punctuation">}</span>
Duração<span class="token punctuation">(</span>MM:SS<span class="token punctuation">)</span>: <span class="token punctuation">{</span>00:00<span class="token punctuation">}</span>
</code></pre>
<h4>Requisição</h4>
<h5>Headers*:</h5>
<table>
<thead>
<tr>
<th>Nome</th>
<th>Valor</th>
</tr>
</thead>
<tbody><tr>
<td>Authorization</td>
<td>segredo</td>
</tr>
</tbody></table>
<h5>Body*:</h5>
<pre class="language-json" tabindex="0"><code class="language-json">{
	"title": "string",
	"album": "string",
	"artist": "string",
	"duration": "string"
}
</code></pre>
<h4>Respostas</h4>
<table>
<thead>
<tr>
<th>Código de Status</th>
<th>Descrição</th>
</tr>
</thead>
<tbody><tr>
<td>201</td>
<td>Música adicionada com sucesso!</td>
</tr>
<tr>
<td>400</td>
<td>Requisição inválida, tente novamente.</td>
</tr>
</tbody></table>
<hr>
<h3><strong>PUT | <code>/music/{id}</code> |</strong> Atualiza completamente os dados de uma música já registrada</h3>
<h4>CLI</h4>
<pre class="language-bash" tabindex="0"><code class="language-bash">Selecione uma das opções abaixo:
-------------------------------------------------------------------------
- Consultar registro de músicas
- Adicionar música ao registro
<span class="token operator">&gt;</span> Atualizar registro de músicas
- Remover música <span class="token keyword">do</span> registro

Informe o token de acesso:
-------------------------------------------------------------------------
Token: segredo

Selecione o tipo de atualização:
-------------------------------------------------------------------------
<span class="token operator">&gt;</span> Atualizar completamente
- Atualizar parcialmente

Informe o ID da música:
-------------------------------------------------------------------------
ID: <span class="token punctuation">{</span>id<span class="token punctuation">}</span>

Informe os novos dados da música:
-------------------------------------------------------------------------
Título: <span class="token punctuation">{</span>title<span class="token punctuation">}</span>
Álbum: <span class="token punctuation">{</span>album<span class="token punctuation">}</span>
Artista: <span class="token punctuation">{</span>artist<span class="token punctuation">}</span>
Duração<span class="token punctuation">(</span>MM:SS<span class="token punctuation">)</span>: <span class="token punctuation">{</span>00:00<span class="token punctuation">}</span>
</code></pre>
<h4>Requisição</h4>
<h5>Headers*:</h5>
<table>
<thead>
<tr>
<th>Nome</th>
<th>Valor</th>
</tr>
</thead>
<tbody><tr>
<td>Authorization</td>
<td>segredo</td>
</tr>
</tbody></table>
<h5>Body*:</h5>
<pre class="language-json" tabindex="0"><code class="language-json">{
	"title": "string",
	"album": "string",
	"artist": "string",
	"duration": "string"
}
</code></pre>
<h4>Respostas</h4>
<table>
<thead>
<tr>
<th>Código de Status</th>
<th>Descrição</th>
</tr>
</thead>
<tbody><tr>
<td>200</td>
<td>Música atualizada com sucesso!</td>
</tr>
<tr>
<td>400</td>
<td>Requisição inválida, tente novamente.</td>
</tr>
<tr>
<td>404</td>
<td>Nenhuma música com o id {id} foi encontrada, tente novamente.</td>
</tr>
</tbody></table>
<hr>
<h3><strong>PATCH | <code>/music/{id}</code> |</strong> Atualiza parcialmente os dados de uma música já registrada</h3>
<h4>CLI</h4>
<pre class="language-bash" tabindex="0"><code class="language-bash">Selecione uma das opções abaixo:
-------------------------------------------------------------------------
- Consultar registro de músicas
- Adicionar música ao registro
<span class="token operator">&gt;</span> Atualizar registro de músicas
- Remover música <span class="token keyword">do</span> registro

Informe o token de acesso:
-------------------------------------------------------------------------
Token: segredo

Selecione o tipo de atualização:
-------------------------------------------------------------------------
- Atualizar completamente
<span class="token operator">&gt;</span> Atualizar parcialmente

Informe o ID da música:
-------------------------------------------------------------------------
ID: <span class="token punctuation">{</span>id<span class="token punctuation">}</span>

Informe o que deseja alterar no registro:
<span class="token punctuation">[</span>Deixe em branco para manter o valor atual<span class="token punctuation">]</span>
-------------------------------------------------------------------------
Título: <span class="token punctuation">{</span>title<span class="token punctuation">}</span>
Álbum: <span class="token punctuation">{</span>album<span class="token punctuation">}</span>
Artista: <span class="token punctuation">{</span>artist<span class="token punctuation">}</span>
Duração<span class="token punctuation">(</span>MM:SS<span class="token punctuation">)</span>: <span class="token punctuation">{</span>00:00<span class="token punctuation">}</span>
</code></pre>
<h4>Requisição</h4>
<h5>Headers*:</h5>
<table>
<thead>
<tr>
<th>Nome</th>
<th>Valor</th>
</tr>
</thead>
<tbody><tr>
<td>Authorization</td>
<td>segredo</td>
</tr>
</tbody></table>
<h5>Body*:</h5>
<pre class="language-json" tabindex="0"><code class="language-json">{
	"title": "string",
	"album": "string",
	"artist": "string",
	"duration": "string"
}
</code></pre>
<h4>Respostas</h4>
<table>
<thead>
<tr>
<th>Código de Status</th>
<th>Descrição</th>
</tr>
</thead>
<tbody><tr>
<td>200</td>
<td>Música atualizada com sucesso!</td>
</tr>
<tr>
<td>400</td>
<td>Requisição inválida, tente novamente.</td>
</tr>
<tr>
<td>404</td>
<td>Nenhuma música com o id {id} foi encontrada, tente novamente.</td>
</tr>
</tbody></table>
<hr>
<h3><strong>DELETE | <code>/music/{id}</code> |</strong> Remove uma música registrada</h3>
<h4>CLI</h4>
<pre class="language-bash" tabindex="0"><code class="language-bash">Selecione uma das opções abaixo:
-------------------------------------------------------------------------
- Consultar registro de músicas
- Adicionar música ao registro
- Atualizar registro de músicas
<span class="token operator">&gt;</span> Remover música <span class="token keyword">do</span> registro

Informe o token de acesso:
-------------------------------------------------------------------------
Token: segredo

Informe o ID da música:
-------------------------------------------------------------------------
ID: <span class="token punctuation">{</span>id<span class="token punctuation">}</span>
</code></pre>
<h4>Requisição</h4>
<h5>Headers*:</h5>
<table>
<thead>
<tr>
<th>Nome</th>
<th>Valor</th>
</tr>
</thead>
<tbody><tr>
<td>Authorization</td>
<td>segredo</td>
</tr>
</tbody></table>
<h4>Respostas</h4>
<table>
<thead>
<tr>
<th>Código de Status</th>
<th>Descrição</th>
</tr>
</thead>
<tbody><tr>
<td>200</td>
<td>Música removida com sucesso!</td>
</tr>
<tr>
<td>404</td>
<td>Nenhuma música com o id {id} foi encontrada, tente novamente.</td>
</tr>
</tbody></table>
<p>Página desenvolvida com base no Readme usando o <a href="https://apitemplate.io/pdf-tools/convert-markdown-to-pdf/">https://apitemplate.io/pdf-tools/convert-markdown-to-pdf/</a></p>
                <script>
                    Prism.highlightAll();
                </script>
            
            
        </body>`);
});

export default router;
