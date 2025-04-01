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
// Lista todos as músicas registradas
router.get('/', (req, res) => {
	res.status(200).json(musics);
});

/* ------------------------- ROTA GET (ID) - Pública ------------------------ */
router.get('/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const music = musics.find((m) => id === m.id);
	music
		? res.status(200).json(music)
		: res
				.status(404)
				.send('Música não encontrada. Tente buscar por outro id.');
});

/* --------------------------- Rota POST - Privada -------------------------- */
router.post('/', auth, (req, res) => {
	const data = req.body;

	// Verifica se a requisição possui todos os dados
	if (data.title && data.album && data.artist && data.duration) {
		let lastId = 1;
		musics.forEach((music) => {
			if (music.id && music.id != lastId++) {
				lastId++;
			}
		});
		data.id = lastId++;

		musics.push(data);
		writeFileSync('./database.json', JSON.stringify(musics));
		res.status(201).send('Música adicionada com sucesso!');
	} else {
		res.status(400).send(
			`Requisição inválida, por favor envie um JSON com os seguintes campos: 'title(string)', 'album(string)', 'artist(string)' e 'duration(string)'`
		);
		return;
	}
});

/* -------------------------- Rota PATCH - Privada -------------------------- */
router.patch('/:id', auth, (req, res) => {
	const id = parseInt(req.params.id);
	const updates = req.body;

	// Verifica se todos os itens do objeto existem.
	if (updates.title || updates.album || updates.artist || updates.duration) {
		// Procura por um id idêntico dentro do JSON
		const i = musics.findIndex((m) => id === m.id);
		if (i === -1) {
			res.status(404).send('Música nao encontrada, tente novamente.');
			return;
		}
		// Atualiza os valores e grava no JSON
		musics[i] = { ...musics[i], ...updates };
		writeFileSync('./database.json', JSON.stringify(musics));
		res.status(200).send('Música atualizada com sucesso.');
	} else {
		// Retorna requisição inválida ao usuário.
		res.status(400).send(
			`Requisição inválida, por favor envie um JSON com pelo menos um dos seguintes campos: 'title(string)', 'album(string)', 'artist(string)' e 'duration(string)'`
		);
		return;
	}
});

/* --------------------------- Rota PUT - Privada --------------------------- */
router.put('/:id', auth, (req, res) => {
	const id = parseInt(req.params.id);
	const updates = req.body;

	// Verifica se todos os itens do objeto existem.
	if (updates.title && updates.album && updates.artist && updates.duration) {
		// Procura por um id idêntico dentro do JSON
		const i = musics.findIndex((m) => id === m.id);
		if (i === -1) {
			res.status(404).send('Música nao encontrada, tente novamente.');
			return;
		}
		// Atualiza os valores e grava no JSON
		musics[i] = { ...musics[i], ...updates };
		writeFileSync('./database.json', JSON.stringify(musics));
		res.status(200).send('Música atualizada com sucesso.');
	} else {
		res.status(400).send(
			`Requisição inválida, por favor envie um JSON com os seguintes campos: 'title(string)', 'album(string)', 'artist(string)' e 'duration(string)'`
		);
		return;
	}
});

/* -------------------------- Rota DELETE - Privada ------------------------- */
router.delete('/:id', auth, (req, res) => {
	const id = parseInt(req.params.id);
	// Procura por um id idêntico dentro do JSON
	const i = musics.findIndex((m) => id === m.id);
	if (i === -1) {
		res.status(404).send('Música nao encontrada, tente novamente.');
		return;
	} else {
		// Deleta o item do array
		musics.splice(i, 1);
		res.status(200).send('Música deletada com sucesso!');
	}
});

/* ------------------------- Rota OPTIONS - Pública ------------------------- */
router.options('/', (req, res) => {
	res.header('Allow', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
	res.status(204).send();
});

export default router;
