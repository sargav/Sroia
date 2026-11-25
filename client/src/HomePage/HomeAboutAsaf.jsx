import { YEARS_OF_EXPERIENCE } from "../utils/experience";
import useSiteStats, { formatPrice } from "../utils/useSiteStats";
import asafImg from "./assets/asaf-personal.jpg";

// הגדרות החלק: רקע בהיר עם נגיעה ירוקה,
// ערכים בשורה עם סימני וי, ורצועת נתונים מעוגלת ברוחב התוכן
const V = {
  section: "bg-mist",
  band: "rounded-xl",
  bandOutside: false,
  values: "plain",
};

// שלושת הערכים
const VALUES = ["מחויבות אישית", "ניסיון מעשי בשטח", "ראייה מקצועית וכלכלית"];

function Check() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--color-deep)"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M5 12l5 5 9-10" />
    </svg>
  );
}

function Values() {
  if (V.values === "dots") {
    return (
      <ul className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4">
        {VALUES.map((value, i) => (
          <li
            key={value}
            className="flex items-center gap-4 whitespace-nowrap text-[1rem] font-bold text-charcoal"
          >
            {i > 0 && (
              <span
                className="hidden h-1.5 w-1.5 rounded-full bg-brand sm:inline-block"
                aria-hidden="true"
              />
            )}
            <span className="flex items-center gap-2">
              <Check />
              {value}
            </span>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <ul
      className={`flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-7 ${
        V.values === "topline" ? "border-t border-line pt-5" : ""
      }`}
    >
      {VALUES.map((value, i) => (
        <li
          key={value}
          className={`flex items-center gap-2 whitespace-nowrap text-[1rem] font-bold text-charcoal ${
            i > 0 && V.values === "dividers" ? "sm:border-r sm:border-line" : ""
          }`}
        >
          <Check />
          {value}
        </li>
      ))}
    </ul>
  );
}

export default function AboutAsaf() {
  // מספר הפרויקטים והחיסכון - מתעדכנים מפאנל הניהול
  const { projectsCount, avgSavings } = useSiteStats();

  const stats = [
    { number: `${YEARS_OF_EXPERIENCE}+`, text: "שנות ניסיון בענף הבנייה" },
    { number: `${projectsCount}+`, text: "פרויקטים שליווינו" },
    { number: `${formatPrice(avgSavings)}+`, currency: true, text: "חיסכון ממוצע ללקוח" },
  ];

  const band = (
    <dl
      className={`grid grid-cols-3 bg-charcoal px-1 py-5 md:px-12 md:py-6 ${V.band}`}
    >
      {stats.map((item, index) => (
        <div
          key={item.text}
          className={`flex flex-col items-center px-0.5 text-center ${
            index !== 0 ? "border-r border-white/[0.15]" : ""
          }`}
        >
          <dd
            dir="ltr"
            style={{ unicodeBidi: "isolate" }}
            className="whitespace-nowrap text-[1rem] font-black leading-none text-brand min-[340px]:text-[1.125rem] min-[380px]:text-[1.25rem] sm:text-[1.875rem] md:text-[2rem] lg:text-[3rem]"
          >
            {/* תצוגה משמאל לימין: 120,000+ ₪ */}
            {item.number}
            {item.currency && <span className="ms-[0.2em]">₪</span>}
          </dd>
          <dt className="order-last mt-1.5 text-[0.875rem] font-bold leading-snug text-[#E3E7E0] sm:text-[0.9375rem] lg:mt-2">
            {item.text}
          </dt>
        </div>
      ))}
    </dl>
  );

  return (
    <section
      dir="rtl"
      className={`${V.section} font-['Heebo',sans-serif] ${
        V.bandOutside ? "pt-12 md:pt-16" : "py-8 md:py-16"
      }`}
    >
      <div className="mx-auto max-w-[77.5rem] px-4 md:px-12 lg:px-16">
        {/* תמונה בראש החלק - רק בנייד ובטאבלט */}
        <div className="relative mx-auto mb-5 aspect-[3/2] w-[88%] overflow-hidden rounded-xl lg:hidden">
          <img
            src={asafImg}
            alt="אסף סרויה"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover object-[45%_20%]"
          />
        </div>

        {/* כותרת קטנה וציטוט - ממורכזים */}
        <div className="mx-auto mb-6 max-w-[70rem] text-center lg:mb-6">
          {/* שם ותואר בשתי שורות */}
          <p className="mb-4 leading-snug">
            <span className="block text-[1.375rem] font-extrabold text-charcoal md:text-[1.65rem]">
              אסף סרויה
            </span>
            <span className="mt-0.5 block text-[1rem] font-bold tracking-[0.03em] text-deep md:text-[1.0625rem] md:tracking-[0.08em]">
              מייסד החברה ומומחה לבנייה פרטית
            </span>
          </p>

          {/* ציטוט עם מירכאות דקורטיביות עדינות */}
          <div className="relative mx-auto w-fit max-w-full px-3 md:px-12">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-1 -top-1 select-none font-serif text-[2.25rem] font-black leading-none text-brand/65 md:right-1 md:-top-3 md:text-[3.75rem]"
            >
              ”
            </span>
            <blockquote className="text-balance text-[1.25rem] font-black leading-[1.45] min-[380px]:text-[1.375rem] md:text-[2rem] lg:text-[2.25rem]">
              <span className="block text-charcoal">
                מאחורי כל פרויקט יש משפחה, חלום והשקעה של שנים.
              </span>
              <span className="block text-deep">
                מבחינתי, זו הרבה יותר מבנייה של בית.
              </span>
            </blockquote>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-5 -left-1 select-none font-serif text-[2.25rem] font-black leading-none text-brand/65 md:-bottom-9 md:left-1 md:text-[3.75rem]"
            >
              “
            </span>
          </div>

        </div>

        {/* במחשב: התמונה מימין והטקסט משמאל */}
        <div className="lg:grid lg:grid-cols-[20rem_minmax(0,1fr)] lg:items-start lg:gap-14 xl:px-12">
          <div className="lg:order-2 lg:pt-6">
            <div className="mb-5 space-y-2 text-[1.125rem] md:space-y-3 md:border-r-2 md:border-brand md:pr-5 font-medium leading-[1.8] text-graphite">
              <p>
                אסף סרויה צמח מתוך עולם הבנייה והביצוע ומביא איתו למעלה
                מ־{YEARS_OF_EXPERIENCE} שנות ניסיון בקבלנות, בניהול ובפיקוח
                פרויקטים.
              </p>
              <p>
                היכולת לראות את התמונה הגדולה מבלי לפספס את הפרטים הקטנים, לצד
                הבנה מעמיקה של תהליכי הבנייה, העלויות והאתגרים בשטח, היא הבסיס
                למעטפת המקצועית שבנה עבור הבונה הפרטי.
              </p>
            </div>
            <Values />
          </div>

          {/* תמונה - רק במחשב */}
          <div className="relative hidden h-[19.5rem] overflow-hidden rounded-xl lg:order-1 lg:block">
            <img
              src={asafImg}
              alt="אסף סרויה"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-[40%_20%]"
            />
          </div>
        </div>

        {!V.bandOutside && <div className="mt-6 md:mt-11">{band}</div>}
      </div>

      {V.bandOutside && <div className="mt-10 md:mt-16">{band}</div>}
    </section>
  );
}
