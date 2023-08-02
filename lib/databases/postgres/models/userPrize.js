const { DataTypes } = require("sequelize");

module.exports = {
    attributes: {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: true
        },
        userId: {
            type: DataTypes.BIGINT
        },
        amount: {
            type: DataTypes.DECIMAL,
            defaultValue: 0
        },
        tier: {
            type: DataTypes.INTEGER
        },
        competitionLeagueId: {
            type: DataTypes.BIGINT,
            allowNull: true
        },
        competitionId: {
            type: DataTypes.BIGINT,
            allowNull: true
        },
        assetId: {
            type: DataTypes.BIGINT
        },
        cardTypeId: {
            type: DataTypes.BIGINT
        },
        cardNumber: {
            type: DataTypes.DECIMAL,
            defaultValue: 0
        },
        CardsId: {
            type: DataTypes.JSONB,
            defaultValue: null
        }
    },
    options: {
        timestamps: true,
        paranoid: true
    }
};
