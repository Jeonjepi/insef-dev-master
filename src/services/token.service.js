const jwt = require('jsonwebtoken');
const moment = require('moment');
const httpStatus = require('http-status');
const config = require('../config/config');
const { Token } = require('../models');
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/tokens');
const agencyService = require("./agency.service");
const userService = require('./user.service')

const generateToken = (userId, agencyId, expires, type, secret = config.jwt.secret) => {
    const payload = {
        sub: userId,
        sub1: agencyId,
        iat: moment().unix(),
        exp: expires.unix(),
        type,
    };
    return jwt.sign(payload, secret);
};

const saveToken = async (token, userId, agencyId, expires, type, blacklisted = false) => {
    const tokenDoc = await Token.create({
        tk_token: token,
        tk_us_id: userId,
        tk_ag_id: agencyId,
        tk_expired: expires.toDate(),
        tk_type: type,
        tk_blacklisted: blacklisted,
    });
    return tokenDoc;
};

const verifyToken = async (token, type) => {
    const payload = jwt.verify(token, config.jwt.secret);
    const tokenDoc = await Token.findOne({where: { tk_token: token, tk_type: type, tk_us_id: payload.sub, tk_blacklisted: false }});
    if (!tokenDoc) {
        throw new Error('Token not found');
    }
    return tokenDoc;
};

/**
 * Generate auth tokens
 * @param {User} user
 * @returns {Promise<Object>}
 */
const generateAuthTokens = async (user) => {
    // const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
    const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'year');
    const accessToken = generateToken(user.us_id, user.us_ag_id, accessTokenExpires, tokenTypes.ACCESS);

    // const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
    const refreshTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'year');
    const refreshToken = generateToken(user.us_id, user.us_ag_id, refreshTokenExpires, tokenTypes.REFRESH);
    await saveToken(refreshToken, user.us_id, user.us_ag_id, refreshTokenExpires, tokenTypes.REFRESH);

    return {
        access: {
            token: accessToken,
            expires: accessTokenExpires.toDate(),
        },
        refresh: {
            token: refreshToken,
            expires: refreshTokenExpires.toDate(),
        },
    };
};

/**
 * Generate reset password token
 * @param {string} email
 * @returns {Promise<string>}
 */
const generateResetPasswordToken = async (agencyId, email) => {
    const user = agencyId ? await userService.getUserByAgencyAndEmail(agencyId, email): await userService.getUserByEmail(email);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'No users found with this email');
    }
    const expires = moment().add(config.jwt.resetPasswordExpirationMinutes, 'minutes');
    const resetPasswordToken = generateToken(user.us_id, user.us_ag_id, expires, tokenTypes.RESET_PASSWORD);
    await saveToken(resetPasswordToken, user.us_id, user.us_ag_id, expires, tokenTypes.RESET_PASSWORD);
    return resetPasswordToken;//
};

const generateRegisterAgencyToken = async () => {
    const expires = moment().add(config.jwt.resetPasswordExpirationMinutes, 'minutes');
    const registerAgencyToken = generateToken(null, null, expires, tokenTypes.REGISTER_AGENCY);
    await saveToken(registerAgencyToken, null, null, expires, tokenTypes.REGISTER_AGENCY);
    return registerAgencyToken;
};

const generateRegisterAgentToken = async (ag_id) => {
    const agency = await agencyService.getAgencyById(ag_id);
    if (!agency) {
        throw new ApiError(httpStatus.NOT_FOUND, 'agency not found');
    }
    const expires = moment().add(config.jwt.resetPasswordExpirationMinutes, 'minutes');
    const registerAgencyToken = generateToken(null, ag_id, expires, tokenTypes.REGISTER_AGENT);
    await saveToken(registerAgencyToken, null, ag_id, expires, tokenTypes.REGISTER_AGENT);
    return registerAgencyToken;
};

const generateVerifyEmailToken = async (user) => {
    const expires = moment().add(config.jwt.verifyEmailExpirationMinutes, 'minutes');
    const verifyEmailToken = generateToken(user.id, expires, tokenTypes.VERIFY_EMAIL);
    await saveToken(verifyEmailToken, user.id, expires, tokenTypes.VERIFY_EMAIL);
    return verifyEmailToken;
};

const generateCompReportToken = async (time_limit) => {
    const expires = moment().add(time_limit || config.jwt.compReportExpirationMinutes, 'minutes');
    const compReportToken = generateToken(null, null, expires, tokenTypes.COMP_REPORT);
    await saveToken(compReportToken, null, null, expires, tokenTypes.COMP_REPORT);
    return compReportToken;
};

module.exports = {
    generateToken,
    saveToken,
    generateAuthTokens,
    generateResetPasswordToken,
    generateVerifyEmailToken,
    generateRegisterAgencyToken,
    generateRegisterAgentToken,
    generateCompReportToken,
    verifyToken,
};
