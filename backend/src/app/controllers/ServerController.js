import * as Yup from 'yup';
import { Op } from 'sequelize';

import Servers from '../models/Servers';

const schema = Yup.object().shape({
	name: Yup.string().required('O nome é obrigatório'),
	ip: Yup.string().matches(
		/^(?=.*[^.]$)((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).?){4}$/,
		'Insira um IP válido'
	),
	version: Yup.string(),
});

class ServerController {
	async index(req, res) {
		const { id, name, ip, version, page = 1, perPage = 5 } = req.query;
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

		if (ip) {
			where.ip = {
				[Op.or]: {
					[Op.eq]: ip,
					[Op.substring]: ip,
				},
			};
		}

		if (version) {
			where.version = {
				[Op.or]: {
					[Op.eq]: version,
					[Op.substring]: version,
				},
			};
		}

		const servers = await Servers.findAndCountAll({
			where: where || null,
			limit: Number(perPage),
			offset: Number(page) * perPage,
			order: [['created_at', 'DESC']],
		});

		return res.json(servers);
	}

	async store(req, res) {
		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'Campos inválidos' });
		}

		const server = await Servers.create(req.body);

		return res.json(server);
	}

	async update(req, res) {
		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'Campos inválidos' });
		}

		const { id } = req.params;

		const server = await Servers.findByPk(id);

		await server.update(req.body);

		return res.json(server);
	}

	async delete(req, res) {
		const { id } = req.params;

		const server = await Servers.findByPk(id);

		if (!server) {
			return res.status(401).json({ error: 'Servidor não encontrado' });
		}

		await server.destroy();

		return res.json({ message: 'Servidor excluído' });
	}
}

export default new ServerController();
