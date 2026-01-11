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
        await mongoose
            .connect('mongodb+srv://abhishekrameshwarmodak_db_user:54Tr80SiAnKftdXi@assessment.1brbcwm.mongodb.net/?appName=assessment')
            .then(() => console.log('connected to mongodb in worker'))
            .catch(error => console.log('error while connecting to db in worker: ', error));

        const records = await parseFile(workerData.filePath);

        for (const row of records) {
            const agent = await Agent.findOneAndUpdate(
                { agentName: row.agent },
                { agentName: row.agent },
                { upsert: true, new: true }
            );

            const user = await User.findOneAndUpdate(
                {
                    phoneNumber: row.phone,
                    email: row.email
                },
                {
                    $setOnInsert: {
                        firstName: row.firstname,
                        dob: row.dob,
                        address: row.address,
                        phoneNumber: row.phone,
                        state: row.state,
                        pinCode: row.zip,
                        email: row.email,
                        gender: row.gender,
                        userType: row.userType
                    }
                },
                { upsert: true, new: true }
            );

            const account = await Account.findOneAndUpdate(
                { accountName: row.account_name },
                {
                    $setOnInsert: {
                        accountName: row.account_name,
                        userId: user._id
                    }
                },
                { upsert: true, new: true }
            );

            const lob = await Lob.findOneAndUpdate(
                { categoryName: row.category_name },
                { categoryName: row.category_name },
                { upsert: true, new: true }
            );

            const carrier = await Carrier.findOneAndUpdate(
                { companyName: row.company_name },
                { companyName: row.company_name },
                { upsert: true, new: true }
            );

            await Policy.findOneAndUpdate(
                { policyNumber: row.policy_number },
                {
                    $setOnInsert: {
                        policyNumber: row.policy_number,
                        policyStartDate: row.policy_start_date,
                        policyEndDate: row.policy_end_date,
                        userId: user._id,
                        categoryId: lob._id,
                        companyId: carrier._id
                    }
                },
                { upsert: true, new: true }
            );
        }

        parentPort.postMessage('Upload completed');
        process.exit(0);
    } catch (error) {
        parentPort.postMessage('Upload failed');
        process.exit(1);
    } finally {
        parentPort.postMessage('Upload completed');
        await mongoose.disconnect();
        process.exit(0);
    }
})();