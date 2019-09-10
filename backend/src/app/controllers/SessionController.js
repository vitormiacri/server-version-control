import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import auth from '../../config/auth';
import User from '../models/User';

class SessionController {
	async store(req, res) {
		const schema = Yup.object().shape({
			email: Yup.string()
				.email()
				.required(),
			password: Yup.string().required(),
		});

		if (!(await schema.isValid(req.body))) {
			return res.status(401).json({ error: 'Campos inválidos' });
		}

		const { email, password } = req.body;

		const user = await User.findOne({ where: { email } });

		if (!user) {
			return res.status(401).json({ error: 'Usuário não encontrado' });
		}

		if (!(await user.checkPassword(password))) {
			return res.status(401).json({ error: 'Senha ou e-mail inválidos' });
		}

		const { id, name } = user;

		return res.json({
			user: { id, name, email },
			token: jwt.sign({ id }, auth.secret, { expiresIn: auth.expiresIn }),
		});
	}
}

export default new SessionController();
