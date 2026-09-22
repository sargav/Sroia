import React, { useState, useEffect, useRef } from "react";
import heroBathroom from "./assets/hero-bathroom.png";
import heroTiles from "./assets/hero-tiles.jpg";
import baitLogo from "./assets/bait-logo.png";
import negevLogo from "./assets/negev-logo-heart.jpg";
import giftBox from "./assets/gift-box.png";
import BenefitTermsDialog from "./component/BenefitTermsDialog";

function SparkleIcon({ className = "", style = {} }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
            <path d="M12 2l1.8 5.6L19.4 9.4 13.8 11.2 12 17l-1.8-5.8L4.6 9.4l5.6-1.8L12 2z" />
            <path d="M19 15l.8 2.4L22.2 18.2 19.8 19l-.8 2.4-.8-2.4L15.8 18.2 18.2 17.4 19 15z" />
        </svg>
    );
}

/**
 * דף "הטבת נגב לחברי הקהילה" - קהילת בית בשתי ידיים | אסף סרויה
 * שחזור עיצובי מדויק: רקע כהה, ירוק מותג #8DC63F, פונט Rubik, RTL
 * התמונות נטענות מתיקיית assets/ הצמודה לקובץ הזה.
 */

const GREEN = "#8DC63F";
const DARK = "#1B1B1B";
const CARD = "#242424";

/* ---------- אנימציות: keyframes גלובליים לעמוד ---------- */
function PageAnimationStyles() {
    return (
        <style>{`
            @keyframes fadeInUp {
                from { opacity: 0; transform: translateY(28px); }
                to { opacity: 1; transform: translateY(0); }
            }
            @keyframes popIn {
                0% { opacity: 0; transform: scale(0.6); }
                70% { opacity: 1; transform: scale(1.08); }
                100% { opacity: 1; transform: scale(1); }
            }
            @keyframes shake {
                10%, 90% { transform: translateX(-1px); }
                20%, 80% { transform: translateX(2px); }
                30%, 50%, 70% { transform: translateX(-4px); }
                40%, 60% { transform: translateX(4px); }
            }
            @keyframes floatSlow {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }
            @keyframes pulseGlow {
                0%, 100% { opacity: 0.55; transform: scale(1); }
                50% { opacity: 1; transform: scale(1.12); }
            }
        `}</style>
    );
}

/* ---------- Reveal: עוטף תוכן ומפעיל אנימציית כניסה כשהוא נכנס לתצוגה בגלילה ---------- */
function Reveal({ children, delay = 0, as: Tag = "div", className = "" }) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <Tag
            ref={ref}
            className={className}
            style={
                visible
                    ? { animation: `fadeInUp 0.7s ease-out ${delay}ms both` }
                    : { opacity: 0 }
            }
        >
            {children}
        </Tag>
    );
}

function HeartIcon({ className = "" }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
            <path
                d="M12 20.5s-7.5-4.6-10-9.2C.5 8.1 2 4.5 5.6 3.8c2-.4 3.9.4 5 2 .5.7 1 .9 1.4.9s.9-.2 1.4-.9c1.1-1.6 3-2.4 5-2 3.6.7 5.1 4.3 3.6 7.5-2.5 4.6-10 9.2-10 9.2z"
                fill={GREEN}
            />
        </svg>
    );
}

function SocialIcon({ children }) {
    return (
        <a
            href="#"
            className="flex h-11 w-11 items-center justify-center rounded-full transition-transform hover:scale-105"
            style={{ backgroundColor: GREEN }}
            onClick={(e) => e.preventDefault()}
        >
            {children}
        </a>
    );
}

const CATEGORIES = [
    {
        title: "סניטריה",
        desc: "כיורים, אסלות, אמבטיות וברזים מהמותגים המובילים בעולם",
    },
    {
        title: "קרמיקה",
        desc: "חיפויי קיר ייחודיים בעיצובים מודרניים וקלאסיים לכל סגנון",
    },
    {
        title: "ריצוף",
        desc: "אריחי פורצלן וגרניט פורצלן באיכות פרימיום, לחללי פנים וחוץ",
    },
];

