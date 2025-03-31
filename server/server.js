// Dependências
import express from 'express';
import music from './routes/music.js';
import docs from './routes/docs.js';
import logging from './middlewares/logging.js';

const app = express();
const port = 3000;
app.use(logging);

app.get('/', (req, res) => {
	res.status(200).send(
		`<a href="http://localhost:${port}/docs">Consultar documentação</a>`
	);
});

app.use('/music', music);
app.use('/docs', docs);

app.listen(port, () => {
	console.log(`O servidor está ouvindo na porta: http://localhost:${port}`);
});
