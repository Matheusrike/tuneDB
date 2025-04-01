import axios from 'axios';
import inquirer from 'inquirer';
import chalk from 'chalk';

const port = 3000;
const API_URL = `http://localhost:${port}`;

let password = undefined;
axios.defaults.headers.common['Authorization'] = `Bearer ${password}`;

async function getMusics() {
	try {
		const res = await axios.get(`${API_URL}/music`);
		if (res === '') {
			console.log(
				chalk.bgYellowBright.blackBright.bold(
					' Nenhuma música registrada. '
				)
			);
			return '';
		}
		return res.data;
	} catch (error) {
		console.error(
			chalk.bgRedBright.whiteBright.bold(
				` Request Error: ${error.message}`
			)
		);
	}
}

async function getMusicById(id) {
	try {
		const res = await axios.get(`${API_URL}/music/${id}`);
		return res.data;
	} catch (error) {
		if (error.response.status === 404) {
			console.log(
				chalk.bgYellowBright.blackBright.bold(
					' Nenhuma música encontrada com esse ID, tente novamente. '
				)
			);
			return '';
		} else {
			console.error(
				chalk.bgRedBright.whiteBright.bold(
					` Request Error: ${error.message}`
				)
			);
		}
	}
}

async function postMusic(reqBody) {
	try {
		await axios
			.post(`${API_URL}/music`, reqBody, {})
			.then((res) => {
				return res;
			})
			.catch((err) => {
				console.error(
					chalk.bgRedBright.whiteBright.bold(
						` Response Error: ${err.message}`
					)
				);
			});
	} catch (error) {
		console.error(
			chalk.bgRedBright.whiteBright.bold(
				` Request Error: ${error.message}`
			)
		);
	}
}

async function putMusic(id, reqBody) {
	try {
		await axios
			.put(`${API_URL}/music/${id}`, reqBody)
			.then((res) => {
				return res;
			})
			.catch((err) => {
				console.error(
					chalk.bgRedBright.whiteBright.bold(
						` Response Error: ${err.message}`
					)
				);
			});
	} catch (error) {
		console.error(
			chalk.bgRedBright.whiteBright.bold(
				` Request Error: ${error.message}`
			)
		);
	}
}

async function patchMusic(id, reqBody) {
	try {
		await axios
			.patch(`${API_URL}/music/${id}`, reqBody)
			.then((res) => {
				return res;
			})
			.catch((err) => {
				console.error(
					chalk.bgRedBright.whiteBright.bold(
						` Response Error: ${err.message}`
					)
				);
			});
	} catch (error) {
		console.error(
			chalk.bgRedBright.whiteBright.bold(
				` Request Error: ${error.message} `
			)
		);
	}
}

async function deleteMusic(id) {
	try {
		const res = await axios.delete(`${API_URL}/music/${id}`);
		return res;
	} catch (error) {
		console.error(
			chalk.bgRedBright.whiteBright.bold(
				` Request Error: ${error.message} `
			)
		);
	}
}

async function checkOptions() {
	try {
		const res = await axios.options(`${API_URL}/music`);
		return res.headers;
	} catch (error) {
		console.error(
			chalk.bgRedBright.whiteBright.bold(
				` Request Error: ${error.message} `
			)
		);
	}
}

async function checkAuth() {
	if (axios.defaults.headers.common['Authorization'] != `Bearer segredo`) {
		console.log(
			chalk.bgYellowBright.blackBright.bold(
				' Autentique-se primeiro para realizar essa ação. '
			)
		);

		do {
			password = await inquirer.prompt([
				{
					type: 'password',
					name: 'value',
					message: 'Digite a senha:',
					mask: '*',
				},
			]);

			if (password != 'segredo') {
				console.log('Senha incorreta');
			}
		} while (password !== 'segredo');
	}
}

async function showMenu() {
	const startQuestion = [
		{
			type: 'list',
			name: 'option',
			message: chalk.yellowBright(`Selecione uma das opções abaixo:`),
			choices: [
				{
					name: chalk.greenBright('Consultar registro de músicas'),
					value: 'get',
				},
				{
					name: chalk.greenBright('Consultar música especifica'),
					value: 'getById',
				},
				{
					name: chalk.greenBright('Adicionar música ao registro'),
					value: 'post',
				},
				{
					name: chalk.greenBright('Atualizar música'),
					value: 'put',
				},
				{
					name: chalk.greenBright('Atualizar informação da música'),
					value: 'patch',
				},
				{
					name: chalk.greenBright('Remover música do registro'),
					value: 'delete',
				},
				{
					name: chalk.redBright('Sair →'),
					value: 'exit',
				},
			],
		},
	];
	try {
		const res = await inquirer.prompt(startQuestion);
		switch (res.option) {
			// Opção GET
			case 'get':
				const musics = await getMusics();
				console.table(musics);
				console.log('\n');
				showMenu();
				break;

			// Opção GET por ID
			case 'getById':
				const musicId = await inquirer.prompt([
					{
						type: 'input',
						name: 'id',
						message: chalk.yellow('Insira o ID da música: '),
					},
				]);
				const music = await getMusicById(musicId.id);
				console.table(music);
				showMenu();
				break;

			// Opção de POST
			case 'post':
				await checkAuth();
				const req = { title: '', album: '', artist: '', duration: '' };
				console.table(req);
				showMenu();
				break;

			// Opção de sair
			case 'exit':
				console.log(
					'\n',
					chalk.bgGreenBright.whiteBright.bold(' Finalizado! '),
					'\n'
				);
				break;
		}
	} catch (error) {
		console.error(
			chalk.bgRedBright.whiteBright.bold(
				` Request Error: ${error.message} `
			)
		);
	}
}

showMenu();
