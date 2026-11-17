import { ArrowDown, CheckCircle2, Compass, ListChecks, Smartphone } from "lucide-react";
import Reveal from "../components/Reveal";
import heroModelV2 from "../assets/images/hero-mosaic-v2.webp";

/**
 * הכותרת של המצפן לבונה – לפי עיצוב "מ" מהקנבס:
 * תמונת הבית כרקע מלא שמתבהר לכיוון הטקסט, הטקסט מימין,
 * ושלושה ריבועים לבנים במסגרת ירוקה בטור משמאל (בטלפון: בשורה מתחת לטקסט).
 *   <HeroSection />
 */

const TILES = [
  { icon: Compass, title: ["מסלול", "ברור"] },
  { icon: ListChecks, title: ["פותחים", "בודקים", "ממשיכים"] },
  { icon: Smartphone, title: ["זמין תמיד"], small: "מכל מכשיר" },
];

// ריבוע: לבן עם מסגרת ירוקה ואייקון גדול שיוצא מהפינה. בריחוף מתמלא בירוק מלמטה
function Tile({ icon: Icon, title, small }) {
  return (
    <div className="group relative isolate flex min-h-[7.5rem] flex-col justify-end overflow-hidden rounded-2xl border-4 border-[#659b2d] bg-white p-3 text-[#26321F] shadow-[0_18px_40px_rgba(10,20,12,.22)] transition duration-300 hover:-translate-x-2 hover:text-white motion-reduce:transition-none motion-reduce:hover:translate-x-0 sm:p-4 lg:min-h-[9.375rem] lg:px-[1.125rem]">
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 translate-y-full bg-[#4f7f1f] transition-transform duration-[450ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:translate-y-0 motion-reduce:transition-none"
      />
      <Icon
        aria-hidden="true"
        strokeWidth={1.4}
        className="absolute -left-4 -top-4 h-16 w-16 text-[#4f7f1f] transition duration-[450ms] group-hover:rotate-[14deg] group-hover:text-white motion-reduce:transition-none sm:h-20 sm:w-20 lg:-left-5 lg:-top-5 lg:h-[6.875rem] lg:w-[6.875rem]"
      />
      <p className="relative text-sm font-black leading-tight sm:text-base lg:text-xl">
        {title.map((line, i) => (
          <span key={line} className="block">
            {line}
            {i === title.length - 1 && small && (
              <span className="mt-0.5 block text-xs font-bold lg:text-sm">{small}</span>
            )}
          </span>
        ))}
      </p>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-[#f2f4ed] text-[#2D382B]">
      {/* תמונת הבית כרקע מלא */}
      <img
        src={heroModelV2}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[0%_40%]"
      />
      {/* שכבה בהירה: מלאה מאחורי הטקסט ונעלמת לכיוון הבית. במסך צר - בהירה בכל השטח כדי שהטקסט יהיה קריא */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[#f2f4ed]/90 xl:bg-transparent xl:[background-image:linear-gradient(to_left,#f2f4ed_0%,rgba(242,244,237,.97)_38%,rgba(242,244,237,.5)_56%,rgba(242,244,237,0)_72%)]"
      />

      <div className="mx-auto flex max-w-[82.5rem] flex-col gap-10 px-5 py-16 md:px-10 xl:min-h-[56.25rem] xl:flex-row xl:items-center xl:justify-between xl:py-16">
        {/* התוכן */}
        <Reveal className="w-full max-w-[37.5rem]">
          <blockquote className="text-lg font-black italic text-[#4d5a4b] md:text-xl">
            <span aria-hidden="true" className="select-none align-[-0.875rem] font-serif text-[2.75rem] not-italic leading-[0] text-[#7da457]">
              “
            </span>{" "}
            הלוואי שהכרנו את זה לפני שהתחלנו לבנות{" "}
            <span aria-hidden="true" className="select-none align-[-0.875rem] font-serif text-[2.75rem] not-italic leading-[0] text-[#7da457]">
              ”
            </span>
          </blockquote>

          <h1 className="mt-6 w-fit text-[2.75rem] font-black leading-[1.05] tracking-[-0.04em] sm:text-6xl xl:text-[5.25rem]">
            <span className="[background-image:linear-gradient(to_left,#263A29,#4f7f1f,#659b2d)] bg-clip-text text-transparent">
              המצפן לבונה
            </span>
          </h1>

          <p className="mt-3 text-base font-medium leading-[1.7] text-[#565f53] md:text-lg">
            מערכת חכמה שמלווה אתכם צעד אחר צעד מהיזום ועד המפתח.
          </p>

          <p className="mt-8 text-xl md:text-2xl">כל אחד יכול לבנות בית פרטי,</p>
          <p className="mt-0.5 text-xl font-black text-[#4f7f1f] md:text-2xl">לא כולם יודעים מה לבדוק בדרך.</p>

          <div className="mt-6 border-r-2 border-[#659b2d] px-5 py-1">
            <p className="text-lg font-black text-[#3e4d3c] md:text-xl">איך לבנות בביטחון?</p>
            <p className="mt-2.5 text-base font-medium leading-[1.75] text-[#565f53] md:text-lg">
              לדעת בכל שלב מה לבדוק,
              <br />
              לא לפספס כלום
              <br />
              ולא להיות הצד שעובדים עליו.
            </p>
          </div>

          <button
            type="button"
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            className="group mt-5 inline-flex items-center gap-2 py-3 font-black text-[#3e4d3c] transition hover:text-[#4f7f1f]"
          >
            איך זה עובד
            <ArrowDown size={18} aria-hidden="true" className="transition group-hover:translate-y-1 motion-reduce:transition-none" />
          </button>

          <div className="mt-3 flex flex-wrap gap-x-7 gap-y-3 border-t border-[#cbd5c3] pt-5">
            {["5 מודולים", "34 פרקים"].map((item) => (
              <span key={item} className="flex items-center gap-2 text-sm font-black text-[#3e4d3c]">
                <CheckCircle2 size={17} aria-hidden="true" className="shrink-0 text-[#4f7f1f]" />
                {item}
              </span>
            ))}
          </div>
        </Reveal>

        {/* שלושת הריבועים: בטלפון שורה אחת מתחת לטקסט, במחשב טור משמאל */}
        <Reveal delay={130} className="grid w-full grid-cols-3 gap-3 sm:gap-4 xl:w-[13.125rem] xl:shrink-0 xl:grid-cols-1 xl:grid-rows-3">
          {TILES.map((tile) => (
            <Tile key={tile.title.join(" ")} {...tile} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
