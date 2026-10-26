const mongoose = require('mongoose');
const { benefitSchema } = require('./benefitSchema');

// סכמה עבור הלקוח שמכילה את פרטי הלקוח ואת ההטבות שבחר
// (נקרא בעבר Benefit - השם שונה כי כל מסמך כאן הוא לקוח ולא הטבה)
const customerBenefitSchema = new mongoose.Schema({
    nameCustomer: {
        type: String,
        required: true
    },
    Phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    benefits: [benefitSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('CustomerBenefit', customerBenefitSchema);
