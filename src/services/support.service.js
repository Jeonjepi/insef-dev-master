const sequelize = require("sequelize");
const { Op } = require("sequelize");
const moment = require("moment");
const httpStatus = require("http-status");
const db = require("../models");
const ApiError = require("../utils/ApiError");
const agencyService = require("./agency.service");
const userService = require("./user.service");
const consService = require("./cons.service");
const { SUPPORT_STATUS, DELETE_METHOD } = require("../enums/support.enum");
const { Support } = require("../models");

const getSupport = async (supportId) => {
  const result = await Support.findOne({
    where: { su_id: supportId, su_is_deleted: false },
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "cons support not found");
  }
  return result;
};

const getSupportByConsAndSupportId = async (consId, supportId) => {
  const result = await Support.findOne({
    where: { su_cs_id: consId, su_id: supportId, su_is_deleted: false },
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "cons support not found");
  }
  return result;
};

const getSupportByConsAndRound = async (consId, round) => {
  const result = await Support.findOne({
    where: { su_cs_id: consId, su_round: round, su_is_deleted: false },
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "cons support not found");
  }
  return result;
};

const hasSupportByConsAndSupportedAt = async (consId, supportedAt) => {
  const result = await Support.findOne({
    where: { su_cs_id: consId, su_supported_at: supportedAt, su_is_deleted: 0 },
  });
  if (result) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `cons support already created at this datetime`
    );
  }
};

const getSupportById = async (supportId) => {
  const query =
    "SELECT su.*, cs.cs_start_round, cs.cs_name, cc.cc_name FROM support su, cons_company cc, cons cs WHERE su.su_cs_id = cs.cs_id AND cs.cs_cc_id = cc.cc_id AND NOT su_is_deleted = 1 AND su.su_id = :supportId ORDER BY su_id DESC LIMIT 1";
  const result = await db.sequelize.query(query, {
    type: sequelize.QueryTypes.SELECT,
    replacements: { supportId },
  });
  // 임경업님 요청
  // if (!result.leng) {
  //     throw new ApiError(httpStatus.NOT_FOUND, 'cons support not found');
  // }
  return result[0];
};

const getSupportAndReportByConsIdAndRound = async (consId, round) => {
  const query =
    "SELECT * FROM support su, report re WHERE su.su_id = re.re_su_id AND su.su_is_deleted = 0 AND su.su_cs_id = :consId AND su.su_round = :round";
  const result = await db.sequelize.query(query, {
    type: sequelize.QueryTypes.SELECT,
    replacements: { consId, round },
  });

  if (!result.length) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      `${consId}번 현장의 ${round}회차 기술지도가 없습니다.`
    );
  }
  return result[0];
};

const getRecentSupportByConsId = async (consId, round) => {
  const result = round
    ? await Support.findOne({
        where: { su_cs_id: consId, su_round: round, su_is_deleted: false },
        order: [["su_round", "DESC"]],
      })
    : await Support.findOne({
        where: { su_cs_id: consId, su_is_deleted: false },
        order: [["su_round", "DESC"]],
      });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "cons support not found");
  }
  return result;
};

const getSupportByLessOneThanDate = async (consId, date) => {
  const result = await Support.findOne({
    where: {
      su_cs_id: consId,
      su_supported_at: { [Op.lt]: date },
      su_is_deleted: false,
    },
    order: [["su_supported_at", "DESC"]],
  });
  return result;
};

const getSupportByLessThanDate = async (consId, date) => {
  const result = await Support.findAll({
    where: {
      su_cs_id: consId,
      su_supported_at: { [Op.lt]: date },
      su_is_deleted: false,
    },
  });
  return result;
};

const getSupportByGreaterThanDate = async (consId, date) => {
  const result = await Support.findAll({
    where: {
      su_cs_id: consId,
      su_supported_at: { [Op.gt]: date },
      su_is_deleted: false,
    },
    order: [["su_supported_at", "ASC"]],
  });
  return result;
};

const getSupportsStatusByUserId = async (userId) => {
  // TODO 특정 유저의 기술지도 중에서 기술지도 상태, 보고서 회차, 보고서 상태로 문자열 작성.
  // TODO ex) n차 [기술지도, 결과보고서] [[예약], [등록완료, 작성중, 서명대기]]
  const result = await db.sequelize.query(
    "SELECT su.su_started_at, cs.cs_name, cc.cc_name, su.su_round, su.su_status FROM support su LEFT JOIN report re ON su.su_id = re.re_su_id JOIN user us ON us.us_id = su.su_us_id JOIN cons cs ON cs.cs_id = su.su_cs_id JOIN agency ag ON ag.ag_id = su.su_ag_id JOIN cons_company cc ON cc.cc_id = cs.cs_cc_id WHERE us.us_id = :userId AND su.su_is_deleted = 0 ORDER BY su.su_created_at DESC",
    { type: sequelize.QueryTypes.SELECT, replacements: { userId } }
  );
  return result;
};

