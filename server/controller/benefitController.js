const Benefit = require('../models/Benefit');
const checking=require('../functionChecking/functionChecking')

const validLevels = ["תכנון ורישוי", "ביצוע שלד", "ביצוע גמרים", "לקראת אכלוס"];

const addBenefit = async (req, res) => {
    try{
        const {name,phone,email,levelOfBuilder,benefits}=req.body;
        if(!name || !phone || !email || !levelOfBuilder || !benefits){
            return res.status(400).json({ message: 'Missing required fields' });
        }

        //בדיקות תקינות עבור שם,מייל,טלפון,שלב בניה
        const errors={
            name: checking.checkName(name),
            phone: checking.checkPhone(phone),
            email: checking.checkEmail(email),
            levelOfBuilder:validLevels.includes(levelOfBuilder) ? null : 'Invalid level of builder'
        }
        //בדיקה שכל הערכים הלאה תקינים
        if(Object.values(errors).length>0){
            return res.status(400).json({ message: 'Validation errors', errors });
        }
        //אם הכל תקין, נמשיך ונבדוק את ההטבות שהלקוח בחר
        
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//דבר ראשון הופכים את כל המערך שקיבלנו למערך של אובייקטים שבודקים עם כל לולאה שהכל תקין
//צריך לעשות בדיקות בהטבה עבור הלקוח- 1:אם זה הטבה חוקית
//2:אם כבר קיימת הטבה כזו עבור הלקוח    
//גם צריך לבדוק שקיימת לפחות הטבה אחת שהלקוח סימן ובחר-שזה בעצם הבדיקה שבדקנו שזה לא ריק