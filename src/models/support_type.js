const moment = require('moment');
const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const supportType = sequelize.define('SupportType', {
    st_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    st_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    st_created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      get() {
        return moment(this.getDataValue('st_created_at')).format('YYYY-MM-DD HH:mm:ss');
      }
    },
    st_updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      get() {
        return moment(this.getDataValue('st_updated_at')).format('YYYY-MM-DD HH:mm:ss');
      }
    }
  }, {
    sequelize,
    tableName: 'support_type',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "st_id" },
        ]
      },
    ]
  });

  supportType.isIdTaken = async function(supportTypeId) {
    const supportType = await this.findOne({where: {st_id: supportTypeId}});
    return !!supportType;
  }

  return supportType;
};
