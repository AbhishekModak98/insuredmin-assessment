const express = require('express');
const {
    searchPolicyByUsername,
    aggregatePolicies
} = require('../controllers/policy.controller');
const router = express.Router();

router.get('/policy/search', searchPolicyByUsername);
router.get('/policy/aggregate', aggregatePolicies);

module.exports = router;
