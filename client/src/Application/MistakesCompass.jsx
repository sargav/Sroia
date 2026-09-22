import { useState } from "react";
import { ArrowLeft, ArrowRight, Compass } from "lucide-react";
import Reveal from "../components/Reveal";

const RADIUS = 40; // רדיוס הטבעת, באחוזים מהמסגרת

export default function MistakesCompass({ mistakes }) {
  const [active, setActive] = useState(0);
  const n = mistakes.length;

  // מיקום כל תחנה על הטבעת, עם כיוון השעון החל מהראש
  const points = mistakes.map((_, i) => {
    const angle = -90 + (i * 360) / n;
    const rad = (angle * Math.PI) / 180;
    return {
      angle,
      left: 50 + RADIUS * Math.cos(rad),
      top: 50 + RADIUS * Math.sin(rad),
    };
  });

  const [title, text] = mistakes[active];
  const num = String(active + 1).padStart(2, "0");
  const next = () => setActive((a) => (a + 1) % n);
  const prev = () => setActive((a) => (a - 1 + n) % n);

  return (
    <section className="relative overflow-hidden bg-[#F5F6F1] px-5 py-14 text-[#2D382B] md:px-10 md:py-20">
      {/* עיטורי רקע */}
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[#EDE6DB]/70 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        {/* כותרת */}
        <Reveal>
          <header className="mx-auto mb-10 max-w-3xl text-center md:mb-12">
            <div className="flex items-center justify-center gap-4">
              <span className="h-px w-10 bg-gradient-to-l from-[#8EAD70] to-transparent" />

              <span className="text-xs font-black tracking-[0.18em] text-[#78965D]">
                לפני שממשיכים
              </span>

              <span className="h-px w-10 bg-gradient-to-r from-[#8EAD70] to-transparent" />
            </div>

            <h2 className="mt-5 text-4xl font-black leading-[1.2] md:text-5xl">
              שבע הטעויות הנפוצות
              <span className="mt-2 block text-[#759855]">של בונים פרטים</span>
            </h2>
          </header>
        </Reveal>

        <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2 md:gap-14">
          {/* המצפן: שבע תחנות על טבעת, והמחט מצביעה על התחנה הפעילה */}
          <Reveal>
            <div className="relative mx-auto aspect-square w-full max-w-[300px] sm:max-w-[380px] md:max-w-[440px]">
              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
                <circle cx="50" cy="50" r={RADIUS} fill="none" stroke="#D3DECC" strokeWidth="0.6" strokeDasharray="1.2 1.6" />
                <circle
                  cx="50"
                  cy="50"
                  r={RADIUS}
                  fill="none"
                  stroke="#91AF76"
                  strokeWidth="1"
                  strokeLinecap="round"
                  pathLength="100"
                  strokeDasharray={`${(active / n) * 100} 100`}
                  transform="rotate(-90 50 50)"
                  className="transition-all duration-500"
                />
              </svg>

              {/* מרכז המצפן */}
              <div className="absolute left-1/2 top-1/2 grid h-[44%] w-[44%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[#D3DECC] bg-white/85 shadow-[0_12px_35px_rgba(65,83,56,.08)] backdrop-blur-sm">
                <Compass
                  className="h-[58%] w-[58%] text-[#7D9F60] transition-transform duration-500"
                  strokeWidth={1.2}
                  style={{ transform: `rotate(${points[active].angle + 45}deg)` }}
                  aria-hidden="true"
                />
              </div>

              {/* התחנות */}
              {mistakes.map(([label], i) => {
                const isActive = i === active;
                const passed = i < active;
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={label}
                    aria-pressed={isActive}
                    style={{ left: `${points[i].left}%`, top: `${points[i].top}%` }}
                    className={`absolute grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-[3px] border-[#F5F6F1] text-xs font-black transition duration-300 md:text-sm ${
                      isActive
                        ? "h-11 w-11 scale-110 bg-[#7D9F60] text-white shadow-[0_0_0_1px_#AFC29F,0_10px_24px_rgba(65,83,56,.22)] md:h-14 md:w-14"
                        : passed
                        ? "h-9 w-9 bg-[#DCE8CF] text-[#5f8248] shadow-[0_0_0_1px_#AFC29F] hover:scale-110 md:h-11 md:w-11"
                        : "h-9 w-9 bg-white text-[#78965D] shadow-[0_0_0_1px_#D3DECC] hover:scale-110 md:h-11 md:w-11"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* התוכן של התחנה הפעילה */}
          <Reveal delay={100}>
            <article className="group relative min-h-[250px] overflow-hidden rounded-[8px_30px_8px_30px] border border-[#D3DECC] bg-white/85 p-6 shadow-[0_12px_35px_rgba(65,83,56,.06)] backdrop-blur-sm md:p-8">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -left-2 -top-6 select-none text-[120px] font-black leading-none text-[#7E9D65]/[0.07]"
              >
                {num}
              </span>
              <span className="absolute right-0 top-0 h-[3px] w-16 bg-[#91AF76]" />

              <div className="relative z-10 flex min-h-[200px] flex-col">
                <h3 className="text-xl font-black leading-8 text-[#35402F] md:text-2xl">{title}</h3>
                <p className="mt-3 text-sm font-medium leading-7 text-[#6B7567] md:text-base md:leading-8">
                  {text}
                </p>

                <div className="mt-auto flex items-center justify-between pt-6">
                  <span className="text-sm font-black text-[#78965D]">
                    {num} / {String(n).padStart(2, "0")}
                  </span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={prev}
                      aria-label="הקודם"
                      className="grid h-10 w-10 place-items-center rounded-full border border-[#D3DECC] bg-white text-[#5f8248] transition hover:border-[#A6BC95] hover:bg-[#F5F6F1]"
                    >
                      <ArrowRight size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={next}
                      aria-label="הבא"
                      className="grid h-10 w-10 place-items-center rounded-full bg-[#7D9F60] text-white transition hover:bg-[#6f9053]"
                    >
                      <ArrowLeft size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
