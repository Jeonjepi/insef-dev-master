const httpStatus = require('http-status');
const { ConsDivision } = require('../models');
const ApiError = require('../utils/ApiError');
const db = require("../models");
const {QueryTypes} = require("sequelize");

// const checkCoParams = async(reqBody) => {
//     const {ag_num, agencyId} = reqBody;
//     if (ag_num && await Agency.isAgencyNumTaken(ag_num, agencyId)){
//         throw new ApiError(httpStatus.BAD_REQUEST, 'agency num is already taken')
//     }
// }

const getConsDivision = async () => {
    const result = await ConsDivision.findAll();
    if (!result.length) {
        throw new ApiError(httpStatus.NOT_FOUND, 'cons division not found');
    }
    return result;
};

const createConsDivision = async (reqBody) => {
    return ConsDivision.create(reqBody);
};

// const updateAgencyById = async (agencyId, reqBody) => {
//     reqBody.agencyId = agencyId;
//     await checkAgencyParams(reqBody);
//     const result = await getAgencyById(agencyId);
//     if (!result) {
//         throw new ApiError(httpStatus.NOT_FOUND, 'agency not found');
//     }
//     return await result.update(reqBody)
// };

const deleteConsDivisionById = async (consDivisionId) => {
    await ConsDivision.destroy({where: {cd_id:consDivisionId}});
};

module.exports = {
    getConsDivision,
    createConsDivision,
    deleteConsDivisionById,
};
