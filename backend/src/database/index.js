import Sequelize from 'sequelize';

import User from '../app/models/User';
import Servers from '../app/models/Servers';
import Version from '../app/models/Version';

import databaseConfig from '../config/database';

const models = [User, Servers, Version];

class Database {
	constructor() {
		this.init();
	}

	init() {
		this.connection = new Sequelize(databaseConfig);

		models.map(model => model.init(this.connection));
	}
}

export default new Database();
