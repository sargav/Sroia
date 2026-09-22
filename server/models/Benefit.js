const mongoose = require('mongoose');
//תת סכמה עבור ההטבות של הלקוח
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
//סכמה עבור הלקוח שמכילה את פרטי הלקוח ואת ההטבות שלו
const customer_ben_Schema = new mongoose.Schema({
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

module.exports = mongoose.model('Benefit', customer_ben_Schema);