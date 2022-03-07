const httpStatus = require("http-status");
// const pick = require('../utils/pick');
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { userService, supportService } = require("../services");

const createUser = catchAsync(async (req, res) => {
  req.body.us_thumbnail = req.file?.location;
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const { ag_id } = req.body;
  // const result = ag_id ? await userService.getConsCompaniesByAgencyId(ag_id) : await consCompanyService.getConsCompanies();

  // const filter = pick(req.query, ['name', 'role']);
  // const options = pick(req.query, ['sortBy', 'limit', 'page']);
  // const result = await userService.queryUsers(filter, options);
  const result = ag_id
    ? await userService.getUsersByAgencyId(ag_id)
    : await userService.getUsers();
  res.send(result);
});

const getUserById = catchAsync(async (req, res) => {
  const { field } = req.query;
  if (field) {
    const user = await userService.getUserById(req.params.userId, field);
    res.send(user.us_status);
  } else {
    const user = await userService.getUserById(req.params.userId);
    const supports = await supportService.getSupportsStatusByUserId(
      req.params.userId
    );
    res.send({ user, supports });
  }
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

const getUserInfo = catchAsync(async (req, res) => {
  const result = await userService.getUserConsAndReportCount(req.params.userId);
  res.send(result);
});

const getUserCons = catchAsync(async (req, res) => {
  const { greater_than, query } = req.query;
  const result = await userService.getUserCons(
    req.params.userId,
    req.query.order,
    greater_than,
    query
  );
  res.send(result);
});

const getUserReport = catchAsync(async (req, res) => {
  const { greater_than } = req.query;
  const result = await userService.getUserReport(
    req.params.userId,
    greater_than
  );
  res.send(result);
});

const getUserSupport = catchAsync(async (req, res) => {
  const { greater_than, less_than } = req.query;
  const result = await userService.getUserSupport(
    req.params.userId,
    greater_than,
    less_than
  );
  res.send(result);
});

const getSupportByConsAndConsCompanyName = catchAsync(async (req, res) => {
  const { name, greater_than, less_than } = req.query;
  const result = await userService.getSupportByConsAndConsCompanyName(
    req.params.userId,
    name,
    greater_than,
    less_than
  );
  res.send(result);
});

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserInfo,
  getUserCons,
  getUserReport,
  getUserSupport,
  getSupportByConsAndConsCompanyName,
};
