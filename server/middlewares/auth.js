const auth = (req, res, next) => {
	const token = req.headers['authorization'];
	token === 'segredo'
		? next()
		: res.status(401).send('Você não tem permissão de realizar essa ação!');
};

export default auth;
