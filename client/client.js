import axios from 'axios';
import inquirer from 'inquirer';
import chalk from 'chalk';

const port = 3000;
const API_URL = `http://localhost:${port}`;

axios.defaults.headers.common['Authorization'] = undefined;

const divider = () => {
	return chalk.gray(
		'---------------------------------------------------------------------------'
	);
};

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
				'\n',
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
				console.log(
					'\n',
					chalk.bgGreenBright.blackBright.bold(
						' Música registrada com sucesso! '
					),
					'\n',
					divider(),
					'\n'
				);
				return res;
			})
			.catch((err) => {
				if (err.response.status === 400) {
					console.log(
						'\n',
						chalk.bgYellowBright.blackBright.bold(
							' Envio de dados fora do padrão, tente novamente. '
						),
						'\n',
						divider(),
						'\n'
					);
					return '';
				} else {
					console.error(
						chalk.bgRedBright.whiteBright.bold(
							` Response Error: ${err.message}`
						)
					);
				}
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
				if (err.response.status === 404) {
					console.log(
						'\n',
						chalk.bgYellowBright.blackBright.bold(
							' Nenhuma música encontrada com esse ID, tente novamente. '
						),
						'\n'
					);
					return '';
				}
				if (err.response.status === 400) {
					console.log(
						'\n',
						chalk.bgYellowBright.blackBright.bold(
							' Envio de dados fora do padrão, tente novamente. '
						),
						'\n',
						divider()
					);
					return '';
				} else {
					console.error(
						chalk.bgRedBright.whiteBright.bold(
							` Response Error: ${err.message}`
						)
					);
				}
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
				if (err.response.status === 404) {
					console.log(
						'\n',
						chalk.bgYellowBright.blackBright.bold(
							' Nenhuma música encontrada com esse ID, tente novamente. '
						),
						'\n'
					);
					return '';
				}
				if (err.response.status === 400) {
					console.log(
						'\n',
						chalk.bgYellowBright.blackBright.bold(
							' Envio de dados fora do padrão, tente novamente. '
						),
						'\n',
						divider(),
						'\n'
					);
					return '';
				} else {
					console.error(
						chalk.bgRedBright.whiteBright.bold(
							` Response Error: ${err.message}`
						)
					);
				}
			});
	} catch (error) {
		console.error(
			chalk.bgRedBright.whiteBright.bold(
				` Request Error: ${error.message}`
			)
		);
	}
}

