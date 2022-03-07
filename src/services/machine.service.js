const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const { Machine, Agency } = require("../models");
const { Op } = require("sequelize");
const agencyService = require("./agency.service");
const { isConsonantAll, getConsonantFilter } = require("../utils/hangul");

const getMachines = async (greater_than, query) => {
  // mc_updated_at
  // mc_name
  const params = {};
  if (greater_than) {
    params["mc_updated_at"] = { [Op.gte]: greater_than };
  }
  if (query) {
    params["mc_name"] = { [Op.like]: `%${query}%` };
  }
  if (isConsonantAll(query)) {
    delete params["mc_name"];
  }
  const result = await Machine.findAll({ where: params });
  return getConsonantFilter(result, "mc_name", query);
};

const getMachineById = async (machineId) => {
  const result = await Machine.findOne({ where: { mc_id: machineId } });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "machine not found");
  }
  return result;
};

const getMachineByName = async (machineName) => {
  const result = await Machine.findOne({ where: { mc_name: machineName } });
  return result;
};

const createMachine = async (reqBody) => {
  await agencyService.getAgencyById(reqBody.mc_ag_id);
  //console.log(reqBody.mc_ag_id);
  const machine = await getMachineByName(reqBody.mc_name);
  if (machine) {
    return machine;
  }
  return Machine.create(reqBody);
};

const deleteMachineById = async (machineId) => {
  const result = await getMachineById(machineId);
  await result.destroy();
};

const getMachineNamesByids = async (machineIds) => {
  machineIds = machineIds.split(",").map((item) => parseInt(item));

  const result = await Machine.findAll({
    where: { mc_id: { [Op.in]: machineIds } },
  });

  return result.map((item) => item.dataValues.mc_name).join(", ");
};

module.exports = {
  getMachines,
  getMachineById,
  createMachine,
  deleteMachineById,
  getMachineNamesByids,
};
