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
              aria-label="ניהול ופיקוח פרויקטים בבנייה פרטית – הבית שלכם בידיים מקצועיות."
              className="relative z-10 mb-6 text-[33px] font-black leading-[1.22] text-[#252A22] sm:text-[40px] md:text-[50px]"
            >
              <span className="block">
                <AnimatedText
                  text="ניהול ופיקוח פרויקטים"
                  startDelay={0.25}
                />
              </span>

              <span className="block">
                <AnimatedText
                  text="בבנייה פרטית."
                  startDelay={0.7}
                />
              </span>

              <span className="block text-[#79A942]">
                <AnimatedText
                  text="הבית שלכם בידיים"
                  startDelay={1.15}
                />
              </span>

              <span className="block text-[#79A942]">
                <AnimatedText
                  text="מקצועיות."
                  startDelay={1.55}
                />
              </span>
            </h1>

            {/* תיאור */}
            <p className="relative z-10 mb-8 max-w-[560px] text-[16px] font-medium leading-[1.9] text-[#51594C] md:text-[18px]">
              חברת בוטיק לניהול ופיקוח בנייה, המתמחה בליווי משפחות הבונות את
              ביתן הפרטי. אנו מספקים מעטפת מעשית ומקצועית המבטיחה חיסכון
              כספי ניכר, שמירה על לוחות זמנים ושקט נפשי מוחלט.
            </p>


          </div>


        </div>
      </div>

    </section>
  );
}