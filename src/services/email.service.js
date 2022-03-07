const nodemailer = require('nodemailer');
const config = require('../config/config');

const transport = nodemailer.createTransport(config.email.smtp);

const sendEmail = (to, subject, html) => {
    const msg = {from: config.email.from, to, subject, html};
    transport.sendMail(msg);
};

const sendResetPasswordEmail = async (to, token) => {
    const subject = '[카이토리] 비밀번호 초기화 안내 메일입니다.';
    const resetPasswordUrl = `http://caitory.com/insef/pw_change/?token=${token}`;
    const html = `<b>해당 주소를 통해 비밀번호를 재설정 해주시기 바랍니다.</b><br>` +
        `<b>비밀번호 초기화 링크: </b><a href="${resetPasswordUrl}">초기화하기</a><br>` +
        `<b>이 메일은 보낸 시각으로부터 10분간 유효합니다.</b>`;
    sendEmail(to, subject, html);
};

const sendRegisterAgencyEmail = async (to, token) => {
    const subject = '[카이토리] 기업회원 가입 안내 메일입니다.';
    const html = `<b>해당 토큰을 통해 기업 회원 가입을 진행해주시기 바랍니다.</b><br>` +
        `<b>기업 회원 가입 토큰: ${token}<br>` +
        `<b>이 메일은 보낸 시각으로부터 10분간 유효합니다.</b>`;
    sendEmail(to, subject, html);
};

const sendRegisterConsCompanyEmail = async (to, token) => {
    const subject = '[카이토리] 업체회원 가입 안내 메일입니다.';
    const html = `<b>해당 토큰을 통해 업체 회원 가입을 진행해주시기 바랍니다.</b><br>` +
        `<b>업체 회원 가입 토큰: </b>${token}<br>` +
        `<b>이 메일은 보낸 시각으로부터 10분간 유효합니다.</b>`;
    sendEmail(to, subject, html);
};

const sendCompReportEmail = async (to, cs_id, round, url) => {
    const subject = `[카이토리] 결과보고서(${cs_id}번 현장 ${round}회차) 안내 메일입니다.`;
    const html = `<b>결과보고서(${cs_id}번 현장 ${round}회차) 안내 메일입니다.</b><br>` +
        `<b>결과보고서 url: <a href="${url}">${url}</a><br>`;
    sendEmail(to, subject, html);
};

const sendVerificationEmail = async (to, token) => {
    const subject = 'Email Verification';
    // replace this url with the link to the email verification page of your front-end app
    const verificationEmailUrl = `http://caitory.com/insef/pw_change/?token=${token}`;
    const text = `Dear user,
To verify your email, click on this link: ${verificationEmailUrl}
If you did not create an account, then ignore this email.`;
    await sendEmail(to, subject, text);
};

module.exports = {
    transport,
    sendEmail,
    sendResetPasswordEmail,
    sendVerificationEmail,
    sendRegisterAgencyEmail,
    sendRegisterConsCompanyEmail,
    sendCompReportEmail,
};
