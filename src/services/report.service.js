const httpStatus = require("http-status");
const sequelize = require("sequelize");
const ApiError = require("../utils/ApiError");
const db = require("../models");
const {
  R1,
  R2,
  R4,
  R5,
  R6,
  R7,
  R8,
  Report,
  R3RiskFactors,
  R3BestPractices,
  ConsMedia,
  Support,
} = require("../models");
const supportService = require("./support.service");
const consMediaService = require("./consMedia.service");
const { MEDIA_TYPE } = require("../enums/consMedia.enum");
const { SUPPORT_STATUS } = require("../enums/support.enum");

const getConsReportProcess = async (consId) => {
  const result = await getRecentReportByConsId(consId);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "report not found");
  }
  return { re_id: result.re_id, re_step: result.re_step };
};

//Report
const createConsReportBySupportId
 = async (consId, supportId) => {
  const support = await Support.findOne({
    where: { su_id: supportId, su_is_deleted: 0 },
  });
  if (!support) {
    throw new ApiError(httpStatus.NOT_FOUND, "report not found");
  }
  return await Report.upsert({ re_cs_id: consId, re_su_id: support.su_id });
};

const createConsReportByConsId = async (consId, round) => {
  const support = await Support.findOne({
    where: { su_cs_id: consId, su_round: round, su_is_deleted: 0 },
  });
  if (!support) {
    throw new ApiError(httpStatus.NOT_FOUND, "report not found");
  }
  return await Report.upsert({ re_cs_id: consId, re_su_id: support.su_id });
};

const getRecentReportByConsId = async (consId, round) => {
  let result;
  if (round) {
    const query =
      "SELECT * FROM report re, support su, cons cs WHERE re.re_su_id = su.su_id AND su.su_cs_id = cs.cs_id AND su.su_is_deleted = 0 AND su.su_round = :round AND cs.cs_id =:consId";
    result = await db.sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
      replacements: { consId, round },
    });
  } else {
    const query =
      "SELECT * FROM report re LEFT JOIN support su ON su.su_id = re.re_su_id LEFT JOIN cons cs ON cs.cs_id = su.su_cs_id WHERE su.su_is_deleted = 0 AND cs.cs_id = :consId ORDER BY re.re_id DESC LIMIT 1";
    result = await db.sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
      replacements: { consId },
    });
  }
  if (!result.length) {
    throw new ApiError(httpStatus.NOT_FOUND, "report not found");
  }
  return result[0];
};

const getReportById = async (reportId) => {
  const result = await Report.findOne({ where: { re_id: reportId } });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "report not found");
  }

  return result;
};

const getReportByRound = async (consId, round) => {
  const query =
    "SELECT * FROM report re, support su, cons cs WHERE re.re_su_id = su.su_id AND su.su_cs_id = cs.cs_id AND su.su_round = :round AND cs.cs_id =:consId";
  const result = await db.sequelize.query(query, {
    type: sequelize.QueryTypes.SELECT,
    replacements: { consId, round },
  });
  if (!result.length) {
    throw new ApiError(httpStatus.NOT_FOUND, "report not found");
  }

  return result;
};

const getReportByConsId = async (consId) => {
  const result = await Report.findAll({ where: { re_cs_id: consId } });
  if (!result.length) {
    throw new ApiError(httpStatus.NOT_FOUND, "report not found");
  }

  return result;
};

// Report - round
// 1

const getConsReport1ByConsId = async (consId, round) => {
  const report = await supportService.getSupportAndReportByConsIdAndRound(
    consId,
    round
  );
  const result = await R1.findAll({ where: { r1_re_id: report.re_id }, include: [ConsMedia], } );
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "report not found");
  }
  console.log("result", result)
  return result[0];
};

const getConsReport1ByConsIdPhoto = async (consId, round) => {
  const report = await supportService.getSupportAndReportByConsIdAndRound(
    consId,
    round
  );
  const result = await R1.findAll({ where: { r1_re_id: report.re_id }, include: [ConsMedia], } );
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "report not found");
  }
  console.log("result", result)
  return result;
};

