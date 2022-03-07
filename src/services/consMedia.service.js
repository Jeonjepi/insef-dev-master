const path = require("path");
const { Op, literal, QueryTypes } = require("sequelize");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const s3 = require("../config/s3");
const { Cons, ConsMedia } = require("../models");
const { MEDIA_TYPE } = require("../enums/consMedia.enum");
const supportService = require("./support.service");
const db = require("../models");
const sequelize = require("sequelize");

// 현장 사진ㄱㄱ
const checkConsMediaParams = async (reqBody) => {
  const { cm_cs_id } = reqBody;
  if (cm_cs_id && !(await Cons.isConsIdTaken(cm_cs_id))) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "related construction not found"
    );
  }
};
// 하나의 현장 회차에는 하나의 전경사진만
const getConsPanoramaPhotoByConsIdAndRound = async (consId, round) => {
  const result = await ConsMedia.findOne({
    where: {
      cm_cs_id: consId,
      cm_round: round,
      cm_category: MEDIA_TYPE.현장_사진,
    },
  });
  if (!result) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `cons ${consId} round ${round} ${MEDIA_TYPE.현장_사진} is already created`
    );
  }
  return result;
};

const getConsMediaById = async (consMediaId) => {
  const result = await ConsMedia.findOne({ where: { cm_id: consMediaId } });
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, "cons media not found");
  }
  return result;
};

const getConsMediaByConsId = async (consId, reqQuery) => {
  const { greater_than, cm_round, cm_category } = reqQuery;

  const query = `SELECT cm.*, (SELECT count(*) FROM r3_risk_factors f3 WHERE f3.f3_cm_id = cm.cm_id)+ \
    (SELECT count(*) FROM r3_best_practices b3 WHERE b3.b3_cm_id = cm.cm_id) + \
    (SELECT count(*) FROM r1 r1 WHERE r1.r1_cm_id = cm.cm_id) + \
    (SELECT count(*) FROM r5 r5 WHERE r5.r5_cm_id = cm.cm_id) + \
    (SELECT count(*) FROM r6 r6 WHERE r6.r6_cm_id = cm.cm_id) cm_used_count\
    FROM cons_media cm \
    WHERE cm.cm_su_id \
    IN (select su.su_id \
        from support su \
        where su.su_cs_id = :consId \
        AND su.su_is_deleted = 0) \
    AND cm.cm_round= :round \
    ${cm_category ? "AND cm.cm_category = :cm_category" : ""} \
    ${greater_than ? "AND cm.cm_updated_at > :greater_than" : ""} \
    ORDER BY cm.cm_id DESC`;

  const result = await db.sequelize.query(query, {
    type: sequelize.QueryTypes.SELECT,
    replacements: { consId, greater_than, round: cm_round, cm_category },
  });
  if (!result.length) {
    throw new ApiError(httpStatus.NOT_FOUND, "construction photo not found");
  }
  return result;
};

const getConsMediaOneByConsAndMediaId = async (consId, cm_id) => {
  const result = await ConsMedia.findOne({
    where: { cm_cs_id: consId, cm_id: cm_id },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "construction photo not found");
  }
  return result;
};

const getConsMediaByConsAndMediaId = async (consId, cm_id) => {
  const result = await ConsMedia.findAll({
    where: { cm_cs_id: consId, cm_id: cm_id },
    order: [["cm_id", "DESC"]],
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "construction photo not found");
  }
  return result;
};

const getConsReportMediaByConsAndReportId = async (consId, reportId) => {
  const media = ConsMedia.findAll({
    where: { cm_cs_id: consId, cm_post_id: reportId },
    order: [["cm_id", "DESC"]],
  });
  return media;
};

const createConsMediaByConsId = async (consId, reqFiles, category, round) => {
  const support = await supportService.getSupportAndReportByConsIdAndRound(
    consId,
    round
  );
  // 요구사항 변경됌... update or insert 로...
  let result;

  // 전경 사진이 아닐 경우 처리 (bulk insert)
  const params = [];
  for (const reqFile of reqFiles) {
    params.push({
      cm_cs_id: consId,
      cm_su_id: support.su_id,
      cm_round: +round,
      cm_url: reqFile.location,
      cm_key: reqFile.key,
      cm_type: reqFile.mimetype,
      cm_category: category,
    });
  }
  result = await ConsMedia.bulkCreate(params); //updateOnDuplicate: ["name"]

  return result;
};

const deleteConsMediaByConsAndMediaId = async (consId, cm_id) => {
  const media = await getConsMediaByConsAndMediaId(consId, cm_id);
  if (!media.length) {
    throw new ApiError(httpStatus.BAD_REQUEST, "cons media not found");
  }
  const result = media.reduce(
    (acc, { dataValues: { cm_key, cm_id } }) => {
      acc.keyList.push({ Key: cm_key });
      acc.idList.push(cm_id);
      return acc;
    },
    { keyList: [], idList: [] }
  );

  const notUsed = await IsNotUsedImages(result.idList);
  if (notUsed.count) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `cons media item ${cm_id} exist using at another table`
    );
  }
  await ConsMedia.destroy({ where: { cm_id: result.idList } });
  await s3.deleteObjs(result.keyList);
};

const IsNotUsedImages = async (cm_ids) => {
  const query =
    "SELECT count(*) count FROM r3_risk_factors f3 LEFT JOIN r3_best_practices b3 ON b3.b3_cm_id = f3.f3_cm_id LEFT JOIN r5 ON r5.r5_cm_id = f3.f3_cm_id WHERE f3.f3_cm_id IN :cm_ids OR b3.b3_cm_id IN :cm_ids OR r5.r5_cm_id IN :cm_ids";
  const result = await db.sequelize.query(query, {
    replacements: { cm_ids: [cm_ids] },
    type: QueryTypes.SELECT,
  });
  return result[0];
};

module.exports = {
  getConsMediaById,
  getConsMediaByConsId,
  getConsReportMediaByConsAndReportId,
  createConsMediaByConsId,
  deleteConsMediaByConsAndMediaId,
};
