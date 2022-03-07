const Joi = require('joi');

const getConsRiskFactor = {
    params: Joi.object().keys({
        riskFactorId: Joi.string().required(),
    }),
};

const getConsRiskFactors = {
    params: Joi.object().keys({
    }),
};

const createConsRiskFactor = {
    body: Joi.object().keys({
        fk_type: Joi.string().required(),
        fk_rule: Joi.string().required(),
        fk_element: Joi.string().required(),
        fk_factor: Joi.string().required(),
        fk_disaster_type: Joi.string().required(),
        fk_hazardous_type: Joi.string().required(),
        fk_measures: Joi.string().required(),
        fk_measures_detail: Joi.string().required(),
    }),

    file: Joi.object().keys({
        fk_photo: Joi.string()
    }),
};

const updateConsRiskFactor = {
    params: Joi.object().keys({
        riskFactorId: Joi.string().required(),
    }),
    body: Joi.object().keys({
        fk_type: Joi.string(),
        fk_rule: Joi.string(),
        fk_element: Joi.string(),
        fk_factor: Joi.string(),
        fk_disaster_type: Joi.string(),
        fk_hazardous_type: Joi.string(),
        fk_measures: Joi.string(),
        fk_measures_detail: Joi.string(),
    }),
    file: Joi.object().keys({
        fk_photo: Joi.string()
    }),
};

const deleteConsRiskFactor = {
    params: Joi.object().keys({
        riskFactorId: Joi.string().required(),
    }),
};

module.exports = {
    getConsRiskFactor,
    getConsRiskFactors,
    createConsRiskFactor,
    updateConsRiskFactor,
    deleteConsRiskFactor,
};
