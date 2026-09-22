import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import heroImg from "./assetes/hero.png";


function AnimatedText({
  text,
  startDelay = 0,
  letterDelay = 0.035,
}) {
  const letters = useMemo(() => Array.from(text), [text]);

  return (
    <>
      {letters.map((char, index) => (
        <span
          key={`${char}-${index}`}
          aria-hidden="true"
          className="inline-block opacity-0"
          style={{
            animation: "hero-letter-in 0.65s ease-out forwards",
            animationDelay: `${startDelay + index * letterDelay}s`,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </>
  );
}

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
        @keyframes hero-letter-in {
          0% {
            opacity: 0;
            filter: blur(4px);
            transform: translateY(22px);
          }

          65% {
            opacity: 1;
            filter: blur(0);
            transform: translateY(-3px);
          }

          100% {
            opacity: 1;
            filter: blur(0);
            transform: translateY(0);
          }
        }

        @keyframes hero-content-in {
          from {
            opacity: 0;
            transform: translateX(35px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

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

        @keyframes hero-badge-float {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-7px);
          }
        }

        @keyframes hero-line-open {
          from {
            width: 0;
            opacity: 0;
          }

          to {
            width: 54px;
            opacity: 1;
          }
        }

        @keyframes hero-scroll-arrow {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(5px);
          }
        }

        .hero-content-in {
          opacity: 0;
          animation: hero-content-in 0.9s ease-out 0.15s forwards;
        }

        .hero-image-in {
          animation: hero-image-in 1.8s ease-out forwards;
        }

        .hero-badge-float {
          animation: hero-badge-float 3.2s ease-in-out infinite;
        }

        .hero-line-open {
          width: 0;
          opacity: 0;
          animation: hero-line-open 0.7s ease-out 1.7s forwards;
        }

        .hero-scroll-arrow {
          animation: hero-scroll-arrow 1.8s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-content-in,
          .hero-image-in,
          .hero-badge-float,
          .hero-scroll-arrow {
            animation: none;
            opacity: 1;
            transform: none;
          }

          .hero-line-open {
            width: 54px;
            opacity: 1;
            animation: none;
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
      <div className="pointer-events-none absolute inset-0 -z-20 bg-gradient-to-l from-[#F8F6EF]/55 via-[#F8F6EF]/80 to-[#F8F6EF]/20" />

      {/* שכבה תחתונה עדינה */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-20 h-[35%] bg-gradient-to-t from-[#F4F0E7]/30 to-transparent" />

      {/* כתם ירוק בהיר */}
      {/* <div className="pointer-events-none absolute -right-32 -top-32 -z-10 h-[430px] w-[430px] rounded-full bg-[#A8CF78]/20 blur-3xl" /> */}

      <div className="relative mx-auto w-full max-w-[1280px] px-6 py-20 md:px-12 lg:px-20">
        <div className="hero-content-in relative max-w-[720px]">
          {/* תווית עליונה */}
          <div className="mb-5 flex items-center gap-3">

           
          </div>

          {/* אזור התוכן */}
          <div
            className="
              relative overflow-hidden
              rounded-[18px_55px_18px_55px]
              border border-white/10
              bg-white/10
              px-4 py-9
              shadow-[0_24px_65px_rgba(68,83,54,0.15)]
              backdrop-blur-md
              sm:px-9 sm:py-11
              md:px-12 md:py-12
            "
          >
            {/* פס ירוק עליון */}
            <div className="absolute right-0 top-0 h-[5px] w-32 rounded-bl-full bg-gradient-to-l from-[#86B84D] to-[#B7D98D]" />

            {/* עיגול רקע */}
            {/* <div className="pointer-events-none absolute -bottom-28 -left-24 h-72 w-72 rounded-full border-[52px] border-[#A8CF78]/10" /> */}

            {/* כותרת */}
            <h1
              aria-label="בונים בית פרטי? נהנים מהדרך. חוסכים הון."
              className="relative z-10 mb-6 text-[39px] font-black leading-[1.18] text-[#252A22] sm:text-[48px] md:text-[61px]"
            >
              <span className="block">
                <AnimatedText
                  text="בונים בית פרטי?"
                  startDelay={0.25}
                />
              </span>

              <span className="block">
                <AnimatedText
                  text="נהנים מהדרך."
                  startDelay={0.7}
                />
              </span>

              <span className="block text-[#79A942]">
                <AnimatedText
                  text="חוסכים הון."
                  startDelay={1.15}
                />
              </span>
            </h1>

            {/* תיאור */}
            <p className="relative z-10 mb-8 max-w-[560px] text-[16px] font-medium leading-[1.9] text-[#51594C] md:text-[18px]">
              ליווי יד ביד משלב רכישת המגרש ועד קבלת המפתח — ללא חריגות
              תקציב, ללא טעויות יקרות ובסטנדרט הגבוה ביותר.
            </p>

            {/* כפתורים */}
            <div className="relative z-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
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

          {/* תווית מרחפת */}
          {/* <div
            className="
              hero-badge-float absolute -bottom-9 left-7 z-20
              hidden items-center gap-3 rounded-full
              border border-white bg-white/90
              px-5 py-3
              shadow-[0_10px_28px_rgba(52,68,43,0.14)]
              backdrop-blur-md sm:flex
            "
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E5F1D7] text-[#79A942]">
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

            <span className="text-[13px] font-bold text-[#434B3E]">
              ליווי אישי לאורך כל הדרך
            </span>
          </div> */}
        </div>
      </div>

      {/* מעבר לחלק הבא */}
      {/* <button
        type="button"
        onClick={() =>
          window.scrollBy({
            top: window.innerHeight * 0.8,
            behavior: "smooth",
          })
        }
        aria-label="מעבר לחלק הבא"
        className="
          hero-scroll-arrow absolute bottom-6 left-1/2
          flex h-11 w-11 -translate-x-1/2
          items-center justify-center rounded-full
          border border-white/80 bg-white/65
          text-[#6F9F39]
          shadow-[0_7px_20px_rgba(55,70,44,0.12)]
          backdrop-blur-md transition-colors duration-300
          hover:bg-white
        "
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button> */}
    </section>
  );
}