const getConsReport1ByConsAndR1Id = async (consId, round, reportId) => {
  const report = await supportService.getSupportAndReportByConsIdAndRound(
    consId,
    round
  );
  const result = await R1.findOne({
    where: { r1_re_id: report.re_id, r1_id: reportId },
    include: [ConsMedia],
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "report not found");
  }
  return result;
};

const createConsReport1ByConsId = async (consId, round, reqBody, reqFile) => {
  if (reqFile?.location) {
    reqBody.r1_photo = reqFile.location;
  }
  const query =
    "SELECT * FROM report re JOIN support su ON su.su_id = re.re_su_id JOIN cons cs ON cs.cs_id = su.su_cs_id WHERE cs.cs_id = :consId ORDER BY re.re_id DESC LIMIT 1";
  const result = await db.sequelize.query(query, {
    type: sequelize.QueryTypes.SELECT,
    replacements: { consId },
  });
  // const report = result ? result[0] : await createReportByConsId(consId);
  const report = await supportService.getSupportAndReportByConsIdAndRound(
    consId,
    round
  );
  return await R1.upsert({ r1_re_id: report.re_id, ...reqBody });
  
};

const updateConsReport1ByConsAndR1Id = async (
	consId, round, reportId, reqBody) => {
  let result = await getConsReport1ByConsAndR1Id(consId, round, reportId);
  result =  await result.update(reqBody);
  return getConsReport1ByConsAndR1Id(consId, round, result.r1_id);
};

// 2
const getConsReport2ByConsId = async (consId, round) => {
  const report = await supportService.getSupportAndReportByConsIdAndRound(
    consId,
    round
  );
  const result = await R2.findOne({ where: { r2_re_id: report.re_id } });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "report not found");
  }
  return result;
};

const createConsReport2ByConsId = async (consId, round, reqBody) => {
  const report = await supportService.getSupportAndReportByConsIdAndRound(
    consId,
    round
  );
  return await R2.upsert({ r2_re_id: report.re_id, ...reqBody });
};

const updateConsReport2ByConsId = async (consId, round, reqBody) => {
  const result = await getConsReport2ByConsId(consId, round);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "report not found");
  }
  return await result.update(reqBody);
};

// 3
const getConsReport3RiskFactorByConsId = async (consId, round) => {
  const report = await supportService.getSupportAndReportByConsIdAndRound(
    consId,
    round
  );
  const riskFactors = await R3RiskFactors.findAll({
    where: { f3_re_id: report.re_id },
    include: [ConsMedia],
  });
  return riskFactors;
};

const getConsReport3ByConsId = async (consId, round) => {
  const report = await supportService.getSupportAndReportByConsIdAndRound(
    consId,
    round
  );
  const riskFactors = await R3RiskFactors.findAll({
    where: { f3_re_id: report.re_id },
    include: [ConsMedia],
  });
  const bestPractices = await R3BestPractices.findAll({
    where: { b3_re_id: report.re_id },
    include: [ConsMedia],
  });
  const result = [];
  for (const riskFactor of riskFactors) {
    result.push(riskFactor.dataValues);
  }
  for (const bestPractice of bestPractices) {
    result.push(bestPractice.dataValues);
  }
  result.sort((a, b) => {
    const as = a.b3_created_at ? a.b3_created_at : a.f3_created_at;
    const bs = b.b3_created_at ? b.b3_created_at : b.f3_created_at;
    return bs - as;
  });

  return result;
};

const getConsReport3RiskFactorByConsAndRiskFactorId = async (
  consId,
  round,
  riskFactorId
) => {
  const report = await supportService.getSupportAndReportByConsIdAndRound(
    consId,
    round
  );
  const result = await R3RiskFactors.findOne({
    where: { f3_re_id: report.re_id, f3_id: riskFactorId },
    include: [ConsMedia],
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "report not found!!");
  }
  return result;
};

