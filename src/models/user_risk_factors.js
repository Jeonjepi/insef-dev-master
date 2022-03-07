const Sequelize = require('sequelize');
const moment = require("moment")
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('UserRiskFactors', {
        uf_id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        uf_us_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User',
                key: 'us_id'
            }
        },
        uf_type: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        uf_rule: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        uf_photo: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        uf_element: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        uf_factor: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        uf_disaster_type: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        uf_hazardous_type: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        uf_measures: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        uf_measures_detail: {
            type: DataTypes.TEXT(),
            allowNull: true
        },
        uf_created_at: {
            type: 'TIMESTAMP',
            allowNull: true,
            defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
            get() {
                return moment(this.getDataValue('uf_created_at')).format('YYYY-MM-DD HH:mm:ss');
            }
        },
        uf_updated_at: {
            type: 'TIMESTAMP',
            allowNull: true,
            defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
            get() {
                return moment(this.getDataValue('uf_updated_at')).format('YYYY-MM-DD HH:mm:ss');
            }
        }
    }, {
        sequelize,
        tableName: 'user_risk_factors',
        timestamps: false,
        indexes: [
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "uf_id" },
                ]
            },
            {
                name: "uf_us_id",
                using: "BTREE",
                fields: [
                    { name: "uf_us_id" },
                ]
            },
        ]
    });
};
