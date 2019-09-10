import { Model, Sequelize } from 'sequelize';

class Servers extends Model {
	static init(sequelize) {
		super.init(
			{
				name: Sequelize.STRING,
				ip: Sequelize.STRING,
				version: Sequelize.STRING,
			},
			{
				sequelize,
			}
		);

		return this;
	}
}

export default Servers;
