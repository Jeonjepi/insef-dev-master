const Joi = require('joi');

const getAgencyDisasterType = {
    params: Joi.object().keys({
        agencyDisasterTypeId: Joi.string().required(),
    }),
};

const getAgencyDisasterTypes = {
    params: Joi.object().keys({
        agencyId: Joi.number().required(),
    }),
    query: Joi.object().keys({
        name: Joi.string().allow(''),
        fields: Joi.string(),
    }),
};

const createAgencyDisasterType = {
    params: Joi.object().keys({
        agencyId: Joi.number().required(),
    }),
    body: Joi.object().keys({
        ad_name: Joi.string().required(),
    }),
};

const updateAgencyDisasterType = {
    params: Joi.object().keys({
        agencyId: Joi.string().required(),
        agencyDisasterTypeId: Joi.string().required(),
    }),
    body: Joi.object().keys({
        ad_name: Joi.string(),
    }),
};

const deleteAgencyDisasterType = {
    params: Joi.object().keys({
        agencyId: Joi.string().required(),
        agencyDisasterTypeId: Joi.string().required(),
    }),
};

module.exports = {
    getAgencyDisasterType,
    getAgencyDisasterTypes,
    createAgencyDisasterType,
    updateAgencyDisasterType,
    deleteAgencyDisasterType,
};
