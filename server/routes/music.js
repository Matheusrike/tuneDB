import express from 'express';
import { readFileSync } from 'node:fs';
const router = express.Router();
router.use(express.json());

let musics = [];
try {
	const data = JSON.parse(readFileSync('./data.json', 'utf8'));
	musics = data;
} catch (error) {
	console.log('Erro na leitura dos dados, Erro: ', error);
	musics = [];
}

// Rotas
router.get('/', (req, res) => {
	res.status(200).json(musics);
});

router.get('/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const music = musics.find((m) => id === m.id);

	if (music) {
		res.status(200).json(music);
	} else {
		res.status(404).send(
			'Música não encontrada. Tente buscar por outro id.'
		);
	}
});

router.post('/', (req, res) => {
	let lastId = 0;
	const newId = musics.forEach((m) => {
		if (m.id) {
			lastId++;
		}
	});

	const data = Object.assign({}, req.body, { id: lastId++ });
	res.send(data);
});

export default router;
