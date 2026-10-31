// שליחת מייל התראה על כל פנייה חדשה מהאתר
// (ההגדרות והשליחה עצמה נמצאות ב-emailHelpers.js)
const { escapeHtml, row, formatDate, emailLayout, sendEmail } = require('./emailHelpers')

// שמות המקורות בעברית, כדי שבמייל יהיה ברור מאיזה טופס הגיעה הפנייה
const sourceLabels = {
    main_contact: 'טופס צור קשר באתר',
    builder_guide: 'הורדת המדריך לבונה',
    project_mgmt: 'בקשת הצעת מחיר - ניהול פרויקטים',
    compass_app: 'אפליקציית המצפן לבונה'
}

const sendContactEmail = async (contact) => {
    const source = sourceLabels[contact.source] || contact.source
    const message = escapeHtml(contact.message).replace(/\n/g, '<br>') || '—'

    const html = emailLayout('פנייה חדשה מהאתר', escapeHtml(source), `
            ${row('שם', escapeHtml(contact.name))}
            ${row('טלפון', `<a href="tel:${escapeHtml(contact.phone)}">${escapeHtml(contact.phone)}</a>`)}
            ${row('אימייל', `<a href="mailto:${escapeHtml(contact.email)}">${escapeHtml(contact.email)}</a>`)}
            ${row('הודעה', message)}
            ${row('התקבלה', escapeHtml(formatDate(contact.createdAt)))}`)

    await sendEmail({
        subject: `פנייה חדשה מהאתר: ${contact.name} (${source})`,
        html,
        replyTo: contact.email
    })
}

module.exports = sendContactEmail
