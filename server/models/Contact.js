const mongoose = require('mongoose')
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true
    },
    //הגדרת המקור של הפניה שמדע מאין זה בא
    source: {
        type: String,
        required: true,
        enum: [
            'main_contact',    // טופס צור קשר מהאתר הראשי
            'builder_guide',  // טופס הורדת המדריך לבונה
            'project_mgmt',   // טופס בקשת הצעת מחיר מניהול פרויקטים
            'compass_app'     // פנייה מתוך אפליקציית המצפן לבונה
        ]
    },
    message: {
        type: String
    },
    //הגדרת שדות נוספים למעקב אחרי הפניות
    // האם הפנייה נקראה     
    readed:{
        type: Boolean,
        default: false
    },
    // האם הפנייה נענתה
    hasBeenReplied: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Contact', contactSchema)