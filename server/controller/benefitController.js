const CustomerBenefit = require('../models/CustomerBenefit');
const BenefitDefi = require('../models/BenefitDefi');
const { BUILD_LEVELS } = require('../models/benefitSchema');
const checking = require('../functionChecking/functionChecking');

// הוספת הטבות ללקוח.
// גוף הבקשה: { name, phone, email, levelOfBuilder, benefits }
// benefits = מערך של מזהי הטבות (IDBenefit) מתוך הקטלוג BenefitDefi
const addBenefit = async (req, res) => {
    try {
        const { name, phone, email, levelOfBuilder, benefits } = req.body;

        // בדיקה שכל השדות הגיעו, וגם שהלקוח סימן לפחות הטבה אחת
        if (!name || !phone || !email || !levelOfBuilder || !Array.isArray(benefits) || benefits.length === 0) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // בדיקות תקינות עבור שם, טלפון, מייל ושלב בנייה.
        // פונקציות הבדיקה מחזירות true כשהערך תקין, ולכן שגיאה = ערך שאינו null
        const errors = {
            name: checking.isValidName(String(name).trim()) ? null : 'Invalid name',
            phone: checking.isValidPhone(String(phone)) ? null : 'Invalid phone number',
            email: checking.isValidEmail(String(email)) ? null : 'Invalid email',
            levelOfBuilder: BUILD_LEVELS.includes(levelOfBuilder) ? null : 'Invalid level of builder'
        };
        if (Object.values(errors).some(err => err !== null)) {
            return res.status(400).json({ message: 'Validation errors', errors });
        }

        // בדיקה 1: כל הטבה שנשלחה קיימת בקטלוג (הסרת כפילויות לפני כן)
        const requestedIds = [...new Set(benefits.map(id => String(id).trim()))];
        const catalog = await BenefitDefi.find({ IDBenefit: { $in: requestedIds } });
        const foundIds = catalog.map(b => b.IDBenefit);
        const invalidIds = requestedIds.filter(id => !foundIds.includes(id));
        if (invalidIds.length > 0) {
            return res.status(400).json({ message: 'Invalid benefits', invalidBenefits: invalidIds });
        }

        // הופכים את מערך המזהים למערך של אובייקטי הטבה.
        // שם החברה נלקח מהקטלוג (לא סומכים על מה שהגיע מהלקוח),
        // ושלב הבנייה הוא השלב שהלקוח בחר בטופס בזמן הבקשה
        const newBenefits = catalog.map(b => ({
            nameCompany: b.nameCompany,
            IDBenefit: b.IDBenefit,
            levelOfBuilder
        }));

        const cleanPhone = String(phone).replace(/\D/g, '');
        const cleanEmail = String(email).trim().toLowerCase();

        // לקוח חדש - יוצרים אותו יחד עם ההטבות
        const customer = await CustomerBenefit.findOne({ $or: [{ Phone: cleanPhone }, { email: cleanEmail }] });
        if (!customer) {
            const newCustomer = await CustomerBenefit.create({
                nameCustomer: String(name).trim(),
                Phone: cleanPhone,
                email: cleanEmail,
                benefits: newBenefits
            });
            return res.status(201).json({ message: 'Benefits added successfully', data: newCustomer });
        }

        // בדיקה 2: לקוח קיים - מוסיפים רק הטבות שעוד אין לו
        const existingIds = customer.benefits.map(b => b.IDBenefit);
        const toAdd = newBenefits.filter(b => !existingIds.includes(b.IDBenefit));
        if (toAdd.length === 0) {
            return res.status(409).json({ message: 'Customer already has these benefits' });
        }
        customer.benefits.push(...toAdd);
        await customer.save();
        return res.status(200).json({ message: 'Benefits added successfully', data: customer });
    }
    catch (error) {
        console.error('שגיאה בהוספת הטבה:', error.message);
        return res.status(500).json({ message: 'An error occurred while adding the benefit' });
    }
};

module.exports = { addBenefit };
