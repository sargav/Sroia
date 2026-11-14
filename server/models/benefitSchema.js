const mongoose = require('mongoose');

const BUILD_LEVELS = ["תכנון ורישוי", "ביצוע שלד", "ביצוע גמרים", "לקראת אכלוס"];

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
        enum: BUILD_LEVELS
    }
}, { timestamps: true });

module.exports = { benefitSchema, BUILD_LEVELS };
