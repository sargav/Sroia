import { useNavigate } from "react-router-dom";
import heroImg from "./assets/hero.webp";


export default function Hero() {
  const navigate = useNavigate();

  return (
    <section
      dir="rtl"
      className="relative isolate flex min-h-[42.5rem] items-center overflow-hidden bg-[#F7F5EF] font-['Heebo',sans-serif] md:min-h-[42.5rem]"
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
        className="hero-image-in absolute inset-0 -z-30 h-full w-full object-cover"
      />

      {/* שכבת שמנת שמבהירה את אזור הטקסט:
          במובייל על כל הרוחב, ובמסך רחב רק בצד ימין כך שהתמונה נחשפת לכיוון שמאל */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[#F8F6EF]/[0.93] md:hidden" />
      <div
        className="pointer-events-none absolute inset-0 -z-20 hidden md:block"
        style={{
          background:
            "linear-gradient(to left, rgba(248,246,239,0.93) 0%, rgba(248,246,239,0.93) 48%, rgba(248,246,239,0.2) 80%, rgba(248,246,239,0) 100%)",
        }}
      />

      {/* שכבה תחתונה עדינה */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-20 h-[35%] bg-gradient-to-t from-[#F4F0E7]/35 to-transparent" />

      <div className="relative mx-auto w-full max-w-[80rem] px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-[35rem] text-center md:mx-0">

          {/* אזור הטקסט - שכבה אחת שעוברת מטושטשת לחדה */}
          <div className="hero-text-focus">
            {/* תווית עליונה */}
            <div className="mb-5 flex items-center justify-center gap-3">
              <span className="h-[2px] w-14 bg-[#4A7322]" aria-hidden="true" />
              <span className="text-[1.0625rem] font-bold tracking-[0.15em] text-[#3F6B1E]">
                ליווי בנייה פרטית
              </span>
              <span className="h-[2px] w-14 bg-[#4A7322]" aria-hidden="true" />
            </div>

            <h1 className="mb-5 text-[2rem] font-black leading-[1.25] text-[#252A22] sm:text-[2.25rem] md:text-[2.5rem]">
              <span className="block">בונים בית פרטי?</span>
              <span className="block text-[#4A7322]">
                {/* במסך צר נשבר בין שני הצירופים ולא באמצע */}
                <span className="inline-block">בלי חריגות.</span>{" "}
                <span className="inline-block">בלי הפתעות.</span>
              </span>
            </h1>

            <p className="mx-auto mb-7 max-w-[31.25rem] text-[0.9375rem] font-medium leading-[1.8] text-[#3F463A] md:text-[1rem]">
              ליווי יד ביד משלב רכישת המגרש ועד קבלת המפתח
              <br />
              ללא חריגות תקציב, ללא טעויות יקרות ובסטנדרט הגבוה ביותר.
            </p>
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