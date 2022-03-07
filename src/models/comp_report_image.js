const moment = require('moment');
const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const compReportImage = sequelize.define('CompReportImage', {
    ci_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ci_cr_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'comp_report',
        key: 'cr_id'
      }
    },
    ci_page_num: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ci_image: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    ci_created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      get() {
        return moment(this.getDataValue('ci_created_at')).format('YYYY-MM-DD HH:mm:ss');
      }
    },
    ci_updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      get() {
        return moment(this.getDataValue('ci_updated_at')).format('YYYY-MM-DD HH:mm:ss');
      }
    }
  }, {
    sequelize,
    tableName: 'comp_report_image',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ci_id" },
        ]
      },
      {
        name: "ci_cr_id",
        using: "BTREE",
        fields: [
          { name: "ci_cr_id" },
        ]
      },
    ]
  });

  compReportImage.getNextPageNum = async function(compReportImageId) {
    const compReportImage = await this.findOne({where: {ci_cr_id: compReportImageId}, order: ['ci_id', "DESC"]});
    return compReportImage ? ++compReportImage.ci_page_num : 1;
  }

  return compReportImage;
};
