const fs = require('fs');
const csv = require('csv-parser');
const XLSX = require('xlsx');

module.exports = (filePath) => {
    return new Promise((resolve, reject) => {
        if (filePath.endsWith('.csv')) {
            const results = [];

            fs.createReadStream(filePath)
                .pipe(csv())
                .on('data', (data) => results.push(data))
                .on('end', () => resolve(results))
                .on('error', () => reject);
        } else {
            const workbook = XLSX.readFile(filePath);
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            resolve(XLSX.utils.sheet_to_json(sheet));
        }
    });
};
