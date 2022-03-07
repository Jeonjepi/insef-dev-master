const moment = require('moment');
const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    const consType = sequelize.define('ConsDivision', {
        cd_id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        cd_name: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        cd_created_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
            get() {
                return moment(this.getDataValue('cd_created_at')).format('YYYY-MM-DD HH:mm:ss');
            }
        },
        cd_updated_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
            get() {
                return moment(this.getDataValue('cd_updated_at')).format('YYYY-MM-DD HH:mm:ss');
            }
        }
    }, {
        sequelize,
        tableName: 'cons_division',
        timestamps: false,
        indexes: [
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "cd_id" },
                ]
            },
        ]
    });

    consType.isIdTaken = async function(consTypeId) {
        const consType = await this.findOne({where: {cd_id: consTypeId}});
        return !!consType;
    }

    return consType;
};