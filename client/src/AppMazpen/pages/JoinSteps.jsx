import { BadgeCheck, Mail, Phone, Route } from "lucide-react";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";

/* ארבעה צעדים ברצף אמיתי, לכן המספור והמסלול כאן הם חלק מהתוכן.
   הצמתים מתמלאים בהדרגה, מהראשון הריק עד האחרון המלא */
const steps = [
  {
    Icon: Mail,
    title: "מקבלים פרטי גישה",
    text: "מיד לאחר התשלום",
    node: "border-[#C6D3BB] bg-white text-[#78965D]",
  },
  {
    Icon: Phone,
    title: "פותחים מהטלפון",
    text: "בלי התקנה מורכבת",
    node: "border-[#B5C9A4] bg-[#E8F0DE] text-[#5f8248]",
  },
  {
    Icon: Route,
    title: "בוחרים את השלב",
    text: "לא צריך להתחיל מהתחלה",
    node: "border-[#91AF76] bg-[#C9DBB6] text-[#3f5d2e]",
  },
  {
    Icon: BadgeCheck,
    title: "מסמנים ומתקדמים",
    text: "יודעים מה פתוח ומה הושלם",
    node: "border-[#759855] bg-[#759855] text-white",
  },
];

export default function JoinSteps() {
  return (
    <section className="py-20 md:py-28 bg-[#FBFBF8]">
      <div className="mx-auto w-full px-5 md:px-10 max-w-7xl">
        <SectionHeading
          eyebrow="ארבעה צעדים"
          title="מצטרפים היום"
          accent="ומתחילים בדיוק מהשלב שלכם"
        />

        <div className="relative mx-auto max-w-5xl">
          {/* הקו המחבר בין הצמתים (במחשב) */}
          <div className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-[22px] hidden border-t-2 border-dashed border-[#C6D3BB] md:block" />

          <ol className="grid gap-4 md:grid-cols-4 md:gap-5">
            {steps.map(({ Icon, title, text, node }, i) => {
              const isLast = i === steps.length - 1;
              return (
                <li key={title} className="relative flex gap-4 md:flex-col md:gap-0">
                  {/* הקו האנכי המחבר בטלפון */}
                  {!isLast && (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-[-16px] right-[21px] top-11 w-px bg-[#C6D3BB] md:hidden"
                    />
                  )}

                  {/* הצומת */}
                  <span
                    className={`relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 text-sm font-black md:mx-auto ${node}`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <Reveal delay={i * 80} className="flex-1 md:mt-5">
                    <article className="group relative h-full overflow-hidden rounded-[8px_26px_8px_26px] border border-[#D3DECC] bg-white/90 p-5 shadow-[0_12px_35px_rgba(65,83,56,.06)] transition duration-300 hover:-translate-y-1 hover:border-[#A6BC95] hover:shadow-[0_20px_45px_rgba(65,83,56,.11)] md:p-6 md:text-center">
                      <span className="absolute right-0 top-0 h-[3px] w-14 bg-[#91AF76] transition-all duration-500 group-hover:w-full" />
                      <span className="grid h-11 w-11 place-items-center rounded-full bg-[#E8F0DE] text-[#759855] md:mx-auto">
                        <Icon size={22} strokeWidth={1.7} />
                      </span>
                      <h3 className="mt-4 text-lg font-black leading-7 text-[#35402F]">{title}</h3>
                      <p className="mt-1.5 text-sm font-medium leading-6 text-[#6B7567]">{text}</p>
                    </article>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
