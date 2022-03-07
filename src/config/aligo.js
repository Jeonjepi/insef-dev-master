const axios = require("axios");
const config = require("./config");

const sendSms = async ({ receivers, message }) => {
  return axios
    .post("https://apis.aligo.in/send/", null, {
      params: {
        key: config.aligo.key,
        user_id: "caitory",
        sender: "070-8779-1120",
        receiver: receivers.join(","),
        msg: message,
        // 테스트모드
        // testmode_yn: 'Y',
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      // console.log('err', err);
    }); //
};

exports.aligo = {
  sendSms,
};
