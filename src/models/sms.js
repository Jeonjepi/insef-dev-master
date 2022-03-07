const moement = require('moment');
const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('SMS', {
        sm_id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        sm_us_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'us_id'
            }
        },
        sm_content: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        sm_created_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
            get() {
                return moment(this.getDataValue('sm_created_at')).format('YYYY-MM-DD HH:mm:ss');
            }
        },
        sm_updated_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
            get() {
                return moment(this.getDataValue('sm_updated_at')).format('YYYY-MM-DD HH:mm:ss');
            }
        }
    }, {
        sequelize,
        tableName: 'sms',
        timestamps: false,
        indexes: [
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "sm_id" },
                ]
            },
            {
                name: "sm_re_id",
                using: "BTREE",
                fields: [
                    { name: "sm_re_id" },
                ]
            },
        ]
    });
};
