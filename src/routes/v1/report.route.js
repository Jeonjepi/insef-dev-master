const express = require("express");
const validate = require("../../middlewares/validate");
const { reportValidation } = require("../../validations/");
const s3 = require("../../config/s3");
const { ACCESS_RULES } = require("../../config/accessRules");
const { reportController } = require("../../controllers/");

const router = express.Router();

router
  .route("/:consId/report/process")
  .get(
    ACCESS_RULES.ALL_USER,
    validate(reportValidation.getConsReportProcess),
    reportController.getConsReportProcess
  );

router
  .route("/:consId/report")
  .post(ACCESS_RULES.ALL_USER, reportController.createConsReport);

router
  .route("/:consId/report/1")
  .get(
    ACCESS_RULES.ALL_USER,
    validate(reportValidation.getConsReport1),
    reportController.getConsReport1
  )
  .post(
    ACCESS_RULES.ALL_USER,
    s3.upload.single("r1_photo"),
    validate(reportValidation.createConsReport1),
    reportController.createConsReport1
  );

router
  .route("/:consId/report/1/:reportId")
  .get(
    ACCESS_RULES.ALL_USER,
    validate(reportValidation.getConsReport1ById),
    reportController.getConsOneReport1
  )
  .patch(
    ACCESS_RULES.ALL_USER,
    validate(reportValidation.updateConsReport1),
    reportController.updateConsReport1
  );


router
  .route("/:consId/report/2")
  .get(
    ACCESS_RULES.ALL_USER,
    validate(reportValidation.getConsReport2),
    reportController.getConsReport2
  )
  .patch(
    ACCESS_RULES.ALL_USER,
    validate(reportValidation.updateConsReport2),
    reportController.updateConsReport2
  )
  .post(
    ACCESS_RULES.ALL_USER,
    validate(reportValidation.createConsReport2),
    reportController.createConsReport2
  );

router
  .route("/:consId/report/3")
  .get(
    ACCESS_RULES.ALL_USER,
    validate(reportValidation.getConsReport3),
    reportController.getConsReport3
  );
// .post(ACCESS_RULES.ALL_USER, s3.upload.array('r3_media'),validate(reportValidation.createConsReport3), reportController.createConsReport3)

router
  .route("/:consId/report/3/risk-factor")
  .post(
    ACCESS_RULES.ALL_USER,
    s3.upload.array("f3_media"),
    validate(reportValidation.createConsReport3RiskFactor),
    reportController.createConsReport3RiskFactor
  )
  .delete(
    ACCESS_RULES.ALL_USER,
    validate(reportValidation.deleteConsReport3RiskFactor),
    reportController.deleteConsReport3RiskFactor
  );

router
  .route("/:consId/report/3/risk-factor/:riskFactorId")
  .get(
    ACCESS_RULES.ALL_USER,
    validate(reportValidation.getConsOneReport3RiskFactor),
    reportController.getConsOneReport3RiskFactor
  )
  .patch(
    ACCESS_RULES.ALL_USER,
    s3.upload.array("f3_media"),
    validate(reportValidation.updateConsReport3RiskFactor),
    reportController.updateConsReport3RiskFactor
  );

router
  .route("/:consId/report/3/best-practice")
  .post(
    ACCESS_RULES.ALL_USER,
    s3.upload.array("b3_media"),
    validate(reportValidation.createConsReport3BestPractice),
    reportController.createConsReport3BestPractice
  )
  .delete(
    ACCESS_RULES.ALL_USER,
    validate(reportValidation.deleteConsReport3BestPractice),
    reportController.deleteConsReport3BestPractice
  );

router
  .route("/:consId/report/3/best-practice/:bestPracticeId")
  .get(
    ACCESS_RULES.ALL_USER,
    validate(reportValidation.getConsOneReport3BestPractice),
    reportController.getConsOneReport3BestPractice
  )
  .patch(
    ACCESS_RULES.ALL_USER,
    s3.upload.array("b3_media"),
    validate(reportValidation.updateConsReport3BestPractice),
    reportController.updateConsReport3BestPractice
  );

router
  .route("/:consId/report/3/:reportId/add-photo")
  .post(
    ACCESS_RULES.ALL_USER,
    s3.upload.array("r3_media"),
    validate(reportValidation.addConsReportPhoto),
    reportController.addConsReportPhoto
  );

