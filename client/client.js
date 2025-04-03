import axios from 'axios';
import inquirer from 'inquirer';
import chalk from 'chalk';

const port = 3000;
const API_URL = `http://localhost:${port}`;

axios.defaults.headers.common['Authorization'] = undefined;

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
	if (!axios.defaults.headers.common['Authorization']) {
		console.log(
			'\n',
			chalk.bgYellowBright.blackBright.bold(
				' Autentique-se primeiro para realizar essa ação. '
			)
		);

		let password = '';

		do {
			const inputPassword = await inquirer.prompt([
				{
					type: 'password',
					name: 'value',
					message: 'Digite a senha:',
					mask: '•',
				},
			]);

			password = inputPassword.value;

			password != 'segredo'
				? console.log(
						'\n',
						chalk.bgYellowBright.blackBright.bold(
							' Senha incorreta, tente novamente. '
						)
				  )
				: (axios.defaults.headers.common['Authorization'] = `segredo`);
		} while (password != 'segredo');
	}
}

async function showMenu() {
	// Define a questão inicial
	const startQuestion = [
		{
			type: 'list',
			name: 'option',
			message: chalk.yellowBright(`Selecione uma das opções abaixo:`),
			choices: [
				{
					name: chalk.greenBright('Listar todas as músicas'),
					value: 'get',
				},
				{
					name: chalk.greenBright('Buscar música por ID'),
					value: 'getById',
				},
				{
					name: chalk.greenBright('Adicionar nova música'),
					value: 'post',
				},
				{
					name: chalk.greenBright('Substituir música existente'),
					value: 'put',
				},
				{
					name: chalk.greenBright('Atualizar detalhes da música'),
					value: 'patch',
				},
				{
					name: chalk.greenBright('Remover música'),
					value: 'delete',
				},
				{
					name: chalk.redBright('Sair →'),
					value: 'exit',
				},
			],
		},
	];

	// Recebe a resposta e direciona a opção correta
	try {
		let reqBody = undefined;
		let musicId = undefined;
		let confirm = undefined;

		const divider = () => {
			return chalk.gray(
				'---------------------------------------------------------------------------'
			);
		};

		const res = await inquirer.prompt(startQuestion);
		switch (res.option) {
			// Opção GET - Retorna todas as músicas registradas
			case 'get':
				const musics = await getMusics();
				console.table(musics);
				console.log(divider(), '\n');
				showMenu();
				break;

			// Opção GET por ID - Retorna a música com o id passado
			case 'getById':
				musicId = await inquirer.prompt([
					{
						type: 'input',
						name: 'id',
						message: chalk.yellow('Insira o ID da música: '),
					},
				]);
				const music = await getMusicById(musicId.id);
				console.table(Object.values(music));
				console.log(divider(), '\n');
				showMenu();
				break;

			// Opção de POST
			case 'post':
				await checkAuth();

				reqBody = {
					title: undefined,
					album: undefined,
					artist: undefined,
					duration: undefined,
				};

				do {
					console.log(
						'\n',
						chalk.bgYellowBright.blackBright.bold(
							' Informe os dados da musica: '
						)
					);
					const setTitle = await inquirer.prompt([
						{
							type: 'input',
							name: 'title',
							message: chalk.greenBright(
								'Insira o título da música: '
							),
						},
					]);

					const setAlbum = await inquirer.prompt([
						{
							type: 'input',
							name: 'album',
							message: chalk.greenBright(
								'Insira o album da música: '
							),
						},
					]);

					const setArtist = await inquirer.prompt([
						{
							type: 'input',
							name: 'artist',
							message: chalk.greenBright(
								'Insira o artista da música: '
							),
						},
					]);

					const setDuration = await inquirer.prompt([
						{
							type: 'input',
							name: 'duration',
							message: chalk.greenBright(
								'Insira a duração da musica (MM:SS): '
							),
						},
					]);

					reqBody = {
						title: setTitle.title,
						album: setAlbum.album,
						artist: setArtist.artist,
						duration: setDuration.duration,
					};

					console.log('\n', divider());
					console.table(reqBody);

					confirm = await inquirer.prompt([
						{
							type: 'confirm',
							name: 'value',
							message: chalk.yellow(
								`Confirma a inclusão da musica no registro?`
							),
						},
					]);
				} while (confirm.value != true);

				console.log(
					'\n',
					chalk.bgGreenBright.blackBright.bold(
						' Música registrada com sucesso! '
					),
					'\n',
					divider(),
					'\n'
				);

				await postMusic(reqBody);
				showMenu();
				break;

			// Opção de PUT
			case 'put':
				await checkAuth();

				reqBody = {
					title: undefined,
					album: undefined,
					artist: undefined,
					duration: undefined,
				};

				const musicIdQuestion = await inquirer.prompt([
					{
						type: 'input',
						name: 'id',
						message: chalk.yellow('Insira o ID da música: '),
					},
				]);

				musicId = musicIdQuestion.id;

				do {
					console.log(
						'\n',
						chalk.bgYellowBright.blackBright.bold(
							' Informe os dados da musica: '
						)
					);
					const setTitle = await inquirer.prompt([
						{
							type: 'input',
							name: 'title',
							message: chalk.greenBright(
								'Insira o título da música: '
							),
						},
					]);

					const setAlbum = await inquirer.prompt([
						{
							type: 'input',
							name: 'album',
							message: chalk.greenBright(
								'Insira o album da música: '
							),
						},
					]);

					const setArtist = await inquirer.prompt([
						{
							type: 'input',
							name: 'artist',
							message: chalk.greenBright(
								'Insira o artista da música: '
							),
						},
					]);

					const setDuration = await inquirer.prompt([
						{
							type: 'input',
							name: 'duration',
							message: chalk.greenBright(
								'Insira a duração da musica (MM:SS): '
							),
						},
					]);

					reqBody = {
						title: setTitle.title,
						album: setAlbum.album,
						artist: setArtist.artist,
						duration: setDuration.duration,
					};

					console.log(divider());
					console.table(reqBody);

					confirm = await inquirer.prompt([
						{
							type: 'confirm',
							name: 'value',
							message: chalk.yellow(
								`Confirma atualização da musica no registro?`
							),
						},
					]);
				} while (confirm.value != true);

				await putMusic(musicId, reqBody);
				showMenu();
				break;

			case 'patch':
				const choices = await inquirer.prompt({
					type: 'checkbox',
					name: 'options',
					message: chalk.greenBright(
						'Selecione quais informações deseja alterar'
					),
					choices: [
						{ name: 'Titulo', value: 'title' },
						{ name: 'Album', value: 'album' },
						{ name: 'Artista', value: 'artist' },
						{ name: 'Duração', value: 'duration' },
					],
				});

				let option = (reqBody = {});

				if (choices.options.includes('title')) {
					const titleQuestion = await inquirer.prompt({
						type: 'input',
						name: 'value',
						message: chalk.greenBright(
							'Insira o título da música:'
						),
					});

					let input = { title: titleQuestion.value };

					reqBody = { ...reqBody, ...input };
					console.log(reqBody);
				}

				if (choices.options.includes('album')) {
					console.log('album existe');
				}

				if (choices.options.includes('artist')) {
					console.log('artist existe');
				}

				if (choices.options.includes('duration')) {
					console.log('duration existe');
				}
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
