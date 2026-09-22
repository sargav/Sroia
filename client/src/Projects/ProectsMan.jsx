import { useNavigate } from "react-router-dom";

import heroImage from "./assetes/project-management-hero.png";
import planningIcon from "./assetes/step-planning.png";
import executionIcon from "./assetes/step-execution.png";
import qualityIcon from "./assetes/step-quality.png";
import deliveryIcon from "./assetes/step-delivery.png";
import GallerySection from "./Gallery";

import Hero from "./Hero";
import AboutAsaf from "./AboutAsaf";
import WhyUs from "./WhyUs";
import StepsSection from "./StepsSection";

import projectManagementIcon from "./assetes/project-management.png";
import hardHatIcon from "./assetes/hard-hat.png";
import shieldIcon from "./assetes/shield-check.png";
import asafPortrait from "./assetes/view.png";

// אייקונים קטנים בעיגול - נשארים כמו שהיו
const valueIcons = [
  shieldIcon,             // יושרה ואמינות
  projectManagementIcon,  // יסודיות ושיטתיות
  hardHatIcon,            // מקצוענות ללא פשרות
];

const steps = [
  {
    number: "01",
    icon: planningIcon,
    title: "תכנון וגיבוש תשתית",
    text: "בחירת אדריכל, יועצים ובעלי מקצוע מתאימים, תיאום התכנון, גיבוש תקציב מפורט, לוחות זמנים, קבלת היתרים ועריכת מכרזי קבלנים.",
  },
  {
    number: "02",
    icon: executionIcon,
    title: "ניהול הביצוע והמשאבים",
    text: "תזמון מחושב של עבודות הקבלנים, תיאום בין הגורמים וניהול רציף של כוח האדם, החומרים והמשאבים בשטח.",
  },
  {
    number: "03",
    icon: qualityIcon,
    title: "פיקוח ובקרת איכות",
    text: "נוכחות מקצועית בשטח, בדיקת איכות הביצוע והתאמה לתוכניות, למפרטים ולתקנים בכל שלב בפרויקט.",
  },
  {
    number: "04",
    icon: deliveryIcon,
    title: "מסירה וסיום מושלם",
    text: "בקרה סופית, טיפול בליקויים, ריכוז האישורים ומסירת בית מוכן ומדויק — בהתאם לתכנון, לתקציב ולציפיות.",
  },
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

function MarkIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 13.5 9 18l11-12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M19 12H5M11 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}


