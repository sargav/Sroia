import asafImg from '../../public/assets/asaf-site.png'

export default function AboutAsaf() {
  return (
    <section className="bg-ink py-16 md:py-28 relative overflow-hidden">
      <div className="max-w-page mx-auto px-6 grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 md:gap-14 items-start">
        <div className="flex flex-row md:flex-col items-center md:items-start gap-4">
          <img
            src={asafImg}
            alt="אסף סרויה"
            className="w-[88px] h-[88px] md:w-[140px] md:h-[140px] rounded-full object-cover border-[3px] border-brand bg-inksoft"
          />
          <div>
            <div className="text-white font-bold text-[17px] font-sans">אסף סרויה</div>
            <div className="text-[#9C9888] text-[13.5px]">מייסד ומוביל החברה</div>
          </div>
        </div>
        <div>
          <p className="font-sans font-bold text-[22px] md:text-[32px] leading-[1.45] text-white mb-7">
            "כל בית שאני מלווה מרגיש לי כמו הבית שלי. <span className="text-brand">אני לא עוזב פרויקט</span> עד שאני
            בטוח שהמשפחה מקבלת בדיוק את מה שהיא חלמה עליו."
          </p>
          <p className="text-[#C9C6B8] text-[15.5px] leading-[1.8] mb-3.5 max-w-[620px]">
            איש בנייה ותיק שהפך תשוקה לבנייה איכותית למקצוע חיים. עם 15 שנות ניסיון ומעל 100 פרויקטים שליווה מהיסוד
            ועד למפתח, אסף מכיר את כל המהמורות שבדרך — ויודע איך לחסוך לכם מהן.
          </p>
          <p className="text-[#C9C6B8] text-[15.5px] leading-[1.8] max-w-[620px]">
            הניסיון הרב שצבר בשטח, לצד היכרות מעמיקה עם קבלני ויועצי הבנייה המובילים באזור, הוא מה שמאפשר לו להבטיח
            לכם ליווי צמוד, שקוף ואמין — מהרגע הראשון ועד קבלת המפתח.
          </p>
        </div>
      </div>
    </section>
  )
}
