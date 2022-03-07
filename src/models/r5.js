const moment = require('moment');
const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('R5', {
    r5_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    r5_re_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'report',
        key: 're_id'
      }
    },
    r5_cm_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ConsMedia',
        key: 'cm_id'
      }
    },
    r5_type: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    r5_support: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    r5_detail: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    r5_cm_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    r5_etc: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    r5_created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      get() {
        return moment(this.getDataValue('r5_created_at')).format('YYYY-MM-DD HH:mm:ss');
      }
    },
    r5_updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      get() {
        return moment(this.getDataValue('r5_updated_at')).format('YYYY-MM-DD HH:mm:ss');
      }
    }
  }, {
    sequelize,
    tableName: 'r5',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "r5_id" },
        ]
      },
      {
        name: "r5_re_id",
        using: "BTREE",
        fields: [
          { name: "r5_re_id" },
        ]
      },
      {
        name: "r5_cm_id",
        using: "BTREE",
        fields: [
          { name: "r5_cm_id" },
        ]
      },
    ]
  });
};
