const Joi = require('joi');
const {MEDIA_TYPE, MEDIA_TYPE_VALUES} = require("../enums/consMedia.enum");

const getConsMedia = {
    query: Joi.object().keys({
        cm_category: Joi.string(),
        cm_round: Joi.string(),
        greater_than: Joi.string(),
    }),
    params: Joi.object().keys({
        consId: Joi.number().required(),
    }),
};

const createConsMedia = {
    params: Joi.object().keys({
        consId: Joi.number().required(),
    }),
    body: Joi.object().keys({
        cm_category: Joi.string().required().valid(...MEDIA_TYPE_VALUES),
        cm_round: Joi.string(),
    }),
    file: Joi.object().keys({
        cm_media : Joi.array().required(),
    })
};

const deleteConsMedia = {
    params: Joi.object().keys({
        consId: Joi.number().required(),
    }),
    body: Joi.object().keys({
        cm_id: Joi.string().required(),
    }),
};

module.exports = {
    getConsMedia,
    deleteConsMedia,
    createConsMedia,
}