const getRecentSupportsStatusByAgencyId = async (agencyId) => {
  // TODO 기술지도 중에서 기술지도 상태, 보고서 회차, 보고서 상태로 문자열 작성.
  // TODO ex) n차 [기술지도, 결과보고서] [[예약], [등록완료, 작성중, 서명대기]]
  const result = await db.sequelize.query(
    "SELECT us.us_name, cs.cs_name, su.su_status, su.su_round FROM support su LEFT JOIN report re ON su.su_id = re.re_su_id JOIN user us ON us.us_id = su.su_us_id JOIN cons cs ON cs.cs_id = su.su_cs_id JOIN agency ag ON ag.ag_id = su.su_ag_id WHERE ag.ag_id = :agencyId AND AND su.su_is_deleted = 0 ORDER BY su.su_created_at DESC",
    { type: sequelize.QueryTypes.SELECT, replacements: { agencyId } }
  );
  return result;
};

const getRecentSupportsStatusByConsId = async (consId) => {
  // TODO 현장 조회시에 현장에 있는 지원들 보여주는듯 ?
  const result = await db.sequelize.query(
    "SELECT su.su_id, su.su_manager_name, su.su_manager_hp, su.su_round, su.su_started_at, su.su_ended_at, su.su_supported_at FROM support su LEFT JOIN report re ON su.su_id = re.re_su_id JOIN user us ON us.us_id = su.su_us_id JOIN cons cs ON cs.cs_id = su.su_cs_id JOIN agency ag ON ag.ag_id = su.su_ag_id WHERE su.su_cs_id = :consId AND su.su_is_deleted = 0 ORDER BY su.su_supported_at DESC",
    { type: sequelize.QueryTypes.SELECT, replacements: { consId } }
  );
  return result;
};

const getRecentSupportsStatusByDayAndAgencyId = async (agencyId, day) => {
  // TODO 최근 7일동안 등록된 기술지도 중에서 기술지도 상태, 보고서 회차, 보고서 상태로 문자열 작성.
  // TODO ex) n차 [기술지도, 결과보고서] [[예약], [등록완료, 작성중, 서명대기]]
  const result = await db.sequelize.query(
    "SELECT us.us_name, cs.cs_name, su.su_status, su.su_round FROM support su LEFT JOIN user us ON us.us_id = su.su_us_id JOIN cons cs ON cs.cs_id = su.su_cs_id LEFT JOIN report re ON re.re_su_id = su.su_id WHERE su.su_ag_id = :agencyId AND AND su.su_is_deleted = 0 AND su.su_created_at >= DATE(NOW()) - INTERVAL :day DAY ORDER BY su.su_created_at DESC",
    { type: sequelize.QueryTypes.SELECT, replacements: { agencyId, day } }
  );
  return result;
};

const getThisMonthSupportsCountGroupByAgentUserByAgencyId = async (
  agencyId
) => {
  const result = await db.sequelize.query(
    "SELECT us.us_name, count(*) cnt " +
      "FROM support su " +
      "JOIN user us ON us.us_id = su.su_us_id " +
      "JOIN agency ag ON ag.ag_id = su.su_ag_id " +
      "WHERE MONTH(su.su_created_at) = MONTH(NOW()) " +
      "AND YEAR(su.su_created_at) = YEAR(NOW()) " +
      "AND ag.ag_id = :agencyId " +
      "AND su.su_is_deleted = 0 " +
      "GROUP BY su.su_us_id " +
      "ORDER BY cnt DESC",
    { type: sequelize.QueryTypes.SELECT, replacements: { agencyId } }
  );
  return result;
};

const createSupportByConsId = async (consId, reqBody) => {
  const { su_us_id, su_supported_at } = reqBody;
  await hasSupportByConsAndSupportedAt(consId, su_supported_at);
  const cons = await consService.getConsById(consId);
  const agency = await agencyService.getAgencyByConsId(consId);
  if (!su_us_id && !cons.cs_agent_us_id) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "현장에 설정된 요원이 없습니다."
    );
  }
  const user = su_us_id
    ? await userService.getUserById(su_us_id)
    : await userService.getUserById(cons.cs_agent_us_id);
  if (!su_us_id) {
    // us 와함께 기술지원을 생성하는 경우 support의 status를 기술지도 예약으로 변경
    reqBody.su_us_id = cons.cs_agent_us_id;
  }

  reqBody.su_status = SUPPORT_STATUS.예약;
  reqBody.su_cs_id = consId;
  reqBody.su_ag_id = agency.ag_id;
  const newSupport = await Support.create(reqBody);
  return newSupport;
};

