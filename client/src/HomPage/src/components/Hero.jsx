import heroImg from './assetes/hero.jpg'

export default function Hero() {
  return (
    <section
      dir="rtl"
      className="relative overflow-hidden"
      style={{
        backgroundImage:
          'linear-gradient(180deg, #FAFBF7 0%, #F0F3E8 100%)',
      }}
    >
      <div className="grid grid-cols-1 md:min-h-[620px] md:grid-cols-[1.1fr_0.9fr]">
        {/* אזור התוכן */}
        <div className="relative z-10 order-2 flex flex-col justify-center bg-transparent px-6 py-14 md:order-1 md:py-16 md:pl-16 md:pr-24">
          <p className="mb-5 text-[14px] font-semibold tracking-wide text-[#659B2D]">
            ניהול פרויקטים ופיקוח בנייה
          </p>

          <h1 className="mb-7 max-w-[620px] font-[Arial,sans-serif] text-[38px] font-bold leading-[1.15] tracking-[-1px] text-[#26321F] md:text-[58px]">
            בונים בית פרטי?
            <br />
            נהנים מהדרך.
            <br />
            <span className="text-[#659B2D]">חוסכים הון.</span>
          </h1>

          <p className="mb-9 max-w-[480px] font-[Arial,sans-serif] text-[17px] leading-[1.8] text-[#596153]">
            ליווי יד ביד משלב רכישת המגרש ועד קבלת המפתח — ללא חריגות
            תקציב, ללא טעויות יקרות ובסטנדרט הגבוה ביותר.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              className="rounded-md bg-[#659B2D] px-7 py-3.5 text-[15px] font-bold text-white transition-colors hover:bg-[#527F28]"
            >
              לתיאום פגישת ייעוץ חינם
            </a>

            <a
              href="#gifts"
              className="rounded-md border-2 border-[#659B2D] px-7 py-3.5 text-[15px] font-bold text-[#527F28] transition-colors hover:bg-[#659B2D] hover:text-white"
            >
              המדריך החינמי לבונה
            </a>
          </div>
        </div>

        {/* אזור התמונה */}
        <div className="relative order-1 min-h-[320px] overflow-hidden md:order-2 md:min-h-0">
          <img
            src={heroImg}
            alt="בית פרטי"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* הצללה שחורה */}
          <div className="absolute inset-0 bg-black/20" />

          {/* גוון הגרדיאנט מעל התמונה */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(180deg, rgba(250,251,247,0.2) 0%, rgba(240,243,232,0.38) 100%)',
            }}
          />
        </div>
      </div>
    </section>
  )
}