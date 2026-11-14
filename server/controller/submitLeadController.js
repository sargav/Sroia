// POST /api/submit-lead
// נקרא מטופס "המדריך לבונה" באתר (GuidePage.jsx).
// בודק את הפרטים, שומר את הנרשם אצלנו במסד, ומוסיף אותו לרשימת התפוצה ברב מסר.
// רב מסר שולח לנרשם את המדריך במייל.
const GuideSignup = require("../models/GuideSignup");
const checking = require("../functionChecking/functionChecking");
const { addLeadToRavMesser } = require("../utils/ravMesser");

const submitLead = async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ error: "חסרים פרטים בטופס" });
  }
  if (
    typeof name !== "string" || typeof email !== "string" || typeof phone !== "string" ||
    !checking.isValidName(name.trim()) || !checking.isValidEmail(email) || !checking.isValidPhone(phone)
  ) {
    return res.status(400).json({ error: "הפרטים בטופס לא תקינים" });
  }

  // שומרים גם אצלנו, כדי שהמנהל יראה בפאנל מי נרשם למדריך.
  // אם השמירה נכשלת - לא עוצרים את השליחה לרב מסר
  let signup = null;
  try {
    // מי שנרשם שוב עם אותו מייל מעדכן את השורה שלו, בלי כפילות
    signup = await GuideSignup.findOneAndUpdate(
      { email: email.trim().toLowerCase() },
      { $set: { name: name.trim(), phone: phone.trim() } },
      { upsert: true, returnDocument: "after", runValidators: true, setDefaultsOnInsert: true }
    );
  } catch (err) {
    console.error("שגיאה בשמירת נרשם למדריך:", err.message);
  }

  try {
    await addLeadToRavMesser({ name, email, phone });
    if (signup) await GuideSignup.updateOne({ _id: signup._id }, { sentToMailer: true });
    res.json({ success: true });
  } catch (err) {
    console.error("שגיאה בשליחה לרב מסר:", err.message);
    res.status(500).json({ error: "אירעה שגיאה בשליחת הפרטים, נסו שוב" });
  }
};

module.exports = { submitLead };
