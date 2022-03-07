const httpStatus = require("http-status");
// const pick = require('../utils/pick');
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { MEDIA_TYPE } = require("../enums/consMedia.enum");
const { consMediaService } = require("../services");

// photo
const getConsMedia = catchAsync(async (req, res) => {
  // 현장 사진일경우엔 반환 데이터가 1개 이하이므로 map 형태로 반환
  const { cm_category } = req.query;
  const result = await consMediaService.getConsMediaByConsId(
    req.params.consId,
    req.query
  );
  // res.send(cm_category == MEDIA_TYPE.현장_사진 ? result[0] : result);
  res.send(result);
});

const createConsMedia = catchAsync(async (req, res) => {
  const { round } = req.query;
  const result = await consMediaService.createConsMediaByConsId(
    req.params.consId,
    req.files,
    req.body.cm_category,
    round
  );
  res.send(result);
});

const deleteConsMedia = catchAsync(async (req, res) => {
  await consMediaService.deleteConsMediaByConsAndMediaId(
    req.params.consId,
    req.body.cm_id.split("|")
  );
  res.sendStatus(httpStatus.NO_CONTENT);
});

module.exports = {
  getConsMedia,
  createConsMedia,
  deleteConsMedia,
};
