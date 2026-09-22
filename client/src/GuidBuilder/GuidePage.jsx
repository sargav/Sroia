import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import api from "./api";
import heroBg from "./assets/hero-blueprint-bg.png";
import footerBg from "./assets/footerBg.png";
import heroLogoBadge from "./assets/hero-logo-badge.png";
import questionsCluster from "./assets/questions-cluster.png";
import checklistSafety from "./assets/checklist-safety.png";
import mockupDevices from "./assets/mockup-devices-real.png";
import badgeWhatYouFind from "./assets/badge-what-you-find.png";
import sketchBg from "./assets/sketch-warm-wide.jpg";
import houseBg from "./assets/house-bg-photo.jpg";
import badge5Stages from "./assets/badge-5-stages-title.png";
import iconIdea from "./assets/icon-stage1-idea-v2.png";
import iconPlan from "./assets/icon-stage2-plan-v2.png";
import iconSkeleton from "./assets/icon-stage3-skeleton-v2.png";
import iconFinish from "./assets/icon-stage4-finish-v2.png";
import iconOccupancy from "./assets/icon-stage5-occupancy-v2.png";
import checkIcon from "./assets/icon-check-circle-v2.png";
import badgeHowHelps from "./assets/badge-how-helps-title.png";
import badgeWhoFor from "./assets/badge-who-for.png";
import asafPhoto from "./assets/asaf-arms-crossed.png";
import asafBgPhoto from "./assets/asaf-about-bg.jpg";
import statYears from "./assets/stat-15years.png";
import statFamilies from "./assets/stat-100families.png";
import statMillions from "./assets/stat-millions.png";
import AboutAsaf from '../components/AboutAsaf';

const GREEN = '#7CB342';
const GREEN_DARK = '#5a8a2c';
const DARK = '#1f1f1f';
const CREAM = '#faf7ec';
const OLIVE_BG = '#eef0dd';


function TopBar() {
  return (
    <div
      className="px-6 py-3 text-center text-sm font-bold text-white sm:text-base"
      style={{ backgroundColor: GREEN }}
    >
      ככה הופכים תהליך בנייה גדול ומפחיד — למשהו ברור ופשוט
    </div>
  );
}

function HeroSection({ onCtaClick }) {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        clipPath: "polygon(0 0, 100% 0, 100% 88%, 50% 100%, 0 88%)",
      }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,.25) 0%, rgba(255,255,255,.5) 55%, rgba(255,255,255,.7) 100%)",
        }}
      />

      <div className="relative flex flex-col items-center px-0 pb-24 pt-14 text-center sm:pb-32 sm:pt-20">
        <Reveal>
          <img
            src={heroLogoBadge}
            alt="בית בשתי ידיים - המדריך לבונה - איך לעשות סדר בכל שלבי הבנייה"
            className="mb-5 max-w-lg"
          />
        </Reveal>
        <Reveal delay={150}>
          <button
                  type="button"
                  onClick={onCtaClick}
                  className="
                    group flex items-center justify-center gap-4
                    rounded-full bg-[#86B84D]
                    px-7 py-4 text-[15px] font-bold text-white
                    shadow-[0_9px_25px_rgba(121,169,66,0.28)]
                    transition-all duration-300
                    hover:-translate-y-1 hover:gap-6
                    hover:bg-[#78A63F]
                    hover:shadow-[0_14px_32px_rgba(121,169,66,0.36)]
                  "
                >
                  <span>עכשיו ללא עלות</span>

                  <span
                    className="transition-transform duration-300 group-hover:-translate-x-1"
                    aria-hidden="true"
                  >
                    ←
                  </span>
                </button>
        </Reveal>
      </div>
    </section>
  );
}

const YOUTUBE_ID = "gXYpY8w2j0o";

