const mongoose = required('mongoose');

const accountSchema = new mongoose.Schema({
    accountName: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Account', accountSchema);
