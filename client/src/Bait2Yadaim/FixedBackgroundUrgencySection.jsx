import React from "react";
import { AlertTriangle } from "lucide-react";

import BACKGROUND_IMAGE_URL from './assete/vieww.webp';
import num1 from './assete/1.webp';
import num2 from './assete/2.webp';
import num3 from './assete/3.webp';

const reasons = [
  {
    img: num1,
    title: "העלויות שלנו עולות -",
    text: "ככל שיותר אנשים מצטרפים, אנחנו צריכים יותר תמיכה ומענה לשאלות.",
  },
  {
    img: num2,
    title: "הערך רק גדל -",
    text: "אנחנו מוסיפים תכנים ועדכונים כל הזמן. מי שנרשם עכשיו מקבל את כל העדכונים העתידיים בחינם.",
  },
  {
    img: num3,
    title: "מחירי הבנייה עולים -",
    text: "כל חודש שאתם מחכים, הבנייה נהיית יקרה יותר. והטעויות? יקרות יותר.",
  },
];

const warnings = [
  'כל יום של היסוס = עוד החלטה לא מושכלת',
  'כל שבוע של דחייה = עוד פגישה עם קבלן בלי להבין מה הוא אומר',
  'כל חודש של "אחר כך" = עוד עשרות אלפי שקלים בטעויות',
];

export default function FixedBackgroundUrgencySection() {
  return (
    <section
      dir="rtl"
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
      }}
    >
      {/* Fixed background layer */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${BACKGROUND_IMAGE_URL})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          zIndex: 0,
        }}
      />

      {/* Scrolling dark overlay, sits above the fixed image */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          background: "rgba(10, 15, 12, 0.72)",
          padding: "90px 24px",
        }}
      >
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <h2
            style={{
              fontSize: 24,
              fontWeight: 800,
              color: "#7cb342",
              lineHeight: 1.5,
              margin: "0 0 13px",
            }}
          >
            אבל יש משהו שחשוב שתדעו:
          </h2>
          <p style={{ fontSize: 20, fontWeight: 700, color: "#ffffff", margin: "0 0 20px" }}>
            המחיר הזה לא יחזיק מעמד לנצח.
          </p>
          <p style={{ fontSize: 17, fontWeight: 700, color: "#ffffff", margin: "0 0 25px" }}>
            הנה הסיבות:
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 30, marginBottom: 70 }}>
            {reasons.map((r, index) => (
              <div key={index}>
               <img
                  src={r.img}
                  alt={`סיבה ${index + 1}`}
                  style={{
                    width: "120px",
                    height: "auto",
                    marginBottom: 6,
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto", // ממרכז את התמונה אופקית
                  }}
                />
                <div style={{ fontSize: 17, fontWeight: 700, color: "#7cb342", marginBottom: 10 }}>
                  {r.title}
                </div>
                <div style={{ fontSize: 16, color: "#e9e9e4", lineHeight: 1.7 }}>{r.text}</div>
              </div>
            ))}
          </div>

          <p style={{ fontSize: 17, fontWeight: 700, color: "#ffffff", lineHeight: 1.8, margin: "0 0 6px" }}>
            בחודש הבא המחיר עולה ל-2,700 ₪.
          </p>
          <p style={{ fontSize: 16, color: "#d9d9d4", margin: "0 0 40px" }}>
            ואם אתם חושבים "אחשוב על זה ואחזור"...
          </p>

          <p style={{ fontSize: 17, fontWeight: 700, color: "#ffffff", margin: "0 0 10px" }}>
            תחשבו על זה:
          </p>
          <p style={{ fontSize: 18, fontWeight: 800, color: "#7cb342", lineHeight: 1.7, margin: "0 0 50px" }}>
            הזמן הכי טוב להצטרף היה אתמול.
            <br />
            השני הכי טוב? עכשיו.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 20, textAlign: "right" }}>
            {warnings.map((w, i) => (
              <div key={i} style={{ display: "flex",flexDirection:"row-reverse", gap: 14, alignItems: "flex-start" ,marginRight:"auto",marginLeft:"auto"}}>
                <span style={{ fontSize: 15, color: "#e9e9e4", lineHeight: 1.7, flex: 1 }}>
                  {w}
                </span>
                <AlertTriangle color="#e6c34a" size={22} style={{ flexShrink: 0 }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}