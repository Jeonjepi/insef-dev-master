const userRolesList = {
    "기술지도요원": ['기술지도요원'],
    "기업회원": ['기업회원'],
    "관리자": ['관리자'],
};

const USER_ROLE = {
    '기술지도요원': '기술지도요원',
    '기업회원': '기업회원',
    '관리자': '관리자',
};
USER_ROLE_VALUES = Object.values(USER_ROLE);

const USER_STATUS = {
    // 요원 상태
    "검증_대기":"검증 대기",
    "검증 완료":"검증 완료",
    "퇴사":"퇴사",
};

module.exports = {
    USER_ROLE,
    USER_STATUS,
    userRolesList,
    USER_ROLE_VALUES,
}
