const Joi = require('joi');


const getConsReportProcess = {
    params: Joi.object().keys({
        consId: Joi.number().required(),
    }),
};

const createConsReport1 = {
    params: Joi.object().keys({
        consId: Joi.number().required(),
    }),
    body: Joi.object().keys({
        r1_round_price: Joi.number().allow('').required(),
        r1_process: Joi.string().allow('').required(),
        r1_cm_id: Joi.string(),
    }),
    file: Joi.object().keys({
        r1_photo: Joi.string(),
    }),
};

const getConsReport1 = {
    params: Joi.object().keys({
        consId: Joi.number().required(),
    }),
};

const getConsReport1ById = {
    params: Joi.object().keys({
        consId: Joi.number().required(),
        reportId: Joi.number().required(),
    }),
};

const updateConsReport1 = {
    params: Joi.object().keys({
        consId: Joi.number().required(),
        reportId: Joi.number().required(),
    }),
    body: Joi.object().keys({
        r1_type: Joi.string().allow(''),
        r1_price: Joi.number().allow(''),
        r1_orderer: Joi.string().allow(''),
        r1_total_price: Joi.number().allow(''),
        r1_round_price: Joi.number().allow(''),
        r1_started_at: Joi.string().allow(''),
        r1_ended_at: Joi.string().allow(''),
        r1_process: Joi.string().allow(''),
        r1_cm_id: Joi.string(),
    }),
};

const createConsReport2 = {
    params: Joi.object().keys({
        consId: Joi.number().required(),
    }),
    body: Joi.object().keys({
        r2_ct_id: Joi.number(),
        r2_support_count: Joi.number().allow(''),
        r2_visited_date: Joi.string().allow(''),
        r2_visited_time: Joi.string().required().allow(''),
        r2_calculated_cost: Joi.number().required().allow(''),
        r2_used_cost: Joi.number().required().allow(''),
        r2_fair_rate: Joi.string().required().allow(''),
        r2_worker_num: Joi.number().required().allow(''),
        r2_machine: Joi.string().required().allow(''),
        r2_work_detail: Joi.string().required().allow(''),
    }),
};

const getConsReport2 = {
    params: Joi.object().keys({
        consId: Joi.number().required(),
    }),
};

const updateConsReport2 = {
    params: Joi.object().keys({
        consId: Joi.number().required(),
    }),
    body: Joi.object().keys({
        r2_ct_id: Joi.number(),
        r2_support_count: Joi.number().allow(''),
        r2_visited_date: Joi.string().allow(''),
        r2_visited_time: Joi.string().allow(''),
        r2_calculated_cost: Joi.number().allow(''),
        r2_used_cost: Joi.number().allow(''),
        r2_fair_rate: Joi.string().allow(''),
        r2_worker_num: Joi.number().allow(''),
        r2_machine: Joi.string().allow(''),
        r2_work_detail: Joi.string().allow(''),
    }),
};

// --
const getConsReport3 = {
    params: Joi.object().keys({
        consId: Joi.number().required(),
    }),
};

const getConsOneReport3RiskFactor = {
    params: Joi.object().keys({
        consId: Joi.number().required(),
        riskFactorId: Joi.number().required(),
    }),
};

const createConsReport3RiskFactor = {
    params: Joi.object().keys({
        consId: Joi.number().required(),
    }),
    body: Joi.object().keys({
        f3_us_id: Joi.number(),
        f3_cm_id: Joi.number(),
        f3_title: Joi.string().allow(''),
        f3_type: Joi.string().allow(''),
        f3_rule: Joi.string().allow(''),
        f3_element: Joi.string().required().allow(''),
        f3_factor: Joi.string().required().allow(''),
        f3_element_factor: Joi.string().required().allow(''),
        f3_disaster_type: Joi.string().required().allow(''),
        f3_hazardous_type: Joi.string().required().allow(''),
        f3_measures: Joi.string().required().allow(''),
        f3_measures_detail: Joi.string().required().allow(''),
        f3_etc: Joi.string().allow(''),
    }),
};

const updateConsReport3RiskFactor = {
    params: Joi.object().keys({
        consId: Joi.number().required(),
        riskFactorId: Joi.number().required(),
    }),
    body: Joi.object().keys({
        f3_cm_id: Joi.number(),
        f3_title: Joi.string().allow(''),
        f3_type: Joi.string().allow(''),
        f3_rule: Joi.string().allow(''),
        f3_element: Joi.string().required().allow(''),
        f3_factor: Joi.string().required().allow(''),
        f3_element_factor: Joi.string().required().allow(''),
        f3_disaster_type: Joi.string().required().allow(''),
        f3_hazardous_type: Joi.string().required().allow(''),
        f3_measures: Joi.string().required().allow(''),
        f3_measures_detail: Joi.string().required().allow(''),
        f3_etc: Joi.string().allow(''),
    }),
};

