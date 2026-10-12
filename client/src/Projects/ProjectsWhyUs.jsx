import { useEffect, useRef, useState } from "react";
import AnimatedIcon from "../components/IconsAnimations";
import bgImage from "./assets/newView2.webp";

export default function WhyUs() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const mainTitle = "למה זה משנה לכם?";

  const advantages = [
    {
      number: "01",
      icon: "commitment",
      title: "100% מחויבות ואכפתיות",
      text: "יחס אישי, זמינות מלאה ושקיפות לאורך כל התהליך.",
    },
    {
      number: "02",
      icon: "experience",
      title: "מקצועיות וניסיון בשטח",
      text: "עבודה מול טובי היועצים והמומחים המובילים בענף הבנייה.",
    },
    {
      number: "03",
      icon: "budget",
      title: "שליטה תקציבית מוחלטת",
      text: "מניעת חריגות ועלויות בלתי צפויות מראש.",
    },
  ];

  useEffect(() => {
    const currentSection = sectionRef.current;

    if (!currentSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          // האנימציה הראשית תפעל פעם אחת בלבד
          observer.unobserve(currentSection);
        }
      },
      {
        threshold: 0.25,
      }
    );

    observer.observe(currentSection);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-us"
      dir="rtl"
      className="relative overflow-hidden bg-white py-16 font-['Heebo',sans-serif] md:py-20"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* שכבה לבנה מעל התמונה - בלי טשטוש וזוהר, כדי שייראה נקי ומקצועי */}
      <div className="pointer-events-none absolute inset-0 bg-white/85" />

      <div className="relative z-10 mx-auto max-w-[1180px] px-6">
        {/* אזור הכותרת */}
        <div className="mx-auto mb-12 max-w-[850px] text-center md:mb-16">
          <h2
            aria-label={mainTitle}
            className="text-[2rem] font-bold leading-tight text-[#1C2418] md:text-[2.75rem]"
          >
            {Array.from(mainTitle).map((letter, index) => (
              <span
                key={`${letter}-${index}`}
                aria-hidden="true"
                className={
                  isVisible
                    ? "why-main-letter-visible"
                    : "why-main-letter-hidden"
                }
                style={{
                  animationDelay: `${index * 65}ms`,
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))}
          </h2>

          <div
            className={`mx-auto my-5 h-[3px] bg-[#8FC24B] ${isVisible ? "why-line-visible" : "why-line-hidden"
              }`}
          />

          <p
            className={`text-[1.0625rem] font-normal leading-[1.9] text-[#2E3629] md:text-[1.125rem] ${isVisible
              ? "why-description-visible"
              : "why-description-hidden"
              }`}
          >
            תהליך בנייה פרטית עלול להיות מורכב, מבלבל ועמוס בטעויות
            שפוגשות אתכם בכיס. בזכות הליווי והפיקוח הצמוד שלנו, אתם
            חוסכים זמן, כסף, עוגמת נפש וכאבי ראש — ומקבלים בית בסטנדרט
            הבנייה הגבוה ביותר, ללא פשרות בדרך.
          </p>
        </div>

        {/* כרטיסי היתרונות */}
        <div className="why-cards-grid grid grid-cols-1 gap-5 md:grid-cols-3">
          {advantages.map((item, index) => (
            <article
              key={item.number}
              style={{
                animationDelay: isVisible
                  ? `${950 + index * 180}ms`
                  : "0ms",
              }}
              className={`why-card group relative overflow-hidden rounded-lg border border-[#E2E6DE] border-t-4 border-t-[#8FC24B] bg-white p-7 shadow-[0_6px_20px_rgba(28,36,24,0.06)] md:p-8 ${isVisible ? "why-card-visible" : "why-card-hidden"
                }`}
            >
              {/* שכבה עדינה בתוך הכרטיס */}
              <div
                aria-hidden="true"
                className="why-card-overlay pointer-events-none absolute inset-0"
              />

              {/* מספר גדול ברקע */}
              <span
                aria-hidden="true"
                className="why-card-number pointer-events-none absolute -left-2 -top-5 select-none text-[5.75rem] font-black leading-none text-[#8FC24B]/[0.12]"
              >
                {item.number}
              </span>

              {/* אייקון */}
              <div className="why-card-icon relative z-10 mb-6">
                <AnimatedIcon type={item.icon} size={72} />
              </div>

              {/* הכותרת נכתבת מחדש במעבר */}
              <h3
                aria-label={item.title}
                className="why-card-title relative z-10 mb-3 text-[1.3125rem] font-black leading-[1.45] text-[#1C2418]"
              >
                <span className="why-title-original">
                  <bdi>{item.title}</bdi>
                </span>

                <span aria-hidden="true" className="why-title-rewrite">
                  <bdi>{item.title}</bdi>
                </span>
              </h3>

              <p className="relative z-10 text-[1rem] font-normal leading-[1.85] text-[#4E5749]">
                {item.text}
              </p>

              <div className="why-card-line relative z-10 mt-7 h-[3px] w-10 bg-[#8FC24B]" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}