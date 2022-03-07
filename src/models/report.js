const moment = require('moment');
const Sequelize = require('sequelize');
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const {Op} = require("sequelize");

module.exports = function(sequelize, DataTypes) {
  const report = sequelize.define('Report', {
    re_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    re_su_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Support',
        key: 'su_id'
      }
    },
    re_created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      get() {
        return moment(this.getDataValue('re_created_at')).format('YYYY-MM-DD HH:mm:ss');
      }
    },
    re_updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      get() {
        return moment(this.getDataValue('re_updated_at')).format('YYYY-MM-DD HH:mm:ss');
      }
    }
  }, {
    sequelize,
    tableName: 'report',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "re_id" },
        ]
      },
      {
        name: "re_su_id",
        using: "BTREE",
        fields: [
          { name: "re_su_id" },
        ]
      },
    ]
  });

  report.isReportIdTaken = async function(reportId) {
    const report = await this.findOne({where: {re_id: reportId}});
    return !!report;
  }

  return report;
};
