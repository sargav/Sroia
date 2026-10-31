// שליחת מיילים על בקשת הטבה חדשה, דרך Resend
// המנהל (MAIL_TO) מקבל מייל אחד עם כל ההטבות שהלקוח בחר.
// מנהלי החנות של כל הטבה מקבלים מייל נפרד, רק על ההטבה שלהם,
// כך שחנות אחת לא רואה אילו הטבות נוספות הלקוח ביקש ולא את המיילים של חנויות אחרות.
const BenefitNotification = require('../models/BenefitNotification')

const { escapeHtml, row, formatDate } = require('./emailHelpers')

const layout = (title, subtitle, rows) => `
    <div dir="rtl" style="font-family:Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #E2E6DE;border-radius:8px;overflow:hidden">
        <div style="background:#1F2E18;color:#fff;padding:16px 20px;font-size:18px;font-weight:bold">
            ${title}
            <div style="color:#9ED164;font-size:14px;font-weight:normal;margin-top:4px">${escapeHtml(subtitle)}</div>
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:15px">${rows}</table>
        <div style="background:#F4F6F2;color:#777;padding:12px 20px;font-size:13px;line-height:1.6">
            הודעה זו נשלחה אוטומטית מדף הנחיתה של ההטבות של "בית בשתי ידיים" בשיתוף עם הנגב.<br>
            כדי לענות ללקוח, פשוט לוחצים "השב" והתשובה תגיע ישירות אליו.
        </div>
    </div>`

const resendPost = async (path, body) => {
    const response = await fetch(`https://api.resend.com${path}`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.WEB_SROIA}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    if (!response.ok) {
        const details = await response.text()
        throw new Error(`Resend error ${response.status}: ${details}`)
    }
}

// customer: { name, phone, email, levelOfBuilder }
// benefits: מסמכי BenefitDefi מהקטלוג (עם _id), רק ההטבות שנוספו בבקשה הזו
const sendBenefitEmails = async (customer, benefits) => {
    const { WEB_SROIA, MAIL_FROM, MAIL_TO } = process.env
    if (!WEB_SROIA || !MAIL_FROM || !MAIL_TO) {
        console.warn('שליחת מייל הטבה דולגה: חסרים WEB_SROIA / MAIL_FROM / MAIL_TO')
        return
    }

    const date = formatDate()
    const customerRows =
        row('שם', escapeHtml(customer.name)) +
        row('טלפון', `<a href="tel:${escapeHtml(customer.phone)}">${escapeHtml(customer.phone)}</a>`) +
        row('אימייל', `<a href="mailto:${escapeHtml(customer.email)}">${escapeHtml(customer.email)}</a>`) +
        row('שלב בנייה', escapeHtml(customer.levelOfBuilder)) +
        row('התקבלה', escapeHtml(date))

    // רשימות הנמענים של ההטבות שנבחרו: רק פעילות ורק כאלה שיש בהן נמענים
    const lists = await BenefitNotification.find({
        benefit: { $in: benefits.map((b) => b._id) },
        isActive: true
    }).lean()
    const recipientsByBenefit = new Map(
        lists
            .filter((list) => list.recipients.length > 0)
            .map((list) => [String(list.benefit), list.recipients])
    )

    // 1: מייל למנהל עם כל ההטבות, ולידן למי עוד נשלח
    const benefitsHtml = benefits.map((b) => {
        const recipients = recipientsByBenefit.get(String(b._id))
        const sentTo = recipients ? `נשלח גם אל: ${recipients.map((r) => r.email).join(', ')}` : 'לא נשלח למנהלי חנות'
        return `<div>${escapeHtml(b.nameCompany)} <span style="color:#777;font-size:13px">(${escapeHtml(sentTo)})</span></div>`
    }).join('')

    // נשלח לבד ולפני השאר, כדי שהמנהל יקבל את הפנייה גם אם המיילים לחנויות נכשלים
    await resendPost('/emails', {
        from: MAIL_FROM,
        to: MAIL_TO.split(',').map((address) => address.trim()),
        reply_to: customer.email,
        subject: `בקשת הטבה חדשה: ${customer.name}`,
        html: layout('בקשת הטבה חדשה מהאתר', `${benefits.length} הטבות`, customerRows + row('הטבות', benefitsHtml))
    })

    // 2: מייל נפרד לכל הטבה, רק למנהלי החנות שלה
    const storeEmails = benefits
        .filter((b) => recipientsByBenefit.has(String(b._id)))
        .map((b) => ({
            from: MAIL_FROM,
            to: recipientsByBenefit.get(String(b._id)).map((r) => r.email),
            reply_to: customer.email, // "השב" עונה ישירות ללקוח
            subject: `לקוח חדש מעוניין בהטבה: ${b.nameCompany}`,
            html: layout('לקוח חדש מעוניין בהטבה שלכם', b.nameCompany, customerRows)
        }))

    // כל המיילים לחנויות בבקשה אחת (Resend batch, עד 100 מיילים),
    // כדי לא לחרוג ממגבלת מספר הבקשות לשנייה כשלקוח בוחר כמה הטבות
    if (storeEmails.length > 0) {
        await resendPost('/emails/batch', storeEmails)
    }
}

module.exports = sendBenefitEmails