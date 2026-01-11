const mongoose = require('mongoose');

const policySchema = new mongoose.Schema({
    policyNumber: { type: String, required: true },
    policyStartDate: { type: Date },
    policyEndDate: { type: Date },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lob' },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Carrier' }
}, { timestamps: true });

module.exports = mongoose.model('Policy', policySchema);
