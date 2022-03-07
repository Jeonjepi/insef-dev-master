const nodemailer = require('nodemailer');
const config = require('./config');

module.exports = {
    mailConfig: {
        // service: config.email.smtp.,
        host: config.email.smtp.host,
        port: config.email.smtp.port,
        secure: config.email.smtp.secure,
        auth: {
            user: config.email.smtp.auth.user,
            pass: config.email.smtp.auth.pass,
        },
    }
}
