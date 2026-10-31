const mongoose = require('mongoose');
const { benefitSchema } = require('./benefitSchema');

// קטלוג ההטבות הקיימות: כל מסמך הוא הטבה אחת שלקוח יכול לבחור.
// הקונטרולר בודק מול הקטלוג הזה שההטבה שהלקוח שלח באמת קיימת.
//
// משתמשים בעותק (clone) של הסכמה המשותפת כדי להוסיף אינדקס ייחודי רק לקטלוג:
// בקטלוג אסור ששתי הטבות יקבלו אותו מזהה, אבל אצל הלקוחות
// אותה הטבה כמובן יכולה להופיע אצל הרבה לקוחות.
const catalogSchema = benefitSchema.clone();
catalogSchema.index({ IDBenefit: 1 }, { unique: true });

module.exports = mongoose.model('BenefitDefi', catalogSchema);
