import { useNavigate } from "react-router-dom";
import useSiteStats, { formatPrice } from "../utils/useSiteStats";
export default function Services() {
    const navigate = useNavigate();
    // מחיר המצפן מתעדכן מפאנל הניהול
    const { compassPrice } = useSiteStats();
    const services = [
        {
            number: '01',
            title: 'ניהול פרויקטים מלא',
            description:
                'שירות פרימיום בפיקוח וניהול מלא בשטח. ליווי בוטיק מקיף מא׳ עד ת׳ — אנחנו מנהלים את הקבלנים, התקציב, האישורים והפיקוח.',
            buttonText: 'לפרטים על ניהול פרויקט',
            href: '/projects',
            icon: 'management'
        },
        {
            number: '02',
            title: 'קורס "בית בשתי ידיים"',
            description:
                'קורס דיגיטלי מקיף הכולל 40 שיעורים, המעניקים את כל הידע והכלים לניהול תהליך הבנייה בביטחון וברוגע.',
            buttonText: 'לפרטים על הקורס',
            href: '/courses',
        },
        {
            number: '03',
            title: 'אפליקציית "המצפן לבונה"',
            description:
                `כל הרשימות, הבדיקות והשלבים הנחוצים לבניית בית, מסודרים ונגישים בכף היד שלכם — ב־${formatPrice(compassPrice)} ₪ בלבד.`,
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

            <div className="relative z-10 mx-auto max-w-[73.75rem] px-6">
                {/* אזור הכותרת */}
                <div className="mx-auto mb-12 flex max-w-[46.875rem] flex-col items-center text-center md:mb-14">
                    {/* כותרת קטנה */}
                    <div className="mb-4 flex items-center justify-center gap-3">
                        <span className="h-[2px] w-9 rounded-full bg-[#659B2D]" />

                        <p className="text-[0.875rem] font-medium text-[#4e7723]">
                            מעטפת השירותים המלאה שלנו
                        </p>

                        <span className="h-[2px] w-9 rounded-full bg-[#659B2D]" />
                    </div>

                    {/* כותרת ראשית */}
                    <h2 className="text-[2rem] font-bold leading-[1.3] text-[#26321F] md:text-[2.75rem]">
                        שלוש דרכים לבנות נכון
                    </h2>

                    {/* טקסט הסבר */}
                    <p className="mt-5 max-w-[37.5rem] text-[1rem] font-normal leading-[1.8] text-[#626A5D]">
                        בחרו את רמת הליווי שמתאימה לכם וקבלו את הכלים הדרושים
                        לתהליך מסודר, ברור ומדויק.
                    </p>
                </div>

                {/* כרטיסים */}
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                    {services.map((service) => (
                        <article
                            key={service.number}
                            className="group relative isolate flex flex-col overflow-hidden rounded-[16px] border-[1.5px] border-[#659B2D] bg-white p-7 shadow-[0_14px_34px_rgba(83,130,40,0.14)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_48px_rgba(83,130,40,0.26)] focus-within:-translate-y-2 focus-within:shadow-[0_24px_48px_rgba(83,130,40,0.26)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:focus-within:translate-y-0 md:p-8"
                        >
                            {/* מילוי ירוק שעולה בריחוף */}
                            <div
                                aria-hidden="true"
                                className="absolute inset-0 z-0 translate-y-[101%] bg-[#4F7F1F] transition-transform duration-[450ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:translate-y-0 group-focus-within:translate-y-0 motion-reduce:transition-none"
                            />

                            {/* חצי פס ירוק במרכז, נפתח לכל הרוחב בריחוף */}
                            <div
                                aria-hidden="true"
                                className="absolute left-1/4 top-0 z-20 h-[7px] w-1/2 rounded-b-[7px] bg-[#659B2D] transition-all duration-500 group-hover:left-0 group-hover:w-full group-hover:rounded-none group-focus-within:left-0 group-focus-within:w-full group-focus-within:rounded-none motion-reduce:transition-none"
                            />

                            {/* מספר גדול ברקע */}
                            <span
                                aria-hidden="true"
                                className="pointer-events-none absolute left-3 top-2.5 z-[1] select-none text-[6.25rem] font-extrabold leading-none text-[#CCD9BE] opacity-65 transition-all duration-300 group-hover:translate-x-2.5 group-hover:text-white group-hover:opacity-[0.14] group-focus-within:translate-x-2.5 group-focus-within:text-white group-focus-within:opacity-[0.14] motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-focus-within:translate-x-0"
                            >
                                {service.number}
                            </span>

                            {/* תוכן הכרטיס */}
                            <h3 className="relative z-10 mb-4 mt-12 text-[1.4375rem] font-bold leading-[1.4] text-[#293126] transition-colors duration-300 group-hover:text-white group-focus-within:text-white motion-reduce:transition-none">
                                {service.title}
                            </h3>

                            <p className="relative z-10 mb-8 flex-1 text-[1rem] font-normal leading-[1.85] text-[#626A5D] transition-colors duration-300 group-hover:text-white group-focus-within:text-white motion-reduce:transition-none">
                                {service.description}
                            </p>

                            {/* קישור */}
                            <a
                                href={service.href}
                                className="relative z-10 flex items-center justify-between border-t border-[#E3E7DE] pt-5 text-[0.9375rem] font-semibold text-[#538228] transition-colors duration-300 focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-white group-hover:border-white/35 group-hover:text-white group-focus-within:border-white/35 group-focus-within:text-white motion-reduce:transition-none"
                            >
                                <span>{service.buttonText}</span>

                                <span
                                    aria-hidden="true"
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#659B2D] text-[1.125rem] text-white transition-all duration-300 group-hover:-translate-x-2.5 group-hover:bg-white group-hover:text-[#4F7F1F] group-focus-within:-translate-x-2.5 group-focus-within:bg-white group-focus-within:text-[#4F7F1F] motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-focus-within:translate-x-0"
                                >
                                    ←
                                </span>
                            </a>
                        </article>
                    ))}
                </div>

                {/* קישור תחתון */}
                <button
                    onClick={() => navigate("/contact")}
                    className="mx-auto mt-9 block w-fit cursor-pointer text-center text-[0.875rem] font-normal text-[#6b7266] underline-offset-4 transition-colors duration-300 hover:text-[#4e7723] hover:underline"
                >
                    לא בטוחים איזה מסלול מתאים לכם? צרו קשר ונעזור לכם לבחור.
                </button>
            </div>
        </section>
    )
}