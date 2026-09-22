import planningIcon from "./assetes/step-planning.png";
import executionIcon from "./assetes/step-execution.png";
import qualityIcon from "./assetes/step-quality.png";
import deliveryIcon from "./assetes/step-delivery.png";


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

  const values = [
    {
      title: "תכנון מדויק",
      text: "כל החלטה מתקבלת מתוך ראייה מלאה של התקציב, לוחות הזמנים והתוצאה הסופית.",
    },
    {
      title: "שליטה מלאה בשטח",
      text: "תיאום ופיקוח שוטפים שמונעים טעויות, עיכובים והוצאות מיותרות לאורך הדרך.",
    },
    {
      title: "כתובת מקצועית אחת",
      text: "גורם אחד שמרכז את אנשי המקצוע, מנהל את התהליך ומעדכן אתכם בשקיפות.",
    },
  ];
  return (
    <section
      dir="rtl"
      className="relative overflow-hidden bg-gradient-to-b from-[#FBFCF8] via-white to-[#F4F8EF] py-20 font-['Heebo',sans-serif] md:py-28"
    >
      {/* עיטורי רקע */}
      <div className="pointer-events-none absolute -right-40 top-10 h-[430px] w-[430px] rounded-full bg-[#DDEECD]/50 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-48 -left-32 h-[430px] w-[430px] rounded-full bg-[#EAF3DF]/70 blur-3xl" />

      <div className="relative mx-auto max-w-[1450px] px-5 md:px-10 lg:px-14">
        {/* כותרת */}
        <div className="mx-auto mb-10 max-w-[760px] text-center">
          <div className=" flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-gradient-to-l from-[#8BB959] to-transparent" />

            <span className="text-[13px] font-black tracking-[0.18em] text-[#76A93C]">
              מהתוכנית ועד המפתח
            </span>

            <span className="h-px w-12 bg-gradient-to-r from-[#8BB959] to-transparent" />
          </div>

          <h2 className="text-[34px] font-black leading-[1.25] text-[#273122] md:text-[50px]">
            4 השלבים לבית המושלם
          </h2>

          <p className="mx-auto mt-6 max-w-[680px] text-[17px] font-medium leading-8 text-[#61705E] md:text-[18px]">
            תהליך מסודר, שקוף ומתוכנן שמאפשר לכם לדעת בכל רגע איפה
            הפרויקט עומד ומה הצעד הבא.
          </p>
        </div>

        {/* אזור השלבים */}
        <div className="relative">
          {/* קו המחבר בין השלבים */}
          <div className="pointer-events-none absolute left-[8%] right-[8%] top-[54px] hidden lg:block">
            <div className="relative border-t-2 border-dashed border-[#BCD69F]">
              <span className="absolute -top-[5px] left-0 h-2 w-2 rounded-full bg-[#91BC5F]" />

              <span className="absolute -top-[5px] right-0 h-2 w-2 rounded-full bg-[#91BC5F]" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-x-7 gap-y-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
            {steps.map((step, index) => (
              <article
                key={step.number}
                className={`
              group relative z-10
              ${index % 2 === 1 ? "lg:mt-14" : ""}
            `}
              >
                {/* עיגול האייקון */}
                <div className="relative z-20 mx-auto mb-[-44px] flex h-[108px] w-[108px] items-center justify-center rounded-full border-[7px] border-[#F8FAF5] bg-white shadow-[0_12px_32px_rgba(67,93,52,0.14)] transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-105">
                  <div className="absolute inset-[7px] rounded-full border border-dashed border-[#B9D49B]" />

                  <img
                    src={step.icon}
                    alt=""
                    className="relative z-10 h-[76px] w-[76px] object-contain transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3"
                  />


                </div>

                {/* תוכן השלב */}
                <div
                  className="
                relative min-h-[300px] overflow-hidden
                rounded-[36px_12px_36px_12px]
                border border-[#D8E6CB]
                bg-white/90 px-7 pb-8 pt-[68px]
                text-center
                shadow-[0_18px_50px_rgba(54,78,42,0.08)]
                backdrop-blur-sm
                transition-all duration-500
                group-hover:-translate-y-2
                group-hover:border-[#A9CB84]
                group-hover:shadow-[0_28px_65px_rgba(54,78,42,0.15)]
              "
                >
                  {/* מספר גדול ברקע */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-2 -top-5 select-none text-[105px] font-black leading-none text-[#8DBB57]/[0.055] transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2 group-hover:scale-105"
                  >
                    {step.number}
                  </span>

                  {/* פס צדדי */}
                  <div className="absolute bottom-10 right-0 top-24 w-[3px] rounded-l-full bg-gradient-to-b from-[#8DBB57] to-[#C5DDAA]" />

                  <h3 className="relative z-10 text-[22px] font-black leading-[1.4] text-[#293324]">
                    {step.title}
                  </h3>

                  <p className="relative z-10 mt-4 text-[15.5px] font-medium leading-[1.85] text-[#667063]">
                    {step.text}
                  </p>

                  {/* פס תחתון */}
                  <div className="relative z-10 mx-auto mt-7 flex items-center justify-center">
                    <span className="h-[3px] w-10 rounded-full bg-[#91BC5F] transition-all duration-500 group-hover:w-20" />
                  </div>

                  {/* עיגול דקורטיבי */}
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* שורה תחתונה
        <div className="mx-auto mt-10 flex max-w-[850px] items-center gap-5">
          <span className="h-px flex-1 bg-gradient-to-l from-[#BDD5A4] to-transparent" />

          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#B9D49B] bg-white text-[#79A846] shadow-sm">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="m5 12 4 4L19 6" />
            </svg>
          </div>

          <span className="h-px flex-1 bg-gradient-to-r from-[#BDD5A4] to-transparent" />
        </div> */}
      </div>
    </section>

  );
};

export default StepsSection;
