const Joi = require('joi');

const getDisasterType = {
    params: Joi.object().keys({
        disasterTypeId: Joi.string().required(),
    }),
};

const getDisasterTypes = {
    query: Joi.object().keys({
        name: Joi.string().allow(''),
    }),
};

const createDisasterType = {
    body: Joi.object().keys({
        dt_name: Joi.string().required(),
    }),
};

const updateDisasterType = {
    params: Joi.object().keys({
        disasterTypeId: Joi.string().required(),
    }),
    body: Joi.object().keys({
        dt_name: Joi.string(),
    }),
};

const deleteDisasterType = {
    params: Joi.object().keys({
        disasterTypeId: Joi.string().required(),
    }),
};

module.exports = {
    getDisasterType,
    getDisasterTypes,
    createDisasterType,
    updateDisasterType,
    deleteDisasterType,
};
