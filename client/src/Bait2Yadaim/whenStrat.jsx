import { useEffect, useRef, useState } from "react";
import asafPhoto from "./assete/psd_asaf.png";
import {
    Search,
    Video,
    Users,
    Route,
    ListChecks,
    Map,
    ArrowDown,
    Compass
} from "lucide-react";

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
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
        >
            {children}
        </div>
    );
}

function PersonalStorySection() {
    return (
        <section
            className="relative overflow-hidden px-6 py-10"
            dir="rtl"
            style={{
                background: "linear-gradient(180deg, #FAFBF7 0%, #F0F3E8 100%)",
            }}
        >
            <div className="mx-auto max-w-3xl">
                <Reveal delay={0}>
                    <div className="mb-2 text-center">
                        <div className="flex justify-center px-6 pt-3">
                            <div
                                className="relative flex items-center gap-3 px-9 py-4"
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
                                    הסיפור מאחורי הקורס
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto mt-4 max-w-xl space-y-2">
                            <p className="text-lg font-bold leading-relaxed text-neutral-900">
                                לפני 3 שנים, החלטתי לעשות משהו בנידון.
                            </p>
                            <p className="text-lg leading-relaxed text-neutral-700">
                                לקחתי את כל מה שלמדתי ב-15 שנות עבודה בשטח,
                            </p>
                            <p className="text-lg leading-relaxed text-neutral-700">
                                את כל הטעויות שראיתי משפחות עושות שוב ושוב,
                            </p>
                            <p className="text-lg leading-relaxed text-neutral-700">
                                ואת כל הטיפים שחסכו ללקוחות שלי
                            </p>
                            <p className="text-lg font-bold text-neutral-900">
                                מאות אלפי שקלים - ויצרתי את
                            </p>
                        </div>
                    </div>
                </Reveal>

                {/* תמונת בעל הקורס + מסכי המוצר */}
                <Reveal delay={200}>
                    <div className="mt-14 flex justify-center">
                        <img
                            src={asafPhoto}
                            alt="בית בשתי ידיים - הקורס והיוצר"
                            className="w-full max-w-2xl object-contain"
                        />
                    </div>
                </Reveal>

                {/* חלק 2 - לא עוד סרטון / הקורס השלם */}
                <Reveal delay={350}>
                    <div
                        className="mx-auto mt-16 max-w-xl rounded-3xl bg-white p-8 text-center"
                        style={{ boxShadow: "0 16px 40px rgba(0,0,0,0.07)" }}
                    >
                        <p className="mb-1 text-base text-neutral-500">
                            לא עוד סרטון כאן ומאמר שם.
                        </p>
                        <p className="mb-6 text-base text-neutral-500">
                            לא עוד תשובות סותרות ומידע מפוזר.
                        </p>

                        <div
                            className="mx-auto h-px w-16"
                            style={{ backgroundColor: "#DCEAC7" }}
                        />

                        <div className="mt-6 space-y-1">
                            <p className="text-lg font-bold text-neutral-900">
                                הקורס השלם והמסודר
                            </p>
                            <p className="text-lg font-bold text-neutral-900">
                                היחיד שלוקח אתכם מהשלב הראשון
                            </p>
                            <p
                                className="text-lg font-bold"
                                style={{ color: "#7CB342" }}
                            >
                                ועד הרגע שאתם מקבלים את המפתח.
                            </p>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

export default PersonalStorySection;