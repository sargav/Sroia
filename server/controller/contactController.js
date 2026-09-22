const Contact = require('../models/Contact');
const checking = require('../functionChecking/functionChecking')
const sources = [
    'main_contact',    // טופס צור קשר מהאתר הראשי
    'builder_guide',  // טופס הורדת המדריך לבונה
    'project_mgmt',   // טופס בקשת הצעת מחיר מניהול פרויקטים
    'compass_app'     // פנייה מתוך אפליקציית המצפן לבונה
]

const addContact = async (req, res) => {
    try {
        //בדיקת תקינות הנתונים
        const { name, email, phone, message, source } = req.body
        if (!name || !email || !phone || !source) {
            return res.status(400).json({ message: "Please fill all the fields" })
        }
        //בדיקת תקינות טלפון      
        const checkedPhone = checking.isValidPhone(phone)
        const cleanPhone = String(phone).replace(/\D/g, '')
        //בדיקת שם
        const checkedName = checking.isValidName(name)
        //בדיקת אימייל
        const checkedEmail = checking.isValidEmail(email)
        //בדיקה האם המקור אחד מהENUM 
        const checkSource = sources.includes(source) ? true : false

        if (checkSource && checkedEmail && checkedName && checkedPhone) {
            //אם הכל תקין יצירת האוביקט במסד נתונים (הוספת await)
            const newContact = await Contact.create({
                name: name.trim(),
                email: email.trim(),
                phone: cleanPhone,
                source,
                message
            });
            return res.status(201).json({ message: "Contact added successfully", data: newContact });
        }

        //אם אחד מהבדיקות נכשלו החזרת שגיאה+מערך של כל השגיאות
        const dataErrors = {
            name: checkedName ? null : "Invalid name",
            email: checkedEmail ? null : "Invalid email",
            phone: checkedPhone ? null : "Invalid phone number",
            source: checkSource ? null : "Invalid source"
        }    
        return res.status(400).json({ message: "Invalid input data" , errors: dataErrors });

    }
    catch (error) {
        return res.status(500).json({ message: "An error occurred while adding the contact" });
    }
}

module.exports = {
    addContact
}