const httpStatus = require("http-status");
// const pick = require('../utils/pick');
const catchAsync = require("../utils/catchAsync");
const consService = require("../services/cons.service");
const { MEDIA_TYPE } = require("../enums/consMedia.enum");
const { consMediaService, reportService } = require("../services");
const { BAD_REQUEST } = require("http-status");
const ApiError = require("../utils/ApiError");

const getConsReportProcess = catchAsync(async (req, res) => {
  const result = await reportService.getConsReportProcess(req.params.consId);
  res.send(result);
});

const createConsReport = catchAsync(async (req, res) => {
  const { round } = req.query;
  const report = await reportService.createConsReportByConsId(
    req.params.consId,
    round
  );
  res.send(report);
});

// report
// 1
const createConsReport1 = catchAsync(async (req, res) => {
  const { round } = req.query;
  const result = await reportService.createConsReport1ByConsId(
    req.params.consId,
    round,
    req.body,
    req.file
  );
  const consReqBody = {
    cs_type: req.body.r1_type,
    cs_price: req.body.r1_price,
    cs_orderer: req.body.r1_orderer,
    cs_total_price: req.body.r1_total_price,
    cs_started_at: req.body.r1_started_at,
    cs_ended_at: req.body.r1_ended_at,
  };
  // cs_type, cs_price, cs_orderer, cs_total_price, cs_started_at, cs_ended_at
  const cons = consService.updateConsById(req.params.consId, consReqBody);
  res.send(result);
});

const getConsReport1 = catchAsync(async (req, res) => {
  const { round } = req.query;
  const names = await consService.getConsNameAndAgencyNameById(
    req.params.consId
  );
  const result = await reportService.getConsReport1ByConsId(
    req.params.consId,
    round
  );

  const resultPhoto = await reportService.getConsReport1ByConsIdPhoto(
    req.params.consId,
    round
  )
  res.send({ ...names, result, resultPhoto});
});

const getConsOneReport1 = catchAsync(async (req, res) => {
  const { round } = req.query;
  const result = await reportService.getConsReport1ByConsAndR1Id(
    req.params.consId,
    round,
    req.params.reportId
  );
  res.send(result);
});

const updateConsReport1 = catchAsync(async (req, res) => {
  const { round } = req.query;
  const result = await reportService.updateConsReport1ByConsAndR1Id(
    req.params.consId,
		round,
    req.params.reportId,
    req.body,
		req.files
  );
  res.send(result);
});

// 2
const createConsReport2 = catchAsync(async (req, res) => {
  const { round } = req.query;
  //console.log(round);
  const result = await reportService.createConsReport2ByConsId(
    req.params.consId,
    round,
    req.body
  );
  res.send(result);
});

const getConsReport2 = catchAsync(async (req, res) => {
  const { round } = req.query;
  const names = await consService.getConsNameAndAgencyNameById(
    req.params.consId
  );
  const result = await reportService.getConsReport2ByConsId(
    req.params.consId,
    round
  );
  res.send({ ...names, ...result.dataValues });
});

const updateConsReport2 = catchAsync(async (req, res) => {
  const { round } = req.query;
  const result = await reportService.updateConsReport2ByConsId(
    req.params.consId,
    round,
    req.body
  );
  res.send(result);
});

// 3
const getConsReport3 = catchAsync(async (req, res) => {
  const { round } = req.query;
  const names = await consService.getConsNameAndAgencyNameById(
    req.params.consId
  );
  const result = await reportService.getConsReport3ByConsId(
    req.params.consId,
    round
  );
  res.send({ ...names, result });
});

const getConsOneReport3RiskFactor = catchAsync(async (req, res) => {
  const { round } = req.query;
  const report =
    await reportService.getConsReport3RiskFactorByConsAndRiskFactorId(
      req.params.consId,
      round,
      req.params.riskFactorId
    );
  res.send(report);
});

const getConsOneReport3BestPractice = catchAsync(async (req, res) => {
  const { round } = req.query;
  const report =
    await reportService.getConsReport3BestPracticeByConsAndBestPracticeId(
      req.params.consId,
      round,
      req.params.bestPracticeId
    );
  res.send(report);
});

const createConsReport3RiskFactor = catchAsync(async (req, res) => {
  const { round } = req.query;

  const r3 = await reportService.createConsReport3RiskFactorByConsId(
    req.params.consId,
    round,
    req.body,
    req.files
  );
  res.send(r3);
});

const createConsReport3BestPractice = catchAsync(async (req, res) => {
  const { round } = req.query;
  const r3 = await reportService.createConsReport3BestPracticeByConsId(
    req.params.consId,
    round,
    req.body,
    req.files
  );
  res.send(r3);
});

