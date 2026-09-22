import React from 'react';
import mockupDevices from "./assets/mockup-devices-real.png";
import todaMockup from "./assets/toda-mockup.png";
import todaCelebrateGif from "./assets/toda-celebrate.gif";
import todaWhatsappBtn from "./assets/toda-whatsapp-button.png";
import todaSketchBg from "./assets/sketch-warm-wide.jpg";

/**
 * דף התודה - עמוד עצמאי לגמרי (לא מקונן בתוך GuidePage).
 * מגיעים אליו דרך ניווט (navigate) אחרי שליחת טופס מוצלחת,
 * לא דרך state מקומי בתוך אותו עמוד - כך שאין תלות בשאר
 * המבנה של דף הנחיתה, ואין סיכוי שהוא "יופיע במקום הלא נכון".
 */
export default function ThankYouPage() {
  return (
    <div dir="rtl" style={{ fontFamily: "'Rubik', 'Arial', sans-serif" }} className="text-neutral-900">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700;800;900&display=swap');`}</style>

      <section className="relative overflow-hidden py-6" style={{ minHeight: "100vh" }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${todaSketchBg})` }}
        />
        <div className="absolute inset-0 bg-white/70" />

        <div className="relative mx-auto max-w-md px-6 pt-10">
          

          <div className="rounded-3xl border border-neutral-200 bg-white p-8 text-center shadow-2xl">
            <div className="py-4 text-center">
              <h3 className="mb-4 text-xl font-bold text-neutral-800">איזה כיף שנרשמתם!</h3>

              <img src={todaMockup} alt="המדריך לבונה" className="mx-auto mb-4 w-full" style={{ maxWidth: "260px" }} />

              <p className="mb-2 text-lg font-bold text-neutral-800">
                המדריך כבר מחכה לכם
                <br />
                בתיבת המייל
              </p>

              <p className="mb-4 text-sm font-bold" style={{ color: "#c0392b" }}>
                אם לא הגיע – שווה לבדוק
                <br />
                גם ספאם או קידומי מכירות.
              </p>

              <img src={todaCelebrateGif} alt="" className="mx-auto mb-3 h-20 w-20" />

              <p className="mb-3 font-bold text-neutral-800">מכאן אנחנו יוצאים לדרך ביחד 💚</p>

              <p className="mb-5 text-sm text-neutral-600">
                הצטרפו לקבוצת הוואטסאפ שלנו לבונים -<br />
                מקום לשתף, לשאול ולקבל תשובות
                <br />
                שיעזרו לכם להתקדם בביטחון ולחסוך עשרות אלפי
                <br />
                שקלים בדרך לבניית הבית שלכם 👇
              </p>

              <a
                href="https://chat.whatsapp.com/GGZb8N0x1941Hy1e2rCCtf"
                target="_blank"
                rel="noopener noreferrer"
                className="mx-auto block w-fit"
              >
                <img src={todaWhatsappBtn} alt="לחצו כאן להצטרפות" className="mx-auto" style={{ maxWidth: "260px" }} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
