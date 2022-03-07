const httpStatus = require('http-status');
const sequelize = require('sequelize');
const { QueryTypes } = require('sequelize');
const ApiError = require('../utils/ApiError');
const db = require('../models');
const agencyService = require("./agency.service");
const userService = require("./user.service");
const supportService = require("./support.service");
const {CONS_STATUS} = require("../enums/cons.enum");
const { pagination } = require('../utils/pagination');
const { User, Cons, ConsCompany, ConsProcessInfo, Support } = require('../models');


const checkConsParams = async (reqBody) => {
    const {cs_cc_id, cs_pi_id, cs_manage_us_id} = reqBody;

    if (cs_cc_id && !(await ConsCompany.isConsCompanyIdTaken(cs_cc_id))){
        throw new ApiError(httpStatus.BAD_REQUEST, 'related construction company not found');
    }
    if (cs_pi_id && !(await ConsProcessInfo.isConsProcessInfoIdTaken(cs_pi_id))){
        throw new ApiError(httpStatus.BAD_REQUEST, 'related construction process info not found');
    }
    if (cs_manage_us_id && !(await User.isUserIdTaken(cs_manage_us_id))){
        throw new ApiError(httpStatus.BAD_REQUEST, 'related user not found');
    }
};
// 현장
const getConsByAgencyId = async (filter, options) => {
    const result = await Cons.findAll();
    if (!result.length){
        throw new ApiError(httpStatus.NOT_FOUND, 'construction not found');
    }
    return result;
}

// const getConsByAgencyId = async (reqBody, filter, options) => {
//     let {ag_id, cc_id} = reqBody;
//     ag_id = ag_id || null; cc_id = cc_id || null;
//     const offset = 10;
//     const start = pagination(Number(page) || 1, offset);
//     const ag_query = 'SELECT * FROM cons cs JOIN cons_company cc ON cs.cs_cc_id = cc.cc_id JOIN cons_process_info ci ON cs.cs_pi_id = ci.pi_id JOIN agency ag ON ag.ag_id = cc.cc_ag_id WHERE ag.ag_id = :ag_id ORDER BY cs.cs_id limit :start, :end';
//     const cc_query = 'SELECT * FROM cons cs JOIN cons_company cc ON cs.cs_cc_id = cc.cc_id JOIN cons_process_info ci ON cs.cs_pi_id = ci.pi_id JOIN agency ag ON ag.ag_id = cc.cc_ag_id WHERE cc.cc_id = :cc_id ORDER BY cs.cs_id limit :start, :end';
//     const query = ag_id ? ag_query : cc_id ? cc_query : null;
//     if (!query){
//         throw new ApiError(httpStatus.NOT_FOUND, 'ag_id or cc_id not found');
//     }
//     const result = await db.sequelize.query(query, {
//         replacements: {ag_id, cc_id, start, end: offset},
//         type: QueryTypes.SELECT});
//     if (!result.length){
//         throw new ApiError(httpStatus.NOT_FOUND, 'construction not found');
//     }
//     return result;
// }

const getConsByConsCompanyId = async (consCompanyId, page) => {
    page = Number(page) || 1;

    const offset = 10;
    const start = pagination(page, offset);
    const query = 'SELECT cs.cs_management_num, cs.cs_name, pi.pi_name, cs.cs_address, us.us_name, cs.cs_status, su.su_status FROM cons cs JOIN cons_company cc ON cs.cs_cc_id = cc.cc_id JOIN cons_process_info pi ON cs.cs_pi_id = pi.pi_id JOIN agency ag ON ag.ag_id = cc.cc_ag_id LEFT JOIN user us ON us.us_id = cs.cs_manage_us_id LEFT JOIN support su ON su.su_us_id = us.us_id LEFT JOIN report re ON re.re_su_id = re.re_id WHERE cc.cc_id = :consCompanyId ORDER BY cs.cs_id limit :start, :end';
    const result = await db.sequelize.query(query, {
        replacements: {consCompanyId, start, end: offset},
        type: QueryTypes.SELECT});
    if (!result.length){
        throw new ApiError(httpStatus.NOT_FOUND, 'construction not found');
    }
    return result;
}

const getRecentConsByAgencyIdAndDay = async(agencyId, day) => {
    const query = "SELECT cs.cs_name, cc.cc_name, cs.cs_address FROM cons cs JOIN cons_company cc ON cc.cc_id = cs.cs_cc_id JOIN agency ag ON ag.ag_id = cc.cc_ag_id WHERE ag.ag_id = :agencyId AND cs.cs_created_at >= DATE(NOW()) - INTERVAL :day DAY ORDER BY cs.cs_created_at DESC";
    return await db.sequelize.query(query, { type: sequelize.QueryTypes.SELECT, replacements: {agencyId, day}});
}

