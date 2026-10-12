import planningIcon from "./assets/step-planning.webp";
import executionIcon from "./assets/step-execution.webp";
import qualityIcon from "./assets/step-quality.webp";
import deliveryIcon from "./assets/step-delivery.webp";


const StepsSection = () => {

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

  return (
    <section
      dir="rtl"
      className="relative overflow-hidden bg-[#F4F6F2] py-16 font-['Heebo',sans-serif] md:py-20"
    >
      <div className="relative mx-auto max-w-[1300px] px-5 md:px-10 lg:px-14">
        {/* כותרת */}
        <div className="mx-auto mb-12 max-w-[760px] text-center">
          <div className="mb-5 flex items-center justify-center gap-4">
            <span className="h-[2px] w-10 bg-[#8FC24B]" />

            <span className="text-[0.8125rem] font-black tracking-[0.16em] text-[#4A7F14]">
              מהתוכנית ועד המפתח
            </span>

            <span className="h-[2px] w-10 bg-[#8FC24B]" />
          </div>

          <h2 className="text-[2.125rem] font-black leading-[1.2] text-[#1C2418] md:text-[2.75rem]">
            4 השלבים לבית המושלם
          </h2>

          <p className="mx-auto mt-5 max-w-[680px] text-[1.0625rem] font-medium leading-8 text-[#4E5749] md:text-[1.125rem]">
            תהליך מסודר, שקוף ומתוכנן שמאפשר לכם לדעת בכל רגע איפה
            הפרויקט עומד ומה הצעד הבא.
          </p>
        </div>

        {/* אזור השלבים */}
        <div className="relative">
          {/* קו ציר רציף בין השלבים, כמו בלוח זמנים של פרויקט */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-[27px] hidden h-[2px] bg-[#8FC24B] lg:block"
          />

          <ol className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <li key={step.number} className="group relative z-10 flex flex-col">
                {/* מספר השלב על הציר */}
                <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#8FC24B] text-[1.25rem] font-black text-[#132009] ring-[6px] ring-[#F4F6F2]">
                  {step.number}
                </div>

                {/* תוכן השלב */}
                <div
                  className="
                    relative flex flex-1 flex-col
                    rounded-lg border border-[#E2E6DE]
                    bg-white px-6 py-7
                    shadow-[0_6px_20px_rgba(28,36,24,0.06)]
                    transition-all duration-300
                    group-hover:-translate-y-1
                    group-hover:border-[#8FC24B]
                    group-hover:shadow-[0_14px_32px_rgba(28,36,24,0.12)]
                  "
                >
                  <div className="mb-5 flex items-center gap-4">
                    <img
                      src={step.icon}
                      alt=""
                      className="h-14 w-14 flex-shrink-0 object-contain"
                    />
                    <h3 className="text-[1.25rem] font-black leading-[1.35] text-[#1C2418]">
                      {step.title}
                    </h3>
                  </div>

                  <p className="text-[0.9688rem] font-medium leading-[1.8] text-[#4E5749]">
                    {step.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
