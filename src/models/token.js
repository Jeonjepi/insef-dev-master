const moment = require('moment');
const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const token = sequelize.define('Token', {
    tk_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tk_us_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'User',
        key: 'us_id'
      }
    },
    tk_ag_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Agency',
        key: 'ag_id'
      }
    },
    tk_token: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    tk_type: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    tk_expired: {
      type: DataTypes.DATE,
      allowNull: true
    },
    tk_blacklisted: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    tk_created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      get() {
        return moment(this.getDataValue('tk_created_at')).format('YYYY-MM-DD HH:mm:ss');
      }
    },
    tk_updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      get() {
        return moment(this.getDataValue('tk_updated_at')).format('YYYY-MM-DD HH:mm:ss');
      }
    }
  }, {
    sequelize,
    tableName: 'token',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "tk_id" },
        ]
      },
      {
        name: "tk_us_id",
        using: "BTREE",
        fields: [
          { name: "tk_us_id" },
        ]
      },
      {
        name: "tk_ag_id",
        using: "BTREE",
        fields: [
          { name: "tk_ag_id" },
        ]
      },
    ]
  });

  return token;
};