const STATS = [
    { value: "עשרות אלפי שקלים", label: "חיסכון", icon: "wallet" },
    { value: "100%", label: "מחויבות לאיכות", icon: "check" },
    { value: "10 סניפים", label: "פריסה רחבה בכל רחבי הארץ", icon: "pin" },
];

const BUILD_STAGES = ["תכנון ורישוי", "ביצוע שלד", "ביצוע גמרים", "לקראת אכלוס"];

function StatIcon({ icon }) {
    const common = { width: 22, height: 22, stroke: GREEN, strokeWidth: 2, fill: "none" };
    if (icon === "wallet")
        return (
            <svg {...common} viewBox="0 0 24 24">
                <rect x="2" y="6" width="20" height="14" rx="2" />
                <path d="M2 10h20" />
                <circle cx="17" cy="15" r="1.2" fill={GREEN} stroke="none" />
            </svg>
        );
    if (icon === "check")
        return (
            <svg {...common} viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" />
                <path d="M8 12.5l2.5 2.5L16 9" />
            </svg>
        );
    return (
        <svg {...common} viewBox="0 0 24 24">
            <path d="M12 21s7-6.2 7-12a7 7 0 10-14 0c0 5.8 7 12 7 12z" />
            <circle cx="12" cy="9" r="2.3" />
        </svg>
    );
}

