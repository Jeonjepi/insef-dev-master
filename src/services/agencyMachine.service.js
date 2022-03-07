const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const { AgencyMachine } = require("../models");
const { Op } = require("sequelize");

const getAgencyMachines = async (agencyId, greater_than, query) => {
  const condition = { am_ag_id: agencyId };
  if (query) condition["am_name"] = { [Op.like]: "%" + query + "%" };
  if (greater_than) condition["am_updated_at"] = { [Op.gt]: greater_than };
  //console.log(condition);
  const result = await AgencyMachine.findAll({ where: condition });
  return result;
};

const getAgencyMachineById = async (agencyMachineId) => {
  const result = await AgencyMachine.findOne({
    where: { am_id: agencyMachineId },
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "machine not found");
  }
  return result;
};

const getAgencyMachineByIdAndMachineId = async (agencyId, agencyMachineId) => {
  const result = await AgencyMachine.findOne({
    where: { am_id: agencyMachineId, am_ag_id: agencyId },
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "machine not found");
  }
  return result;
};

const getAgencyMachineByName = async (machineName) => {
  const result = await AgencyMachine.findOne({
    where: { am_name: machineName },
  });
  return result;
};

const createAgencyMachine = async (agencyId, reqBody) => {
  reqBody["am_ag_id"] = agencyId;
  //console.log(reqBody);
  return AgencyMachine.create(reqBody);
};

const bulkCreateAgencyMachine = async (reqBody) => {
  return AgencyMachine.bulkCreate(reqBody);
};

const deleteAgencyMachineById = async (agencyId, agencyMachineId) => {
  const result = await getAgencyMachineByIdAndMachineId(
    agencyId,
    agencyMachineId
  );
  await result.destroy();
};

const getAgencyMachineNamesByids = async (agencyMachineIds) => {
  agencyMachineIds = agencyMachineIds.split(",").map((item) => parseInt(item));

  const result = await AgencyMachine.findAll({
    where: { am_id: { [Op.in]: agencyMachineIds } },
  });

  return result.map((item) => item.dataValues.am_name).join(", ");
};

module.exports = {
  getAgencyMachines,
  getAgencyMachineById,
  createAgencyMachine,
  bulkCreateAgencyMachine,
  deleteAgencyMachineById,
  getAgencyMachineNamesByids,
};
