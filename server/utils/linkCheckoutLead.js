const CheckoutLead = require('../models/CheckoutLead')
const Payment = require('../models/Payment')
const productOf = require('./paymentProduct')

// כמה זמן אחורה מחפשים טופס שמתאים לתשלום
const MATCH_WINDOW_MS = 7 * 24 * 60 * 60 * 1000

// טלפון בצורה אחידה: ספרות בלבד, ו-972 בהתחלה הופך ל-0
const normalizePhone = (phone) => String(phone || '').replace(/\D/g, '').replace(/^972/, '0')

const unique = (list) => [...new Set(list.filter(Boolean))]

// מסמן את הטופס המתאים האחרון כ"שילם" ומחזיר אותו (או null אם לא נמצא).
// עדכון אטומי, כדי ששני תשלומים לא יתחברו לאותו טופס
const claimLead = (filter, paymentId) =>
    CheckoutLead.findOneAndUpdate(filter, { status: 'paid', payment: paymentId }, { sort: { updatedAt: -1 } })

// מחבר תשלום לטופס שמולא לפניו: קודם לפי מייל ומוצר, ואם לא נמצא - לפי טלפון ומוצר.
// כישלון כאן לא מפיל את ההודעה מ-Cardcom: התשלום כבר שמור
const linkPaymentToLead = async (payment, { emails = [], phones = [] }) => {
    try {
        const base = {
            product: productOf(payment),
            status: 'started',
            updatedAt: { $gte: new Date(Date.now() - MATCH_WINDOW_MS) },
        }
        const cleanEmails = unique(emails.map((e) => String(e || '').trim().toLowerCase()))
        const cleanPhones = unique(phones.map(normalizePhone)).filter((p) => p.length >= 9)

        let lead = null
        if (cleanEmails.length > 0) {
            lead = await claimLead({ ...base, email: { $in: cleanEmails } }, payment._id)
        }
        if (!lead && cleanPhones.length > 0) {
            lead = await claimLead({ ...base, phone: { $in: cleanPhones } }, payment._id)
        }

        const update = lead ? { checkoutLead: lead._id, linkStatus: 'linked' } : { linkStatus: 'unlinked' }
        await Payment.updateOne({ _id: payment._id }, update)
        if (!lead) console.warn('Cardcom notify: לא נמצא טופס שמתאים לתשלום', payment.internalDealNumber)
    } catch (error) {
        console.error('שגיאה בקישור תשלום לטופס:', error.message)
    }
}

module.exports = { linkPaymentToLead, normalizePhone }
