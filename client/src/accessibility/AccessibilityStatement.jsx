import { useEffect } from "react";

// ===== פרטים לעדכון =====
// כל מה שמשתנה בהצהרה נמצא כאן, כדי שיהיה קל לעדכן בלי לחפש בתוך הטקסט
const DETAILS = {
    businessName: 'אסף סרויה ניהול פרויקטים, פיקוח ויזמות בע"מ',
    coordinatorName: "[שם אחראי/ת הנגישות]",
    phone: "[טלפון]",
    email: "[מייל]",
    updatedAt: "05.10.2026",
};

const DARK = "#1E2A22";
const MUTED = "#4F5A4B";
const GREEN_TEXT = "#51762b"; // ירוק לטקסט קטן (ניגודיות 4.5)
const GREEN_LARGE = "#669336"; // ירוק לכותרת גדולה (ניגודיות 3)
const CREAM = "#FBF8F2";

const MENU_FEATURES = [
    "הגדלת טקסט עד 150%",
    "ניגודיות כהה וניגודיות בהירה",
    "גווני אפור",
    "ריווח טקסט",
    "סמן עכבר מוגדל",
    "הדגשת קישורים והדגשת כותרות",
    "הסתרת תמונות",
    "מדריך קריאה",
    "עצירת אנימציות",
];

const SITE_ADJUSTMENTS = [
    "מבנה כותרות היררכי, עם כותרת ראשית אחת בכל דף",
    "ניווט מלא באמצעות המקלדת, כולל קישור לדילוג ישיר לתוכן ומסגרת שמראה איפה נמצאים",
    "ניגודיות צבעים בין הטקסט לרקע לפי דרישות התקן",
    "התאמה למסכים בגדלים שונים, כולל טלפונים",
    "טקסט חלופי לתמונות שמעבירות מידע",
    "טפסים עם תוויות ברורות והודעות שגיאה שמוקראות לקורא מסך",
    "חלונות קופצים שנסגרים במקש Esc ושומרים על מיקום הסמן",
];

function Section({ title, children }) {
    return (
        <section className="border-t border-[#DCE3D0] pt-7 first:border-t-0 first:pt-0">
            <h2 className="text-xl font-extrabold md:text-2xl" style={{ color: DARK }}>
                {title}
            </h2>
            <div className="mt-3 space-y-3 text-base leading-8" style={{ color: MUTED }}>
                {children}
            </div>
        </section>
    );
}

function BulletList({ items }) {
    return (
        <ul className="grid gap-2 sm:grid-cols-2">
            {items.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: GREEN_TEXT }} aria-hidden="true" />
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    );
}