const updateConsReport3RiskFactor = catchAsync(async (req, res) => {
  const { round } = req.query;

  const result =
    await reportService.updateConsReport3RiskFactorByConsAndRiskFactorId(
      req.params.consId,
      round,
      req.params.riskFactorId,
      req.body,
      req.files
    );
  res.send(result);
});

const updateConsReport3BestPractice = catchAsync(async (req, res) => {
  const { round } = req.query;
  const result =
    await reportService.updateConsReport3BestPracticeByConsAndRiskFactorId(
      req.params.consId,
      round,
      req.params.bestPracticeId,
      req.body,
      req.files
    );
  res.send(result);
});

const deleteConsReport3RiskFactor = catchAsync(async (req, res) => {
  await reportService.deleteConsReport3RiskFactorByConsAndRiskFactorId(
    req.params.consId,
    req.body.f3_id
  );
  // TODO report에 연결된 이미지들도 모두 삭제
  res.sendStatus(httpStatus.NO_CONTENT);
});

const deleteConsReport3BestPractice = catchAsync(async (req, res) => {
  await reportService.deleteConsReport3BestPracticeByConsAndBestPracticeId(
    req.body.b3_id
  );
  // TODO report에 연결된 이미지들도 모두 삭제//
  res.sendStatus(httpStatus.NO_CONTENT);
});

const addConsReportPhoto = catchAsync(async (req, res) => {
  const { round } = req.query;
  const media = await consMediaService.createConsMediaByConsId(
    req.params.consId,
    req.files,
    MEDIA_TYPE.위험_요인,
    round
  );
  res.send(media);
});

// 4
const createConsReport4 = catchAsync(async (req, res) => {
  const { round } = req.query;
  const result = await reportService.createConsReport4ByConsId(
    req.params.consId,
    round,
    req.body
  );
  res.send(result);
});

const getConsReport4 = catchAsync(async (req, res) => {
  const { round } = req.query;
  const names = await consService.getConsNameAndAgencyNameById(
    req.params.consId
  );
  const result = await reportService.getConsReport4ByConsId(
    req.params.consId,
    round
  );
  res.send({ ...names, result });
});

const getConsOneReport4 = catchAsync(async (req, res) => {
  const { round } = req.query;
  const result = await reportService.getConsReport4ByConsAndR4Id(
    req.params.consId,
    round,
    req.params.reportId
  );
  res.send(result);
});

const updateConsReport4 = catchAsync(async (req, res) => {
  const { round } = req.query;
  const result = await reportService.updateConsReport4ByConsAndR4Id(
    req.params.consId,
    round,
    req.params.reportId,
    req.body
  );
  res.send(result);
});

const deleteConsReport4 = catchAsync(async (req, res) => {
  const result = await reportService.deleteConsReport4ByConsAndR4Id(
    req.params.consId,
    req.body.r4_id
  );
  res.sendStatus(httpStatus.NO_CONTENT);
});

// 5
const createConsReport5 = catchAsync(async (req, res) => {
  const { round } = req.query;
  if (!round) {
    throw new ApiError(BAD_REQUEST, "round not received");
  }
  const result = await reportService.createConsReport5ByConsId(
    req.params.consId,
    round,
    req.body
  );
  res.send(result);
});

const getConsReport5 = catchAsync(async (req, res) => {
  const { round } = req.query;
  const names = await consService.getConsNameAndAgencyNameById(
    req.params.consId
  );
  const result = await reportService.getConsReport5ByConsId(
    req.params.consId,
    round
  );
  res.send({ ...names, result });
});

const getConsOneReport5 = catchAsync(async (req, res) => {
  const { round } = req.query;
  const result = await reportService.getConsReport5ByConsAndR5Id(
    req.params.consId,
    round,
    req.params.reportId
  );
  res.send(result);
});

const updateConsReport5 = catchAsync(async (req, res) => {
  const { round } = req.query;
  const result = await reportService.updateConsReport5ByConsAndR5Id(
    req.params.consId,
    round,
    req.params.reportId,
    req.body,
    req.files
  );
  res.send(result);
});

const deleteConsReport5 = catchAsync(async (req, res) => {
  // TODO 추가해야됌... round 등등ㄴ
  const result = await reportService.deleteConsReport5ByConsAndR5Id(
    req.params.consId,
    req.body.r5_id
  );
  res.sendStatus(httpStatus.NO_CONTENT);
});

// 6
const createConsReport6 = catchAsync(async (req, res) => {
  const { round } = req.query;
  const result = await reportService.createConsReport6ByConsId(
    req.params.consId,
    round,
    req.body,
    req.files
  );
  res.send(result);
});

const getConsReport6 = catchAsync(async (req, res) => {
  const { round } = req.query;
  const names = await consService.getConsNameAndAgencyNameById(
    req.params.consId
  );
  const result = await reportService.getConsReport6ByConsId(
    req.params.consId,
    round
  );
  res.send({ ...names, result });
});

