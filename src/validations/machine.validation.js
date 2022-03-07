const Joi = require('joi');

const getMachines = {
    body: Joi.object().keys({
    }),
};

const getMachineById = {
    params: Joi.object().keys({
        MachineId: Joi.string().required(),
    }),
};

const createMachine = {
    body: Joi.object().keys({
        mc_name: Joi.string().required(),
    }),
};

const deleteMachineById = {
    params: Joi.object().keys({
        machineId: Joi.string().required(),
    }),
};

module.exports = {
    getMachines,
    getMachineById,
    createMachine,
    deleteMachineById,
};
