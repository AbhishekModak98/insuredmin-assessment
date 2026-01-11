const express = require('express');
const {
    searchPolicyByUsername,
    aggregatePolicyByUser
} = require('../controllers/policy.controller');
const router = express.Router();

router.get('/policy/search', searchPolicyByUsername);
router.get('/policy/aggregate', aggregatePolicyByUser);

module.exports = router;
