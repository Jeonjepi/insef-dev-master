const httpStatus = require('http-status');
const { ConsManager } = require('../models');
const ApiError = require('../utils/ApiError');
const db = require("../models");
const {QueryTypes, Op} = require("sequelize");
const https = require("https");

const getConsManagerById = async (consId, ConsManagerId) => {
    // const result = greater_than ? await ConsManager.findAll({where: {ag_updated_at: {[Op.gte]: greater_than}}}) : await ConsManager.findAll();
    const result = await ConsManager.findOne({where: {ma_cs_id: consId, ma_id: ConsManagerId}});
    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, "cons manager not found")
    }
    return result;
};

const getConsManagerByConsId = async (consId) => {
    // const result = greater_than ? await ConsManager.findAll({where: {ag_updated_at: {[Op.gte]: greater_than}}}) : await ConsManager.findAll();
    const result = await ConsManager.findAll({where: {ma_cs_id: consId}});
    return result;
};

// const getConsManagerByConsId = async(consId) => {
//     const query = 'SELECT * FROM agency ag, cons_company cc, cons, cons cs WHERE ag.ag_id = cc.cc_ag_id AND cc.cc_id = cs.cs_cc_id AND cs.cs_id = :consId';
//     const result = await db.sequelize.query(query, {
//         replacements: {consId},
//         type: QueryTypes.SELECT});
//     if (!result.length){
//         throw new ApiError(httpStatus.NOT_FOUND, 'agency not found by cons id');
//     }
//     return result[0];
// }

const createConsManager = async (consId, reqBody) => {
    const {ma_is_major} = reqBody;
    if (ma_is_major == 1) {
        await ConsManager.UpdateNoMajor(consId);
    }
    return ConsManager.create({ma_cs_id: consId, ...reqBody});
};

const updateConsManagerById = async (consId, consManagerById, reqBody) => {
    const {ma_is_major} = reqBody;
    if (ma_is_major == 1) {
        await ConsManager.UpdateNoMajor(consId);
    }
    const consManager = await getConsManagerById(consId, consManagerById);
    const result = await consManager.update(reqBody);
    return result;
};

const deleteConsManagerById = async (consId, consManagerById) => {
    const result = await getConsManagerById(consId, consManagerById);
    await result.destroy();
};

module.exports = {
    getConsManagerById,
    getConsManagerByConsId,
    createConsManager,
    updateConsManagerById,
    deleteConsManagerById,
};