const deleteConsReport3RiskFactor = {
    params: Joi.object().keys({
        consId: Joi.number().required(),
    }),
    body: Joi.object().keys({
        f3_id:Joi.string(),
    }),
};

const getConsOneReport3BestPractice = {
    params: Joi.object().keys({
        consId: Joi.number().required(),
        bestPracticeId: Joi.number().required(),
    }),
};

const createConsReport3BestPractice = {
    params: Joi.object().keys({
        consId: Joi.number().required(),
    }),
    body: Joi.object().keys({
        b3_title: Joi.string().required().allow(''),
        b3_content: Joi.string().required().allow(''),
        b3_cm_id: Joi.number(),
        b3_etc: Joi.string().allow(''),
    }),
};

const updateConsReport3BestPractice = {
    params: Joi.object().keys({
        consId: Joi.number().required(),
        bestPracticeId: Joi.number().required(),
    }),
    body: Joi.object().keys({
        b3_title: Joi.string().allow(''),
        b3_content: Joi.string().allow(''),
        b3_cm_id: Joi.number(),
        b3_etc: Joi.string().allow(''),
    }),
};

const addConsReportPhoto = {
    params: Joi.object().keys({
        consId: Joi.number().required(),
        reportId: Joi.number().required(),
    }),
};

const deleteConsReport3BestPractice = {
    params: Joi.object().keys({
        consId: Joi.number().required(),
    }),
    body: Joi.object().keys({
        b3_id: Joi.string().required(),
    })
};

const getConsReport4 = {
    params: Joi.object().keys({
        consId: Joi.number().required(),
    }),
};

const createConsReport4 = {
    params: Joi.object().keys({
        consId: Joi.number().required(),
    }),
    body: Joi.object().keys({
        r4_title: Joi.string().required().allow(''),
        r4_element: Joi.string().required().allow(''),
        r4_factor: Joi.string().required().allow(''),
        r4_disaster_type: Joi.string().required().allow(''),
        r4_hazardous_type: Joi.string().required().allow(''),
        r4_measures: Joi.string().required().allow(''),
        r4_measures_detail: Joi.string().required().allow(''),
    }),
};

const updateConsReport4 = {
    params: Joi.object().keys({
        consId: Joi.number().required(),
        reportId: Joi.number().required(),
    }),
    body: Joi.object().keys({
        r4_title: Joi.string().allow(''),
        r4_element: Joi.string().allow(''),
        r4_factor: Joi.string().allow(''),
        r4_disaster_type: Joi.string().allow(''),
        r4_hazardous_type: Joi.string().allow(''),
        r4_measures: Joi.string().allow(''),
        r4_measures_detail: Joi.string().allow(''),
    }),
};

const deleteConsReport4 = {
    params: Joi.object().keys({
        consId: Joi.number().required(),
    }),
    body: Joi.object().keys({
        r4_id: Joi.string().required()
    }),
};

const getConsReport4ById = {
    params: Joi.object().keys({
        consId: Joi.number().required(),
        reportId: Joi.number().required(),
    }),
    body: Joi.object().keys({

    }),
};
const getConsReport5 = {
    params: Joi.object().keys({
        consId: Joi.number().required(),
    }),
};

const createConsReport5 = {
    params: Joi.object().keys({
        consId: Joi.number().required(),
    }),
    body: Joi.object().keys({
        r5_type: Joi.number().required().allow(''),
        r5_support: Joi.string().required().allow(''),
        r5_detail: Joi.string().required().allow(''),
        r5_cm_id: Joi.number(),
        r5_etc: Joi.string().allow(''),
    }),
};

const updateConsReport5 = {
    params: Joi.object().keys({
        consId: Joi.number().required(),
        reportId: Joi.number().required(),
    }),
    body: Joi.object().keys({
        r5_type: Joi.number().allow(''),
        r5_support: Joi.string().allow(''),
        r5_detail: Joi.string().allow(''),
        r5_cm_id: Joi.number(),
        r5_etc: Joi.string().allow(''),
    }),
};

const deleteConsReport5 = {
    params: Joi.object().keys({
        consId: Joi.number().required(),
    }),
    body: Joi.object().keys({
        r5_id: Joi.string().required()
    }),
};

const getConsReport5ById = {
    params: Joi.object().keys({
        consId: Joi.number().required(),
        reportId: Joi.number().required(),
    }),
};
const getConsReport6 = {
    params: Joi.object().keys({
        consId: Joi.number().required(),
    }),
};

