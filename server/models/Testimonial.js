const mongoose = require('mongoose');
//מודל עבור המלצות של הלקוחות, כולל שם, אימייל והודעה
const testimonialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    //הגדרת סוג הפניה, האם זה מהאפליקציה או מהאתר מהקורס או מהמדריך לבונה 
    type:{
        type: String,
        enum:['app','web','guide','course'],
        required:true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Testimonial', testimonialSchema);