const getConsById = async (consId) => {
    const result = await Cons.findOne({where: {cs_id: consId}});
    if (!result){
        throw new ApiError(httpStatus.NOT_FOUND, 'construction not found');
    }
    return result;
};

const getConsAndConsCompanyById = async (consId) => {
    const cons = await Cons.findOne({where: {cs_id: consId}});
    const consCompany = await ConsCompany.findOne({where: {cc_id: cons.cs_cc_id}});
    if (!cons){
        throw new ApiError(httpStatus.NOT_FOUND, 'construction not found');
    }
    return {...cons.dataValues, ...consCompany.dataValues};
};

const getConsNameAndAgencyNameById = async(consId) => {
    const result = await agencyService.getAgencyByConsId(consId);
    return {cs_name: result.cs_name, ag_name: result.ag_name};
}

const getConsByAgentAndRatherThanDate = async(agentId, greater_than) => {
    const query = "SELECT cs.cs_id, cs.cs_name FROM cons cs, support su WHERE cs.cs_id = su.su_cs_id AND su.su_us_id = :agentId AND su.su_supported_at > :greater_than";
    return await db.sequelize.query(query, {type: sequelize.QueryTypes.SELECT, replacements: {agentId, greater_than}});
}

const createCons = async (reqBody) => {
    await checkConsParams(reqBody);
    const {cs_manage_us_id} = reqBody;
    if (cs_manage_us_id) {
        reqBody['cs_status'] = CONS_STATUS.기술지도_진행증;
    }
    return Cons.create(reqBody);
};

const updateConsById = async (consId, reqBody) => {
    // await checkConsParams(reqBody);
    const result = await getConsById(consId);
    return await result.update(reqBody);
};

const deleteConsById = async (consId) => {
    const result = await getConsById(consId);
    if (!result){
        throw new ApiError(httpStatus.NOT_FOUND, 'construction not found');
    }
    await result.destroy();
};

const closeConsById = async(consId, reqBody) => {
    const {cs_close_reason} = reqBody;
    const cons = await getConsById(consId);
    return cs_close_reason ?
        await cons.update({cs_status: CONS_STATUS["기술지도_완료(중단)"], cs_close_reason}) :
        await cons.update({cs_status: CONS_STATUS.기술지도_완료, cs_close_reason});
}

const getConsSupports = async(consId) => {
    return Support.findAll({where: {su_cs_id: consId, su_is_deleted: 0}});
}

const updateConsAgentByAgentId = async(consId, oldAgentId, newAgentId) => {
    const cons = await getConsById(consId);
    const support = await supportService.getRecentSupportByConsId(consId);
    let oldAgent = await userService.getUserById(oldAgentId);
    let newAgent = await userService.getUserById(newAgentId);

    if (cons.cs_agent_us_id !== oldAgent.us_id) {
        throw new ApiError(httpStatus.BAD_REQUEST, "현재 할당된 요원과 요청한 기존 요원이 일치하지 않습니다");
    }
    // 기존 유저의 지원 접근 한계 설정
    const old_user_support_access_limit = JSON.parse(oldAgent.us_support_access_limit);
    old_user_support_access_limit[consId] = support.su_round;
    oldAgent = await oldAgent.update({us_support_access_limit: JSON.stringify(old_user_support_access_limit)});

    // 새로운 유저의 할당 현장 제한 해제
    const new_user_support_access_limit = JSON.parse(newAgent.us_support_access_limit);
    delete new_user_support_access_limit[consId];
    await newAgent.update({us_support_access_limit: JSON.stringify(new_user_support_access_limit)});

    // 현장 요원 교체
    const updateCons = await cons.update({cs_agent_us_id: newAgent.us_id});
    return {updateCons, oldAgent, newAgent};
}

module.exports = {
    getConsByAgencyId,
    getConsByConsCompanyId,
    getConsAndConsCompanyById,
    getRecentConsByAgencyIdAndDay,
    getConsNameAndAgencyNameById,
    getConsByAgentAndRatherThanDate,
    getConsById,
    getConsSupports,
    createCons,
    updateConsById,
    deleteConsById,
    closeConsById,
    updateConsAgentByAgentId,
};
