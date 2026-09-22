import { WHY_ROWS } from '../data/content'

export default function WhySection() {
  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="max-w-page mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-[0.6fr_1.4fr] gap-6 md:gap-12 items-start">
          <h2 className="font-sans font-extrabold text-ink text-[24px] md:text-[34px] leading-[1.15] tracking-tight md:sticky md:top-6">
            למה זה משנה לכם
          </h2>
          <div>
            {WHY_ROWS.map((c, i) => (
              <div
                key={c.title}
                className={`grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-1.5 md:gap-6 py-6 border-b border-ink/10 ${i === 0 ? 'border-t' : ''}`}
              >
                <h3 className="font-sans font-bold text-lg text-ink m-0">
                  <span className="text-brandDark">—</span> {c.title}
                </h3>
                <p className="text-[15px] leading-[1.7] text-bodytext m-0">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
