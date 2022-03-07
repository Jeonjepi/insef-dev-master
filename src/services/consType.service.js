const httpStatus = require('http-status');
const { ConsType } = require('../models');
const ApiError = require('../utils/ApiError');

const getConsType = async () => {
    const result = await ConsType.findAll();
    if (!result.length) {
        throw new ApiError(httpStatus.NOT_FOUND, 'cons division not found');
    }
    return result;
};

const createConsType = async (reqBody) => {
    return ConsType.create(reqBody);
};

const deleteConsTypeById = async (consTypeId) => {
    await ConsType.destroy({where: {ct_id:consTypeId}});
};

module.exports = {
    getConsType,
    createConsType,
    deleteConsTypeById,
};
