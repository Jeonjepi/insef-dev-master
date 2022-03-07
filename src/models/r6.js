const moment = require('moment');
const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('R6', {
    r6_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    r6_re_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'report',
        key: 're_id'
      }
    },
    r6_cm_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'consMedia',
        key: 'cm_id'
      }
    },
    r6_point_out: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    r6_implementation: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    r6_etc: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    r6_created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      get() {
        return moment(this.getDataValue('r6_created_at')).format('YYYY-MM-DD HH:mm:ss');
      }
    },
    r6_updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      get() {
        return moment(this.getDataValue('r6_updated_at')).format('YYYY-MM-DD HH:mm:ss');
      }
    }
  }, {
    sequelize,
    tableName: 'r6',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "r6_id" },
        ]
      },
      {
        name: "r6_re_id",
        using: "BTREE",
        fields: [
          { name: "r6_re_id" },
        ]
      },
      {
        name: "r6_cm_id",
        using: "BTREE",
        fields: [
          { name: "r6_cm_id" },
        ]
      },
    ]
  });
};
