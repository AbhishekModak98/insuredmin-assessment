const scheduleJobs = require('../schedular');

exports.scheduleMessageService = (message, day, time) => {
    scheduleJobs(message, day, time);
};
