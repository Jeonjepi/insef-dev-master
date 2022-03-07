const httpStatus = require('http-status');
const { DisasterType } = require('../models');
const ApiError = require('../utils/ApiError');
const {Op} = require("sequelize");

const getDisasterType = async(name, greater_than) => {
    // const result = greater_than ? await DisasterType.findAll({where: {dt_updated_at: {[Op.gt]: greater_than}}}): await DisasterType.findAll();
    const result = name ? await DisasterType.findAll({where: {dt_name: {[Op.like]: `%${name}%`}}}) : await DisasterType.findAll();
    return result;
}

const getDisasterTypeById = async(disasterTypeId) => {
    const result = await DisasterType.findOne({where: {dt_id: disasterTypeId}});
    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Cons risk factors not found');
    }
    return result;
}

const createDisasterType = async(reqBody) => {
    return DisasterType.create(reqBody);
}

const updateDisasterType = async(disasterTypeId, reqBody) => {
    const result = await getDisasterTypeById(disasterTypeId);
    return await result.update(reqBody);
}

const deleteDisasterTypeById = async(disasterTypeId) => {
    const result = await getDisasterTypeById(disasterTypeId);
    await result.destroy();
}

module.exports = {
    getDisasterTypeById,
    getDisasterType,
    createDisasterType,
    updateDisasterType,
    deleteDisasterTypeById,
}

