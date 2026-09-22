import { useEffect, useRef, useState } from "react";
import handHouseIcon from "./assete/handHouse.webp";

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

const BENEFITS = [
    "קורס מלא ב-5 מודולים - מרכישת מגרש עד קבלת מפתח",
    "מפת דרכים מפורטת לכל התהליך",
    "טבלת תקציב מקצועית באקסל",
    "צ'ק-ליסטים לכל שלב",
    "גישה לכל החיים + עדכונים",
    "30 יום החזר כספי מלא",
];

function BenefitRow({ text }) {
    return (
        <div className="flex items-center gap-3">
            <span
                className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                style={{ backgroundColor: "#7CB342" }}
            >
                ✓
            </span>
            <p className="text-base leading-relaxed text-neutral-700">{text}</p>
        </div>
    );
}

function CTASection() {
    return (
        <section
            className="relative overflow-hidden px-6 py-20"
            dir="rtl"
            style={{
                background: "linear-gradient(180deg, #FAFBF7 0%, #F0F3E8 100%)",
            }}
        >
            <div className="relative mx-auto max-w-lg">
                <Reveal delay={0}>
                    <div
                        className="rounded-3xl bg-white px-8 py-10 text-center"
                        style={{
                            boxShadow: "0 20px 50px rgba(0,0,0,0.09)",
                            border: "1px solid #EFEFEA",
                        }}
                    >
                        {/* אייקון */}
                        <div className="mb-6 flex justify-center">
                            <div
                                className="flex h-24 w-24 items-center justify-center rounded-full"
                                style={{ backgroundColor: "#F0F7E8" }}
                            >
                                <img
                                    src={handHouseIcon}
                                    alt=""
                                    className="h-14 w-14 object-contain"
                                />
                            </div>
                        </div>

                        {/* כותרת */}
                        <p
                            className="mb-2 text-sm font-bold uppercase tracking-widest"
                            style={{ color: "#7CB342" }}
                        >
                            הזמן שלכם הגיע
                        </p>
                        <h2 className="mb-2 text-2xl font-bold leading-tight text-neutral-900 md:text-3xl">
                            הגיע הזמן לקחת שליטה
                            <br />
                            על הבנייה שלכם
                        </h2>
                        <p className="mb-8 text-base font-bold text-neutral-800">
                            הצטרפו עכשיו ל"בית בשתי ידיים"
                        </p>

                        {/* מה מקבלים */}
                        <div
                            className="mb-8 rounded-2xl p-6 text-right"
                            style={{ backgroundColor: "#FAFBF7" }}
                        >
                            <p className="mb-4 text-center text-sm font-bold uppercase tracking-wide text-neutral-500">
                                מה אתם מקבלים
                            </p>
                            <div className="space-y-3">
                                {BENEFITS.map((text, i) => (
                                    <BenefitRow key={i} text={text} />
                                ))}
                            </div>
                        </div>

                        {/* מחיר */}
                        <p
                            className="mb-1 text-4xl font-bold"
                            style={{ color: "#7CB342" }}
                        >
                            רק 1,987 ₪
                        </p>
                        <p className="mb-8 text-sm text-neutral-500">
                            תשלום מאובטח | גישה מיידית | 30 יום החזר מלא
                        </p>

                        {/* כפתור */}
                        <a  
                            href="#cta-form"
                            type="button"
                            className="w-full rounded-full px-8 py-4 text-lg font-bold text-white transition-transform hover:scale-[1.02]"
                            style={{
                                backgroundColor: "#7CB342",
                                boxShadow: "0 10px 24px rgba(124,179,66,0.35)",
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

export default CTASection;