import { Check, Compass } from "lucide-react";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";

const items = [
  "יודעים מה לשאול לפני הפגישה",
  "מסמנים מה בוצע ומה עדיין פתוח",
  "מבינים את השפה ואת סדר הפעולות",
  "מתקדמים לשלב הבא עם יותר ביטחון",
];

/* שתי גרסאות צבע לאותו מבנה. אפשר להחליף עם variant="light" */
const themes = {
  dark: {
    section: "bg-[#1e3021] text-white",
    mask: "bg-[#1e3021]",
    line: "bg-white/15",
    check: "bg-[#A9BE98] text-[#1e3021]",
    row: "border-white/10 bg-white/[.04] text-white/90 group-hover:border-[#A9BE98]/40 group-hover:bg-white/[.07]",
    card: "border-white/12 bg-white/[.06]",
    frame: "border-[#8da678]/60",
    bar: "bg-[#A9BE98]",
    ghost: "text-white/[.04]",
    icon: "bg-white/10 text-[#A9BE98]",
    title: "text-white",
    text: "text-white/65",
    glow: "bg-[#8EAD70]/12",
  },
  light: {
    section: "bg-[#EEF2E9] text-[#2D382B]",
    mask: "bg-[#EEF2E9]",
    line: "bg-[#C6D3BB]",
    check: "bg-[#759855] text-white",
    row: "border-[#D3DECC] bg-white/85 text-[#35402F] group-hover:border-[#A6BC95] group-hover:bg-white",
    card: "border-[#D3DECC] bg-white/85 shadow-[0_12px_35px_rgba(65,83,56,.06)]",
    frame: "border-[#8da678]",
    bar: "bg-[#91AF76]",
    ghost: "text-[#7E9D65]/[0.07]",
    icon: "bg-[#E8F0DE] text-[#759855]",
    title: "text-[#35402F]",
    text: "text-[#6B7567]",
    glow: "bg-[#DFEBD4]/70",
  },
};

/**
 * הסקשן "מגיעים לכל שלב עם רשימה ברורה".
 * CTAButton מוגדר בתוך Index, ולכן מעבירים אותו כ-prop:
 *   <ClearListSection cta={<CTAButton className="mt-7">אני רוצה לראות מה בפנים</CTAButton>} />
 * גרסה בהירה: <ClearListSection variant="light" cta={...} />
 */
export default function ClearListSection({ cta, variant = "dark" }) {
  const t = themes[variant] ?? themes.dark;

  return (
    <section className={`section-pad relative overflow-hidden ${t.section}`}>
      <div className={`pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full blur-3xl ${t.glow}`} />

      <div className="page-wrap relative">
        {/* כותרת: אותו סגנון כמו בכל הדף */}
        <SectionHeading
          light={variant === "dark"}
          eyebrow="עכשיו תעצרו רגע ודמיינו הכל אחרת"
          title="מגיעים לכל שלב"
          accent="עם רשימה ברורה."
        />

        <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* הרשימה, מחוברת בקו */}
          <Reveal>
            <ol className="relative">
              <span className={`absolute bottom-6 right-4 top-6 w-px ${t.line}`} aria-hidden="true" />
              {items.map((item) => (
                <li key={item} className="group relative flex items-center gap-4 py-2">
                  <span className={`relative z-10 py-1 ${t.mask}`}>
                    <span
                      className={`grid h-8 w-8 place-items-center rounded-full transition duration-300 group-hover:scale-110 ${t.check}`}
                    >
                      <Check size={16} strokeWidth={3} />
                    </span>
                  </span>
                  <span
                    className={`flex-1 rounded-2xl border px-4 py-3 text-base font-bold leading-6 transition duration-300 md:text-lg ${t.row}`}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>

          {/* כרטיס המצפן */}
          <Reveal delay={120}>
            <div className="relative">
              <div className={`pointer-events-none absolute -left-3 -top-3 h-14 w-14 border-l border-t md:h-20 md:w-20 ${t.frame}`} />
              <div className={`pointer-events-none absolute -bottom-3 -right-3 h-14 w-14 border-b border-r md:h-20 md:w-20 ${t.frame}`} />

              <div
                className={`relative overflow-hidden rounded-[8px_36px_8px_36px] border p-7 backdrop-blur-sm md:p-10 ${t.card}`}
              >
                <Compass
                  aria-hidden="true"
                  className={`pointer-events-none absolute -bottom-10 -left-10 h-56 w-56 ${t.ghost}`}
                  strokeWidth={1}
                />
                <span className={`absolute right-0 top-0 h-[3px] w-16 ${t.bar}`} />

                <div className="relative">
                  <span className={`grid h-14 w-14 place-items-center rounded-full ${t.icon}`}>
                    <Compass size={28} strokeWidth={1.6} />
                  </span>
                  <h3 className={`mt-6 text-3xl font-black ${t.title}`}>המצפן לבונה</h3>
                  <p className={`mt-4 text-lg font-medium leading-8 ${t.text}`}>
                    מערכת דיגיטלית שמפרקת את כל הדרך למשימות פשוטות: מה לבדוק, מה לאשר ומה לא לדלג עליו.
                  </p>
                  {cta}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
