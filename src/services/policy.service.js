const User = require('../models/user.model');
const Policy = require('../models/policy.model');

exports.findPolicyByUsername = async (username) => {
    const user = await User.findOne({ firstName: { $regex: username, $options: 'i' } });
    if (!user) return [];

    return await Policy
        .find({ userId: user._id })
        .populate('categoryId')
        .populate('companyId')
        .populate('userId');
};

exports.aggregatePolicies = async () => {
    return await Policy.aggregate([
        {
            $group: {
                _id: '$userId',
                totalPolicies: { $sum: 1 },
                policies: { $push: '$policyNumber' }
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: '_id',
                foreignField: '_id',
                as: 'user'
            }
        },
        { $unwind: '$user' }
    ]);
};
