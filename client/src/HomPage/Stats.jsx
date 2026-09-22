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
      {/* כתמי אור עדינים */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-[340px] w-[340px] rounded-full bg-white/70 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-28 left-[5%] h-[370px] w-[370px] rounded-full bg-[#E5EBDD]/50 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-[1180px] px-6">
        {/* התוכן הראשי */}
        <div className="grid grid-cols-1 items-start gap-9 md:grid-cols-[auto_1fr] md:gap-16">
          {/* תמונה ופרטים */}
          <div className="flex flex-row items-center gap-4 md:flex-col md:items-start">
            <div className="rounded-full border border-white bg-white/70 p-1.5 shadow-[0_14px_40px_rgba(55,75,40,0.14)]">
              <img
                src={asafImg}
                alt="אסף סרויה"
                className="h-[88px] w-[88px] rounded-full border-[3px] border-[#82BC3F] bg-[#F0F3E8] object-cover md:h-[140px] md:w-[140px]"
              />
            </div>

            <div>
              <div className="text-[19px] font-bold text-[#29352A]">
                אסף סרויה
              </div>

              <div className="mt-1 text-[13.5px] font-medium text-[#66943B]">
                מייסד ומוביל החברה
              </div>
            </div>
          </div>

          {/* טקסט */}
          <div>
            <div className="relative mb-8 px-9 md:px-14">
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

            <div className="max-w-[660px] border-r-2 border-[#91C755]/40 pr-5">
              <p className="mb-3.5 text-[16px] font-normal leading-[1.9] text-[#4E594B]">
                איש בנייה ותיק שהפך תשוקה לבנייה איכותית למקצוע חיים.
                עם 15 שנות ניסיון ומעל 100 פרויקטים שליווה מהיסוד ועד
                למפתח, אסף מכיר את כל המהמורות שבדרך — ויודע איך לחסוך
                לכם מהן.
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

        {/* נתונים בעיגולים */}
        <div className="mt-14 grid grid-cols-1 place-items-center gap-6 sm:grid-cols-3 md:mt-20">
          {stats.map((item) => (
            <div
              key={item.text}
              className="flex h-[155px] w-[155px] flex-col items-center justify-center rounded-full border border-[#81AF51]/30 bg-white/65 text-center shadow-[0_12px_35px_rgba(67,91,46,0.1)] transition-transform duration-300 hover:scale-105 md:h-[175px] md:w-[175px]"
            >
              <span className="mb-1 text-[29px] font-bold text-[#639F2B] md:text-[34px]">
                {item.number}
              </span>

              <span className="max-w-[120px] text-[14px] font-medium leading-[1.5] text-[#465341]">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}