const Joi = require('joi');

const getMachines = {
    params: Joi.object().keys({
        agencyId: Joi.string().required(),
    }),
};

const getMachineById = {
    params: Joi.object().keys({
        agencyId: Joi.string().required(),
        agencyMachineId: Joi.string().required(),
    }),
};

const createMachine = {
    params: Joi.object().keys({
        agencyId: Joi.string().required(),
    }),
    body: Joi.object().keys({
        am_name: Joi.string().required(),
    }),
};

const deleteMachineById = {
    params: Joi.object().keys({
        agencyId: Joi.string().required(),
        agencyMachineId: Joi.string().required(),
    }),
};

module.exports = {
    getMachines,
    getMachineById,
    createMachine,
    deleteMachineById,
};
