const moment = require('moment');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');

module.exports = function(sequelize, DataTypes) {
    const process = sequelize.define('Process', {
        pr_id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        pr_name: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        pr_created_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
            get() {
                return moment(this.getDataValue('pr_created_at')).format('YYYY-MM-DD HH:mm:ss');
            }
        },
        pr_updated_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
            get() {
                return moment(this.getDataValue('pr_updated_at')).format('YYYY-MM-DD HH:mm:ss');
            }
        }
    }, {
        sequelize,
        tableName: 'process',
        timestamps: false,
        indexes: [
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [
                    {name: "pr_id"},
                ]
            },
        ]
    });
    return process;
};
