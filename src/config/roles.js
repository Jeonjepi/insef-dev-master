const { userRolesList} = require('../enums/user.enum');

const roles = Object.keys(userRolesList);
const roleRights = new Map(Object.entries(userRolesList));

module.exports = {
    roles,
    roleRights,
};
