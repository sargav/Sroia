import { ArrowDown, Compass, DoorOpen, HardHat, Moon } from "lucide-react";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import BlueprintBackground from "./BlueprintBackground";

/* שלוש הרגעים, פעם בלי המצפן ופעם איתו. אותו סדר בשתי השורות: אתר, פגישה, לילה */
const before = [
  { Icon: HardHat, text: "אתם עומדים באתר, הקבלן שואל — ואתם מנחשים את התשובה." },
  { Icon: DoorOpen, text: "יוצאים מהפגישה ותוהים אם פספסתם משהו." },
  { Icon: Moon, text: "שוכבים בלילה וחושבים על מה שעוד לא סגרתם." },
];

const after = [
  { Icon: HardHat, text: "אתם מגיעים לאתר עם רשימה ברורה — ויודעים בדיוק מה לשאול." },
  { Icon: DoorOpen, text: "יוצאים מכל פגישה עם תחושה שכיסיתם את כל מה שצריך." },
  { Icon: Moon, text: "וישנים טוב יותר בלילה — כי יודעים שלא פספסתם כלום." },
];

/**
 * הסקשן "עכשיו תעצרו רגע ותדמיינו".
 * CTAButton מוגדר בתוך Index, ולכן מעבירים אותו כ-prop:
 *   <ImagineSection cta={<CTAButton className="mt-7">אני רוצה לראות מה בפנים</CTAButton>} />
 */
export default function ImagineSection({ cta }) {
  return (
    <section className="py-20 md:py-28 relative isolate overflow-hidden text-[#2D382B]">
      <BlueprintBackground />

      <div className="mx-auto w-full px-5 md:px-10 max-w-7xl relative">
        <SectionHeading
          eyebrow="עכשיו תעצרו רגע ותדמיינו"
          title="איך נראית הבנייה"
          accent="כשאתם באמת בשליטה?"
        />

        <div className="mx-auto max-w-5xl">
 
          {/* אחרי: אותם שלושה רגעים, עם רשימה ברורה */}
          <div className="grid gap-3 md:grid-cols-3 md:gap-4">
            {after.map(({ Icon, text }, i) => (
              <Reveal key={text} delay={i * 80}>
                <div className="relative flex h-full items-center gap-4 overflow-hidden rounded-[26px_8px_26px_8px] border border-[#D3DECC] bg-white p-4 shadow-[0_12px_35px_rgba(65,83,56,.08)] md:flex-col md:items-start md:p-6">
                  <span className="absolute right-0 top-0 h-[3px] w-14 bg-[#91AF76]" />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-7 left-2 select-none text-[80px] font-black leading-none text-[#7E9D65]/[0.09] md:text-[110px]"
                  >
                    ✓
                  </span>
                  <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#759855] text-white md:h-12 md:w-12">
                    <Icon size={22} strokeWidth={1.7} />
                  </span>
                  <p className="relative text-[15px] font-black leading-6 text-[#35402F] md:text-[17px] md:leading-7">
                    {text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* הסיום */}
          <Reveal delay={150}>
            <div className="mx-auto mt-12 flex max-w-2xl flex-col items-center text-center md:mt-14">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-white text-[#759855] shadow-[0_0_0_1px_#D3DECC]">
                <Compass size={28} strokeWidth={1.6} />
              </span>
              <p className="mt-5 text-xl font-medium text-[#6B7567] md:text-2xl">זה לא בלתי אפשרי.</p>
              <p className="mt-1 text-2xl font-black leading-snug text-[#35402F] md:text-[32px]">
                זה בדיוק מה ש<span className="text-[#759855]">המצפן לבונה</span> עושה.
              </p>
              {cta}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
