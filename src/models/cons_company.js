const moment = require("moment");
const Sequelize = require("sequelize");
const { Op } = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const consCompany = sequelize.define(
    "ConsCompany",
    {
      cc_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      cc_ag_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Agency",
          key: "ag_id",
        },
      },
      cc_name: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      cc_ceo: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      cc_company_num: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      cc_company_address: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      cc_tel: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      cc_phone: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      cc_email: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      cc_fax: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      cc_created_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.Sequelize.literal("CURRENT_TIMESTAMP"),
        get() {
          return moment(this.getDataValue("cc_created_at")).format(
            "YYYY-MM-DD HH:mm:ss"
          );
        },
      },
      cc_updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.Sequelize.literal("CURRENT_TIMESTAMP"),
        get() {
          return moment(this.getDataValue("cc_updated_at")).format(
            "YYYY-MM-DD HH:mm:ss"
          );
        },
      },
    },
    {
      sequelize,
      tableName: "cons_company",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "cc_id" }],
        },
        {
          name: "foreignkey",
          unique: true,
          using: "BTREE",
          fields: [{ name: "cc_ag_id" }],
        },
      ],
    }
  );

  consCompany.isConsCompanyIdTaken = async function (consCompanyId) {
    const consCompany = await this.findOne({ where: { cc_id: consCompanyId } });
    return !!consCompany;
  };

  consCompany.isConsCompanyNumTaken = async function (
    cc_company_num,
    excludeConsCompanyId
  ) {
    excludeConsCompanyId = excludeConsCompanyId || -1;
    const consCompany = await this.findOne({
      where: {
        cc_company_num: cc_company_num,
        cc_id: { [Op.ne]: excludeConsCompanyId },
      },
    });
    //console.log(consCompany)
    return !!consCompany;
  };

  return consCompany;
};
