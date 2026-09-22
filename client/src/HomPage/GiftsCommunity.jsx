import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "./assetes/v000.png";

export default function GiftsCommunity() {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(section);
        }
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="gifts"
      dir="rtl"
      className="relative overflow-hidden py-16 font-['Heebo',sans-serif] md:py-24"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      {/* שכבה שמאפשרת לטקסט לבלוט */}
      <div className="pointer-events-none absolute inset-0 bg-[#F8F7F1]/75" />

      {/* אור עדין ברקע */}
      <div className="pointer-events-none absolute -right-32 top-0 h-80 w-80 rounded-full bg-white/70 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-32 left-0 h-80 w-80 rounded-full bg-[#DCEACD]/50 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-[1100px] px-6">
        {/* כותרת */}
        <header
          className={`mx-auto mb-16 max-w-[680px] text-center transition-all duration-1000 ${isVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-6 opacity-0"
            }`}
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#659B2D]/70" />

            <span className="text-[13px] font-semibold text-[#659B2D]">
              תוכן מקצועי ללא עלות
            </span>

            <span className="h-px w-8 bg-[#659B2D]/70" />
          </div>

          <h2 className="text-[31px] font-bold leading-[1.3] text-[#20281D] md:text-[42px]">
            מתנות וכלים לבנייה נכונה
          </h2>

          <p className="mx-auto mt-4 max-w-[580px] text-[16px] font-medium leading-[1.85] text-[#4F594A]">
            מידע מקצועי וכלים שיעזרו לכם להתנהל בצורה מסודרת לאורך
            תהליך הבנייה.
          </p>
        </header>

        {/* המסלול */}
        <div className="relative mx-auto max-w-[980px]">
          {/* המסלול המעוגל – מחשב */}
          <svg
            aria-hidden="true"
            viewBox="0 0 900 540"
            preserveAspectRatio="none"
            className={`pointer-events-none absolute inset-0 hidden h-full w-full transition-opacity delay-500 duration-1000 md:block ${isVisible ? "opacity-100" : "opacity-0"
              }`}
          >
            <path
              d="M450 15 C450 115 640 110 640 220 C640 325 260 220 260 355 C260 450 450 430 450 525"
              fill="none"
              stroke="rgba(101,155,45,0.22)"
              strokeWidth="2"
              strokeDasharray="7 9"
            />

            <path
              d="M450 15 C450 115 640 110 640 220"
              fill="none"
              stroke="rgba(101,155,45,0.7)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>

          {/* מסלול מובייל */}
          <div className="absolute bottom-12 right-[25px] top-12 w-px border-r border-dashed border-[#659B2D]/35 md:hidden" />

          {/* פריט ראשון */}
          <div className="relative mb-14 grid items-center md:min-h-[230px] md:grid-cols-[1fr_115px_1fr]">
            {/* אזור תוכן */}
            <div
              className={`order-2 pr-16 transition-all duration-1000 md:order-1 md:pr-0 ${isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-10 opacity-0"
                }`}
              style={{ transitionDelay: "250ms" }}
            >
              <div
                className="
                  group relative overflow-hidden
                  rounded-[38px_10px_38px_10px]
                  border border-white 
                  bg-white/20
                  px-7 py-7
                  shadow-[0_15px_45px_rgba(44,61,35,0.11)]
                  backdrop-blur-md
                  transition-all duration-500
                  hover:-translate-y-2
                  hover:shadow-[0_22px_55px_rgba(44,61,35,0.17)]
                "
              >
                {/* פס צדדי */}
                <div className="absolute bottom-7 right-0 top-7 w-[3px] rounded-l-full bg-[#659B2D]/85 " />

                {/* רקע מספר */}
                {/* <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-2 -top-5 text-[105px] font-black leading-none text-[#659B2D]/[0.055]"
                >
                  01
                </span> */}

                <h3 className="mb-3 text-[25px] font-bold leading-[1.4] text-[#20281D]">
                  המדריך המלא לבונה
                </h3>

                <p className="mb-6 text-[15.5px] font-medium leading-[1.85] text-[#535D4F]">
                  מידע חשוב, בדיקות מקדימות וכלים שיעזרו לכם להתחיל את
                  תהליך הבנייה בצורה מסודרת.
                </p>

                <button
                  type="button"
                  onClick={() => navigate("/guid-to-cuilder")}
                  className="
                    group/button inline-flex items-center gap-4
                    rounded-full bg-[#659B2D]
                    px-6 py-3 text-[14px] font-semibold text-white
                    shadow-[0_8px_20px_rgba(101,155,45,0.22)]
                    transition-all duration-300
                    hover:gap-6
                    hover:shadow-[0_11px_26px_rgba(101,155,45,0.3)]
                  "
                >
                  <span>לקבלת המדריך בחינם</span>

                  <span
                    className="transition-transform duration-300 group-hover/button:-translate-x-1"
                    aria-hidden="true"
                  >
                    ←
                  </span>
                </button>
              </div>
            </div>

            {/* תחנה עגולה */}
            <div
              className={`absolute right-0 top-8 z-20 transition-all duration-700 md:static md:order-2 md:flex md:justify-center ${isVisible
                ? "scale-100 opacity-100"
                : "scale-50 opacity-0"
                }`}
              style={{ transitionDelay: "500ms" }}
            >
              <div className="group/icon relative flex h-[52px] w-[52px] items-center justify-center rounded-full border-[5px] border-[#F8F7F1] bg-[#659B2D]/85 text-white shadow-[0_6px_18px_rgba(101,155,45,0.28)] md:h-[72px] md:w-[72px]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 transition-transform duration-500 group-hover/icon:-rotate-6 group-hover/icon:scale-110 md:h-8 md:w-8"
                  aria-hidden="true"
                >
                  <path d="M6 3h9l3 3v15H6z" />
                  <path d="M15 3v4h4" />
                  <path d="M9 12h6" />
                  <path d="M9 16h6" />
                </svg>

                <span className="absolute -left-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[9px] font-bold text-[#659B2D] shadow">
                  1
                </span>
              </div>
            </div>

            {/* טקסט קטן בצד השני */}
            <div
              className={`order-3 hidden pr-8 transition-all duration-1000 md:block ${isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-8 opacity-0"
                }`}
              style={{ transitionDelay: "650ms" }}
            >
              <p className="max-w-[210px] text-[13px] font-medium leading-[1.7] text-[#596153]">
                מתחילים עם בסיס ברור ומסודר לפני קבלת החלטות.
              </p>
            </div>
          </div>

          {/* פריט שני */}
          <div className="relative grid items-center md:min-h-[230px] md:grid-cols-[1fr_115px_1fr]">
            {/* טקסט קטן בצד הראשון */}
            <div
              className={`order-3 hidden pl-8 text-left transition-all duration-1000 md:order-1 md:block ${isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-8 opacity-0"
                }`}
              style={{ transitionDelay: "850ms" }}
            >
              <p className="mr-auto max-w-[210px] text-right text-[13px] font-medium leading-[1.7] text-[#596153]">
                ממשיכים עם מידע שימושי ומענה לאורך הדרך.
              </p>
            </div>

            {/* תחנה עגולה */}
            <div
              className={`absolute right-0 top-8 z-20 transition-all duration-700 md:static md:order-2 md:flex md:justify-center ${isVisible
                ? "scale-100 opacity-100"
                : "scale-50 opacity-0"
                }`}
              style={{ transitionDelay: "900ms" }}
            >
              <div className="group/icon relative flex h-[52px] w-[52px] items-center justify-center rounded-full border-[5px] border-[#F8F7F1] bg-[#293126] text-[#A5D76D] shadow-[0_6px_18px_rgba(38,49,31,0.25)] md:h-[72px] md:w-[72px]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 transition-transform duration-500 group-hover/icon:rotate-6 group-hover/icon:scale-110 md:h-8 md:w-8"
                  aria-hidden="true"
                >
                  <path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4.1A8 8 0 1 1 20 11.5Z" />
                  <path d="M9 8.5c.4 2.7 2.2 4.5 4.9 5" />
                  <path d="m9 8.5.8 1.2" />
                  <path d="m13.9 13.5 1.2-.8" />
                </svg>

                <span className="absolute -left-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#8BC34A] text-[9px] font-bold text-[#24301E] shadow">
                  2
                </span>
              </div>
            </div>

            {/* אזור תוכן */}
            <div
              className={`order-2 pr-16 transition-all duration-1000 md:order-3 md:pr-0 ${isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0"
                }`}
              style={{ transitionDelay: "700ms" }}
            >
              <div
                className="
                  group relative overflow-hidden
                  rounded-[10px_38px_10px_38px]
                  border border-white/80 
                  bg-[#293126]/35
                  px-7 py-7
                  shadow-[0_15px_45px_rgba(31,41,27,0.18)]
                  backdrop-blur-md
                  transition-all duration-500
                  hover:-translate-y-2
                  hover:shadow-[0_22px_55px_rgba(31,41,27,0.26)]
                "
              >
                {/* פס צדדי */}
                <div className="absolute bottom-7 right-0 top-7 w-[3px] rounded-l-full bg-[#8BC34A]/85 " />

                {/* מספר ברקע */}
                {/* <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-2 -top-5 text-[105px] font-black leading-none text-white/[0.04]"
                >
                  02
                </span> */}

                <h3 className="mb-3 text-[25px] font-bold leading-[1.4] text-white">
                  קבוצת הוואטסאפ
                </h3>

                <p className="mb-6 text-[15.5px] font-medium leading-[1.85] text-white/80">
                  פעם בשבוע הקבוצה נפתחת לשאלות ותשובות, לצד מידע
                  מקצועי וכלים שימושיים לתהליך הבנייה.
                </p>

                <a
                  href="https://chat.whatsapp.com/GGZb8N0x1941Hy1e2rCCtf?s=sh&p=a&ilr=1"
                  target="_blank"
                  rel="noreferrer"
                  className="
                    group/button inline-flex items-center gap-4
                    rounded-full bg-[#8BC34A]
                    px-6 py-3 text-[14px] font-semibold text-[#24301E]
                    shadow-[0_8px_20px_rgba(139,195,74,0.18)]
                    transition-all duration-300
                    hover:gap-6
                    hover:shadow-[0_11px_26px_rgba(139,195,74,0.25)]
                  "
                >
                  <span>הצטרפו לקבוצה בחינם</span>

                  <span
                    className="transition-transform duration-300 group-hover/button:-translate-x-1"
                    aria-hidden="true"
                  >
                    ←
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}