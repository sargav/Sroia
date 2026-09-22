import { useEffect, useState } from "react";
import {
  BookOpen,
  ClipboardCheck,
  KeyRound,
  Mail,
  MonitorSmartphone,
  ShieldCheck,
  Sparkles,
  X,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import PhotoBackground from "./PhotoBackground";

const PAYMENT_BASE = "https://secure.cardcom.solutions/EA/EA5/aZoY90GJgke3fTZVlqxFnQ/PaymentSP";

const pricingItems = [
  [MonitorSmartphone, "המצפן הדיגיטלי — 5 מודולים, 34 פרקים", "497 ₪"],
  [BookOpen, "מילון המושגים המלא", "97 ₪"],
  [ClipboardCheck, "לוח הרכש החכם", "147 ₪"],
  [Sparkles, "פרק המטבח המיוחד", "197 ₪"],
];

const trust = [
  [ShieldCheck, "תשלום מאובטח"],
  [MonitorSmartphone, "גישה מלאה מהטלפון"],
  [Mail, "פרטי גישה ישירות למייל"],
];

/* צבע הרקע (#F5F6F1) גם בחריצים של הכרטיס, כדי שיתמזגו איתו */
const notch = "absolute h-6 w-6 rounded-full border border-[#D3DECC] bg-[#F5F6F1]";

/**
 * סקשן המחיר, כולל הטופס והתשלום.
 *   <PricingSection />                        (בלי תמונה)
 *   <PricingSection photo={pricingPhoto} />   (עם תמונת רקע)
 * שומר על id="pricing" כדי ש-scrollToPricing ימשיך לעבוד.
 */
export default function PricingSection({ photo }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [paymentUrl, setPaymentUrl] = useState("");
  const [paymentStatus, setPaymentStatus] = useState(null); // null | "success" | "failed"

  // כשהתשלום פתוח במסך מלא: לנעול גלילה של הדף ולאפשר סגירה עם Esc
  useEffect(() => {
    if (!paymentUrl) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event) => event.key === "Escape" && setPaymentUrl("");
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [paymentUrl]);

  // התשובה מחברת האשראי: דף התוצאה (PaymentResult) שולח הודעה לדף הזה, מתוך ה-iframe
  useEffect(() => {
    function onMessage(event) {
      if (event.origin !== window.location.origin) return;
      if (event.data?.type !== "payment-result") return;
      setPaymentStatus(event.data.status === "success" ? "success" : "failed");
      setPaymentUrl("");
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  function handlePayment(event) {
    event.preventDefault();
    if (!fullName.trim() || !email.trim()) return;
    const url = `${PAYMENT_BASE}?subscribers_email=${encodeURIComponent(
      email.trim()
    )}&subscribers_name=${encodeURIComponent(fullName.trim())}`;
    setPaymentStatus(null);
    setPaymentUrl(url);
  }

  return (
    <>
    <section
      id="pricing"
      className="section-pad relative isolate scroll-mt-8 overflow-hidden bg-[#F5F6F1] text-[#2D382B]"
    >
      {/* רקע: תמונה + שכבה לבנה שקופה. בלי תמונה, נשאר רקע אחיד */}
      {photo && (
        <PhotoBackground src={photo} tone="white" strength={70} imgClassName="object-bottom" />
      )}

      <div className="page-wrap">
        <SectionHeading
          eyebrow="מחיר השקה"
          title="כל מה שצריך"
          accent="כדי להתקדם בביטחון."
          description="גישה מלאה למצפן ולכל הבונוסים, מכל מכשיר ובכל שעה."
        />

        <Reveal delay={100}>
          <div className="relative mx-auto max-w-4xl">
            {/* הכרטיס: כמו כרטיס כניסה, שני חלקים עם קו חיתוך */}
            <div className="relative overflow-hidden rounded-[8px_36px_8px_36px] border border-[#D3DECC] bg-white shadow-[0_30px_80px_rgba(50,65,43,.12)] md:grid md:grid-cols-[1.05fr_auto_.95fr]">
              <span className="absolute right-0 top-0 h-[3px] w-20 bg-[#91AF76]" />

              {/* מה מקבלים */}
              <div className="p-6 md:p-10">
                <p className="text-sm font-bold text-[#78965D]">המצפן לבונה — החבילה המלאה</p>
                <h3 className="mt-2 text-2xl font-black text-[#35402F]">כל המודולים וכל הבונוסים</h3>

                <div className="mt-5">
                  {pricingItems.map(([Icon, label, oldPrice]) => (
                    <div
                      key={label}
                      className="flex items-center justify-between gap-3 border-b border-dashed border-[#D3DECC] py-3.5 last:border-0"
                    >
                      <span className="flex items-center gap-3 text-sm font-bold text-[#35402F] md:text-base">
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#E8F0DE] text-[#759855]">
                          <Icon size={17} />
                        </span>
                        {label}
                      </span>
                      <span className="shrink-0 text-sm text-[#6B7567] line-through">{oldPrice}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <span className="rounded-full bg-[#E8F0DE] px-4 py-1.5 text-xs font-black text-[#5f8248]">
                    לזמן מוגבל
                  </span>
                  <p className="mt-4 text-sm font-bold text-[#6B7567]">במקום 938 ₪</p>
                  <p className="mt-1 text-7xl font-black leading-none text-[#2D382B]">
                    297<span className="mr-2 align-top text-2xl">₪</span>
                  </p>
                </div>
              </div>

              {/* קו החיתוך */}
              <div className="relative border-t-2 border-dashed border-[#D3DECC] md:border-l-2 md:border-t-0">
                <span className={`${notch} -left-3 -top-[13px] md:hidden`} />
                <span className={`${notch} -right-3 -top-[13px] md:hidden`} />
                <span className={`${notch} -top-3 left-1/2 hidden -translate-x-1/2 md:block`} />
                <span className={`${notch} -bottom-3 left-1/2 hidden -translate-x-1/2 md:block`} />
              </div>

              {/* הטופס */}
              <div className="flex flex-col justify-center bg-[#F8FAF4] p-6 md:p-10">
                <form onSubmit={handlePayment} className="space-y-4">
                  <label className="block">
                    <span className="mb-2 block text-sm font-black text-[#35402F]">שם מלא</span>
                    <input
                      id="fullName"
                      value={fullName}
                      onChange={(event) => setFullName(event.target.value)}
                      required
                      placeholder="השם שלך"
                      className="w-full rounded-2xl border border-[#D3DECC] bg-white px-4 py-3.5 outline-none transition focus:border-[#759855] focus:ring-4 focus:ring-[#759855]/15"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-black text-[#35402F]">
                      אימייל לקבלת פרטי הגישה
                    </span>
                    <input
                      type="email"
                      dir="ltr"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                      placeholder="your@email.com"
                      className="w-full rounded-2xl border border-[#D3DECC] bg-white px-4 py-3.5 text-left outline-none transition focus:border-[#759855] focus:ring-4 focus:ring-[#759855]/15"
                    />
                  </label>
                  <button
                    type="submit"
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#5A7F43] px-6 py-4 text-lg font-black text-white shadow-[0_14px_35px_rgba(90,127,67,.28)] transition hover:-translate-y-1 hover:bg-[#4F7239]"
                  >
                    <KeyRound size={20} />
                    אני רוצה להצטרף עכשיו
                  </button>
                </form>

                <ul className="mt-6 space-y-3 border-t border-dashed border-[#D3DECC] pt-5">
                  {trust.map(([Icon, label]) => (
                    <li key={label} className="flex items-center gap-3 text-sm font-bold text-[#6B7567]">
                      <span className="grid h-8 w-8 place-items-center rounded-full border border-[#D3DECC] bg-white text-[#759855]">
                        <Icon size={16} />
                      </span>
                      {label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* תוצאת התשלום, כפי שחזרה מחברת האשראי */}
            {paymentStatus && (
              <div
                role="status"
                className={`mt-8 flex items-start gap-3 rounded-[8px_28px_8px_28px] border p-5 md:p-6 ${
                  paymentStatus === "success"
                    ? "border-[#91AF76] bg-[#EEF5E4] text-[#35402F]"
                    : "border-[#E2B9A8] bg-[#FBF1EC] text-[#6B3F2E]"
                }`}
              >
                {paymentStatus === "success" ? (
                  <CheckCircle2 size={24} className="mt-0.5 shrink-0 text-[#5A7F43]" />
                ) : (
                  <AlertCircle size={24} className="mt-0.5 shrink-0 text-[#B5563A]" />
                )}
                <p className="font-black leading-7">
                  {paymentStatus === "success"
                    ? "התשלום התקבל בהצלחה. פרטי הגישה נשלחים למייל."
                    : "התשלום לא הושלם. אפשר לנסות שוב."}
                </p>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>

    {/* תשלום במסך מלא */}
    {paymentUrl && (
      <div
        role="dialog"
        aria-modal="true"
        aria-label="תשלום מאובטח"
        className="fixed inset-0 z-[100] flex flex-col bg-white"
      >
        <div className="flex items-center justify-between border-b border-[#D3DECC] bg-[#F5F6F1] px-4 py-3 md:px-6">
          <p className="font-black text-[#35402F]">השלמת התשלום</p>
          <button
            type="button"
            onClick={() => setPaymentUrl("")}
            className="flex items-center gap-2 rounded-full border border-[#C6D3BB] bg-white px-4 py-2 text-sm font-black text-[#35402F] transition hover:border-[#A6BC95]"
          >
            <X size={16} />
            סגירה
          </button>
        </div>
        <iframe
          src={paymentUrl}
          title="תשלום מאובטח"
          allow="payment"
          className="w-full flex-1 border-0 bg-white"
        />
      </div>
    )}
    </>
  );
}
