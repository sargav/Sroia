import { Check, Compass } from "lucide-react";
import Reveal from "../components/Reveal";

const items = [
  "יודעים מה לשאול לפני הפגישה",
  "מסמנים מה בוצע ומה עדיין פתוח",
  "מבינים את השפה ואת סדר הפעולות",
  "מתקדמים לשלב הבא עם יותר ביטחון",
];

function Squiggle({ className = "" }) {
  return (
    <svg
      viewBox="0 0 300 16"
      preserveAspectRatio="none"
      aria-hidden="true"
      fill="none"
      stroke="#A8CE7A"
      strokeWidth="3.5"
      strokeLinecap="round"
      className={`absolute right-0 w-full ${className}`}
    >
      <path
        vectorEffect="non-scaling-stroke"
        d="M4 9 C 30 1, 55 15, 85 8 S 140 2, 170 9 S 235 15, 262 7 S 290 4, 296 8"
      />
    </svg>
  );
}

/**
 * הסקשן הכהה "מגיעים לכל שלב עם רשימה ברורה", באותו מבנה של המקור.
 * CTAButton מוגדר בתוך Index, ולכן מעבירים אותו כ-prop:
 *   <ClearListSection cta={<CTAButton className="mt-7">אני רוצה לראות מה בפנים</CTAButton>} />
 */
export default function ClearListSection({ cta }) {
  return (
    <section className="section-pad relative overflow-hidden bg-deep text-white">
      {/* זוהר עדין */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#9ec172]/15 blur-3xl" />

      <div className="page-wrap relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* צד ימין: כותרת + רשימה */}
        <Reveal>
          <span className="eyebrow border-white/15 bg-white/10 text-[#c6e3a0]">
            עכשיו תעצרו רגע ודמיינו הכל אחרת
          </span>

          <h2 className="mt-5 text-4xl font-black leading-[1.2] md:text-5xl">
            מגיעים לכל שלב
            <span className="relative mt-2 inline-block text-[#b7da86]">
              עם רשימה ברורה.
              <Squiggle className="-bottom-1.5 h-2 md:-bottom-2 md:h-2.5" />
            </span>
          </h2>

          {/* רשימה מחוברת בקו, כמו מסלול */}
          <ol className="relative mt-9">
            <span className="absolute bottom-6 right-4 top-6 w-px bg-white/15" aria-hidden="true" />
            {items.map((item, i) => (
              <li key={item} className="group relative flex items-center gap-4 py-2">
                <span className="relative z-10 bg-deep py-1">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-[#b7da86] text-[#1d301f] transition duration-300 group-hover:scale-110">
                    <Check size={16} strokeWidth={3} />
                  </span>
                </span>
                <span className="flex-1 rounded-2xl border border-white/10 bg-white/[.04] px-4 py-3 text-base font-bold leading-6 text-white/90 transition duration-300 group-hover:border-[#b7da86]/40 group-hover:bg-white/[.07] md:text-lg">
                  {item}
                </span>
              </li>
            ))}
          </ol>
        </Reveal>

        {/* צד שמאל: כרטיס המצפן */}
        <Reveal delay={120}>
          <div className="relative">
            <div className="pointer-events-none absolute -left-3 -top-3 h-14 w-14 border-l border-t border-[#8da678]/60 md:h-20 md:w-20" />
            <div className="pointer-events-none absolute -bottom-3 -right-3 h-14 w-14 border-b border-r border-[#8da678]/60 md:h-20 md:w-20" />

            <div className="relative overflow-hidden rounded-[8px_36px_8px_36px] border border-white/12 bg-white/[.06] p-7 backdrop-blur-sm md:p-10">
              {/* מצפן רפאים ברקע הכרטיס */}
              <Compass
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-10 -left-10 h-56 w-56 text-white/[.04]"
                strokeWidth={1}
              />
              {/* פס עליון */}
              <span className="absolute right-0 top-0 h-[3px] w-16 bg-[#b7da86]" />

              <div className="relative">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-[#b7da86]/15 text-[#b7da86]">
                  <Compass size={28} strokeWidth={1.6} />
                </span>
                <h3 className="mt-6 text-3xl font-black">המצפן לבונה</h3>
                <p className="mt-4 text-lg font-medium leading-8 text-white/65">
                  מערכת דיגיטלית שמפרקת את כל הדרך למשימות פשוטות: מה לבדוק, מה לאשר ומה לא לדלג עליו.
                </p>
                {cta}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}