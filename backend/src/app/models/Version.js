import { Model, Sequelize } from 'sequelize';

class Version extends Model {
	static init(sequelize) {
		super.init(
			{
				version: Sequelize.STRING,
				description: Sequelize.STRING(3000),
			},
			{
				sequelize,
			}
		);

		return this;
	}
}

export default Version;
