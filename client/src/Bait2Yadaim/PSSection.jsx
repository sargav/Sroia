import { useEffect, useRef, useState } from "react";
import villaBg from './assete/vila.webp'

// אנימציית כניסה עדינה לכל אלמנט - fade + עלייה קלה
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
            { threshold: 0.3 }
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

function PSSection() {
    return (
        <section className="relative overflow-hidden py-20">
            {/* אנימציות מקומיות */}
            <style>{`
                /* כניסה עם הבהוב כפול - נכנסת, מהבהבת פעמיים, ונשארת יציבה */
                @keyframes titleDoubleFlicker {
                    0%   { opacity: 0; }
                    15%  { opacity: 1; }
                    30%  { opacity: 0.3; }
                    45%  { opacity: 1; }
                    60%  { opacity: 0.3; }
                    75%  { opacity: 1; }
                    100% { opacity: 1; }
                }
                .ps-title-flicker {
                    animation: titleDoubleFlicker 1.1s ease-in-out;
                }

                /* הבהוב מתמשך - עם מעבר צבע לירוק וגדילה קלה בשיא */
                @keyframes decisionPulse {
                    0%, 100% {
                        opacity: 1;
                        color: #ffffff;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 0.85;
                        color: #9CD65C;
                        transform: scale(1.08);
                    }
                }
                .decision-pulse {
                    display: inline-block;
                    animation: decisionPulse 2.4s ease-in-out infinite;
                }
            `}</style>

            {/* התמונה - עם attachment: fixed כדי שתישאר "דבוקה" בזמן גלילה */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-fixed"
                style={{ backgroundImage: `url(${villaBg})` }}
            />

            {/* השכבה השחורה השקופה - זזה רגיל עם הגלילה */}
            <div className="absolute inset-0 bg-black/65" />

            {/* התוכן הטקסטואלי */}
            <div className="relative mx-auto max-w-2xl px-6 text-center text-white" dir="rtl">
                <h3 className="ps-title-flicker mb-4 text-2xl font-bold">
                    P.S. - אל תשכחו:
                </h3>

                <Reveal delay={150}>
                    <p className="mb-6 text-lg">מחירי הבנייה עולים כל חודש.</p>
                </Reveal>

                <Reveal delay={300}>
                    <p className="mb-6 text-lg font-bold">
                        כל יום שאתם מחכים = עוד כסף
                        <br />
                        שאתם עלולים לבזבז על טעויות.
                    </p>
                </Reveal>

                <Reveal delay={450}>
                    <p className="mb-6 text-lg">
                        ואתם לא רוצים להיות המשפחה שאומרת:
                        <br />
                        "הלוואי והיינו יודעים את זה לפני..."
                        <br />
                        תהיו המשפחה שאומרת:
                        <br />
                        "כמה טוב שלמדנו את זה לפני!"
                    </p>
                </Reveal>

                <Reveal delay={600}>
                    <p className="text-xl font-bold">
                        <span className="decision-pulse">ההחלטה בידיים שלכם.</span>
                    </p>
                </Reveal>
            </div>
        </section>
    );
}

export default PSSection;