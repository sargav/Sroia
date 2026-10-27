import { useEffect, useState } from 'react';
import { X } from "lucide-react";
import useAccessibleDialog from "../components/useAccessibleDialog";
import footerBg from './assets/footerBg.webp'
import PrivacyPolicyDialog from "../components/PrivacyPolicyDialog";
import TermsOfUseDialog from '../components/TermsOfUseDialog';
import pi4 from './assets/pi4.webp'
const GREEN = '#7CB342';
// דף התשלום של הקורס ב-Cardcom (נפתח בחלון מעל הדף, כמו במצפן)
const PAYMENT_URL = "https://secure.cardcom.solutions/e/nLaM8Ld8qU6GjHF85jqFQ";

function CTAFormSection() {
    // האם חלון התשלום פתוח
    const [paymentOpen, setPaymentOpen] = useState(false);
    const paymentDialogRef = useAccessibleDialog(paymentOpen, () => setPaymentOpen(false));

    // כשהתשלום פתוח: נועלים את הגלילה של הדף שמאחור
    useEffect(() => {
        if (!paymentOpen) return undefined;
        const previous = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = previous;
        };
    }, [paymentOpen]);

    // כשמגיעים עם #cta-form בכתובת (למשל מכפתור "לנסות שוב" בדף התוצאה), גוללים ישר לטופס
    useEffect(() => {
        if (window.location.hash !== "#cta-form") return undefined;
        const timer = setTimeout(() => {
            document.getElementById("cta-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 300);
        return () => clearTimeout(timer);
    }, []);
    const [form, setForm] = useState({ email: "", name: "", phone: "" });
    const [agree, setAgree] = useState(false);
    const [errors, setErrors] = useState({});

    const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

    const [submitError, setSubmitError] = useState("");

    // אימייל: תבנית סטנדרטית - שם@דומיין.סיומת (לפחות 2 תווים בסיומת)
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    // טלפון ישראלי: נייד (05X) או קווי (0X), עם או בלי מקף, עם או בלי קידומת 972+
    const PHONE_REGEX = /^(\+972|0)(([23489]-?\d{7})|(5\d-?\d{7})|(7\d-?\d{7}))$/;

    const validateField = (key, value) => {
        if (key === "name") {
            if (!value.trim()) return "נא למלא שם";
            if (value.trim().length < 2) return "שם קצר מדי";
            return "";
        }
        if (key === "email") {
            const trimmed = value.trim();
            if (!trimmed) return "נא למלא אימייל";
            if (!EMAIL_REGEX.test(trimmed)) return "כתובת אימייל לא תקינה";
            return "";
        }
        if (key === "phone") {
            const cleaned = value.replace(/[\s-]/g, "");
            if (!cleaned) return "נא למלא טלפון";
            if (!PHONE_REGEX.test(cleaned)) return "מספר טלפון לא תקין (לדוגמה: 050-1234567)";
            return "";
        }
        return "";
    };

    const handleBlur = (key) => () => {
        const msg = validateField(key, form[key]);
        setErrors((prev) => ({ ...prev, [key]: msg || undefined }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const next = {};
        const nameErr = validateField("name", form.name);
        const emailErr = validateField("email", form.email);
        const phoneErr = validateField("phone", form.phone);
        if (nameErr) next.name = nameErr;
        if (emailErr) next.email = emailErr;
        if (phoneErr) next.phone = phoneErr;
        if (!agree) next.agree = "יש לאשר קבלת תכנים שיווקיים";
        setErrors(next);
        if (Object.keys(next).length > 0) return;

        setSubmitError("");
        setPaymentOpen(true); // פותחים את התשלום בחלון מעל הדף
        // try {
        //     // כאן תוכל להוסיף את הלוגיקה לשליחת הנתונים לשרת בנוסף
        //     navigate("/thank-you");
        // } catch (err) {
        //     setSubmitError("משהו השתבש בשליחה, נסו שוב בעוד רגע.");
        // } finally {
        //     setSubmitting(false);
        // }
    };

    return (
        <>
        <section id="cta-form" className="relative overflow-hidden py-6" 
        style={{ backgroundImage: `url(${footerBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
        
            <div
                className="absolute inset-0 bg-cover bg-center"
            // style={{ backgroundImage: `url(${heroBg})` }}
            />
            <div className="absolute inset-0 bg-white/70" />

            <div className="relative mx-auto max-w-md px-6">
                <img
                    src={pi4}
                    alt="הקורס בית בשתי ידיים על מסכי מחשב וטלפון"
                    className="mx-auto w-full max-w-xs"
                    style={{ marginBottom: "-2rem" }}
                />

                <div className="rounded-3xl border border-neutral-200 bg-white p-8 text-center shadow-2xl">

                    <form onSubmit={handleSubmit} className="space-y-4 text-right" noValidate dir="rtl">
                        <div>
                            <label htmlFor="course-name" className="mb-1 block text-sm font-bold text-neutral-700">שם:</label>
                            <input
                      id="course-name"
                      name="name"
                      autoComplete="name"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "course-name-error" : undefined}
                                type="text"
                                placeholder="ישראל ישראלי"
                                value={form.name}
                                onChange={update("name")}
                                onBlur={handleBlur("name")}
                                className="w-full rounded-xl border px-4 py-3 text-neutral-800 outline-none focus-visible:ring-2 focus-visible:ring-[#3f6b1a] focus-visible:ring-offset-1"
                                style={{ borderColor: errors.name ? "#e05252" : "#ddd" }}
                            />
                            {errors.name && <p id="course-name-error" role="alert" className="mt-1 text-xs text-red-700">{errors.name}</p>}
                        </div>
                        <div>
                            <label htmlFor="course-email" className="mb-1 block text-sm font-bold text-neutral-700">אימייל:</label>
                            <input
                      id="course-email"
                      name="email"
                      autoComplete="email"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "course-email-error" : undefined}
                                type="email"
                                placeholder="name@email.com"
                                value={form.email}
                                onChange={update("email")}
                                onBlur={handleBlur("email")}
                                className="w-full rounded-xl border px-4 py-3 text-neutral-800 outline-none focus-visible:ring-2 focus-visible:ring-[#3f6b1a] focus-visible:ring-offset-1"
                                style={{ borderColor: errors.email ? "#e05252" : "#ddd" }}
                            />
                            {errors.email && <p id="course-email-error" role="alert" className="mt-1 text-xs text-red-700">{errors.email}</p>}
                        </div>
                        <div>
                            <label htmlFor="course-phone" className="mb-1 block text-sm font-bold text-neutral-700">טלפון:</label>
                            <input
                      id="course-phone"
                      name="phone"
                      autoComplete="tel"
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? "course-phone-error" : undefined}
                                type="tel"
                                placeholder="050-1234567"
                                value={form.phone}
                                onChange={update("phone")}
                                onBlur={handleBlur("phone")}
                                className="w-full rounded-xl border px-4 py-3 text-neutral-800 outline-none focus-visible:ring-2 focus-visible:ring-[#3f6b1a] focus-visible:ring-offset-1"
                                style={{ borderColor: errors.phone ? "#e05252" : "#ddd" }}
                            />
                            {errors.phone && <p id="course-phone-error" role="alert" className="mt-1 text-xs text-red-700">{errors.phone}</p>}
                        </div>

                        <label dir="rtl" className="flex items-center justify-start gap-2 text-sm text-neutral-600">
                            <input
                                type="checkbox"
                                checked={agree}
                                onChange={(e) => setAgree(e.target.checked)}
                            />
                            אני מאשר/ת קבלת תכנים שיווקיים וכי קראתי ואני מאשר/ת את מדיניות הפרטיות ותקנון אתר                            </label>
                        {errors.agree && <p id="course-agree-error" role="alert" className="text-xs text-red-700">{errors.agree}</p>}
                        {submitError && <p role="alert" className="text-xs text-red-700">{submitError}</p>}

                        <button
                            type="submit"
                            disabled={!agree}
                            className="w-full rounded-xl py-4 text-lg font-bold text-[#1a1a1a] shadow-lg transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:hover:scale-100"
                            style={{ backgroundColor: GREEN, opacity: !agree ? 0.5 : 1 }}
                        >
                            אני רוצה להצטרף לקורס
                        </button>

                    </form>

                    <p dir='rtl' className="mt-6 text-sm text-neutral-500">
                        יש שאלות? אנחנו כאן בשבילכם:{" "}
                        <a href="mailto:baitb2yadayim@gmail.com" className="underline">
                            baitb2yadayim@gmail.com
                        </a>
                        <br />

                        כל התשלומים מאובטחים ומוצפנים.
                        <br />
                        המידע האישי שלכם מוגן לחלוטין.
                        <br /><br />
                        <p><TermsOfUseDialog /> | <PrivacyPolicyDialog /></p>
                    </p>



                </div>
            </div>
        </section>

        {/* תשלום במסך מלא, עם כפתור סגירה (כמו במצפן) */}
        {paymentOpen && (
            <div
                ref={paymentDialogRef}
                tabIndex={-1}
                role="dialog"
                aria-modal="true"
                aria-label="תשלום מאובטח"
                dir="rtl"
                className="fixed inset-0 z-[100] flex flex-col bg-white"
            >
                <div className="flex items-center justify-between border-b border-[#D3DECC] bg-[#F5F6F1] px-4 py-3 md:px-6">
                    <p className="font-black text-[#35402F]">השלמת התשלום</p>
                    <button
                        type="button"
                        onClick={() => setPaymentOpen(false)}
                        className="flex items-center gap-2 rounded-full border border-[#C6D3BB] bg-white px-4 py-2 text-sm font-black text-[#35402F] transition hover:border-[#A6BC95]"
                    >
                        <X size={16} />
                        סגירה
                    </button>
                </div>
                <iframe
                    src={PAYMENT_URL}
                    title="תשלום מאובטח"
                    allow="payment"
                    referrerPolicy="strict-origin-when-cross-origin"
                    className="w-full flex-1 border-0 bg-white"
                />
            </div>
        )}
        </>
    );
}

export default CTAFormSection;