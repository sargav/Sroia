import { useNavigate } from "react-router-dom";
import heroImg from "./assets/hero.webp";


// שלושת הפתרונות שהחברה מציעה
const SERVICES = [
  "ניהול פרויקט מלא",
  'קורס "בית בשתי ידיים"',
  'אפליקציית "המצפן לבונה"',
];

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section
      dir="rtl"
      className="relative isolate overflow-hidden bg-[#F7F5EF] font-['Heebo',sans-serif] md:flex md:min-h-[42.5rem] md:items-center"
    >
      <style>{`
        @keyframes hero-image-in {
          from {
            opacity: 0;
            transform: scale(1.07);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes hero-text-focus {
          0% {
            opacity: 0;
            filter: blur(14px);
            transform: scale(1.03);
          }
          100% {
            opacity: 1;
            filter: blur(0);
            transform: scale(1);
          }
        }

        @keyframes hero-btns-in {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }


        .hero-image-in {
          animation: hero-image-in 1.6s ease-out forwards;
        }

        .hero-text-focus {
          opacity: 0;
          animation: hero-text-focus 1.3s cubic-bezier(0.22, 1, 0.36, 1) 0.3s forwards;
        }

        .hero-btns-in {
          opacity: 0;
          animation: hero-btns-in 0.6s ease-out 1.5s forwards;
        }


        @media (prefers-reduced-motion: reduce) {
          .hero-image-in,
          .hero-text-focus,
          .hero-btns-in {
            animation: none;
            opacity: 1;
            transform: none;
            filter: none;
          }
        }
      `}</style>

      {/* תמונת רקע */}
      <img
        src={heroImg}
        alt="בית פרטי"
        className="hero-image-in absolute inset-0 -z-30 h-full w-full object-cover object-[30%_center] md:object-center"
      />

      {/* שכבת שמנת שמבהירה את אזור הטקסט:
          במובייל מאחורי הטקסט, ומתחת לכפתורים התמונה נחשפת.
          במסך רחב רק בצד ימין כך שהתמונה נחשפת לכיוון שמאל */}
      <div
        className="pointer-events-none absolute inset-0 -z-20 md:hidden"
        style={{
          background:
            "linear-gradient(to bottom, rgba(248,246,239,0.82) 0%, rgba(248,246,239,0.82) calc(100% - 190px), rgba(248,246,239,0.25) calc(100% - 40px), rgba(248,246,239,0.1) 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 -z-20 hidden md:block"
        style={{
          background:
            "linear-gradient(to left, rgba(248,246,239,0.93) 0%, rgba(248,246,239,0.93) 48%, rgba(248,246,239,0.2) 80%, rgba(248,246,239,0) 100%)",
        }}
      />

      {/* שכבה תחתונה עדינה */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-20 h-[35%] bg-gradient-to-t from-[#F4F0E7]/35 to-transparent" />

      <div className="relative mx-auto w-full max-w-[80rem] px-5 pb-[10.625rem] pt-8 md:px-12 md:py-16 lg:px-20">
        <div className="mx-auto max-w-[36.25rem] text-center md:mx-0">

          {/* אזור הטקסט - שכבה אחת שעוברת מטושטשת לחדה */}
          <div className="hero-text-focus">
            {/* תווית עליונה */}
            <div className="mb-3.5 flex items-center justify-center gap-2 md:mb-5 md:gap-3">
              <span className="h-[2px] w-5 shrink-0 bg-[#2F5216] md:w-14 md:bg-[#4A7322]" aria-hidden="true" />
              <span className="whitespace-nowrap text-[0.9375rem] font-bold tracking-[0.03em] text-[#2F5216] md:text-[1.0625rem] md:tracking-[0.12em] md:text-[#3F6B1E]">
                המעטפת המקצועית לבונה הפרטי
              </span>
              <span className="h-[2px] w-5 shrink-0 bg-[#2F5216] md:w-14 md:bg-[#4A7322]" aria-hidden="true" />
            </div>

            <h1 className="mb-4 text-[1.875rem] font-black leading-[1.25] text-[#252A22] sm:text-[2.25rem] md:mb-5 md:text-[2.5rem]">
              <span className="block">בונים בית פרטי?</span>
              <span className="block text-[#4A7322]">
                {/* במסך צר נשבר בין המילים ולא באמצע צירוף */}
                <span className="inline-block">ידע.</span>{" "}
                <span className="inline-block">שליטה.</span>{" "}
                <span className="inline-block">שקט נפשי.</span>
              </span>
            </h1>

            <p className="mx-auto mb-2.5 max-w-[35rem] md:mb-0 text-balance text-[1rem] font-medium leading-[1.75] text-[#3F463A] md:leading-[1.8]">
              <strong className="font-extrabold text-[#252A22]">
                סרויה ניהול פרויקטים ופיקוח בנייה
              </strong>{" "}
              {/* במחשב שם החברה בשורה נפרדת */}
              <br className="hidden md:block" />
              מלווה אתכם מרכישת המגרש ועד קבלת המפתח.
            </p>
            <p className="mx-auto mb-4 max-w-[35rem] text-balance text-[1rem] font-medium leading-[1.75] text-[#3F463A] md:mb-[1.125rem] md:leading-[1.8]">
              בניהול מקצועי מלא או בבנייה עצמאית, אנחנו מעניקים לכם את הידע
              והכלים לקבל החלטות נכונות, לחסוך טעויות יקרות ולבנות באיכות
              גבוהה.
            </p>

            {/* שלושת השירותים: בנייד עם נקודה לכל פריט, במסך רחב עם נקודות מפרידות */}
            <ul className="mb-[1.375rem] flex flex-wrap justify-center gap-x-3.5 gap-y-1.5 text-[0.875rem] font-bold text-[#2F5216] md:mb-[1.625rem] md:gap-x-2.5 md:text-[#3F6B1E]">
              {SERVICES.map((service, index) => (
                <li key={service} className="inline-flex items-center gap-1.5 whitespace-nowrap md:gap-2.5">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#4A7322] md:hidden" aria-hidden="true" />
                  {index > 0 && (
                    <span className="hidden md:inline" aria-hidden="true">·</span>
                  )}
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* כפתורים */}
          <div className="hero-btns-in flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
            <button
              type="button"
              onClick={() => {
                navigate("/contact");
              }}
              className="
                group flex items-center justify-center gap-4
                rounded-full bg-[#86B84D]
                px-7 py-4 text-[0.9375rem] font-bold text-[#1a1a1a]
                shadow-[0_9px_25px_rgba(121,169,66,0.28)]
                transition-all duration-300
                hover:-translate-y-1 hover:gap-6
                hover:bg-[#78A63F]
                hover:shadow-[0_14px_32px_rgba(121,169,66,0.36)]
              "
            >
              <span>לתיאום פגישת ייעוץ חינם</span>
              <span
                className="transition-transform duration-300 group-hover:-translate-x-1"
                aria-hidden="true"
              >
                ←
              </span>
            </button>

            <button
              type="button"
              onClick={() => navigate("/guid-to-builder")}
              className="
                group flex items-center justify-center gap-4
                rounded-full border border-[#4A7322]
                bg-white/85 px-7 py-4
                text-[0.9375rem] font-bold text-[#3F6B1E]
                backdrop-blur-sm transition-all duration-300
                hover:-translate-y-1 hover:gap-6
                hover:border-[#86B84D]
                hover:bg-[#EFF6E7]
              "
            >
              <span>המדריך החינמי לבונה</span>
              <span
                className="transition-transform duration-300 group-hover:-translate-x-1"
                aria-hidden="true"
              >
                ←
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}