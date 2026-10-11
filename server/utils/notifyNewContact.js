// שליחת מייל התראה על פנייה חדשה מהאתר, דרך Resend (https://resend.com)
//
// משתני סביבה (ב-Render ובקובץ .env המקומי):
//   RESEND_API_KEY      - מפתח API מ-Resend
//   NOTIFY_EMAIL_FROM   - הכתובת ששולחת, על הדומיין שאומת ב-Resend
//                         לדוגמה: אתר סרויה <website@sroia.co.il>
//   NOTIFY_EMAIL_TO     - לאן לשלוח את ההתראות. אפשר כמה כתובות, מופרדות בפסיק
//
// אם אחד מהם חסר, לא נשלח מייל - והפנייה עדיין נשמרת כרגיל.

const axios = require('axios')

const SOURCE_NAMES = {
    main_contact: 'טופס צור קשר באתר',
    builder_guide: 'הורדת המדריך לבונה',
    project_mgmt: 'בקשת הצעת מחיר לניהול פרויקט',
    compass_app: 'אפליקציית המצפן לבונה'
}

// מונע מקוד שהגולש הקליד להשתלב בתוך המייל
const escapeHtml = (value) => String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const row = (label, value) => `
    <tr>
        <td style="padding:6px 12px;font-weight:bold;white-space:nowrap;vertical-align:top">${label}</td>
        <td style="padding:6px 12px">${value}</td>
    </tr>`

const notifyNewContact = async (contact) => {
    const { RESEND_API_KEY, NOTIFY_EMAIL_FROM, NOTIFY_EMAIL_TO } = process.env
    if (!RESEND_API_KEY || !NOTIFY_EMAIL_FROM || !NOTIFY_EMAIL_TO) {
        console.warn('Contact email notification skipped: email settings are missing')
        return
    }

    const sourceName = SOURCE_NAMES[contact.source] || contact.source
    const message = escapeHtml(contact.message).replace(/\n/g, '<br>')

    const html = `
        <div dir="rtl" style="font-family:Arial,sans-serif;font-size:15px;color:#222">
            <h2 style="margin:0 0 12px">פנייה חדשה מהאתר</h2>
            <table style="border-collapse:collapse">
                ${row('מקור:', escapeHtml(sourceName))}
                ${row('שם:', escapeHtml(contact.name))}
                ${row('טלפון:', `<a href="tel:${escapeHtml(contact.phone)}">${escapeHtml(contact.phone)}</a>`)}
                ${row('מייל:', `<a href="mailto:${escapeHtml(contact.email)}">${escapeHtml(contact.email)}</a>`)}
                ${message ? row('הודעה:', message) : ''}
            </table>
        </div>`

    await axios.post(
        'https://api.resend.com/emails',
        {
            from: NOTIFY_EMAIL_FROM,
            to: NOTIFY_EMAIL_TO.split(',').map(e => e.trim()).filter(Boolean),
            reply_to: contact.email, // "השב" במייל עונה ישירות לפונה
            subject: `פנייה חדשה מהאתר: ${contact.name} (${sourceName})`,
            html
        },
        {
            headers: { Authorization: `Bearer ${RESEND_API_KEY}` },
            timeout: 10000
        }
    )
}

module.exports = notifyNewContact
