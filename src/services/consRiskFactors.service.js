const httpStatus = require('http-status');
const { ConsRiskFactors } = require('../models');
const ApiError = require('../utils/ApiError');
const {Op, Sequelize} = require("sequelize");
const agencyService = require("./agency.service");

const getConsRiskFactors = async(greater_than) => {
    const result = greater_than ? await ConsRiskFactors.findAll({where: {fk_updated_at: {[Op.gt]: greater_than}}}): await ConsRiskFactors.findAll();
    // 임경업님 요청 빈배열 반환
    // if (!result.length) {
    //     throw new ApiError(httpStatus.NOT_FOUND, 'Cons risk factors not found');
    // }
    return result;
}

const getConsRiskFactorById = async(consRiskFactorId) => {
    const result = await ConsRiskFactors.findOne({where: {fk_id: consRiskFactorId}});
    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Cons risk factors not found');
    }
    return result;
}

const createConsRiskFactor = async(reqBody) => {
    await agencyService.getAgencyById(reqBody.fk_ag_id);
    return ConsRiskFactors.create(reqBody);
}

const updateConsRiskFactor = async(consRiskFactorId, reqBody) => {
    await agencyService.getAgencyById(reqBody.fk_ag_id);
    const result = await getConsRiskFactorById(consRiskFactorId);
    return await result.update(reqBody);
}

const deleteConsRiskFactorById = async(riskFactorId) => {
    const result = await getConsRiskFactorById(riskFactorId);
    await result.destroy();
}

const getConsRiskFactorElementByElement = async(element) => {
    const condition = {};
    if (element) {
        condition['fk_element'] = {[Op.like]: `%${element}%`};
    }
    return ConsRiskFactors.findAll({where: condition, attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('fk_element')) ,'fk_element']]});
}

const getConsRiskFactorByFactor = async(element, factor) => {
    const condition = {fk_element: element};
    if (factor) {
        condition['fk_factor'] = {fk_factor: {[Op.like]: `%${factor}%`}};
    }
    return ConsRiskFactors.findAll({where: condition, attributes: ['fk_id', 'fk_factor']});
}

const getConsRiskElementFactorById = async(element, factor) => {
    return ConsRiskFactors.findAll({where: {fk_element: element, fk_factor: factor}, attributes: ['fk_id', 'fk_element_factor', 'fk_hazardous_type', 'fk_rule', 'fk_measures', 'fk_measures_detail']});
}

module.exports = {
    getConsRiskFactorById,
    getConsRiskFactors,
    createConsRiskFactor,
    updateConsRiskFactor,
    deleteConsRiskFactorById,
    getConsRiskFactorElementByElement,
    getConsRiskFactorByFactor,
    getConsRiskElementFactorById,
}

