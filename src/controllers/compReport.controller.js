const Jwt = require("jsonwebtoken");
const path = require("path");
const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { compReportService } = require("../services");

const getCompReport = catchAsync(async (req, res) => {
  const compReportHTML = await compReportService.getCompReportHTML(
    req.params.consId,
    req.params.round
  );

  res.send(compReportHTML);
});

const getCompReportPDF = catchAsync(async (req, res) => {
  const compReportPDF = await compReportService.getCompReportByReportId(
    req.params.consId,
    req.params.round
  );
  res.sendFile(compReportPDF);
});

// TODO 결과 보고서 URL 생성 요청 ( 토큰과 같이 발급 )
// TODO 결과 보고서 페이지 조회 ( 요청시에 토큰 검사 후 페이지 반환 )
const sendCompleteReportToEmailAndSMS = catchAsync(async (req, res) => {
  const { consId, round } = req.params;
  const { email, sms } = req.body;
  const { signature, time_limit, type } = req.query;

  await compReportService.sendCompleteReportToEmailAndSMS(
    consId,
    round,
    type,
    signature,
    time_limit,
    email,
    sms
  );
  res.sendStatus(httpStatus.NO_CONTENT);
});

const sendCompleteReportPageForSign = catchAsync(async (req, res) => {
  const { consId, round } = req.params;
  const { token, type } = req.query;
  await compReportService.sendCompleteReportPageForSign(consId, round, token);
  res.sendFile(path.join(__dirname, `../../public/sign/report_${type}.html`));
});

module.exports = {
  getCompReport,
  getCompReportPDF,
  sendCompleteReportToEmailAndSMS,
  sendCompleteReportPageForSign,
};
