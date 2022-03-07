const moment = require('moment');
const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('R4', {
    r4_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    r4_re_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'report',
        key: 're_id'
      }
    },
    r4_title: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    r4_element: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    r4_factor: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    r4_disaster_type: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    r4_hazardous_type: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    r4_measures: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    r4_measures_detail: {
      type: DataTypes.STRING,
      allowNull: true
    },
    r4_created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      get() {
        return moment(this.getDataValue('r4_created_at')).format('YYYY-MM-DD HH:mm:ss');
      }
    },
    r4_updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      get() {
        return moment(this.getDataValue('r4_updated_at')).format('YYYY-MM-DD HH:mm:ss');
      }
    }
  }, {
    sequelize,
    tableName: 'r4',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "r4_id" },
        ]
      },
      {
        name: "r4_re_id",
        using: "BTREE",
        fields: [
          { name: "r4_re_id" },
        ]
      },
    ]
  });
};
