import { useState } from "react";
import { Plus } from "lucide-react";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";


export default function FaqSection({ faqs }) {
  const [openIndex, setOpenIndex] = useState(0);
  const total = String(faqs.length).padStart(2, "0");

  return (
    <section className="section-pad relative isolate overflow-hidden bg-[#EEF2E9] text-[#2D382B]">
      {/* עיטורי רקע עדינים */}
      <div className="pointer-events-none absolute -right-28 -top-24 -z-10 h-80 w-80 rounded-full bg-[#DFEBD4]/80 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -left-28 -z-10 h-72 w-72 rounded-full bg-[#EDE6DB]/70 blur-3xl" />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-4 top-10 -z-10 hidden select-none text-[260px] font-black leading-none text-[#7E9D65]/[0.07] md:block"
      >
        ?
      </span>

      <div className="page-wrap">
        <SectionHeading
          eyebrow="שאלות נפוצות"
          title="לפני שמחליטים,"
          accent="עושים סדר."
          description="ריכזנו את הדברים שחשוב לדעת לפני שמצטרפים, בצורה קצרה וברורה."
          className="!mb-8 md:!mb-10"
        />

        {/* שני מספרים קטנים, מהצד הישן של הסקשן */}
      

        <div className="mx-auto max-w-3xl space-y-3">
          {faqs.map(([question, answer], index) => {
            const open = openIndex === index;
            return (
              <Reveal key={question} delay={index * 60}>
                <article
                  className={`group relative overflow-hidden rounded-[8px_24px_8px_24px] border bg-white/90 transition duration-300 ${
                    open
                      ? "border-[#91AF76] shadow-[0_20px_45px_rgba(65,83,56,.11)]"
                      : "border-[#D3DECC] shadow-[0_8px_24px_rgba(65,83,56,.05)] hover:border-[#A6BC95]"
                  }`}
                >
                  {/* פס עליון: מתארך כשהשאלה פתוחה */}
                  <span
                    className={`absolute right-0 top-0 h-[3px] bg-[#91AF76] transition-all duration-500 ${
                      open ? "w-full" : "w-14"
                    }`}
                  />

                  <button
                    type="button"
                    id={`faq-q-${index}`}
                    aria-expanded={open}
                    aria-controls={`faq-a-${index}`}
                    onClick={() => setOpenIndex(open ? -1 : index)}
                    className="flex w-full items-center gap-4 p-4 text-right md:gap-5 md:p-6"
                  >
                    <span
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 text-xs font-black transition duration-300 md:h-11 md:w-11 ${
                        open
                          ? "border-[#759855] bg-[#759855] text-white"
                          : "border-[#C6D3BB] bg-[#F5F6F1] text-[#78965D]"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="flex-1 text-base font-black leading-7 text-[#35402F] md:text-lg">
                      {question}
                    </span>

                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition duration-300 ${
                        open
                          ? "rotate-45 border-[#759855] bg-[#E8F0DE] text-[#5f8248]"
                          : "border-[#D3DECC] bg-white text-[#78965D]"
                      }`}
                    >
                      <Plus size={18} strokeWidth={2.2} />
                    </span>
                  </button>

                  <div
                    id={`faq-a-${index}`}
                    role="region"
                    aria-labelledby={`faq-q-${index}`}
                    className={`grid transition-all duration-300 ease-out ${
                      open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="mx-4 border-t border-dashed border-[#D3DECC] pb-5 pr-[56px] pt-4 md:mx-6 md:pb-6 md:pr-[64px]">
                        <p className="max-w-2xl text-sm font-medium leading-7 text-[#6B7567] md:text-base md:leading-8">
                          {answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
