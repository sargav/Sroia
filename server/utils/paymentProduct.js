// לאיזה מוצר שייך תשלום, לפי השם שמגיע מ-Cardcom.
// שם המצפן ב-Cardcom הוא למשל "המצפן לבונה- בית בשתי ידיים", לכן בודקים קודם "מצפן"
const productOf = (payment) => {
    const name = payment.productName || ''
    if (name.includes('מצפן')) return 'compass'
    return 'course'
}

module.exports = productOf
