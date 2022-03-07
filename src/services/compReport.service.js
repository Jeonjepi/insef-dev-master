const fs = require("fs");
const path = require("path");
const moment = require("moment");
const puppeteer = require("puppeteer");
const handlebars = require("handlebars");
const { tokenTypes } = require("../config/tokens");
const { MEDIA_TYPE } = require("../enums/consMedia.enum");
const consService = require("./cons.service");
const supportService = require("./support.service");
const reportService = require("./report.service");
const agencyService = require("./agency.service");
const userService = require("./user.service");
const consMediaService = require("./consMedia.service");
const emailService = require("./email.service");
const agencyMachineService = require("./agencyMachine.service");
const tokenService = require("./token.service");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const smsService = require("./sms.service");

handlebars.registerHelper("inc", function (value, options) {
  return parseInt(value) + 1;
});

handlebars.registerHelper("formatTime", function (date, format) {
  const mmnt = moment(date);
  return mmnt.format(format);
});

handlebars.registerHelper("formatPrice", function (price) {
  if (!price) {
    return "0 원";
  }
  return parseInt(String(price).replace(/\,/g, "")).toLocaleString() + " 원";
});

handlebars.registerHelper('ifeq', function (a, b, options) {
  if (a == b) { return options.fn(this); }
  return options.inverse(this);
});

handlebars.registerHelper('ifnoteq', function (a, b, options) {
  if (a != b) { return options.fn(this); }
  return options.inverse(this);
});

const getCompReportData = async (consId, round) => {
  let agency,
    cons,
    support,
    report,
    consUser,
    supportUser,
    r1,
    r2,
    r3,
    r4,
    r5,
    r6,
    r7,
    r8,
    consPhoto,
    r1_photo;
  agency = await agencyService.getAgencyByConsId(consId);
  cons = await consService.getConsById(consId);
  support = await supportService.getRecentSupportByConsId(consId, round);
  try {
    supportUser = await userService.getUserById(support.su_us_id);
  } catch (e) {}
  report = await reportService.getReportByRound(consId, round);
  try {
    consUser = await userService.getUserById(cons.cs_manage_us_id);
  } catch (e) {}
  try {
    r1 = await reportService.getConsReport1ByConsId(consId, round);
    r1.dataValues.r1_process = r1.dataValues.r1_process.split(",");
  } catch (e) {}
  try {
    r2 = await reportService.getConsReport2ByConsId(consId, round);
    r2.dataValues.r2_machine =
      await agencyMachineService.getAgencyMachineNamesByids(
        r2.dataValues.r2_machine
      );
  } catch (e) {}
  try {
    consPhoto = await consMediaService.getConsMediaByConsId(consId, {
      cm_round: round,
      cm_category: MEDIA_TYPE.현장_사진,
    });
  } catch (e) {}
  try{
    r1_photo = await reportService.getConsReport1ByConsIdPhoto(consId, round)
    // r1_photo.filter((item) => {
    //   item.dataValues
    // })
  }catch (e) {}
  try {
    r3 = await reportService.getConsReport3RiskFactorByConsId(consId, round);
    r3.map((item) => {
      item.dataValues.f3_hazardous_type =
        item.dataValues.f3_hazardous_type.split("|");
      item.dataValues.f3_measures_detail =
        item.dataValues.f3_measures_detail.split(";");
    });
  } catch (e) {}
  try {
    r4 = await reportService.getConsReport4ByConsId(consId, round);
    r4.map((item) => {
      item.dataValues.r4_hazardous_type =
        item.dataValues.r4_hazardous_type.split("|");
      item.dataValues.r4_measures_detail =
        item.dataValues.r4_measures_detail.split(";");
    });
  } catch (e) {}
  try {
    r5 = await reportService.getConsReport5ByConsId(consId, round);
    r5.type0 = r5.filter((item) => item.dataValues.r5_type === 0);
    r5.type1 = r5.filter((item) => item.dataValues.r5_type === 1);
    r5.type2 = r5.filter((item) => item.dataValues.r5_type === 2);
    r5.type3 = r5.filter((item) => item.dataValues.r5_type === 3);
    r5.exist_r5 = !(r5.type0 && r5.type1 && r5.type2 && r5.type3);
  } catch (e) {}
  try {
    r6 = await reportService.getConsReport6ByConsId(consId, round);
  } catch (e) {}
  try {
    r7 = await reportService.getConsReport7ByConsId(consId, round);
  } catch (e) {}
  try {
    r8 = await reportService.getConsReport8ByConsId(consId, round);
  } catch (e) {}
  return {
    agency: agency,
    cons: cons?.dataValues,
    support: support?.dataValues,
    report: report?.dataValues,
    r1: r1?.dataValues,
    r2: r2?.dataValues,
    r3: r3,
    r4: r4,
    r5: r5,
    r6: r6,
    r7: r7,
    r8: r8?.dataValues,
    consUser: consUser?.dataValues,
    supportUser: supportUser?.us_name,
    consPhoto: consPhoto ? consPhoto[0] : null,
    r1_photo: r1_photo,
  };
};
//
const getCompReportHTML = async (consId, round) => {
  const compReportData = await getCompReportData(consId, round);
  console.log("compReportData", compReportData);
  const htmlPath = path.join(
    process.env.PWD,
    "/src/resources/template/report/report.html"
  );
  const templateHtml = fs.readFileSync(htmlPath, "utf8");
  const template = handlebars.compile(templateHtml);
  const finalHtml = template(compReportData);
  return finalHtml;
};

