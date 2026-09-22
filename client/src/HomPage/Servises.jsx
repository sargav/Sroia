import AnimatedIcon from './IconsAnimations'
import { useNavigate } from "react-router-dom";
import servicesBg from './assetes/v2.png'
export default function Services() {
    const navigate = useNavigate();
    const services = [
        {
            number: '01',
            label: 'ליווי מלא',
            title: 'ניהול פרויקטים מלא',
            description:
                'שירות פרימיום בפיקוח וניהול מלא בשטח. ליווי בוטיק מקיף מא׳ עד ת׳ — אנחנו מנהלים את הקבלנים, התקציב, האישורים והפיקוח.',
            buttonText: 'לפרטים על ניהול פרויקט',
            href: '/projects',
            icon: 'management'
        },
        {
            number: '02',
            label: 'לימוד עצמאי',
            title: 'קורס "בית בשתי ידיים"',
            description:
                'קורס דיגיטלי מקיף הכולל 40 שיעורים, המעניקים את כל הידע והכלים לניהול תהליך הבנייה בביטחון וברוגע.',
            buttonText: 'לפרטים על הקורס',
            href: '/courses',
        },
        {
            number: '03',
            label: 'כלים מעשיים',
            title: 'אפליקציית "המצפן לבונה"',
            description:
                'כל הרשימות, הבדיקות והשלבים הנחוצים לבניית בית, מסודרים ונגישים בכף היד שלכם — ב־298 ₪ בלבד.',
            buttonText: 'לרכישת האפליקציה',
            href: '/application',
        },
    ]

    return (
     <section
  dir="rtl"
  className="relative overflow-hidden  bg-[#EEF2E8] py-16 font-['Heebo',sans-serif] md:py-24"
>
        
            {/* שכבה בהירה כדי שהטקסט יהיה ברור */}
            <div className="absolute inset-0 bg-[#FBF8F2]/75" />

            <div className="relative z-10 mx-auto max-w-[1180px] px-6">
                {/* אזור הכותרת */}
                <div className="mx-auto mb-12 flex max-w-[750px] flex-col items-center text-center md:mb-14">
                    {/* כותרת קטנה */}
                    <div className="mb-4 flex items-center justify-center gap-3">
                        <span className="h-[2px] w-9 rounded-full bg-[#659B2D]" />

                        <p className="text-[14px] font-medium text-[#659B2D]">
                            מעטפת שירותים מלאה
                        </p>

                        <span className="h-[2px] w-9 rounded-full bg-[#659B2D]" />
                    </div>

                    {/* כותרת ראשית */}
                    <h2 className="text-[32px] font-bold leading-[1.3] text-[#26321F] md:text-[44px]">
                        שלוש דרכים לבנות נכון
                    </h2>

                    {/* טקסט הסבר */}
                    <p className="mt-5 max-w-[600px] text-[16px] font-normal leading-[1.8] text-[#626A5D]">
                        בחרו את רמת הליווי שמתאימה לכם וקבלו את הכלים הדרושים
                        לתהליך מסודר, ברור ומדויק.
                    </p>
                </div>

                {/* כרטיסים */}
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                    {services.map((service) => (
                        <article
                            key={service.number}
                            className="group relative flex flex-col overflow-hidden rounded-[16px] border border-[#DDE3D6] bg-white p-7 shadow-[0_8px_25px_rgba(50,65,40,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#AFC99A] hover:shadow-[0_18px_42px_rgba(50,65,40,0.11)] md:p-8"
                        >
                            
                            {/* פס ירוק עליון */}
                            <div className="absolute right-0 top-0 h-[4px] w-0 bg-[#76A944] transition-all duration-500 group-hover:w-full" />

                            {/* מספר גדול ברקע */}
                            <span
                                aria-hidden="true"
                                className="pointer-events-none absolute -left-2 -top-3 select-none text-[100px] font-bold leading-none text-[#659B2D]/[0.045]"
                            >
                                {service.number}
                            </span>

                            {/* מספר ותווית */}
                            <div className="relative z-10 mb-7 flex items-center justify-between">
                                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF2DF] text-[16px] font-bold text-[#659B2D] transition-colors duration-300 group-hover:bg-[#659B2D] group-hover:text-white">
                                    {service.number}
                                </span>

                                <span className="rounded-full border border-[#DCE6D1] bg-[#F9FBF6] px-3.5 py-1.5 text-[12px] font-medium text-[#668152]">
                                    {service.label}
                                </span>
                            </div>

                            {/* תוכן הכרטיס */}
                            <h3 className="relative z-10 mb-4 text-[23px] font-bold leading-[1.4] text-[#293126]">
                                {service.title}
                            </h3>

                            <p className="relative z-10 mb-8 flex-1 text-[16px] font-normal leading-[1.85] text-[#626A5D]">
                                {service.description}
                            </p>

                            {/* קישור */}
                            <a
                                href={service.href}
                                className="relative z-10 flex items-center justify-between border-t border-[#E3E7DE] pt-5 text-[15px] font-semibold text-[#598B2B]"
                            >
                                <span>{service.buttonText}</span>

                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EDF4E5] text-[17px] transition-all duration-300 group-hover:-translate-x-1 group-hover:bg-[#659B2D] group-hover:text-white">
                                    ←
                                </span>
                            </a>
                        </article>
                    ))}
                </div>

                {/* קישור תחתון */}
                <button
                    onClick={() => navigate("/contact")}
                    className="mx-auto mt-9 block w-fit cursor-pointer text-center text-[14px] font-normal text-[#737B6E] underline-offset-4 transition-colors duration-300 hover:text-[#659B2D] hover:underline"
                >
                    לא בטוחים איזה מסלול מתאים לכם? צרו קשר ונעזור לכם לבחור.
                </button>
            </div>
        </section>
    )
}