router
  .route("/:consId/report/4")
  .get(
    ACCESS_RULES.ALL_USER,
    validate(reportValidation.getConsReport4),
    reportController.getConsReport4
  )
  .post(
    ACCESS_RULES.ALL_USER,
    validate(reportValidation.createConsReport4),
    reportController.createConsReport4
  )
  .delete(
    ACCESS_RULES.ALL_USER,
    validate(reportValidation.deleteConsReport4),
    reportController.deleteConsReport4
  );

router
  .route("/:consId/report/4/:reportId")
  .get(
    ACCESS_RULES.ALL_USER,
    validate(reportValidation.getConsReport4ById),
    reportController.getConsOneReport4
  )
  .patch(
    ACCESS_RULES.ALL_USER,
    validate(reportValidation.updateConsReport4),
    reportController.updateConsReport4
  );

router
  .route("/:consId/report/5")
  .get(
    ACCESS_RULES.ALL_USER,
    validate(reportValidation.getConsReport5),
    reportController.getConsReport5
  )
  .post(
    ACCESS_RULES.ALL_USER,
    validate(reportValidation.createConsReport5),
    reportController.createConsReport5
  )
  .delete(
    ACCESS_RULES.ALL_USER,
    validate(reportValidation.deleteConsReport5),
    reportController.deleteConsReport5
  );

router
  .route("/:consId/report/5/:reportId")
  .get(
    ACCESS_RULES.ALL_USER,
    validate(reportValidation.getConsReport5ById),
    reportController.getConsOneReport5
  )
  .patch(
    ACCESS_RULES.ALL_USER,
    validate(reportValidation.updateConsReport5),
    reportController.updateConsReport5
  );

router
  .route("/:consId/report/6")
  .get(
    ACCESS_RULES.ALL_USER,
    validate(reportValidation.getConsReport6),
    reportController.getConsReport6
  )
  .post(
    ACCESS_RULES.ALL_USER,
    s3.upload.array("r6_media"),
    validate(reportValidation.createConsReport6),
    reportController.createConsReport6
  )
  .delete(
    ACCESS_RULES.ALL_USER,
    validate(reportValidation.deleteConsReport6),
    reportController.deleteConsReport6
  );

router
  .route("/:consId/report/6/:reportId")
  .get(
    ACCESS_RULES.ALL_USER,
    validate(reportValidation.getConsReport6ById),
    reportController.getConsOneReport6
  )
  .patch(
    ACCESS_RULES.ALL_USER,
    validate(reportValidation.updateConsReport6),
    reportController.updateConsReport6
  );

router
  .route("/:consId/report/7")
  .get(
    ACCESS_RULES.ALL_USER,
    validate(reportValidation.getConsReport7),
    reportController.getConsReport7
  )
  .post(
    ACCESS_RULES.ALL_USER,
    validate(reportValidation.createConsReport7),
    reportController.createConsReport7
  )
  .delete(
    ACCESS_RULES.ALL_USER,
    validate(reportValidation.deleteConsReport7),
    reportController.deleteConsReport7
  );

router
  .route("/:consId/report/7/:reportId")
  .get(
    ACCESS_RULES.ALL_USER,
    validate(reportValidation.getConsReport7ById),
    reportController.getConsOneReport7
  )
  .patch(
    ACCESS_RULES.ALL_USER,
    validate(reportValidation.updateConsReport7),
    reportController.updateConsReport7
  );

router
  .route("/:consId/report/8")
  .get(
    ACCESS_RULES.ALL_USER,
    validate(reportValidation.getConsReport8),
    reportController.getConsReport8
  )
  .post(
    ACCESS_RULES.ALL_USER,
    validate(reportValidation.createConsReport8),
    reportController.createConsReport8
  )
  .delete(
    ACCESS_RULES.ALL_USER,
    validate(reportValidation.deleteConsReport8),
    reportController.deleteConsReport8
  );

router
  .route("/:consId/report/8/sign/manager")
  .post(
    s3.upload.single("r8_manager_sign_image"),
    reportController.assignManagerSign
  );

router
  .route("/:consId/report/8/sign/checker")
  .post(
    s3.upload.single("r8_checker_sign_image"),
    reportController.assignCheckSign
  );

module.exports = router;
