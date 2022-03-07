const httpStatus = require("http-status");
const { AgencyRiskFactors, Process } = require("../models");
const ApiError = require("../utils/ApiError");
const { Op, Sequelize } = require("sequelize");
const {
  isConsonantAll,
  getConsonantFilter,
  getConsonantFilterByList,
} = require("../utils/hangul");

const getAgencyRiskFactors = async (agencyId, greater_than) => {
  const result = greater_than
    ? await AgencyRiskFactors.findAll({
        where: {
          ar_ag_id: agencyId,
          ar_updated_at: { [Op.gt]: greater_than },
        },
      })
    : await AgencyRiskFactors.findAll({ where: { ar_ag_id: agencyId } });
  return result;
};

const getAgencyRiskFactorById = async (agencyId, agencyRiskFactorId) => {
  //console.log(agencyId, agencyRiskFactorId)
  const result = await AgencyRiskFactors.findOne({
    where: { ar_ag_id: agencyId, ar_id: agencyRiskFactorId },
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Agency risk factors not found");
  }
  return result;
};

const createAgencyRiskFactor = async (agencyId, reqBody) => {
  reqBody["ar_ag_id"] = agencyId;
  return AgencyRiskFactors.create(reqBody);
};

const bulkCreateAgencyRiskFactor = async (reqBody) => {
  return AgencyRiskFactors.bulkCreate(reqBody);
};

const updateAgencyRiskFactor = async (
  agencyId,
  agencyRiskFactorId,
  reqBody
) => {
  const result = await getAgencyRiskFactorById(agencyId, agencyRiskFactorId);
  return await result.update(reqBody);
};

const deleteAgencyRiskFactorById = async (agencyId, agencyRiskFactorId) => {
  const result = await getAgencyRiskFactorById(agencyId, agencyRiskFactorId);
  await result.destroy();
};

const getAgencyRiskFactorElementByElement = async (
  agencyId,
  element,
  distinct
) => {
  let attributes = {};
  const condition = {
    ar_ag_id: agencyId,
  };
  if (!isConsonantAll(element) && element) {
    condition["ar_element"] = { [Op.like]: `%${element}%` };
  }

  if (![undefined, false].includes(distinct)) {
    attributes["attributes"] = [
      [Sequelize.fn("DISTINCT", Sequelize.col("ar_element")), "ar_element"],
    ];
  }

  let result = await AgencyRiskFactors.findAll({
    where: condition,
    ...attributes,
  });
  result = getConsonantFilter(result, "ar_element", element);
  if (![undefined, false].includes(distinct)) {
    result = result.map((item) => item.ar_element);
  }
  return result;
};

const getAgencyRiskFactorElementByMatchingElement = async (
  agencyId,
  element
) => {
  const condition = {
    ar_ag_id: agencyId,
  };
  if (!isConsonantAll(element) && element) {
    condition["ar_element"] = element;
  }

  const result = await AgencyRiskFactors.findAll({ where: condition });
  return getConsonantFilter(result, "ar_element", element);
};

const getAgencyRiskFactorByFactor = async (agencyId, element, factor) => {
  const condition = {
    ar_ag_id: agencyId,
    ar_element: element,
  };
  if (!isConsonantAll(factor) && factor) {
    condition["ar_factor"] = { [Op.like]: `%${factor}%` };
  }
  const result = await AgencyRiskFactors.findAll({
    where: condition,
    attributes: ["ar_id", "ar_factor"],
  });
  return getConsonantFilter(result, "ar_factor", factor);
};

const getAgencyRiskElementFactorById = async (agencyId, element, factor) => {
  const result = await AgencyRiskFactors.findAll({
    where: { ar_ag_id: agencyId, ar_element: element, ar_factor: factor },
    attributes: [
      "ar_id",
      "ar_element_factor",
      "ar_hazardous_type",
      "ar_rule",
      "ar_measures",
      "ar_measures_detail",
    ],
  });
  return result;
};

const getAgencyRiskMeasuresById = async (agencyId, measures) => {
  const condition = { ar_ag_id: agencyId };
  if (!isConsonantAll(measures) && measures) {
    condition["ar_measures"] = { [Op.like]: "%" + measures + "%" };
  }
  let result = await AgencyRiskFactors.findAll({
    where: condition,
    attributes: [
      [Sequelize.fn("DISTINCT", Sequelize.col("ar_measures")), "ar_measures"],
    ],
  });
  result = getConsonantFilter(result, "ar_measures", measures);
  return result.map((item) => item.ar_measures);
};

const getAgencyRiskMeasuresDetailById = async (
  agencyId,
  measures,
  measuresDetail
) => {
  const condition = {
    ar_ag_id: agencyId,
    ar_measures: measures,
  };

  if (!isConsonantAll(measuresDetail) && measuresDetail) {
    condition["ar_measures_detail"] = { [Op.like]: "%" + measuresDetail + "%" };
  }
  let result = await AgencyRiskFactors.findAll({
    where: condition,
    attributes: [
      [
        Sequelize.fn("DISTINCT", Sequelize.col("ar_measures_detail")),
        "ar_measures_detail",
      ],
    ],
  });
  result = result.map((item) => {
    return item.ar_measures_detail.split(";");
  });
  result = getConsonantFilterByList(
    result,
    "ar_measures_detail",
    measuresDetail
  );
  // return result.map(item => item.ar_measures_detail);
  return result;
};

const getAgencyRiskMeasuresDetailAndRule = async (agencyId, measures) => {
  const result = await AgencyRiskFactors.findAll({
    where: {
      ar_ag_id: agencyId,
      ar_measures: measures,
    },
    attributes: [
      ["ar_measures_detail", "ar_measures_detail"],
      ["ar_rule", "ar_rule"],
    ],
    group: ["ar_measures_detail", "ar_rule"], // 중복 제거
  });
  return result;
};

module.exports = {
  getAgencyRiskFactorById,
  getAgencyRiskFactors,
  createAgencyRiskFactor,
  bulkCreateAgencyRiskFactor,
  updateAgencyRiskFactor,
  deleteAgencyRiskFactorById,
  getAgencyRiskFactorElementByElement,
  getAgencyRiskFactorElementByMatchingElement,
  getAgencyRiskFactorByFactor,
  getAgencyRiskElementFactorById,
  getAgencyRiskMeasuresById,
  getAgencyRiskMeasuresDetailById,
  getAgencyRiskMeasuresDetailAndRule,
};
