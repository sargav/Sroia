import {
    Search,
    Video,
    Users,
    Route,
    ListChecks,
    Map,
    ArrowDown,
    Compass,
    Lightbulb,
} from "lucide-react";
import StatsSection from "./StatsSection";

const GREEN = "#7CB342";
const DARK = "#1E2A22";
const CREAM = "#FBF8F2";
const BLACK = "#1A1A1A";

function SourcePill({ Icon, label }) {
    return (
        <div className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-sm ring-1 ring-black/5">
            <Icon size={13} style={{ color: GREEN }} />
            <span className="text-xs font-bold text-neutral-600">{label}</span>
        </div>
    );
}

function VoiceBubble({ text, side }) {
    const isRight = side === "right";
    return (
        <div className={`flex ${isRight ? "justify-start" : "justify-end"}`}>
            <div
                className="max-w-[80%] rounded-2xl px-4 py-2.5 text-sm font-medium leading-snug"
                style={{
                    backgroundColor: isRight ? "#EAF2DD" : "#FFFFFF",
                    color: DARK,
                    border: isRight ? "none" : "1px solid #EFEAE0",
                    borderTopLeftRadius: isRight ? "0.75rem" : "0.25rem",
                    borderTopRightRadius: isRight ? "0.25rem" : "0.75rem",
                }}
            >
                {text}
            </div>
        </div>
    );
}

function VsDivider() {
    return (
        <div className="flex items-center justify-center gap-2 py-0.5">
            <div className="h-px flex-1" style={{ backgroundColor: "#E5E9DA" }} />
            <span
                className="text-[10px] font-extrabold tracking-widest"
                style={{ color: "#C7CBB8" }}
            >
                מול
            </span>
            <div className="h-px flex-1" style={{ backgroundColor: "#E5E9DA" }} />
        </div>
    );
}

function ConfusionBox() {
    return (
        <div
            className="relative overflow-hidden rounded-2xl border-r-4 px-5 py-6 text-center"
            style={{ backgroundColor: "#FFFFFF", borderColor: GREEN }}
        >
            {/* סימן שאלה ענק כרקע דקורטיבי */}
            <span
                className="pointer-events-none absolute -right-3 -top-6 select-none text-[8rem] font-black leading-none"
                style={{ color: "#EAF2DD", zIndex: 0 }}
                aria-hidden="true"
            >
                ?
            </span>

            <div className="relative z-10">
                <p className="mb-1 text-sm font-extrabold" style={{ color: DARK }}>
                    ואתם? יושבים באמצע ולא יודעים למי להאמין.
                </p>
                <p className="text-sm leading-relaxed text-neutral-600">
                    כל עצה שאתם מקבלים יכולה להיות נכונה... או לעלות לכם ביוקר.
                    כל החלטה מרגישה כמו הימור. וכל טעות? היא על חשבונכם.
                </p>
            </div>
        </div>
    );
}

function RealProblemBox() {
    return (
        <div className="relative mx-auto max-w-lg overflow-hidden rounded-2xl bg-white p-7 text-center shadow-sm ring-1 ring-black/5">
            {/* נורה - מסמלת את "הבעיה האמיתית" שמתגלה */}
            <div className="mb-4 flex justify-center">
                <div
                    className="flex h-12 w-12 items-center justify-center rounded-full"
                    style={{ backgroundColor: "#EAF2DD" }}
                >
                    <Lightbulb size={22} style={{ color: GREEN }} strokeWidth={1.75} />
                </div>
            </div>

            <p className="mb-3 text-sm leading-relaxed text-neutral-600">
                והבעיה האמיתית היא לא שאין מידע באינטרנט.
            </p>
            <p className="text-lg font-extrabold leading-snug" style={{ color: DARK }}>
                הבעיה היא שאין לאף אחד אינטרס
                <br />
                לסדר לכם את המידע בצורה הנכונה.
            </p>
        </div>
    );
}

