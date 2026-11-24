import { YEARS_OF_EXPERIENCE } from "../utils/experience";
import useSiteStats, { formatPrice } from "../utils/useSiteStats";
import asafImg from "./assets/asaf-personal.jpg";

// ערכות צבע לכרטיס (לבחירה)
const THEMES = {
  // ירוק כהה (הקיים), עם מלל משני בהיר יותר
  dark: {
    card: "bg-[#1F2E18]",
    tag: "text-[#9ED164]",
    quote1: "text-white",
    quote2: "text-[#9ED164]",
    mark: "text-[#9ED164]/35",
    body: "text-[#E3E7E0]",
    rule: "border-[#9ED164]/40",
    value: "text-white",
    checkBg: "bg-[#9ED164]/15",
    checkStroke: "#9ED164",
    band: "bg-[#18240F]",
    number: "text-[#9ED164]",
    label: "text-[#E3E7E0]",
    divider: "border-white/[0.15]",
  },
  // ירוק זית מעודן
  olive: {
    card: "bg-[#37452F]",
    tag: "text-[#B4DD84]",
    quote1: "text-white",
    quote2: "text-[#B4DD84]",
    mark: "text-[#B4DD84]/40",
    body: "text-[#E6EAE2]",
    rule: "border-[#B4DD84]/40",
    value: "text-white",
    checkBg: "bg-[#B4DD84]/15",
    checkStroke: "#B4DD84",
    band: "bg-[#26321F]",
    number: "text-[#9ED164]",
    label: "text-[#E6EAE2]",
    divider: "border-white/[0.15]",
  },
  // ירוק מרווה בהיר
  sage: {
    card: "bg-[#E8EDDF]",
    tag: "text-[#2F5216]",
    quote1: "text-[#1F2E18]",
    quote2: "text-[#3F6B1E]",
    mark: "text-[#4A7322]/30",
    body: "text-[#3A4535]",
    rule: "border-[#4A7322]/40",
    value: "text-[#1F2E18]",
    checkBg: "bg-[#4A7322]/12",
    checkStroke: "#3F6B1E",
    band: "bg-[#1F2E18]",
    number: "text-[#9ED164]",
    label: "text-[#E3E7E0]",
    divider: "border-white/[0.15]",
  },
};

const THEME = THEMES.sage;

// צד התמונה במחשב: "left" או "right"
const PHOTO_SIDE = "right";

// שלושת הערכים שמוצגים עם סימן וי
const VALUES = ["מחויבות אישית", "ניסיון מעשי בשטח", "ראייה מקצועית וכלכלית"];

