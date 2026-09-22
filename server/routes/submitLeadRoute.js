/**
 * אינטגרציית Rav Messer API — שרת Express (עם axios)
 * ================================================
 * הקובץ הזה מטפל בכל התקשורת מול רב מסר, כדי שהפרטים הרגישים
 * (Client Secret, User Token) לעולם לא ייחשפו בדפדפן של המשתמש.
 *
 * מה שהוא עושה:
 * 1. מקבל את פרטי הטופס (שם, אימייל, טלפון) מהדף ב-React שלך.
 * 2. מתחבר לרב מסר ומקבל Access Token זמני.
 * 3. שולח את הליד לרשימת התפוצה שלך ברב מסר.
 * 4. רב מסר כבר דואג לשלוח את המדריך במייל, לפי האוטומציה שהגדרת אצלם.
 *
 * ==================================================
 * לפני שמתחילים — הגדירי משתני סביבה (קובץ .env):
 * ==================================================
 * Client_ID=...
 * Client_Secret=...
 * User_Token=...
 * RAVMESSER_LIST_ID=...   (מזהה רשימת התפוצה שאליה מצטרפים - את מוצאת
 *                          אותו בעריכת הרשימה ברב מסר)
 *
 * לעולם אל תשימי את הערכים האלה ישירות בקוד או ב-React —
 * רק בקובץ .env בשרת, שלא מועלה ל-git (תוודאי שהוא ב-.gitignore).
 *
 * ==================================================
 * חשוב: צריך להתקין axios על השרת (חד-פעמי):
 * ==================================================
 *   npm install axios
 */

const express = require("express");
const axios = require("axios");
const router = express.Router();

// ==================================================
// שלב 1: קבלת Access Token זמני מרב מסר
// ==================================================
// הטוקן הזה תקף לזמן מוגבל, אז אנחנו שומרים אותו בזיכרון
// ומחדשים אותו רק כשצריך (או אחרי שגיאת 401).

let cachedToken = null;
let tokenExpiresAt = 0;

async function getAccessToken() {
  // אם יש טוקן תקף בזיכרון - נשתמש בו במקום לבקש חדש בכל פעם
  if (cachedToken && Date.now() < tokenExpiresAt) {
    return cachedToken;
  }

  try {
    // לפי תיעוד ה-API הרשמי (Swagger): הבקשה היא JSON רגיל, לא form
    const response = await axios.post(
      "https://graph.responder.live/v2/oauth/token",
      {
        grant_type: "client_credentials",
        scope: "*",
        client_id: process.env.Client_ID,
        client_secret: process.env.Client_Secret,
        user_token: process.env.User_Token,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = response.data;
    // לפי התיעוד: שם השדה הוא "token", לא "access_token"
    cachedToken = data.token;
    // לפי התיעוד: אין expires_in בתשובה - הטוקן בתוקף קבוע ל-14 יום.
    // שומרים מרווח ביטחון של יום אחד לפני שהוא פג בפועל.
    const THIRTEEN_DAYS_MS = 13 * 24 * 60 * 60 * 1000;
    tokenExpiresAt = Date.now() + THIRTEEN_DAYS_MS;

    return cachedToken;
  } catch (err) {
    // axios שם את תגובת השרת (אם יש) בתוך err.response
    const status = err.response ? err.response.status : "?";
    const details = err.response ? JSON.stringify(err.response.data) : err.message;
    throw new Error(`שגיאה בהזדהות מול רב מסר: ${status} - ${details}`);
  }
}

// ==================================================
// שלב 2: הוספת ליד לרשימת התפוצה
// ==================================================
// מאומת מול תיעוד ה-API הרשמי (Swagger): POST /subscribers,
// עם list_id בגוף הבקשה. שם השדה המדויק לרשימה (list_id) עדיין
// כדאי לוודא מול "Schema" של הפעולה ב-Swagger אם התשובה מרב מסר
// תגיד ששדה כלשהו חסר או שגוי.

async function postSubscriber(accessToken, { name, email, phone }) {
  // לפי הסכימה המדויקת מה-Swagger: השדה נקרא "list_ids" (ברבים),
  // ומצפה למערך של מספרים - גם אם יש רק רשימה אחת.
  return axios.post(
    `https://graph.responder.live/v2/subscribers`,
    { email, name, phone, list_ids: [Number(process.env.RAVMESSER_LIST_ID)] },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
}

async function addLeadToRavMesser({ name, email, phone }) {
  const accessToken = await getAccessToken();

  try {
    const response = await postSubscriber(accessToken, { name, email, phone });
    return response.data;
  } catch (err) {
    // אם הטוקן פג באמצע (401) - ננסה פעם אחת נוספת עם טוקן חדש
    if (err.response && err.response.status === 401) {
      cachedToken = null;
      const freshToken = await getAccessToken();
      try {
        const retryResponse = await postSubscriber(freshToken, { name, email, phone });
        return retryResponse.data;
      } catch (retryErr) {
        const status = retryErr.response ? retryErr.response.status : "?";
        const details = retryErr.response ? JSON.stringify(retryErr.response.data) : retryErr.message;
        throw new Error(`שגיאה בהוספת ליד (אחרי חידוש טוקן): ${status} - ${details}`);
      }
    }

    const status = err.response ? err.response.status : "?";
    const details = err.response ? JSON.stringify(err.response.data) : err.message;
    throw new Error(`שגיאה בהוספת ליד: ${status} - ${details}`);
  }
}

// ==================================================
// ה-Route שהטופס ב-React יקרא אליו
// ==================================================
// בדף ה-React, בפונקציית handleSubmit, במקום setSubmitted(true) ישירות,
// יש לשלוח קודם בקשת POST לכתובת הזו (לדוגמה '/api/submit-lead')
// ורק אחרי תשובה חיובית להציג את הודעת ההצלחה.

router.post("/", async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ error: "חסרים פרטים בטופס" });
  }

  try {
    await addLeadToRavMesser({ name, email, phone });
    res.json({ success: true });
  } catch (err) {
    console.error("שגיאה בשליחה לרב מסר:", err.message);
    res.status(500).json({ error: "אירעה שגיאה בשליחת הפרטים, נסו שוב" });
  }
});

module.exports = router;
