import Btn from './ui/Btn'
import TextInput from './ui/TextInput'
import { GuideIcon, ChatIcon } from './ui/Icons'

export default function GiftsSection() {
  return (
    <section id="gifts" className="bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="bg-ink px-6 py-12 md:px-16 md:py-[72px] flex flex-col gap-4 justify-center">
          <div className="w-[52px] h-[52px] rounded-2xl bg-brand/15 flex items-center justify-center">
            <GuideIcon />
          </div>
          <h3 className="font-sans font-extrabold text-[22px] text-white m-0">המדריך המלא לבונה</h3>
          <p className="text-[15px] leading-[1.7] text-[#C9C6B8] m-0 max-w-[360px]">
            כל מה שחובה לדעת לפני שעולים על הקרקע — PDF במתנה, ישר למייל.
          </p>
          <div className="flex gap-2.5 mt-1.5 flex-wrap">
            <TextInput placeholder="שם מלא" className="!bg-inksoft !border-white/15 !text-white" />
            <TextInput type="email" placeholder='דוא"ל' className="!bg-inksoft !border-white/15 !text-white" />
          </div>
          <Btn variant="primary" href="#" className="w-fit mt-1">
            שלחו לי את המדריך בחינם
          </Btn>
        </div>

        <div className="bg-cream px-6 py-12 md:px-16 md:py-[72px] flex flex-col gap-4 justify-center">
          <div className="w-[52px] h-[52px] rounded-2xl bg-white border border-ink/10 flex items-center justify-center">
            <ChatIcon />
          </div>
          <h3 className="font-sans font-extrabold text-[22px] text-ink m-0">קבוצת הוואטסאפ השקטה</h3>
          <p className="text-[15px] leading-[1.7] text-bodytext m-0 max-w-[360px]">
            פעם בשבוע אנחנו פותחים את הקבוצה לשאלות ותשובות בלייב עם אסף!
          </p>
          <Btn variant="dark" href="#" className="w-fit mt-1.5">
            הצטרפו לקבוצה בחינם
          </Btn>
        </div>
      </div>
    </section>
  )
}