const createConsReport6 = {
    params: Joi.object().keys({
        consId: Joi.number().required(),
    }),
    body: Joi.object().keys({
        r6_point_out: Joi.string().required().allow(''),
        r6_implementation: Joi.string().required().allow(''),
        r6_etc: Joi.string().allow(''),
    }),
};

const updateConsReport6 = {
    params: Joi.object().keys({
        consId: Joi.number().required(),
        reportId: Joi.number().required(),
    }),
    body: Joi.object().keys({
        r6_point_out: Joi.string().allow(''),
        r6_implementation: Joi.string().allow(''),
        r6_cm_id: Joi.string(),
        r6_etc: Joi.string().allow(''),
    }),
};

const deleteConsReport6 = {
    params: Joi.object().keys({
        consId: Joi.number().required(),
    }),
    body: Joi.object().keys({
        r6_id: Joi.string().required()
    }),
};

const getConsReport6ById = {
    params: Joi.object().keys({
        consId: Joi.number().required(),
        reportId: Joi.number().required(),
    }),
};
const getConsReport7 = {
    params: Joi.object().keys({
        consId: Joi.number().required(),
    }),
};

const createConsReport7 = {
    params: Joi.object().keys({
        consId: Joi.number().required(),
    }),
    body: Joi.object().keys({
        r7_used_substance: Joi.string().required().allow(''),
        r7_has_education: Joi.string().required().allow(''),
        r7_is_attached: Joi.string().required().allow(''),
        r7_improve_measures: Joi.string().required().allow(''),
    }),
};

const updateConsReport7 = {
    params: Joi.object().keys({
        consId: Joi.number().required(),
        reportId: Joi.number().required(),
    }),
    body: Joi.object().keys({
        r7_used_substance: Joi.string().allow(''),
        r7_has_education: Joi.string().allow(''),
        r7_is_attached: Joi.string().allow(''),
        r7_improve_measures: Joi.string().allow(''),
    }),
};

const deleteConsReport7 = {
    params: Joi.object().keys({
        consId: Joi.number().required(),
    }),
    body: Joi.object().keys({
        r7_id: Joi.string().required()
    }),
};

const getConsReport7ById = {
    params: Joi.object().keys({
        consId: Joi.number().required(),
    }),
};

const getConsReport8 = {
    params: Joi.object().keys({
        consId: Joi.number().required(),
    }),
};

const createConsReport8 = {
    params: Joi.object().keys({
        consId: Joi.number().required(),
    }),
    body: Joi.object().keys({
        r8_re_id: Joi.number().required(),
    }),
};

const deleteConsReport8 = {
    params: Joi.object().keys({
        consId: Joi.number().required(),
    }),
};

const getConsReport8ById = {
    params: Joi.object().keys({
        consId: Joi.number().required(),
    }),
};

const assignCheckSign = {
    params: Joi.object().keys({
        consId: Joi.number().required(),
    }),
    body: Joi.object().keys({
        r8_checker_name: Joi.string().required(),
        r8_checker_sign_image: Joi.string().required(),
    }),

}

const assignManagerSign = {
    params: Joi.object().keys({
        consId: Joi.number().required(),
    }),
    body: Joi.object().keys({
        r8_manager_name: Joi.string().required(),
        r8_manager_sign_tel: Joi.string().required(),
        r8_manager_sign_image: Joi.string().required(),
    }),
}

// r8_cr_id: Joi.number().required(),

module.exports = {
    getConsReport1,
    getConsReport1ById,
    createConsReport1,
    updateConsReport1,
    getConsReport2,
    createConsReport2,
    updateConsReport2,
    getConsReport3,
    getConsOneReport3RiskFactor,
    createConsReport3RiskFactor,
    updateConsReport3RiskFactor,
    deleteConsReport3RiskFactor,
    getConsOneReport3BestPractice,
    createConsReport3BestPractice,
    updateConsReport3BestPractice,
    deleteConsReport3BestPractice,
    addConsReportPhoto,
    getConsReport4,
    getConsReport4ById,
    createConsReport4,
    updateConsReport4,
    deleteConsReport4,
    getConsReport5,
    getConsReport5ById,
    createConsReport5,
    updateConsReport5,
    deleteConsReport5,
    getConsReport6,
    getConsReport6ById,
    createConsReport6,
    updateConsReport6,
    deleteConsReport6,
    getConsReport7,
    getConsReport7ById,
    createConsReport7,
    updateConsReport7,
    deleteConsReport7,
    getConsReport8,
    createConsReport8,
    deleteConsReport8,
    assignCheckSign,
    assignManagerSign,
}
