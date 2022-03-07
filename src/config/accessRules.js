const auth = require("../middlewares/auth");
const {USER_ROLE} = require("../enums/user.enum");

const ACCESS_RULES = {
    ALL_USER: auth(USER_ROLE.관리자, USER_ROLE.기업회원, USER_ROLE.기술지도요원),
    ADMIN: auth(USER_ROLE.관리자),
    AGENT: auth(USER_ROLE.기술지도요원),
    AGENCY: auth(USER_ROLE.기업회원),
    EXCLUDE_AGENT: auth(USER_ROLE.관리자, USER_ROLE.기업회원),
}

module.exports = {
    ACCESS_RULES,
}