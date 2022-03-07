const Joi = require('joi');
const {MEDIA_TYPE_VALUES} = require("../enums/consMedia.enum");
const {USER_ROLE_VALUES} = require("../enums/user.enum");
// const { password } = require('./custom.validation');

const register = {
    body: Joi.object().keys({
        us_ag_id: Joi.number().required(),
        us_num: Joi.string().required(),
        us_name: Joi.string().required(),
        us_username: Joi.string().required(),
        us_password: Joi.string().required(),
        us_role: Joi.string().required().valid(...USER_ROLE_VALUES),
        us_address: Joi.string().required(),
        us_phone: Joi.string().required(),
        us_email: Joi.string().required().email(),
        us_started_at:Joi.date().required(),
        token: Joi.string().allow(''),
    }),
    file: Joi.object().keys({
        us_thumbnail: Joi.string(),
    })
};

const login = {
    body: Joi.object().keys({
        ag_id: Joi.number(),
        us_email: Joi.string().required(),
        us_password: Joi.string().required(),
    }),
};

const logout = {
    body: Joi.object().keys({
        refreshToken: Joi.string().required(),
    }),
};

const checkEmailAndPassword = {
    body: Joi.object().keys({
        us_email: Joi.string().required(),
        us_password: Joi.string().required(),
    }),
};

const refreshTokens = {
    body: Joi.object().keys({
        refreshToken: Joi.string().required(),
    }),
};

const findUser = {
    body: Joi.object().keys({
        us_name: Joi.string().required(),
        us_username: Joi.string().required(),
        us_phone: Joi.string().required(),
    }),
};

const changePassword = {
    body: Joi.object().keys({
        us_username: Joi.string().required(),
        us_password: Joi.string().required(),
        newPassword: Joi.string().required()
    }),
};

const sendVerificationSMS= {
    body: Joi.object().keys({
        us_username: Joi.string().required(),
        us_phone: Joi.string().required(),
    }),
};

const sendVerificationEmail= {
    body: Joi.object().keys({
        us_co_id: Joi.number().required(),
        us_eamil: Joi.number().required(),
    }),
};

module.exports = {
    register,
    login,
    logout,
    checkEmailAndPassword,
    refreshTokens,
    findUser,
    changePassword,
    sendVerificationSMS,
    sendVerificationEmail,
};