async function deleteMusic(id) {
	try {
		const res = await axios.delete(`${API_URL}/music/${id}`);
		return res;
	} catch (error) {
		if (error.response.status === 404) {
			console.log(
				'',
				chalk.bgYellowBright.blackBright.bold(
					' Nenhuma música encontrada com esse ID, tente novamente. '
				),
				'\n',
				divider(),
				'\n'
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

console.log(
	'=========================================================',
	chalk.yellowBright(`

████████╗██╗   ██╗███╗   ██╗███████╗    ██████╗ ██████╗ 
╚══██╔══╝██║   ██║████╗  ██║██╔════╝    ██╔══██╗██╔══██╗
   ██║   ██║   ██║██╔██╗ ██║█████╗      ██║  ██║██████╔╝
   ██║   ██║   ██║██║╚██╗██║██╔══╝      ██║  ██║██╔══██╗
   ██║   ╚██████╔╝██║ ╚████║███████╗    ██████╔╝██████╔╝
   ╚═╝    ╚═════╝ ╚═╝  ╚═══╝╚══════╝    ╚═════╝ ╚═════╝ 
`),
	'\n=========================================================\n'
);
async function showMenu() {
	let reqBody = undefined;
	let musicId = undefined;
	let confirm = undefined;

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
					name: chalk.gray('Options →'),
					value: 'options',
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
				do {
					musicId = await inquirer.prompt([
						{
							type: 'input',
							name: 'id',
							message: chalk.yellow('Insira o ID da música: '),
						},
					]);

					if (isNaN(musicId.id)) {
						console.log(
							chalk.bgRedBright.whiteBright.bold(
								' ID inválido, tente novamente. '
							)
						);
					}
				} while (isNaN(musicId.id));
				const music = await getMusicById(musicId.id);
				console.table(music);
				console.log(divider());
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

				console.log('\t');
				do {
					musicId = await inquirer.prompt([
						{
							type: 'input',
							name: 'id',
							message: chalk.yellow('Insira o ID da música: '),
						},
					]);

					if (isNaN(musicId.id)) {
						console.log(
							chalk.bgRedBright.whiteBright.bold(
								' ID inválido, tente novamente. '
							)
						);
					}
				} while (isNaN(musicId.id));

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

				await putMusic(musicId.id, reqBody);
				showMenu();
				break;

			// Opção de PATCH
			case 'patch':
				await checkAuth();
				console.log('\t');

				do {
					musicId = await inquirer.prompt([
						{
							type: 'input',
							name: 'id',
							message: chalk.yellow('Insira o ID da música: '),
						},
					]);

					if (isNaN(musicId.id)) {
						console.log(
							chalk.bgRedBright.whiteBright.bold(
								' ID inválido, tente novamente. '
							)
						);
					}
				} while (isNaN(musicId.id));

				console.log('\t');
				do {
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

					reqBody = {};
					let input = {};

					console.log(
						'\n',
						chalk.bgYellowBright.blackBright.bold(
							`Informe os dados a serem alterados:`
						)
					);

					if (choices.options.includes('title')) {
						const titleQuestion = await inquirer.prompt({
							type: 'input',
							name: 'value',
							message: chalk.yellowBright(
								'Insira o título da música:'
							),
						});

						input = { title: titleQuestion.value };

						reqBody = { ...reqBody, ...input };
					}

					if (choices.options.includes('album')) {
						const albumQuestion = await inquirer.prompt({
							type: 'input',
							name: 'value',
							message: chalk.yellowBright(
								'Insira o album da música:'
							),
						});

						input = { album: albumQuestion.value };

						reqBody = { ...reqBody, ...input };
					}

					if (choices.options.includes('artist')) {
						const artistQuestion = await inquirer.prompt({
							type: 'input',
							name: 'value',
							message: chalk.yellowBright(
								'Insira o artista da música:'
							),
						});

						input = { artist: artistQuestion.value };

						reqBody = { ...reqBody, ...input };
					}

					if (choices.options.includes('duration')) {
						const durationQuestion = await inquirer.prompt({
							type: 'input',
							name: 'value',
							message: chalk.yellowBright(
								'Insira a duração da música (MM:SS):'
							),
						});

						input = { duration: durationQuestion.value };

						reqBody = { ...reqBody, ...input };
					}

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

				await patchMusic(musicId.id, reqBody);
				console.log('\t');
				showMenu();
				break;

			// Opção de DELETE
			case 'delete':
				await checkAuth();
				console.log('\t');

				do {
					musicId = await inquirer.prompt([
						{
							type: 'input',
							name: 'id',
							message: chalk.yellow('Insira o ID da musica: '),
						},
					]);

					if (isNaN(musicId.id)) {
						console.log(
							chalk.bgRedBright.whiteBright.bold(
								' ID inválido, tente novamente. '
							)
						);
					}
				} while (isNaN(musicId.id));

				confirm = await inquirer.prompt([
					{
						type: 'confirm',
						name: 'value',
						message: chalk.yellow(
							`Confirma exclusão da musica no registro?`
						),
					},
				]);

				if (confirm.value != true) {
					console.log(
						'\n',
						chalk.bgYellowBright.blackBright.bold(
							' Operação cancelada! '
						),
						'\n',
						divider(),
						'\n'
					);
					showMenu();
					break;
				} else {
					console.log('\t');
					await deleteMusic(musicId.id).catch((error) => {
						if (error.response.status === 404) {
							console.log(
								chalk.bgRedBright.whiteBright.bold(
									' ID inválido, tente novamente. '
								)
							);
						} else {
							console.log(
								'\n',
								chalk.bgGreenBright.blackBright.bold(
									' Música excluída com sucesso! '
								),
								'\n',
								divider(),
								'\n'
							);
						}
					});

					showMenu();
					break;
				}

			// Opção de OPTIONS
			case 'options':
				const res = await checkOptions();
				console.log();
				console.log(
					chalk.bgBlueBright.whiteBright.bold(' OPTIONS '),
					'\n\n',
					res.allow,
					'\n',
					divider(),
					'\n'
				);
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