const getConsReport3BestPracticeByConsAndBestPracticeId = async (
  consId,
  round,
  bestPracticeId
) => {
  const report = await supportService.getSupportAndReportByConsIdAndRound(
    consId,
    round
  );
  const result = await R3BestPractices.findOne({
    where: { b3_re_id: report.re_id, b3_id: bestPracticeId },
    include: [ConsMedia],
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "report not found");
  }
  return result;
};

const createConsReport3RiskFactorByConsId = async (
  consId,
  round,
  reqBody,
  reqFiles
) => {
  //console.log("cm_id", reqBody.f3_cm_id);
  const { fk_title, fk_etc, fk_us_id, ...requestBody } = reqBody;
  const report = await supportService.getSupportAndReportByConsIdAndRound(
    consId,
    round
  );
  if (reqBody.f3_cm_id) {
    await consMediaService.getConsMediaById(reqBody.f3_cm_id);
  }

  // let media; // 기존 이미지 넘기던 부분
  // if (reqFiles.length){
  //     media = await consMediaService.createConsMediaByConsId(consId, reqFiles, MEDIA_TYPE.위험_요인, round);
  //     requestBody.f3_cm_id = media[0].cm_id;
  // }
  const result = await R3RiskFactors.create({
    f3_re_id: report.re_id,
    ...requestBody,
  });
  return await getConsReport3RiskFactorByConsAndRiskFactorId(
    consId,
    round,
    result.f3_id
  );
};

const createConsReport3BestPracticeByConsId = async (
  consId,
  round,
  reqBody,
  reqFiles
) => {
  // if (reqFiles.length){ // 기존 사진으로 데이터 넘기던 부분
  //     const media = await consMediaService.createConsMediaByConsId(consId, reqFiles, MEDIA_TYPE.모범_사례, round);
  //     reqBody.b3_cm_id = media[0].cm_id;
  // }
  await consMediaService.getConsMediaById(reqBody.b3_cm_id);
  const report = await supportService.getSupportAndReportByConsIdAndRound(
    consId,
    round
  );
  const result = await R3BestPractices.create({
    b3_re_id: report.re_id,
    ...reqBody,
  });
  return await getConsReport3BestPracticeByConsAndBestPracticeId(
    consId,
    round,
    result.b3_id
  );
};

const updateConsReport3RiskFactorByConsAndRiskFactorId = async (
  consId,
  round,
  riskFactorId,
  reqBody,
  reqFiles
) => {
  let media,
    params = {};
  if (reqBody.f3_cm_id) {
    await consMediaService.getConsMediaById(reqBody.f3_cm_id);
  }

  const r3RiskFactor = await getConsReport3RiskFactorByConsAndRiskFactorId(
    consId,
    round,
    riskFactorId
  );
  // if (reqFiles.length){ // 기존 사진으로 데이터 넘기던 부분
  //     media = await consMediaService.createConsMediaByConsId(consId, reqFiles, MEDIA_TYPE.위험_요인, round);
  //     reqBody['f3_cm_id'] = media[0].cm_id;
  // }
  // const report = await supportService.getSupportAndReportByConsIdAndRound(consId, round);
  await r3RiskFactor.update(reqBody);

  return await getConsReport3RiskFactorByConsAndRiskFactorId(
    consId,
    round,
    riskFactorId
  );
};

const updateConsReport3BestPracticeByConsAndRiskFactorId = async (
  consId,
  round,
  bestPracticeId,
  reqBody,
  reqFiles
) => {
  await consMediaService.getConsMediaById(reqBody.b3_cm_id);
  // if (reqFiles.length){ // 기존 사진으로 추가하던 부분
  //     const media = await consMediaService.createConsMediaByConsId(consId, reqFiles, MEDIA_TYPE.모범_사례, round);
  //     reqBody['b3_cm_id'] = media[0].cm_id;
  // }
  const result = await getConsReport3BestPracticeByConsAndBestPracticeId(
    consId,
    round,
    bestPracticeId
  );
  return await result.update(reqBody);
};

const deleteConsReport3RiskFactorByConsAndRiskFactorId = async (
  consId,
  f3_id
) => {
  f3_id = f3_id.split("|");
  f3_id = f3_id.map((item) => parseInt(item));
  await R3RiskFactors.destroy({ where: { f3_id } });
};