export default function AccessibilityStatement() {
    useEffect(() => {
        document.title = "הצהרת נגישות | סרויה ניהול פרויקטים";
        return () => {
            document.title = "סרויה ניהול פרויקטים";
        };
    }, []);

    return (
        <div dir="rtl" className="px-5 py-14 md:py-20" style={{ backgroundColor: CREAM }}>
            <article className="mx-auto max-w-3xl">
                {/* כותרת בסגנון של שאר האתר: תווית קטנה עם קווים, ואחריה כותרת בשתי שורות */}
                <header className="mb-10 text-center">
                    <div className="mb-4 flex items-center justify-center gap-3">
                        <span className="h-px w-8" style={{ backgroundColor: GREEN_TEXT }} aria-hidden="true" />
                        <span className="text-xs font-bold tracking-[0.16em]" style={{ color: GREEN_TEXT }}>
                            מידע משפטי
                        </span>
                        <span className="h-px w-8" style={{ backgroundColor: GREEN_TEXT }} aria-hidden="true" />
                    </div>
                    <h1 className="text-3xl font-black leading-[1.25] md:text-5xl" style={{ color: DARK }}>
                        הצהרת
                        <span className="mt-1 block" style={{ color: GREEN_LARGE }}>
                            נגישות
                        </span>
                    </h1>
                    <p className="mx-auto mt-5 max-w-2xl text-base font-medium leading-8 md:text-lg" style={{ color: MUTED }}>
                        אנחנו רוצים שכל אחד ואחת יוכלו להשתמש באתר בנוחות, כולל אנשים עם מוגבלות.
                        לכן השקענו בהנגשת האתר, ואנחנו ממשיכים לשפר אותו.
                    </p>
                </header>

                <div className="space-y-7 rounded-3xl bg-white p-6 shadow-[0_15px_45px_rgba(48,75,29,0.08)] ring-1 ring-black/5 md:p-10">
                    <Section title="רמת הנגישות באתר">
                        <p>
                            האתר הותאם לדרישות תקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע"ג-2013,
                            ולתקן הישראלי ת"י 5568, המבוסס על הנחיות WCAG ברמה AA.
                        </p>
                    </Section>

                    <Section title="מה עשינו באתר">
                        <BulletList items={SITE_ADJUSTMENTS} />
                    </Section>

                    <Section title="תפריט הנגישות">
                        <p>
                            בפינת המסך, בכל דף באתר, יש כפתור נגישות שפותח תפריט עם האפשרויות הבאות:
                        </p>
                        <BulletList items={MENU_FEATURES} />
                        <p>ההגדרות שבוחרים נשמרות בדפדפן, כך שהן נשארות גם בביקור הבא.</p>
                    </Section>

                    <Section title="איך נבדק האתר">
                        <p>
                            האתר נבדק בכלי בדיקה אוטומטי לפי הנחיות WCAG 2.1 ברמה AA, במחשב ובטלפון, ונבדק ידנית בניווט מקלדת.
                            האתר טרם נבדק בידי מורשה/ית נגישות שירות, ולכן איננו יכולים להצהיר על עמידה מלאה בתקן.
                        </p>
                    </Section>

                    <Section title="חלקים שעדיין אינם נגישים במלואם">
                        <ul className="space-y-2">
                            <li>
                                <strong style={{ color: DARK }}>המלצות בתמונה:</strong> חלק מההמלצות באתר מוצגות כצילומי מסך, והטקסט שבתוכן
                                אינו נקרא בקורא מסך. אנחנו עובדים על הוספת הטקסט של כל המלצה.
                            </li>
                            <li>
                                <strong style={{ color: DARK }}>סרטונים:</strong> חלק מהסרטונים באתר מוצגים ללא כתוביות.
                                מי שזקוק/ה לתוכן הסרטון בדרך אחרת מוזמן/ת לפנות אלינו.
                            </li>
                            <li>
                                <strong style={{ color: DARK }}>טופס התשלום:</strong> התשלום מתבצע בעמוד של חברת סליקה חיצונית,
                                והנגישות שלו באחריותה. אם נתקלתם בקושי, פנו אלינו ונשמח לעזור להשלים את הרכישה.
                            </li>
                        </ul>
                    </Section>

                    <Section title="נתקלתם בבעיית נגישות?">
                        <p>
                            נשמח לשמוע ולתקן. אפשר לפנות לאחראי/ת הנגישות שלנו, ואנחנו נחזור אליכם בהקדם.
                        </p>
                        <dl className="grid gap-3 rounded-2xl bg-[#F3F6EE] p-5 sm:grid-cols-3">
                            <div>
                                <dt className="text-sm font-bold" style={{ color: GREEN_TEXT }}>אחראי/ת נגישות</dt>
                                <dd className="font-bold" style={{ color: DARK }}>{DETAILS.coordinatorName}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-bold" style={{ color: GREEN_TEXT }}>טלפון</dt>
                                <dd className="font-bold" style={{ color: DARK }}>
                                    <a href={`tel:${DETAILS.phone.replace(/[^\d+]/g, "")}`} dir="ltr" className="underline underline-offset-4">
                                        {DETAILS.phone}
                                    </a>
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-bold" style={{ color: GREEN_TEXT }}>מייל</dt>
                                <dd className="font-bold break-all" style={{ color: DARK }}>
                                    <a href={`mailto:${DETAILS.email}`} className="underline underline-offset-4">
                                        {DETAILS.email}
                                    </a>
                                </dd>
                            </div>
                        </dl>
                        <p>
                            כדי שנוכל לטפל בפנייה מהר, כדאי לציין באיזה דף הייתה הבעיה, מה ניסיתם לעשות, ובאיזה דפדפן או טכנולוגיה מסייעת השתמשתם.
                        </p>
                    </Section>

                    <p className="border-t border-[#DCE3D0] pt-6 text-sm" style={{ color: MUTED }}>
                        המפעיל: {DETAILS.businessName}
                        <br />
                        תאריך עדכון ההצהרה: {DETAILS.updatedAt}
                    </p>
                </div>
            </article>
        </div>
    );
}
