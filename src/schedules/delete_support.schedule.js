const schedule = require('node-schedule');
const {supportService} = require("../services");

module.exports = {
    delete_support: () => {
        schedule.scheduleJob('0 0 0 * * *', async () => {
            await supportService.deleteSupportsByScheduler();
        });
    }
}
