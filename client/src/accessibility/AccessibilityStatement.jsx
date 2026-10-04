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

// צבעים: רקע כהה כמו הכותרת העליונה של האתר, וירוק המותג להדגשות
const BG = "#111827";
const TEXT = "#D6DAE0"; //      טקסט רגיל
const STRONG = "#FFFFFF"; //    כותרות ומילים מודגשות
const ACCENT = "#8DC63F"; //    ירוק המותג (קריא על הרקע הכהה)
const LINE = "#2B3442";

const SITE_ADJUSTMENTS =
    "מבנה כותרות היררכי, ניווט מלא במקלדת (כולל קישור לדילוג ישיר לתוכן), ניגודיות צבעים, התאמה למסכים שונים, טקסט חלופי לתמונות, טפסים עם תוויות והודעות שגיאה שמוקראות לקורא מסך";

const MENU_FEATURES =
    "הגדלת טקסט, ניגודיות כהה ובהירה, גווני אפור, ריווח טקסט, סמן מוגדל, הדגשת קישורים וכותרות, הסתרת תמונות, מדריך קריאה ועצירת אנימציות";

function Paragraph({ label, children }) {
    return (
        <p className="text-[1.05rem] leading-9" style={{ color: TEXT }}>
            {label && (
                <strong className="font-bold" style={{ color: STRONG }}>
                    {label}{" "}
                </strong>
            )}
            {children}
        </p>
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
        <div dir="rtl" style={{ backgroundColor: BG }}>
            {/* פתיח: תווית קטנה, קו קצר, וכותרת */}
            <header
                className="px-5 pb-12 pt-10 text-center md:pb-16 md:pt-14"
                style={{ background: `radial-gradient(ellipse 60% 100% at 50% 0%, #1b2536 0%, ${BG} 70%)` }}
            >
                <p className="text-sm font-bold tracking-[0.3em]" style={{ color: ACCENT }}>
                    מידע משפטי
                </p>
                <span className="mx-auto mt-3 block h-0.5 w-12 rounded-full" style={{ backgroundColor: ACCENT, opacity: 0.6 }} aria-hidden="true" />
                <h1 className="mt-6 text-4xl font-black md:text-6xl" style={{ color: STRONG }}>
                    הצהרת נגישות
                </h1>
            </header>

            <div className="mx-auto max-w-4xl px-5 pb-20">
                {/* הודעה בולטת: האתר טרם נבדק מקצועית */}
                <div
                    className="mb-12 flex items-start gap-3 rounded-xl border px-5 py-4"
                    style={{ borderColor: "rgba(141, 198, 63, 0.55)", backgroundColor: "rgba(141, 198, 63, 0.08)" }}
                    role="note"
                >
                    <span className="mt-0.5 shrink-0 text-lg font-black" style={{ color: ACCENT }} aria-hidden="true">
                        !
                    </span>
                    <p className="text-[1.05rem] font-semibold leading-8" style={{ color: STRONG }}>
                        האתר טרם עבר בדיקת נגישות מקצועית בידי מורשה/ית נגישות.
                        <span className="font-normal" style={{ color: TEXT }}>
                            {" "}
                            זהו נוסח זמני, והנוסח הסופי יעודכן אחרי בדיקה ואישור מקצועי.
                        </span>
                    </p>
                </div>

                <div className="mx-auto max-w-3xl space-y-7">
                    <Paragraph>אנחנו פועלים כדי לאפשר חוויית גלישה נוחה ונגישה ככל האפשר, לכל אחד ואחת.</Paragraph>

                    <Paragraph>
                        האתר תוכנן והותאם מתוך כוונה לעמוד בדרישות תקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות),
                        התשע"ג-2013, ובתקן הישראלי ת"י 5568 (לפי הנחיות WCAG ברמה AA). בין השאר: {SITE_ADJUSTMENTS}.
                    </Paragraph>

                    <Paragraph label="תפריט נגישות:">
                        בפינת המסך, בכל דף באתר, יש כפתור נגישות שפותח תפריט עם {MENU_FEATURES}. ההגדרות נשמרות בדפדפן, כך שהן נשארות גם בביקור הבא.
                    </Paragraph>

                    <Paragraph label="חשוב לציין:">
                        האתר נבדק בכלי בדיקה אוטומטי ובניווט ידני במקלדת, אבל טרם עבר בדיקה של מורשה/ית נגישות שירות.
                        לכן איננו יכולים להצהיר כי הושגה עמידה מלאה בתקן. הבדיקה המקצועית מתוכננת לשלב הבא.
                    </Paragraph>

                    <Paragraph label="חלקים ידועים שאינם נגישים במלואם:">
                        חלק מההמלצות באתר מוצגות כצילומי מסך, והטקסט שבתוכן אינו נקרא בקורא מסך. חלק מהסרטונים מוצגים ללא כתוביות.
                        טופס התשלום נמצא בעמוד של חברת סליקה חיצונית, והנגישות שלו באחריותה. בכל אחד מהמקרים האלה אפשר לפנות אלינו,
                        ונשמח לתת את המידע בדרך אחרת או לעזור להשלים את הרכישה.
                    </Paragraph>

                    <Paragraph label="נתקלתם בבעיית נגישות?">
                        נשמח לשמוע ולתקן. אפשר לפנות אלינו במייל{" "}
                        <a href={`mailto:${DETAILS.email}`} className="font-semibold underline underline-offset-4" style={{ color: ACCENT }}>
                            {DETAILS.email}
                        </a>{" "}
                        או בטלפון{" "}
                        <a
                            href={`tel:${DETAILS.phone.replace(/[^\d+]/g, "")}`}
                            dir="ltr"
                            className="font-semibold underline underline-offset-4"
                            style={{ color: ACCENT }}
                        >
                            {DETAILS.phone}
                        </a>
                        . כדאי לציין באיזה דף הייתה הבעיה ומה ניסיתם לעשות.
                    </Paragraph>

                    <Paragraph label="אחראי/ת נגישות:">
                        {DETAILS.coordinatorName}. אפשר לפנות בנושאי נגישות במייל{" "}
                        <a href={`mailto:${DETAILS.email}`} className="font-semibold underline underline-offset-4" style={{ color: ACCENT }}>
                            {DETAILS.email}
                        </a>
                        .
                    </Paragraph>

                    <div className="border-t pt-6 text-sm leading-7" style={{ borderColor: LINE, color: TEXT }}>
                        <p>המפעיל: {DETAILS.businessName}</p>
                        <p>תאריך עדכון ההצהרה: {DETAILS.updatedAt}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
