const dotenv = require("dotenv");
const path = require("path");
const Joi = require("joi");

dotenv.config({ path: path.join(__dirname, "../../.env") });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("production", "development", "test")
      .required(),
    PORT: Joi.number().default(3000),
    JWT_SECRET: Joi.string().required().description("JWT secret key"),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
      .default(30)
      .description("minutes after which access tokens expire"),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
      .default(30)
      .description("days after which refresh tokens expire"),
    MYSQL_USER: Joi.string().description("카이토리 DB 유저이름"),
    MYSQL_PASSWORD: Joi.string().description("카이토리 DB 비밀번호"),
    MYSQL_DATABASE: Joi.string().description("카이토리 DB database"),
    MYSQL_HOST: Joi.string().description("카이토리 DB 호스트명"),
    MYSQL_DIALECT: Joi.string().description("카이토리 DB dialect"),
    AWS_S3_REGION: Joi.string().description("S3 리젼"),
    AWS_S3_ACCESS_KEY: Joi.string().description("S3 엑세스 키"),
    AWS_S3_SECRET_KEY: Joi.string().description("S3 시크릿 키"),
    AWS_S3_BUCKET: Joi.string().description("S3 버킷 이름"),
    SMTP_HOST: Joi.string().description("server that will send the emails"),
    SMTP_PORT: Joi.number().description("port to connect to the email server"),
    SMTP_SECURE: Joi.boolean().description("STMP 시큐어"),
    SMTP_USERNAME: Joi.string().description("username for email server"),
    SMTP_PASSWORD: Joi.string().description("password for email server"),
    EMAIL_FROM: Joi.string().description(
      "the from field in the emails sent by the app"
    ),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES:
      Joi.string().description("이메일 초기화 토큰"),
    JWT_COMP_REPORT_EXPIRATION_MINUTES:
      Joi.string().description("결과 보고서 확인 토큰"),
    ALIGO_KEY: Joi.string().description("결과 보고서 확인 토큰"),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  db: {
    username: envVars.MYSQL_USER,
    password: envVars.MYSQL_PASSWORD,
    database: envVars.MYSQL_DATABASE,
    host: envVars.MYSQL_HOST,
    dialect: envVars.MYSQL_DIALECT,
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes:
      envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    resetPasswordExpirationMinutes:
      envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    compReportExpirationMinutes: envVars.JWT_COMP_REPORT_EXPIRATION_MINUTES,
    // verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
  aws: {
    s3Region: envVars.AWS_S3_REGION,
    s3AccessKey: envVars.AWS_S3_ACCESS_KEY,
    s3SecretKey: envVars.AWS_S3_SECRET_KEY,
    s3Bucket: envVars.AWS_S3_BUCKET,
  },
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      secure: envVars.SMTP_SECURE,
      auth: {
        user: envVars.SMTP_USERNAME,
        pass: envVars.SMTP_PASSWORD,
      },
    },
    from: envVars.EMAIL_FROM,
  },
  aligo: {
    key: envVars.ALIGO_KEY,
  },
};
