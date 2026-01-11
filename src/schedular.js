const Message = require('../src/models/message.model');

module.exports = (message, day, time) => {
    const scheduledAt = new Date(`${day} ${time}`);

    const delay = scheduledAt.getTime() - Date.now();

    if (delay <= 0) {
        throw new error('Schedule time must be in future');
    }

    setTimeout(async () => {
        await Message.create({
            message,
            scheduledAt
        });
        console.log('Message added');
    }, delay);
};
