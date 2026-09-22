import { useRef, useState } from "react";
import m1 from "./assete/m1.png";
import m2 from "./assete/m2.png";
import m3 from "./assete/m3.webp";
import m4 from "./assete/m4.webp";
import m5 from "./assete/m5.webp";

const MODULES = [
    {
        number: 1,
        title: "יזום",
        subtitle: "הסודות שחוסכים לכם עשרות אלפים עוד לפני היסודות",
        image: m1,
        items: [
            {
                name: "הכרת המגרש",
                text: "תגלו איך לבחור מגרש חכם שמתאים במדויק לכם, ולזהות מראש מגרש שיבזבז לכם הון.",
            },
            {
                name: "משכנתא לבנייה פרטית",
                text: "תלמדו איך לקחת מימון נכון לבנייה, ולהימנע מהמלכודות הנפוצות של הבנקים.",
            },
            {
                name: "ביטוחים לבנייה",
                text: "תבינו אילו ביטוחים באמת חובה לעשות, ואיך למנוע טעויות שעלולות לעלות עשרות אלפים.",
            },
            {
                name: "תקציב וניהול כספים",
                text: "תקבלו טבלת תקציב חכמה שתעזור לכם לשלוט בכל שקל ולמנוע חריגות.",
            },
        ],
    },
    {
        number: 2,
        title: "תכנון",
        subtitle: "מהרעיון ועד תוכנית עבודה מדויקת",
        image: m2,
        items: [
            {
                name: "יועצים ובעלי מקצוע",
                text: "מי הם אנשי המקצוע שחייבים ללוות אתכם לאורך הדרך, ומה תפקידו של כל אחד מהם.",
            },
            {
                name: "שיטות בנייה",
                text: "תגלו את ההבדלים בין בנייה קונבנציונלית, מתועשת, ובנייה קלה - ומה היתרונות והחסרונות של כל שיטה.",
            },
            {
                name: "תהליך הרישוי",
                text: "איך להגיש בקשה להיתר, מה נדרש בכל שלב, ואיך לקצר את זמני ההמתנה.",
            },
            {
                name: "תכנון מוקדם",
                text: "איך לגבש תכנון אדריכלי נכון עוד לפני שמתחילים, ולהימנע מטעויות שיכולות לעלות ביוקר.",
            },
            {
                name: "תכנון מפורט",
                text: "תלמדו להבין תכניות עבודה, לקרוא מפרטים טכניים, ולוודא שכל פרט מתוכנן מראש.",
            },
            {
                name: "עיצוב פנים",
                text: "איך לבחור קונספט עיצובי, חומרים וצבעים, ולשלב פונקציונליות עם מראה מעוצב והרמוני.",
            },
        ],
    },
    {
        number: 3,
        title: "ביצוע",
        subtitle: "מהיסוד ועד המעטפת - הבסיס לכל מה שבא אחר כך",
        image: m3,
        items: [
            {
                name: "טרום תחילת הבנייה",
                text: "תגלו איך להכין נכון את השטח וההיערכות לפני העלייה על הקרקע, ולמנוע תקלות וטעויות יקרות ביום הראשון לביצוע.",
            },
            {
                name: "ביסוס",
                text: "תבינו איך סוג הקרקע משפיע על סוג היסודות, מתי משתמשים בכלונסאות או ברפסודה, ואיך לוודא שהיסודות יציבים ומשתלמים.",
            },
            {
                name: "תקרות ורצפות",
                text: "תלמדו על סוגי התקרות והרצפות, מה ההבדלים בין תקרה יצוקה, טרומית או חלולה, ואיך לוודא שהכל מתוכנן בהתאם לעומסים.",
            },
            {
                name: "מרחבים מוגנים",
                text: "תגלו איך נבנים ממ\"דים לפי תקן, אילו חומרים אסור או מותר להשתמש בהם, ומה לבדוק לפני האיטום והצביעה.",
            },
            {
                name: "מעטפת המבנה",
                text: "איך לבנות קירות חוץ מבודדים ואטומים, ואיך לבחור את סוג הבלוק, הבידוד והחיפוי הנכון.",
            },
            {
                name: "פתחים",
                text: "מה חשוב לדעת לפני התקנת החלונות והדלתות, ואיך להכין את השלד לפתחים בצורה מדויקת ובטוחה.",
            },
            {
                name: "מערכת מיזוג ואינסטלציה",
                text: "איך לתכנן אינסטלציה ונקודות נכונים, למנוע רטיביות ונזילות, ולהבטיח תקינה לשנים קדימה.",
            },
            {
                name: "מערכות חשמל ותקשורת",
                text: "איך לתכנן מערכת חשמל חכמה, למנוע חציבות חוזרות, ולוודא שכל נקודה נמצאת במקום הנכון.",
            },
            {
                name: "מערכת גז וחימום תת רצפתי",
                text: "תלמדו איך משלבים את מערכות החימום והגז בשלד, ואיך לתאם נכון בין יועצים וקבלנים.",
            },
            {
                name: "איטום ובידוד",
                text: "כל מה שצריך לדעת על איטום יסודות, מרפסות וגגות, ואיך למנוע חדירת מים ולשמור על טמפרטורה נעימה בבית.",
            },
            {
                name: "פיתוח שטח וגינון",
                text: "תלמדו איך לתכנן את סביבת הבית - שבילים, גינות ומדרגות חוץ, כך שהכול ישתלב בהרמוניה עם המבנה.",
            },
        ],
    },
    {
        number: 4,
        title: "גמרים",
        subtitle: "המקום שבו הבית מתחיל להיראות כמו בית",
        image: m4,
        items: [
            {
                name: "בריכה",
                text: "איך מתכננים ומבצעים בריכת שחייה בצורה נכונה, עם איטום מושלם ומערכות מושלמות.",
            },
            {
                name: "מערכות ביתיות",
                text: "מה קורה בשלב התקנת המערכות - חשמל, תקשורת, מים ומיזוג ואיך לוודא תיאום מושלם ביניהן.",
            },
            {
                name: "טיח",
                text: "איך לבחור את סוג הטיח המתאים, לזהות עבודה איכותית, ולהכין את הקירות לגימור מושלם.",
            },
            {
                name: "ריצוף וחיפויים",
                text: "תכירו את שלבי הריצוף, סוגי החומרים והדבקים, ואיך לוודא שהמראה אחיד ועמיד לאורך שנים.",
            },
            {
                name: "פתחים - חלונות ודלתות",
                text: "מתי מתבצעת התקנת הפתחים בפועל, מה לבדוק לפני סגירה, ואיך למנוע חדירות מים או עיוותים.",
            },
            {
                name: "גגות קלים ופרגולות",
                text: "תלמדו על ההבדלים בין גג בטון, רעפים ואלומיניום, איך לתכנן הצללה בטוחה, ומה חשוב לדעת לפני ביצוע.",
            },
            {
                name: "מדרגות",
                text: "איך לתכנן מדרגות נוחות, בטוחות ומעוצבות - כולל בחירת חומרים, מעקות ופודסטים.",
            },
            {
                name: "נגרות פנים ומטבחים",
                text: "איך לתכנן נכון את המטבח, הארונות והנישות כבר בשלבי השלד, כדי למנוע הפתעות בגמר.",
            },
            {
                name: "גבס וצבע",
                text: "איך לבנות תקרות וקירות גבס בצורה מקצועית, לבחור את סוג הגבס המתאים, ולצבוע בגימור מושלם.",
            },
        ],
    },
    {
        number: 5,
        title: "אכלוס",
        subtitle: "מהכנות אחרונות ועד המפתח ביד",
        image: m5,
        items: [
            {
                name: "ניקיון והכנה לאכלוס",
                text: "תגלו איך להכין את הבית לקראת הכניסה, החל מהניקיון העמוק ועד התיאום בין בעלי המקצוע.",
            },
            {
                name: "טופס 5 ותעודת גמר",
                text: "תלמדו איך מתנהל תהליך קבלת טופס 5 מהרשות, אילו מסמכים נדרשים, ואיך לזרז את האישור.",
            },
            {
                name: "תיוק ותחזוקת מבנה",
                text: "תבינו איך לארגן את כל המסמכים, האחריות והתכניות לתיק מתקן אחד, שישמור על הסדר שלכם לאורך שנים.",
            },
        ],
    },
];

