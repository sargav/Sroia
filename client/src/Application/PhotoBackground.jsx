/**
 * רקע צילום לסקשן, באותה שיטה שעבדנו בה בעבר:
 * תמונה על כל הסקשן + שכבה שקופה מעליה, לבנה או שחורה, ואפשר גם טשטוש קל.
 *
 * שימוש: כילד ראשון בתוך <section className="relative isolate overflow-hidden ...">
 *   <PhotoBackground src={photo} tone="white" strength={60} />
 *   <PhotoBackground src={photo} tone="black" strength={60} blur />
 *
 * props:
 *  src       נתיב התמונה
 *  tone      "white" (סקשן בהיר, טקסט כהה)  |  "black" (סקשן כהה, טקסט לבן)
 *  strength  עוצמת השכבה באחוזים. כמה שיותר גבוה, כך התמונה חלשה יותר
 *            לבן: 30 / 50 / 60 / 70 / 80 / 90    שחור: 30 / 40 / 50 / 55 / 60 / 65 / 70 / 80
 *  blur      true = טשטוש קל של התמונה מאחורי השכבה (backdrop-blur-sm)
 *  position  איזה חלק בתמונה נשאר בפריים ("center", "center bottom", "center 60%")
 */
const LAYERS = {
  white: {
    30: "bg-white/30",
    50: "bg-white/50",
    60: "bg-white/60",
    70: "bg-white/70",
    80: "bg-white/80",
    90: "bg-white/90",
  },
  black: {
    30: "bg-black/30",
    40: "bg-black/40",
    50: "bg-black/50",
    55: "bg-black/55",
    60: "bg-black/60",
    65: "bg-black/65",
    70: "bg-black/70",
    80: "bg-black/80",
  },
};

export default function PhotoBackground({
  src,
  tone = "white",
  strength = 60,
  blur = false,
  position = "center",
  className = "",
}) {
  const layer = LAYERS[tone]?.[strength] ?? LAYERS.white[60];

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
    >
      <img
        src={src}
        alt=""
        className="h-full w-full object-cover"
        style={{ objectPosition: position }}
      />
      <div className={`absolute inset-0 ${layer} ${blur ? "backdrop-blur-sm" : ""}`} />
    </div>
  );
}