const deleteConsReport3BestPracticeByConsAndBestPracticeId = async (b3_id) => {
  b3_id = b3_id.split("|");
  b3_id = b3_id.map((item) => parseInt(item));
  await R3BestPractices.destroy({ where: { b3_id } });
};

// 4
const getConsReport4ByConsId = async (consId, round) => {
  const report = await supportService.getSupportAndReportByConsIdAndRound(
    consId,
    round
  );
  const result = await R4.findAll({ where: { r4_re_id: report.re_id } });
  if (!result.length) {
    throw new ApiError(httpStatus.NOT_FOUND, "report not found");
  }
  return result;
};

const getConsReport4ByConsAndR4Id = async (consId, round, r4_id) => {
  const report = await supportService.getSupportAndReportByConsIdAndRound(
    consId,
    round
  );
  const result = await R4.findOne({
    where: { r4_re_id: report.re_id, r4_id: r4_id },
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "report not found");
  }
  return result;
};

const createConsReport4ByConsId = async (consId, round, reqBody) => {
  const report = await supportService.getSupportAndReportByConsIdAndRound(
    consId,
    round
  );
  return await R4.create({ r4_re_id: report.re_id, ...reqBody });
};

const updateConsReport4ByConsAndR4Id = async (
  consId,
  round,
  reportId,
  reqBody
) => {
  const result = await getConsReport4ByConsAndR4Id(consId, round, reportId);
  return await result.update(reqBody);
};

const deleteConsReport4ByConsAndR4Id = async (consId, r4_id) => {
  r4_id = r4_id.split("|");
  r4_id = r4_id.map((item) => parseInt(item));
  // const result = await getConsReport4ByConsAndR4Id(consId, reportId);
  await R4.destroy({ where: { r4_id: r4_id } });
};

// 5
const getConsReport5ByConsId = async (consId, round) => {
  const report = await supportService.getSupportAndReportByConsIdAndRound(
    consId,
    round
  );
  const result = await R5.findAll({
    where: { r5_re_id: report.re_id },
    include: [ConsMedia],
  });
  if (!result.length) {
    throw new ApiError(httpStatus.NOT_FOUND, "report not found");
  }
  return result;
};

const getConsReport5ByConsAndR5Id = async (consId, round, reportId) => {
  const report = await supportService.getSupportAndReportByConsIdAndRound(
    consId,
    round
  );
  const result = await R5.findOne({
    where: { r5_re_id: report.re_id, r5_id: reportId },
    include: [ConsMedia],
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "report not found");
  }
  return result;
};

const createConsReport5ByConsId = async (consId, round, reqBody) => {
  // if (reqFiles && reqFiles.length){
  //     const media = await consMediaService.createConsMediaByConsId(consId, reqFiles, MEDIA_TYPE.모범_사례, round);
  //     reqBody.r5_cm_id = media[0].cm_id;
  // }
  const report = await supportService.getSupportAndReportByConsIdAndRound(
    consId,
    round
  );
  const result = await R5.create({ r5_re_id: report.re_id, ...reqBody });
  return getConsReport5ByConsAndR5Id(consId, round, result.r5_id);
};

const updateConsReport5ByConsAndR5Id = async (
  consId,
  round,
  reportId,
  reqBody
) => {
  // if (reqFiles?.length){
  //     const media = await consMediaService.createConsMediaByConsId(consId, reqFiles, MEDIA_TYPE.모범_사례, round);
  //     reqBody.b3_cm_id = media[0].cm_id;
  // }
  let result = await getConsReport5ByConsAndR5Id(consId, round, reportId);
  result = await result.update(reqBody);
  return getConsReport5ByConsAndR5Id(consId, round, result.r5_id);
};

const deleteConsReport5ByConsAndR5Id = async (consId, r5_id) => {
  // const result = await getConsReport5ByConsAndR5Id(consId, reportId);
  r5_id = r5_id.split("|");
  r5_id = r5_id.map((item) => parseInt(item));
  await R5.destroy({ where: { r5_id: r5_id } });
};