function ModuleTab({ module, isActive, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="flex flex-shrink-0 flex-col items-center gap-1.5 rounded-2xl px-5 py-3 transition-all duration-200"
            style={{
                backgroundColor: isActive ? "#7CB342" : "#F0F3E8",
            }}
        >
            <span
                className="text-xl font-bold"
                style={{ color: isActive ? "#ffffff" : "#7CB342" }}
            >
                {module.number}
            </span>
            <span
                className="whitespace-nowrap text-xs font-bold"
                style={{ color: isActive ? "#ffffff" : "#5C8A2E" }}
            >
                {module.title}
            </span>
        </button>
    );
}

function ModuleItem({ name, text }) {
    return (
        <div className="flex items-start gap-3 py-3.5">
            <span
                className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                style={{ backgroundColor: "#7CB342" }}
            >
                ✓
            </span>
            <p className="text-base leading-relaxed text-neutral-700">
                <span className="font-bold text-neutral-900">{name}</span> -{" "}
                {text}
            </p>
        </div>
    );
}

function ModuleNavButtons({ activeModule, onChange, total }) {
    const isFirst = activeModule === 0;
    const isLast = activeModule === total - 1;

    return (
        <div className="mt-6 flex items-center justify-between gap-4">
            <button
                type="button"
                onClick={() => !isFirst && onChange(activeModule - 1)}
                disabled={isFirst}
                className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all"
                style={{
                    backgroundColor: isFirst ? "#F5F5F0" : "#e3edcb",
                    color: isFirst ? "#C4C4BC" : "#5C8A2E",
                    cursor: isFirst ? "default" : "pointer",
                }}
            >
                <span>→</span>
                <span>מודול קודם</span>
            </button>

            <span className="text-sm font-bold text-neutral-400">
                {activeModule + 1} / {total}
            </span>

            <button
                type="button"
                onClick={() => !isLast && onChange(activeModule + 1)}
                disabled={isLast}
                className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white transition-all"
                style={{
                    backgroundColor: isLast ? "#D9DED0" : "#7CB342",
                    cursor: isLast ? "default" : "pointer",
                }}
            >
                <span>מודול הבא</span>
                <span>←</span>
            </button>
        </div>
    );
}

