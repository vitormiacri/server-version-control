import * as Yup from 'yup';
import { Op } from 'sequelize';

import Version from '../models/Version';

const schema = Yup.object().shape({
	version: Yup.string().required(),
	desciption: Yup.string(),
});

class VersionsController {
	async index(req, res) {
		const { id, version, page = 1, perPage = 5 } = req.query;
		const where = {};

		if (id) {
			where.id = {
				[Op.eq]: id,
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

		const versions = await Version.findAndCountAll({
			where: where || null,
			limit: Number(perPage),
			offset: Number(page) * perPage,
		});

		return res.json(versions);
	}

	async store(req, res) {
		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'Campos inválidos' });
		}

		const version = await Version.create(req.body);

		return res.json(version);
	}

	async update(req, res) {
		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'Campos inválidos' });
		}

		const { id } = req.params;

		const server = await Version.findByPk(id);

		await server.update(req.body);

		return res.json(server);
	}

	async delete(req, res) {
		const { id } = req.params;

		const version = await Version.findByPk(id);

		if (!version) {
			return res.status(401).json({ error: 'Versão não encontrada' });
		}

		await version.destroy();

		return res.json({ message: 'Versão excluída' });
	}
}

export default new VersionsController();