export default function Benefit() {
    const [form, setForm] = useState({ name: "", phone: "", email: "", stage: "" });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [heroVisible, setHeroVisible] = useState(false);

    useEffect(() => {
        setHeroVisible(true);
    }, []);

    const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

    const scrollToForm = () => {
        document.getElementById("offer-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const next = {};
        if (!form.name.trim()) next.name = "נא למלא שם מלא";
        if (!form.phone.trim() || !/^0\d{1,2}-?\d{7}$/.test(form.phone.replace(/\s/g, "")))
            next.phone = "נא למלא מספר טלפון תקין";
        if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) next.email = "נא למלא אימייל תקין";
        if (!form.stage) next.stage = "נא לבחור שלב בנייה";
        setErrors(next);
        if (Object.keys(next).length === 0)
         { setSubmitted(true);
            axios.post()
         }

    };

    return (
        <div dir="rtl" style={{ backgroundColor: DARK, fontFamily: "'Rubik', 'Arial', sans-serif" }} className="min-h-screen text-white">
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700;800;900&display=swap');`}</style>
            <PageAnimationStyles />

            {/* HERO */}
            <section className="relative overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${heroBathroom})`, filter: "brightness(0.9)" }}
                />
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "linear-gradient(180deg, rgba(15,15,15,.3) 0%, rgba(10,10,10,.45) 45%, rgba(5,5,5,.6) 100%)",
                    }}
                />

                <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 pb-20 pt-16 text-center sm:px-10">
                    {/* badge */}
                    <div
                        className="mb-7 inline-flex flex-col items-center gap-2 rounded-2xl border border-white/15 bg-transparent px-7 py-4 text-base"
                        style={heroVisible ? { animation: "fadeInUp 0.7s ease-out both" } : { opacity: 0 }}
                    >
                        <span className="inline-flex items-center gap-2 text-white/80">
                            <SparkleIcon
                                className="h-6 w-6"
                                style={{ color: GREEN, animation: "pulseGlow 2.2s ease-in-out infinite" }}
                            />
                            <span style={{ color: GREEN }}>הטבה בלעדית</span>
                        </span>
                        <span className="text-lg font-bold" style={{ color: GREEN }}>
                            קהילת בית בשתי ידיים | אסף סרויה
                        </span>
                    </div>

                    {/* negev badge */}
                    <div
                        className="mb-7 inline-flex items-center rounded-2xl bg-white px-6 py-4 shadow-lg"
                        style={heroVisible ? { animation: "fadeInUp 0.7s ease-out 120ms both" } : { opacity: 0 }}
                    >
                        <img src={negevLogo} alt="נגב" className="h-10 w-auto object-contain" />
                    </div>

                    <p
                        className="mb-4 text-base font-medium tracking-wide text-white/70"
                        style={heroVisible ? { animation: "fadeInUp 0.7s ease-out 220ms both" } : { opacity: 0 }}
                    >
                        קרמיקה &middot; סניטריה &middot; ריצוף
                    </p>

                    <h1
                        className="mb-6 text-5xl font-black leading-tight sm:text-6xl"
                        style={heroVisible ? { animation: "fadeInUp 0.8s ease-out 320ms both" } : { opacity: 0 }}
                    >
                        חוסכים <span style={{ color: GREEN }}>אלפי שקלים</span>
                        <br />
                        בבניית הבית שלכם
                    </h1>

                    <p
                        className="mb-10 max-w-2xl text-xl text-white/80"
                        style={heroVisible ? { animation: "fadeInUp 0.7s ease-out 450ms both" } : { opacity: 0 }}
                    >
                        שיתוף פעולה בלעדי עם חברת נגב מהמובילות בישראל בקרמיקה, סניטריה וריצוף.
                    </p>

                       <button
                type="button"
                onClick={scrollToForm}
                className="
                  group flex items-center justify-center gap-4
                  rounded-full bg-[#86B84D]
                  px-7 py-4 text-[15px] font-bold text-white
                  shadow-[0_9px_25px_rgba(121,169,66,0.28)]
                  transition-all duration-300
                  hover:-translate-y-1 hover:gap-6
                  hover:bg-[#8DC63F]
                  hover:shadow-[0_14px_32px_rgba(121,169,66,0.36)]
                  mb-6
                "
              >
                <span>אני רוצה את ההטבה</span>

                <span
                  className="transition-transform duration-300 group-hover:-translate-x-1"
                  aria-hidden="true"
                >
                  ←
                </span>
              </button>

                    {/* benefit cards */}
                    <div
                        className="grid grid-cols-1 gap-5 overflow-visible sm:grid-cols-2 sm:gap-8"
                        style={heroVisible ? { animation: "fadeInUp 0.8s ease-out 650ms both" } : { opacity: 0 }}
                    >
                        <div
                            className="rounded-2xl p-8 transition-transform duration-300 hover:-translate-y-1"
                            style={{ backgroundColor: CARD }}
                        >
                            <p className="mb-1 text-4xl font-black" style={{ color: GREEN }}>
                                10% הנחה
                            </p>
                            <p className="text-lg font-semibold text-white/90">הנחה על כל הרכישה</p>
                            <p className="mt-1 text-base text-white/50">לרכישה מעל 50,000 ₪</p>
                        </div>
                        <div
                            className="relative overflow-visible rounded-2xl py-8 pr-8 transition-transform duration-300 hover:-translate-y-1"
                            style={{ backgroundColor: CARD, paddingLeft: "6.5rem" }}
                        >
                            <div
                                className="pointer-events-none absolute -left-7 bottom-2 h-32 w-32 rounded-full sm:h-36 sm:w-36"
                                style={{
                                    background: `radial-gradient(circle, ${GREEN}66 0%, ${GREEN}00 70%)`,
                                    filter: "blur(6px)",
                                    animation: "pulseGlow 2.6s ease-in-out infinite",
                                }}
                            />
                            <img
                                src={giftBox}
                                alt="מתנה לבוני בתים"
                                className="pointer-events-none absolute -left-15 bottom-0 h-36 w-36 object-contain sm:h-40 sm:w-40"
                                style={{
                                    filter: `drop-shadow(0 0 18px ${GREEN}99) drop-shadow(0 8px 12px rgba(0,0,0,0.5))`,
                                    animation: "floatSlow 3.2s ease-in-out infinite",
                                }}
                            />
                            <p className="mb-1 text-4xl font-black" style={{ color: GREEN }}>
                                + מתנה
                            </p>
                            <p className="text-lg font-semibold text-white/90">הפתעה לבוני בתים</p>
                            <p className="mt-1 text-base text-white/50">פרטים בסניף</p>
                        </div>
                    </div>
                </div>
            </section>


            {/* WHAT CAN YOU BUY */}
            <section className="relative overflow-hidden py-20">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-15"
                    style={{ backgroundImage: `url(${heroTiles})` }}
                />
                <div className="relative mx-auto max-w-3xl px-6 sm:px-10">
                    <Reveal as="h2" className="mb-3 text-center text-3xl font-black sm:text-4xl">
                        מה אפשר לקנות בהטבה?
                    </Reveal>
                    <Reveal as="p" delay={100} className="mb-12 text-center text-white/60">
                        שלוש קטגוריות מרכזיות שמרכיבות את הבית שלכם
                    </Reveal>

                    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                        {CATEGORIES.map((c, i) => (
                            <Reveal
                                key={c.title}
                                delay={i * 120}
                                className="rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1"
                            >
                                <div style={{ backgroundColor: CARD }} className="rounded-2xl p-6 -m-6">
                                    <div className="mb-3 flex items-center gap-2">
                                        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: GREEN }} />
                                        <h3 className="text-lg font-bold">{c.title}</h3>
                                    </div>
                                    <p className="text-sm leading-relaxed text-white/60">{c.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        {STATS.map((s, i) => (
                            <Reveal key={s.label} delay={i * 120 + 150}>
                                <div
                                    className="flex items-center gap-3 rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-1"
                                    style={{ backgroundColor: CARD }}
                                >
                                    <div
                                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                                        style={{ backgroundColor: "rgba(141,198,63,0.15)" }}
                                    >
                                        <StatIcon icon={s.icon} />
                                    </div>
                                    <div>
                                        <p className="font-black" style={{ color: GREEN }}>
                                            {s.value}
                                        </p>
                                        <p className="text-sm text-white/60">{s.label}</p>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* FORM SECTION */}
            <section id="offer-form" className="border-t border-white/5 py-20" style={{ backgroundColor: "#141414" }}>
                <div className="mx-auto max-w-xl px-6 text-center sm:px-10">
                    <Reveal className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm">
                        <span style={{ color: GREEN }}>✦</span> קבלו את ההטבה
                    </Reveal>

                    <Reveal as="h2" delay={100} className="mb-3 text-3xl font-black sm:text-4xl">
                        הטבה בלעדית <span style={{ color: GREEN }}>לחברי הקהילה</span>
                    </Reveal>
                    <Reveal as="p" delay={180} className="mb-2 text-xl font-bold text-white/90">
                        השאירו פרטים לתיאום
                    </Reveal>
                    <Reveal as="p" delay={250} className="mb-10 text-white/50">
                        נציג מטעם חברת נגב יצור איתכם קשר תוך 24 שעות לתיאום ההטבה
                    </Reveal>

                    <Reveal delay={350} className="rounded-3xl p-6 text-right sm:p-8">
                        <div style={{ backgroundColor: CARD }} className="rounded-3xl p-6 -m-6 sm:p-8 sm:-m-8">
                        {submitted ? (
                            <div className="py-10 text-center">
                                <div
                                    className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full text-3xl"
                                    style={{
                                        backgroundColor: "rgba(141,198,63,0.15)",
                                        color: GREEN,
                                        animation: "popIn 0.6s ease-out both",
                                    }}
                                >
                                    ✓
                                </div>
                                <h3
                                    className="mb-2 text-xl font-bold"
                                    style={{ animation: "fadeInUp 0.6s ease-out 150ms both" }}
                                >
                                    הפרטים נשלחו בהצלחה!
                                </h3>
                                <p
                                    className="text-white/60"
                                    style={{ animation: "fadeInUp 0.6s ease-out 250ms both" }}
                                >
                                    נציג מטעם חברת נגב יצור איתכם קשר בקרוב.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                                <div>
                                    <label className="mb-1.5 block text-sm text-white/60">שם מלא</label>
                                    <input
                                        type="text"
                                        value={form.name}
                                        onChange={update("name")}
                                        placeholder="הקלידו שם מלא"
                                        className="w-full rounded-xl border px-4 py-3 text-white placeholder-white/30 outline-none transition-colors focus:border-[color:var(--g)]"
                                        style={{
                                            backgroundColor: "#1b1b1b",
                                            borderColor: errors.name ? "#e05252" : "rgba(255,255,255,0.1)",
                                            ...(errors.name ? { animation: "shake 0.4s ease-in-out" } : {}),
                                        }}
                                    />
                                    {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
                                </div>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <label className="mb-1.5 block text-sm text-white/60">טלפון</label>
                                        <input
                                            type="tel"
                                            value={form.phone}
                                            onChange={update("phone")}
                                            placeholder="050-0000000"
                                            className="w-full rounded-xl border px-4 py-3 text-white placeholder-white/30 outline-none"
                                            style={{
                                                backgroundColor: "#1b1b1b",
                                                borderColor: errors.phone ? "#e05252" : "rgba(255,255,255,0.1)",
                                                ...(errors.phone ? { animation: "shake 0.4s ease-in-out" } : {}),
                                            }}
                                        />
                                        {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone}</p>}
                                    </div>
                                    <div>
                                        <label className="mb-1.5 block text-sm text-white/60">אימייל</label>
                                        <input
                                            type="email"
                                            value={form.email}
                                            onChange={update("email")}
                                            placeholder="name@mail.com"
                                            className="w-full rounded-xl border px-4 py-3 text-white placeholder-white/30 outline-none"
                                            style={{
                                                backgroundColor: "#1b1b1b",
                                                borderColor: errors.email ? "#e05252" : "rgba(255,255,255,0.1)",
                                                ...(errors.email ? { animation: "shake 0.4s ease-in-out" } : {}),
                                            }}
                                        />
                                        {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-sm text-white/60">שלב הבנייה</label>
                                    <select
                                        value={form.stage}
                                        onChange={update("stage")}
                                        className="w-full appearance-none rounded-xl border px-4 py-3 text-white outline-none"
                                        style={{
                                            backgroundColor: "#1b1b1b",
                                            borderColor: errors.stage ? "#e05252" : "rgba(255,255,255,0.1)",
                                            ...(errors.stage ? { animation: "shake 0.4s ease-in-out" } : {}),
                                        }}
                                    >
                                        <option value="">בחרו שלב בנייה</option>
                                        {BUILD_STAGES.map((s) => (
                                            <option key={s} value={s}>
                                                {s}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.stage && <p className="mt-1 text-xs text-red-400">{errors.stage}</p>}
                                </div>

                                <button
                                    type="submit"
                                    className="w-full rounded-xl py-4 text-lg font-bold text-black transition-transform hover:scale-[1.01]"
                                    style={{ backgroundColor: GREEN }}
                                >
                                    שליחה וקבלת ההטבה
                                </button>

                                <p className="text-center text-xs text-white/40">
                                    בלחיצה על שליחה אני מאשר/ת את{" "}
                                    <a href="#" className="underline " style={{ color: GREEN }} onClick={(e) => e.preventDefault()}>
                                    <BenefitTermsDialog/>
                                    </a>
                                </p>
                            </form>
                        )}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="py-14" style={{ backgroundColor: DARK }}>
                <div className="mx-auto flex max-w-xl flex-col items-center px-6 text-center">
                    <div className="mb-6 flex items-center gap-5">
                        <div className="flex h-16 w-24 items-center justify-center rounded-2xl bg-white p-2">
                            <img src={baitLogo} alt="בית בשתי ידיים" className="h-full w-full object-contain" />
                        </div>
                        <span className="text-white/30">×</span>
                        <div className="flex h-16 w-24 items-center justify-center rounded-2xl bg-white p-2">
                            <img src={negevLogo} alt="נגב" className="h-8 w-auto object-contain" />
                        </div>
                    </div>

                    <p className="mb-6 text-white/60">
                        הטבה בשיתוף <span className="font-bold text-white">נגב</span> &middot; קהילת{" "}
                        <span className="font-bold text-white">בית בשתי ידיים</span>
                    </p>
                </div>
            </footer>
        </div>
    );
}