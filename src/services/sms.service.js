const { aligo } = require("../config/aligo");
const { SMS } = require("../models");

const getLatestMessageByUserId = async (userId) => {
  const message = await SMS.findAll({
    limit: 1,
    where: { sm_us_id: userId },
    order: [["sm_created_at", "DESC"]],
  });

  if (!message[0]) {
    throw new Error();
  }

  return message[0];
};

const send = async (receivers, message) => {
  const result = await aligo.sendSms({
    receivers: [receivers],
    message: message,
  });
  //console.log("message result", result);
  return result;
};

const create = async (userId, content) => {
  const sms = await SMS.create({ sm_us_id: userId, sm_content: content });
  return sms;
};

module.exports = {
  send,
  create,
  getLatestMessageByUserId,
};