const getConsOneReport6 = catchAsync(async (req, res) => {
  const { round } = req.query;
  const result = await reportService.getConsReport6ByConsAndR6Id(
    req.params.consId,
    round,
    req.params.reportId
  );
  res.send(result); //
});

const updateConsReport6 = catchAsync(async (req, res) => {
  const { round } = req.query;
  const result = await reportService.updateConsReport6ByConsAndR6Id(
    req.params.consId,
    round,
    req.params.reportId,
    req.body
  );
  res.send(result);
});

const deleteConsReport6 = catchAsync(async (req, res) => {
  const result = await reportService.deleteConsReport6ByConsAndR6Id(
    req.params.consId,
    req.body.r6_id
  );
  res.sendStatus(httpStatus.NO_CONTENT);
});

// 7
const createConsReport7 = catchAsync(async (req, res) => {
  const { round } = req.query;
  const result = await reportService.createConsReport7ByConsId(
    req.params.consId,
    round,
    req.body
  );
  res.send(result);
});

const getConsReport7 = catchAsync(async (req, res) => {
  const { round } = req.query;
  const names = await consService.getConsNameAndAgencyNameById(
    req.params.consId
  );
  const result = await reportService.getConsReport7ByConsId(
    req.params.consId,
    round
  );
  res.send({ ...names, result });
});

const getConsOneReport7 = catchAsync(async (req, res) => {
  const { round } = req.query;
  const result = await reportService.getConsReport7ByConsAndR7Id(
    req.params.consId,
    round,
    req.params.reportId
  );
  res.send(result);
});

const updateConsReport7 = catchAsync(async (req, res) => {
  const { round } = req.query;
  const result = await reportService.updateConsReport7ByConsAndR7Id(
    req.params.consId,
    round,
    req.params.reportId,
    req.body
  );
  res.send(result);
});

const deleteConsReport7 = catchAsync(async (req, res) => {
  const result = await reportService.deleteConsReport7ByConsAndR7Id(
    req.params.consId,
    req.body.r7_id
  );
  res.sendStatus(httpStatus.NO_CONTENT);
});

// 8
const createConsReport8 = catchAsync(async (req, res) => {
  const { round } = req.query;
  const result = await reportService.createConsReport8ByConsId(
    req.params.consId,
    round,
    req.body
  );
  res.send(result);
});

const getConsReport8 = catchAsync(async (req, res) => {
  const { round } = req.query;
  const names = await consService.getConsNameAndAgencyNameById(
    req.params.consId
  );
  const result = await reportService.getConsReport8ByConsId(
    req.params.consId,
    round
  );
  res.send({ ...names, result });
});

const assignCheckSign = catchAsync(async (req, res) => {
  const { round } = req.query;
  const result = await reportService.assignCheckerSignByConsId(
    req.params.consId,
    round,
    req.body,
    req.file
  );
  res.send(result);
});

const assignManagerSign = catchAsync(async (req, res) => {
  const { round } = req.query;
  const result = await reportService.assignManagerSignByConsId(
    req.params.consId,
    round,
    req.body,
    req.file
  );
  res.send(result);
});

const deleteConsReport8 = catchAsync(async (req, res) => {
  const { round } = req.query;
  const result = await reportService.deleteConsReport8ByConsId(
    req.params.consId,
    round
  );
  res.sendStatus(httpStatus.NO_CONTENT);
});

module.exports = {
  getConsReportProcess,
  addConsReportPhoto,
  createConsReport,
  createConsReport1,
  createConsReport2,
  createConsReport3RiskFactor,
  createConsReport3BestPractice,
  createConsReport4,
  createConsReport5,
  createConsReport6,
  createConsReport7,
  createConsReport8,
  getConsReport1,
  getConsReport2,
  getConsReport3,
  getConsReport4,
  getConsReport5,
  getConsReport6,
  getConsReport7,
  getConsReport8,
  getConsOneReport3RiskFactor,
  getConsOneReport3BestPractice,
  getConsOneReport1,
  getConsOneReport4,
  getConsOneReport5,
  getConsOneReport6,
  getConsOneReport7,
  updateConsReport1,
  updateConsReport2,
  updateConsReport3RiskFactor,
  updateConsReport3BestPractice,
  updateConsReport4,
  updateConsReport5,
  updateConsReport6,
  updateConsReport7,
  deleteConsReport3RiskFactor,
  deleteConsReport3BestPractice,
  deleteConsReport4,
  deleteConsReport5,
  deleteConsReport6,
  deleteConsReport7,
  deleteConsReport8,
  assignCheckSign,
  assignManagerSign,
};
