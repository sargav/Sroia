const mongoose = require('mongoose');
//הטבה בשבילהלקוח פירוט על כל ההטבות והן יהיו כמערך  של הטבות מתי שהלקוח רוצה הטבות
const benefitSchema = new mongoose.Schema({
        nameCompany: {
            type: String,
            required: true
        },
        IDBenefit: {
            type: String,
            required: true
        },
        levelOfBuilder: {
            type: String,
            required: true,
            enum: ["תכנון ורישוי", "ביצוע שלד", "ביצוע גמרים", "לקראת אכלוס"]
        }
    }, { timestamps: true });
module.exports = mongoose.model('BenefitDefi', benefitSchema);