const mongoose = require('mongoose')

// מצבי משימה: לעשות, בטיפול, בוצע
const TASK_STATUSES = ['todo', 'doing', 'done']

const taskSchema = new mongoose.Schema({
    // מה צריך לעשות, למשל "לשלוח הצעת מחיר ליוסי"
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200
    },
    status: {
        type: String,
        enum: TASK_STATUSES,
        default: 'todo'
    },
    // עד מתי (לא חובה)
    dueDate: {
        type: Date,
        default: null
    },
    notes: {
        type: String,
        trim: true,
        maxlength: 2000,
        default: ''
    },
    // למי המשימה
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Manager',
        default: null
    },
    // קישור לפנייה (לא חובה) - למשל "לחזור לרחל כהן"
    contact: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contact',
        default: null
    },
    // מי יצר - מהטוקן
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Manager',
        required: true
    }
}, { timestamps: true })

// חיפושים נפוצים: לפי מצב ולפי תאריך יעד
taskSchema.index({ status: 1, dueDate: 1 })

module.exports = mongoose.model('Task', taskSchema)
module.exports.TASK_STATUSES = TASK_STATUSES