import { useEffect, useRef, useState } from "react";
import moneyIcon from "./assete/pay.webp";
import handHouse from './assete/handHouse.webp'

// אנימציית כניסה עדינה
function Reveal({ children, delay = 0 }) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => setVisible(true), delay);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [delay]);

    return (
        <div
            ref={ref}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(14px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
        >
            {children}
        </div>
    );
}

const MISTAKES = [
    {
        title: "טעות בתיאום אלומיניום",
        cost: "עיכוב של 6 שבועות + 8,000 ₪ נוספים לפחות",
    },
    {
        title: "שכחתם לתכנן נקודת חשמל",
        cost: "2,500 ₪ לפרוץ קיר ולתקן",
    },
    {
        title: "בחרתם קבלן לא אמין",
        cost: "50,000-150,000 ₪ ועוד 6 חודשי עיכובים",
    },
    {
        title: "שילמתם לקבלן יותר מדי מראש",
        cost: "הכסף באוויר והקבלן נעלם",
    },
    {
        title: "לא ידעתם על עלות נסתרת",
        cost: "פתאום חסרים 30,000 ₪ בתקציב",
    },
];

function MistakeCard({ title, cost, delay }) {
    return (
        <Reveal delay={delay}>
            <div
                className="flex items-center gap-4 rounded-2xl bg-white p-5"
                style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}
            >
                <span
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-lg font-bold"
                    style={{ backgroundColor: "#f4f9ed", color: "#dcf3c6" }}
                >
                    <img src={moneyIcon} alt="icon" />
                </span>
                <div className="flex-1 text-right">
                    <p className="font-bold text-neutral-900">{title}</p>
                    <p className="text-sm text-neutral-500">{cost}</p>
                </div>
            </div>
        </Reveal>
    );
}

