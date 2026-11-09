// ניהול רשימות הנמענים של כל הטבה: מי מקבל מייל כשמגיעה פניה על ההטבה.
// לפאנל הניהול בלבד (הראוט מוגן ב-verifyJWT, ראי routes/benefitNotificationRoute.js)
const mongoose = require('mongoose')
const BenefitNotification = require('../../models/BenefitNotification')
const BenefitDefi = require('../../models/BenefitDefi')
const CustomerBenefit = require('../../models/CustomerBenefit')

// לעמוד ההטבות בפאנל: כל ההטבות שבקטלוג, ולכל אחת - רשימת המיילים שלה (אם יש) וכמה לקוחות ביקשו אותה.
// alwaysTo - מי מקבל תמיד את כל הבקשות (MAIL_TO מהשרת). מוצג בפאנל כשורה נעולה
const getOverview = async (req, res) => {
    try {
        const [benefits, lists] = await Promise.all([
            BenefitDefi.find({}, 'IDBenefit nameCompany levelOfBuilder').sort({ createdAt: 1 }).lean(),
            BenefitNotification.find().lean()
        ])
        const listByBenefit = new Map(lists.map((l) => [String(l.benefit), l]))

        const result = await Promise.all(benefits.map(async (b) => {
            const list = listByBenefit.get(String(b._id))
            return {
                _id: b._id,
                IDBenefit: b.IDBenefit,
                nameCompany: b.nameCompany,
                levelOfBuilder: b.levelOfBuilder,
                requests: await CustomerBenefit.countDocuments({ 'benefits.IDBenefit': b.IDBenefit }),
                notification: list ? { _id: list._id, recipients: list.recipients, isActive: list.isActive } : null
            }
        }))

        const alwaysTo = (process.env.MAIL_TO || '').split(',').map((a) => a.trim()).filter(Boolean)
        res.json({ alwaysTo, benefits: result })
    }
    catch (error) {
        console.error('getOverview:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

// GET /api/benefit-notifications/requests
// כל הבקשות להטבות: שורה לכל לקוח+הטבה (לקוח שביקש שתי הטבות = שתי שורות), מהחדש לישן
const getRequests = async (req, res) => {
    try {
        const customers = await CustomerBenefit.find().lean()
        const rows = customers.flatMap((c) => c.benefits.map((b) => ({
            _id: `${c._id}-${b.IDBenefit}`,
            customerId: c._id,
            name: c.nameCustomer,
            phone: c.Phone,
            email: c.email,
            IDBenefit: b.IDBenefit,
            nameCompany: b.nameCompany,
            levelOfBuilder: b.levelOfBuilder,
            date: b.createdAt || c.createdAt, // מתי ביקש את ההטבה הזו
        })))
        rows.sort((a, b) => new Date(b.date) - new Date(a.date))
        res.json(rows)
    }
    catch (error) {
        console.error('getRequests:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

const getAllNotifications = async (req, res) => {
    try {
        const notifications = await BenefitNotification.find()
        if (!notifications.length) {
            return res.status(404).json({ message: 'no notifications found' })
        }
        res.json(notifications)
    }
    catch (error) {
        console.error('getAllNotifications:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

const getOneNotification = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: 'invalid id' })
        }
        const notification = await BenefitNotification.findById(id)
            
        if (!notification) {
            return res.status(404).json({ message: 'no notification found' })
        }
        res.json(notification)
    }
    catch (error) {
        console.error('getOneNotification:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

const addNotification = async (req, res) => {
    try {
        const { benefit, recipients, isActive } = req.body
        if (!benefit || !Array.isArray(recipients) || recipients.length === 0) {
            return res.status(400).json({ message: 'benefit and at least one recipient are required' })
        }
        if (isActive !== undefined && typeof isActive !== 'boolean') {
            return res.status(400).json({ message: 'isActive must be true or false' })
        }
        if (recipients.some(r => !r || !r.email)) {
            return res.status(400).json({ message: 'every recipient must have an email' })
        }

        //ההטבה חייבת להיות קיימת. אפשר לשלוח את הקוד הקריא שלה (למשל "negev") או את ה-_id שלה
        const benefitDoc = mongoose.isValidObjectId(benefit)
            ? await BenefitDefi.findById(benefit, '_id').lean()
            : await BenefitDefi.findOne({ IDBenefit: String(benefit).trim() }, '_id').lean()
        if (!benefitDoc) {
            return res.status(404).json({ message: 'benefit not found' })
        }
        //לכל הטבה יש רשימה אחת בלבד
        const alreadyExists = await BenefitNotification.exists({ benefit: benefitDoc._id })
        if (alreadyExists) {
            return res.status(409).json({ message: 'this benefit already has a recipients list, update it instead' })
        }

        //לוקחים רק את השדות שמותר לשמור, ולא כל מה שנשלח
        const newNotification = await BenefitNotification.create({
            benefit: benefitDoc._id,
            recipients: recipients.map(r => ({ name: r.name, email: r.email })),
            isActive
        })
        res.status(201).json(newNotification)
    }
    catch (error) {
        //מייל לא תקין או מייל כפול ברשימה - הבדיקות של הסכמה
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation errors', errors: Object.values(error.errors).map(e => e.message) })
        }
      
        console.error('addNotification:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

const updateNotification = async (req, res) => {
    try {
        const { id, recipients, isActive } = req.body
        if (!id || (recipients === undefined && isActive === undefined)) {
            return res.status(400).json({ message: 'id and recipients or isActive are required' })
        }
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: 'invalid id' })
        }
        if (recipients !== undefined && (!Array.isArray(recipients) || recipients.some(r => !r || !r.email))) {
            return res.status(400).json({ message: 'recipients must be a list and every recipient must have an email' })
        }
        if (isActive !== undefined && typeof isActive !== 'boolean') {
            return res.status(400).json({ message: 'isActive must be true or false' })
        }

        const notification = await BenefitNotification.findById(id)
        if (!notification) {
            return res.status(404).json({ message: 'This ID does not exist' })
        }

        //מעדכנים רק את מה שנשלח. את ההטבה עצמה לא משנים: רשימה שייכת תמיד לאותה הטבה
        if (recipients !== undefined) {
            notification.recipients = recipients.map(r => ({ name: r.name, email: r.email }))
        }
        if (isActive !== undefined) {
            notification.isActive = isActive
        }

        //save מריץ את כל הבדיקות של הסכמה
        const updatedNotification = await notification.save()
        res.json({ message: 'notification updated successfully', data: updatedNotification })
    }
    catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation errors', errors: Object.values(error.errors).map(e => e.message) })
        }
        console.error('updateNotification:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

const deleteNotification = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: 'invalid id' })
        }
        const notification = await BenefitNotification.findById(id)
        if (!notification) {
            return res.status(404).json({ message: 'no notification found' })
        }

        await notification.deleteOne()
        res.json({ message: 'notification deleted' })
    }
    catch (error) {
        console.error('deleteNotification:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

//הוספת מייל אחד לרשימה קיימת
const addRecipient = async (req, res) => {
    try {
        const { id } = req.params
        const { name, email } = req.body
        if (!email) {
            return res.status(400).json({ message: 'email is required' })
        }
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: 'invalid id' })
        }

        const notification = await BenefitNotification.findById(id)
        if (!notification) {
            return res.status(404).json({ message: 'This ID does not exist' })
        }

        //בודקים כפילות כאן כדי להחזיר הודעה ברורה (הסכמה בודקת את זה גם בשמירה)
        const cleanEmail = String(email).trim().toLowerCase()
        if (notification.recipients.some(r => r.email === cleanEmail)) {
            return res.status(409).json({ message: `${cleanEmail} is already in the list` })
        }

        notification.recipients.push({ name, email: cleanEmail })
        //save מריץ את כל הבדיקות של הסכמה, כולל מייל תקין
        const updatedNotification = await notification.save()
        res.status(201).json({ message: `${cleanEmail} added to the list`, data: updatedNotification })
    }
    catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation errors', errors: Object.values(error.errors).map(e => e.message) })
        }
        console.error('addRecipient:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

//הסרת מייל אחד מהרשימה
const removeRecipient = async (req, res) => {
    try {
        const { id, email } = req.params
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: 'invalid id' })
        }

        const notification = await BenefitNotification.findById(id)
        if (!notification) {
            return res.status(404).json({ message: 'This ID does not exist' })
        }

        const cleanEmail = String(email).trim().toLowerCase()
        const before = notification.recipients.length
        notification.recipients = notification.recipients.filter(r => r.email !== cleanEmail)
        if (notification.recipients.length === before) {
            return res.status(404).json({ message: `${cleanEmail} is not in the list` })
        }

        const updatedNotification = await notification.save()
        res.json({ message: `${cleanEmail} removed from the list`, data: updatedNotification })
    }
    catch (error) {
        console.error('removeRecipient:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

module.exports = {
    getOverview,
    getRequests,
    getAllNotifications,
    getOneNotification,
    addNotification,
    updateNotification,
    addRecipient,
    removeRecipient,
    deleteNotification
}

