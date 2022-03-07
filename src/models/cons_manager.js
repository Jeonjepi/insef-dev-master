const moment = require("moment");
const Sequelize = require("sequelize");
const httpStatus = require("http-status");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const consManager = sequelize.define(
    "ConsManager",
    {
      ma_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      ma_cs_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Cons",
          key: "cs_id",
        },
      },
      ma_name: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      ma_contact: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      ma_is_major: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ma_created_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.Sequelize.literal("CURRENT_TIMESTAMP"),
        get() {
          return moment(this.getDataValue("ma_created_at")).format(
            "YYYY-MM-DD HH:mm:ss"
          );
        },
      },
      ma_updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.Sequelize.literal("CURRENT_TIMESTAMP"),
        get() {
          return moment(this.getDataValue("ma_updated_at")).format(
            "YYYY-MM-DD HH:mm:ss"
          );
        },
      },
    },
    {
      sequelize,
      tableName: "cons_manager",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "ma_id" }],
        },
        {
          using: "BTREE",
          fields: [{ name: "ma_cs_id" }],
        },
      ],
    }
  );

  consManager.UpdateNoMajor = async function (consId) {
    const manager = await consManager.findAll({
      where: { ma_cs_id: consId, ma_is_major: 1 },
    });
    //console.log(manager.map(item => item.ma_id));
    if (manager.length) {
      await consManager.update(
        { ma_is_major: 0 },
        { where: { ma_id: { [Op.in]: manager.map((item) => item.ma_id) } } }
      );
    }
  };

  return consManager;
};