function InvestmentSection() {
    return (
        <section
            className="relative overflow-hidden px-6 py-20"
            dir="rtl"
            style={{
                background: "linear-gradient(180deg, #FAFBF7 0%, #F0F3E8 100%)",
            }}
        >
            <div className="mx-auto max-w-2xl">
                {/* חלק 1 - כמה עולה לא לדעת */}
                <Reveal delay={0}>
                    <div className="mb-2 text-center">
                        <p
                            className="text-sm font-bold uppercase tracking-widest"
                            style={{ color: "#7CB342" }}
                        >
                            בואו נדבר על השקעה
                        </p>
                        <h2 className="mt-2 text-2xl font-bold text-neutral-900 md:text-3xl">
                            כמה עולה לא לדעת מה עושים?
                        </h2>
                    </div>
                </Reveal>

                <div className="mt-10 space-y-3">
                    {MISTAKES.map((item, i) => (
                        <MistakeCard
                            key={i}
                            title={item.title}
                            cost={item.cost}
                            delay={150 + i * 100}
                        />
                    ))}
                </div>

                <Reveal delay={150 + MISTAKES.length * 100 + 100}>
                    <div
                        className="mt-6 rounded-2xl p-5 text-center"
                        style={{
                            backgroundColor: "#F0F3E8",
                            border: "1px solid #DCEAC7",
                        }}
                    >
                        <p className="text-lg font-bold text-neutral-900">
                            סה"כ: טעויות קטנות
                        </p>
                        <p className="text-lg font-bold" style={{ color: "#7CB342" }}>
                            יכולות לעלות מאות אלפי שקלים.
                        </p>
                    </div>
                </Reveal>

                {/* חלק 2 - השאלה ששאלנו את עצמנו */}
                <Reveal delay={150 + MISTAKES.length * 100 + 250}>
                    <div className="mt-16 text-center">
                        <h3 className="mb-8 text-xl font-bold text-neutral-900 md:text-2xl">
                            אז כמה שווה לדעת בדיוק מה לעשות?
                        </h3>

                        <div
                            className="rounded-3xl bg-white p-8"
                            style={{ boxShadow: "0 16px 40px rgba(0,0,0,0.07)" }}
                        >
                            <p className="mb-4 text-base leading-relaxed text-neutral-600">
                                כשישבנו לתמחר את הקורס, שאלנו את עצמנו:
                                <br />
                                "כמה כסף הקורס שלנו יכול לחסוך למשפחה ממוצעת?"
                            </p>

                            <div
                                className="my-6 rounded-2xl p-6"
                                style={{ backgroundColor: "#F0F7E8" }}
                            >
                                <p
                                    className="mb-2 text-2xl font-bold"
                                    style={{ color: "#5C8A2E" }}
                                >
                                    לפחות 100,000-200,000 ₪
                                </p>
                                <p className="text-base font-bold text-neutral-800">
                                    בעולם אידיאלי, היינו גובים 8,200 ₪.
                                </p>
                                <p className="mt-1 text-sm text-neutral-500">
                                    זה מחיר הוגן עבור ערך כזה.
                                </p>
                            </div>

                            <p className="mb-4 text-base leading-relaxed text-neutral-600">
                                אבל אז הבנו את הפרדוקס:
                            </p>
                            <p className="mb-4 text-base leading-relaxed text-neutral-600">
                                דווקא המשפחות שהכי צריכות את הקורס - אלה שכל
                                שקל חשוב להן, אלה שמפחדות מחריגות, אלה שלא
                                יכולות להרשות לעצמן טעויות - הן בדיוק אלה
                                שיחששו להוציא 8,200 ₪ על הקורס.
                            </p>
                            <p className="font-bold text-neutral-800">
                                זה כמו מעגל קסמים: מי שאין לו מספיק ידע -
                                משלם יותר בטעויות. אבל מי שאין לו מספיק כסף -
                                לא קונה את הידע.
                            </p>
                            <p className="mt-4 font-bold" style={{ color: "#7CB342" }}>
                                אז קיבלנו החלטה עסקית לא שגרתית: להוריד את
                                המחיר למינימום האפשרי שעדיין מאפשר לנו.
                            </p>
                        </div>
                    </div>
                </Reveal>

                {/* חלק 3 - המחיר הסופי */}
                <Reveal delay={150 + MISTAKES.length * 100 + 400}>
                    <div className="mt-16 text-center">
                        <p className="mb-3 text-base text-neutral-600">
                            ולכן מחיר הקורס עכשיו הוא רק
                        </p>

                        <div
                            className="relative mx-auto max-w-md overflow-hidden rounded-3xl bg-white p-8"
                            style={{ boxShadow: "0 20px 50px rgba(0,0,0,0.10)" }}
                        >
                            <div
                                className="h-2 w-full"
                                style={{
                                    background:
                                        "linear-gradient(90deg, #7CB342 0%, #A8D66B 100%)",
                                    marginTop: "-2rem",
                                    marginInline: "-2rem",
                                    marginBottom: "1.5rem",
                                    width: "calc(100% + 4rem)",
                                }}
                            />
                            <div className="mb-4 flex justify-center">
                                <img
                                    src={handHouse}
                                    alt=""
                                    className="h-16 w-16 object-contain"
                                />
                            </div>

                            <p
                                className="mb-3 text-5xl font-bold"
                                style={{ color: "#7CB342" }}
                            >
                                1,987 ₪
                            </p>

                            <div
                                className="mb-5 inline-block rounded-full px-4 py-1.5 text-sm font-bold"
                                style={{
                                    backgroundColor: "#F0F7E8",
                                    color: "#5C8A2E",
                                }}
                            >
                                או רק 198 ₪ לחודש ב-10 תשלומים
                            </div>

                            <div className="space-y-1.5 text-right">
                                {[
                                    "198 ₪ בחודש.",
                                    "פחות מארוחה זוגית במסעדה.",
                                    "פחות משעת עבודה של טייח.",
                                    "פחות מביקור אחד של יועץ.",
                                    "פחות מטעות של חצי מ\"ר אריחים.",
                                ].map((line, i) => (
                                    <p
                                        key={i}
                                        className="text-sm leading-relaxed text-neutral-500"
                                    >
                                        {line}
                                    </p>
                                ))}
                            </div>
                        </div>

                        <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-neutral-600">
                            הקורס הזה יחזיר את עצמו כבר בשבוע הראשון של
                            הבנייה. טעות אחת שתמנעו, קבלן אחד שתמצאו במחיר
                            הנכון - וכבר הרווחתם פי 50 מהמחיר.
                        </p>

                        <div className="mt-8 space-y-1">
                            <p className="text-base font-bold text-neutral-900">
                                כי בסוף, המטרה שלנו
                            </p>
                            <p className="text-base font-bold text-neutral-900">
                                היא לא להרוויח הכי הרבה.
                            </p>
                            <p className="text-base font-bold" style={{ color: "#7CB342" }}>
                                המטרה היא שהכי הרבה משפחות
                            </p>
                            <p className="text-base font-bold" style={{ color: "#7CB342" }}>
                                יבנו בית בלי להיהרס כלכלית.
                            </p>
                        </div>

                        <a
                            href="#cta-form"
                            className="mx-auto mt-8 block w-full max-w-sm rounded-full px-8 py-4 text-center text-lg font-bold text-white transition-transform hover:scale-[1.02]"
                            style={{
                                backgroundColor: "#7CB342",
                                boxShadow: "0 8px 20px rgba(124,179,66,0.35)",
                            }}
                        >
                            הצטרפו ותתחילו לחסוך עכשיו!
                        </a>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

export default InvestmentSection;