function CourseModulesSection() {
    const [activeModule, setActiveModule] = useState(0);
    const current = MODULES[activeModule];
    const cardTopRef = useRef(null);

    // מחליף מודול וגולל בחזרה לראש הכרטיס - כדי שהמשתמש לא יישאר למטה מול תוכן חדש בלי הקשר
    const goToModule = (index) => {
        setActiveModule(index);
        if (cardTopRef.current) {
            cardTopRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    return (
        <section
            className="relative px-6 py-20"
            dir="rtl"
            style={{
                background: "linear-gradient(180deg, #FAFBF7 0%, #F0F3E8 100%)",
            }}
        >
            <div className="mx-auto max-w-3xl">
                <div className="mb-3 text-center">
                    <p
                        className="text-sm font-bold uppercase tracking-widest"
                        style={{ color: "#7CB342" }}
                    >
                        מה בדיוק תקבלו?
                    </p>
                    <h2 className="mt-2 text-2xl font-bold text-neutral-900 md:text-3xl">
                        הקורס בנוי מ-5 מודולים
                    </h2>
                </div>

                {/* טאבים - ממורכזים, נעטפים אם צריך */}
                <div className="mt-10 flex flex-wrap justify-center gap-3 px-1">
                    {MODULES.map((module, i) => (
                        <ModuleTab
                            key={module.number}
                            module={module}
                            isActive={i === activeModule}
                            onClick={() => goToModule(i)}
                        />
                    ))}
                </div>

                {/* נקודת עוגן - גם הגלילה מהניווט חוזרת לכאן */}
                <div ref={cardTopRef} className="mt-16">
                    {/* תמונת המחשב הנייד - יושבת חצי מעל גבול הכרטיס, קטנה יותר */}
                    <div
                        key={current.number}
                        className="relative z-10 mx-auto -mb-10 w-full max-w-[220px]"
                        style={{ animation: "fadeInModule 0.4s ease" }}
                    >
                        <img
                            src={current.image}
                            alt={`מודול ${current.number} - ${current.title}`}
                            className="w-full object-contain drop-shadow-lg"
                        />
                    </div>

                    <div
                        className="rounded-3xl bg-white px-8 pb-8 pt-14"
                        style={{
                            boxShadow: "0 16px 40px rgba(0,0,0,0.07)",
                            border: "1px solid #EFEFEA",
                        }}
                    >
                        <div className="mb-6 text-center">
                            <h3 className="text-xl font-bold leading-snug text-neutral-900">
                                {current.title} - {current.subtitle}
                            </h3>
                        </div>

                        <div className="divide-y" style={{ borderColor: "#EFEFEA" }}>
                            {current.items.map((item, i) => (
                                <ModuleItem
                                    key={i}
                                    name={item.name}
                                    text={item.text}
                                />
                            ))}
                        </div>
                    </div>

                    {/* כפתורי ניווט - מחוץ לכרטיס, מתחתיו */}
                    <ModuleNavButtons
                        activeModule={activeModule}
                        onChange={goToModule}
                        total={MODULES.length}
                    />
                </div>
            </div>

            <style>{`
                @keyframes fadeInModule {
                    from { opacity: 0; transform: translateY(-6px) scale(0.95); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
            `}</style>
        </section>
    );
}

export default CourseModulesSection;