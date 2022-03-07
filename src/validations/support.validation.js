const Joi = require('joi');

const assignSupportAgent = {
    query: Joi.object().keys({
        consId: Joi.string(),
    }),
    body: Joi.object().keys({
        su_us_id: Joi.number(),
        su_manager_name : Joi.string().allow(''),
        su_manager_hp : Joi.string().allow(''),
        su_supported_at : Joi.string(),
    })
};

const updateSupportAgent = {
    query: Joi.object().keys({
        consId: Joi.string(),
    }),
    body: Joi.object().keys({
        us_id: Joi.number(),//
    })
};

const releaseSupportAgent = {
    query: Joi.object().keys({
        consId: Joi.string(),
    }),
};

const createSupport = {
    params: Joi.object().keys({
        consId: Joi.number().required(),
    }),
    body: Joi.object().keys({
        su_us_id: Joi.number(),
        su_manager_name : Joi.string().allow(''),
        su_manager_hp : Joi.string().allow(''),
        su_supported_at : Joi.string().required(),
    })
};

const updateSupport = {
    params: Joi.object().keys({
        consId: Joi.number().required(),
    }),
    query: Joi.object().keys({
        round: Joi.number().required(),
    }),
    body: Joi.object().keys({
        su_us_id: Joi.number(),
        su_manager_name : Joi.string().allow(''),
        su_manager_hp : Joi.string().allow(''),
        su_supported_at : Joi.string().required(),
    })
};

const startSupport = {
    params: Joi.object().keys({
        consId: Joi.number().required(),
        supportId: Joi.number().required(),
    }),
};

const pauseSupport = {
    params: Joi.object().keys({
        consId: Joi.number().required(),
    }),
};

const endSupport = {
    params: Joi.object().keys({
        consId: Joi.number().required(),
    }),
};

module.exports = {
    assignSupportAgent,
    updateSupportAgent,
    releaseSupportAgent,
    createSupport,
    updateSupport,
    startSupport,
    pauseSupport,
    endSupport,
}
