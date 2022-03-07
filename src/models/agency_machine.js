const moment = require('moment');
const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    const machine = sequelize.define('AgencyMachine', {
        am_id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        am_ag_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Agency',
                key: 'ag_id'
            }
        },
        am_name: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        am_created_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
            get() {
                return moment(this.getDataValue('am_created_at')).format('YYYY-MM-DD HH:mm:ss');
            }
        },
        am_updated_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
            get() {
                return moment(this.getDataValue('am_updated_at')).format('YYYY-MM-DD HH:mm:ss');
            }
        }
    }, {
        sequelize,
        tableName: 'agency_machine',
        timestamps: false,
        indexes: [
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "am_id" },
                ]
            },
            {
                name: "foreignkey",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "am_ag_id" },
                ]
            },
        ]
    });

    return machine;
};
