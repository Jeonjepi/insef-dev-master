const Joi = require('joi');

const getProcesses = {
    params: Joi.object().keys({
    }),
};

const getProcess = {
    params: Joi.object().keys({
        processId: Joi.number().required(),
    }),
};

const createProcess = {
    body: Joi.object().keys({
        pr_name: Joi.string().required(),
    }),
};

const updateProcess = {
    params: Joi.object().keys({
        processId: Joi.string().required(),
    }),
    body: Joi.object().keys({
        pr_name: Joi.string(),
    }),
};

const deleteProcess = {
    params: Joi.object().keys({
        processId: Joi.string().required(),
    }),
};

module.exports = {
    getProcesses,
    getProcess,
    createProcess,
    updateProcess,
    deleteProcess,
};
