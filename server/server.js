// Dependências
import express from 'express';
import music from './routes/music.js';
import logging from './middlewares/logging.js';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
	res.status(200).send(`<h1>Rotas onde realizar requisições</h1>
	<ul>
		<li>
			<h2>/music</h2>
			<p>Lista todas as músicas registradas.</p>
			<hr>
		</li>
	</ul>`);
});

app.use('/music', music);

app.listen(port, () => {
	console.log(`O servidor está ouvindo na porta: http://localhost:${port}`);
});
