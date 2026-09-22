import { HardHat, AlertTriangle, Clock3 } from "lucide-react";

const GREEN = "#7CB342";
const DARK = "#1E2A22";
const CREAM = "#FBF8F2";

function Beat({ Icon, label, text }) {
    return (
        <div className="flex items-start gap-3 py-3">
            <div
                className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: "#EAF2DD" }}
            >
                <Icon size={16} style={{ color: GREEN }} />
            </div>
            <div>
                <p
                    className="mb-0.5 text-xs font-bold uppercase tracking-wide"
                    style={{ color: GREEN }}
                >
                    {label}
                </p>
                <p className="text-sm leading-relaxed text-neutral-600">
                    {text}
                </p>
            </div>
        </div>
    );
}

function PainPointSection() {
    return (
        <section
            className="relative w-full px-6 py-10 pb-14"
            dir="rtl"
            style={{
                background: "linear-gradient(180deg, #FAFBF7 0%, #F0F3E8 100%)",
            }}
        >
            <div className="mx-auto max-w-lg rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
                <h3
                    className="mb-2 text-lg font-extrabold leading-snug"
                    style={{ color: DARK }}
                >
                    אתם מרגישים שאתם הולכים עם עיניים עצומות
                </h3>

                <div className="divide-y" style={{ borderColor: "#EFEAE0" }}>
                    <Beat
                        Icon={HardHat}
                        label="המצב היום"
                        text="קבלן אחד אומר משהו, השני סותר אותו. האדריכל מדבר בשפה שאתם לא מבינים והמעצבת שואלת שאלות
שאתם לא יודעים מה לענות עליהן."
                    />
                    <Beat
                        Icon={AlertTriangle}
                        label="והכי גרוע"
                        text="כל טעות קטנה יכולה לעלות אלפי שקלים, וכל החלטה לא נכונה יכולה לעכב אתכם שבועות."
                    />
                    <Beat
                        Icon={Clock3}
                        label="ובינתיים"
                        text="המונה של השכירות ממשיך לרוץ — עוד חודש, ועוד חודש.  כסף שנזרק במקום להיכנס למשכנתא."
                    />
                </div>

                <div
                    className="mt-3 rounded-xl border-r-4 px-4 py-3"
                    style={{ backgroundColor: "#EAF2DD", borderColor: GREEN }}
                >
                    <p className="text-sm font-bold" style={{ color: DARK }}>
                        וגם הילדים כבר מרגישים את זה — ושואלים כל פעם מחדש מתי סוף סוף עוברים לבית החדש.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default PainPointSection;