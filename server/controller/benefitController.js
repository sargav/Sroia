const mongoose = require('mongoose')
const Benefit = require('../models/Benefit')
const BenefitDefi = require('../models/BenefitDefi')
const checking = require('../functionChecking/functionChecking')
const sendBenefitEmails = require('../utils/sendBenefitEmails')

const validLevels = ["תכנון ורישוי", "ביצוע שלד", "ביצוע גמרים", "לקראת אכלוס"]

const addBenefit = async (req, res) => {
    try {
        const { name, phone, email, levelOfBuilder, benefits } = req.body
        if (!name || !phone || !email || !levelOfBuilder || !Array.isArray(benefits) || benefits.length === 0) {
            return res.status(400).json({ message: 'Missing required fields' })
        }

        //בדיקות תקינות עבור שם,מייל,טלפון,שלב בניה
        const errors = {
            name: checking.isValidName(String(name)) ? null : 'Invalid name',
            phone: checking.isValidPhone(String(phone)) ? null : 'Invalid phone number',
            email: checking.isValidEmail(String(email)) ? null : 'Invalid email',
            levelOfBuilder: validLevels.includes(levelOfBuilder) ? null : 'Invalid level of builder'
        }
        //עוצרים רק אם באמת יש שדה עם שגיאה (ערך שהוא לא null)
        if (Object.values(errors).some(Boolean)) {
            return res.status(400).json({ message: 'Validation errors', errors })
        }

        //1: בדיקה שההטבות שהלקוח בחר הן הטבות אמיתיות שקיימות במסד
        const benefitIds = [...new Set(benefits.map(String))]
        if (!benefitIds.every((id) => mongoose.isValidObjectId(id))) {
            return res.status(400).json({ message: 'Invalid benefit id' })
        }
        const chosenBenefits = await BenefitDefi.find({ _id: { $in: benefitIds } }).lean()
        if (chosenBenefits.length !== benefitIds.length) {
            return res.status(400).json({ message: 'One or more benefits do not exist' })
        }

        //2: בדיקה אם הלקוח כבר ביקש חלק מההטבות האלה בעבר
        const cleanName = String(name).trim()
        const cleanEmail = String(email).trim().toLowerCase()
        const cleanPhone = String(phone).replace(/\D/g, '')

        let customer = await Benefit.findOne({ email: cleanEmail })
        const alreadyHas = new Set((customer?.benefits || []).map((b) => b.IDBenefit))
        const newBenefits = chosenBenefits.filter((b) => !alreadyHas.has(String(b._id)))
        if (newBenefits.length === 0) {
            return res.status(409).json({ message: 'Customer already requested these benefits' })
        }

        const benefitDocs = newBenefits.map((b) => ({
            nameCompany: b.nameCompany,
            IDBenefit: String(b._id),
            levelOfBuilder
        }))

        //לקוח קיים - מוסיפים לו רק את ההטבות החדשות. לקוח חדש - יוצרים אותו
        if (customer) {
            customer.benefits.push(...benefitDocs)
            await customer.save()
        } else {
            customer = await Benefit.create({
                nameCustomer: cleanName,
                Phone: cleanPhone,
                email: cleanEmail,
                benefits: benefitDocs
            })
        }

        // שליחת המיילים. לא מחכים להם, כמו בצור קשר: הבקשה כבר שמורה במסד,
        // ואם המייל נכשל רק נרשמת שגיאה בלוג
        sendBenefitEmails(
            { name: cleanName, phone: cleanPhone, email: cleanEmail, levelOfBuilder },
            newBenefits
        ).catch((err) => console.error('שגיאה בשליחת מיילי הטבה:', err.message))

        return res.status(201).json({ message: 'Benefits added successfully', data: customer })
    }
    catch (error) {
        console.error('שגיאה בהוספת הטבה:', error.message)
        return res.status(500).json({ message: 'An error occurred while adding the benefit' })
    }
}

module.exports = {
    addBenefit
}