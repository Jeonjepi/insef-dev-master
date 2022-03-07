const moment = require("moment");
const Sequelize = require("sequelize");
const { Op } = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const cons = sequelize.define(
    "Cons",
    {
      cs_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      cs_cc_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "ConsCompany",
          key: "cc_id",
        },
      },
      cs_pi_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "ConsProcessInfo",
          key: "pi_id",
        },
      },
      cs_manage_us_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "User",
          key: "us_id",
        },
      },
      cs_agent_us_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "User",
          key: "us_id",
        },
      },
      cs_name: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      cs_type: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      cs_orderer: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      cs_management_num: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      cs_post_num: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      cs_jurisdiction: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      cs_headquarters: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      cs_price: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      cs_total_price: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      cs_address: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      cs_tel: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      cs_start_round: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      cs_round: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      cs_status: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      cs_close_reason: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      cs_started_at: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      cs_ended_at: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      cs_latest_updated_at: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      cs_created_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.Sequelize.literal("CURRENT_TIMESTAMP"),
        get() {
          return moment(this.getDataValue("cs_created_at")).format(
            "YYYY-MM-DD HH:mm:ss"
          );
        },
      },
      cs_updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.Sequelize.literal("CURRENT_TIMESTAMP"),
        get() {
          return moment(this.getDataValue("cs_updated_at")).format(
            "YYYY-MM-DD HH:mm:ss"
          );
        },
      },
    },
    {
      sequelize,
      tableName: "cons",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "cs_id" }],
        },
        {
          name: "cs_cc_id",
          using: "BTREE",
          fields: [{ name: "cs_cc_id" }],
        },
        {
          name: "cs_pi_id",
          using: "BTREE",
          fields: [{ name: "cs_pi_id" }],
        },
        {
          name: "cs_manage_us_id",
          using: "BTREE",
          fields: [{ name: "cs_manage_us_id" }],
        },
        {
          name: "cs_agent_us_id",
          using: "BTREE",
          fields: [{ name: "cs_agent_us_id" }],
        },
      ],
    }
  );

  cons.isConsIdTaken = async function (consId) {
    const cons = await this.findOne({ where: { cs_id: consId } });
    return !!cons;
  };

  cons.afterCreate = async function (cons, options) {
    //console.log(cons.cs_id);
  };

  return cons;
};
