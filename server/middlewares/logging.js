import { appendFileSync, existsSync, mkdirSync } from 'node:fs';

const logging = (req, res, next) => {
	const date = new Date();
	const registry = `[ ${date.toISOString()} ] | Método: ${
		req.method
	} | URL: ${req.url}\n`;
	console.log(registry);
	next();
	if (existsSync('./logs/server-log.txt')) {
		appendFileSync('./logs/server-log.txt', registry);
	} else {
		mkdirSync('logs', { recursive: true });
		appendFileSync('./logs/server-log.txt', registry);
	}
};

export default logging;
