const mongoose = require('mongoose')

// סוגי האירועים ביומן: פגישה, ביקור באתר, שיחה
const EVENT_TYPES = ['meet', 'site', 'call']

const eventSchema = new mongoose.Schema({
    // שם האירוע, למשל "פגישת היכרות – משפחת לוי"
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 150
    },
    // סוג האירוע - קובע את הצבע ביומן
    type: {
        type: String,
        enum: EVENT_TYPES,
        required: true
    },
    // מתי מתחיל ומתי נגמר (תאריך + שעה ביחד)
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    // איפה, למשל "משרד" או "רחובות"
    location: {
        type: String,
        trim: true,
        maxlength: 150,
        default: ''
    },
    notes: {
        type: String,
        trim: true,
        maxlength: 2000,
        default: ''
    },
    // קישור לפנייה (לא חובה) - למשל פגישה עם לקוח שפנה דרך האתר
    contact: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contact',
        default: null
    },
    // המנהל שאחראי על האירוע
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Manager',
        default: null
    },
    // מי יצר את האירוע - נלקח מהטוקן בקונטרולר, לא מה-body
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Manager',
        required: true
    }
}, { timestamps: true })

// היומן תמיד מחפש לפי טווח תאריכים - האינדקס מאיץ את זה
eventSchema.index({ start: 1 })

module.exports = mongoose.model('Event', eventSchema)
module.exports.EVENT_TYPES = EVENT_TYPES