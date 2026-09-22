import {
  AlertTriangle,
  ArrowDown,
  CheckCircle2,
  FileText,
  HardHat,
  HelpCircle,
  Package,
  User,
  Users,
} from "lucide-react";
import Reveal from "../components/Reveal";

/* ---------- קו גלי מתחת למילים מודגשות ---------- */
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

/* ---------- רשת הנקודות: הפרטים הקטנים שנופלים בין הכיסאות ---------- */
const COLS = 14;
const ROWS = 5;
const MISSED = new Set(["8-1", "3-2", "11-3"]); // עמודה-שורה

function DotGrid() {
  const dots = [];
  for (let r = 0; r < ROWS; r += 1) {
    for (let c = 0; c < COLS; c += 1) {
      const cx = 12 + 24 * c;
      const cy = 12 + 24 * r;
      if (MISSED.has(`${c}-${r}`)) {
        dots.push(
          <g key={`${c}-${r}`}>
            <circle cx={cx} cy={cy} r="12" fill="#A8CE7A" fillOpacity="0.45" />
            <circle cx={cx} cy={cy} r="6.5" fill="#203123" />
          </g>
        );
      } else {
        dots.push(<circle key={`${c}-${r}`} cx={cx} cy={cy} r="5.5" fill="#cfe0bb" />);
      }
    }
  }
  return (
    <svg
      viewBox="0 0 336 120"
      aria-hidden="true"
      className="h-auto w-full max-w-[210px] shrink-0 md:max-w-[220px]"
    >
      {dots}
    </svg>
  );
}

/* ---------- נתונים ---------- */
const players = [
  { label: "קבלנים.", Icon: HardHat },
  { label: "ספקים.", Icon: Package },
  { label: "יועצים.", Icon: Users },
  { label: "שלבים בירוקרטיים.", Icon: FileText },
];

/* שלושת הגוונים של הריבועים בכותרת: כהה / לבן עם מסגרת / ירוק */
const questions = [
  {
    title: "מה חשוב לשאול",
    ghost: "?",
    Icon: HelpCircle,
    card: "bg-[#203123] text-white",
    ghostColor: "text-white/[.07]",
    blob: "rounded-[42%_58%_63%_37%/45%_41%_59%_55%] bg-white text-[#759855]",
  },
  {
    title: "מה צריך לבדוק",
    ghost: "✓",
    Icon: CheckCircle2,
    card: "border border-[#C6D3BB] bg-white/80 text-[#2D382B] backdrop-blur",
    ghostColor: "text-[#dbe6cd]",
    blob: "rounded-[58%_42%_37%_63%/41%_45%_55%_59%] bg-[#e8f0de] text-[#759855]",
  },
  {
    title: "ומה עלול להתפספס בדרך",
    ghost: "!",
    Icon: AlertTriangle,
    card: "bg-[#789b59] text-white",
    ghostColor: "text-white/[.14]",
    blob: "rounded-[42%_58%_63%_37%/45%_41%_59%_55%] bg-white text-[#5f8248]",
  },
];

const quotes = [
  {
    text: "יש כל כך הרבה החלטות בדרך ואני מפחד לפספס משהו",
    side: "self-start",
    bubble: "border border-[#C6D3BB] bg-white/85 rounded-[16px_16px_4px_16px]",
    avatar: "bg-[#e8f0de]",
  },
  {
    text: "אני לא מגיע מהתחום ואני לא תמיד מבין על מה מדברים",
    side: "self-end",
    bubble: "bg-[#dfe9d1] rounded-[16px_16px_16px_4px]",
    avatar: "bg-[#eef3e4]",
  },
  {
    text: "הלוואי שהיה משהו שמסביר מה צריך לבדוק בכל שלב",
    side: "self-start",
    bubble: "border border-[#C6D3BB] bg-white/85 rounded-[16px_16px_4px_16px]",
    avatar: "bg-[#e8f0de]",
  },
];