// 6
const getConsReport6ByConsId = async (consId, round) => {
  const report = await supportService.getSupportAndReportByConsIdAndRound(
    consId,
    round
  );
  const result = await R6.findAll({ where: { r6_re_id: report.re_id } });
  if (!result.length) {
    throw new ApiError(httpStatus.NOT_FOUND, "report not found");
  }
  return result;
};

const getConsReport6ByConsAndR6Id = async (consId, round, reportId) => {
  const report = await supportService.getSupportAndReportByConsIdAndRound(
    consId,
    round
  );
  const result = await R6.findOne({
    where: { r6_re_id: report.re_id, r6_id: reportId },
    include: [ConsMedia],
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "report not found");
  }
  return result;
};

const createConsReport6ByConsId = async (consId, round, reqBody, reqFiles) => {
  if (reqFiles && reqFiles.length) {
    const media = await consMediaService.createConsMediaByConsId(
      consId,
      reqFiles,
      MEDIA_TYPE.모범_사례,
      round
    );
    reqBody.r6_cm_id = media[0].cm_id;
  }
  const report = await supportService.getSupportAndReportByConsIdAndRound(
    consId,
    round
  );
  const result = await R6.create({ r6_re_id: report.re_id, ...reqBody });
  return getConsReport6ByConsAndR6Id(consId, round, result.r6_id);
};

const updateConsReport6ByConsAndR6Id = async (
  consId,
  round,
  reportId,
  reqBody
) => {
  const result = await getConsReport6ByConsAndR6Id(consId, round, reportId);
  return await result.update(reqBody);
};

const deleteConsReport6ByConsAndR6Id = async (consId, r6_id) => {
  // const result = await getConsReport6ByConsAndR6Id(consId, reportId);
  r6_id = r6_id.split("|");
  r6_id = r6_id.map((item) => parseInt(item));
  await R6.destroy({ where: { r6_id: r6_id } });
};

// 7
const getConsReport7ByConsId = async (consId, round) => {
  const report = await supportService.getSupportAndReportByConsIdAndRound(
    consId,
    round
  );
  const result = await R7.findAll({ where: { r7_re_id: report.re_id } });
  if (!result.length) {
    throw new ApiError(httpStatus.NOT_FOUND, "report not found");
  }
  return result;
};

const getConsReport7ByConsAndR7Id = async (consId, round, reportId) => {
  const report = await supportService.getSupportAndReportByConsIdAndRound(
    consId,
    round
  );
  const result = await R7.findOne({
    where: { r7_re_id: report.re_id, r7_id: reportId },
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "report not found");
  }
  return result;
};

const createConsReport7ByConsId = async (consId, round, reqBody) => {
  const report = await supportService.getSupportAndReportByConsIdAndRound(
    consId,
    round
  );
  return await R7.create({ r7_re_id: report.re_id, ...reqBody });
};

const updateConsReport7ByConsAndR7Id = async (
  consId,
  round,
  reportId,
  reqBody
) => {
  const result = await getConsReport7ByConsAndR7Id(consId, round, reportId);
  return await result.update(reqBody);
};

const deleteConsReport7ByConsAndR7Id = async (consId, r7_id) => {
  // const result = await getConsReport7ByConsAndR7Id(consId, reportId);
  r7_id = r7_id.split("|");
  r7_id = r7_id.map((item) => parseInt(item));
  await R7.destroy({ where: { r7_id: r7_id } });
};

const getConsReport8ByConsId = async (consId, round) => {
  const report = await supportService.getSupportAndReportByConsIdAndRound(
    consId,
    round
  );
  const result = await R8.findOne({ where: { r8_re_id: report.re_id } });
  if (!result) {
    const newR8 = await R8.create({ r8_re_id: report.re_id });
    return await R8.findOne({ where: { r8_id: newR8.re_id } });
  }
  return result;
};

const createConsReport8ByConsId = async (consId, round) => {
  const report = await supportService.getSupportAndReportByConsIdAndRound(
    consId,
    round
  );
  return await R8.create({ r8_re_id: report.re_id });
};

