const sequelize = require('sequelize');
const moment = require('moment');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const db = require("../models");
const {USER_STATUS, USER_ROLE} = require("../enums/user.enum");
const { Agency, User, Token} = require('../models');
const tokenService = require("./token.service");
const {tokenTypes} = require("../config/tokens");
const {isConsonantAll, getConsonantFilter} = require("../utils/hangul");

const checkUserParams = async(reqBody) => {
    const {us_email, us_username, us_ag_id} = reqBody;

    if (us_email && await User.isEmailTaken(reqBody.us_email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'email already taken');
    }
    if (us_username && await User.isUsernameTaken(reqBody.us_username)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'username already taken');
    }

    if (us_ag_id && !(await Agency.isAgencyIdTaken(us_ag_id))){
        throw new ApiError(httpStatus.BAD_REQUEST, 'related agency not found');
    }
}

const createUser = async (reqBody, token) => {

    const USER_ROLE_TO_TOKEN_TYPE = {};
    USER_ROLE_TO_TOKEN_TYPE[USER_ROLE.기업회원] = tokenTypes.REGISTER_AGENCY;
    USER_ROLE_TO_TOKEN_TYPE[USER_ROLE.기술지도요원] = tokenTypes.REGISTER_AGENT;
    let tokenDoc;
    if (token) {
        try{
            tokenDoc = await tokenService.verifyToken(token, USER_ROLE_TO_TOKEN_TYPE[reqBody.us_role]);
        }catch (e) {
            throw new ApiError(httpStatus.UNAUTHORIZED, e.toString());
        }
    }
    await checkUserParams(reqBody); // 유저 생성하기 직전에 검사
    const result = User.create(reqBody); // 주 로직, 이외의 것들은 코튼이 있을대만..
    if (token){
        await Token.destroy({where: { tk_ag_id: tokenDoc.tk_ag_id, tk_type: USER_ROLE_TO_TOKEN_TYPE[reqBody.us_role] }});
    }
    return result;
};

const createAgencyWithToken = async (registerAgencyToken, reqBody, reqFile) => {
    let registerAgencyTokenDoc;
    try{
        registerAgencyTokenDoc = await tokenService.verifyToken(registerAgencyToken, tokenTypes.REGISTER_AGENCY);
    }catch (e) {
        throw new ApiError(httpStatus.UNAUTHORIZED, e.toString());
    }
    const result = await createAgency(reqBody, reqFile);
    await Token.destroy({where: { tk_ag_id: registerAgencyTokenDoc.tk_ag_id, tk_type: tokenTypes.REGISTER_AGENCY }});
    return result;
};

