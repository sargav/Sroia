import React from "react";

// Card-style guarantee badge, built the same way as the "מצב 1 / מצב 2"
// cards: dark rounded card, a big faded number bleeding off the top corner,
// a small colored eyebrow label, a bold heading, and supporting lines below.
// Uses the page's own green (#7cb342) as the accent so it stays consistent
// with the checkmarks elsewhere on the page.

function GuaranteeCard() {
    return (
        <div
            style={{
                position: "relative",
                overflow: "hidden",
                background: "#1c2b23",
                borderRadius: 20,
                marginTop:30,
                padding: "38px 64px 38px",
                textAlign: "right",
                maxWidth: 520,
                margin: "0 auto",
                transform: "rotate(-2.5deg)",
                boxShadow: "0 18px 34px rgba(0,0,0,0.18)",
            }}
        >
            <span
                aria-hidden="true"
                style={{
                    position: "absolute",
                    top: -22,
                    right: 14,
                    fontSize: 134,
                    fontWeight: 900,
                    lineHeight: 1,
                    color: "rgba(255,255,255,0.06)",
                    fontFamily: "Arial, sans-serif",
                    userSelect: "none",
                }}
            >
                100
            </span>

            <div style={{ position: "relative" }}>
                <div
                    style={{
                        fontSize: 13,
                        fontWeight: 800,
                        color: "#9ed15c",
                        letterSpacing: 0.3,
                        marginBottom: 10,
                    }}
                >
                    אחריות מלאה
                </div>
                <h3
                    style={{
                        fontSize: 27,
                        fontWeight: 800,
                        color: "#ffffff",
                        margin: "0 0 14px",
                        lineHeight: 1.35,
                    }}
                >
                    100% החזר כספי
                </h3>
                <p style={{ fontSize: 15, color: "#cfd8d0", margin: "0 0 6px", lineHeight: 1.7 }}>
                    תוך 30 יום מהרכישה
                </p>
                <p style={{ fontSize: 15, color: "#cfd8d0", margin: 0, lineHeight: 1.7 }}>
                    בלי שאלות, בלי תירוצים.
                </p>
            </div>
        </div>
    );
}

function CheckIcon() {
    return (
        <span
            style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 20,
                height: 20,
                borderRadius: "50%",
                background: "#7cb342",
                flexShrink: 0,
                marginTop: 2,
            }}
        >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                <path
                    d="M20 6L9 17l-5-5"
                    stroke="#ffffff"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </span>
    );
}

const points = [
    "נסו את הקורס למשך 30 יום מלאים. צפו בשיעורים. השתמשו בכלים.",
    "תשאלו שאלות ותקבלו מענה מלא.",
    'אם זה לא בשבילכם - פשוט תשלחו מייל ותקבלו החזר מלא. בלי שאלות, בלי תירוצים, בלי "אבל".',
];

export default function Guarant() {
    return (
        <section
            dir="rtl"
            style={{
                width: "100%",
                background: "#f4f2e8",
                fontFamily: "Arial, sans-serif",
                padding: "64px 20px",
                boxSizing: "border-box",
            }}
        >
            <p dir="rtl" className="text-center text-xl font-bold mb-7 ">
                הערבות שלנו:
                <br />
                30 יום החזר כספי מלא</p>
            <div style={{ maxWidth: 620, margin: "0 auto" }}>
                <div style={{ textAlign: "center", marginBottom: 28 }}>
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: 22 }}>
                        <GuaranteeCard />
                    </div>
                    <h2
                        style={{
                            fontSize: 23,
                            fontWeight: 800,
                            color: "#14202c",
                            lineHeight: 1.55,
                            margin: 0,
                        }}
                    >
                        אנחנו כל כך מאמינים בערך של הקורס,
                        <br />
                        שאנחנו לוקחים את כל הסיכון על עצמנו.
                    </h2>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 30 }}>
                    {points.map((p, i) => (
                        <div
                            key={i}
                            style={{
                                display: "flex",
                                gap: 12,
                                alignItems: "flex-start",
                                textAlign: "right",
                            }}
                        >
                            <CheckIcon />
                            <span style={{ fontSize: 15.5, color: "#3a3a36", lineHeight: 1.7 }}>{p}</span>
                        </div>
                    ))}
                </div>

                <div
                    style={{
                        textAlign: "center",
                        fontSize: 15.5,
                        lineHeight: 1.8,
                        color: "#6b6b63",
                        paddingTop: 22,
                        borderTop: "1px solid #e3e0d2",
                    }}
                >
                    כי אנחנו יודעים שברגע שתתחילו ללמוד, תבינו כמה ערך יש פה —
                    <br />
                    <span style={{ color: "#14202c", fontWeight: 700 }}>
                        הסיכון היחיד שלכם הוא להישאר בלי הידע הזה.
                    </span>
                </div>
            </div>
        </section>
    );
}
