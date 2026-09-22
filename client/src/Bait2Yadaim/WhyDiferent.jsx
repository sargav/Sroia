import { useEffect, useRef, useState } from "react";
import bgImage from "./assete/villa_bg.png"; // תחליפי לשם הקובץ שלך

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
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
        >
            {children}
        </div>
    );
}

const DIFFERENCE_ITEMS = [
    {
        title: "מכסה את כל התהליך",
        text: "לא רק תקציב. לא רק רישוי. לא רק גמרים. הכל - מהתחלה ועד הסוף.",
    },
    {
        title: "מסודר בסדר הנכון",
        text: "לא עוד בלבול. אתם יודעים בדיוק מה עושים בכל שלב.",
    },
    {
        title: "מכסה את כל הגורמים",
        text: "מועצה, בזק, חברת חשמל, קבלנים, ספקים ועוד עשרות גורמים - כולם בפנים.",
    },
    {
        title: "מבוסס על ניסיון בשטח",
        text: "15 שנות ניסיון. לא תיאוריה. לא מה שכתוב באינטרנט. מה שעובד בפועל במאות פרויקטים.",
    },
    {
        title: "נבנה בשבילכם",
        text: "בעלי הבתים - לא למקצוענים. לא לקבלנים. לכם - שרוצים לבנות בית ולהבין מה קורה.",
    },
];

function DifferenceRow({ number, title, text, delay }) {
    return (
        <Reveal delay={delay}>
            <div
                className="relative rounded-2xl p-5 pb-6"
                style={{
                    backgroundColor: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    backdropFilter: "blur(6px)",
                }}
            >
                <div className="flex items-start gap-4">
                    <span
                        className="text-3xl font-black leading-none"
                        style={{ color: "rgba(124,179,66,0.6)" }}
                    >
                        {number}
                    </span>
                    <div className="flex-1 text-right">
                        <h4 className="mb-1 text-lg font-bold text-white">
                            {title}
                        </h4>
                        <p className="text-base leading-relaxed text-white/75">
                            {text}
                        </p>
                    </div>
                </div>

                {/* קו תחתון ירוק דק - "underline" מודגש */}
                <div
                    className="absolute bottom-0 right-5 h-0.5 w-10 rounded-full"
                    style={{ backgroundColor: "#7CB342" }}
                />
            </div>
        </Reveal>
    );
}

function WhyDifferentSection() {
    return (
        <section className="relative overflow-hidden px-6 py-20" dir="rtl">
            {/* תמונת הרקע - להחליף בנתיב שלך */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${bgImage})` }}
            />

            {/* שכבה כהה שקופה */}
            <div className="absolute inset-0 bg-black/70" />

            <div className="relative z-10 mx-auto max-w-2xl">
                <Reveal delay={0}>
                    <div className="mb-3 text-center">
                        <span
                            className="inline-block rounded-full px-4 py-1.5 text-sm font-bold"
                            style={{
                                backgroundColor: "rgba(124,179,66,0.18)",
                                color: "#9CD65C",
                            }}
                        >
                            במה שונים אנחנו מכל מה שיש באינטרנט?
                        </span>
                    </div>
                    <h2 className="mb-12 text-center text-2xl font-bold leading-tight text-white md:text-3xl">
                        למה "בית בשתי ידיים"
                        <br />
                        שונה מכל מה שיש באינטרנט?
                    </h2>
                </Reveal>

                <div className="space-y-4">
                    {DIFFERENCE_ITEMS.map((item, i) => (
                        <DifferenceRow
                            key={i}
                            number={String(i + 1).padStart(2, "0")}
                            title={item.title}
                            text={item.text}
                            delay={150 + i * 120}
                        />
                    ))}
                </div>

                <Reveal delay={150 + DIFFERENCE_ITEMS.length * 120 + 100}>
                    <div className="mt-12 text-center">
                        <a
                            href="#cta-form"
                            className="mx-auto block w-full max-w-sm rounded-full px-8 py-4 text-center text-lg font-bold text-white transition-transform hover:scale-[1.02]"
                            style={{
                                backgroundColor: "#7CB342",
                                boxShadow: "0 8px 20px rgba(124,179,66,0.35)",
                            }}
                        >
                            הצטרפו ותתחילו לחקור עכשיו!
                        </a>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

export default WhyDifferentSection;