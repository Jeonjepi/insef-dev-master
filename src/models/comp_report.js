const moment = require('moment');
const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  const compReport = sequelize.define('CompReport', {
    cr_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cr_re_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'report',
        key: 're_id'
      }
    },
    cr_pdf: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    cr_created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      get() {
        return moment(this.getDataValue('cr_created_at')).format('YYYY-MM-DD HH:mm:ss');
      }
    },
    cr_updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      get() {
        return moment(this.getDataValue('cr_updated_at')).format('YYYY-MM-DD HH:mm:ss');
      }
    }
  }, {
    sequelize,
    tableName: 'comp_report',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "cr_id" },
        ]
      },
      {
        name: "cr_re_id",
        using: "BTREE",
        fields: [
          { name: "cr_re_id" },
        ]
      },
    ]
  });

  compReport.isIdTaken = async function(compReportId) {
    const compReport = await this.findOne({where: {cr_id: compReportId}});
    return !!compReport;
  }

  return compReport;
};
