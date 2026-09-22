import skeletonImg from '../../public/assets/skeleton.jpg'
import courseMockupImg from '../../public/assets/course-mockup.png'
import villaCutoutImg from '../../public/assets/villa-cutout.png'
import Btn from './ui/Btn'
import { ArrowIcon } from './ui/Icons'

export default function EcosystemSection() {
  return (
    <section className="py-14 md:py-20 bg-cream" id="projects">
      <div className="max-w-page mx-auto px-6">
        <div className="flex justify-between items-end flex-wrap gap-4 mb-10">
          <h2 className="font-sans font-extrabold text-ink text-[26px] md:text-[38px] leading-[1.1] tracking-tight m-0">
            האקו-סיסטם לבונים
          </h2>
          <p className="text-[15.5px] text-bodytext max-w-[380px] m-0">שלושה מסלולים שנבנו כדי להתאים לכל שלב ולכל תקציב.</p>
        </div>

        <div className="bg-ink rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 mb-6">
          <div className="min-h-[220px] md:min-h-0">
            <img src={skeletonImg} alt="פיקוח בנייה בשטח" className="w-full h-full object-cover block" />
          </div>
          <div className="p-7 md:p-11 flex flex-col justify-center gap-3.5">
            <span className="inline-flex w-fit bg-brand text-[#182b0c] font-bold text-[12.5px] px-3.5 py-1.5 rounded-full">
              השירות המקיף ביותר
            </span>
            <h3 className="font-sans font-extrabold text-2xl text-white m-0">ניהול פרויקטים מלא</h3>
            <p className="text-[15px] leading-[1.7] text-[#C9C6B8] m-0 max-w-[420px]">
              שירות פרימיום בפיקוח וניהול מלא בשטח. ליווי בוטיק מקיף מא' עד ת' – אנחנו מנהלים את הקבלנים, התקציב,
              האישורים והפיקוח.
            </p>
            <Btn variant="primary" href="#contact" className="w-fit mt-2">
              לפרטים על ניהול פרויקט
            </Btn>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div id="course" className="bg-white rounded-2xl overflow-hidden border border-ink/10 flex flex-col">
            <div className="h-[190px] p-4.5 bg-white flex items-center justify-center">
              <img src={courseMockupImg} alt="קורס בית בשתי ידיים" className="w-full h-full object-contain" />
            </div>
            <div className="p-6 flex flex-col gap-3 flex-1">
              <h3 className="font-sans font-extrabold text-lg text-ink m-0">קורס "בית בשתי ידיים"</h3>
              <p className="text-[14.5px] leading-[1.7] flex-1 text-bodytext m-0">
                קורס דיגיטלי מקיף של 40 שיעורים הנותנים את כל הידע והסודות לניהול הבנייה בביטחון וברוגע.
              </p>
              <Btn variant="ghost" href="#contact" className="mt-1">
                לפרטים על הקורס <ArrowIcon />
              </Btn>
            </div>
          </div>

          <div id="app" className="bg-white rounded-2xl overflow-hidden border border-ink/10 flex flex-col">
            <div className="h-[190px] p-4.5 bg-white flex items-center justify-center">
              <img src={villaCutoutImg} alt="אפליקציית המצפן לבונה" className="w-full h-full object-contain" />
            </div>
            <div className="p-6 flex flex-col gap-3 flex-1">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-sans font-extrabold text-lg text-ink m-0">אפליקציית "המצפן לבונה"</h3>
                <span className="font-sans font-extrabold text-[15px] text-brandDark whitespace-nowrap">298 ₪</span>
              </div>
              <p className="text-[14.5px] leading-[1.7] flex-1 text-bodytext m-0">
                כל הצ'קליסטים והשלבים לבניית בית, מסודרים בכף היד שלכם.
              </p>
              <Btn variant="ghost" href="#contact" className="mt-1">
                לרכישת האפליקציה <ArrowIcon />
              </Btn>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
