const httpStatus = require('http-status');
const {ConsCompany} = require('../models');
const ApiError = require('../utils/ApiError');

// const checkConsCompanyParams = async (reqBody) => {
//     const {cc_ag_id, cc_company_num, consCompanyId} = reqBody;
//     if (cc_company_num && await ConsCompany.isConsCompanyNumTaken(cc_company_num, consCompanyId)) {
//         throw new ApiError(httpStatus.BAD_REQUEST, 'construction company num is already taken');
//     }
//
//     if (cc_ag_id && !(await Agency.isAgencyIdTaken(cc_ag_id))) {
//         throw new ApiError(httpStatus.BAD_REQUEST, 'related agency not found');
//     }
// }

const getConsCompanies = async() => {
    const result = await ConsCompany.findAll();
    if (!result.length){
        throw new ApiError(httpStatus.NOT_FOUND, 'construction company not found');
    }
    return result;
}

const getConsCompaniesByAgencyId = async(agencyId) => {
    const cc_ag_id = {cc_ag_id : agencyId}
    // await checkConsCompanyParams(cc_ag_id);
    const result = await ConsCompany.findAll({where: cc_ag_id})
    if (!result.length){
        throw new ApiError(httpStatus.NOT_FOUND, 'construction company not found');
    }
    return result;
}

const getConsCompanyById = async(consCompanyId) => {
    const result = await ConsCompany.findOne({where: {cc_id: consCompanyId}})
    if (!result){
        throw new ApiError(httpStatus.NOT_FOUND, 'construction company not found');
    }
    return result;
}

const getConsCompanyByAgentId = async(agentId) => {
    const result = await ConsCompany.findAll({where: {cc_ag_id: agentId}})
    if (!result.length) {
        throw new ApiError(httpStatus.NOT_FOUND, 'construction company not found');
    }
    return result;
}

const createConsCompany = async(reqBody) => {
    // await checkConsCompanyParams(reqBody);
    return ConsCompany.create(reqBody);
}

// const createConsCompanyWithToken = async(registerConsCompanyToken, reqBody) => {
//     let registerConsCompanyTokenDoc;
//     try{
//         registerConsCompanyTokenDoc = await tokenService.verifyToken(registerConsCompanyToken, tokenTypes.REGISTER_CONS_COMPANY);
//     }catch (e) {
//         throw new ApiError(httpStatus.UNAUTHORIZED, e.toString());
//     }
//
//     const result = await createConsCompany(reqBody);
//     await Token.destroy({where: { tk_ag_id: registerConsCompanyTokenDoc.tk_ag_id, tk_type: tokenTypes.REGISTER_CONS_COMPANY }});
//     return result;
// }

const updateConsCompanyById = async(consCompanyId, reqBody) => {
    reqBody.consCompanyId = consCompanyId;
    // await checkConsCompanyParams(reqBody);
    const result = await getConsCompanyById(consCompanyId);
    return await result.update(reqBody);
}

const deleteConsCompanyById = async(consCompanyId) => {
    const result = await getConsCompanyById(consCompanyId);
    await result.destroy();
}

module.exports = {
    getConsCompanies,
    getConsCompaniesByAgencyId,
    getConsCompanyById,
    getConsCompanyByAgentId,
    createConsCompany,
    updateConsCompanyById,
    deleteConsCompanyById
}
