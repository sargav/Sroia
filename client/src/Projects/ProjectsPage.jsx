import { useNavigate } from "react-router-dom";

import GallerySection from "./Gallery";

import Hero from "./ProjectsHero";
import WhyUs from "./ProjectsWhyUs";
import StepsSection from "./StepsSection";

import projectManagementIcon from "./assets/project-management.webp";
import hardHatIcon from "./assets/hard-hat.webp";
import shieldIcon from "./assets/shield-check.webp";

/*
  פלטת העמוד - מבוססת על ה-Hero (הירוק החזק שהלקוחה אהבה):
  #8FC24B  ירוק חזק - כפתורים, קווים, מילוי
  #9ED164  ירוק חזק בהיר - טקסט ירוק על רקע כהה
  #5E9A1F  ירוק לכותרות גדולות על רקע בהיר (ניגודיות 3:1 לפחות)
  #4A7F14  ירוק לטקסט קטן על רקע בהיר (ניגודיות 4.5:1 לפחות)
  #1F2E18  ירוק-כהה של ה-Hero - רקעים כהים
  #1C2418  טקסט כותרות
  #F4F6F2  רקע בהיר ניטרלי (במקום הקרם)
*/

// אייקונים קטנים - נשארים כמו שהיו
const valueIcons = [
  shieldIcon,             // יושרה ואמינות
  projectManagementIcon,  // יסודיות ושיטתיות
  hardHatIcon,            // מקצוענות ללא פשרות
];

const values = [
  {
    number: "01",
    title: "יושרה ואמינות",
    text: "אמינות ללא פשרות, התנהלות אתית, הימנעות מניגוד עניינים, ניקיון כפיים ועמידה מלאה בהבטחות שלנו.",
  },
  {
    number: "02",
    title: "יסודיות ושיטתיות",
    text: "היערכות מוקדמת ועבודה מסודרת בכל שלבי הפרויקט, תוך השקעה מיוחדת בניהול התכנון כבסיס להצלחתו.",
  },
  {
    number: "03",
    title: "מקצוענות ללא פשרות",
    text: "פיתוח ושימור הידע המקצועי באמצעות למידה מתמדת של שיטות ביצוע, טכנולוגיות ומתודולוגיות חדשות בתחום הבנייה.",
  },
];

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M19 12H5M11 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// תווית קטנה עם קווים דקים משני הצדדים
function Eyebrow({ children, as: Tag = "span", dark = false }) {
  return (
    <div className="flex items-center justify-center gap-4">
      <span className="h-[2px] w-10 bg-[#8FC24B]" />
      <Tag
        className={`text-[0.8125rem] font-black tracking-[0.16em] ${dark ? "text-[#9ED164]" : "text-[#4A7F14]"}`}
      >
        {children}
      </Tag>
      <span className="h-[2px] w-10 bg-[#8FC24B]" />
    </div>
  );
}

export default function ProjectManagement() {
  const navigate = useNavigate();

  return (
    <div dir="rtl" className="overflow-hidden bg-white font-['Assistant',sans-serif] text-[#1C2418]">
      <Hero />
      <WhyUs />

      <div className="bg-white">
        <div className="mt-10 text-center font-['Heebo',sans-serif]">
          <Eyebrow as="h2">ככה זה כשמתחילים נכון</Eyebrow>
        </div>
        <GallerySection status="start" />
      </div>

      <StepsSection />

      {/* הערכים */}
      <section
        dir="rtl"
        className="relative bg-white py-16 font-['Heebo',sans-serif] md:py-20"
      >
        <div className="relative mx-auto max-w-[1100px] px-5 md:px-10">
          <header className="mx-auto mb-12 max-w-[760px] text-center">
            <div className="mb-5">
              <Eyebrow>הדרך שבה אנחנו עובדים</Eyebrow>
            </div>

            <h2 className="text-[2.125rem] font-black leading-[1.2] text-[#1C2418] md:text-[2.75rem]">
              הערכים שמובילים אותנו
              <span className="block text-[#5E9A1F]">בכל פרויקט</span>
            </h2>

            <p className="mx-auto mt-5 max-w-[650px] text-[1.0625rem] font-medium leading-[1.8] text-[#4E5749]">
              כל החלטה שאנחנו מקבלים נשענת על אחריות, תכנון מקצועי ומחויבות
              מלאה לתהליך ולתוצאה.
            </p>
          </header>

          <div className="grid gap-5 md:grid-cols-3">
            {values.map((value, index) => (
              <article
                key={value.title}
                className="
                  group relative flex flex-col
                  rounded-lg border border-[#E2E6DE]
                  border-t-4 border-t-[#8FC24B]
                  bg-white px-7 py-8
                  shadow-[0_6px_20px_rgba(28,36,24,0.06)]
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:shadow-[0_14px_32px_rgba(28,36,24,0.12)]
                "
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-[64px] w-[64px] items-center justify-center rounded-md bg-[#F4F6F2] p-2">
                    <img
                      src={valueIcons[index % valueIcons.length]}
                      alt=""
                      aria-hidden="true"
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <span
                    aria-hidden="true"
                    className="text-[2.5rem] font-black leading-none text-[#8FC24B]"
                  >
                    {value.number}
                  </span>
                </div>

                <h3 className="text-[1.375rem] font-black leading-[1.4] text-[#1C2418]">
                  {value.title}
                </h3>

                <p className="mt-3 text-[0.9688rem] font-medium leading-[1.8] text-[#4E5749]">
                  {value.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-[#F4F6F2] pb-4">
        <div className="pt-10 text-center font-['Heebo',sans-serif]">
          <Eyebrow as="h2">ככה זה נראה כשגומרים נכון</Eyebrow>
        </div>
        <GallerySection status="finish" />
      </div>

      {/* קריאה לפעולה - באותו עיצוב כהה של ה-Hero */}
      <section
        dir="rtl"
        className="relative bg-[#1F2E18] py-16 font-['Heebo',sans-serif] md:py-20"
      >
        <div className="relative mx-auto max-w-[760px] px-5 text-center">
          <div className="mb-5">
            <Eyebrow dark>בואו נדבר</Eyebrow>
          </div>

          <h2 className="text-[2rem] font-black leading-[1.2] text-white md:text-[2.625rem]">
            מוכנים להתחיל
            <span className="block text-[#9ED164]">לבנות נכון?</span>
          </h2>

          <p className="mx-auto mt-5 max-w-[560px] text-[1rem] font-medium leading-[1.8] text-white/75">
            השאירו פרטים ונחזור אליכם בהקדם כדי להבין את הצורך שלכם
            ולהתחיל לתכנן יחד את הפרויקט.
          </p>

          <button
            type="button"
            onClick={() => navigate("/contact")}
            className="
              group mt-9 inline-flex items-center gap-3
              rounded-full bg-[#8FC24B] px-9 py-4
              text-[1rem] font-black text-[#132009]
              shadow-[0_9px_25px_rgba(143,194,75,0.3)]
              transition-all duration-300
              hover:-translate-y-1
              hover:bg-[#9ED164]
              hover:shadow-[0_14px_32px_rgba(143,194,75,0.4)]
            "
          >
            <span>ליצירת קשר</span>
            <span className="transition-transform duration-300 group-hover:-translate-x-1">
              <ArrowIcon />
            </span>
          </button>
        </div>
      </section>
    </div>
  );
}
