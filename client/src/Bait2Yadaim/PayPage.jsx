import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

// דף התשלום של הקורס.
// הקישור לדף התשלום מגיע מהשרת (דרך הטופס ב-CTAFormSection), ולא כתוב כאן בקוד.
// אם נכנסים לדף ישירות, בלי לעבור בטופס, מפנים חזרה לטופס.
const Pay = () => {
    const { state } = useLocation();
    const paymentUrl = state?.paymentUrl;
    const [status, setStatus] = useState(null); // null | "success" | "failed"

    // בסוף התשלום Cardcom טוענת את דף התוצאה בתוך ה-iframe, והוא שולח לכאן הודעה
    useEffect(() => {
        function onMessage(event) {
            if (event.origin !== window.location.origin) return;
            if (event.data?.type !== "payment-result") return;
            setStatus(event.data.status === "success" ? "success" : "failed");
        }
        window.addEventListener("message", onMessage);
        return () => window.removeEventListener("message", onMessage);
    }, []);

    if (status || !paymentUrl) {
        const ok = status === "success";
        return (
            <div dir="rtl" className="mx-auto max-w-md px-6 py-20 text-center">
                <h1 className="text-2xl font-bold">
                    {ok ? "התשלום התקבל בהצלחה" : status ? "התשלום לא הושלם" : "תשלום עבור הקורס"}
                </h1>
                <p className="mt-3 text-gray-700">
                    {ok
                        ? "תודה! הפרטים נשלחים אליכם למייל."
                        : status
                            ? "לא בוצע חיוב. אפשר לחזור לטופס ולנסות שוב."
                            : "כדי לעבור לתשלום, מלאו קודם את הפרטים בטופס ההרשמה."}
                </p>
                <Link
                    to={ok ? "/" : "/courses#cta-form"}
                    className="mt-6 inline-block rounded-full px-7 py-3 font-bold text-white"
                    style={{ backgroundColor: "#7CB342" }}
                >
                    {ok ? "חזרה לאתר" : "לטופס ההרשמה"}
                </Link>
            </div>
        );
    }

    return (
        <div>
            <h1 className="sr-only">תשלום עבור הקורס בית בשתי ידיים</h1>
            <iframe
                title="טופס תשלום מאובטח"
                src={paymentUrl}
                allow="payment"
                width="100%"
                height="1000px"
                frameBorder="0"
                style={{ border: 'none' }}>
            </iframe>
        </div>
    );
};

export default Pay;
