const {
    findPolicyByUsername,
    aggregatePolicies
} = require('../services/policy.service');

exports.searchPolicyByUsername = async (req, res) => {
    const { username } = req.query;

    if (!username) {
        return res.status(400).json({ message: 'username is required' });
    }

    const data = await findPolicyByUsername(username);
    res.json(data);
};

exports.aggregatePolicies = async (req, res) => {
    const data = await aggregatePolicies();
    res.json(data);
};
