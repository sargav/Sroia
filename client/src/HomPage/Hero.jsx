import { useNavigate } from "react-router-dom";
import heroImg from "./assetes/hero.png";


export default function Hero() {
  const navigate = useNavigate();

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");

    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section
      dir="rtl"
      className="relative isolate flex min-h-[680px] items-center overflow-hidden bg-[#F7F5EF] font-['Heebo',sans-serif] md:min-h-[750px]"
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

        @keyframes hero-stripe-grow {
          from {
            transform: scaleY(0);
            opacity: 0;
          }
          to {
            transform: scaleY(1);
            opacity: 1;
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

        .hero-stripe-grow {
          transform-origin: top;
          opacity: 0;
          animation: hero-stripe-grow 1s ease-out 0.4s forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-image-in,
          .hero-text-focus,
          .hero-btns-in,
          .hero-stripe-grow {
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

      {/* שכבת שמנת שמבהירה את אזור הטקסט */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-gradient-to-l from-[#F8F6EF]/70 via-[#F8F6EF]/85 to-[#F8F6EF]/25" />

      {/* שכבה תחתונה עדינה */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-20 h-[35%] bg-gradient-to-t from-[#F4F0E7]/35 to-transparent" />

      {/* פס ירוק אנכי דק */}
      <div className="hero-stripe-grow pointer-events-none absolute right-6 top-1/2 -z-10 hidden h-[55%] w-[3px] -translate-y-1/2 rounded-full bg-gradient-to-b from-transparent via-[#78A93B]/70 to-transparent md:right-10 lg:block" />

      <div className="relative mx-auto w-full max-w-[1280px] px-6 py-20 md:px-12 lg:px-20">
        <div className="max-w-[640px]">

          {/* אזור הטקסט - שכבה אחת שעוברת מטושטשת לחדה */}
          <div className="hero-text-focus">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-[54px] bg-[#78A93B]" />
              <span className="text-[13px] font-bold uppercase tracking-[0.2em] text-[#628E32]">
                ליווי בנייה פרטית
              </span>
            </div>

            <h1 className="mb-2 text-[42px] font-black leading-[1.12] text-[#252A22] sm:text-[56px] md:text-[70px]">
              <span className="block">בונים בית פרטי?</span>
              <span className="block">נהנים מהדרך.</span>
              <span className="block text-[#79A942]">חוסכים הון.</span>
            </h1>

            <div className="mb-8 mt-6 h-px w-24 bg-gradient-to-l from-[#78A93B]/60 to-transparent" />

            <p className="mb-9 max-w-[540px] text-[16px] font-medium leading-[1.9] text-[#51594C] md:text-[18px]">
              ליווי יד ביד משלב רכישת המגרש ועד קבלת המפתח — ללא חריגות
              תקציב, ללא טעויות יקרות ובסטנדרט הגבוה ביותר.
            </p>
          </div>

          {/* כפתורים */}
          <div className="hero-btns-in flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              onClick={scrollToContact}
              className="
                group flex items-center justify-center gap-4
                rounded-full bg-[#86B84D]
                px-7 py-4 text-[15px] font-bold text-white
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
                rounded-full border border-[#86B84D]/60
                bg-white/55 px-7 py-4
                text-[15px] font-bold text-[#628E32]
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