import { useEffect, useRef, useState } from "react";
import checkIcon from "./assete/icon-check-circle-v2.png";


// אנימציית כניסה עדינה - נניח שכבר יש לך Reveal בפרויקט, זו גרסה עצמאית למקרה שאין
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
                transform: visible ? "translateY(0)" : "translateY(12px)",
                transition: "opacity 0.5s ease, transform 0.5s ease",
            }}
        >
            {children}
        </div>
    );
}

const FIT_ITEMS = [
    "אתם מתכננים לבנות בית פרטי",
    "אתם באמצע תהליך הבנייה ומרגישים אבודים",
    "אתם רוצים לדעת בדיוק מה קורה בכל שלב",
    "אתם פוחדים מטעויות יקרות",
    "אתם רוצים להרגיש בטוחים מול קבלנים וספקים",
    "אתם רוצים לחסוך כסף בלי לפגוע באיכות",
];

const NOT_FIT_ITEMS = [
    'אתם מחפשים "פתרונות קסם" ללא עבודה',
    "אתם לא מוכנים להשקיע זמן בלמידה",
    "אתם מעדיפים לסמוך על מזל",
    "אתם חושבים שגוגל יספיק",
];

function IconCheck() {
    return (
        <span
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full"
            style={{ backgroundColor: "#7CB342" }}
        >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                    d="M3 8.5L6.2 11.5L13 4.5"
                    stroke="white"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </span>
    );
}

function IconX() {
    return (
        <span
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full"
            style={{ backgroundColor: "#0d0d0d" }}
        >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                    d="M2 2L12 12M12 2L2 12"
                    stroke="white"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                />
            </svg>
        </span>
    );
}

function FitCard({ title, items, variant }) {
    const isPositive = variant === "positive";

    return (
        <Reveal delay={isPositive ? 0 : 150}>
            <div
                className="h-full rounded-2xl bg-white p-8"
                style={{
                    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                    border: isPositive ? "1px solid #DCEAC7" : "1px solid #F2DAD8",
                }}
            >
                

                <h3 className="mb-6 text-xl font-bold text-neutral-900">{title}</h3>

                <div className="space-y-4">
                    {items.map((text, i) => (
                        <div key={i} className="flex items-center gap-3">
                            {isPositive ? <IconCheck /> : <IconX />}
                            <p className="text-base leading-relaxed text-neutral-700">
                                {text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </Reveal>
    );
}

function FitSection() {
    return (
        <section
            className="relative overflow-hidden px-6 py-20"
            dir="rtl"
            style={{
                background:
                    "linear-gradient(180deg, #FAFBF7 0%, #F0F3E8 100%)",
            }}
        >
            <div className="relative mx-auto max-w-4xl">
                <div className="mb-14 text-center">
                    <p
                        className="text-sm font-bold uppercase tracking-widest"
                        style={{ color: "#7CB342" }}
                    >
                        לפני שממשיכים
                    </p>
                    <h2 className="mt-2 text-3xl font-bold text-neutral-900 md:text-4xl">
                        למי הקורס מתאים?
                    </h2>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <FitCard
                        title="הקורס בול בשבילכם"
                        items={FIT_ITEMS}
                        variant="positive"
                    />
                    <FitCard
                        title="כנראה שזה לא הזמן שלכם"
                        items={NOT_FIT_ITEMS}
                        variant="negative"
                    />
                </div>
            </div>
        </section>
    );
}

export default FitSection;