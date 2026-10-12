// המוצרים שאפשר לשלם עליהם באתר.
// המחיר נקבע כאן, בשרת בלבד. הדפדפן שולח רק את המזהה של המוצר (למשל "course"),
// ולכן אי אפשר לשנות את הסכום מהדפדפן.
// כדי לשנות מחיר: משנים כאן ומעלים את השרת מחדש.

const products = {
    // קורס בית בשתי ידיים (דף /courses -> /pay)
    course: {
        name: 'קורס בית בשתי ידיים',
        price: 1987,          // בשקלים
        maxPayments: 10,      // עד כמה תשלומים הלקוח יכול לבחור בדף התשלום
        requirePhone: true,   // בטופס של הקורס יש שדה טלפון
        resultPath: '/payment-result', // לאן Cardcom מחזירה את הלקוח בסוף
    },
    // המצפן לבונה (דף /application)
    mazpen: {
        name: 'המצפן לבונה - החבילה המלאה',
        price: 297,
        maxPayments: 1,
        requirePhone: false,  // בטופס של המצפן יש רק שם ומייל
        resultPath: '/payment-result',
    },
}

module.exports = products
