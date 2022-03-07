const moment = require('moment');
const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('R7', {
    r7_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    r7_re_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'report',
        key: 're_id'
      }
    },
    r7_used_substance: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    r7_has_education: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    r7_is_attached: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    r7_improve_measures: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    r7_created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      get() {
        return moment(this.getDataValue('r7_created_at')).format('YYYY-MM-DD HH:mm:ss');
      }
    },
    r7_updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      get() {
        return moment(this.getDataValue('r7_updated_at')).format('YYYY-MM-DD HH:mm:ss');
      }
    }
  }, {
    sequelize,
    tableName: 'r7',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "r7_id" },
        ]
      },
      {
        name: "r7_re_id",
        using: "BTREE",
        fields: [
          { name: "r7_re_id" },
        ]
      },
    ]
  });
};
