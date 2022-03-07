const Joi = require('joi');
// const { password } = require('./custom.validation');

const getUsers = {
    body: Joi.object().keys({
        ag_id: Joi.number(),
    }),
};

const getUsersByAgencyId = {
    params: Joi.object().keys({
        ag_id: Joi.number().required(),
    }),
    body: Joi.object().keys({
    }),
};

const getUser = {
    params: Joi.object().keys({
        userId: Joi.number().required(),
    }),
};

const createUser = {
    body: Joi.object().keys({
        us_ag_id: Joi.number().required(),
        us_num: Joi.string().required(),
        us_name: Joi.string().required(),
        us_username: Joi.string().required(),
        us_password: Joi.string().required(),
        us_role: Joi.string().required(),
        us_address: Joi.string().required(),
        us_phone: Joi.string().required(),
        us_email: Joi.string().required().email(),
        us_started_at:Joi.date().required().required(),
    }),
    file: Joi.object().keys({
        us_thumbnail: Joi.string(),
    })
};

const updateUserById = {
    params: Joi.object().keys({
        userId: Joi.number().required(),
    }),
    body: Joi.object().keys({
        us_num: Joi.string(),
        us_name: Joi.string(),
        us_username: Joi.string(),
        us_password: Joi.string(),
        us_role: Joi.string(),
        us_address: Joi.string(),
        us_status: Joi.string(),
        us_phone: Joi.string(),
        us_email: Joi.string().email(),
        us_started_at:Joi.date(),
    }),
    file: Joi.object().keys({
        us_thumbnail: Joi.string(),
    })
};

const deleteUserById = {
    params: Joi.object().keys({
        userId: Joi.number().required(),
    }),
    body: Joi.object().keys({
    }),
};

const resetUserPasswordById= {
    params: Joi.object().keys({
        userId: Joi.number().required(),
    }),
    body: Joi.object().keys({
    }),
};

module.exports = {
    getUser,
    getUsers,
    getUsersByAgencyId,
    createUser,
    updateUserById,
    deleteUserById,
    resetUserPasswordById,
};