const getCompReportByReportId = async (consId, round) => {
  // pdf 생성
  const pdfPath = path.join(
    process.env.PWD,
    `/src/resources/report-${consId}-${round}.pdf`
  );
  console.log(pdfPath);
  const finalHtml = await getCompReportHTML(consId, round);
  try {
    await (async () => {
      const browser = await puppeteer.launch({
        executablePath: process.env.CHROME_BIN || null,
        ignoreHTTPSErrors: true,
        args: [
          "--headless",
          "--disable-infobars",
          "--disable-setuid-sandbox",
          "--window-size=1366,768",
          "--disable-dev-shm-usage",
          "--unlimited-storage",
          "--full-memory-crash-report",
          "--disable-gpu",
          "--ignore-certificate-errors",
          "--no-sandbox",
          "--disable-dev-shm-usage",
          "--lang=ko-kr;q=0.9,en;q=0.8",
          "--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36",
        ],
      });

      const context = await browser.createIncognitoBrowserContext();
      const page = await context.newPage();
      await page.setCacheEnabled(false);
      await page.goto(
        `data:text/html;charset=UTF-8,${encodeURIComponent(finalHtml)}`,
        {
          waitUntil: "networkidle0",
        }
      );
      await page.pdf({
        format: "A4",
        headerTemplate: "<p></p>",
        footerTemplate: "<p></p>",
        displayHeaderFooter: false,
        margin: {
          top: "40px",
          bottom: "100px",
          left: "30px",
          right: "30px",
        },
        printBackground: false,
        path: pdfPath,
      });
      await browser.close();

      console.log("Done: report.pdf is created!");
    })();
  } catch (err) {
    console.log("ERROR:", err);
  }

  return pdfPath;
};

const sendCompleteReportToEmailAndSMS = async (
  consId,
  round,
  type,
  signature,
  time_limit,
  email,
  sms
) => {
  await supportService.getRecentSupportByConsId(consId, round);
  const token = await tokenService.generateCompReportToken(time_limit);
  const url = `http://api.insafed.com:3000/v1/cons/${consId}/${round}/report/sign/?type=${type}&token=${token}`;
  await smsService.send(sms, url);
  await emailService.sendCompReportEmail(email, consId, round, url);
};

const sendCompleteReportPageForSign = async (consId, round, token) => {
  let tokenDoc;
  try {
    tokenDoc = await tokenService.verifyToken(token, tokenTypes.COMP_REPORT);
  } catch (e) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "유효시간이 경과되었습니다.");
  }
  // TODO 페이지 가져오는 부분
};

module.exports = {
  getCompReportHTML,
  getCompReportByReportId,
  sendCompleteReportToEmailAndSMS,
  sendCompleteReportPageForSign,
};
