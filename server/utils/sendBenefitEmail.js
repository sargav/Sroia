// שליחת מייל התראה על כל בקשת הטבה חדשה
// (ההגדרות והשליחה עצמה נמצאות ב-emailHelpers.js)
const { escapeHtml, row, formatDate, emailLayout, sendEmail } = require('./emailHelpers')

// customer = מסמך הלקוח, addedBenefits = רק ההטבות שנוספו בבקשה הזו
const sendBenefitEmail = async (customer, addedBenefits) => {
    const benefitNames = addedBenefits.map((b) => escapeHtml(b.nameCompany)).join('<br>')
    const companies = addedBenefits.map((b) => b.nameCompany).join(', ')

    const html = emailLayout('בקשת הטבה חדשה', escapeHtml(companies), `
            ${row('שם', escapeHtml(customer.nameCustomer))}
            ${row('טלפון', `<a href="tel:${escapeHtml(customer.Phone)}">${escapeHtml(customer.Phone)}</a>`)}
            ${row('אימייל', `<a href="mailto:${escapeHtml(customer.email)}">${escapeHtml(customer.email)}</a>`)}
            ${row('שלב בנייה', escapeHtml(addedBenefits[0]?.levelOfBuilder))}
            ${row('הטבות', benefitNames)}
            ${row('התקבלה', escapeHtml(formatDate()))}`)

    await sendEmail({
        subject: `בקשת הטבה חדשה: ${customer.nameCustomer} (${companies})`,
        html,
        replyTo: customer.email
    })
}

module.exports = sendBenefitEmail
