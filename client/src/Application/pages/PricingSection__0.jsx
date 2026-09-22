import { useState } from "react";
import {
  BookOpen,
  ClipboardCheck,
  KeyRound,
  Mail,
  MonitorSmartphone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import pricingPhoto from "../assets/backgrounds/pricing-photo.jpg";
import PhotoBackground from "./PhotoBackground";

/* מועבר מ-Index: אפשר למחוק אותו משם */
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

/* צבע הכפתור והמבלטים: ירוק הדף במקום הכתום */
const GREEN = "#5A7F43";
const GREEN_HOVER = "#4F7239";
const PAPER = "#F5F6F1"; // רקע הסקשן, גם צבע החריצים בכרטיס

/**
 * סקשן המחיר, כולל הטופס והתשלום. אין צורך יותר ב-state של התשלום ב-Index.
 *   <PricingSection />
 * שומר על id="pricing" כדי ש-scrollToPricing ימשיך לעבוד.
 */
export default function PricingSection() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [paymentUrl, setPaymentUrl] = useState("");

  function handlePayment(event) {
    event.preventDefault();
    if (!fullName.trim() || !email.trim()) return;
    const url = `${PAYMENT_BASE}?subscribers_email=${encodeURIComponent(
      email.trim()
    )}&subscribers_name=${encodeURIComponent(fullName.trim())}`;
    setPaymentUrl(url);
    window.setTimeout(
      () => document.getElementById("payment-frame")?.scrollIntoView({ behavior: "smooth" }),
      100
    );
  }

  const notch = "absolute h-6 w-6 rounded-full border border-[#D3DECC]";

  return (
    <section
      id="pricing"
      className="section-pad relative isolate scroll-mt-8 overflow-hidden text-[#2D382B] "
      style={{ backgroundColor: PAPER }}
    >
      {/* האיור: תמונה אמיתית בתחתית הסקשן, ברוחב הסקשן ולא פחות מ-1100px */}
      <img
        src={constructionBg}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 -z-10 h-auto w-full min-w-[1100px] max-w-none -translate-x-1/2 select-none"
      />
      <div className="pointer-events-none absolute -right-28 -top-24 -z-10 h-80 w-80 rounded-full bg-[#DFEBD4]/80 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -left-28 -z-10 h-72 w-72 rounded-full bg-[#EDE6DB]/70 blur-3xl" />

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
                <span className={`${notch} -left-3 -top-[13px] md:hidden`} style={{ backgroundColor: PAPER }} />
                <span className={`${notch} -right-3 -top-[13px] md:hidden`} style={{ backgroundColor: PAPER }} />
                <span className={`${notch} -top-3 left-1/2 hidden -translate-x-1/2 md:block`} style={{ backgroundColor: PAPER }} />
                <span className={`${notch} -bottom-3 left-1/2 hidden -translate-x-1/2 md:block`} style={{ backgroundColor: PAPER }} />
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
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 text-lg font-black text-white shadow-[0_14px_35px_rgba(90,127,67,.28)] transition hover:-translate-y-1"
                    style={{ backgroundColor: GREEN }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = GREEN_HOVER)}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = GREEN)}
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


            {/* תשלום */}
            {paymentUrl && (
              <div
                id="payment-frame"
                className="mt-8 scroll-mt-6 rounded-[8px_28px_8px_28px] border border-[#D3DECC] bg-white p-4 shadow-[0_20px_50px_rgba(50,65,43,.10)] md:p-6"
              >
                <div className="mb-3 flex items-center justify-between">
                  <p className="font-black text-[#35402F]">השלמת התשלום</p>
                  <button
                    type="button"
                    onClick={() => setPaymentUrl("")}
                    className="text-sm font-bold text-[#6B7567] underline"
                  >
                    סגירה
                  </button>
                </div>
                <iframe
                  src={paymentUrl}
                  title="תשלום מאובטח"
                  allow="payment"
                  className="h-[760px] w-full rounded-2xl border border-[#D3DECC] bg-[#F5F6F1]"
                />
              </div>
            )}
          </div>
        </Reveal>

        {/* מקום לאיור שבתחתית הסקשן */}
        <div className="h-24 md:h-44" aria-hidden="true" />
      </div>
    </section>
  );
}