function VideoSection() {
  return (
    <section className="px-6 py-6" style={{ backgroundColor: CREAM }}>
      <div className="mx-auto max-w-xs">
        <Reveal>
          <div
            className="overflow-hidden rounded-2xl shadow-xl"
            style={{ aspectRatio: "9 / 16" }}
          >
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${YOUTUBE_ID}?enablejsapi=1`}
              title="בית בשתי ידיים - שלבי הבנייה"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * גל דקורטיבי בין סקשן הסרטון (רקע בהיר) לסקשן "בוא נדבר דוגרי" (רקע זית)
 * שפיץ משולש חד כלפי מטה באמצע (הרקע הבהיר "יורד" לנקודה בתוך הרקע הזית).
 */
function WaveDivider({ topColor = "#faf7ec", bottomColor = "#eef0dd" }) {
  return (
    <div style={{ backgroundColor: bottomColor }}>
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="block h-14 w-full sm:h-20"
      >
        <path d="M0,0 L1440,0 L1440,30 L720,120 L0,30 Z" fill={topColor} />
      </svg>
    </div>
  );
}

function StraightTalkSection({ onCtaClick }) {
  return (
    <section className="px-6 py-6" style={{ backgroundColor: OLIVE_BG }}>
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <h2 className="mb-2 text-3xl font-black" style={{ color: GREEN }}>
            בוא נדבר רגע דוגרי
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <p className="mx-auto mb-2 max-w-lg text-lg leading-snug text-neutral-800">
            אם אתם עומדים להתחיל תהליך של בנייה פרטית, אתם בטח מרגישים שילוב
            של התרגשות יחד עם ים של סימני שאלה.
          </p>
        </Reveal>

        <Reveal delay={200}>
          <img
            src={questionsCluster}
            alt="שאלות נפוצות בתהליך הבנייה"
            className="mx-auto mb-1 w-full max-w-xl"
          />
        </Reveal>

        <Reveal delay={300}>
          <p className="mx-auto mb-1 max-w-lg text-lg leading-snug text-neutral-800">
            ואיך בכלל שומרים על שליטה כשהכול מרגיש גדול ומבולבל?
            <br />
            וזה בדיוק המקום שבו רוב הבונים עושים טעויות שעולות להם בעשרות
            אלפי שקלים, פשוט כי אף אחד לא מסביר להם את הדרך.
            <br />
            המדריך הזה נבנה כדי לתת לכם משהו אחר —
          </p>
        </Reveal>

        <Reveal delay={400}>
          <img
            src={checklistSafety}
            alt="סדר, בהירות, ביטחון"
            className="mx-auto mb-1 w-full max-w-md"
          />
        </Reveal>

        <Reveal delay={500}>
          <p className="mx-auto mb-2 max-w-lg text-lg leading-snug text-neutral-800">
            כדי שתדעו בדיוק מה מחכה לכם, שלב אחר שלב ותקבלו שליטה מהיום
            הראשון.
          </p>
        </Reveal>

        <Reveal delay={600}>
          <p className="mb-2 text-lg font-bold text-neutral-800">
            כבר 2,000 משפחות הורידו את המדריך והתחילו לבנות נכון
          </p>
        </Reveal>

        <Reveal delay={700}>
          <button
            onClick={onCtaClick}
            className="rounded-full px-8 py-4 text-lg font-bold text-white shadow-lg transition-transform hover:scale-[1.03]"
            style={{ backgroundColor: GREEN }}
          >
            להורדת המדריך בחינם
          </button>
        </Reveal>
      </div>
    </section>
  );
}

function ProductShowcase() {
  return (
    <div style={{ position: "relative", overflow: "visible" }}>
      <div
        className="w-full"
        style={{
          position: "relative",
          overflow: "visible",
          backgroundImage: `url(${sketchBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(255,255,255,0.3)" }} />

        {/* משולש עליון */}
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none"
          className="absolute top-0 left-0 w-full h-10 sm:h-16" style={{ zIndex: 5 }}>
          <path d="M0,0 L1440,0 L720,80 L0,0 Z" fill="#eef0dd" />
        </svg>

        {/* מוקאפ */}
        <RevealSlide>
          <img
            src={mockupDevices}
            alt="המדריך לבונה"
            className="relative mx-auto w-full max-w-3xl pt-12 pb-4 sm:pt-20 sm:pb-6"
            style={{ zIndex: 2 }}
          />
        </RevealSlide>

        {/* "מה תמצאו במדריך?" — יושב בדיוק על קו התפר, חופף לקטע הבא */}
        <div
          className="mx-auto max-w-2xl text-center"
          style={{ position: "relative", overflow: "visible", zIndex: 6, marginBottom: "-56px" }}
        >
          <Reveal delay={150}>
            <img src={badgeWhatYouFind} alt="מה תמצאו במדריך?" className="mx-auto w-full max-w-sm" />
          </Reveal>
        </div>

        {/* משולש קטן בדיוק על קו התפר, מאחורי הבאדג' */}
        <svg
          viewBox="0 0 200 36"
          preserveAspectRatio="none"
          className="mx-auto"
          style={{ position: "absolute", left: "50%", bottom: 0, transform: "translateX(-50%)", width: "180px", height: "32px", zIndex: 4 }}
        >
          <path d="M0,0 L200,0 L100,36 L0,0 Z" fill="#eef0dd" />
        </svg>
      </div>

      {/* טקסט "לא חפירות..." */}
      <section className="relative pt-16 sm:pt-20" style={{ backgroundColor: OLIVE_BG }}>
        <div className="mx-auto max-w-2xl px-6 pb-6 text-center">
          <Reveal>
            <p className="mx-auto max-w-md text-lg font-semibold leading-snug text-neutral-700">
              לא חפירות.<br />
              לא תיאוריה.<br />
              לא &quot;מאמרים&quot;.<br />
              <span style={{ color: GREEN }}>אלא מידע פרקטי, קצר, מסודר וחד</span>{" "}
              שמגיע מ-15+ שנות ניסיון בליווי עשרות משפחות בתהליכי בנייה.
            </p>
          </Reveal>
        </div>

        {/* משולש קטן - לקו התחתון של הקטע, לקראת קטע 5 השלבים */}
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="block w-full h-6 sm:h-8">
          <path d="M0,0 L1440,0 L720,60 L0,0 Z" fill="#eef0dd" />
        </svg>
      </section>
    </div>
  );
}

const STAGES = [
  { icon: iconIdea, title: "שלב 1- ייזום", desc: "הגדרת צרכים, תקציב נכון, הרכבת צוות" },
  { icon: iconPlan, title: "שלב 2 – תכנון", desc: "בדיקות מקדימות, היתרים, תכנון מדויק לפני שקל ראשון" },
  { icon: iconSkeleton, title: "שלב 3- שלד", desc: "תיאום נכון, לוחות זמנים, הבנת שלבי הביצוע" },
  { icon: iconFinish, title: "שלב 4 – גמרים", desc: "בחירת חומרים, ניהול ספקים, מניעת טעויות יקרות" },
  { icon: iconOccupancy, title: "שלב 5 – אכלוס", desc: "בדיקות סופיות, מסירה מסודרת, לפני הכניסה לבית" },
];

function StagesSection() {
  return (
    <section
      className="relative flex flex-col items-center justify-center py-10"
      style={{ overflow: "visible", minHeight: "100vh" }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${houseBg})`, filter: "brightness(0.8)", backgroundAttachment: "fixed" }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(10,10,10,.22) 0%, rgba(10,10,10,.4) 100%)" }}
      />

      {/* "5 השלבים שכל בונה חייב להכיר" — יושב בדיוק על קו התפר עם הקטע הקודם */}
      <div
        className="mx-auto max-w-lg px-6 text-center"
        style={{ position: "relative", overflow: "visible", zIndex: 6, marginTop: "-72px", marginBottom: "12px" }}
      >
        <img src={badge5Stages} alt="5 השלבים שכל בונה חייב להכיר" className="mx-auto w-full max-w-sm" />
      </div>

      <div className="relative mx-auto max-w-lg px-6 text-center">
        <div className="space-y-8 rounded-2xl bg-black/40 p-8 text-right backdrop-blur-sm sm:p-10">
          {STAGES.map((s, i) => (
            <RevealSlide key={s.title} delay={i * 150}>
              <div className="flex items-center gap-4">
                <img src={s.icon} alt="" className="h-20 w-20 shrink-0 object-contain" />
                <div>
                  <p className="mb-1 text-lg font-bold text-white">{s.title}</p>
                  <p className="text-sm leading-relaxed text-white/80">{s.desc}</p>
                </div>
              </div>
            </RevealSlide>
          ))}
        </div>
      </div>

      {/* שיפוע אלכסוני עדין בתחתית הקטע, לקראת הקטע הבא */}
      <svg
        viewBox="0 0 1440 50"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 block w-full h-6 sm:h-10"
        style={{ zIndex: 4 }}
      >
        <path d="M0,0 L1440,0 L1440,20 L0,50 Z" fill="rgba(10,10,10,0.55)" />
      </svg>
    </section>
  );
}

const HELP_ITEMS = [
  { line1: "תראו סוף־סוף את", line2: "כל התהליך בצורה מסודרת", boldLine: 2 },
  { line1: "תבינו מה בדיוק", line2: "התפקיד שלכם בכל שלב", boldLine: 2 },
  { line1: "תדעו", line2: "איפה אנשים בדרך כלל", line3: "נופלים ואיך להימנע מזה", boldLine: 2 },
  { line1: { pre: "יהיה לכם ", bold: "סדר פעולות ברור" }, line2: "מהתחלה ועד האכלוס" },
  { line1: { pre: "תרגישו ", bold: "ביטחון ושליטה בתהליך" }, line2: "שבדרך כלל מרגיש מאיים" },
];

const WHO_ITEMS = [
  "אתם רוצים לדעת בדיוק מה קורה בכל שלב",
  "אתם מתכננים לבנות בית פרטי",
  "אתם באמצע תהליך הבנייה ומרגישים אבודים",
  "אתם רוצים לדעת בדיוק מה קורה בכל שלב",
  "אתם פוחדים מטעויות יקרות",
  "אתם רוצים להרגיש בטוחים מול קבלנים וספקים",
  "אתם רוצים לחסוך כסף בלי לפגוע באיכות",
];

/**
 * עוטפת כל תוכן ב"מסתתר" עד שהוא נכנס לתצוגה בגלילה, ואז מרים אותו
 * פנימה עם fade + תזוזה קלה כלפי מעלה. delay מאפשר לכל פריט ברשימה
 * להיכנס קצת אחרי הקודם, כדי שזה ירגיש כמו "מפל" ולא הכל בבת אחת.
 */
function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // מספיק פעם אחת, לא צריך לבדוק שוב
        }
      },
      { threshold: 0.2 } // נכנס לפעולה כש-20% מהאלמנט כבר נראה
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/**
 * גרסה שנייה - במקום לעלות מלמטה, האלמנט "נכנס בהחלקה" מהצד
 * (ימין, כי קוראים מימין לשמאל), עם קפיצה קלה בסוף התנועה.
 */
function RevealSlide({ children, delay = 0 }) {
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
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(40px)",
        transition: `opacity 0.5s ease ${delay}ms, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function CenteredChecklist({ items }) {
  return (
    <div
      className="mx-auto w-full space-y-2.5 p-5 text-center"
      style={{ border: "15px solid rgba(255,255,255,0.75)", borderRadius: "24px 24px 48px 48px", maxWidth: "400px" }}
    >
      {items.map((item, i) => (
        <Reveal key={i} delay={i * 120}>
          <div
            style={{ display: "grid", gridTemplateColumns: "32px 1fr", alignItems: "start", columnGap: "4px" }}
          >
            <div className="flex h-8 items-center justify-center">
              <img src={checkIcon} alt="" className="h-8 w-8 shrink-0" />
            </div>
            <div>
              <p className={item.boldLine === 1 ? "font-bold text-neutral-800" : "text-neutral-800"}>
                {typeof item.line1 === "string" ? (
                  item.line1
                ) : (
                  <>
                    {item.line1.pre}
                    <span className="font-bold">{item.line1.bold}</span>
                  </>
                )}
              </p>
              <p className={item.boldLine === 2 ? "font-bold text-neutral-800" : "text-neutral-800"}>
                {item.line2}
              </p>
              {item.line3 && (
                <p className={item.boldLine === 2 ? "font-bold text-neutral-800" : "text-neutral-800"}>
                  {item.line3}
                </p>
              )}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

function BenefitsSection() {
  return (
    <>
      {/* "איך המדריך יעזור לכם בפועל" */}
      <section className="relative py-6" style={{ overflow: "visible" }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${houseBg})`, backgroundAttachment: "fixed" }}
        />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(255,255,255,0.82)" }} />

        {/* יושב בדיוק על קו התפר עם הקטע הקודם */}
        <div
          className="mx-auto max-w-xs px-6 text-center"
          style={{ position: "relative", overflow: "visible", zIndex: 6, marginTop: "-40px", marginBottom: "8px" }}
        >
          <img src={badgeHowHelps} alt="איך המדריך יעזור לכם בפועל" className="mx-auto w-full" />
        </div>

        <div className="relative mx-auto max-w-lg px-6">
          <CenteredChecklist items={HELP_ITEMS} />
        </div>
      </section>

      {/* "למי זה מתאים?" */}
      <section className="relative py-6" style={{ overflow: "visible" }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${houseBg})`, filter: "brightness(0.7)", backgroundAttachment: "fixed" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(20,20,20,.35) 0%, rgba(10,10,10,.55) 100%)" }}
        />

        {/* יושב בדיוק על קו התפר עם הקטע הקודם */}
        <div
          className="mx-auto max-w-xs px-6 text-center"
          style={{ position: "relative", overflow: "visible", zIndex: 6, marginTop: "-40px", marginBottom: "8px" }}
        >
          <img src={badgeWhoFor} alt="למי זה מתאים?" className="mx-auto w-full" />
        </div>

        <div className="relative mx-auto max-w-lg px-6 pb-10">
          <div
            className="w-full text-center"
            style={{
              borderRadius: "8px",
              padding: "44px 20px",
              backgroundColor: "rgba(255,255,255,0.12)",
            }}
          >
            <p className="text-white/90">
              אם אתם הולכים לבנות בית
              <br />
              או אפילו רק חושבים על מגרש
              <br />
              <span className="font-bold text-white">זה המדריך שאתם לא מתחילים בלעדיו.</span>
            </p>

            <p className="mt-10 mb-3 font-bold text-white">המדריך מתאים לכם אם :</p>

            <div className="space-y-4">
              {WHO_ITEMS.map((text, i) => (
                <Reveal key={i} delay={i * 120}>
                  <div
                    style={{ display: "grid", gridTemplateColumns: "28px 1fr", alignItems: "center", columnGap: "8px" }}
                  >
                    <img src={checkIcon} alt="" className="h-7 w-7 shrink-0" />
                    <p className="text-white/90">{text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function AboutSection() {
  return (
    <section
      className="relative px-6 py-6"
      style={{
        backgroundImage: `url(${asafBgPhoto})`,
        backgroundSize: "160%",
        backgroundPosition: "center 15%",
        backgroundRepeat: "no-repeat",
        overflow: "visible",
      }}
    >
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.75) 100%)" }}
      />
      <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
        <Reveal>
          <div className="relative mb-3" style={{ marginTop: "-90px", zIndex: 6 }}>
            <div
              className="flex h-56 w-56 items-center justify-center rounded-full sm:h-64 sm:w-64"
              style={{ backgroundColor: "#d7e6b8" }}
            >
              <img
                src={asafPhoto}
                alt="אסף סרויה"
                className="h-full w-full object-contain object-bottom"
              />
            </div>
            <div
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-xl px-6 py-2 text-lg font-bold text-white"
              style={{ backgroundColor: "#1f1f1f" }}
            >
              נעים להכיר
            </div>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <p className="mb-2 text-2xl font-bold text-neutral-800">
            נעים מאוד, אני אסף סרויה
          </p>
        </Reveal>

        <Reveal delay={280}>
          <div className="mb-2 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <img src={statYears} alt="15 שנות ניסיון" className="mx-auto h-24 w-auto" />
            <img src={statFamilies} alt="100+ משפחות" className="mx-auto h-24 w-auto" />
            <img src={statMillions} alt="מיליוני שקלים שנחסכו" className="mx-auto h-24 w-auto" />
          </div>
        </Reveal>

        <Reveal delay={400}>
          <p className="max-w-xl text-lg leading-snug text-neutral-700">
            ב-15 השנים האחרונות ליוויתי מעל 100 משפחות בבניית הבית שלהן.
            <br />
            <br />
            המדריך שאתם מקבלים עכשיו הוא בדיוק הדברים שאני מעביר למשפחות
            שמרוויחות תהליך בנייה{" "}
            <span className="font-bold" style={{ color: GREEN }}>
              רגוע, מדויק וחסכוני.
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function CTAFormSection() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", name: "", phone: "" });
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState({});

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // אימייל: תבנית סטנדרטית - שם@דומיין.סיומת (לפחות 2 תווים בסיומת)
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  // טלפון ישראלי: נייד (05X) או קווי (0X), עם או בלי מקף, עם או בלי קידומת 972+
  const PHONE_REGEX = /^(\+972|0)(([23489]-?\d{7})|(5\d-?\d{7})|(7\d-?\d{7}))$/;

  const validateField = (key, value) => {
    if (key === "name") {
      if (!value.trim()) return "נא למלא שם";
      if (value.trim().length < 2) return "שם קצר מדי";
      return "";
    }
    if (key === "email") {
      const trimmed = value.trim();
      if (!trimmed) return "נא למלא אימייל";
      if (!EMAIL_REGEX.test(trimmed)) return "כתובת אימייל לא תקינה";
      return "";
    }
    if (key === "phone") {
      const cleaned = value.replace(/[\s-]/g, "");
      if (!cleaned) return "נא למלא טלפון";
      if (!PHONE_REGEX.test(cleaned)) return "מספר טלפון לא תקין (לדוגמה: 050-1234567)";
      return "";
    }
    return "";
  };

  const handleBlur = (key) => () => {
    const msg = validateField(key, form[key]);
    setErrors((prev) => ({ ...prev, [key]: msg || undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const next = {};
    const nameErr = validateField("name", form.name);
    const emailErr = validateField("email", form.email);
    const phoneErr = validateField("phone", form.phone);
    if (nameErr) next.name = nameErr;
    if (emailErr) next.email = emailErr;
    if (phoneErr) next.phone = phoneErr;
    if (!agree) next.agree = "יש לאשר קבלת תכנים שיווקיים";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSubmitError("");
    setSubmitting(true);
    try {
      // הקריאה הזו הולכת לשרת ה-Express שלך (ravmesser-integration.js),
      // שהוא זה שבפועל מדבר עם רב מסר ומוסיף את הליד.
      // הכתובת של השרת מגיעה מ-VITE_API_URL (דרך api.js) - לא כתובה כאן.
      await api.post("/api/submit-lead", {
        name: form.name,
        email: form.email,
        phone: form.phone,
      });
      // עברנו לניווט לעמוד תודה נפרד (route) במקום להחליף state באותו עמוד -
      // זה פותר בעיות של תוכן שמופיע במקום הלא נכון בתוך העמוד.
      navigate("/thank-you");
    } catch (err) {
      setSubmitError("משהו השתבש בשליחה, נסו שוב בעוד רגע.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="cta-form" className="relative overflow-hidden py-6">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${footerBg})` }}
      />
      <div className="absolute inset-0 bg-white/70" />

      <div className="relative mx-auto max-w-md px-6">
        <Reveal>
          <img
            src={mockupDevices}
            alt="המדריך לבונה"
            className="mx-auto w-full max-w-xs"
            style={{ marginBottom: "-2rem" }}
          />
        </Reveal>

          <div className="rounded-3xl border border-neutral-200 bg-white p-8 text-center shadow-2xl">
                <p className="mb-2 text-lg font-bold text-neutral-800">רוצים להתחיל לבנות נכון?</p>
                <p className="mb-3 text-neutral-600">
                  השאירו פרטים וקבלו את{" "}
                  <span className="font-bold">המדריך החינמי לבונה</span> שיעשה לכם סדר
                  ישירות למייל
                </p>

                <form onSubmit={handleSubmit} className="space-y-4 text-right" noValidate>
                  <div>
                    <label className="mb-1 block text-sm font-bold text-neutral-700">שם:</label>
                    <input
                      type="text"
                      placeholder="ישראל ישראלי"
                      value={form.name}
                      onChange={update("name")}
                      onBlur={handleBlur("name")}
                      className="w-full rounded-xl border px-4 py-3 text-neutral-800 outline-none"
                      style={{ borderColor: errors.name ? "#e05252" : "#ddd" }}
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-bold text-neutral-700">אימייל:</label>
                    <input
                      type="email"
                      placeholder="name@email.com"
                      value={form.email}
                      onChange={update("email")}
                      onBlur={handleBlur("email")}
                      className="w-full rounded-xl border px-4 py-3 text-neutral-800 outline-none"
                      style={{ borderColor: errors.email ? "#e05252" : "#ddd" }}
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-bold text-neutral-700" >טלפון:</label>
                    <input
                    dir="rtl"
                      type="tel"
                      placeholder="050-1234567"
                      value={form.phone}
                      onChange={update("phone")}
                      onBlur={handleBlur("phone")}
                      className="w-full rounded-xl border px-4 py-3 text-neutral-800 outline-none"
                      style={{ borderColor: errors.phone ? "#e05252" : "#ddd" }}
                    />
                    {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                  </div>

                  <label className="flex items-center justify-start gap-2 text-sm text-neutral-600">
                    <input
                      type="checkbox"
                      checked={agree}
                      onChange={(e) => setAgree(e.target.checked)}
                    />
                    אני מאשר/ת קבלת תכנים שיווקיים
                  </label>
                  {errors.agree && <p className="text-xs text-red-500">{errors.agree}</p>}
                  {submitError && <p className="text-xs text-red-500">{submitError}</p>}

                  <button
                    type="submit"
                    disabled={submitting || !agree}
                    className="w-full rounded-xl py-4 text-lg font-bold text-white shadow-lg transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:hover:scale-100"
                    style={{ backgroundColor: GREEN, opacity: submitting || !agree ? 0.5 : 1 }}
                  >
                    {submitting ? "שולח..." : "כן שלחו לי את המדריך"}
                  </button>
                </form>

                <p className="mt-6 text-sm text-neutral-500">
                  יש שאלות? אנחנו כאן בשבילכם:{" "}
                  <a href="mailto:baitb2yadayim@gmail.com" className="underline">
                    baitb2yadayim@gmail.com
                  </a>
                </p>
          </div>
      </div>
    </section>
  );
}

export default function GuidePage() {
  const scrollToForm = () => {
    document.getElementById("cta-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div dir="rtl" style={{ fontFamily: "'Rubik', 'Arial', sans-serif" }} className="text-neutral-900">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700;800;900&display=swap');`}</style>

      <TopBar />
      <div style={{ backgroundColor: "#faf7ec" }}>
        <HeroSection onCtaClick={scrollToForm} />
      </div>
      <VideoSection />
      <WaveDivider />
      <StraightTalkSection onCtaClick={scrollToForm} />
      <ProductShowcase />
      <StagesSection />
      <BenefitsSection />
      {/* <AboutSection /> */}
      {/* <AboutAsaf/> */}
      <CTAFormSection />
    </div>
  );
}