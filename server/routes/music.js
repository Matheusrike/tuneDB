/* --------------------- Dependência es e configurações --------------------- */
import express from 'express';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import auth from '../middlewares/auth.js';
const router = express.Router();
router.use(express.json());

// Inicialização do array de musicas com base no database.json
let musics = [];
try {
	const data = JSON.parse(readFileSync('./database.json', 'utf8'));
	musics = data;
} catch (err) {
	// Cria o database.json caso ele não exista
	if (!existsSync('./database.json')) {
		writeFileSync('./database.json', JSON.stringify(musics));
		musics = [];
	} else {
		console.log("Erro ao ler o arquivo 'database.json', Error: ", err);
	}
}

/* --------------------------- Rota GET - Pública --------------------------- */
// Lista todos as músicas registradas (Pública)
router.get('/', (req, res) => {
	res.status(200).json(musics);
});

/* ------------------------- ROTA GET (ID) - Pública ------------------------ */
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

/* -------------------------------- Rota POST ------------------------------- */
router.post('/', auth, (req, res) => {
	const data = req.body;
	if (!data.title || !data.album || !data.artist || !data.duration) {
		res.status(400).send(
			`Requisição inválida, por favor envie um JSON com os seguintes campos: 'title(string)', 'album(string)', 'artist(string)' e 'duration(string)'`
		);
		return;
	}
	let lastId = 1;
	musics.forEach((music) => {
		if (music.id) {
			lastId++;
		}
	});
	data.id = lastId++;
	musics.push(data);
	writeFileSync('./database.json', JSON.stringify(musics));
	res.status(201).send('Música adicionada com sucesso!');
});

/* -------------------------- Rota PATCH - Privada -------------------------- */
router.patch('/:id', auth, (req, res) => {
	const id = parseInt(req.params.id);
	const updates = req.body;

	if (
		!updates.title &&
		!updates.album &&
		!updates.artist &&
		!updates.duration
	) {
		res.status(400).send(
			`Requisição inválida, por favor envie um JSON com pelo menos um dos seguintes campos: 'title(string)', 'album(string)', 'artist(string)' e 'duration(string)'`
		);
	}

	const i = musics.findIndex((m) => id === m.id);
	i === -1 ? res.status(404).send('Música nao encontrada') : null;
	musics[i] = { ...musics[i], ...updates };
	writeFileSync('./database.json', JSON.stringify(musics));
	res.status(200).send('Música atualizada com sucesso.');
});

/* --------------------------- Rota PUT - Privada --------------------------- */
router.put('/:id', auth, (req, res) => {
	const id = parseInt(req.params.id);
	const updates = req.body;

	if (
		!updates.title ||
		!updates.album ||
		!updates.artist ||
		!updates.duration
	) {
		res.status(400).send(
			`Requisição inválida, por favor envie um JSON com os seguintes campos: 'title(string)', 'album(string)', 'artist(string)' e 'duration(string)'`
		);
		return;
	}

	const i = musics.findIndex((m) => id === m.id);
	i === -1 ? res.status(404).send('Música nao encontrada') : null;
	musics[i] = { ...musics[i], ...updates };
	writeFileSync('./database.json', JSON.stringify(musics));
	res.status(200).send('Música atualizada com sucesso.');
});

export default router;
