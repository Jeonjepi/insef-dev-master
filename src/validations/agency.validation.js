const Joi = require('joi');

const getAgencies = {
    body: Joi.object().keys({
    }),
};

const getAgencyById = {
    params: Joi.object().keys({
        agencyId: Joi.string().required(),
    }),
};

const createAgency = {
    body: Joi.object().keys({
        ag_type: Joi.string().required(),
        ag_name: Joi.string().required(),
        ag_ceo_name: Joi.string().required(),
        ag_ceo_email: Joi.string().required(),
        ag_ceo_phone: Joi.string().required(),
        ag_regist_num: Joi.string().required(),
        ag_address: Joi.string().required(),
        ag_tel: Joi.string().required(),
        ag_layout: Joi.string().required(),
        ag_region: Joi.string().required(),
        ag_fax: Joi.string().required(),
        token: Joi.string(),
    }),
    file: Joi.object().keys({
        ag_regist_photo: Joi.string(),
    })
};

const updateAgencyById = {
    params: Joi.object().keys({
        agencyId: Joi.string().required(),
    }),
    body: Joi.object().keys({
        ag_type: Joi.string(),
        ag_name: Joi.string(),
        ag_ceo_name: Joi.string(),
        ag_ceo_email: Joi.string(),
        ag_ceo_phone: Joi.string(),
        ag_regist_num: Joi.string(),
        ag_address: Joi.string(),
        ag_tel: Joi.string(),
        ag_layout: Joi.string(),
        ag_region: Joi.string(),
        ag_fax: Joi.string(),
    }),
    file: Joi.object().keys({
        ag_regist_photo: Joi.string(),
    })
};

const deleteAgencyById = {
    params: Joi.object().keys({
        agencyId: Joi.string().required(),
    }),
};

const getOverview = {
    params: Joi.object().keys({
        agencyId: Joi.number().required(),
    })
};

module.exports = {
    getAgencies,
    getAgencyById,
    createAgency,
    updateAgencyById,
    deleteAgencyById,
    getOverview,
};
