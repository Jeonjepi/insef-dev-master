const httpStatus = require('http-status');
const { Token } = require('../models');
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/tokens');
const userService = require('./user.service');
const smsService = require('./sms.service');
const tokenService = require('./token.service');

const loginUserWithEmailAndPasswordByAgency = async (ag_id, email, password) => {
    const user = await userService.getUserByAgencyAndEmail(ag_id, email);
    // await user.update({us_password: "test"}); // 비밀번호 초기화
    if (!user || !(await user.isPasswordMatch(password))) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
    }
    return user
};

const checkEmailAndPassword = async (email, password) => {
    const user = await userService.getUserByEmail(email)
    if (!user || !(await user.isPasswordMatch(password))) {
        return false;
    }
    return true;
};

const logout = async (refreshToken) => {
    const refreshTokenDoc = await Token.findOne({ tk_token: refreshToken, tk_type: tokenTypes.REFRESH, tk_blacklisted: false });
    if (!refreshTokenDoc) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
    }
    await refreshTokenDoc.destroy();
};

const refreshAuth = async (refreshToken) => {
    try {
        const refreshTokenDoc = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH);
        const user = await userService.getUserById(refreshTokenDoc.tk_us_id);
        if (!user) {
            throw new Error();
        }
        await refreshTokenDoc.destroy();
        return tokenService.generateAuthTokens(user);
    } catch (error) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
    }
};

const changePassword = async (username, name, newPassword) => {
    const user = await userService.getUserByUsernameAndName(username, name);
    await user.update({us_password: newPassword});
    return user;
};

const verifyAuthNumber = async (us_name, us_phone, authNumber) => {
    try {
        const user = await userService.getUserByNameAndPhone(us_name, us_phone);
        const sms = await smsService.getLatestMessageByUserId(user.us_id);
        if (!user) throw new Error();
        if (authNumber != sms.sm_content) throw new Error();
        await sms.destroy()
        return { us_username: user.us_username };

    } catch (error) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'SMS verification failed');
    }
};

const generateAuthNumber = (n) => {
    let str = '';
    for (let i = 0; i < n; i++) {
        str += Math.floor(Math.random() * 10);
    }
    return str;
}

const resetPassword = async (resetPasswordToken, newPassword) => {
    const resetPasswordTokenDoc = await tokenService.verifyToken(resetPasswordToken, tokenTypes.RESET_PASSWORD);
    const user = await userService.getUserById(resetPasswordTokenDoc.tk_us_id);
    if (!user) {
        throw new Error();
    }
    await userService.updateUserById(user.us_id, { us_password: newPassword });
    await Token.destroy({where: { tk_us_id: user.us_id, tk_type: tokenTypes.RESET_PASSWORD }});
};

module.exports = {
    logout,
    loginUserWithEmailAndPasswordByAgency,
    checkEmailAndPassword,
    refreshAuth,
    changePassword,
    verifyAuthNumber,
    generateAuthNumber,
    resetPassword,
};

