import giftHero from "./bonus_gift_hero.png";
import roadmapIcon from "./bonus_roadmap.png";
import excelIcon from "./bonus_excel.png";
import checklistIcon from "./bonus_checklist.png";
import whatsappIcon from "./bonus_whatsapp_house.png";
import villaSketchBlurred from "./villa_sketch_blurred.png";

const BONUSES = [
    {
        number: 1,
        icon: roadmapIcon,
        title: "מפת דרכים מלאה של תהליך הבנייה",
        value: "450 ₪",
        points: [
            "מתי כל גורם נכנס לתמונה",
            "מה עושים ראשון, שני, שלישי",
            "איך לתאם בין כל הגורמים",
            "מתי להזמין כל קבלן וספק",
        ],
    },
    {
        number: 2,
        icon: excelIcon,
        title: "טבלת תקציב מקצועית באקסל",
        value: "700 ₪",
        points: [
            "כל עלויות הבנייה ששוכחים",
            "מזהירה מחריגות",
            "עוקבת אחרי כל שקל",
            "2 שיעורי הדרכה לשימוש",
        ],
    },
    {
        number: 3,
        icon: checklistIcon,
        title: "צ'ק-ליסטים לכל שלב בבנייה",
        value: "250 ₪",
        points: [
            "לפני חתימה עם קבלן",
            "בכל שלב של הבנייה",
            "לפני תשלומים",
            "בקבלת העבודה",
        ],
    },
    {
        number: 4,
        icon: whatsappIcon,
        title: "גישה לקבוצת הבונים הסגורה",
        value: "לא יסולא בפז",
        points: [
            "שאלות ותשובות בזמן אמת",
            "תמיכה והכוונה",
            "שיתוף חוויות וטיפים",
            "קשרים עם ספקים מומלצים",
        ],
    },
];

function TimelineItem({ bonus, isLast }) {
    return (
        <div className="relative flex gap-5 pb-4">
            {/* העמודה עם העיגול, הקו והמספר - זהה בגובה לכל הפריטים */}
            <div className="relative flex flex-shrink-0 flex-col items-center">
                {/* העיגול עם רקע ירוק בהיר */}
                <div
                    className="relative flex h-28 w-28 items-center justify-center rounded-full border-4 border-white shadow-lg"
                    style={{ backgroundColor: "#F0F5E8" }}
                >
                    <img
                        src={bonus.icon}
                        alt={bonus.title}
                        className="h-28 w-28 object-contain"
                    />
                </div>

                {/* קו קצר קבוע מתחת לכל עיגול */}
                <div
                    className="h-6 w-1.5 rounded-full"
                    style={{ backgroundColor: "#B9D48F" }}
                />

                {/* תג המספר */}
                <span
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border-2 border-white text-sm font-bold text-white shadow"
                    style={{ backgroundColor: "#7CB342" }}
                >
                    {bonus.number}
                </span>

                {/* הקו הארוך המחבר לבונוס הבא */}
                {!isLast && (
                    <div
                        className="mt-1 w-1.5 flex-1 rounded-full"
                        style={{ backgroundColor: "#B9D48F", minHeight: "2.5rem" }}
                    />
                )}
            </div>

            {/* הכרטיס */}
            <div className="mb-6 flex-1 rounded-2xl bg-white p-6 shadow-md" dir="rtl">
                <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-bold leading-snug text-neutral-900">
                        {bonus.title}
                    </h3>
                    <span
                        className="flex-shrink-0 rounded-full px-3 py-1 text-sm font-bold"
                        style={{ backgroundColor: "#E8EFD9", color: "#5C8A2E" }}
                    >
                        {bonus.value}
                    </span>
                </div>

                <ul className="mt-4 space-y-2.5">
                    {bonus.points.map((point, i) => (
                        <li key={i} className="flex items-center justify-start gap-2.5">
                            <span
                                className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[11px] text-white"
                                style={{ backgroundColor: "#7CB342" }}
                            >
                                ✓
                            </span>
                            <span className="text-sm text-neutral-700">{point}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

function BonusesSection() {
    return (
        <section className="relative overflow-hidden px-6 py-16" dir="rtl">
            {/* תמונת הרקע המטושטשת */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${villaSketchBlurred})` }}
            />

            {/* שכבה לבנה שקופה מעל התמונה */}
            <div className="absolute inset-0 bg-white/80" />

            {/* התוכן - מעל שתי השכבות */}
            <div className="relative mx-auto max-w-2xl">
                {/* כותרת עליונה */}
                <div className="text-center">
                    <img src={giftHero} alt="בונוסים" className="mx-auto w-50 drop-shadow-lg" />
                    <div
                        className="relative mt-2 inline-block rounded-xl px-6 py-3"
                        style={{ backgroundColor: "#1A1A1A" }}
                    >
                        <p className="text-lg font-bold leading-tight text-white">
                            בונוסים שווים שעושים את ההבדל
                        </p>
                    </div>
                </div>

                {/* ציר הזמן */}
                <div className="mt-8">
                    {BONUSES.map((bonus, i) => (
                        <TimelineItem
                            key={bonus.number}
                            bonus={bonus}
                            isLast={i === BONUSES.length - 1}
                        />
                    ))}
                </div>

                {/* סיכום שווי */}
                <div className="rounded-2xl bg-white p-6 text-center shadow-lg">
                    <p className="text-base font-bold text-neutral-800">סה"כ ערך הבונוסים:</p>
                    <p className="mt-1 text-2xl font-bold" style={{ color: "#7CB342" }}>
                        מעל 1,400 ₪
                    </p>
                    <p className="mt-2 text-lg font-bold text-neutral-900">
                        ואתם מקבלים את הכל בחינם עם הקורס!
                    </p>
                </div>
            </div>
        </section>
    );
}

export default BonusesSection;
