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
          <ol className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <li
                key={step.number}
                className={`group relative z-10 flex flex-col ${index % 2 === 1 ? "lg:mt-14" : ""}`}
              >
                {/* מספר השלב על הציר */}
                <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#8FC24B] text-[1.25rem] font-black text-[#132009] ring-[6px] ring-[#F4F6F2] transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-110">
                  {step.number}
                </div>

                {/* תוכן השלב */}
                <div
                  className="
                    relative flex flex-1 flex-col overflow-hidden
                    rounded-lg border border-[#E2E6DE]
                    bg-white px-6 pb-6 pt-8
                    shadow-[0_6px_20px_rgba(28,36,24,0.06)]
                    transition-all duration-500
                    group-hover:-translate-y-2
                    group-hover:border-[#8FC24B]
                    group-hover:shadow-[0_18px_40px_rgba(28,36,24,0.14)]
                  "
                >
                  {/* פס ירוק עליון שמתמלא במעבר עכבר */}
                  <span
                    aria-hidden="true"
                    className="absolute right-0 top-0 h-1 w-1/3 bg-[#8FC24B] transition-all duration-500 group-hover:w-full"
                  />

                  {/* רשת שרטוט עדינה בפינה, כמו נייר תוכניות */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-0 top-0 h-28 w-28 opacity-60"
                    style={{
                      backgroundImage:
                        "linear-gradient(#E3EBD9 1px, transparent 1px), linear-gradient(90deg, #E3EBD9 1px, transparent 1px)",
                      backgroundSize: "14px 14px",
                      WebkitMaskImage: "linear-gradient(to bottom right, black, transparent 75%)",
                      maskImage: "linear-gradient(to bottom right, black, transparent 75%)",
                    }}
                  />

                  <div className="relative mb-4 flex items-center gap-4">
                    <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-md border border-[#E2E6DE] bg-[#F4F6F2] transition-colors duration-500 group-hover:border-[#8FC24B] group-hover:bg-[#EEF6E3]">
                      <img
                        src={step.icon}
                        alt=""
                        className="h-12 w-12 object-contain transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3"
                      />
                    </div>
                    <div>
                      <span className="mb-1 block text-[0.75rem] font-black tracking-[0.14em] text-[#4A7F14]">
                        שלב {step.number}
                      </span>
                      <h3 className="text-[1.25rem] font-black leading-[1.3] text-[#1C2418]">
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  {/* קו הפרדה */}
                  <span aria-hidden="true" className="relative mb-4 block h-px w-full bg-[#E2E6DE]" />

                  <p className="relative text-[0.9688rem] font-medium leading-[1.8] text-[#4E5749]">
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