const getUsers = async () => {
    const users = await User.findAll()

    if (users.length === 0){
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    return users;
};

const getUsersByAgencyId = async (agencyId) => {//
    const users = await User.findAll({where: {us_ag_id: agencyId}})

    if (users.length === 0){
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    return users;
};

const getUserById = async (id, field) => {
    const user =  field ? await User.findOne({where: {us_id: id}, attributes: [field]}) : await User.findByPk(id);
    if (!user){
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    return user;
};

const getUserByUsername = async (username) => {
    const user = await User.findOne({where: {us_username: username}})
    if (!user){
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    return user;
};

const getUserByEmail = async (email) => {
    const user = await User.findOne({where: {us_email: email}})
    if (!user){
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    return user;
};

const getUserByAgencyAndEmail = async (agencyId, email) => {
    const user = agencyId ? await User.findOne({where: {us_ag_id: agencyId, us_email: email}}): await User.findOne({where: {us_email: email}});
    if (!user){
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }

    return user;//
};

const getUserByUsernameAndName = async (username, name) => {
    const user = await User.findOne({where: {us_username: username, us_name: name}})
    if (!user){
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }

    return user;
};

const getUserByNameAndPhone = async (name, phone) => {
    const user =  await User.findOne({where: {
            us_name: name,
            us_phone: phone,
        }})
    if (!user){
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    return user;
};

const updateUserById = async(id, reqBody) => {
    await checkUserParams(reqBody);
    const user = await getUserById(id);
    return await user.update(reqBody);
}

const deleteUserById = async (id) => {
    const user = await getUserById(id)

    if (!user){
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }

    await user.destroy();
};

const approveUserRegister = async(userId) => {
    const user = getUserById(userId);
    if (user.us_status != USER_STATUS.승인대기){
        throw new ApiError(httpStatus.BAD_REQUEST, 'user already approved')
    }
    user.update({us_status: USER_STATUS.활성화});
}

const getUserConsAndReportCount = async(userId) => {
    const query1 = "SELECT count(c.su_id) cnt FROM (SELECT su_id, count(*) FROM support where su_us_id=:userId group by su_ag_id) c";
    const consCount = await db.sequelize.query(query1, { type: sequelize.QueryTypes.SELECT, replacements: {userId}});

    const query2 = "SELECT count(*) cnt FROM support su JOIN report re ON su.su_id = re.re_su_id where su_us_id=:userId";
    const reportCount = await db.sequelize.query(query2, { type: sequelize.QueryTypes.SELECT, replacements: {userId}});
    // console.log(consCount[0].cnt, reportCount[0].cnt);//
    return {consCount:consCount[0].cnt, reportCount:reportCount[0].cnt};
}

const getUserCons = async(userId, order, greater_than, query) => {
    // greater_than, query
    const sql = isConsonantAll(query) ?
        `select * from cons cs where cs.cs_agent_us_id = :userId ${greater_than ? "AND timestamp(cs.cs_updated_at) >= timestamp('" + greater_than + "')" : ''}` :
        `select * from cons cs where cs.cs_agent_us_id = :userId ${greater_than ? "AND timestamp(cs.cs_updated_at) >= timestamp('" + greater_than + "')" : ''} ${query ? "AND cs.cs_name like '%" +query+"%'": ''}`;
    const result = await db.sequelize.query(sql, {type: sequelize.QueryTypes.SELECT, replacements: {userId}});
    if (!result.length) {
        throw new ApiError(httpStatus.NOT_FOUND, 'user cons not found');
    }
    return getConsonantFilter(result, 'cs_name', query);
}

const getUserReport = async(userId, greater_than) => {
    const query = "SELECT cs.cs_id, su.su_round, cs.cs_name, su.su_supported_at FROM support su JOIN report re ON re.re_su_id = su.su_id JOIN cons cs ON su.su_cs_id = cs.cs_id WHERE su.su_us_id = :userId AND su.su_is_deleted = 0";
    const query_greater_than = "SELECT cs.cs_id, su.su_round, cs.cs_name, su.su_supported_at FROM support su JOIN report re ON re.re_su_id = su.su_id JOIN cons cs ON su.su_cs_id = cs.cs_id WHERE su.su_us_id = :userId AND timestamp(re.re_updated_at) >= timestamp(:greater_than) AND su.su_is_deleted = 0";
    const result = greater_than ? await db.sequelize.query(query_greater_than, { type: sequelize.QueryTypes.SELECT, replacements: {userId, greater_than}}):await db.sequelize.query(query, { type: sequelize.QueryTypes.SELECT, replacements: {userId}});
    return result;
}

const getUserSupport = async(userId, greater_than, less_than) => {
    const time = moment.duration("23:59:59");
    // if (greater_than && greater_than.length == 10){
    //     const date = moment(greater_than);
    //     greater_than = date.subtract(time).format().toString();
    // }
    if (less_than && less_than.length == 10) {
        const date1 = moment(less_than);
        less_than = date1.add(time).format().toString();
    }
    let condition, result;
    if (greater_than && less_than){
        condition = " AND timestamp(su.su_updated_at) >= Cast(:greater_than as datetime) AND timestamp(su.su_updated_at) <= Cast(:less_than as datetime) ";
    }else if (greater_than){
        condition = " AND timestamp(su.su_updated_at) >= Cast(:greater_than as datetime) ";
    }else if (less_than){
        condition = " AND timestamp(su.su_updated_at) <= Cast(:less_than as datetime) ";
    }else{
        condition = "";
    }

    const query = `SELECT * FROM support su, user us, cons cs, cons_company cc, agency ag WHERE su.su_us_id = us.us_id AND su.su_cs_id = cs.cs_id AND ag.ag_id = su.su_ag_id AND cs.cs_cc_id = cc.cc_id AND us.us_id = :userId ${condition} ORDER BY su.su_supported_at DESC`;

    if (greater_than && less_than){
        result = await db.sequelize.query(query, { type: sequelize.QueryTypes.SELECT, replacements: {userId, greater_than, less_than}});
    }else if (greater_than){
        result = await db.sequelize.query(query, { type: sequelize.QueryTypes.SELECT, replacements: {userId, greater_than}});
    }else if (less_than){
        result = await db.sequelize.query(query, { type: sequelize.QueryTypes.SELECT, replacements: {userId, less_than}});
    }else {
        result = await db.sequelize.query(query, {type: sequelize.QueryTypes.SELECT, replacements: {userId}});
    }
    return result;
}

const getSupportByConsAndConsCompanyName = async(userId, name, greater_than, less_than) => {
    const time = moment.duration("23:59:59");
    if (less_than && less_than.length == 10) {
        const date1 = moment(less_than);
        less_than = date1.add(time).format().toString();
    }
    let condition, result;
    if (greater_than && less_than){
        condition = " AND timestamp(su.su_supported_at) >= Cast(:greater_than as datetime) AND timestamp(su.su_supported_at) <= Cast(:less_than as datetime) ";
    }else if (greater_than){
        condition = " AND timestamp(su.su_supported_at) >= Cast(:greater_than as datetime) ";
    }else if (less_than){
        condition = " AND timestamp(su.su_supported_at) <= Cast(:less_than as datetime) ";
    }else{
        condition = "";
    }
    if (name) {
        condition += `AND (cs.cs_name like "%${name}%" OR cc.cc_name like "%${name}%")`
    }

    const query = `select * from support su, cons cs, cons_company cc where su.su_cs_id = cs.cs_id AND cs.cs_cc_id = cc.cc_id AND su.su_us_id = :userId AND su.su_is_deleted = 0 ${condition} ORDER BY su.su_supported_at DESC`;

    if (greater_than && less_than){
        result = await db.sequelize.query(query, { type: sequelize.QueryTypes.SELECT, replacements: {userId, greater_than, less_than}});
    }else if (greater_than){
        result = await db.sequelize.query(query, { type: sequelize.QueryTypes.SELECT, replacements: {userId, greater_than}});
    }else if (less_than){
        result = await db.sequelize.query(query, { type: sequelize.QueryTypes.SELECT, replacements: {userId, less_than}});
    }else {
        result = await db.sequelize.query(query, {type: sequelize.QueryTypes.SELECT, replacements: {userId}});
    }
    return result;
}

module.exports = {
    createUser,
    getUsers,
    getUsersByAgencyId,
    getUserById,
    getUserByEmail,
    getUserByAgencyAndEmail,
    getUserByUsername,
    getUserByUsernameAndName,
    getUserByNameAndPhone,
    updateUserById,
    deleteUserById,
    approveUserRegister,
    getUserConsAndReportCount,
    getUserCons,
    getUserReport,
    getUserSupport,
    getSupportByConsAndConsCompanyName,
};
