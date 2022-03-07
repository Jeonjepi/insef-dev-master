const moment = require('moment');
const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('R8', {
    r8_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    r8_re_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'report',
        key: 're_id'
      }
    },
    r8_cr_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    r8_checker_sign_image: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    r8_checker_signature_data: {
      type: DataTypes.STRING,
      allowNull: true
    },
    r8_manager_sign_image: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    r8_manager_signature_data: {
      type: DataTypes.STRING,
      allowNull: true
    },
    r8_created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      get() {
        return moment(this.getDataValue('r8_created_at')).format('YYYY-MM-DD HH:mm:ss');
      }
    },
    r8_updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      get() {
        return moment(this.getDataValue('r8_updated_at')).format('YYYY-MM-DD HH:mm:ss');
      }
    }
  }, {
    sequelize,
    tableName: 'r8',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "r8_id" },
        ]
      },
      {
        name: "r8_re_id",
        using: "BTREE",
        fields: [
          { name: "r8_re_id" },
        ]
      },
    ]
  });
};
