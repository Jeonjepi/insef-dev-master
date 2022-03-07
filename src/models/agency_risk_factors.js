const Sequelize = require('sequelize');
const moment = require("moment")
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('AgencyRiskFactors', {
        ar_id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        ar_ag_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Agency',
                key: 'ag_id'
            }
        },
        ar_rule: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        ar_photo: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        ar_element: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        ar_factor: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        ar_element_factor: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        ar_hazardous_type: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        ar_measures: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        ar_measures_detail: {
            type: DataTypes.TEXT(),
            allowNull: true
        },
        ar_created_at: {
            type: 'TIMESTAMP',
            allowNull: true,
            defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
            get() {
                return moment(this.getDataValue('ar_created_at')).format('YYYY-MM-DD HH:mm:ss');
            }
        },
        ar_updated_at: {
            type: 'TIMESTAMP',
            allowNull: true,
            defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
            get() {
                return moment(this.getDataValue('ar_updated_at')).format('YYYY-MM-DD HH:mm:ss');
            }
        }
    }, {
        sequelize,
        tableName: 'agency_risk_factors',
        timestamps: false,
        indexes: [
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "ar_id" },
                ]
            },
            {
                name: "foreignkey",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "ar_ag_id" },
                ]
            },
        ]
    });
};
