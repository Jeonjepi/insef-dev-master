const moment = require('moment');
const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const support = sequelize.define('Support', {
    su_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    su_cs_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Cons',
        key: 'cs_id'
      }
    },
    su_us_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'User',
        key: 'us_id'
      }
    },
    su_ag_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Agent',
        key: 'ag_id'
      }
    },
    su_manager_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    su_manager_hp: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    su_status: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    su_round: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    su_stop_reason: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    su_started_at: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    su_ended_at: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    su_is_deleted: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    su_delete_method: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    su_supported_at: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    su_created_at: {
      type: 'TIMESTAMP',
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      get() {
        return moment(this.getDataValue('su_created_at')).format('YYYY-MM-DD HH:mm:ss');
      }
    },
    su_updated_at: {
      type: 'TIMESTAMP',
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      get() {
        return moment(this.getDataValue('su_updated_at')).format('YYYY-MM-DD HH:mm:ss');
      }
    }
  }, {
    sequelize,
    tableName: 'support',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "su_id" },
        ]
      },
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "su_cs_id" },
        ]
      },
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "su_us_id" },
        ]
      },
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "su_ag_id" },
        ]
      },
    ]
  });

  support.isIdTaken = async function(supportId) {
    const support = await this.findOne({where: {su_id: supportId}});
    return !!support;
  }

  return support;
};
