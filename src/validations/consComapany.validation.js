const Joi = require('joi');
// const { password } = require('./custom.validation');

const getConsCompanies = {
    body: Joi.object().keys({
        ag_id: Joi.number(),
    }),
};
//
const getConsCompany = {
    params: Joi.object().keys({
        consCompanyId: Joi.string().required(),
    }),
};

const createConsCompany = {
    body: Joi.object().keys({
        cc_ag_id: Joi.number().required(),
        cc_name: Joi.string().required(),
        cc_ceo: Joi.string().allow(''), //.custom(password),
        cc_company_num: Joi.string().allow(''),
        cc_company_address: Joi.string().allow(''),
        cc_tel: Joi.string().allow(''),
        cc_phone: Joi.string().allow(''),
        cc_email: Joi.string().email().allow(''),
        cc_fax: Joi.string().allow(''),
        token: Joi.string().allow(''),
    }),
};

const updateConsCompany = {
    body: Joi.object().keys({
        cc_name: Joi.string(),
        cc_ceo: Joi.string().allow(''), //.custom(password),
        cc_company_num: Joi.string().allow(''),
        cc_company_address: Joi.string().allow(''),
        cc_tel: Joi.string().allow(''),
        cc_phone: Joi.string().allow(''),
        cc_email: Joi.string().email().allow(''),
        cc_fax: Joi.string().allow(''),
    }),
};

const deleteConsCompany = {
    params: Joi.object().keys({
        consCompanyId: Joi.string().required(),
    }),
};

module.exports = {
    getConsCompanies,
    getConsCompany,
    createConsCompany,
    updateConsCompany,
    deleteConsCompany,
};
