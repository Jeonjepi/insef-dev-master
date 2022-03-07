const Joi = require('joi');

const getCons = {
    query: Joi.object().keys({
        filterBy: Joi.string(),
        filterValue: Joi.string(),
        sortBy:Joi.string(),
        page: Joi.number(),
        limit: Joi.number(),
    }),
    body: Joi.object().keys({
        ag_id: Joi.number(),
        cc_id: Joi.number(),
    })
};

const createCons = {
    body: Joi.object().keys({
        cs_cc_id: Joi.number().required(),
        cs_pi_id: Joi.number().required(),
        cs_manage_us_id: Joi.number(),
        cs_agent_us_id: Joi.number(),
        cs_name: Joi.string().required(),
        cs_type: Joi.string().required(),
        cs_management_num: Joi.string().required(),
        cs_post_num: Joi.string().required(),
        cs_start_round: Joi.number(),
        cs_jurisdiction: Joi.string().required(),
        cs_headquarters: Joi.string().required(),
        cs_price: Joi.string().required(),
        cs_total_price: Joi.string().required(),
        cs_address: Joi.string().required(),
        cs_tel: Joi.string().required(),
        cs_orderer: Joi.string().required(),
        cs_round: Joi.string().required(),
        cs_started_at: Joi.string().required(),
        cs_ended_at: Joi.string().required(),
    }),
};

const getConsById = {
    params: Joi.object().keys({
        consId: Joi.number().required(),
    }),
};

const updateCons = {
    params: Joi.object().keys({
        consId: Joi.number().required(),
    }),
    body: Joi.object().keys({
        cs_pi_id: Joi.number(),
        cs_manage_us_id: Joi.number(),
        cs_agent_us_id: Joi.number(),
        cs_name: Joi.string(),
        cs_type: Joi.string(),
        cs_management_num: Joi.string(),
        cs_post_num: Joi.string(),
        cs_jurisdiction: Joi.string(),
        cs_headquarters: Joi.string(),
        cs_price: Joi.string(),
        cs_start_round: Joi.number(),
        cs_total_price: Joi.string(),
        cs_address: Joi.string(),
        cs_tel: Joi.string(),
        cs_orderer: Joi.string(),
        cs_round: Joi.string(),
        cs_start_round: Joi.string(),
        cs_started_at: Joi.string(),
        cs_ended_at: Joi.string(),
    }),
};

const deleteCons = {
    params: Joi.object().keys({
        consId: Joi.number().required(),
    }),
};

const closeConsById = {
    params: Joi.object().keys({
        consId: Joi.number().required(),
    }),
    body: Joi.object().keys({
        cs_close_reason: Joi.string().required(),
    }),
}



module.exports = {
    getCons,
    createCons,
    getConsById,
    updateCons,
    deleteCons,
    closeConsById,
}
