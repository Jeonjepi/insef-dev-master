const Sequelize = require('sequelize');
const moment = require("moment")
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('AgencyDisasterType', {
        ad_id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        ad_name: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        ad_ag_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Agency',
                key: 'ag_id'
            }
        },
        ad_created_at: {
            type: 'TIMESTAMP',
            allowNull: true,
            defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
            get() {
                return moment(this.getDataValue('ad_created_at')).format('YYYY-MM-DD HH:mm:ss');
            }
        },
        ad_updated_at: {
            type: 'TIMESTAMP',
            allowNull: true,
            defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
            get() {
                return moment(this.getDataValue('ad_updated_at')).format('YYYY-MM-DD HH:mm:ss');
            }
        }
    }, {
        sequelize,
        tableName: 'agency_disaster_type',
        timestamps: false,
        indexes: [
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "ad_id" },
                ]
            },
            {
                name: "foreignkey",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "ad_ag_id" },
                ]
            },
        ]
    });
};
