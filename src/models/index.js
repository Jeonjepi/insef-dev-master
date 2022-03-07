var fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require(path.join(__dirname, "..", "config", "config.js"));
const db = {};

var seqConfig = {
  logging: false,
  timezone: "+09:00",
  pool: {
    max: 20, // 최대 유지 connection 수
    min: 5, // 최소 유지 connection 수
    idle: 60000, // connection을 몇ms까지 대기시킬 것인가 (이후엔 버려짐)
  },
};

const sequelize = new Sequelize(
  config.db.database,
  config.db.username,
  config.db.password,
  config.db,
  seqConfig
);

fs.readdirSync(__dirname)
  .filter(function (file) {
    return file.indexOf(".") !== 0 && file !== "index.js";
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach(function (modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

const {
  Report,
  Support,
  Cons,
  ConsCompany,
  ConsProcessInfo,
  ConsRiskFactors,
  R3RiskFactors,
  ConsMedia,
  R3BestPractices,
  R1,
  R5,
  R6,
} = sequelize.models;

ConsCompany.hasMany(Cons, {
  foreignKey: "cs_cc_id",
  onDelete: "cascade",
});

Cons.belongsTo(ConsCompany, {
  foreignKey: "cs_cc_id",
});

//
ConsCompany.hasMany(Cons, {
  foreignKey: "cs_pi_id",
  onDelete: "cascade",
});

Cons.belongsTo(ConsProcessInfo, {
  foreignKey: "cs_pi_id",
});

ConsMedia.hasMany(R3RiskFactors, {
  foreignKey: "f3_cm_id",
  onDelete: "cascade",
});

R3RiskFactors.belongsTo(ConsMedia, {
  foreignKey: "f3_cm_id",
});

ConsMedia.hasMany(R3BestPractices, {
  foreignKey: "b3_cm_id",
  onDelete: "cascade",
});

R3BestPractices.belongsTo(ConsMedia, {
  foreignKey: "b3_cm_id",
});

// Support.hasMany(User, {
//     foreignKey: 'su_us_id',
//     onDelete: 'cascade',
// });
//
// User.belongsTo(Support, {
//     foreignKey: 'su_us_id',
// });

Cons.hasMany(Support, {
  foreignKey: "su_cs_id",
  onDelete: "cascade",
});

Support.belongsTo(Cons, {
  foreignKey: "su_cs_id",
});

// report<-> support
Support.hasMany(Report, {
  foreignKey: "re_su_id",
  onDelete: "cascade",
});

Report.belongsTo(Support, {
  foreignKey: "re_su_id",
});

// support<-> consMedia
Support.hasMany(ConsMedia, {
  foreignKey: "cm_su_id",
  onDelete: "cascade",
});

ConsMedia.belongsTo(Support, {
  foreignKey: "cm_su_id",
});

// support<-> consMedia
ConsMedia.hasMany(R1, {
  foreignKey: "r1_cm_id",
})

R1.belongsTo(ConsMedia, {
  foreignKey: "r1_cm_id",
});

ConsMedia.hasMany(R5, {
  foreignKey: "r5_cm_id",
  onDelete: "cascade",
});

R5.belongsTo(ConsMedia, {
  foreignKey: "r5_cm_id",
});

// support<-> consMedia
ConsMedia.hasMany(R6, {
  foreignKey: "r6_cm_id",
  onDelete: "cascade",
});

R6.belongsTo(ConsMedia, {
  foreignKey: "r6_cm_id",
});

module.exports = db;