const updateSupportByConsId = async (consId, round, reqBody) => {
  const support = await getSupportByConsAndRound(consId, round);
  return await support.update(reqBody);
};

const assignSupportAgentByConsAndUserId = async (
  consId,
  supportId,
  reqBody
) => {
  const { su_us_id, requestBody } = reqBody;
  const support = await getSupportByConsAndSupportId(consId, supportId);
  if (support.su_us_id != null) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "support user already assigned, please update user"
    );
  }
  await support.update({ ...reqBody });
};

const updateSupportAgentByConsAndUserId = async (consId, userId) => {
  const support = await getRecentSupportByConsId(consId);
  await support.update({ su_us_id: userId });
};

const releaseSupportAgentByConsId = async (consId) => {
  const support = await getRecentSupportByConsId(consId);
  await support.update({
    su_us_id: null,
    su_status: SUPPORT_STATUS.기술_지도_중단,
  });
};

const startSupportByConsId = async (consId, supportId) => {
  let recentSupport;
  const cons = await consService.getConsById(consId);
  const support = await getSupport(supportId);
  const supportedAt = support.su_supported_at;

  // 오늘 날짜인 데이터만 실행 할수 있도록하기
  /*if (supportedAt != moment().format("YYYY-MM-DD")){
        throw new ApiError(httpStatus.BAD_REQUEST, `support\'s supported_at is not today(${supportedAt})`);
    }*/

  const user = await userService.getUserById(support.su_us_id);

  if ([SUPPORT_STATUS.진행, SUPPORT_STATUS.완료].includes(support.su_status)) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "cons support already started or ended"
    );
  }
  try {
    recentSupport = await getRecentSupportByConsId(consId);
  } catch (e) {}
  console.log("su_round", support.su_round);
  console.log("start_round", cons.cs_start_round);
  console.log("support", support);
  console.log("recentSupport", recentSupport);
  const newSupport = await support.update({
    su_status: SUPPORT_STATUS.진행,
    su_round: recentSupport
      ? recentSupport.su_round === 0
        ? cons.cs_start_round
        : recentSupport.su_round + 1
      : cons.cs_start_round,
  });
  return newSupport;
};

const modifySupportedAt = async (consId, supportId, su_supported_at) => {
  // if (su_supported_at < moment().format("YYYY-MM-DD")) {
  //   throw new ApiError(
  //     httpStatus.BAD_REQUEST,
  //     "parameter supported_at is less than today"
  //   );
  // }
  await hasSupportByConsAndSupportedAt(consId, su_supported_at);
  const support = await getSupport(supportId);
  // if (support.su_status != SUPPORT_STATUS.예약) {
  //   throw new ApiError(
  //     httpStatus.BAD_REQUEST,
  //     "support status is not reservation"
  //   );
  // }
  return await support.update({ su_supported_at });
};

const deleteSupportById = async (supportId, delete_method) => {
  const support = await getSupport(supportId);
  await support.update({
    su_is_deleted: true,
    su_delete_method: delete_method ? delete_method : DELETE_METHOD.API로삭제,
  });
};

// 오늘 이전 데이터 삭제//
const deleteSupportsByScheduler = async () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  const day = ("0" + today.getDate()).slice(-2);
  const dateString = year + "-" + month + "-" + day;
  const supports = await Support.findAll({
    where: {
      su_is_deleted: 0,
      su_status: SUPPORT_STATUS.예약,
      su_supported_at: { [Op.lt]: dateString },
    },
  });
  for (const support of supports) {
    await support.update({
      su_is_deleted: 1,
      su_delete_method: DELETE_METHOD.스케쥴러로삭제,
    });
  }
};

module.exports = {
  getSupportById,
  getSupportByConsAndSupportId,
  getRecentSupportByConsId,
  getSupportsStatusByUserId,
  getSupportAndReportByConsIdAndRound,
  getRecentSupportsStatusByConsId,
  getRecentSupportsStatusByAgencyId,
  getRecentSupportsStatusByDayAndAgencyId,
  getThisMonthSupportsCountGroupByAgentUserByAgencyId,
  createSupportByConsId,
  updateSupportByConsId,
  assignSupportAgentByConsAndUserId,
  updateSupportAgentByConsAndUserId,
  releaseSupportAgentByConsId,
  startSupportByConsId,
  modifySupportedAt,
  deleteSupportById,
  deleteSupportsByScheduler,
};
