const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { consTypeService } = require('../services');

const getConsType = catchAsync(async (req, res) => {
    const result = await consTypeService.getConsType();
    res.send(result);
});

const createConsType = catchAsync(async (req, res) => {
    const result = await consTypeService.createConsType(req.body);
    res.send(result);
});
const deleteConsTypeById = catchAsync(async (req, res) => {
    const {consTypeId} = req.params;
    await consTypeService.deleteConsTypeById(consTypeId);
    res.sendStatus(httpStatus.NO_CONTENT);
});

module.exports = {
    getConsType,
    deleteConsTypeById,
    createConsType
};
