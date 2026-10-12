// קבלת הודעה מ-Cardcom על כל תשלום בדפי אישורית זהב (Notify URL / Webhook).
//
// איך זה עובד:
// 1. Cardcom שולחים POST לכתובת הזו אחרי כל עסקה.
// 2. לא סומכים על מה שהגיע (כל אחד יכול לשלוח POST לכתובת).
//    לוקחים רק את מספר העסקה, ושואלים את Cardcom בעצמנו אם העסקה קיימת ואושרה.
// 3. רק אם Cardcom מאשרים - שומרים את התשלום ב-MongoDB.
//
// משתני סביבה (ב-Render, תחת Environment של השרת):
//   CARDCOM_TERMINAL      - מספר הטרמינל (150487)
//   CARDCOM_API_NAME      - שם המשתמש ל-API
//   CARDCOM_API_PASSWORD  - הסיסמה של מפתח ה-API
//   CARDCOM_NOTIFY_KEY    - מילת קוד שמוסיפים לסוף הכתובת ב-Cardcom (?key=...), כדי לסנן בקשות זבל

const axios = require('axios')
const Payment = require('../models/Payment')

const CARDCOM_TX_INFO = 'https://secure.cardcom.solutions/api/v11/Transactions/GetTransactionInfoById'

// Cardcom שולחים שמות שדות באותיות גדולות וקטנות מעורבבות. מחפשים בלי תלות בזה
const pick = (body, name) => {
    const key = Object.keys(body).find((k) => k.toLowerCase() === name.toLowerCase())
    return key ? String(body[key]).trim() : ''
}

const cardcomNotify = async (req, res) => {
    const { CARDCOM_TERMINAL, CARDCOM_API_NAME, CARDCOM_API_PASSWORD, CARDCOM_NOTIFY_KEY } = process.env

    // מילת הקוד יכולה להגיע אחרי ?key= או בתוך הכתובת: /cardcom-notify/<מילת הקוד>
    const givenKey = req.params.key || req.query.key
    const body = { ...req.query, ...(req.body || {}) }
    const dealNumber = pick(body, 'internaldealnumber')
    // שורה בלוג על כל הודעה שמגיעה, כדי שאפשר יהיה לראות ב-Render שההודעה הגיעה
    console.log('Cardcom notify התקבל:', {
        deal: dealNumber || '(אין)',
        responsecode: pick(body, 'responsecode') || '(אין)',
        product: pick(body, 'ProdName') || '(אין)',
        keyOk: !CARDCOM_NOTIFY_KEY || givenKey === CARDCOM_NOTIFY_KEY,
    })

    // מילת הקוד בכתובת
    if (CARDCOM_NOTIFY_KEY && givenKey !== CARDCOM_NOTIFY_KEY) {
        console.warn('Cardcom notify: מילת הקוד בכתובת לא תואמת ל-CARDCOM_NOTIFY_KEY')
        return res.sendStatus(403)
    }

    // הודעה בלי מספר עסקה, או עסקה שנכשלה - אין מה לשמור. מחזירים 200 כדי ש-Cardcom לא ינסו שוב
    if (!dealNumber || pick(body, 'responsecode') !== '0') {
        return res.sendStatus(200)
    }

    if (!CARDCOM_TERMINAL || !CARDCOM_API_NAME || !CARDCOM_API_PASSWORD) {
        console.error('Cardcom notify: חסרים CARDCOM_TERMINAL / CARDCOM_API_NAME / CARDCOM_API_PASSWORD')
        return res.sendStatus(500)
    }

    try {
        // אותה עסקה כבר נשמרה (Cardcom שלחו שוב)
        if (await Payment.exists({ internalDealNumber: dealNumber })) {
            return res.sendStatus(200)
        }

        // הבדיקה האמיתית: שואלים את Cardcom על העסקה
        const { data: tx } = await axios.post(CARDCOM_TX_INFO, {
            TerminalNumber: Number(CARDCOM_TERMINAL),
            UserName: CARDCOM_API_NAME,
            UserPassword: CARDCOM_API_PASSWORD,
            InternalDealNumber: Number(dealNumber),
        }, { timeout: 15000 })

        const verified =
            tx?.ResponseCode === 0 &&
            String(tx.TerminalNumber) === String(CARDCOM_TERMINAL) &&
            !tx.IsRefund

        if (!verified) {
            console.warn('Cardcom notify: העסקה לא אומתה', dealNumber, tx?.ResponseCode, tx?.Description)
            return res.sendStatus(200)
        }

        console.log('Cardcom notify: עסקה אומתה ונשמרת', dealNumber)
        await Payment.create({
            internalDealNumber: dealNumber,
            productName: pick(body, 'ProdName') || pick(body, 'GroupDescription'),
            productGroupId: pick(body, 'ProdGroupID'),
            amount: Number(tx.Amount),
            numberOfPayments: Number(tx.NumberOfPayments) || 1,
            couponNumber: tx.CouponNumber || pick(body, 'CouponNumber') || undefined,
            name: tx.CardOwnerName || pick(body, 'CardOwnerName'),
            email: tx.CardOwnerEmail || pick(body, 'UserEmail'),
            phone: tx.CardOwnerPhone || pick(body, 'CardOwnerPhone'),
            approvalNumber: tx.ApprovalNumber ? String(tx.ApprovalNumber) : pick(body, 'ApprovelNumber'),
            invoiceNumber: tx.DocumentNumber ? String(tx.DocumentNumber) : pick(body, 'invoicenumber'),
            dealDate: tx.CreateDate ? new Date(tx.CreateDate) : new Date(),
        })

        return res.sendStatus(200)
    } catch (error) {
        // שתי הודעות זהות שהגיעו בדיוק באותו רגע - השנייה נחסמת כאן, וזה בסדר
        if (error?.code === 11000) return res.sendStatus(200)
        console.error('Cardcom notify: שגיאה', error?.response?.data || error.message)
        // 500 = Cardcom ינסו לשלוח שוב מאוחר יותר
        return res.sendStatus(500)
    }
}

module.exports = { cardcomNotify }
