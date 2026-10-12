// שליחת מייל התראה על כל פנייה חדשה מהאתר, דרך Resend (שליחה ב-HTTPS, בלי SMTP)
// משתני סביבה נדרשים (בקובץ .env מקומית, וב-Render תחת Environment):
//   RESEND_API_KEY - המפתח מ-Resend
//   MAIL_FROM      - הכתובת שממנה נשלח המייל, על הדומיין המאומת. לדוגמה: אתר סרויה <noreply@your-domain.co.il>
//   MAIL_TO        - לאן לשלוח את ההתראה. אפשר כמה כתובות מופרדות בפסיק

// שמות המקורות בעברית, כדי שבמייל יהיה ברור מאיזה טופס הגיעה הפנייה
const sourceLabels = {
    main_contact: 'טופס צור קשר באתר',
    builder_guide: 'הורדת המדריך לבונה',
    project_mgmt: 'בקשת הצעת מחיר - ניהול פרויקטים',
    compass_app: 'אפליקציית המצפן לבונה'
}

// מונע מקוד HTML שמישהו הקליד בטופס להשפיע על המייל
const escapeHtml = (value) =>
    String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')

const row = (label, value) => `
    <tr>
        <td style="padding:8px 12px;font-weight:bold;color:#1C2418;white-space:nowrap;vertical-align:top">${label}</td>
        <td style="padding:8px 12px;color:#333">${value}</td>
    </tr>`

const sendContactEmail = async (contact) => {
    const { RESEND_API_KEY, MAIL_FROM, MAIL_TO } = process.env

    // אם ההגדרות חסרות, לא מפילים את השרת - רק כותבים ללוג
    if (!RESEND_API_KEY || !MAIL_FROM || !MAIL_TO) {
        console.warn('שליחת מייל דולגה: חסרים RESEND_API_KEY / MAIL_FROM / MAIL_TO')
        return
    }

    const source = sourceLabels[contact.source] || contact.source
    const date = new Date(contact.createdAt || Date.now()).toLocaleString('he-IL', { timeZone: 'Asia/Jerusalem' })
    const message = escapeHtml(contact.message).replace(/\n/g, '<br>') || '—'

    const html = `
    <div dir="rtl" style="font-family:Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #E2E6DE;border-radius:8px;overflow:hidden">
        <div style="background:#1F2E18;color:#fff;padding:16px 20px;font-size:18px;font-weight:bold">
            פנייה חדשה מהאתר
            <div style="color:#9ED164;font-size:14px;font-weight:normal;margin-top:4px">${escapeHtml(source)}</div>
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:15px">
            ${row('שם', escapeHtml(contact.name))}
            ${row('טלפון', `<a href="tel:${escapeHtml(contact.phone)}">${escapeHtml(contact.phone)}</a>`)}
            ${row('אימייל', `<a href="mailto:${escapeHtml(contact.email)}">${escapeHtml(contact.email)}</a>`)}
            ${row('הודעה', message)}
            ${row('התקבלה', escapeHtml(date))}
        </table>
    </div>`

    const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            from: MAIL_FROM,
            to: MAIL_TO.split(',').map((address) => address.trim()),
            reply_to: contact.email, // "השב" במייל עונה ישירות למי שפנה
            subject: `פנייה חדשה מהאתר: ${contact.name} (${source})`,
            html
        })
    })

    if (!response.ok) {
        const details = await response.text()
        throw new Error(`Resend error ${response.status}: ${details}`)
    }
}

module.exports = sendContactEmail
