/* --------------------- Dependência es e configurações --------------------- */
import express from 'express';
import database from '../database/connection.js';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import auth from '../middlewares/auth.js';
import { arch } from 'node:os';
const router = express.Router();
router.use(express.json());

/* --------------------------- Rota GET - Pública --------------------------- */
// Lista todos as músicas registradas
router.get('/', async (req, res) => {
	try {
		const [rows] = await database.query('select * from musics');
		res.status(200).json(rows);
	} catch (error) {
		res.status(500).send(
			'Erro ao consultar registros, Detalhe do erro: ',
			error
		);
	}
});

/* ------------------------- ROTA GET (ID) - Pública ------------------------ */
router.get('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const [music] = await database.query(
			'select * from musics where id = ?',
			id
		);
		music.length >= 1
			? res.status(200).json(music[0])
			: res
					.status(404)
					.send('Música não encontrada. Tente buscar por outro id.');
	} catch (error) {
		res.status(500).send(
			'Erro ao consultar registros, Detalhe do erro: ',
			error
		);
	}
});

/* --------------------------- Rota POST - Privada -------------------------- */
router.post('/', auth, async (req, res) => {
	try {
		const data = req.body;

		// Verifica se a requisição possui todos os dados
		if (
			data.title != '' &&
			data.album != '' &&
			data.artist != '' &&
			data.duration != ''
		) {
			await database.query(
				'insert into musics(title, album, artist, duration) values (?,?,?,?)',
				[data.title, data.album, data.artist, data.duration]
			);
			res.status(201).send('Música adicionada com sucesso!');
		} else {
			res.status(400).send(
				`Requisição inválida, por favor envie um JSON com os seguintes campos preenchidos: 'title(string)', 'album(string)', 'artist(string)' e 'duration(string)'`
			);
		}
	} catch (error) {
		res.status(500).send(
			'Erro ao consultar registros, Detalhe do erro: ',
			error
		);
	}
});

/* -------------------------- Rota PATCH - Privada -------------------------- */
router.patch('/:id', auth, async (req, res) => {
	try {
		const { id } = req.params;
		let updates = {
			title: null,
			album: null,
			artist: null,
			duration: null,
		};

		updates = { ...updates, ...req.body };

		// Verifica se pelo menos um dos itens existe na requisição.
		if (
			updates.title != null ||
			updates.album != null ||
			updates.artist != null ||
			updates.duration != null
		) {
			await database.query(
				'update musics set title = case when ? is not null then ? else title end, album = case when ? is not null then ? else album end, artist = case when ? is not null then ? else artist end, duration = case when ? is not null then ? else duration end where id = ?',
				[
					updates.title,
					updates.title,
					updates.album,
					updates.album,
					updates.artist,
					updates.artist,
					updates.duration,
					updates.duration,
					id,
				]
			);

			res.status(200).send('Música atualizada com sucesso.');
		} else {
			// Retorna requisição inválida ao usuário.
			res.status(400).send(
				`Requisição inválida, por favor envie um JSON com pelo menos um dos seguintes campos preenchidos: 'title(string)', 'album(string)', 'artist(string)' e 'duration(string)'`
			);
		}
	} catch (error) {
		res.status(500).send(
			'Erro ao consultar registros, Detalhe do erro: ',
			error
		);
	}
});

/* --------------------------- Rota PUT - Privada --------------------------- */
router.put('/:id', auth, async (req, res) => {
	try {
		const { id } = req.params;
		const updates = req.body;

		// Verifica se todos os itens do objeto existem.
		if (
			updates.title &&
			updates.album &&
			updates.artist &&
			updates.duration
		) {
			// Atualiza a música no banco de dados
			await database.query(
				'update musics set title = ?, album = ?, artist = ?, duration = ? where id = ?',
				[
					updates.title,
					updates.album,
					updates.artist,
					updates.duration,
					id,
				]
			);
			res.status(200).send('Música atualizada com sucesso.');
		} else {
			res.status(400).send(
				`Requisição inválida, por favor envie um JSON com os seguintes campos preenchidos: 'title(string)', 'album(string)', 'artist(string)' e 'duration(string)'`
			);
		}
	} catch (error) {
		res.status(500).send(
			'Erro ao consultar registros, Detalhe do erro: ',
			error
		);
	}
});

/* -------------------------- Rota DELETE - Privada ------------------------- */
router.delete('/:id', auth, async (req, res) => {
	try {
		const { id } = req.params;
		const [result] = await database.query(
			'delete from musics where id = ?',
			id
		);
		if (result.affectedRows > 0) {
			res.status(200).send('Música deletada com sucesso!');
		} else {
			res.status(404).send(
				'Música não encontrada. Tente buscar por outro id.'
			);
		}
	} catch (error) {
		res.status(500).send(
			'Erro ao consultar registros, Detalhe do erro: ',
			error
		);
	}
});

/* ------------------------- Rota OPTIONS - Pública ------------------------- */
router.options('/', (req, res) => {
	res.header('Allow', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
	res.status(204).send();
});

export default router;
