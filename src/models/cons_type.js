const moment = require('moment');
const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const consType = sequelize.define('ConsType', {
    ct_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ct_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ct_created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      get() {
        return moment(this.getDataValue('ct_created_at')).format('YYYY-MM-DD HH:mm:ss');
      }
    },
    ct_updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      get() {
        return moment(this.getDataValue('ct_updated_at')).format('YYYY-MM-DD HH:mm:ss');
      }
    }
  }, {
    sequelize,
    tableName: 'cons_type',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ct_id" },
        ]
      },
    ]
  });

  consType.isIdTaken = async function(consTypeId) {
    const consType = await this.findOne({where: {ct_id: consTypeId}});
    return !!consType;
  }

  return consType;
};
