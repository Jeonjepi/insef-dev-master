const Sequelize = require('sequelize');
const moment = require("moment")
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('R3RiskFactors', {
    f3_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    f3_re_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Report',
        key: 're_id'
      }
    },
    f3_us_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'User',
        key: 'us_id'
      }
    },
    f3_cm_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'ConsMedia',
        key: 'cm_id'
      }
    },
    f3_title: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    f3_type: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    f3_rule: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    f3_element: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    f3_factor: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    f3_element_factor: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    f3_disaster_type: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    f3_hazardous_type: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    f3_measures: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    f3_measures_detail: {
      type: DataTypes.STRING,
      allowNull: true
    },
    f3_etc: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    f3_created_at: {
      type: 'TIMESTAMP',
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      get() {
        return moment(this.getDataValue('f3_created_at')).format('YYYY-MM-DD HH:mm:ss');
      }
    },
    f3_updated_at: {
      type: 'TIMESTAMP',
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      get() {
        return moment(this.getDataValue('f3_updated_at')).format('YYYY-MM-DD HH:mm:ss');
      }
    }
  }, {
    sequelize,
    tableName: 'r3_risk_factors',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "f3_id" },
        ]
      },
      {
        name: "f3_re_id",
        using: "BTREE",
        fields: [
          { name: "f3_re_id" },
        ]
      },
      {
        name: "f3_cm_id",
        using: "BTREE",
        fields: [
          { name: "f3_cm_id" },
        ]
      },
    ]
  });
};
