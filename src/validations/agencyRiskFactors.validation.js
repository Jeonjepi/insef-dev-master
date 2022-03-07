const Joi = require('joi');

const getAgencyRiskFactor = {
    params: Joi.object().keys({
        agencyId: Joi.number().required(),
        agencyRiskFactorId: Joi.number().required(),
    }),
};

const getAgencyRiskFactors = {
    params: Joi.object().keys({
        agencyId: Joi.number().required(),
    }),
};

const createAgencyRiskFactor = {
    body: Joi.object().keys({
        ar_rule: Joi.string().required().allow(''),
        ar_element: Joi.string().required().allow(''),
        ar_factor: Joi.string().required().allow(''),
        ar_element_factor: Joi.string().required().allow(''),
        ar_hazardous_type: Joi.string().required().allow(''),
        ar_measures: Joi.string().required().allow(''),
        ar_measures_detail: Joi.string().required().allow(''),
    }),

    file: Joi.object().keys({
        ar_photo: Joi.string()
    }),
};

const updateAgencyRiskFactor = {
    params: Joi.object().keys({
        agencyId: Joi.number().required(),
        agencyRiskFactorId: Joi.number().required(),
    }),
    body: Joi.object().keys({
        ar_rule: Joi.string().allow(''),
        ar_element: Joi.string().allow(''),
        ar_factor: Joi.string().allow(''),
        ar_element_factor: Joi.string().required().allow(''),
        ar_hazardous_type: Joi.string().allow(''),
        ar_measures: Joi.string().allow(''),
        ar_measures_detail: Joi.string().allow(''),
    }),
    file: Joi.object().keys({
        ar_photo: Joi.string()
    }),
};

const deleteAgencyRiskFactor = {
    params: Joi.object().keys({
        agencyId: Joi.number().required(),
        agencyRiskFactorId: Joi.number().required(),
    }),
};

const getAgencyRiskFactorElementByElement = {
    params: Joi.object().keys({
        agencyId: Joi.number().required(),
    }),
    query: Joi.object().keys({
        element: Joi.string().allow(''),
        agency: Joi.boolean(),
        matching: Joi.boolean(),
        distinct: Joi.boolean(),
    }),
}

const getAgencyRiskFactorFactorByFactor = {
    params: Joi.object().keys({
        agencyId: Joi.number().required(),
    }),
    query: Joi.object().keys({
        element: Joi.string().required(),
        factor: Joi.string().allow(''),
        agency: Joi.boolean(),
    }),
}

const getAgencyRiskFactorElementFactor = {
    params: Joi.object().keys({
        agencyId: Joi.number().required(),
    }),
    query: Joi.object().keys({
        agency: Joi.boolean(),
        element: Joi.string().required(),
        factor: Joi.string().required(),
    }),
}

const getAgencyRiskMeasuresDetailById = {
    params: Joi.object().keys({
        agencyId: Joi.number().required(),
    }),
    query: Joi.object().keys({
        measures: Joi.string().required().allow(''),
        measures_detail: Joi.string().required().allow(''),
    }),
}

const getAgencyRiskMeasuresDetailAndRule = {
    params: Joi.object().keys({
        agencyId: Joi.number().required(),
    }),
    query: Joi.object().keys({
        measures: Joi.string().required().allow(''),
    }),
}
module.exports = {
    getAgencyRiskFactor,
    getAgencyRiskFactors,
    createAgencyRiskFactor,
    updateAgencyRiskFactor,
    deleteAgencyRiskFactor,
    getAgencyRiskFactorElementByElement,
    getAgencyRiskFactorFactorByFactor,
    getAgencyRiskFactorElementFactor,
    getAgencyRiskMeasuresDetailById,
    getAgencyRiskMeasuresDetailAndRule,
};
