const moment = require('moment');
const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const consProcessInfo = sequelize.define('ConsProcessInfo', {
    pi_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    pi_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    pi_created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      get() {
        return moment(this.getDataValue('pi_created_at')).format('YYYY-MM-DD HH:mm:ss');
      }
    },
    pi_updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      get() {
        return moment(this.getDataValue('pi_updated_at')).format('YYYY-MM-DD HH:mm:ss');
      }
    }
  }, {
    sequelize,
    tableName: 'cons_process_info',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "pi_id" },
        ]
      },
    ]
  });

  consProcessInfo.isConsProcessInfoIdTaken = async function(consProcessInfoId) {
    const consProcessInfo = await this.findOne({where: {pi_id: consProcessInfoId}});
    return !!consProcessInfo;
  }

  return consProcessInfo;
};
