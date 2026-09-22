import statsIcon from "./assete/cump.webp";
import view from './assete/viewStatic.jpg'

const STATS = [
    {
        number: "87%",
        text: (
            <>
                מבוני הבתים בישראל חורגים
                <br />
                מהתקציב ב-194,000 ₪ בממוצע
            </>
        ),
    },
    {
        number: "5-6",
        text: (
            <>
                חודשי עיכוב בממוצע
                <br />
                (וכל חודש עיכוב = עוד חודש שכירות)
            </>
        ),
    },
    {
        number: "1",
        text: (
            <>
                מכל 3 זוגות מדווחים על משבר
                <br />
                במהלך הבנייה
            </>
        ),
    },
];

function StatsSection() {
    return (
        <section className="relative px-6 pb-11 pt-15" dir="rtl">
            {/* עטיפה נפרדת לתמונה + הטשטוש - היא זו שמקבלת overflow-hidden */}
            <div className="absolute inset-0 overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${view})` }}
                />
                <div className="absolute inset-0 bg-white/92" />
            </div>

            {/* האייקון - עכשיו חופשי לצוף מעל הסקשן בלי להיחתך */}
            <div
                className="absolute right-1/2 -top-10 z-20 flex h-20 w-20 translate-x-1/2 items-center justify-center rounded-2xl bg-white shadow-lg"
            >
                <img src={statsIcon} alt="נתונים" className="h-20 w-20 object-contain" />
            </div>

            {/* התוכן */}
            <div className="relative z-10">
                <div className="mx-auto max-w-md">
                    <h3 className="mt-8 text-center text-xl font-bold text-neutral-900">
                        הנתונים מדברים בעד עצמם:
                    </h3>

                    <div className="mt-8 space-y-3">
                        {STATS.map((stat, i) => (
                            <div
                                key={i}
                                className="flex flex-row-reverse items-center justify-center gap-4 rounded-2xl bg-white py-3 px-2 shadow-md"
                            >
                                <p className="text-sm font-bold leading-snug text-neutral-800">
                                    {stat.text}
                                </p>
                                <span
                                    className="flex-shrink-0 text-4xl font-extrabold"
                                    style={{ color: "#7CB342" }}
                                >
                                    {stat.number}
                                </span>
                            </div>
                        ))}
                    </div>

                    <p className="mt-8 text-center text-base font-bold text-neutral-700">
                        ואתם יודעים מה? זה לא באשמתכם.
                    </p>
                </div>
            </div>
        </section>
    );
}


export default StatsSection;
