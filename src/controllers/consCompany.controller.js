const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { consService, consCompanyService } = require('../services/');

const getConsCompanies = catchAsync(async (req, res) => {
    const {ag_id} = req.body;
    const result = ag_id ? await consCompanyService.getConsCompaniesByAgencyId(ag_id) : await consCompanyService.getConsCompanies();
    res.send(result);
});

const getConsCompanyById = catchAsync(async (req, res) => {
    const {consCompanyId} = req.params;
    const consCompany = await consCompanyService.getConsCompanyById(consCompanyId);
    const cons = await consService.getConsByConsCompanyId(consCompanyId);
    res.send({consCompany, cons});
});

const getConsCompaniesByAgencyId = catchAsync(async (req, res) => {
    const {ag_id} = req.body;
    const result = await consCompanyService.getConsCompaniesByAgencyId(ag_id);
    res.send(result);
});

const createConsCompany = catchAsync(async (req, res) => {
    const result = await consCompanyService.createConsCompany(req.body);
    res.send(result);
});

const deleteConsCompanyById = catchAsync(async (req, res) => {
    const {consCompanyId} = req.params;
    await consCompanyService.deleteConsCompanyById(consCompanyId);
    res.sendStatus(httpStatus.NO_CONTENT);
});

const updateConsCompanyById = catchAsync(async (req, res) => {
    const {consCompanyId} = req.params;
    const result = await consCompanyService.updateConsCompanyById(consCompanyId, req.body);
    res.send(result);
});

module.exports = {
    getConsCompanies,
    getConsCompaniesByAgencyId,
    getConsCompanyById,
    createConsCompany,
    deleteConsCompanyById,
    updateConsCompanyById,
};
