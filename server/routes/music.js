// Dependências
import express from 'express';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import logging from '../middlewares/logging.js';
import auth from '../middlewares/auth.js';

// Configurações do express
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

// Rotas
// Lista todos as músicas registradas (Pública)
router.get('/', logging, (req, res) => {
	res.status(200).json(musics);
});

//Lista a música com base no id passado na URL (Pública)
router.get('/:id', logging, (req, res) => {
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

// Adiciona uma nova música ao arquivo database.json
router.post('/', logging, auth, (req, res) => {
	//Busca pelo ultimo número de id no database.json
	let lastId = 1;
	musics.forEach((music) => {
		if (music.id) {
			lastId++;
		}
	});

	//Pega os dados da requisição e adiciona o id
	const data = req.body;
	data.id = lastId++;

	//Adiciona os dados ao array de musicas, então sobrescreve o arquivo database.json
	musics.push(data);
	writeFileSync('./database.json', JSON.stringify(musics));

	//Informa ao usuário que a música foi adicionada ao json
	res.status(201).send('Música adicionada com sucesso!');
});

export default router;
