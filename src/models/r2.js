const moment = require('moment');
const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const r2 = sequelize.define('R2', {
    r2_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    r2_re_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'report',
        key: 're_id'
      }
    },
    r2_ct_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cons_type',
        key: 'ct_id'
      }
    },
    r2_support_count: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    r2_visited_date: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    r2_visited_time: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    r2_calculated_cost: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    r2_used_cost: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    r2_fair_rate: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    r2_worker_num: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    r2_machine: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    r2_work_detail: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    r2_created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      get() {
        return moment(this.getDataValue('r2_created_at')).format('YYYY-MM-DD HH:mm:ss');
      }
    },
    r2_updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      get() {
        return moment(this.getDataValue('r2_updated_at')).format('YYYY-MM-DD HH:mm:ss');
      }
    }
  }, {
    sequelize,
    tableName: 'r2',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "r2_id" },
        ]
      },
      {
        name: "r2_re_id",
        using: "BTREE",
        fields: [
          { name: "r2_re_id" },
        ]
      },
      {
        name: "r2_ct_id",
        using: "BTREE",
        fields: [
          { name: "r2_ct_id" },
        ]
      },
    ]
  });

  r2.isIdTaken = async function(r2Id) {
    const r2 = await this.findOne({where: {r2_id: r2Id}});
    return !!r2;
  }

  return r2;
};