export default function ProjectManagement() {
  return (
    <main dir="rtl" className="overflow-hidden bg-[#FAFCF7] font-['Assistant',sans-serif] text-[#213020]">
      <Hero />
      {/* <AboutAsaf /> */}
      <WhyUs />
      <div>
        <div className="text-center mt-6 font-['Heebo',sans-serif]">
          <div className=" flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-gradient-to-l from-[#8EAD70] to-transparent" />

            <h2 className="text-xl font-black tracking-[0.16em] text-[#78965D]">
              ככה זה שבונים נכון
            </h2>

            <span className="h-px w-10 bg-gradient-to-r from-[#8EAD70] to-transparent" />
          </div>

        </div>
        <GallerySection status="start" />
      </div>
      {/* <div className="relative z-10 mx-auto -mt-10 max-w-5xl px-5 md:-mt-12">
        <div className="grid overflow-hidden rounded-[26px] border border-white/70 bg-white/95 shadow-[0_24px_60px_rgba(35,58,28,0.16)] backdrop-blur md:grid-cols-3">
          {["ליווי אישי ושקוף", "שליטה בתקציב ובזמנים", "פיקוח מקצועי בשטח"].map((item, index) => (
            <div key={item} className={`flex items-center justify-center gap-3 px-6 py-5 font-extrabold text-[#30402C] ${index !== 2 ? "border-b border-[#E3ECDD] md:border-b-0 md:border-l" : ""}`}>
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[#EAF4DF] text-[#72A638]"><MarkIcon /></span>
              {item}
            </div>
          ))}
        </div>
      </div>  */}
      <StepsSection />
      <section
        dir="rtl"
        className="relative overflow-hidden bg-[#F7F5EF] py-20 font-['Heebo',sans-serif] md:py-28"
      >
        {/* תמונת רקע עדינה */}
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${asafPortrait})`,
            opacity: 0.55,
          }}
        />

        {/* שכבה נוספת שמבטיחה שהרקע הבסיסי עדיין "מנצח" ושהטקסט קריא */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ backgroundColor: "#F7F5EF", opacity: 0.7 }}
        />

        {/* עיטורי רקע עדינים */}
        {/* <div className="pointer-events-none absolute -right-36 -top-36 h-[420px] w-[420px] rounded-full bg-[#DCEACF]/55 blur-3xl" /> */}

        <div className="pointer-events-none absolute -bottom-44 -left-36 h-[420px] w-[420px] rounded-full bg-[#EDE4D6]/65 blur-3xl" />

        <div className="relative mx-auto max-w-[1250px] px-5 md:px-10 lg:px-16">
          {/* כותרת */}
          <header className="mx-auto mb-16 max-w-[760px] text-center">
            <div className="mb-5 flex items-center justify-center gap-4">
              <span className="h-px w-10 bg-gradient-to-l from-[#8EAD70] to-transparent" />

              <span className="text-[13px] font-black tracking-[0.16em] text-[#78965D]">
                הדרך שבה אנחנו עובדים
              </span>

              <span className="h-px w-10 bg-gradient-to-r from-[#8EAD70] to-transparent" />
            </div>

            <h2 className="text-[34px] font-black leading-[1.25] text-[#31382D] md:text-[48px]">
              הערכים שמובילים אותנו
              <span className="block text-[#7F9F62]">
                בכל פרויקט
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-[650px] text-[17px] font-medium leading-[1.9] text-[#667061]">
              כל החלטה שאנחנו מקבלים נשענת על אחריות, תכנון מקצועי ומחויבות
              מלאה לתהליך ולתוצאה.
            </p>
          </header>

          {/* הערכים */}
          <div className="mx-auto max-w-[1050px]">
            {values.map((value, index) => (
              <article
                key={value.title}
                className={`
            group relative mb-6 overflow-hidden
            rounded-[14px_36px_14px_36px]
            border border-[#D8E1CF]
            bg-white/70 px-6 py-7
            shadow-[0_12px_35px_rgba(68,83,57,0.06)]
            backdrop-blur-md
            transition-all duration-500
            hover:-translate-y-1
            hover:border-[#B4CAA0]
            hover:bg-white/90
            hover:shadow-[0_20px_45px_rgba(68,83,57,0.11)]
            md:px-9 md:py-8
            ${index === 1 ? "md:mr-14 md:ml-[-56px]" : ""}
          `}
              >
                {/* פס צדדי */}
                <div className="absolute bottom-7 right-0 top-7 w-[3px] rounded-l-full bg-[#9AB77E] transition-all duration-500 group-hover:bottom-4 group-hover:top-4" />

                {/* עיטור רקע מופשט - עיגולים חופפים בגוון ירוק */}
                <div
                  aria-hidden="true"
                  className="
                      pointer-events-none absolute -left-10 -top-10 h-[180px] w-[180px]
                      transition-all duration-500
                      group-hover:translate-x-2
                      group-hover:translate-y-1
                      group-hover:scale-105
                  "
                >
                  <div
                    className="absolute h-[140px] w-[140px] rounded-full"
                    style={{ backgroundColor: "#8FAA74", opacity: 0.035, top: 0, left: 0 }}
                  />
                  <div
                    className="absolute h-[90px] w-[90px] rounded-full"
                    style={{ backgroundColor: "#8FAA74", opacity: 0.05, top: 70, left: 70 }}
                  />
                </div>

                <div className="relative z-10 grid items-center gap-6 md:grid-cols-[94px_210px_1fr] md:gap-8">
                  {/* אייקון */}
                  <div
                    className="
        flex h-[82px] w-[82px] items-center justify-center
        rounded-full border border-[#BDCFAC]
        bg-[#F8FAF5]
        p-2
        shadow-[0_7px_20px_rgba(82,105,65,0.08)]
        transition-all duration-500
        group-hover:-rotate-3
        group-hover:scale-105
        group-hover:border-[#9EB887]
        group-hover:bg-white
    "
                  >
                    <img
                      src={valueIcons[index % valueIcons.length]}
                      alt=""
                      aria-hidden="true"
                      className="
            h-full w-full object-contain
            transition-transform duration-500
            group-hover:scale-105
        "
                    />
                  </div>
                  {/* כותרת */}
                  <div>


                    <h3 className="text-[21px] font-black leading-[1.4] text-[#35402F] md:text-[23px]">
                      {value.title}
                    </h3>
                  </div>

                  {/* תיאור */}
                  <p className="max-w-[600px] text-[15.5px] font-medium leading-[1.85] text-[#687163]">
                    {value.text}
                  </p>
                </div>

              </article>
            ))}
          </div>

          {/* משפט סיום */}
          <div className="mx-auto mt-12 flex max-w-[700px] items-center gap-4">
            <span className="h-px flex-1 bg-gradient-to-l from-[#B5C9A1] to-transparent" />

            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#B8CAA7] bg-white/75 text-[#78965D] shadow-sm">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="m5 12 4 4L19 6" />
              </svg>
            </span>

            <span className="h-px flex-1 bg-gradient-to-r from-[#B5C9A1] to-transparent" />
          </div>
        </div>
      </section>
      <div>
        <div className="text-center mt-6 font-['Heebo',sans-serif]">
          <div className=" flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-gradient-to-l from-[#8EAD70] to-transparent" />

            <h2 className="text-xl font-black tracking-[0.16em] text-[#78965D]">
              ככה זה נראה כשגומרים נכון
            </h2>

            <span className="h-px w-10 bg-gradient-to-r from-[#8EAD70] to-transparent" />
          </div>

        </div>
        <GallerySection status="finish" />
      </div>

      <section
        dir="rtl"
        className="relative overflow-hidden bg-[#F7F5EF] py-20 font-['Heebo',sans-serif] md:py-12"
      >
        <div className="pointer-events-none absolute -bottom-40 -left-32 h-[380px] w-[380px] rounded-full bg-[#EDE4D6]/60 blur-3xl" />

        <div className="relative mx-auto max-w-[760px] px-5 text-center">
          <div className="mb-5 flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-gradient-to-l from-[#8EAD70] to-transparent" />

            <span className="text-[13px] font-black tracking-[0.16em] text-[#78965D]">
              בואו נדבר
            </span>

            <span className="h-px w-10 bg-gradient-to-r from-[#8EAD70] to-transparent" />
          </div>

          <h2 className="text-[32px] font-black leading-[1.25] text-[#31382D] md:text-[42px]">
            מוכנים להתחיל
            <span className="block text-[#7F9F62]">לבנות נכון?</span>
          </h2>

          <p className="mx-auto mt-5 max-w-[560px] text-[16px] font-medium leading-[1.9] text-[#667061]">
            השאירו פרטים ונחזור אליכם בהקדם כדי להבין את הצורך שלכם
            ולהתחיל לתכנן יחד את הפרויקט.
          </p>

          <button
            onClick={() => navigate("/contact")}
            className="
              group mt-9 inline-flex items-center gap-3
              rounded-full bg-[#7F9F62] px-9 py-4
              text-[16px] font-black text-white
              shadow-[0_14px_35px_rgba(127,159,98,0.28)]
              transition-all duration-300
              hover:-translate-y-1
              hover:bg-[#6E8C54]
              hover:shadow-[0_18px_42px_rgba(127,159,98,0.36)]
            "
          >
            <span>לעמוד יצירת הקשר</span>
            <span className="transition-transform duration-300 group-hover:-translate-x-1">
              <ArrowIcon />
            </span>
          </button>
        </div>
      </section>


    </main>
  );
}