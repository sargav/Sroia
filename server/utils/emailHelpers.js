// כלים משותפים לשליחת מיילי התראה דרך Resend (שליחה ב-HTTPS, בלי SMTP)
// משתני סביבה נדרשים (בקובץ .env מקומית, וב-Render תחת Environment):
//   WEB_SROIA - המפתח מ-Resend
//   MAIL_FROM - הכתובת שממנה נשלח המייל, על הדומיין המאומת. לדוגמה: אתר סרויה <noreply@your-domain.co.il>
//   MAIL_TO   - לאן לשלוח את ההתראה. אפשר כמה כתובות מופרדות בפסיק

// מונע מקוד HTML שמישהו הקליד בטופס להשפיע על המייל
const escapeHtml = (value) =>
    String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')

// שורה אחת בטבלת הפרטים שבמייל
const row = (label, value) => `
    <tr>
        <td style="padding:8px 12px;font-weight:bold;color:#1C2418;white-space:nowrap;vertical-align:top">${label}</td>
        <td style="padding:8px 12px;color:#333">${value}</td>
    </tr>`

// תאריך ושעה בפורמט ישראלי
const formatDate = (date) =>
    new Date(date || Date.now()).toLocaleString('he-IL', { timeZone: 'Asia/Jerusalem' })

// המסגרת של המייל: כותרת ירוקה כהה ומתחתיה טבלת הפרטים
const emailLayout = (title, subtitle, rows) => `
    <div dir="rtl" style="font-family:Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #E2E6DE;border-radius:8px;overflow:hidden">
        <div style="background:#1F2E18;color:#fff;padding:16px 20px;font-size:18px;font-weight:bold">
            ${title}
            <div style="color:#9ED164;font-size:14px;font-weight:normal;margin-top:4px">${subtitle}</div>
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:15px">
            ${rows}
        </table>
    </div>`

// שליחת המייל עצמו. אם ההגדרות חסרות - לא מפילים את השרת, רק כותבים ללוג
const sendEmail = async ({ subject, html, replyTo }) => {
    const { WEB_SROIA, MAIL_FROM, MAIL_TO } = process.env

    if (!WEB_SROIA || !MAIL_FROM || !MAIL_TO) {
        console.warn('שליחת מייל דולגה: חסרים WEB_SROIA / MAIL_FROM / MAIL_TO')
        return
    }

    const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${WEB_SROIA}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            from: MAIL_FROM,
            to: MAIL_TO.split(',').map((address) => address.trim()),
            reply_to: replyTo, // "השב" במייל עונה ישירות למי שפנה
            subject,
            html
        })
    })

    if (!response.ok) {
        const details = await response.text()
        throw new Error(`Resend error ${response.status}: ${details}`)
    }
}

module.exports = { escapeHtml, row, formatDate, emailLayout, sendEmail }
