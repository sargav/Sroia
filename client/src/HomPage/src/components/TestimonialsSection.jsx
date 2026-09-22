import { useState } from 'react'
import { TESTIMONIALS } from '../data/content'

export default function TestimonialsSection() {
  const [active, setActive] = useState(0)
  const t = TESTIMONIALS[active]
  return (
    <section className="py-14 md:py-[88px] bg-ink">
      <div className="max-w-page mx-auto px-6">
        <h2 className="font-sans font-extrabold text-white text-[24px] md:text-[34px] tracking-tight mb-9">לקוחות ממליצים</h2>
        <div className="grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-6 md:gap-12 items-center">
          <div className="rounded-2xl overflow-hidden aspect-[4/3]">
            <img src={t.img} alt="בית שנבנה בליווי סרויה" className="w-full h-full object-cover block" />
          </div>
          <div>
            <p className="font-sans font-semibold text-[19px] md:text-[25px] leading-[1.5] text-white mb-5">"{t.text}"</p>
            <div className="mb-7">
              <div className="text-brand font-bold font-sans text-[15px]">{t.who}</div>
              <div className="text-[#9C9888] text-[13.5px]">{t.where}</div>
            </div>
            <div className="flex gap-2.5">
              {TESTIMONIALS.map((tm, i) => (
                <button
                  key={tm.who}
                  onClick={() => setActive(i)}
                  aria-label={tm.who}
                  className={`w-[46px] h-[46px] rounded-[10px] p-0 overflow-hidden cursor-pointer bg-transparent transition-opacity border-2 ${
                    i === active ? 'border-brand opacity-100' : 'border-transparent opacity-45'
                  }`}
                >
                  <img src={tm.img} alt="" className="w-full h-full object-cover block" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
