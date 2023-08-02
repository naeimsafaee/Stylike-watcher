const { DataTypes } = require("sequelize");

module.exports = {
	attributes: {
		id: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
			unique: true,
		},
		name: {
			type: DataTypes.STRING,
		},
		description: {
			type: DataTypes.STRING,
		},
		cardTypeId: {
			type: DataTypes.BIGINT,
		},
		image: {
			type: DataTypes.JSONB,
			defaultValue: [],
		},
		ipfsImage: {
			type: DataTypes.STRING,
		},
		status: {
			type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
			defaultValue: "ACTIVE",
		},
		chain: {
			type: DataTypes.ENUM("BSC", "POLYGON"),
			defaultValue: "BSC",
		},
		serialNumber: {
			type: DataTypes.STRING,
		},
		edition: {
			type: DataTypes.INTEGER,
		},
		allowedUsageNumber: {
			type: DataTypes.INTEGER,
			defaultValue: 1,
		},
		attributes: {
			type: DataTypes.JSONB,
		},
	},
	options: {
		timestamps: true,
		paranoid: true,
	},
};
