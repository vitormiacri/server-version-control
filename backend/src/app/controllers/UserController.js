import * as Yup from 'yup';
import { Op } from 'sequelize';

import User from '../models/User';

class UserController {
	async index(req, res) {
		const { id, name, email, page = 1, perPage = 5 } = req.query;
		const where = {};

		if (id) {
			where.id = {
				[Op.eq]: id,
			};
		}

		if (name) {
			where.name = {
				[Op.or]: {
					[Op.eq]: name,
					[Op.substring]: name,
				},
			};
		}

		if (email) {
			where.email = {
				[Op.or]: {
					[Op.eq]: email,
					[Op.substring]: email,
				},
			};
		}

		const users = await User.findAndCountAll({
			where: where || null,
			attributes: ['id', 'name', 'email', 'created_at', 'updated_at'],
			limit: Number(perPage),
			offset: Number(page) * perPage,
		});

		return res.json(users);
	}

	async store(req, res) {
		const schema = Yup.object().shape({
			name: Yup.string().required('O nome é obrigatório'),
			email: Yup.string()
				.email('E-mail inválido')
				.required('O e-mail é obrigatório'),
			password: Yup.string()
				.required('A senha é obrigatória')
				.min(6, 'Senha deve conter no mínimo 6 caracteres'),
		});

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'Campos inválidos' });
		}

		const userExists = await User.findOne({ where: { email: req.body.email } });

		if (userExists) {
			return res.status(400).json({ error: 'Usuário já existe' });
		}

		const { id, name, email } = await User.create(req.body);

		return res.json({ id, name, email });
	}

	async update(req, res) {
		const schema = Yup.object().shape({
			name: Yup.string(),
			email: Yup.string().email('E-mail inválido'),
			oldPassword: Yup.string()
				.nullable(true)
				.min(6),
			password: Yup.string()
				.nullable(true)
				.min(6, 'A nova senha deve conter no mínimo 6 caracteres')
				.when('oldPassword', (oldPassword, field) =>
					oldPassword ? field.required('A nova senha é requerida') : field
				),
			confirmPassword: Yup.string()
				.nullable(true)
				.when('password', (password, field) =>
					password ? field.required().oneOf([Yup.ref('password')]) : field
				),
		});

		const { id: idParams } = req.params;

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'Campos inválidos' });
		}

		// form fields
		const { email, oldPassword } = req.body;

		const userUpdate = await User.findByPk(idParams);

		if (email !== userUpdate.email) {
			const userExists = await User.findOne({
				where: { email },
			});

			if (userExists) {
				return res.status(400).json({ error: 'Usuário já existe' });
			}
		}

		if (oldPassword && !(await userUpdate.checkPassword(oldPassword))) {
			return res.status(401).json({ error: 'Senha inválida' });
		}

		await userUpdate.update(req.body);

		return res.json(userUpdate);
	}

	async delete(req, res) {
		const { id } = req.params;

		const user = await User.findByPk(id);

		if (!user) {
			return res.status(401).json({ error: 'Usuário não encontrado' });
		}

		await user.destroy();

		return res.json({ message: 'Usuário excluído' });
	}
}

export default new UserController();
