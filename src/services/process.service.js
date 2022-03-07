const httpStatus = require('http-status');
const { Process, Agency} = require('../models');
const ApiError = require('../utils/ApiError');
const {isConsonantAll, getConsonantFilter} = require("../utils/hangul");
const {Op} = require("sequelize");

const getProcesses = async(query) => {
    const result = await Process.findAll(isConsonantAll(query) ? {}:{where: query ? {pr_name: {[Op.like]:'%' + query + '%'}}: {}});
    return getConsonantFilter(result, 'pr_name', query);
}

const getProcessById = async(processId) => {
    const result = await Process.findOne({where: {pr_id: processId}});
    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, 'process not found');
    }
    return result;
}

const createProcess = async(reqBody) => {
    return Process.create(reqBody);
}

const updateProcess = async(processId, reqBody) => {
    const result = await getProcessById(processId);
    return await result.update(reqBody);
}

const deleteProcessById = async(processId) => {
    const result = await getProcessById(processId);
    await result.destroy();
}

module.exports = {
    getProcesses,
    getProcessById,
    createProcess,
    updateProcess,
    deleteProcessById,
}