function ProblemPoint({ Icon, number, text, isLast }) {
    return (
        <div className="relative flex flex-1 flex-col items-center gap-3 text-center">
            <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold" style={{ color: GREEN }}>
                    {number}
                </span>
                {/* עיגול מקווקו וריק + קו חוצה = "זה לא קיים" */}
                <div
                    className="relative flex h-11 w-11 items-center justify-center rounded-full border-2 border-dashed"
                    style={{ borderColor: "#C7CBB8" }}
                >
                    <Icon size={18} style={{ color: "#B7BBA6" }} strokeWidth={1.75} />
                    <div
                        className="absolute h-[1.5px] w-[70%] rotate-45"
                        style={{ backgroundColor: "#C7CBB8" }}
                    />
                </div>
            </div>
            <p className="text-sm leading-relaxed text-neutral-600">
                <span className="font-extrabold" style={{ color: DARK }}>
                    אף אחד
                </span>
                {text}
            </p>

            {!isLast && (
                <div
                    className="absolute top-5 hidden h-px sm:block"
                    style={{
                        right: "calc(-50% + 20px)",
                        width: "calc(100% - 40px)",
                        backgroundImage:
                            "repeating-linear-gradient(to left, #D8DCC8 0, #D8DCC8 4px, transparent 4px, transparent 9px)",
                    }}
                />
            )}
        </div>
    );
}

function ProblemNarrativeSection() {
    return (
        <div dir="rtl" style={{ backgroundColor: CREAM }}>
            <StatsSection />

            {/* הבאנר - "כך כולם עושים" */}
            <div className="flex justify-center px-6 pt-10">
                <div
                    className="relative flex items-center gap-3 px-9 py-4"
                    style={{
                        backgroundColor: BLACK,
                        clipPath:
                            "polygon(3% 0%, 97% 0%, 100% 50%, 97% 100%, 3% 100%, 0% 50%)",
                    }}
                >
                    <Compass size={20} style={{ color: GREEN }} className="flex-shrink-0" />
                    <p
                        className="text-base font-bold leading-snug md:text-lg"
                        style={{ color: CREAM }}
                    >
                        וכך אתם עושים בדיוק מה שכל בונה בית עושה
                    </p>
                </div>
            </div>

            {/* קטע ההתנהגות הנפוצה - בלבול מקורות */}
            <div className="mx-auto max-w-lg px-6 py-12">
                <div className="mb-6 flex flex-wrap items-center justify-center gap-2.5">
                    <SourcePill Icon={Search} label="גוגל" />
                    <SourcePill Icon={Video} label="יוטיוב" />
                    <SourcePill Icon={Users} label="קבוצות פייסבוק" />
                </div>

                <p
                    className="mb-8 text-center text-base font-extrabold leading-snug"
                    style={{ color: DARK }}
                >
                    ומקבלים 1,000 תשובות סותרות
                    <br />
                    שרק מבלבלות אתכם יותר.
                </p>

                {/* וויכוח קולות עם מפריד "מול" */}
                <div className="mb-8 space-y-1.5">
                    <VoiceBubble side="right" text='"חייבים חימום תת רצפתי!"' />
                    <VsDivider />
                    <VoiceBubble side="left" text='"זה בזבוז כסף מוחלט"' />
                    <div className="h-3" />
                    <VoiceBubble side="right" text='"תשלמו לקבלן 20% מראש"' />
                    <VsDivider />
                    <VoiceBubble side="left" text='"לעולם לא לשלם לפני ביצוע!"' />
                </div>

                <ConfusionBox />
            </div>

            {/* קטע "הבעיה האמיתית" */}
            <div className="px-6 pb-16">
                <RealProblemBox />

                <div className="mx-auto mt-10 max-w-lg">
                    <div className="flex flex-col gap-8 sm:flex-row sm:gap-4">
                        <ProblemPoint
                            Icon={Route}
                            number="01"
                            text=" לא ייקח אתכם מהשלב הראשון עד הסוף."
                        />
                        <ProblemPoint
                            Icon={ListChecks}
                            number="02"
                            text=" לא יגיד לכם מה עושים ראשון, שני, שלישי."
                        />
                        <ProblemPoint
                            Icon={Map}
                            number="03"
                            text=" לא יסביר לכם את כל התמונה - מהרכישה של המגרש ועד קבלת המפתח."
                            isLast
                        />
                    </div>

                    <div className="mt-10 flex flex-col items-center gap-2">
                        <ArrowDown size={18} style={{ color: GREEN }} />
                        <p className="text-2xl font-extrabold" style={{ color: DARK }}>
                            עד עכשיו.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProblemNarrativeSection;