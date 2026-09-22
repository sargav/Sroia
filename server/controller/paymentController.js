const checking = require('../functionChecking/functionChecking')
const axios = require('axios')

const tryPay=async (req, res) => {
    const {userName,email,phone,aprove}=req.body
    if(!userName || !email || !phone || !aprove){
        return res.status(400).json({message:"Please fill all the fields"})
    }
    //בדיקות תקינות
    const errors={}
    const OKphon=checking.isValidPhone(phone)
    if(!OKphon){
        errors.phone="Invalid phone number"
    }
    const OKname=checking.isValidName(userName)
    if(!OKname){
        errors.name="Invalid name"
    }
    const OKemail=checking.isValidEmail(email)
    if(!OKemail){
        errors.email="Invalid email"
    }
    if(!aprove){
        errors.aprove="You must agree to the terms"
    }
    if(Object.keys(errors).length>0){
        return res.status(400).json({message:"Invalid input data",errors})
    }

try {
        const cardcomResponse = await axios.post(
            'https://secure.cardcom.solutions/api/v11/LowProfile/Create',
            {
                TerminalNumber: process.env.CARDCOM_TERMINAL,
                ApiName: process.env.CARDCOM_API_NAME,
                Operation: "ChargeOnly", // או "ChargeAndCreateToken" אם רוצים לשמור אמצעי תשלום
                ReturnValue: email, // מזהה פנימי - אפשר להחליף במזהה הזמנה אמיתי
                Amount: req.body.amount, // ודאי שהסכום מגיע מהבקשה או מוגדר בשרת
                SuccessRedirectUrl: "https://האתר-שלך.com/payment-success",
                FailedRedirectUrl: "https://האתר-שלך.com/payment-failed",
                WebHookUrl: "https://האתר-שלך.com/api/payment-webhook",
                Document: {
                    Name: userName,
                    Email: email,
                    Phone: phone
                }
            }
        )

        const { ResponseCode, Url, Description } = cardcomResponse.data

        if (ResponseCode !== 0) {
            // ResponseCode 0 = הצלחה ביצירת הלינק (לא בעסקה עצמה!)
            return res.status(400).json({ message: "Error creating payment link", details: Description })
        }

        // מחזירים ל-React רק את הלינק - לא שום פרט רגיש
        return res.status(200).json({ paymentUrl: Url })

    } catch (error) {
        console.error(error?.response?.data || error.message)
        return res.status(500).json({ message: "Server error while creating payment" })
    }
}

module.exports = { tryPay }