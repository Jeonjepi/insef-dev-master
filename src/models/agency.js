const moment = require("moment");
const Sequelize = require("sequelize");
const { Op } = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  const agency = sequelize.define(
    "Agency",
    {
      ag_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      ag_type: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      ag_name: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      ag_ceo_name: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      ag_ceo_email: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      ag_ceo_phone: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      ag_regist_num: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      ag_address: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      ag_tel: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      ag_layout: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      ag_region: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      ag_fax: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      ag_regist_photo: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      ag_created_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.Sequelize.literal("CURRENT_TIMESTAMP"),
        get() {
          return moment(this.getDataValue("ag_created_at")).format(
            "YYYY-MM-DD HH:mm:ss"
          );
        },
      },
      ag_updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.Sequelize.literal("CURRENT_TIMESTAMP"),
        get() {
          return moment(this.getDataValue("ag_updated_at")).format(
            "YYYY-MM-DD HH:mm:ss"
          );
        },
      },
    },
    {
      sequelize,
      tableName: "agency",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "ag_id" }],
        },
      ],
    }
  );

  agency.isAgencyIdTaken = async function (agencyId) {
    const agency = await this.findOne({ where: { ag_id: agencyId } });
    return !!agency;
  };

  agency.isAgencyRegistNumTaken = async function (
    ag_regist_num,
    excludeAgencyId
  ) {
    const agency = await this.findOne({
      where: {
        ag_regist_num: ag_regist_num,
        ag_id: { [Op.ne]: excludeAgencyId },
      },
    });
    //console.log(agency, excludeAgencyId)
    return !!agency;
  };

  return agency;
};
