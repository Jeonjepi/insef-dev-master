const moment = require('moment');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = function(sequelize, DataTypes) {
  const user = sequelize.define('User', {
    us_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    us_ag_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Agency',
        key: 'ag_id'
      }
    },
    us_num: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    us_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    us_username: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    us_password: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    us_address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    us_role: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    us_phone: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    us_email: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    us_thumbnail: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    us_status: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    us_support_access_limit: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    us_started_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    us_ended_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    us_status: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    us_created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      get() {
        return moment(this.getDataValue('us_created_at')).format('YYYY-MM-DD HH:mm:ss');
      }
    },
    us_updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      get() {
        return moment(this.getDataValue('us_updated_at')).format('YYYY-MM-DD HH:mm:ss');
      }
    }
  }, {
    sequelize,
    tableName: 'user',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "us_id" },
        ]
      },
      {
        name: "us_ag_id",
        using: "BTREE",
        fields: [
          { name: "us_ag_id" },
        ]
      },
    ]
  });

  user.beforeCreate(async (user) => {
    if (user.us_password != null){
      user.us_password = await bcrypt.hash(user.us_password, 8);
    }
  })

  user.beforeUpdate(async (user) => {
    if (!user.us_password.startsWith('$2a$08$')){
      user.us_password = await bcrypt.hash(user.us_password, 8);
      await user.save();
    }
  })

  user.isUserIdTaken = async function(userId) {
    const user = await this.findOne({where: {us_id: userId}});
    return !!user;
  }

  user.isEmailTaken = async function(email, excludeUserId) {
    excludeUserId = excludeUserId | -1;
    const user = await this.findOne({where: {us_email: email, us_id: {[Op.ne]:excludeUserId}}});
    return !!user;
  }

  user.isUsernameTaken = async function(username, excludeUserId) {
    excludeUserId = excludeUserId | -1;
    const user = await this.findOne({where: {us_username: username, us_id: {[Op.ne]:excludeUserId}}})
    return !!user;
  }

  user.getAgencyIdByUserId = async function(userId) {
    const user = await this.findOne({where: {us_id: userId}})
    return user ? user.us_ag_id : null;
  }

  user.prototype.isPasswordMatch = async function (password){
    const user = this;
    return bcrypt.compare(password, user.us_password);
  }

  return user;
};
