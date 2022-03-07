const Sequelize = require('sequelize');
const moment = require("moment")
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('DisasterType', {
        dt_id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        dt_name: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        dt_created_at: {
            type: 'TIMESTAMP',
            allowNull: true,
            defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
            get() {
                return moment(this.getDataValue('dt_created_at')).format('YYYY-MM-DD HH:mm:ss');
            }
        },
        dt_updated_at: {
            type: 'TIMESTAMP',
            allowNull: true,
            defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
            get() {
                return moment(this.getDataValue('dt_updated_at')).format('YYYY-MM-DD HH:mm:ss');
            }
        }
    }, {
        sequelize,
        tableName: 'disaster_type',
        timestamps: false,
        indexes: [
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "dt_id" },
                ]
            },
        ]
    });
};
