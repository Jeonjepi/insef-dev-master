const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Agency } = require('../models');
const db = require("../models");
const {QueryTypes, Op} = require("sequelize");
const consRiskFactorsService = require("./consRiskFactors.service");
const agencyRiskFactorsService = require("./agencyRiskFactors.service");
const {isConsonantAll, getConsonantFilter} = require("../utils/hangul");

const getAgencies = async (greater_than, query) => {
    const params = {};
    if (greater_than) {
        params['ag_updated_at'] = {[Op.gte]: greater_than};
    }
    if (query) {
        params['ag_name'] = {[Op.like]: `%${query}%`};
    }
    const result = await Agency.findAll(isConsonantAll(query) ? {} : {where: params});
    return getConsonantFilter(result, 'ag_name', query);
};

const getAgencyById = async (agencyId) => {
    const result = await Agency.findOne({where: {ag_id: agencyId}});
    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, 'agency not found');
    }
    return result;
};

const getAgencyByConsId = async(consId) => {
    const query = 'SELECT * FROM agency ag, cons_company cc, cons, cons cs WHERE ag.ag_id = cc.cc_ag_id AND cc.cc_id = cs.cs_cc_id AND cs.cs_id = :consId';
    const result = await db.sequelize.query(query, {
        replacements: {consId},
        type: QueryTypes.SELECT});
    if (!result.length){
        throw new ApiError(httpStatus.NOT_FOUND, 'agency not found by cons id');
    }
    return result[0];
}

const createAgency = async (reqBody, reqFile) => {
    const agency = await Agency.create({ag_regist_photo: reqFile?.location,...reqBody});

    // TODO cons risk factor 전부 넣기.
    const riskParams = [];
    let consRiskFactor = await consRiskFactorsService.getConsRiskFactors();
    for (let riskFactor of consRiskFactor) {
        riskFactor = riskFactor.dataValues;
        const params = {
            ar_ag_id: agency.ag_id,
            ar_type: riskFactor.fk_type,
            ar_rule: riskFactor.fk_rule,
            ar_photo: riskFactor.fk_photo,
            ar_element: riskFactor.fk_element,
            ar_factor: riskFactor.fk_factor,
            ar_element_factor: riskFactor.fk_element_factor,
            ar_disaster_type: riskFactor.fk_disaster_type,
            ar_hazardous_type: riskFactor.fk_hazardous_type,
            ar_measures: riskFactor.fk_measures,
            ar_measures_detail: riskFactor.fk_measures_detail,
        };
        riskParams.push(params);
    }
    await agencyRiskFactorsService.bulkCreateAgencyRiskFactor(riskParams);

    // TODO machine 전부 넣기.
    const machineParams = [];
    let machines = await machineService.getMachines();
    for (let machine of machines) {
        machine = machine.dataValues;
        const params = {
            am_ag_id: agency.ag_id,
            am_name: machine.mc_name,
        };
        machineParams.push(params);
    }
    await agencyMachineService.bulkCreateAgencyMachine(machineParams);

    // TODO disaster_type 전부 넣기.
    const disasterTypeParams = [];
    let disasterTypes = await disasterTypeService.getDisasterType();
    for (let disasterType of disasterTypes) {
        disasterType = disasterType.dataValues;
        const params = {
            ad_ag_id: agency.ag_id,
            ad_name: disasterType.dt_name,
        };
        disasterTypeParams.push(params);
    }
    await agencyDisasterTypeService.bulkCreateAgencyDisasterType(disasterTypeParams);

    return agency;
};

// const createAgency = async (reqBody, reqFile) => {
//     const agency = await Agency.create({ag_regist_photo: reqFile?.location,...reqBody});
//
//     let cons_risk_factor_ids = await getAgencies();
//     cons_risk_factor_ids = cons_risk_factor_ids.map(item => item.ag_id);
//     cons_risk_factor_ids.map(async agency => {
//         // TODO cons risk factor 전부 넣기.
//         const riskParams = [];
//         let consRiskFactor = await consRiskFactorsService.getConsRiskFactors();
//         for (let riskFactor of consRiskFactor) {
//             riskFactor = riskFactor.dataValues;
//             const params = {
//                 ar_ag_id: agency,
//                 ar_type: riskFactor.fk_type,
//                 ar_rule: riskFactor.fk_rule,
//                 ar_photo: riskFactor.fk_photo,
//                 ar_element: riskFactor.fk_element,
//                 ar_factor: riskFactor.fk_factor,
//                 ar_element_factor: riskFactor.fk_element_factor,
//                 ar_disaster_type: riskFactor.fk_disaster_type,
//                 ar_hazardous_type: riskFactor.fk_hazardous_type,
//                 ar_measures: riskFactor.fk_measures,
//                 ar_measures_detail: riskFactor.fk_measures_detail,
//             };
//             riskParams.push(params);
//         }
//         await agencyRiskFactorsService.bulkCreateAgencyRiskFactor(riskParams);

        // // TODO machine 전부 넣기.
        // const machineParams = [];
        // let machines = await machineService.getMachines();
        // for (let machine of machines) {
        //     machine = machine.dataValues;
        //     const params = {
        //         am_ag_id: agency.ag_id,
        //         am_name: machine.mc_name,
        //     };
        //     machineParams.push(params);
        // }
        // await agencyMachineService.bulkCreateAgencyMachine(machineParams);
        //
        // // TODO disaster_type 전부 넣기.
        // const disasterTypeParams = [];
        // let disasterTypes = await disasterTypeService.getDisasterType();
        // for (let disasterType of disasterTypes) {
        //     disasterType = disasterType.dataValues;
        //     const params = {
        //         ad_ag_id: agency.ag_id,
        //         ad_name: disasterType.dt_name,
        //     };
        //     disasterTypeParams.push(params);
        // }
        // await agencyDisasterTypeService.bulkCreateAgencyDisasterType(disasterTypeParams);
//     })
//
//     return agency;
// };

// const createAgencyWithToken = async (registerAgencyToken, reqBody, reqFile) => {
//     let registerAgencyTokenDoc;
//     try{
//         registerAgencyTokenDoc = await tokenService.verifyToken(registerAgencyToken, tokenTypes.REGISTER_AGENCY);
//     }catch (e) {
//         throw new ApiError(httpStatus.UNAUTHORIZED, e.toString());
//     }
//     const result = await createAgency(reqBody, reqFile);
//     await Token.destroy({where: { tk_ag_id: registerAgencyTokenDoc.tk_ag_id, tk_type: tokenTypes.REGISTER_AGENCY }});
//     return result;
// };

const updateAgencyById = async (agencyId, reqBody, reqFile) => {
    reqBody.agencyId = agencyId;
    const result = await getAgencyById(agencyId);
    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, 'agency not found');
    }
    const result1 =  reqFile ? await result.update({ag_regist_photo:reqFile?.location ,...reqBody}) : await result.update(reqBody);
    return result1;
};

const deleteAgencyById = async (agencyId) => {
    const result = await getAgencyById(agencyId);
    await result.destroy();
};

module.exports = {
    getAgencies,
    getAgencyById,
    getAgencyByConsId,
    createAgency,
    updateAgencyById,
    deleteAgencyById,
};
