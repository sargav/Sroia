import Reveal from "../components/Reveal";
import asafPersonal from "../assets/images/asaf-personal.jpg";

/**
 * "מילה אישית לסיום": התמונה של אסף בעיגול (טבעת ירוקה וטבעת לבנה) מימין,
 * והטקסט משמאל, עם גרשיים גדולים ברקע.
 *   <PersonalNote />
 */
export default function PersonalNote() {
  return (
    <section className="py-20 md:py-28 relative isolate overflow-hidden bg-[#FBFBF8] text-[#2D382B]">
      {/* כתמי אור עדינים */}
      <div className="pointer-events-none absolute -right-28 -top-24 -z-10 h-80 w-80 rounded-full bg-[#DFEBD4]/70 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -left-28 -z-10 h-72 w-72 rounded-full bg-[#EDE6DB]/60 blur-3xl" />

      {/* בכיוון ימין לשמאל, האלמנט הראשון נמצא בצד ימין: התמונה ראשונה, הטקסט שני */}
      <div className="mx-auto w-full px-5 md:px-10 mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-[.6fr_1.4fr] lg:gap-12">
        {/* התמונה בעיגול (ימין) */}
        <Reveal className="relative mx-auto">
         

          {/* טבעת לבנה חיצונית + צל רך */}
          <div className="rounded-full bg-white p-2 shadow-[0_16px_40px_rgba(50,65,43,.18)] md:p-2.5">
            {/* טבעת ירוקה */}
            <div className="h-[150px] w-[150px] overflow-hidden rounded-full border-4 border-[#7DB847] bg-[#EEF3E6] sm:h-[170px] sm:w-[170px] md:h-[190px] md:w-[190px]">
              <img
                src={asafPersonal}
                alt="אסף סרויה"
                className="h-full w-full object-cover object-top"
              />
            </div>
          </div>
        </Reveal>

        {/* הטקסט (שמאל) */}
        <Reveal delay={100}>
          <div className="flex items-center gap-4 justify-center  align-center">
            <span className="h-px w-10 [background-image:linear-gradient(to_left,#8EAD70,transparent)]" />
            <span className=" justufy-center text-xs font-black tracking-[0.18em] text-[#78965D]">מילה אישית לסיום</span>
            <span className="h-px w-10 [background-image:linear-gradient(to_right,#8EAD70,transparent)]" />
          </div>

          <h2 className="mt-6 text-3xl font-black leading-[1.25] md:text-4xl">
            “הידע הנכון לא אמור להיות שמור{" "} 
            <br />
            <span className="text-[#759855]"> רק לאנשי המקצוע. </span>”
          </h2>

          <div className="mt-6 space-y-4 text-base font-medium leading-8 text-[#6B7567] md:text-lg">
            <p>
              המצפן נוצר כדי לתת לכם כלי פרקטי: לפתוח, לבדוק ולהמשיך — בלי לנסות לזכור הכול ובלי לחפש כל תשובה מחדש.
            </p>
            <p>
              המטרה היא שתגיעו לסוף התהליך גאים לא רק בבית שבניתם, אלא גם בדרך שבה ניהלתם את המסע אליו.
            </p>
          </div>

          <div className="mt-7 flex items-center gap-3">
            <p className="text-xl font-black text-[#5f8248]">אסף סרויה</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
