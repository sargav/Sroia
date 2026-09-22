# דף "המצפן לבונה" - מודול להטמעה בפרויקט הראשי

התיקייה הזאת עצמאית לגמרי. אין צורך לשנות את ה-CSS, את קובץ ה-Tailwind או את הגדרות ה-Vite של האתר הראשי.
נבדקה בבנייה אמיתית גם עם Tailwind 3 וגם עם Tailwind 4 (React 18 ו-19, react-router 6 ו-7).

## התקנה (4 צעדים)

1. **מעתיקים** את התיקייה `compass` אל `src/` של הפרויקט הראשי, כך שתהיה `src/compass/`.

2. **מתקינים** ספריות שחסרות (אם יש כבר, מדלגים):
   ```
   npm install lucide-react react-router-dom
   ```

3. **מוסיפים שני נתיבים** בניתוב של האתר (הקובץ ששם `<Routes>`, בדרך כלל `App.jsx`):
   ```jsx
   import CompassPage from "./compass/pages/CompassPage";
   import PaymentResult from "./compass/pages/PaymentResult";

   <Route path="/compass" element={<CompassPage />} />
   <Route path="/payment-result" element={<PaymentResult />} />
   ```
   אפשר לשנות את `/compass` לכל כתובת אחרת.

4. **מריצים** `npm run dev` ופותחים `/compass`.

## תשלום (Cardcom)

בהגדרות דף התשלום ב-Cardcom:
- כתובת הצלחה:  `https://הדומיין-שלך/payment-result?status=success`
- כתובת כישלון: `https://הדומיין-שלך/payment-result?status=failed`

הכתובות חייבות להיות ציבוריות (לא localhost). דף התוצאה מדפיס לקונסולה את כל הפרמטרים ש-Cardcom החזירה.
אל תשחררו גישה למוצר על סמך הפרמטר status בכתובת (אפשר לזייף אותו). אישור אמיתי מגיע מה-webhook של Cardcom.

## מה בפנים

```
compass/
  pages/        CompassPage (הדף כולו) והסקשנים שלו, PaymentResult
  components/   Reveal, SectionHeading
  assets/       תמונות, אייקונים ורקעים (שמות קבצים באותיות קטנות, כדי שהבנייה תעבוד גם על Linux)
```

- **הפונט Heebo והאנימציה של המצפן** נטענים מתוך הדף עצמו.
- **הצבעים** כתובים בקוד כערכים קבועים, ולא תלויים בהגדרות של Tailwind.
- **התמונה של אסף** בסקשן "מילה אישית": `assets/images/asaf-personal.jpg`. להחלפה, שומרים תמונה חדשה בדיוק באותו שם.
- **תמונת הרקע של המחיר:** `assets/backgrounds/pricing-photo.jpg`.

## אם משהו לא נראה נכון

- **אין עיצוב בכלל:** ב-Tailwind 4 ודאי שהקובץ `src/compass` לא מוחרג ב-`@source`/.gitignore. ב-Tailwind 3 ודאי שב-`tailwind.config.js` מופיע `content: ["./src/**/*.{js,jsx}"]`.
- **התמונות לא נטענות:** בדקי שהסיומות בקוד ובקבצים זהות (`.jpg`, `.png`).
- **הדף מוצג משמאל לימין:** הדף מגדיר `dir="rtl"` על האלמנט הראשי שלו, ולכן זה לא אמור לקרות. אם כן, בדקי שאין CSS באתר שדורס `direction`.
