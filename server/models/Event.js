const mongoose = require('mongoose')

// סוגי האירועים ביומן: פגישה, ביקור באתר, שיחה
const EVENT_TYPES = ['meet', 'site', 'call']

const eventSchema = new mongoose.Schema({
    //כותרת האירוע
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 150
    },
    // סוג האירוע -לפי זה נקבע את הצבע ביומן
    type: {
        type: String,
        enum: EVENT_TYPES,
        required: true
    },
    //התחלה וסיום-זמני האירוע
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    //מיקום האירוע
    location: {
        type: String,
        trim: true,
        maxlength: 150,
        default: ''
    },
    //הערות
    notes: {
        type: String,
        trim: true,
        maxlength: 2000,
        default: ''
    },
    //קישור לפניה-אם הפניה הזזאת קשורה לאירוע מהיומן
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

//כיון שתמיד היומן מחפשאת השדב הזה לכן יש את היאנדקס
eventSchema.index({ start: 1 })

module.exports = mongoose.model('Event', eventSchema)
module.exports.EVENT_TYPES = EVENT_TYPES