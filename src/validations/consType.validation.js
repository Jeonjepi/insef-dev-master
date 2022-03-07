const Joi = require('joi');

const getConsType = {
    body: Joi.object().keys({
    }),
};

const createConsType = {
    body: Joi.object().keys({
        ct_name: Joi.string().required(),
    }),
};

const deleteConsTypeById = {
    params: Joi.object().keys({
        consTypeId: Joi.string().required(),
    }),
};

module.exports = {
    getConsType,
    createConsType,
    deleteConsTypeById,
};
