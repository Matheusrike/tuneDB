import axios from 'axios';
import inquirer from 'inquirer';
import chalk from 'chalk';

const port = 3000;
const API_URL = `http://localhost:${port}`;

async function getAllMusics() {
	try {
		const res = await axios.get(`${API_URL}/musics`);
		return res.data;
	} catch (error) {
		console.error(
			chalk.bgRedBright.whiteBright.bold(
				` Request Error: ${error.message}`
			)
		);
	}
}

async function getMusic(id) {
	try {
		const res = await axios.get(`${API_URL}/musics/${id}`);
		return res.data;
	} catch (error) {
		console.error(
			chalk.bgRedBright.whiteBright.bold(
				` Request Error: ${error.message}`
			)
		);
	}
}

async function postMusic(reqBody) {
	try {
		await axios
			.post(`${API_URL}/musics`, reqBody)
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
			.put(`${API_URL}/musics/${id}`, reqBody)
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
			.patch(`${API_URL}/musics/${id}`, reqBody)
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

async function deleteMusic(id) {
	try {
		const res = await axios.delete(`${API_URL}/musics/${id}`);
		return res;
	} catch (error) {
		console.error(
			chalk.bgRedBright.whiteBright.bold(
				` Request Error: ${error.message}`
			)
		);
	}
}
