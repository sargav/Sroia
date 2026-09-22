import { useEffect, useRef, useState } from "react";
import v3Bg from "./assete/V3.jpg";

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

function ScenarioCard({ number, title, lines, variant, tilt }) {
    const isBad = variant === "bad";
    const accentColor = isBad ? "#D97B74" : "#7CB342";

    return (
        <div
            className="relative rounded-3xl p-8 text-white transition-transform duration-300 hover:rotate-0"
            style={{
                backgroundColor: isBad ? "#4A3A38" : "#33422A",
                transform: `rotate(${tilt}deg)`,
                boxShadow: "0 16px 40px rgba(0,0,0,0.18)",
            }}
        >
            {/* מספר ענק כרקע דקורטיבי */}
            <span
                className="absolute -top-4 left-4 text-8xl font-black opacity-10"
                style={{ color: "#ffffff" }}
            >
                {number}
            </span>

            <div className="relative">
                <span
                    className="mb-4 inline-block text-xs font-bold uppercase tracking-widest"
                    style={{ color: accentColor }}
                >
                    מצב {number}
                </span>

                <h4 className="mb-4 text-2xl font-bold">{title}</h4>

                <div className="space-y-1.5">
                    {lines.map((line, i) => (
                        <p key={i} className="text-base leading-relaxed text-white/70">
                            {line}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
}

function ScenarioComparisonSection() {
    return (
        <section className="relative overflow-hidden px-6 py-24" dir="rtl">
            {/* תמונת הרקע - V3 */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${v3Bg})` }}
            />

            {/* שכבה שחורה שקופה */}
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

            <div className="relative z-10 mx-auto max-w-3xl">
                <Reveal delay={0}>
                    <div className="mb-16 text-center">
                        <p
                            className="text-lg font-bold uppercase tracking-widest"
                            style={{ color: "#9CD65C" }}
                        >
                            עדיין מתלבטים?
                        </p>
                        <h2 className="mt-2 text-2xl font-bold text-white md:text-3xl">
                            חשבו על זה ככה
                        </h2>
                        <p className="mt-3 text-base text-white/80">
                            בעוד שנה מהיום, אתם תהיו באחד משני מצבים:
                        </p>
                    </div>
                </Reveal>

                <div className="grid gap-10 py-6 md:grid-cols-2">
                    <Reveal delay={150}>
                        <ScenarioCard
                            number="1"
                            title="באמצע בנייה, לחוצים"
                            lines={["עם חריגות תקציב", "ותחושה שאיבדתם שליטה."]}
                            variant="bad"
                            tilt={-2}
                        />
                    </Reveal>

                    <Reveal delay={300}>
                        <ScenarioCard
                            number="2"
                            title="באמצע בנייה, רגועים"
                            lines={[
                                "עם תקציב תחת שליטה",
                                "ותחושה שאתם יודעים בדיוק מה קורה.",
                            ]}
                            variant="good"
                            tilt={2}
                        />
                    </Reveal>
                </div>

                <Reveal delay={450}>
                    <div className="mt-10 text-center">
                        <p className="mb-1 text-lg font-bold text-white">
                            ההבדל בין שני המצבים?
                        </p>
                        <p className="mb-3 text-base text-white/80">השקעה של</p>

                        <p
                            className="mb-6 text-4xl font-bold"
                            style={{ color: "#9CD65C" }}
                        >
                            1,987 ₪ בלבד
                        </p>

                        <p className="mx-auto mb-8 max-w-md text-base leading-relaxed text-white/80">
                            הצטרפו לקורס "בית בשתי ידיים" בהשקעה חד-פעמית וגישה
                            לכל החיים + 30 יום החזר כספי מלא
                        </p>

                        <a
                            href="#cta-form"
                            className="mx-auto block w-full max-w-sm rounded-full px-8 py-4 text-center text-lg font-bold text-white transition-transform hover:scale-[1.02]"
                            style={{
                                backgroundColor: "#7CB342",
                                boxShadow: "0 8px 20px rgba(124,179,66,0.35)",
                            }}
                        >
                            אני בוחר במצב 2 - תרשמו אותי!
                        </a>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

export default ScenarioComparisonSection;