const osUtils = require('os-utils');

module.exports = () => {
    setInterval(() => {
        osUtils.cpuUsage((usage) => {
            const cpu = usage * 100;
            console.log(`CPU usage: ${cpu.toFixed(2)}%`);

            if (cpu >= 70) {
                console.log('CPU usage above 70%. Restarting server...');
                process.exit(1);
            }
        });
    }, 60000);
};
