import Btn from './ui/Btn'
import TextInput from './ui/TextInput'

export default function FinalCta() {
  return (
    <section id="contact" className="relative overflow-hidden bg-cream">
      <div className="max-w-page mx-auto px-6 py-14 md:py-[88px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center mb-8 md:mb-12">
          <h2 className="text-ink font-sans font-extrabold text-[28px] md:text-[42px] leading-[1.08] tracking-tight m-0">
            רוצים לבנות את בית חלומותיכם בראש שקט?
          </h2>
          <p className="text-bodytext text-[16.5px] leading-[1.7] m-0">
            השאירו פרטים ואסף יחזור אליכם אישית לתיאום פגישת ייעוץ חינם, ללא כל התחייבות. מעל 100 משפחות כבר בנו נכון
            — הצטרפו גם אתם.
          </p>
        </div>
        <div className="bg-ink rounded-[22px] p-6 md:p-3 flex flex-col md:flex-row gap-3 items-stretch">
          <TextInput pill={false} placeholder="שם מלא" className="!bg-white !border-none" />
          <TextInput pill={false} type="tel" placeholder="טלפון" className="!bg-white !border-none" />
          <TextInput pill={false} type="email" placeholder="מייל" className="!bg-white !border-none" />
          <Btn variant="primary" className="whitespace-nowrap px-8 py-3.5">
            חזרו אלי לפגישת ייעוץ
          </Btn>
        </div>
      </div>
    </section>
  )
}