const assignCheckerSignByConsId = async (consId, round, reqBody, reqFile) => {
  reqBody.r8_checker_sign_image = reqFile?.location;
  const result = await getConsReport8ByConsId(consId, round);
  await result.update(reqBody);
  await checkSignByManagerAndChecker(consId, round);
  return result;
};

const assignManagerSignByConsId = async (consId, round, reqBody, reqFile) => {
  reqBody.r8_manager_sign_image = reqFile?.location;
  const result = await getConsReport8ByConsId(consId, round);
  await result.update(reqBody);
  await checkSignByManagerAndChecker(consId, round);
  return result;
};

const checkSignByManagerAndChecker = async (consId, round) => {
  const r8 = await getConsReport8ByConsId(consId, round);
  const { r8_checker_sign_image, r8_manager_sign_image } = r8;
  if (!r8_checker_sign_image || !r8_manager_sign_image) {
    return;
  }
  const result = await supportService.getRecentSupportByConsId(consId, round);
  result.update({ su_status: SUPPORT_STATUS.완료 });
};

const deleteConsReport8ByConsId = async (consId, round) => {
  const result = await getConsReport8ByConsId(consId, round);
  await result.destroy();
};

const getRecentReportsByDayAndAgentId = async (agencyId, day) => {
  return await db.sequelize.query(
    "SELECT * FROM report re JOIN support su ON su.su_id = re.re_su_id JOIN user us ON us.us_id = su.su_us_id WHERE su.su_ag_id = :agencyId AND re.re_created_at >= DATE(NOW()) - INTERVAL :day DAY ORDER BY re.re_created_at DESC",
    {
      type: sequelize.QueryTypes.SELECT,
      replacements: { agencyId, day },
    }
  );
};

module.exports = {
  getConsReportProcess,
  getRecentReportByConsId,
  getReportByConsId,
  getReportByRound,
  getReportById,
  createConsReportBySupportId,
  createConsReportByConsId,
  createConsReport1ByConsId,
  createConsReport2ByConsId,
  createConsReport3RiskFactorByConsId,
  createConsReport3BestPracticeByConsId,
  createConsReport4ByConsId,
  createConsReport5ByConsId,
  createConsReport6ByConsId,
  createConsReport7ByConsId,
  createConsReport8ByConsId,
  getConsReport3ByConsId,
  getConsReport4ByConsId,
  getConsReport5ByConsId,
  getConsReport6ByConsId,
  getConsReport7ByConsId,
  getConsReport1ByConsId,
  getConsReport2ByConsId,
  getConsReport3RiskFactorByConsId,
  getConsReport3RiskFactorByConsAndRiskFactorId,
  getConsReport3BestPracticeByConsAndBestPracticeId,
  getConsReport1ByConsAndR1Id,
  getConsReport4ByConsAndR4Id,
  getConsReport5ByConsAndR5Id,
  getConsReport6ByConsAndR6Id,
  getConsReport7ByConsAndR7Id,
  getConsReport8ByConsId,
  updateConsReport1ByConsAndR1Id,
  updateConsReport2ByConsId,
  updateConsReport3RiskFactorByConsAndRiskFactorId,
  updateConsReport3BestPracticeByConsAndRiskFactorId,
  updateConsReport4ByConsAndR4Id,
  updateConsReport5ByConsAndR5Id,
  updateConsReport6ByConsAndR6Id,
  updateConsReport7ByConsAndR7Id,
  deleteConsReport3RiskFactorByConsAndRiskFactorId,
  deleteConsReport3BestPracticeByConsAndBestPracticeId,
  deleteConsReport4ByConsAndR4Id,
  deleteConsReport5ByConsAndR5Id,
  deleteConsReport6ByConsAndR6Id,
  deleteConsReport7ByConsAndR7Id,
  getRecentReportsByDayAndAgentId,
  assignCheckerSignByConsId,
  assignManagerSignByConsId,
  deleteConsReport8ByConsId,
  getConsReport1ByConsIdPhoto
};
