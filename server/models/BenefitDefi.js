const mongoose = require('mongoose');
const { benefitSchema } = require('./benefitSchema');

// קטלוג ההטבות הקיימות: כל מסמך הוא הטבה אחת שלקוח יכול לבחור.
// הקונטרולר בודק מול הקטלוג הזה שההטבה שהלקוח שלח באמת קיימת.
module.exports = mongoose.model('BenefitDefi', benefitSchema);
