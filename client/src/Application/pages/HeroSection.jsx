import {
  ArrowDown,
  CheckCircle2,
  ClipboardCheck,
  Route,
} from "lucide-react";
import Reveal from "../components/Reveal";
import heroModelV2 from "../assets/images/hero-mosaic-v2.png";

/**
 * הכותרת המקורית, בדיוק באותו מבנה ובאותן צורות.
 * המסגרות, הריבועים והצל חזרו בדיוק למקור. נשארו רק גווני הטקסט הרכים.
 *   <HeroSection />
 */
export default function HeroSection() {
  return (
    <section className="hero-v3 relative isolate overflow-hidden bg-[#f2f4ed] px-5 pb-20 pt-20 text-[#2D382B] md:px-10">
      <div className="hero-v3-grid pointer-events-none absolute inset-0 opacity-70" />

      <div className="absolute -right-28 top-24 h-80 w-80 rounded-full bg-[#bdd39f]/25 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[.92fr_1.08fr] lg:gap-20">
        {/* התוכן */}
        <Reveal className="order-2 lg:order-1">
          <div className="max-w-[620px]">
            {/* ציטוט: גרשיים גדולים משני הצדדים ופס קצר מתחת */}
            <blockquote>
              <div className="flex items-start gap-2 md:gap-3">
                <span
                  aria-hidden="true"
                  className="-mt-1 select-none font-serif text-[56px] font-black leading-[0.9] text-[#A8CE7A] md:text-[64px]"
                >
                  “
                </span>

                <p className="pt-1 text-lg font-black leading-9 text-[#2D382B]/70 italic  md:text-xl">
                  הלוואי שהכרנו את זה לפני שהתחלנו לבנות
                </p>

                <span
                  aria-hidden="true"
                  className="select-none self-end font-serif text-[56px] font-black leading-[0.5] text-[#A8CE7A] md:text-[64px]"
                >
                  ”
                </span>
              </div>
            </blockquote>

            <div className="mt-7">
              <h2 className="mt-8 text-3.3xl font-black leading-[1.05] tracking-[-0.045em] sm:text-6xl lg:text-[68px]">
                <span className="inline-block bg-gradient-to-l from-[#263A29] via-[#71964F] to-[#B1D384] bg-clip-text text-transparent">
                  המצפן לבונה
                </span>
              </h2>

              <p className="mt-3 max-w-xl text-base font-medium leading-8 text-[#6B7567] md:text-lg">
                מערכת חכמה שמלווה אתכם צעד אחר צעד מהיזום ועד המפתח.
              </p>
            </div>

            {/* משפט המשך */}
            <span className="relative mt-8 block pt-6 text-2xl">
              כל אחד יכול לבנות בית פרטי,
            </span>
            <p className="max-w-xl text-xl font-black leading-9 text-[#71964f] md:text-2xl">
              לא כולם יודעים מה לבדוק בדרך.
            </p>

            {/* המסר המרכזי */}
            <div className="mt-7 border-r-2 border-[#9bb681] bg-white/5 px-5 py-4">
              <p className="text-lg font-black text-[#3e4d3c] md:text-xl">
                איך לבנות בביטחון?
              </p>

              <p className="mt-3 text-base font-medium leading-8 text-[#6B7567] md:text-lg">
                לדעת בכל שלב מה לבדוק
                , <br />
                לא לפספס כלום
                <span className="block">
                  ולא להיות הצד שעובדים עליו.
                </span>
              </p>
            </div>

            {/* קישור להמשך */}
            <div className="mt-7">
              <button
                type="button"
                onClick={() =>
                  document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
                }
                className="group inline-flex items-center gap-2 px-3 py-3 font-black text-[#50604f] transition hover:text-[#71964f]"
              >
                איך זה עובד
                <ArrowDown size={18} className="transition group-hover:translate-y-1" />
              </button>
            </div>

            {/* נתונים */}
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4 border-t border-[#cbd5c3] pt-6">
              {["5 מודולים", "34 פרקים", "גישה מכל מכשיר", "זמין תמיד"].map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-2 text-sm font-black text-[#536052]"
                >
                  <CheckCircle2 size={17} className="shrink-0 text-[#7da457]" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* התמונה */}
        <Reveal
          delay={130}
          className="relative order-1 mx-auto w-full max-w-[620px] lg:order-2 lg:mx-0"
        >
          {/* המסגרות בפינות */}
          <div className="rounded-xl pointer-events-none absolute -left-3 -top-3 h-20 w-20 border-l border-t border-[#8da678] md:-left-5 md:-top-5 md:h-28 md:w-28" />

          <div className="rounded-xl pointer-events-none absolute -bottom-3 -right-3 h-20 w-20 border-b border-r border-[#8da678] md:-bottom-5 md:-right-5 md:h-28 md:w-28" />

          <div className="relative grid grid-cols-[minmax(0,1fr)_82px] gap-2 md:grid-cols-[minmax(0,1fr)_120px] md:gap-3">
            {/* התמונה הראשית */}
            <div className="rounded-xl overflow-hidden bg-[#1e3021] p-1.5 shadow-[14px_14px_0_rgba(55,78,51,.10)] md:p-2 md:shadow-[18px_18px_0_rgba(55,78,51,.10)]">
              <img
                src={heroModelV2}
                alt="מודל של בית פרטי על גבי תכניות"
                className="h-full min-h-[310px] w-full object-cover sm:min-h-[400px] md:min-h-[470px]"
              />
            </div>

            {/* שלושת הריבועים */}
            <div className="grid grid-rows-3 gap-2  md:gap-3 ">
              {/* ריבוע ראשון */}
              <div className="flex min-h-0 flex-col justify-between bg-[#203123] p-3 text-white md:p-5 rounded-xl">
                <Route size={22} className="text-[#afd180] md:h-7 md:w-7" />

                <p className="text-[11px] font-black leading-4 md:text-sm md:leading-5">
                  מסלול
                  <br />
                  ברור
                </p>
              </div>

              {/* ריבוע שני */}
              <div className=" rounded-xl flex min-h-0 flex-col justify-between border border-[#aebda4] bg-white/80 p-3 backdrop-blur md:p-5">
                <ClipboardCheck size={22} className="text-[#729750] md:h-7 md:w-7" />

                <p className="text-[10px] font-black leading-4 text-[#445143] md:text-xs md:leading-5">
                  פותחים
                  <br />
                  בודקים
                  <br />
                  ממשיכים
                </p>
              </div>

              {/* ריבוע שלישי */}
              <div className="rounded-xl flex min-h-0 flex-col justify-between bg-[#789b59] p-3 text-white md:p-5">
                <CheckCircle2 size={22} className="text-[#e3f0d2] md:h-7 md:w-7" />

                <div>
                  <p className="text-[11px] font-black leading-4 md:text-sm md:leading-5">
                    זמין
                    <br />
                    תמיד
                  </p>

                  <p className="mt-1 hidden text-[10px] font-bold text-white/65 md:block">
                    מכל מכשיר
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
