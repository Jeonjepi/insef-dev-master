const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const config = require('./config');
const db = require("../models");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const {QueryTypes} = require("sequelize");
const { tokenTypes } = require('./tokens');
const { User} = require('../models');

const jwtOptions = {
    secretOrKey: config.jwt.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    passReqToCallback: true,
    failureFlash:true,
};

const jwtVerify = async (req, payload, done) => {
    const {consId, agencyId} = req.params;
    const {ag_id, cc_id, cc_ag_id} = req.body;
    // console.log(payload)
        if (payload.type !== tokenTypes.ACCESS) {
            return done(null, false,"올바르지 않은 토큰입니다.");
        }
        const user = await User.findByPk(payload.sub);
        if (!user) {
            return done(null, false,"해당 토큰을 처리할 유저에 대한 권한이 없습니다.");
        }

        // payload.sub1은 agency id
    //console.log(payload, cc_ag_id, ag_id, agencyId);
        if ((cc_ag_id && payload.sub1 != cc_ag_id)||(ag_id && payload.sub1 != ag_id) || (agencyId && payload.sub1 != agencyId)) {
            return done(null, false,"해당 기관에 대한 접근 권한이 없습니다.");
        }

        if (consId){
            // 해당 id 에 속하는 agency를 구한뒤 agency가 가지고 있는 consid를 전부 구해서 포함되는게 있는지 조사
            const query = 'SELECT count(*) cnt FROM agency ag JOIN cons_company cc ON cc.cc_ag_id = ag.ag_id JOIN cons cs ON cs.cs_cc_id = cc.cc_id JOIN user us ON us.us_ag_id = ag.ag_id WHERE us.us_id = :us_id AND cs.cs_id = :consId';
            const result = await db.sequelize.query(query, {
                replacements: {us_id: payload.sub, consId},
                type: QueryTypes.SELECT});
            if (!result[0].cnt){
                return done(null, false, "해당 건설사가 속한 기관에 대한 접근 권한이 없습니다.");
            }
        }

        if (cc_id){
            const query = 'SELECT count(*) cnt FROM agency ag JOIN cons_company cc ON cc.cc_ag_id = ag.ag_id JOIN user us ON us.us_ag_id = ag.ag_id WHERE us.us_id = :us_id AND cc.cc_id = :cc_id';
            const result = await db.sequelize.query(query, {
                replacements: {us_id:payload.sub,cc_id},
                type: QueryTypes.SELECT});
            if (!result[0].cnt){
                return done(null, false, "해당 건설사가 속한 기관에 대한 접근 권한이 없습니다.");
            }
        }

        done(null, user);
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
    jwtStrategy,
};
