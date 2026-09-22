import { useEffect, useRef, useState } from "react";
import { Compass } from "lucide-react";

const GREEN = "#7CB342";
const DARK = "#1E2A22";
const CREAM = "#FBF8F2";
const BLACK = "#1A1A1A";

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

const CONFLICT_ITEMS = [
    {
        who: "הקבלנים?",
        text: "האינטרס שלהם לגמור מהר ולעבור לפרויקט הבא.",
    },
    {
        who: "הספקים?",
        text: "האינטרס שלהם למכור לכם את הכי יקר.",
    },
    {
        who: "היועצים השונים?",
        text: "כל אחד מומחה בתחום שלו, אבל אף אחד לא רואה את התמונה המלאה שלכם.",
    },
];

function ConflictRow({ who, text, delay }) {
    return (
        <Reveal delay={delay}>
            <div className="flex items-center gap-4">
                <span
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{ backgroundColor: "#0a0404" }}
                >
                    ✕
                </span>
                <p className="flex-1 text-base leading-relaxed text-neutral-700">
                    <span className="font-bold text-neutral-900">{who}</span>{" "}
                    {text}
                </p>
            </div>
        </Reveal>
    );
}

function HardTruthSection() {
    return (
        <section
            className="relative overflow-hidden px-6 py-20"
            dir="rtl"
            style={{
                background: "linear-gradient(180deg, #FAFBF7 0%, #F0F3E8 100%)",
            }}
        >
            <div className="relative mx-auto max-w-2xl">
                <Reveal delay={0}>
                    <div className="mb-2 text-center">
                        <div
                            className="relative mx-auto flex w-fit items-center justify-center gap-3 px-9 py-4 mb-4"
                            style={{
                                backgroundColor: BLACK,
                                clipPath:
                                    "polygon(3% 0%, 97% 0%, 100% 50%, 97% 100%, 3% 100%, 0% 50%)",
                            }}
                        >
                            <Compass size={20} style={{ color: GREEN }} className="flex-shrink-0" />
                            <p
                                className="text-base font-bold leading-snug md:text-lg"
                                style={{ color: CREAM }}
                            >
                                והנה האמת שאף אחד לא אומר לכם
                            </p>
                        </div>
                        <h2 className="mt-2 text-2xl font-bold leading-tight text-neutral-900 md:text-3xl">
                            תעשיית הבנייה בישראל
                            <br />
                            לא פועלת לטובתכם
                        </h2>
                    </div>
                </Reveal>

                <Reveal delay={150}>
                    <div
                        className="mt-10 rounded-3xl bg-white p-8"
                        style={{
                            boxShadow: "0 16px 40px rgba(0,0,0,0.08)",
                            border: "1px solid #000000",
                        }}
                    >
                        <div className="space-y-6">
                            {CONFLICT_ITEMS.map((item, i) => (
                                <ConflictRow
                                    key={i}
                                    who={item.who}
                                    text={item.text}
                                    delay={200 + i * 130}
                                />
                            ))}
                        </div>
                    </div>
                </Reveal>

                <Reveal delay={650}>
                    <div className="mt-12 text-center">
                        <p className="mb-1 text-lg leading-relaxed text-neutral-700">
                            אף אחד לא פועל נגדכם,
                        </p>
                        <p className="text-lg leading-relaxed text-neutral-700">
                            אבל אף אחד גם לא נמצא{" "}
                            <span
                                className="font-bold"
                                style={{ color: "#7CB342" }}
                            >
                                100% בצד שלכם.
                            </span>
                        </p>
                    </div>
                </Reveal>

                <Reveal delay={800}>
                    <div
                        className="mt-10 rounded-2xl p-6 text-center"
                        style={{
                            backgroundColor: "#F0F3E8",
                            border: "1px solid #DCEAC7",
                        }}
                    >
                        <p className="mb-3 text-lg font-bold text-neutral-900">
                            מי שצריך לדאוג לאינטרסים שלכם - זה אתם.
                        </p>
                        <p className="text-base leading-relaxed text-neutral-600">
                            אבל איך אתם יכולים לדאוג לאינטרסים שלכם
                            <br />
                            כשאתם כשאתם לא יודעים מה השאלות הנכונות לשאול?
                        </p>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

export default HardTruthSection;