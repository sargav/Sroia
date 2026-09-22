import asafImg from './assetes/asaf-site.png'

export default function AboutAsaf() {
  const stats = [
    {
      number: '15+',
      text: 'שנות ניסיון בשטח',
    },
    {
      number: '100+',
      text: 'פרויקטים שליווינו',
    },
    {
      number: '₪120K',
      text: 'חיסכון ממוצע ללקוח',
    },
  ]

  return (
    <section
      dir="rtl"
      className="relative overflow-hidden bg-gradient-to-br from-[#FAFBF7] via-[#F6F8F1] to-[#F0F3E8] py-16 font-['Heebo',sans-serif] md:py-24"
    >
      {/* כתמי רקע עדינים */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-[340px] w-[340px] rounded-full bg-white/70 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-28 left-[5%] h-[370px] w-[370px] rounded-full bg-[#E5EBDD]/50 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-[1180px] px-6">
        {/* התוכן הראשי */}
        <div className="grid grid-cols-1 items-start gap-9 md:grid-cols-[auto_1fr] md:gap-16">
          {/* תמונה ופרטים */}
          <div className="flex items-center gap-4 md:flex-col md:items-start">
            <div className="rounded-full border border-white bg-white/70 p-1.5 shadow-[0_12px_35px_rgba(55,75,40,0.12)]">
              <img
                src={asafImg}
                alt="אסף סרויה"
                className="h-[88px] w-[88px] rounded-full border-[3px] border-[#82BC3F] bg-[#F0F3E8] object-cover md:h-[140px] md:w-[140px]"
              />
            </div>

            <div>
              <h2 className="text-[19px] font-bold text-[#29352A]">
                אסף סרויה
              </h2>

              <p className="mt-1 text-[14px] font-medium text-[#66943B]">
                מייסד ומוביל החברה
              </p>
            </div>
          </div>

          {/* טקסט */}
          <div>
            {/* המשפט המרכזי */}
            <div className="relative mb-9 px-9 md:px-14">
              {/* ציטוט פותח */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-1 -top-6 select-none font-serif text-[72px] font-black leading-none text-[#67A42D]/40 md:-right-3 md:-top-9 md:text-[110px]"
              >
                “
              </span>

              <p className="relative z-10 text-[23px] font-bold leading-[1.55] text-[#29352A] md:text-[34px]">
                כל בית שאני מלווה מרגיש לי כמו הבית שלי.{' '}

                <span className="relative inline-block text-[#579124]">
                  אני לא עוזב פרויקט

                  <span className="absolute bottom-[2px] right-0 -z-10 h-[8px] w-full rounded-full bg-[#B7DE82]/55" />
                </span>{' '}

                עד שאני בטוח שהמשפחה מקבלת בדיוק את מה שהיא חלמה עליו.
              </p>

              {/* ציטוט סוגר */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-10 left-0 select-none font-serif text-[72px] font-black leading-none text-[#67A42D]/40 md:-bottom-14 md:-left-2 md:text-[110px]"
              >
                ”
              </span>
            </div>

            {/* פסקאות */}
            <div className="max-w-[680px] border-r-2 border-[#91C755]/40 pr-5">
              <p className="mb-4 text-[16px] font-normal leading-[1.9] text-[#4E594B]">
                איש בנייה ותיק שהפך תשוקה לבנייה איכותית למקצוע חיים.
                עם 15 שנות ניסיון ומעל 100 פרויקטים שליווה מהיסוד ועד
                למפתח, אסף מכיר את כל המהמורות שבדרך — ויודע איך לחסוך
                לכם אותן.
              </p>

              <p className="text-[16px] font-normal leading-[1.9] text-[#4E594B]">
                הניסיון הרב שצבר בשטח, לצד היכרות מעמיקה עם קבלני
                ויועצי הבנייה המובילים באזור, הוא מה שמאפשר לו להבטיח
                לכם ליווי צמוד, שקוף ואמין — מהרגע הראשון ועד קבלת
                המפתח.
              </p>
            </div>
          </div>
        </div>

        {/* נתונים בשורה קומפקטית */}
        <div className="mt-12 overflow-hidden rounded-xl border border-[#81AF51]/20 bg-white/55 shadow-[0_8px_25px_rgba(55,75,40,0.06)] md:mt-16">
          <div className="grid grid-cols-1 sm:grid-cols-3">
            {stats.map((item, index) => (
              <div
                key={item.text}
                className={`flex items-center justify-center gap-3 px-5 py-5 ${
                  index !== 0
                    ? 'border-t border-[#81AF51]/20 sm:border-r sm:border-t-0'
                    : ''
                }`}
              >
                <span className="text-[25px] font-bold text-[#639F2B]">
                  {item.number}
                </span>

                <span className="text-[14px] font-medium text-[#465341]">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}