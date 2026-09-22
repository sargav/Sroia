import React, { useState } from "react";
import heroBathroom from "./assets/hero-bathroom.png";
import heroTiles from "./assets/hero-tiles.jpg";
import baitLogo from "./assets/bait-logo.png";
import negevLogo from "./assets/negev-logo-heart.jpg";
import giftBox from "./assets/gift-box.png";
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
                    <div className="mb-7 inline-flex flex-col items-center gap-2 rounded-2xl border border-white/15 bg-transparent px-7 py-4 text-base">
                        <span className="inline-flex items-center gap-2 text-white/80">
                            <SparkleIcon className="h-6 w-6" style={{ color: GREEN }} />
                            <span style={{ color: GREEN }}>הטבה בלעדית</span>
                        </span>
                        <span className="text-lg font-bold" style={{ color: GREEN }}>
                            קהילת בית בשתי ידיים | אסף סרויה
                        </span>
                    </div>

                    {/* negev badge */}
                    <div className="mb-7 inline-flex items-center rounded-2xl bg-white px-6 py-4 shadow-lg">
                        <img src={negevLogo} alt="נגב" className="h-10 w-auto object-contain" />
                    </div>

                    <p className="mb-4 text-base font-medium tracking-wide text-white/70">
                        קרמיקה &middot; סניטריה &middot; ריצוף
                    </p>

                    <h1 className="mb-6 text-5xl font-black leading-tight sm:text-6xl">
                        חוסכים <span style={{ color: GREEN }}>אלפי שקלים</span>
                        <br />
                        בבניית הבית שלכם
                    </h1>

                    <p className="mb-10 max-w-2xl text-xl text-white/80">
                        שיתוף פעולה בלעדי עם חברת נגב מהמובילות בישראל בקרמיקה, סניטריה וריצוף.
                    </p>

                    <button
                        onClick={scrollToForm}
                        className="mb-10 inline-flex items-center gap-3 rounded-full px-9 py-3 text-xl font-bold text-black shadow-lg transition-transform hover:scale-[1.03]"
                        style={{ backgroundColor: GREEN }}
                    >
                        <span>&larr;</span> אני רוצה את ההטבה
                    </button>

                    {/* benefit cards */}
                    <div className="grid grid-cols-1 gap-5 overflow-visible sm:grid-cols-2 sm:gap-8">
                        <div className="rounded-2xl p-8" style={{ backgroundColor: CARD }}>
                            <p className="mb-1 text-4xl font-black" style={{ color: GREEN }}>
                                10% הנחה
                            </p>
                            <p className="text-lg font-semibold text-white/90">הנחה על כל הרכישה</p>
                            <p className="mt-1 text-base text-white/50">לרכישה מעל 50,000 ₪</p>
                        </div>
                        <div
                            className="relative overflow-visible rounded-2xl py-8 pr-8"
                            style={{ backgroundColor: CARD, paddingLeft: "6.5rem" }}
                        >
                            <div
                                className="pointer-events-none absolute -left-7 bottom-2 h-32 w-32 rounded-full sm:h-36 sm:w-36"
                                style={{
                                    background: `radial-gradient(circle, ${GREEN}66 0%, ${GREEN}00 70%)`,
                                    filter: "blur(6px)",
                                }}
                            />
                            <img
                                src={giftBox}
                                alt="מתנה לבוני בתים"
                                className="pointer-events-none absolute -left-9 bottom-0 h-36 w-36 object-contain sm:h-40 sm:w-40"
                                style={{ filter: `drop-shadow(0 0 18px ${GREEN}99) drop-shadow(0 8px 12px rgba(0,0,0,0.5))` }}
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
                    <h2 className="mb-3 text-center text-3xl font-black sm:text-4xl">
                        מה אפשר לקנות בהטבה?
                    </h2>
                    <p className="mb-12 text-center text-white/60">
                        שלוש קטגוריות מרכזיות שמרכיבות את הבית שלכם
                    </p>

                    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                        {CATEGORIES.map((c) => (
                            <div key={c.title} className="rounded-2xl p-6" style={{ backgroundColor: CARD }}>
                                <div className="mb-3 flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: GREEN }} />
                                    <h3 className="text-lg font-bold">{c.title}</h3>
                                </div>
                                <p className="text-sm leading-relaxed text-white/60">{c.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        {STATS.map((s) => (
                            <div
                                key={s.label}
                                className="flex items-center gap-3 rounded-2xl p-5"
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
                        ))}
                    </div>
                </div>
            </section>

            {/* FORM SECTION */}
            <section id="offer-form" className="border-t border-white/5 py-20" style={{ backgroundColor: "#141414" }}>
                <div className="mx-auto max-w-xl px-6 text-center sm:px-10">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm">
                        <span style={{ color: GREEN }}>✦</span> קבלו את ההטבה
                    </div>

                    <h2 className="mb-3 text-3xl font-black sm:text-4xl">
                        הטבה בלעדית <span style={{ color: GREEN }}>לחברי הקהילה</span>
                    </h2>
                    <p className="mb-2 text-xl font-bold text-white/90">השאירו פרטים לתיאום</p>
                    <p className="mb-10 text-white/50">
                        נציג מטעם חברת נגב יצור איתכם קשר תוך 24 שעות לתיאום ההטבה
                    </p>

                    <div className="rounded-3xl p-6 text-right sm:p-8" style={{ backgroundColor: CARD }}>
                        {submitted ? (
                            <div className="py-10 text-center">
                                <div
                                    className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full text-3xl"
                                    style={{ backgroundColor: "rgba(141,198,63,0.15)", color: GREEN }}
                                >
                                    ✓
                                </div>
                                <h3 className="mb-2 text-xl font-bold">הפרטים נשלחו בהצלחה!</h3>
                                <p className="text-white/60">נציג מטעם חברת נגב יצור איתכם קשר בקרוב.</p>
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
                                    <a href="#" className="underline" style={{ color: GREEN }} onClick={(e) => e.preventDefault()}>
                                        תנאי השימוש
                                    </a>
                                </p>
                            </form>
                        )}
                    </div>
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

                    <div className="mb-6 flex items-center gap-3">
                        <SocialIcon>
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="#141414">
                                <path d="M12 2C6.5 2 2 6 2 11c0 2.6 1.2 4.9 3.1 6.5-.1 1.1-.5 2.5-1.1 3.5 1.4-.2 2.9-.7 4-1.4 1.2.4 2.6.6 4 .6 5.5 0 10-4 10-9s-4.5-9-10-9z" />
                            </svg>
                        </SocialIcon>
                        <SocialIcon>
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="#141414">
                                <path d="M16.6 5.8c-.9-.9-1.4-2.1-1.4-3.4h-3.1v13.4c0 1.5-1.2 2.7-2.7 2.7a2.7 2.7 0 01-2.7-2.7 2.7 2.7 0 012.7-2.7c.3 0 .6 0 .8.1v-3.2c-.3 0-.5-.1-.8-.1-3.2 0-5.8 2.6-5.8 5.9s2.6 5.9 5.8 5.9 5.9-2.6 5.9-5.9V9.2c1.2.9 2.7 1.4 4.3 1.4V7.5c-1 0-1.9-.4-3-1.7z" />
                            </svg>
                        </SocialIcon>
                        <SocialIcon>
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="#141414">
                                <path d="M13.5 21v-7.7h2.6l.4-3h-3V8.2c0-.9.3-1.5 1.6-1.5H16.6V4c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.3H7.5v3H10.2V21h3.3z" />
                            </svg>
                        </SocialIcon>
                        <SocialIcon>
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#141414" strokeWidth="2">
                                <rect x="3" y="3" width="18" height="18" rx="5" />
                                <circle cx="12" cy="12" r="4" />
                                <circle cx="17.2" cy="6.8" r="1.1" fill="#141414" stroke="none" />
                            </svg>
                        </SocialIcon>
                    </div>

                    <p className="text-sm font-semibold text-white/80">
                        קהילת בית בשתי ידיים — אסף סרויה
                    </p>
                </div>
            </footer>
        </div>
    );
}
