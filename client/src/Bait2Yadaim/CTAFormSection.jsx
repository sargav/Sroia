import React, { useRef, useState } from 'react'
import { useNavigate } from "react-router-dom";
import footerBg from './assete/footerBg.png'
import PrivacyPolicyDialog from "../components/PrivacyPolicyDialog";
import TermsOfUseDialog from '../components/TermsOfUseDialog';
import pi4 from './assete/pi4.png'
const GREEN = '#7CB342';

function CTAFormSection() {
    //נוידייט זה דרך ניווט באתר
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", name: "", phone: "" });
    const [agree, setAgree] = useState(false);
    const [errors, setErrors] = useState({});

    const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

    const [submitting, setSubmitting] = useState(false);
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
        setSubmitting(true);
        navigate("/pay"); // ניווט לעמוד התשלום
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
                    alt=" מוקאפ"
                    className="mx-auto w-full max-w-xs"
                    style={{ marginBottom: "-2rem" }}
                />

                <div className="rounded-3xl border border-neutral-200 bg-white p-8 text-center shadow-2xl">

                    <form onSubmit={handleSubmit} className="space-y-4 text-right" noValidate>
                        <div>
                            <label className="mb-1 block text-sm font-bold text-neutral-700">שם:</label>
                            <input
                                type="text"
                                placeholder="ישראל ישראלי"
                                value={form.name}
                                onChange={update("name")}
                                onBlur={handleBlur("name")}
                                className="w-full rounded-xl border px-4 py-3 text-neutral-800 outline-none"
                                style={{ borderColor: errors.name ? "#e05252" : "#ddd" }}
                            />
                            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-bold text-neutral-700">אימייל:</label>
                            <input
                                type="email"
                                placeholder="name@email.com"
                                value={form.email}
                                onChange={update("email")}
                                onBlur={handleBlur("email")}
                                className="w-full rounded-xl border px-4 py-3 text-neutral-800 outline-none"
                                style={{ borderColor: errors.email ? "#e05252" : "#ddd" }}
                            />
                            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-bold text-neutral-700">טלפון:</label>
                            <input
                                type="tel"
                                placeholder="050-1234567"
                                value={form.phone}
                                onChange={update("phone")}
                                onBlur={handleBlur("phone")}
                                className="w-full rounded-xl border px-4 py-3 text-neutral-800 outline-none"
                                style={{ borderColor: errors.phone ? "#e05252" : "#ddd" }}
                            />
                            {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                        </div>

                        <label dir="rtl" className="flex items-center justify-start gap-2 text-sm text-neutral-600">
                            <input
                                type="checkbox"
                                checked={agree}
                                onChange={(e) => setAgree(e.target.checked)}
                            />
                            אני מאשר/ת קבלת תכנים שיווקיים וכי קראתי ואני מאשר/ת את מדיניות הפרטיות ותקנון אתר                            </label>
                        {errors.agree && <p className="text-xs text-red-500">{errors.agree}</p>}
                        {submitError && <p className="text-xs text-red-500">{submitError}</p>}

                        <button
                            type="submit"
                            disabled={submitting || !agree}
                            className="w-full rounded-xl py-4 text-lg font-bold text-white shadow-lg transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:hover:scale-100"
                            style={{ backgroundColor: GREEN, opacity: submitting || !agree ? 0.5 : 1 }}
                        >
                            {submitting ? "שולח..." : "אני רוצה להצטרף לקורס"}
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
    );
}
export default CTAFormSection;