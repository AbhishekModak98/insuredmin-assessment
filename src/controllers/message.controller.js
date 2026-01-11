const { scheduleMessageService } = require('../services/message.service');

exports.scheduleMessage = async (req, res) => {
    const { message, day, time } = req.body;

    if (!message || !day || !time) {
        return res.status(400).json({ message: 'message, day and time are required' });
    }

    scheduleMessageService(message, day, time);

    res.json({ message: 'Message scheduled successfully' });
};
