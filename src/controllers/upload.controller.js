const { startUploadWorker } = require('../services/upload.service');

exports.uploadFile = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'File is required' });
    }

    startUploadWorker(req.file.path);

    return res.json({ message: 'File upload started...' });
};
