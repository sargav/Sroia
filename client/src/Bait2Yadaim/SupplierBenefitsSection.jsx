import { useMemo } from "react";
import { PanelsTopLeft, Calculator, Flame, Waves, Percent, Check, Sparkles } from "lucide-react";

// טוען אוטומטית את כל הלוגואים מהתיקייה join_logo
const logoModules = import.meta.glob(
    "./assete/join_logo/*.{png,jpg,jpeg,webp}",
    { eager: true, import: "default" }
);

const getLogo = (filename) => {
    const entry = Object.entries(logoModules).find(([path]) =>
        path.endsWith(filename)
    );
    return entry ? entry[1] : null;
};

const GREEN = "#7CB342";
const DARK = "#1E2A22";
const CREAM = "#FBF8F2";

const suppliers = [
    {
        name: "אלום שחר",
        logo: "alom_shahar.jpeg",
        tag: "אלומיניום ומעטפת הבית",
        Icon: PanelsTopLeft,
        discount: "7%",
        description: "חלונות, ויטרינות ואלומיניום באיכות הגבוהה ביותר.",
        savingsValue: "10,000–20,000 ₪",
        savingsNote: "על כל הבית",
    },
    {
        name: "קדוש משכנתאות",
        logo: "kadosh.jpeg",
        tag: "ייעוץ וליווי משכנתאות",
        Icon: Calculator,
        discount: "10%",
        description: "ליווי מלא למשכנתא האופטימלית + ביטוחי מבנה וצד ג' לכל תקופת הבנייה.",
        savingsValue: "כ-1,000 ₪ + אלפי ₪",
        savingsNote: "על הייעוץ ובביטוחים",
    },
    {
        name: "KAN Heat Israel",
        logo: "kan_heat_israel.jpeg",
        tag: "מערכות חימום פרימיום",
        Icon: Flame,
        discount: "2,500 ₪",
        description: "מערכות חימום תת רצפתי חסכוניות ונעימות במיוחד לבית, עם הנחה משמעותית.",
        savingsValue: "2,500 ₪",
        savingsNote: "הנחה ישירה",
    },
    {
        name: "שירת האביב",
        logo: "shirat_aviv.jpg",
        tag: "בריכות שחייה",
        Icon: Waves,
        discount: "3%",
        description: "בריכות בטון, פייברגלס או חצי אולימפיות — במחיר מיוחד לבוגרי התוכנית.",
        savingsValue: "5,000–10,000 ₪",
        savingsNote: "על בריכה פרטית",
    },
    {
        name: "צללה",
        logo: "zlala.jpeg",
        tag: "פרגולות חשמליות ואיכותיות",
        Icon: Percent,
        discount: "10%",
        description: "פרגולות חשמליות ואיכותיות למרפסת, לגינה ולחניה — במחירים מיוחדים לבוגרי התוכנית.",
        savingsValue: "5,000–15,000 ₪",
        savingsNote: "על פרגולה ממוצעת",
    },
];

