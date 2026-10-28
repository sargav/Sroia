const BenefitDefi = require('../models/BenefitDefi')

// ההטבות שחייבות להיות בקטלוג. כל עוד אין פאנל ניהול, מוסיפים כאן הטבה חדשה.
// IDBenefit הוא המזהה שהאתר שולח לשרת - לא לשנות אותו אחרי שיש לקוחות שבחרו בהטבה.
const DEFAULT_BENEFITS = [
    {
        IDBenefit: 'negev',
        nameCompany: 'נגב קרמיקה',
        levelOfBuilder: 'ביצוע גמרים' // קרמיקה, סניטריה וריצוף שייכים לשלב הגמרים
    }
]

// רץ פעם אחת בעליית השרת, אחרי החיבור למסד הנתונים.
// מוסיף רק הטבות שעוד לא קיימות ($setOnInsert), כך שאם מישהו ישנה הטבה
// ידנית במסד הנתונים (או בעתיד מפאנל הניהול) - השינוי לא יידרס.
const ensureDefaultBenefits = async () => {
    try {
        const result = await BenefitDefi.bulkWrite(
            DEFAULT_BENEFITS.map((benefit) => ({
                updateOne: {
                    filter: { IDBenefit: benefit.IDBenefit },
                    update: { $setOnInsert: benefit },
                    upsert: true
                }
            }))
        )
        if (result.upsertedCount > 0) {
            console.log(`נוספו ${result.upsertedCount} הטבות לקטלוג`)
        }
    } catch (err) {
        // לא מפילים את השרת בגלל זה, רק כותבים ללוג
        console.error('שגיאה בהכנת קטלוג ההטבות:', err.message)
    }
}

module.exports = { ensureDefaultBenefits, DEFAULT_BENEFITS }
