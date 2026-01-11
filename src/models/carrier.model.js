const mongoose = required('mongoose');

const carrierSchema = new mongoose.Schema({
    companyName: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Carrier', carrierSchema);
