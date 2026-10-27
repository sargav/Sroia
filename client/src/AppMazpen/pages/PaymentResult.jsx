import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, AlertCircle, ArrowLeft, RotateCcw, MessageCircle } from "lucide-react";

/**
 * דף התוצאה של התשלום (תודה / כישלון).
 *
 * את הכתובות מגדירים ב-Cardcom, בהגדרות של כל דף תשלום:
 *   הצלחה:  https://<האתר>/payment-result?status=success&product=mazpen
 *   כישלון: https://<האתר>/payment-result?status=failed&product=mazpen
 *   (לקורס: product=course)
 *
 * התשלום עצמו נפתח בתוך חלון (iframe) באתר. כש-Cardcom מעבירים את החלון לדף הזה,
 * הסקריפט ב-index.html מזהה את זה ומעביר את החלון הראשי לכאן, כך שהדף נטען על כל המסך.
 *
 * חשוב: את status בכתובת אפשר לזייף, ולכן הדף רק מציג הודעה.
 * אישור התשלום האמיתי מגיע לשרת ישירות מ-Cardcom (cardcom-notify), ושם הוא נשמר.
 */

// לאן חוזרים כדי לנסות לשלם שוב, ואיך קוראים למוצר
const PRODUCTS = {
  mazpen: { name: "המצפן לבונה", retry: "/application#pricing" },
  course: { name: "קורס בית בשתי ידיים", retry: "/courses#cta-form" },
};

export default function PaymentResult() {
  const params = new URLSearchParams(window.location.search);
  const ok = params.get("status") === "success";
  const product = PRODUCTS[params.get("product")] || null;

  useEffect(() => {
    // כל מה ש-Cardcom הוסיפו לכתובת (מספר עסקה וכו'), כדי שאפשר יהיה לראות בקונסולה
    console.log("תשובה מחברת האשראי:", Object.fromEntries(params));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.title = ok ? "תודה על הרכישה | סרויה" : "התשלום לא הושלם | סרויה";
  }, [ok]);

  return (
    <div
      dir="rtl"
      className="grid min-h-[75vh] place-items-center bg-[#F5F6F1] px-5 py-14 font-['Heebo',sans-serif] text-[#2D382B]"
    >
      <div className="w-full max-w-lg rounded-[8px_36px_8px_36px] border border-[#D3DECC] bg-white px-6 py-10 text-center shadow-[0_30px_80px_rgba(50,65,43,.12)] md:px-10">
        <span
          className={`mx-auto grid h-16 w-16 place-items-center rounded-full ${
            ok ? "bg-[#E8F0DE] text-[#5A7F43]" : "bg-[#F6ECEC] text-[#A33A3A]"
          }`}
        >
          {ok ? <CheckCircle2 size={32} aria-hidden="true" /> : <AlertCircle size={32} aria-hidden="true" />}
        </span>

        {/* תווית קטנה עם קווים דקים מכל צד */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <span className="h-px w-10 [background-image:linear-gradient(to_left,#8EAD70,transparent)]" />
          <span className="text-xs font-black tracking-[0.18em] text-[#5c7347]">
            {product ? product.name : ok ? "רכישה הושלמה" : "תשלום"}
          </span>
          <span className="h-px w-10 [background-image:linear-gradient(to_right,#8EAD70,transparent)]" />
        </div>

        {/* כותרת בשתי שורות: כהה ואז ירוק */}
        <h1 className="mt-4 text-3xl font-black leading-[1.25] md:text-4xl">
          {ok ? "תודה רבה!" : "התשלום לא הושלם"}
          <span className="mt-1 block text-[#709151]">
            {ok ? "הרכישה התקבלה." : "אפשר לנסות שוב."}
          </span>
        </h1>

        {ok ? (
          <>
            <p className="mx-auto mt-5 max-w-sm text-base font-medium leading-7 text-[#656f62]">
              פרטי הגישה וחשבונית נשלחים אלייך למייל. אם לא הגיעו תוך כמה דקות, כדאי להציץ גם בתיקיית הספאם.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3">
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-full bg-[#5A7F43] px-7 py-3 font-black text-white transition hover:bg-[#4F7239]"
              >
                חזרה לאתר
                <ArrowLeft size={18} aria-hidden="true" />
              </Link>
              <Link to="/contact" className="text-sm font-bold text-[#5c7347] underline-offset-4 hover:underline">
                משהו לא הגיע? צרו קשר
              </Link>
            </div>
          </>
        ) : (
          <>
            <p className="mx-auto mt-5 max-w-sm text-base font-medium leading-7 text-[#656f62]">
              לא בוצע חיוב. ייתכן שהכרטיס נדחה או שהתשלום בוטל, ואפשר לנסות שוב עם אותו כרטיס או עם כרטיס אחר.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3">
              <Link
                to={product ? product.retry : "/"}
                className="inline-flex items-center gap-2 rounded-full bg-[#5A7F43] px-7 py-3 font-black text-white transition hover:bg-[#4F7239]"
              >
                <RotateCcw size={18} aria-hidden="true" />
                {product ? "לנסות לשלם שוב" : "חזרה לאתר"}
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#5c7347] underline-offset-4 hover:underline"
              >
                <MessageCircle size={16} aria-hidden="true" />
                צריכים עזרה בתשלום? צרו קשר
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
