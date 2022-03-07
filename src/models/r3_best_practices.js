const Sequelize = require('sequelize');
const moment = require("moment")
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('R3BestPractices', {
        b3_id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        b3_re_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Report',
                key: 're_id'
            }
        },
        b3_cm_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'ConsMedia',
                key: 'cm_id'
            }
        },
        b3_title: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        b3_content: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        b3_etc: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        b3_created_at: {
            type: 'TIMESTAMP',
            allowNull: true,
            defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
            get() {
                return moment(this.getDataValue('b3_created_at')).format('YYYY-MM-DD HH:mm:ss');
            }
        },
        b3_updated_at: {
            type: 'TIMESTAMP',
            allowNull: true,
            defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
            get() {
                return moment(this.getDataValue('b3_updated_at')).format('YYYY-MM-DD HH:mm:ss');
            }
        }
    }, {
        sequelize,
        tableName: 'r3_best_practices',
        timestamps: false,
        indexes: [
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "b3_id" },
                ]
            },
            {
                name: "b3_re_id",
                using: "BTREE",
                fields: [
                    { name: "b3_re_id" },
                ]
            },
            {
                name: "b3_cm_id",
                using: "BTREE",
                fields: [
                    { name: "b3_cm_id" },
                ]
            },
        ]
    });
};
