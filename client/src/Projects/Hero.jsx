import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import heroImg from "./assetes/hero.png";

function AnimatedText({
  text,
  startDelay = 0,
  letterDelay = 0.03,
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
            animation: "hero-letter-in 0.55s ease-out forwards",
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
      className="relative overflow-hidden bg-[#1F2E18] font-['Heebo',sans-serif] md:h-[680px]"
    >
      <style>{`
        @keyframes hero-letter-in {
          0% {
            opacity: 0;
            filter: blur(4px);
            transform: translateY(16px);
          }
          65% {
            opacity: 1;
            filter: blur(0);
            transform: translateY(-2px);
          }
          100% {
            opacity: 1;
            filter: blur(0);
            transform: translateY(0);
          }
        }

        @keyframes hero-tag-in {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes hero-rest-in {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes hero-image-fade {
          from { opacity: 0; }
          to { opacity: 1; }
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

        .hero-tag-in {
          opacity: 0;
          animation: hero-tag-in 0.5s ease-out 0.1s forwards;
        }

        .hero-line-open {
          width: 0;
          opacity: 0;
          animation: hero-line-open 0.5s ease-out 0.2s forwards;
        }

        .hero-rest-in {
          opacity: 0;
          animation: hero-rest-in 0.6s ease-out 1.8s forwards;
        }

        .hero-image-fade {
          opacity: 0;
          animation: hero-image-fade 0.9s ease-out forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-tag-in,
          .hero-rest-in,
          .hero-image-fade {
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

      <div className="grid h-full grid-cols-1 md:grid-cols-[1fr_0.95fr]">
        {/* פאנל טקסט - ירוק כהה מלא */}
        <div className="order-2 relative flex items-center overflow-hidden px-6 py-16 md:order-1 md:px-12 md:py-0 lg:px-16">
          {/* עיטור רקע עדין */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#3A5A28]/50 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-[#3A5A28]/40 blur-3xl" />

          <div className="relative max-w-[560px]">
            {/* תווית עליונה */}
            <div className="hero-tag-in mb-5 flex items-center gap-3">
              <span className="hero-line-open h-px bg-[#8FC24B]" />
              <span className="text-[13px] font-bold uppercase tracking-[0.2em] text-[#9ED164]">
                בוטיק לניהול בנייה
              </span>
            </div>

            {/* כותרת - נכתבת אות-אות */}
            <h1
              aria-label="ניהול ופיקוח פרויקטים בבנייה פרטית. הבית שלכם בידיים מקצועיות."
              className="mb-5 text-[28px] font-black leading-[1.25] text-white sm:text-[34px] md:text-[38px]"
            >
              <span className="block">
                <AnimatedText text="ניהול ופיקוח פרויקטים" startDelay={0.3} />
              </span>
              <span className="block">
                <AnimatedText text="בבנייה פרטית." startDelay={0.9} />
              </span>
              <span className="block text-[#9ED164]">
                <AnimatedText text="הבית שלכם בידיים" startDelay={1.25} />
              </span>
              <span className="block text-[#9ED164]">
                <AnimatedText text="מקצועיות." startDelay={1.6} />
              </span>
            </h1>

            {/* תיאור + כפתור - נכנסים יחד, אחרי שהכותרת מסיימת להיכתב */}
            <div className="hero-rest-in">
              <p className="mb-7 max-w-[500px] text-[15px] font-medium leading-[1.8] text-white/70 md:text-[16px]">
                חברת בוטיק לניהול ופיקוח בנייה, המתמחה בליווי משפחות הבונות
                את ביתן הפרטי. אנו מספקים מעטפת מעשית ומקצועית המבטיחה
                חיסכון כספי ניכר, שמירה על לוחות זמנים ושקט נפשי מוחלט.
              </p>

              <button
                type="button"
                onClick={scrollToContact}
                className="
                  group flex items-center justify-center gap-4
                  rounded-full bg-[#8FC24B]
                  px-7 py-4 text-[15px] font-bold text-[#132009]
                  shadow-[0_9px_25px_rgba(143,194,75,0.3)]
                  transition-all duration-300
                  hover:-translate-y-1 hover:gap-6
                  hover:bg-[#9ED164]
                  hover:shadow-[0_14px_32px_rgba(143,194,75,0.4)]
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
            </div>
          </div>
        </div>

        {/* פאנל תמונה */}
        <div className="hero-image-fade order-1 relative h-[320px] overflow-hidden md:order-2 md:h-full">
          <img
            src={heroImg}
            alt="בית פרטי"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* גוון עדין על התמונה, לשמירה על התאמה לפלטה */}
          <div className="pointer-events-none absolute inset-0 bg-[#1F2E18]/10" />
          {/* מעבר רך בין הפאנלים במסכים גדולים */}
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-24 bg-gradient-to-l from-[#1F2E18] to-transparent md:block" />
        </div>
      </div>
    </section>
  );
}