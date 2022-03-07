const Joi = require('joi');

const getConsDivision = {
    body: Joi.object().keys({
    }),
};

const createConsDivision = {
    body: Joi.object().keys({
        cd_name: Joi.string().required(),
    }),
};

const deleteConsDivisionById = {
    params: Joi.object().keys({
        consDivisionId: Joi.string().required(),
    }),
};

module.exports = {
    getConsDivision,
    createConsDivision,
    deleteConsDivisionById,
};
