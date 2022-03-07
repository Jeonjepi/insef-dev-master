const passport = require('passport');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { roleRights } = require('../config/roles');

const verifyCallback = (req, resolve, reject, requiredRights) => async (err, user, info) => {
    if (err || info || !user) {
        return reject(new ApiError(httpStatus.UNAUTHORIZED, info));
    }
    req.user = user;
    // const docs = await tokenService.verifyToken(req.header('authorization').split(" ")[1],'refresh')

    if (requiredRights.length) {
        const userRights = roleRights.get(user.us_role);
        const hasRequiredRights = requiredRights.some((requiredRight) => userRights.includes(requiredRight));
        // console.log(!hasRequiredRights)
        // console.log(req.params.id, user.us_id)
        if (!hasRequiredRights && req.params.id !== user.us_id) {
            return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden - authentication failed'));
        }
    }

    resolve();
};

const auth = (...requiredRights) => async (req, res, next) => {
    return new Promise((resolve, reject) => {
        passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(req, res, next);
    })
        .then(() => next())
        .catch((err) => next(err));
};

module.exports = auth;