function CheckIcon() {
  return (
    <span
      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${THEME.checkBg}`}
      aria-hidden="true"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke={THEME.checkStroke}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12l5 5 9-10" />
      </svg>
    </span>
  );
}

export default function AboutAsaf() {
  // מספר הפרויקטים והחיסכון - מתעדכנים מפאנל הניהול
  const { projectsCount, avgSavings } = useSiteStats();

  const stats = [
    { number: `${YEARS_OF_EXPERIENCE}+`, text: "שנות ניסיון בענף הבנייה" },
    { number: `${projectsCount}+`, text: "פרויקטים שליווינו" },
    { number: `${formatPrice(avgSavings)} ₪`, text: "חיסכון ממוצע ללקוח" },
  ];

  return (
    <section
      dir="rtl"
      className="bg-[#F6F8F1] px-3 py-12 font-['Heebo',sans-serif] md:px-6 md:py-20"
    >
      <div className={`mx-auto max-w-[77.5rem] overflow-hidden rounded-[1.75rem] ${THEME.card} shadow-[0_18px_40px_rgba(31,46,24,0.09)] md:rounded-[2rem]`}>
        {/* תמונה בראש הכרטיס, עם פינות מעוגלות - רק בנייד ובטאבלט */}
        <div className="px-4 pt-4 md:px-12 md:pt-10 lg:hidden">
          <div className="relative h-[16rem] overflow-hidden rounded-[1.25rem] sm:h-[22rem]">
            <img
              src={asafImg}
              alt="אסף סרויה"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-[45%_20%]"
            />
          </div>
        </div>

        <div className="px-4 pb-9 pt-5 md:px-12 lg:px-16 lg:pb-10 lg:pt-10">
          {/* כותרת קטנה וציטוט - ממורכזים */}
          <div className="mx-auto mb-8 max-w-[70rem] text-center lg:mb-9">
            <p className={`mb-4 ${THEME.tag} text-[1rem] font-bold leading-snug tracking-[0.04em] md:text-[1.0625rem] md:tracking-[0.1em]`}>
              {/* בנייד השם והתפקיד בשתי שורות, במחשב בשורה אחת עם קו מפריד */}
              <span className="block md:inline">אסף סרויה</span>
              <span className="hidden md:inline" aria-hidden="true">
                {" | "}
              </span>
              <span className="block md:inline">
                מייסד החברה ומומחה לבנייה פרטית
              </span>
            </p>

            {/* ציטוט עם מירכאות דקורטיביות: פותחות מימין למעלה, סוגרות משמאל למטה */}
            <div className="relative mx-auto w-fit max-w-full px-3 md:px-12">
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute -right-2 -top-2 select-none md:right-0 font-serif text-[2.75rem] font-black leading-none ${THEME.mark} md:-top-6 md:text-[5.5rem]`}
              >
                ”
              </span>
              <blockquote className="text-balance text-[1.25rem] min-[380px]:text-[1.375rem] font-extrabold leading-[1.45] md:text-[2rem] lg:text-[2.25rem]">
                <span className={`block ${THEME.quote1}`}>
                  מאחורי כל פרויקט יש משפחה, חלום והשקעה של שנים.
                </span>
                <span className={`block ${THEME.quote2}`}>
                  מבחינתי, זו הרבה יותר מבנייה של בית.
                </span>
              </blockquote>
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute -bottom-7 -left-2 select-none md:left-0 font-serif text-[2.75rem] font-black leading-none ${THEME.mark} md:-bottom-14 md:text-[5.5rem]`}
              >
                “
              </span>
            </div>
          </div>

          {/* במחשב: טקסט ותמונה זה לצד זה (צד התמונה לפי PHOTO_SIDE) */}
          <div
            className={`lg:grid lg:items-center lg:gap-14 ${
              PHOTO_SIDE === "right"
                ? "lg:grid-cols-[22.5rem_minmax(0,1fr)]"
                : "lg:grid-cols-[minmax(0,1fr)_22.5rem]"
            }`}
          >
            <div className={PHOTO_SIDE === "right" ? "lg:order-2" : ""}>
              <div className={`mb-7 space-y-4 border-r-2 ${THEME.rule} pr-5 text-[1.125rem] leading-[1.8] ${THEME.body} lg:mb-7`}>
                <p>
                  אסף סרויה צמח מתוך עולם הבנייה והביצוע ומביא איתו למעלה
                  מ־{YEARS_OF_EXPERIENCE} שנות ניסיון בקבלנות, בניהול ובפיקוח
                  פרויקטים.
                </p>
                <p>
                  היכולת לראות את התמונה הגדולה מבלי לפספס את הפרטים הקטנים,
                  לצד הבנה מעמיקה של תהליכי הבנייה, העלויות והאתגרים בשטח, היא
                  הבסיס למעטפת המקצועית שבנה עבור הבונה הפרטי.
                </p>
              </div>

              {/* ערכים: בנייד אחד מתחת לשני, ממסך בינוני בשורה */}
              <ul className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-3">
                {VALUES.map((value) => (
                  <li
                    key={value}
                    className={`flex items-center gap-2.5 whitespace-nowrap text-[1rem] font-bold ${THEME.value}`}
                  >
                    <CheckIcon />
                    {value}
                  </li>
                ))}
              </ul>
            </div>

            {/* תמונה - רק במחשב */}
            <div
              className={`relative hidden h-[22rem] overflow-hidden rounded-[1.5rem] lg:block ${
                PHOTO_SIDE === "right" ? "lg:order-1" : ""
              }`}
            >
              <img
                src={asafImg}
                alt="אסף סרויה"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover object-[40%_20%]"
              />
            </div>
          </div>
        </div>

        {/* רצועת מספרים תחתונה */}
        <dl className={`grid grid-cols-3 ${THEME.band} px-2 py-6 md:px-12 md:py-8`}>
          {stats.map((item, index) => (
            <div
              key={item.text}
              className={`flex flex-col items-center px-1 text-center ${
                index !== 0 ? `border-r ${THEME.divider}` : ""
              }`}
            >
              <dd
                dir={item.number.includes("₪") ? "rtl" : "ltr"}
                className={`whitespace-nowrap text-[1.25rem] font-black leading-none ${THEME.number} min-[380px]:text-[1.375rem] sm:text-[2rem] lg:text-[2.75rem]`}
              >
                {item.number}
              </dd>
              <dt className={`order-last mt-2 text-[0.875rem] font-semibold leading-snug ${THEME.label} sm:text-[0.9375rem]`}>
                {item.text}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
