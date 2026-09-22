import { useState } from "react";
const GREEN = "#8DC63F";

function BenefitTermsDialog() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="underline cursor-pointer" style={{ color: GREEN }}            >
                תנאי השימוש
            </button>

            {isOpen && (
                <div className="cursor-default fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div
                        className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 sm:p-8"
                        dir="rtl"
                    >
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute left-4 top-4 text-2xl font-bold text-neutral-400 hover:text-neutral-700 cursor-pointer"
                            aria-label="סגור"
                        >
                            ×
                        </button>

                        <h2 className="mb-1 pr-6 text-xl font-bold text-neutral-800">
                            תנאי שימוש והטבה
                        </h2>

                        <p className="mb-6 text-sm text-neutral-500">
                            הטבת נגב לחברי קהילת בית בשתי ידיים | עודכן: אפריל 2026
                        </p>

                        <div className="space-y-5 text-sm leading-relaxed text-neutral-700">
                            <section>
                                <h3 className="mb-2 font-bold text-neutral-800">
                                    סעיף 1 — מהות ההטבה
                                </h3>
                                <p>
                                    הטבה זו הינה שיתוף פעולה בין קהילת "בית בשתי ידיים" בהובלת אסף סרויה לבין חברת נגב, המאפשרת לחברי הקהילה לקבל הנחה של 10% על רכישה מעל 50,000 ₪ בסניפי נגב. ההטבה ניתנת על ידי חברת נגב בלבד. הקהילה ואסף סרויה הם גורם מקשר בלבד ואינם צד לעסקה.
                                </p>
                            </section>

                            <section>
                                <h3 className="mb-2 font-bold text-neutral-800">
                                    סעיף 2 — אחריות הקהילה ואסף סרויה
                                </h3>
                                <p>
                                    קהילת "בית בשתי ידיים" ואסף סרויה אינם אחראים לטיב החומרים, איכות המוצרים או השירות שיסופקו על ידי חברת נגב, עמידת נגב בתנאי ההטבה, כל נזק שתיגרם כתוצאה מרכישה בנגב, ביטול או שינוי תנאי ההטבה, זמינות מוצרים או מלאי, וכל מחלוקת שתיווצר בין הלקוח לבין חברת נגב.
                                </p>
                            </section>

                            <section>
                                <h3 className="mb-2 font-bold text-neutral-800">
                                    סעיף 3 — זכות ביטול ושינוי המבצע
                                </h3>
                                <p>
                         חברת נגב שומרת לעצמה את הזכות לבטל, לשנות או להתנות את ההטבה בכל עת וללא הודעה מוקדמת, לרבות שינוי אחוז ההנחה, שינוי סכום הרכישה המינימלי, הגבלת ההטבה לסניפים מסוימים, ביטול ההטבה לחלוטין, ושינוי תנאי המתנה הנלווית. הקהילה תעשה מאמץ לעדכן את חבריה בשינויים מהותיים, אך אינה מחויבת לעשות כן.

                                </p>
                            </section>

                            <section>
                                <h3 className="mb-2 font-bold text-neutral-800">
                                    סעיף 4 — תנאי קבלת ההטבה
                                </h3>
                                <p>ההטבה מיועדת לחברי קהילת "בית בשתי ידיים" בלבד.</p>
                                <ul className="mt-2 list-disc space-y-1 pr-5">
                                    <li>ההטבה חלה על רכישה מעל 50,000 ₪ במחיר לפני הנחה.</li>
                                    <li>
                                        ההטבה אינה ניתנת לצבירה עם מבצעים אחרים אלא אם צוין
                                        אחרת על ידי נגב.
                                    </li>
                                    <li>ההטבה אינה ניתנת להמרה במזומן.</li>
                                    <li>
                                        נגב תהיה הגורם המכריע בכל שאלה הנוגעת לתנאי מימוש
                                        ההטבה.
                                    </li>
                                </ul>
                            </section>

                            <section>
                                <h3 className="mb-2 font-bold text-neutral-800">
                                    סעיף 5 — פרטיות ושימוש במידע
                                </h3>
                                <p>
                                   הפרטים שתמסרו בטופס ישמשו אך ורק לצורך תיאום ההטבה מול נגב. הפרטים לא ימכרו ולא יועברו לגורמים שלישיים שאינם קשורים להטבה זו. בכל עת תוכלו לפנות ולבקש מחיקת פרטיכם ממאגר המידע.
                                </p>
                            </section>

                            <section>
                                <h3 className="mb-2 font-bold text-neutral-800">
                                    סעיף 6 — הגבלת אחריות
                                </h3>
                                <p>
                                בהשארת פרטיכם בטופס זה, אתם מאשרים כי קראתם והסכמתם לתנאים אלו, וכי לא תהיינה לכם כל טענות או תביעות כלפי קהילת "בית בשתי ידיים", אסף סרויה, ו/או מי מטעמם. כל תלונה הנוגעת למוצרים, לשירות, או לאיכות החומרים — יש להפנות ישירות לחברת נגב.
                                </p>
                            </section>

                            <section>
                                <h3 className="mb-2 font-bold text-neutral-800">
                                    סעיף 7 — גילוי נאות
                                </h3>
                                <p>
                                    קהילת "בית בשתי ידיים" ואסף סרויה עשויים לקבל עמלה מחברת נגב בגין רכישות שיבוצעו במסגרת הטבה זו. הדבר אינו משפיע על תנאי ההטבה ללקוח ואינו מייקר את מחיר הרכישה.
                                </p>
                            </section>

                            <section>
                                <h3 className="mb-2 font-bold text-neutral-800">
                                    סעיף 8 — יצירת קשר
                                </h3>
                                <p>
                                    לשאלות ניתן לפנות דרך קהילת "בית בשתי ידיים" בוואטסאפ:{" "}
                                    <a
                                        href="https://wa.me/972502201727"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="underline"
                                    >
                                        050-2201727
                                    </a>
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default BenefitTermsDialog;