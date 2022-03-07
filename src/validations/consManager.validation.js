const Joi = require('joi');

const getConsManager = {
    params: Joi.object().keys({
        consId: Joi.number().required(),
    }),
};

const createConsManager = {
    params: Joi.object().keys({
        consId: Joi.number().required(),
    }),
    body: Joi.object().keys({
        ma_name: Joi.string().required().allow(''),
        ma_contact: Joi.string().required().allow(''),
        ma_is_major: Joi.number().required().valid(0, 1).allow(''),
    }),
};

const updateConsManager = {
    params: Joi.object().keys({
        consId: Joi.number().required(),
        consManagerId: Joi.number().required()
    }),
    body: Joi.object().keys({
        ma_name: Joi.string().allow(''),
        ma_contact: Joi.string().allow(''),
        ma_is_major: Joi.number().valid(0, 1).allow(''),
    }),
};

const deleteConsManager = {
    params: Joi.object().keys({
        consId: Joi.number().required(),
        consManagerId: Joi.number().required()
    }),
};

module.exports = {
    getConsManager,
    updateConsManager,
    deleteConsManager,
    createConsManager
};
