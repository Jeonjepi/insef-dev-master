const Sequelize = require('sequelize');
const moment = require("moment")
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('ConsRiskFactors', {
        fk_id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        fk_type: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        fk_rule: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        fk_photo: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        fk_element: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        fk_factor: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        fk_element_factor: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        fk_hazardous_type: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        fk_measures: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        fk_measures_detail: {
            type: DataTypes.TEXT(),
            allowNull: true
        },
        fk_created_at: {
            type: 'TIMESTAMP',
            allowNull: true,
            defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
            get() {
                return moment(this.getDataValue('fk_created_at')).format('YYYY-MM-DD HH:mm:ss');
            }
        },
        fk_updated_at: {
            type: 'TIMESTAMP',
            allowNull: true,
            defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
            get() {
                return moment(this.getDataValue('fk_updated_at')).format('YYYY-MM-DD HH:mm:ss');
            }
        }
    }, {
        sequelize,
        tableName: 'cons_risk_factors',
        timestamps: false,
        indexes: [
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "fk_id" },
                ]
            },
        ]
    });
};
