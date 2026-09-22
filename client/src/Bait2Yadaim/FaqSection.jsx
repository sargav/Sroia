import { useState } from "react";
import villaSketchBg from "./assete/villa_bg.png";

const FAQ_ITEMS = [
    {
        question: "אני כבר באמצע הבנייה, הקורס עדיין רלוונטי?",
        answer:
            "בהחלט! הקורס בנוי כך שאפשר לקפוץ ישירות לשלב שאתם נמצאים בו.",
    },
    {
        question: "אין לי זמן ללמוד את כל השיעורים.",
        answer:
            "אתם לא צריכים ללמוד הכל מראש. תלמדו מה שרלוונטי לכם עכשיו - השיעור הבא שאתם צריכים.",
    },
    {
        question: "יש לי כבר אדריכל ומפקח, למה אני צריך את זה?",
        answer:
            "הקורס לא בא להחליף אותם. הוא בא לתת לכם את הידע לדבר איתם בשפה שלהם ולהבין מה הם אומרים.",
    },
    {
        question: "האם הקורס מתאים גם לשיפוץ מקיף?",
        answer:
            "כן! הרבה מהעקרונות זהים. פשוט תדלגו על החלקים שלא רלוונטיים לשיפוץ.",
    },
    {
        question: "איך אני יודע שהקורס באמת עובד?",
        answer:
            "יש לנו עשרות משפחות שעברו את הקורס וחסכו סכומים משמעותיים. ויש לכם 30 יום להחזר כספי מלא.",
    },
];

// מפצל טקסט תשובה למשפטים נפרדים לפי "." או "!" - כל משפט יוצג בשורה משלו
function splitIntoSentences(text) {
    const matches = text.match(/[^.!]+[.!]?/g) || [text];
    return matches
        .map((sentence) => sentence.trim())
        .filter((sentence) => sentence.length > 0);
}

function FaqItem({ item, index, isOpen, onToggle }) {
    const sentences = splitIntoSentences(item.answer);

    return (
        <div
            className="w-full overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow duration-300"
            style={{
                boxShadow: isOpen
                    ? "0 8px 24px rgba(0,0,0,0.10)"
                    : "0 1px 3px rgba(0,0,0,0.06)",
            }}
        >
            <button
                onClick={onToggle}
                dir="rtl"
                className="flex w-full items-center justify-between gap-4 px-6 py-6 text-right"
                type="button"
            >
                {/* קבוצה ימנית: אייקון סימן שאלה + הטקסט */}
                <span className="flex min-w-0 flex-1 items-center gap-4">
                    <span
                        className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-xl font-bold leading-none transition-colors duration-300"
                        style={{
                            backgroundColor: isOpen ? "#7CB342" : "#F0F3E8",
                            color: isOpen ? "#ffffff" : "#7CB342",
                        }}
                    >
                        ?
                    </span>

                    <span className="min-w-0 flex-1 text-lg font-bold leading-snug text-neutral-800">
                        {item.question}
                    </span>
                </span>

                {/* אייקון פלוס/מינוס - עם טבעת נוספת מסביב */}
                <span
                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full p-[3px] transition-colors duration-300"
                    style={{
                        border: `1px solid ${isOpen ? "#B7D89A" : "#E5E8DE"}`,
                    }}
                >
                    <span
                        className="flex h-full w-full items-center justify-center rounded-full border-2 text-2xl font-bold leading-none"
                        style={{
                            borderColor: isOpen ? "#7CB342" : "#D9DED0",
                            color: isOpen ? "#7CB342" : "#9CA3AF",
                        }}
                    >
                        {isOpen ? "–" : "+"}
                    </span>
                </span>
            </button>

            {isOpen && (
                <div className="px-6 pb-8 pr-[4.25rem]">
                    <div className="border-t pt-4" style={{ borderColor: "#DCE3D0" }}>
                        <div className="space-y-1.5">
                            {sentences.map((sentence, i) => (
                                <p
                                    key={i}
                                    className="text-base leading-relaxed text-neutral-600"
                                >
                                    {sentence}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function FaqSection() {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section className="relative w-full overflow-hidden px-6 pt-16 pb-24" dir="rtl">
            {/* תמונת הרקע - סקיצת הבית */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${villaSketchBg})` }}
            />

            {/* שכבה לבנה אטומה + טשטוש */}
            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm" />

            {/* התוכן */}
            <div className="relative z-10 mx-auto w-full max-w-2xl">
                <div className="mb-2 text-center">
                    <p className="text-sm font-bold uppercase tracking-widest text-[#7CB342]">
                        יש לכם ספקות?
                    </p>
                    <h2 className="mt-2 text-3xl font-bold text-neutral-900">
                        שאלות ותשובות
                    </h2>
                </div>

                <div className="mt-10 flex w-full flex-col items-stretch gap-4">
                    {FAQ_ITEMS.map((item, index) => (
                        <FaqItem
                            key={index}
                            item={item}
                            index={index}
                            isOpen={openIndex === index}
                            onToggle={() =>
                                setOpenIndex(openIndex === index ? null : index)
                            }
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FaqSection;