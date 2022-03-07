const moment = require('moment');
const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const consMedia = sequelize.define('ConsMedia', {
    cm_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cm_cs_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Cons',
        key: 'cs_id'
      }
    },
    cm_su_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Support',
        key: 'su_id'
      }
    },
    cm_round: {
      type: DataTypes.INTEGER(3),
      allowNull: true,
    },
    cm_url: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    cm_url_200: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    cm_url_400: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    cm_key: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    cm_type: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    cm_category: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    cm_created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      get() {
        return moment(this.getDataValue('cm_created_at')).format('YYYY-MM-DD HH:mm:ss');
      }
    },
    cm_updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      get() {
        return moment(this.getDataValue('cm_updated_at')).format('YYYY-MM-DD HH:mm:ss');
      }
    }
  }, {
    sequelize,
    tableName: 'cons_media',
    timestamps: false,
    hasTrigger: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "cm_id" },
        ]
      },
      {
        name: "cm_cs_id",
        using: "BTREE",
        fields: [
          { name: "cm_cs_id" },
        ]
      },
      {
        name: "cm_su_id",
        using: "BTREE",
        fields: [
          { name: "cm_su_id" },
        ]
      },
    ]
  });

  consMedia.beforeBulkCreate(async function(records, fields) {
    records.map((model, index, array) => {
      const url = model.getDataValue('cm_url').split('/');
      const domain = url[3];
      const filename = url[4];
      model.setDataValue('cm_url_200', `https://insef-bucket-resize.s3.ap-northeast-2.amazonaws.com/${domain}-w_200/${filename}`);
      model.setDataValue('cm_url_400', `https://insef-bucket-resize.s3.ap-northeast-2.amazonaws.com/${domain}-w_400/${filename}`);
    });
  })
  consMedia.beforeCreate(async function(consMedia) {
    const url = consMedia.getDataValue('cm_url').split('/');
    const domain = url[3];
    const filename = url[4];
    consMedia.setDataValue('cm_url_200', `https://insef-bucket-resize.s3.ap-northeast-2.amazonaws.com/${domain}-w_200/${filename}`);
    consMedia.setDataValue('cm_url_400', `https://insef-bucket-resize.s3.ap-northeast-2.amazonaws.com/${domain}-w_400/${filename}`);
  })

  consMedia.beforeUpdate(async function(consMedia) {
    const url = consMedia.getDataValue('cm_url').split('/');
    const domain = url[3];
    const filename = url[4];
    consMedia.setDataValue('cm_url_200', `https://insef-bucket-resize.s3.ap-northeast-2.amazonaws.com/${domain}-w_200/${filename}`);
    consMedia.setDataValue('cm_url_400', `https://insef-bucket-resize.s3.ap-northeast-2.amazonaws.com/${domain}-w_400/${filename}`);
  })

  return consMedia;
};