function BenefitCard({ supplier }) {
    const { name, logo, tag, Icon, discount, description, savingsValue, savingsNote } = supplier;
    const logoSrc = getLogo(logo);

    return (
        <div className="group relative">
            {/* תג ההנחה - "פאץ'" עגול שיושב על פינת הכרטיס */}
            <div
                className="absolute -top-4 right-6 z-10 flex h-14 w-14 flex-col items-center justify-center rounded-full text-center shadow-md ring-4 ring-white transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: GREEN }}
            >
                <span className="text-sm font-extrabold leading-none text-white">
                    {discount}
                </span>
                <span className="text-[8px] font-bold leading-none text-white/90">
                    הנחה
                </span>
            </div>

            <div className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
                {/* כותרת הכרטיס */}
                <div className="flex items-center gap-4 px-6 pb-4 pt-8">
                    <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-neutral-50 p-2">
                        {logoSrc ? (
                            <img
                                src={logoSrc}
                                alt={name}
                                className="max-h-full max-w-full object-contain"
                            />
                        ) : (
                            <span className="text-[10px] text-neutral-400">{name}</span>
                        )}
                    </div>
                    <div className="min-w-0">
                        <p className="truncate text-base font-extrabold" style={{ color: DARK }}>
                            {name}
                        </p>
                        <div className="mt-0.5 flex items-center gap-1.5 text-[11px] font-bold text-neutral-400">
                            <Icon size={12} />
                            <span className="truncate">{tag}</span>
                        </div>
                    </div>
                </div>

                {/* קו מקווקו - סגנון "תלוש קופון" */}
                <div className="relative px-6">
                    <div
                        className="border-t-2 border-dashed"
                        style={{ borderColor: "#E5E0D3" }}
                    />
                    <div
                        className="absolute -right-3 -top-3 h-6 w-6 rounded-full"
                        style={{ backgroundColor: CREAM }}
                    />
                    <div
                        className="absolute -left-3 -top-3 h-6 w-6 rounded-full"
                        style={{ backgroundColor: CREAM }}
                    />
                </div>

                <div className="flex flex-1 flex-col justify-between px-6 pb-6 pt-5">
                    <p className="text-sm leading-relaxed text-neutral-600">{description}</p>

                    <div
                        className="mt-5 flex items-center justify-between rounded-xl px-4 py-3"
                        style={{ backgroundColor: CREAM }}
                    >
                        <div>
                            <p className="text-[11px] font-bold text-neutral-400">שווי החיסכון</p>
                            <p className="text-sm font-extrabold" style={{ color: DARK }}>
                                {savingsValue}
                            </p>
                        </div>
                        <p className="text-[11px] text-neutral-500">{savingsNote}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SupplierBenefitsSection() {
    const totalLabel = useMemo(() => "25,000–50,000 ₪", []);

    return (
        <section
            className="relative w-full px-6 py-20"
            dir="rtl"
            style={{ backgroundColor: CREAM }}
        >
            <div className="mx-auto max-w-6xl">
                <div className="mx-auto mb-16 max-w-2xl text-center">
                    <div
                        className="mx-auto mb-4 flex w-fit items-center gap-1.5 rounded-full px-4 py-1.5"
                        style={{ backgroundColor: "#EAF2DD" }}
                    >
                        <Sparkles size={14} style={{ color: GREEN }} />
                        <span
                            className="text-xs font-bold uppercase tracking-widest"
                            style={{ color: GREEN }}
                        >
                            אבל רגע, יש לנו עוד הטבה בשבילכם
                        </span>
                    </div>
                    <h2 className="text-3xl font-extrabold md:text-4xl" style={{ color: DARK }}>
                        הטבות בלעדיות מספקים מובילים
                    </h2>
                    <p className="mt-3 text-base text-neutral-500">
                        בנוסף לכל הכלים הדיגיטליים — סגרנו לכם הטבות אמיתיות עם ספקים שאנחנו
                        סומכים עליהם.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                    {suppliers.map((s) => (
                        <BenefitCard key={s.name} supplier={s} />
                    ))}
                </div>

                {/* סיכום - פתוח, בלי כרטיס, ישירות על רקע הסקשן */}
                <div className="mx-auto mt-20 max-w-2xl text-center">
                    <div className="flex flex-wrap items-center justify-center gap-2.5">
                        {suppliers.map((s) => (
                            <div
                                key={s.name}
                                className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-black/5"
                            >
                                <div
                                    className="flex h-5 w-5 items-center justify-center rounded-full"
                                    style={{ backgroundColor: GREEN }}
                                >
                                    <Check size={11} color="white" strokeWidth={3} />
                                </div>
                                <span className="text-xs font-bold" style={{ color: DARK }}>
                                    {s.name}
                                </span>
                            </div>
                        ))}
                    </div>

                    <p className="mx-auto mt-10 max-w-md text-xl font-bold leading-snug" style={{ color: DARK }}>
                        סה"כ שווי ההטבות:{" "}
                        <span className="text-3xl font-extrabold" style={{ color: GREEN }}>
                            {totalLabel}
                        </span>
                    </p>

                    <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-neutral-500">
                        רק מההטבות של הספקים תחזירו את ההשקעה בקורס פי 15–25! כל ההטבות תקפות
                        למשך שנה מיום ההצטרפות לקורס.
                    </p>

                    <div className="mt-8">
                        <a
                            href="#cta-form"
                            className="inline-flex items-center justify-center gap-2 rounded-full px-10 py-4 text-base font-extrabold text-white shadow-md transition hover:opacity-90"
                            style={{ backgroundColor: GREEN }}
                        >
                            הצטרפו ותתחילו לחסוך עכשיו
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SupplierBenefitsSection;