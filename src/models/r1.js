const moment = require('moment');
const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const r1 = sequelize.define('R1', {
    r1_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    r1_cm_id:{
      type: DataTypes.INTEGER,
      allowNull:false,
      references: {
        model: 'ConsMedia',
        key: 'cm_id'
      }
    },
    r1_re_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'report',
        key: 're_id'
      }
    },
    r1_photo: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    r1_round_price: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // r1_type: {
    //   type: DataTypes.STRING(100),
    //   allowNull: true
    // },
    // r1_price: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true
    // },
    // r1_orderer: {
    //   type: DataTypes.STRING(50),
    //   allowNull: true
    // },
    // r1_round_price: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true
    // },
    // r1_total_price: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true
    // },
    // r1_started_at: {
    //   type: DataTypes.STRING(50),
    //   allowNull: true
    // },
    // r1_ended_at: {
    //   type: DataTypes.STRING(50),
    //   allowNull: true
    // },
    r1_process: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    r1_created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      get() {
        return moment(this.getDataValue('r1_created_at')).format('YYYY-MM-DD HH:mm:ss');
      }
    },
    r1_updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      get() {
        return moment(this.getDataValue('r1_updated_at')).format('YYYY-MM-DD HH:mm:ss');
      }
    }
  }, {
    sequelize,
    tableName: 'r1',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          {name: "r1_id"},
        ]
      },
      {
        name: "r1_re_id",
        using: "BTREE",
        fields: [
          {name: "r1_re_id"},
      {  
        name: "r1_cm_id",
        using: "BTREE",
        fields: [
          { name: "r1_cm_id" },
            ]
          },
        ]
      },
    ]
  });

  r1.isIdTaken = async function(r1Id) {
    const r1 = await this.findOne({where: {r1_id: r1Id}});
    return !!r1;
  }

  return r1;
};
