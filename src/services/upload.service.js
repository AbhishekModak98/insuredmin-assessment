const { Worker } = require('worker_threads');
const path = require('path');

exports.startUploadWorker = (filePath) => {
    const worker = new Worker(
        path.join(__dirname, '../workers/upload.worker.js'),
        { workerData: { filePath } }
    );

    worker.on('message', (msg) => {
        console.log('Worker Message: ', msg);
    });

    worker.on('error', (err) => {
        console.log('Worker Error: ', err);
    });

    worker.on('exit', (code) => {
        console.log('Worker exited with code: ', code);
    });
}
