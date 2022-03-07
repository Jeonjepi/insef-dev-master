const httpStatus = require('http-status');
const { UserRiskFactors } = require('../models');
const ApiError = require('../utils/ApiError');
const {Op} = require("sequelize");

const getUserRiskFactors = async() => {
    const result = await UserRiskFactors.findAll();
    if (!result.length) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User risk factors not found');
    }
    return result;
}

const getUserRiskFactorById = async(userId, greater_than) => {
    const result = greater_than ? await UserRiskFactors.findAll({where: {uf_us_id: userId, uf_updated_at: {[Op.gt]: greater_than}}}):await UserRiskFactors.findAll({where: {uf_us_id: userId}});
    // 임경업님 요청 빈배열반환
    // if (!result.length) {
    //     throw new ApiError(httpStatus.NOT_FOUND, 'User risk factors not found');
    // }
    return result;
}

const getUserRiskFactorByUserAndRiskFactorId = async(userId, riskfactorId) => {
    console.log(userId, riskfactorId);
    const result = await UserRiskFactors.findOne({where: {uf_id: riskfactorId, uf_us_id: userId}});
    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User risk factors not found');
    }
    return result;
}

const createUserRiskFactor = async(reqBody) => {
    return UserRiskFactors.create(reqBody);
}

const updateUserRiskFactor = async(userId, userRiskFactorId, reqBody) => {
    const result = await getUserRiskFactorByUserAndRiskFactorId(userId, userRiskFactorId);
    return await result.update(reqBody);
}

const deleteUserRiskFactorById = async(userId, riskFactorId) => {
    const result = await getUserRiskFactorByUserAndRiskFactorId(userId, riskFactorId);
    await result.destroy();
}

module.exports = {
    getUserRiskFactorById,
    getUserRiskFactorByUserAndRiskFactorId,
    getUserRiskFactors,
    createUserRiskFactor,
    updateUserRiskFactor,
    deleteUserRiskFactorById,
}

