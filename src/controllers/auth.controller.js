const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const {
  authService,
  userService,
  emailService,
  tokenService,
  smsService,
} = require("../services");
const { USER_ROLE } = require("../enums/user.enum");
const ApiError = require("../utils/ApiError");
const { User, Agency } = require("../models");

const register = catchAsync(async (req, res) => {
  // if (req.body.us_role != USER_ROLE.관리자 && !req.body.token){
  //     throw new ApiError(httpStatus.BAD_REQUEST, "기업회원, 기술지도요원 가입시에는 토큰이 필요합니다.")
  // }
  //
  // if (req.file){
  //     req.body.us_thumbnail = req.file.location;
  // }
  // const {token, ...reqBody} = req.body;
  // const user = await userService.createUser(reqBody, token);
  // TODO 위에 주석 풀고 아래 user까지지우면됌..
  const reqBody = req.body;
  const { us_email, us_username, us_ag_id } = reqBody;

  if (us_email && (await User.isEmailTaken(reqBody.us_email))) {
    throw new ApiError(httpStatus.BAD_REQUEST, "email already taken");
  }
  if (us_username && (await User.isUsernameTaken(reqBody.us_username))) {
    throw new ApiError(httpStatus.BAD_REQUEST, "username already taken");
  }

  if (us_ag_id && !(await Agency.isAgencyIdTaken(us_ag_id))) {
    throw new ApiError(httpStatus.BAD_REQUEST, "related agency not found");
  }
  const user = await User.create(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user, tokens });
});

const login = catchAsync(async (req, res) => {
  const { ag_id, us_email, us_password } = req.body;
  const user = await authService.loginUserWithEmailAndPasswordByAgency(
    ag_id,
    us_email,
    us_password
  );
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const checkEmailAndPassword = catchAsync(async (req, res) => {
  const { us_email, us_password } = req.body;
  const user = await authService.checkEmailAndPassword(us_email, us_password);
  res.send({ result: user });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const sendVerificationSMS = catchAsync(async (req, res) => {
  const { us_name, us_phone } = req.body;
  const content = authService.generateAuthNumber(6);
  const user = await userService.getUserByNameAndPhone(us_name, us_phone);
  const send = await smsService.send(us_phone, content);
  const create = await smsService.create(user.us_id, content);
  res.send({ send, create });
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const { us_email } = req.body;
  const user = await userService.getUserByEmail(us_email);
  res.send(user);
});

const sendResetPasswordEmail = catchAsync(async (req, res) => {
  const { ag_id, us_email } = req.body;
  const resetPasswordToken = await tokenService.generateResetPasswordToken(
    ag_id,
    us_email
  );
  //console.log(resetPasswordToken);
  await emailService.sendResetPasswordEmail(us_email, resetPasswordToken);
  //console.log('http://caitory.com/insef/pw_change/?token=' + resetPasswordToken);
  res.sendStatus(httpStatus.OK);
});

const sendRegisterAgencyEmail = catchAsync(async (req, res) => {
  const { us_email } = req.body;
  const registerAgencyToken = await tokenService.generateRegisterAgencyToken();
  await emailService.sendRegisterAgencyEmail(us_email, registerAgencyToken);
  //console.log(registerAgencyToken);
  res.sendStatus(httpStatus.OK);
});

const sendRegisterConsCompanyEmail = catchAsync(async (req, res) => {
  const { ag_id, us_email } = req.body;
  const registerConsCompanyToken =
    await tokenService.generateRegisterAgentToken(ag_id);
  await emailService.sendRegisterConsCompanyEmail(
    us_email,
    registerConsCompanyToken
  );
  //console.log(registerConsCompanyToken);
  res.sendStatus(httpStatus.OK);
});

const findUser = catchAsync(async (req, res) => {
  const { us_name, us_phone, authNumber } = req.body;
  const username = await authService.verifyAuthNumber(
    us_name,
    us_phone,
    authNumber
  );
  res.send(username);
});

const changePassword = catchAsync(async (req, res) => {
  const { us_username, us_name, new_password } = req.body;
  const user = await authService.changePassword(
    us_username,
    us_name,
    new_password
  );
  res.send({ user });
});

const resetPassword = catchAsync(async (req, res) => {
  //console.log(req.query.token)
  await authService.resetPassword(req.query.token, req.body.us_password);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  register,
  login,
  logout,
  checkEmailAndPassword,
  refreshTokens,
  sendVerificationSMS,
  sendVerificationEmail,
  sendResetPasswordEmail,
  sendRegisterAgencyEmail,
  sendRegisterConsCompanyEmail,
  findUser,
  changePassword,
  resetPassword,
};
