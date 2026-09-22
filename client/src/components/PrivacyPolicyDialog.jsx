import { useState } from "react";

function PrivacyPolicyDialog() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="underline text-sm text-neutral-600"
            >
                מדיניות פרטיות ותקנון
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div
                        className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 sm:p-8"
                        dir="rtl"
                    >
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute left-4 top-4 text-2xl font-bold text-neutral-400 hover:text-neutral-700"
                            aria-label="סגור"
                        >
                            ×
                        </button>

                        <h2 className="mb-6 pr-6 text-xl font-bold text-neutral-800">
                            מדיניות פרטיות לקורס הדיגיטלי בית בשתי ידיים
                        </h2>

                        <div className="space-y-5 text-sm leading-relaxed text-neutral-700">
                            <section>
                                <h3 className="mb-2 font-bold text-neutral-800">1. כללי והסכמה למדיניות</h3>
                                <p>
                                    מדיניות פרטיות זו מסבירה כיצד אסף סרויה ניהול פרויקטים, פיקוח ויזמות בע"מ
                                    (להלן: "מפעיל האתר") אוסף, משתמש, שומר ומגן על מידע אישי של משתמשי האתר,
                                    דפי הנחיתה, הקורסים הדיגיטליים והשירותים הנלווים.
                                </p>
                                <p className="mt-2">השימוש באתר ובקורס מהווה הסכמה למדיניות זו.</p>
                                <p className="mt-2">
                                    מדיניות זו חלה על כל מידע הנאסף באמצעות האתר, דפי נחיתה, מערכות דיוור, מערכות
                                    סליקה, טפסים חיצוניים, פיקסלים שיווקיים, מערכות למידה ו–CRM במידה ומשמשות
                                    לתפעול הקורס.
                                </p>
                                <p className="mt-2">
                                    מדיניות זו מנוסחת בהתאם לחוק הגנת הפרטיות, התשמ"א-1981, תקנות הגנת הפרטיות
                                    (אבטחת מידע), תיקון 14 ותקנות נוספות המחייבות עסקים דיגיטלים בישראל.
                                </p>
                            </section>

                            <section>
                                <h3 className="mb-2 font-bold text-neutral-800">2. איסוף מידע</h3>
                                <p>אנו אוספים מידע בשתי דרכים עיקריות:</p>
                                <ul className="mt-2 list-disc space-y-1 pr-5">
                                    <li>
                                        מידע הנמסר מרצונך: בעת ההרשמה לקורס או יצירת קשר, אנו אוספים שם מלא,
                                        כתובת דוא"ל, מספר טלפון, ופרטי תשלום (המעובדים על ידי ספק שירותי תשלום
                                        חיצוני ומאובטח).
                                    </li>
                                    <li>
                                        מידע הנאסף אוטומטית: בעת השימוש באתר אנו אוספים מידע טכני כגון כתובת IP,
                                        סוג דפדפן, זמני גישה, דפים נצפים, נתוני שימוש בקורס (כמה זמן נצפה כל
                                        שיעור), שימוש בפיקסלים שיווקיים (Google, Meta) לניתוח ושיפור קמפיינים,
                                        Cookies (כמפורט להלן).
                                    </li>
                                </ul>
                            </section>

                            <section>
                                <h3 className="mb-2 font-bold text-neutral-800">3. מטרת השימוש במידע</h3>
                                <p>אנו משתמשים במידע שנאסף למטרות הבאות:</p>
                                <ul className="mt-2 list-disc space-y-1 pr-5">
                                    <li>אספקת גישה לקורס וניהול חשבון משתמש</li>
                                    <li>שליחת חשבוניות ועדכוני מערכת</li>
                                    <li>תמיכה ושירות לקוחות</li>
                                    <li>התאמת תכני הקורס לרמת המשתמש</li>
                                    <li>שיפור האתר והפלטפורמות</li>
                                    <li>ניתוח נתונים סטטיסטיים</li>
                                    <li>דיוור ישיר בכפוף להסכמת המשתמש</li>
                                    <li>עמידה בדרישות חוקיות</li>
                                </ul>
                                <p className="mt-2">
                                    מידע עשוי לשמש לצורך אבטחת מידע, זיהוי פעילות חריגה ומניעת שימוש בלתי חוקי
                                    בתכני הקורס.
                                </p>
                            </section>

                            <section>
                                <h3 className="mb-2 font-bold text-neutral-800">4. שיתוף מידע עם צדדים שלישיים</h3>
                                <p>האתר אינו מוכר, משכיר או סוחר במידע האישי שלך.</p>
                                <p className="mt-2">מידע יועבר לצד שלישי רק כאשר:</p>
                                <ul className="mt-2 list-disc space-y-1 pr-5">
                                    <li>לספקי שירות נחוצים (אחסון, תשלומים, דיוור, תמיכה).</li>
                                    <li>עמידה בצו בית משפט / דרישת חוק.</li>
                                    <li>העברת פעילות עסקית או מיזוג.</li>
                                </ul>
                                <p className="mt-2">
                                    כל צד שלישי המחזיק מידע עבור המפעיל מחויב בחוזה לשמור על סודיות ולהשתמש
                                    במידע רק למטרות שסוכמו.
                                </p>
                            </section>

                            <section>
                                <h3 className="mb-2 font-bold text-neutral-800">5. אבטחת מידע</h3>
                                <p>
                                    אנו נוקטים באמצעי אבטחה סבירים ומקובלים, אך מאחר ששום מערכת אינה חסינה
                                    לחלוטין, איננו יכולים להתחייב למניעת חשיפה מלאה בכל נסיבות. לפיכך, המשתמש
                                    מצהיר כי לא תעמוד לו כל טענה בגין אירועי אבטחה הנובעים מגורמים חיצוניים
                                    שאינם בשליטת האתר.
                                </p>
                            </section>

                            <section>
                                <h3 className="mb-2 font-bold text-neutral-800">
                                    6. זכויות המשתמש (הזכות לעיון ותיקון)
                                </h3>
                                <p>על פי חוק הגנת הפרטיות — המשתמש רשאי:</p>
                                <ul className="mt-2 list-disc space-y-1 pr-5">
                                    <li>לעיין במידע</li>
                                    <li>לבקש תיקון</li>
                                    <li>לבקש מחיקה</li>
                                    <li>לבקש הפסקת דיוור</li>
                                </ul>
                                <p className="mt-2">
                                    ייתכנו מצבים בהם לא נוכל למחוק מידע שמחויב להישמר לפי חוק (לדוגמה: חשבוניות
                                    מס).
                                </p>
                            </section>

                            <section>
                                <h3 className="mb-2 font-bold text-neutral-800">7. שימוש בקובצי Cookies</h3>
                                <p>
                                    האתר עושה שימוש ב־Cookies ו–Tracking כגון Meta Pixel, Google Tag Manager
                                    ו־Analytics.
                                </p>
                                <p className="mt-2">המטרות:</p>
                                <ul className="mt-2 list-disc space-y-1 pr-5">
                                    <li>תפעול תקין</li>
                                    <li>שיפור חוויית משתמש</li>
                                    <li>שמירת התחברות</li>
                                    <li>ניתוח שיווקי</li>
                                    <li>פרסום ממוקד</li>
                                </ul>
                                <p className="mt-2">
                                    המשתמש יכול לבטל פרסום ממוקד בהגדרות החשבון שלו בגוגל ופייסבוק. חסימת
                                    Cookies מסוימים עלולה לפגוע בחוויית השימוש.
                                </p>
                            </section>

                            <section>
                                <h3 className="mb-2 font-bold text-neutral-800">8. שינויים במדיניות הפרטיות</h3>
                                <p>
                                    המפעיל רשאי לעדכן מדיניות זו בכל עת. שינוי מהותי יגרור עדכון בדוא"ל או הודעה
                                    בולטת באתר.
                                </p>
                            </section>

                            <section>
                                <h3 className="mb-2 font-bold text-neutral-800">9. יצירת קשר</h3>
                                <p>לכל שאלה בנוגע לתנאי השימוש או למדיניות הפרטיות, ניתן ליצור קשר:</p>
                                <p className="mt-2">
                                    ליאת:
                                    <br />
                                    מייל:{" "}
                                    <a
                                        href="mailto:Baitb2yadayim@gmail.com"
                                        className="underline"
                                    >
                                        Baitb2yadayim@gmail.com
                                    </a>
                                    <br />
                                    טלפון: 0502201727
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default PrivacyPolicyDialog;
