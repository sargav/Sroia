import { YEARS_OF_EXPERIENCE } from "../utils/experience";
import useSiteStats, { formatSavings } from "../utils/useSiteStats";
import asafImg from "./assets/asaf-personal.jpg";

// שלושת הערכים שמוצגים ככפתורים עם סימן וי
const VALUES = [
  "100% מחויבות ואכפתיות",
  "מקצועיות וניסיון בשטח",
  "שליטה תקציבית מוחלטת",
];

function CheckIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#9ED164"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M5 12l5 5 9-10" />
    </svg>
  );
}

export default function AboutAsaf() {
  // מספר הפרויקטים והחיסכון - מתעדכנים מפאנל הניהול
  const { projectsCount, avgSavings } = useSiteStats();

  const stats = [
    { number: `${YEARS_OF_EXPERIENCE}+`, text: "שנות ניסיון בשטח" },
    { number: `${projectsCount}+`, text: "פרויקטים שליווינו" },
    { number: formatSavings(avgSavings), text: "חיסכון ממוצע ללקוח" },
  ];

  return (
    <section
      dir="rtl"
      className="bg-[#F6F8F1] px-4 py-14 font-['Heebo',sans-serif] md:px-6 md:py-20"
    >
      {/* כרטיס ירוק כהה: טקסט מימין, תמונה משמאל (במובייל התמונה למעלה) */}
      <div className="mx-auto grid max-w-[77.5rem] overflow-hidden rounded-[2rem] bg-[#1F2E18] shadow-[0_30px_60px_rgba(31,46,24,0.18)] md:grid-cols-[1fr_27.5rem]">
        <div className="order-2 flex flex-col justify-between gap-10 px-6 py-10 md:order-1 md:px-16 md:py-16">
          <div>
            <p className="mb-4 text-[0.875rem] font-bold tracking-[0.15em] text-[#9ED164] md:text-[0.9375rem]">
              <span>אסף סרויה</span>
              <span className="hidden md:inline" aria-hidden="true">
                {" · "}
              </span>
              <span className="block md:inline">מנהל ומפקח בנייה פרטית</span>
            </p>

            <blockquote className="mb-5 text-[1.5rem] font-extrabold leading-[1.45] text-white md:text-[2rem]">
              כל בית שאני מלווה מרגיש לי כמו הבית שלי.{" "}
              <span className="text-[#9ED164]">אני לא עוזב פרויקט</span> עד
              שאני בטוח שהמשפחה מקבלת בדיוק את מה שהיא חלמה עליו.
            </blockquote>

            <p className="mb-6 max-w-[37.5rem] text-[1rem] leading-[1.85] text-[#D5DAD2]">
              בנייה פרטית היא תהליך מורכב ומבלבל, וכל טעות בדרך עולה כסף.
              בליווי ובפיקוח הצמוד שלנו תחסכו זמן, כסף ועוגמת נפש, ותקבלו בית
              בסטנדרט הבנייה הגבוה ביותר, בלי פשרות.
            </p>

            <ul className="flex flex-wrap gap-2.5">
              {VALUES.map((value) => (
                <li
                  key={value}
                  className="inline-flex items-center gap-2 rounded-full border border-[#9ED164]/35 bg-white/[0.08] px-4 py-2.5 text-[0.9375rem] font-semibold text-white"
                >
                  <CheckIcon />
                  {value}
                </li>
              ))}
            </ul>
          </div>

          {/* מספרים */}
          <div className="grid grid-cols-3 border-t border-white/[0.18] pt-8">
            {stats.map((item, index) => (
              <div
                key={item.text}
                className={`px-2 md:px-7 ${
                  index !== 0 ? "border-r border-white/[0.18]" : "md:pr-0"
                }`}
              >
                <div
                  dir="ltr"
                  className="text-right text-[1.75rem] font-black leading-none text-[#9ED164] md:text-[3.25rem]"
                >
                  {item.number}
                </div>
                <div className="mt-2 text-[0.8125rem] font-semibold text-[#D5DAD2] md:text-[0.9375rem]">
                  {item.text}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* תמונה */}
        <div className="relative order-1 h-[20rem] md:order-2 md:h-auto">
          <img
            src={asafImg}
            alt="אסף סרויה"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover object-[40%_25%]"
          />
          {/* מעבר רך לירוק בצד של הטקסט */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#1F2E18] to-transparent md:inset-y-0 md:right-0 md:left-auto md:h-auto md:w-[11rem] md:bg-gradient-to-l md:from-[#1F2E18] md:via-[#1F2E18]/60" />
        </div>
      </div>
    </section>
  );
}
