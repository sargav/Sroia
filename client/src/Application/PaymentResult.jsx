import { useEffect } from "react";
import { CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";

/**
 * דף התוצאה של התשלום. את הכתובת שלו מגדירים בחברת האשראי:
 *   כתובת הצלחה:  https://הדומיין-שלך/payment-result?status=success
 *   כתובת כישלון:  https://הדומיין-שלך/payment-result?status=failed
 *
 * מה הוא עושה:
 * 1. אם נטען בתוך חלון התשלום (iframe): שולח את התוצאה לדף הראשי וסוגר את החלון.
 * 2. אם נפתח כדף רגיל: מציג הודעה ללקוח.
 * 3. תמיד מדפיס לקונסולה את כל הפרמטרים שחברת האשראי החזירה, כדי שתוכלי לראות אותם.
 *
 * חשוב: הפרמטר status ב-URL אפשר לזייף. אל תשחררו גישה למוצר על סמך הדף הזה.
 * את אישור התשלום האמיתי מקבלים מהודעת השרת (webhook) של חברת האשראי.
 */
export default function PaymentResult() {
  const params = new URLSearchParams(window.location.search);
  const status = params.get("status") === "success" ? "success" : "failed";
  const insideFrame = window.self !== window.top;

  useEffect(() => {
    // כל מה שחברת האשראי הוסיפה לכתובת (קוד תשובה, מספר עסקה וכו')
    console.log("תשובה מחברת האשראי:", Object.fromEntries(params));

    if (insideFrame) {
      window.parent.postMessage({ type: "payment-result", status }, window.location.origin);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // בתוך החלון: הדף הראשי מטפל בתוצאה, אין מה להציג
  if (insideFrame) return null;

  const ok = status === "success";

  return (
    <main
      dir="rtl"
      className="grid min-h-screen place-items-center bg-[#F5F6F1] px-5 font-['Heebo',sans-serif] text-[#2D382B]"
    >
      <div className="w-full max-w-md rounded-[8px_36px_8px_36px] border border-[#D3DECC] bg-white p-8 text-center shadow-[0_30px_80px_rgba(50,65,43,.12)] md:p-10">
        <span
          className={`mx-auto grid h-16 w-16 place-items-center rounded-full ${
            ok ? "bg-[#E8F0DE] text-[#5A7F43]" : "bg-[#FBF1EC] text-[#B5563A]"
          }`}
        >
          {ok ? <CheckCircle2 size={32} /> : <AlertCircle size={32} />}
        </span>

        <h1 className="mt-6 text-2xl font-black text-[#35402F]">
          {ok ? "התשלום התקבל בהצלחה" : "התשלום לא הושלם"}
        </h1>
        <p className="mt-3 text-base font-medium leading-7 text-[#6B7567]">
          {ok ? "פרטי הגישה נשלחים אלייך למייל." : "לא בוצע חיוב. אפשר לחזור ולנסות שוב."}
        </p>

        <a
          href="/"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#5A7F43] px-7 py-3 font-black text-white transition hover:bg-[#4F7239]"
        >
          חזרה לאתר
          <ArrowRight size={18} />
        </a>
      </div>
    </main>
  );
}
