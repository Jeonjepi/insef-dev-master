const Joi = require('joi');

const getUserRiskFactor = {
    params: Joi.object().keys({
        userId: Joi.string().required(),
    }),
};

const getUserRiskFactors = {
    params: Joi.object().keys({
    }),
};

const createUserRiskFactor = {
    body: Joi.object().keys({
        uf_us_id: Joi.number(),
        uf_type: Joi.string().required(),
        uf_rule: Joi.string().required(),
        uf_element: Joi.string().required(),
        uf_factor: Joi.string().required(),
        uf_disaster_type: Joi.string().required(),
        uf_hazardous_type: Joi.string().required(),
        uf_measures: Joi.string().required(),
        uf_measures_detail: Joi.string().required(),
    }),

    file: Joi.object().keys({
        uf_photo: Joi.string()
    }),
};

const updateUserRiskFactor = {
    params: Joi.object().keys({
        userId: Joi.string().required(),
        riskFactorId: Joi.string().required(),
    }),
    body: Joi.object().keys({
        uf_type: Joi.string(),
        uf_rule: Joi.string(),
        uf_element: Joi.string(),
        uf_factor: Joi.string(),
        uf_disaster_type: Joi.string(),
        uf_hazardous_type: Joi.string(),
        uf_measures: Joi.string(),
        uf_measures_detail: Joi.string(),
    }),
    file: Joi.object().keys({
        uf_photo: Joi.string()
    }),
};

const deleteUserRiskFactor = {
    params: Joi.object().keys({
        userId: Joi.string().required(),
        riskFactorId: Joi.string().required(),
    }),
};

module.exports = {
    getUserRiskFactor,
    getUserRiskFactors,
    createUserRiskFactor,
    updateUserRiskFactor,
    deleteUserRiskFactor,
};