/* ---------- הסקשן ---------- */
export default function HomeBuildingIntro() {
  return (
    <section
      dir="rtl"
      className="section-pad relative overflow-hidden bg-surface text-[#2D382B]"
    >
      <div className="page-wrap relative mx-auto max-w-4xl">
        {/* כותרת: זהה לפתיח של שאר הסקשנים בדף (תווית עם קווים + שתי שורות) */}
        <Reveal>
          <header className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
            <div className="flex items-center justify-center gap-4">
              <span className="h-px w-10 bg-gradient-to-l from-[#8EAD70] to-transparent" />

              <span className="text-xs font-black tracking-[0.18em] text-[#78965D]">
                זה חלום גדול
              </span>

              <span className="h-px w-10 bg-gradient-to-r from-[#8EAD70] to-transparent" />
            </div>

            <h2 className="mt-6 text-4xl font-black leading-[1.2] md:text-5xl">
              רוב האנשים בונים בית
              <span className="mt-2 block text-[#759855]">פעם אחת בחיים.</span>
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-base font-medium leading-8 text-[#6B7567] md:text-lg">
              אבל מהר מאוד מגלים משהו שלא תמיד מדברים עליו:
            </p>
            <ArrowDown className="mx-auto mt-3 h-4 w-4 text-[#7da457]" strokeWidth={2} aria-hidden="true" />
          </header>
        </Reveal>

        <div className="flex flex-col items-center gap-9 md:gap-12">
          {/* ההחלטות */}
          <Reveal className="flex w-full flex-col items-center gap-5 md:gap-6">
            <h3 className="text-center text-[26px] font-black leading-[1.2] md:text-[36px]">
              תהליך הבנייה מלא בהחלטות.{" "}
              <span className="relative inline-block text-[#759855]">
                המון החלטות.
                <Squiggle className="-bottom-1.5 h-2 md:-bottom-2 md:h-2.5" />
              </span>
            </h3>

            <div className="flex flex-wrap justify-center gap-2">
              {players.map(({ label, Icon }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 rounded-full border border-[#C6D3BB] bg-white/80 py-1 pl-4 pr-1 backdrop-blur"
                >
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-[#e8f0de] text-[#759855] md:h-8 md:w-8">
                    <Icon className="h-4 w-4" strokeWidth={1.8} />
                  </span>
                  <span className="text-[15px] font-black text-[#35402F] md:text-[17px]">{label}</span>
                </div>
              ))}
            </div>

            <div className="flex w-full flex-col items-center justify-between gap-4 rounded-[18px] border border-[#C6D3BB] bg-white/80 px-5 py-5 backdrop-blur md:flex-row md:gap-8 md:rounded-[20px] md:px-8">
              <p className="flex-1 text-[18px] font-black leading-[1.4] text-[#35402F] md:text-[22px]">
                עשרות פרטים קטנים שכל אחד מהם יכול לעלות ביוקר אם מפספסים אותו.
              </p>
              <DotGrid />
            </div>
          </Reveal>

          {/* ולא תמיד ברור */}
          <Reveal className="flex w-full flex-col items-center gap-3">
            <p className="text-[15px] font-black text-[#4b5948] md:text-[17px]">ולא תמיד ברור:</p>
            <div className="grid w-full grid-cols-1 gap-2.5 sm:grid-cols-3 md:gap-3">
              {questions.map(({ title, ghost, Icon, card, ghostColor, blob }) => (
                <div
                  key={title}
                  className={`relative flex items-center gap-3 overflow-hidden rounded-[18px] px-4 py-3.5 sm:min-h-[104px] sm:flex-col sm:items-start sm:justify-between sm:gap-3 md:rounded-[20px] md:p-4 ${card}`}
                >
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute -bottom-4 left-1 select-none text-[76px] font-black leading-none ${ghostColor}`}
                  >
                    {ghost}
                  </span>
                  <span className={`relative grid h-10 w-10 shrink-0 place-items-center md:h-11 md:w-11 ${blob}`}>
                    <Icon className="h-5 w-5" strokeWidth={1.7} />
                  </span>
                  <span className="relative text-[17px] font-black leading-tight md:text-[19px]">
                    {title}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* והאמת? */}
          <Reveal className="w-full max-w-[720px]">
            <div className="rounded-[18px] border border-[#C6D3BB] bg-white/70 px-6 py-7 text-center backdrop-blur md:rounded-[22px] md:px-10 md:py-8">
              <p className="text-[14px] font-black text-[#78965D] md:text-[16px]">והאמת?</p>
              <h3 className="mt-2 text-[22px] font-black leading-[1.25] md:text-[30px]">
                רוב הטעויות בבניית בית{" "}
                <span className="text-[#759855]">לא קורות בזמן הבנייה.</span>
              </h3>
              <span className="mx-auto mt-4 block h-px w-12 bg-[#9bb681]" />
              <p className="mx-auto mt-4 max-w-[560px] text-[15px] font-medium leading-[1.7] text-[#6B7567] md:text-[17px]">
                הן קורות הרבה קודם — לפעמים פשוט כי לא ידעתם לשאול את השאלה הנכונה בזמן.
              </p>
            </div>
          </Reveal>

          {/* מה אנחנו שומעים */}
          <Reveal className="flex w-full flex-col items-center gap-4">
            <h3 className="text-center text-[22px] font-black md:text-[28px]">
              אנחנו שומעים את זה{" "}
              <span className="relative inline-block text-[#759855]">
                שוב ושוב:
                <Squiggle className="-bottom-1.5 h-2 md:-bottom-2 md:h-2.5" />
              </span>
            </h3>
            <div className="flex w-full flex-col gap-2.5 md:gap-3">
              {quotes.map(({ text, side, bubble, avatar }) => (
                <figure
                  key={text}
                  className={`flex max-w-[94%] items-end gap-2 md:max-w-[500px] ${side}`}
                >
                  <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-[#759855] ${avatar}`}>
                    <User className="h-4 w-4" strokeWidth={1.7} />
                  </span>
                  <blockquote
                    className={`px-4 py-3 text-[16px] font-black leading-[1.45] text-[#35402F] md:px-5 md:py-3.5 md:text-[19px] ${bubble}`}
                  >
                    {text}
                  </blockquote>
                </figure>
              ))}
            </div>
          </Reveal>

          {/* סיום */}
          <Reveal className="flex flex-col items-center gap-6 md:flex-row md:justify-center md:gap-10">
            <div className="flex max-w-[460px] flex-col gap-2">
              <h3 className="text-[26px] font-black leading-[1.15] md:text-[34px]">
                אתם ממש{" "}
                <span className="relative inline-block text-[#759855]">
                  לא היחידים.
                  <Squiggle className="-bottom-1.5 h-2 md:-bottom-2 md:h-2.5" />
                </span>
              </h3>
              <p className="mt-1 text-[15px] font-medium leading-[1.55] text-[#6B7567] md:text-[18px]">
                בניית בית היא אחד הפרויקטים המורכבים שאנשים עושים בחיים.
              </p>
              <div className="mt-1 flex items-start gap-2.5 border-t border-[#cbd5c3] pt-3">
                <CheckCircle2 className="mt-1 h-[17px] w-[17px] shrink-0 text-[#7da457]" aria-hidden="true" />
                <p className="text-[15px] font-black leading-[1.55] text-[#536052] md:text-[18px]">
                  ואני יודע את זה — כי ליוויתי מעל 100 משפחות שעברו בדיוק את זה.
                </p>
              </div>
            </div>

             
          </Reveal>
        </div>
      </div>
    </section>
  );
}
