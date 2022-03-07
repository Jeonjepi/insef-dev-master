const httpStatus = require("http-status");
const { AgencyDisasterType } = require("../models");
const ApiError = require("../utils/ApiError");
const { Op } = require("sequelize");
const { getConsonantFilter, isConsonantAll } = require("../utils/hangul");

const getAgencyDisasterType = async (agencyId, name, fields) => {
  const condition = {
    ad_ag_id: agencyId,
  };
  if (!isConsonantAll(name) && name) {
    condition["ad_name"] = { [Op.like]: `%${name}%` };
  }
  let result = await AgencyDisasterType.findAll({
    where: condition,
    attributes: fields.split(","),
  });
  result = getConsonantFilter(result, "ad_name", name);
  return result.map((item) => item.ad_name);
};

const getAgencyDisasterTypeById = async (agencyId, agencyDisasterTypeId) => {
  const result = await AgencyDisasterType.findOne({
    where: { ad_ag_id: agencyId, ad_id: agencyDisasterTypeId },
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Agency risk factors not found");
  }
  return result;
};

const createAgencyDisasterType = async (agencyId, reqBody) => {
  reqBody["ad_ag_id"] = agencyId;
  return AgencyDisasterType.create(reqBody);
};

const bulkCreateAgencyDisasterType = async (reqBody) => {
  return AgencyDisasterType.bulkCreate(reqBody);
};

const updateAgencyDisasterType = async (
  agencyId,
  agencyDisasterTypeId,
  reqBody
) => {
  const result = await getAgencyDisasterTypeById(
    agencyId,
    agencyDisasterTypeId
  );
  //console.log(reqBody)
  return await result.update(reqBody);
};

const deleteAgencyDisasterTypeById = async (agencyId, agencyDisasterTypeId) => {
  const result = await getAgencyDisasterTypeById(
    agencyId,
    agencyDisasterTypeId
  );
  await result.destroy();
};

module.exports = {
  getAgencyDisasterTypeById,
  getAgencyDisasterType,
  createAgencyDisasterType,
  bulkCreateAgencyDisasterType,
  updateAgencyDisasterType,
  deleteAgencyDisasterTypeById,
};
