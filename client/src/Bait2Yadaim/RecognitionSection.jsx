import { useEffect, useRef, useState } from "react";
import { HelpCircle } from "lucide-react";
import lev from './assete/l.webp'

const GREEN = "#7CB342";
const DARK = "#1E2A22";
const CREAM = "#FBF8F2";

// אנימציית כניסה עם קפיצה אמיתית - keyframes עם כמה תחנות קפיצה
function BounceReveal({ children, delay = 0, isLast = false }) {
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
            { threshold: 0.8 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [delay]);

    return (
        <div
            ref={ref}
            className={isLast ? "" : "mb-8"}
            style={{
                opacity: visible ? 1 : 0,
                animation: visible ? "quoteBounceIn 1s ease" : "none",
            }}
        >
            {children}
        </div>
    );
}

function QuestionQuote({ text, delay, isLast }) {
    return (
        <BounceReveal delay={delay} isLast={isLast}>
            <div className="relative">
                <div
                    className="relative rounded-2xl bg-white px-6 py-5 shadow-sm ring-1 ring-black/5"
                    style={{ borderRight: `3px solid ${GREEN}` }}
                >
                    <span
                        className="absolute right-4 top-1 text-3xl font-black leading-none"
                        style={{ color: "#EAF2DD" }}
                        aria-hidden="true"
                    >
                        "
                    </span>
                    <p
                        className="relative text-center text-base font-bold leading-relaxed md:text-lg"
                        style={{ color: DARK }}
                    >
                        {text}
                    </p>
                    <span
                        className="absolute bottom-1 left-4 text-3xl font-black leading-none"
                        style={{ color: "#EAF2DD" }}
                        aria-hidden="true"
                    >
                        "
                    </span>
                </div>

                {/* תג סימן שאלה */}
                <div
                    className="absolute -bottom-4 right-8 flex h-9 w-9 items-center justify-center rounded-full shadow-md"
                    style={{ backgroundColor: DARK }}
                >
                    <HelpCircle size={18} style={{ color: GREEN }} strokeWidth={2.5} />
                </div>
            </div>
        </BounceReveal>
    );
}

function RecognitionSection() {
    return (
        <section
            className="relative w-full px-6 py-16"
            dir="rtl"
            style={{ backgroundColor: CREAM }}
        >
            <style>{`
                @keyframes quoteBounceIn {
                    0%   { transform: translateY(-40px) scale(0.85); }
                    50%  { transform: translateY(6px) scale(1.03); }
                    70%  { transform: translateY(-4px) scale(0.99); }
                    85%  { transform: translateY(2px) scale(1.005); }
                    100% { transform: translateY(0) scale(1); }
                }
            `}</style>

            <div className="mx-auto max-w-lg">
                {/* הטמעת הסרטון */}
                <div className="overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/5">
                    <iframe
                        src="https://www.youtube.com/embed/Zg5GS3l9bdE"
                        title="YouTube video"
                        className="aspect-video w-full"
                        allowFullScreen
                    ></iframe>
                </div>

                <p
                    className="py-6 text-center text-lg font-extrabold leading-relaxed"
                    style={{ color: DARK }}
                >
                    אם אתם עכשיו
                    <br />
                    בתהליך של בניית בית,
                    <br />
                    כנראה שאתם מכירים
                    <br />
                    את התחושות האלה:
                </p>

                <img src={lev} alt="lev" className="mx-auto w-14 h-14 md:w-16 md:h-16 object-contain" />

                <p className="pb-10 text-center text-base leading-relaxed text-neutral-600">
                    הלב שמתחיל לפעום קצת יותר מהר
                    <br />
                    כשאתם פותחים עוד פעם את גוגל.
                </p>

                {/* 3 ציטוטי הזדהות - נכנסים אחד אחרי השני עם קפיצה */}
                <div className="pb-4">
                    <QuestionQuote
                        text="איך יודעים אם הקבלן שבחרתם באמת מתאים?"
                        delay={0}
                    />
                    <QuestionQuote
                        text="התקציב שתכננו - האם הוא באמת יספיק, או שנגלה הפתעות באמצע?"
                        delay={200}
                    />
                    <QuestionQuote
                        text="מה אם הבנייה תימשך הרבה יותר זמן ונישאר תקועים בשכירות?"
                        delay={400}
                        isLast
                    />
                </div>
            </div>
        </section>
    );
}

export default RecognitionSection;