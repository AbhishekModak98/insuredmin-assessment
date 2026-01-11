const { workerData, parentPort } = require('worker_threads');
const mongoose = require('mongoose');
const parseFile = require('../utils/fileParser');

const Agent = require('../models/agent.model');
const User = require('../models/user.model');
const Account = require('../models/account.model');
const Lob = require('../models/lob.model');
const Carrier = require('../models/carrier.model');
const Policy = require('../models/policy.model');

(async () => {
    try {
        const records = await parseFile(workerData.filePath);

        for (const row of records) {
            const agent = await Agent.create({ agentName: row.agent });

            const user = await User.create({
                firstName: row.firstname,
                dob: row.dob,
                address: row.address,
                phoneNumber: row.phone,
                state: row.state,
                pinCode: row.zip,
                email: row.email,
                gender: row.gender,
                userType: row.userType
            });

            const account = await Account.create({
                accountName: row.account_name,
                userId: user._id
            });

            const lob = await Lob.create({ categoryName: row.category_name });

            const carrier = await Carrier.create({ companyName: row.company_name });

            await Policy.create({
                policyNumber: row.policy_number,
                policyStartDate: row.policy_start_date,
                policyEndDate: row.policy_end_date,
                userId: user._id,
                categoryId: lob._id,
                companyId: carrier._id
            });
        }

        parentPort.postMessage('Upload completed');
        process.exit(0);
    } catch (error) {
        parentPort.postMessage('Upload failed');
        process.exit(1);
    }
})();