module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('versions', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			version: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			description: {
				type: Sequelize.STRING(3000),
				allowNull: true,
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: true,
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: true,
			},
		});
	},

	down: queryInterface => {
		return queryInterface.dropTable('versions');
	},
};
