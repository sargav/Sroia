import { useEffect, useState } from "react";
import { MessageSquareQuote, X, ZoomIn } from "lucide-react";
import api from "../api-config";

function RecommendationsSection() {
    const [recommendationImages, setRecommendationImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getRecommendationImages = async () => {
            try {
                /*
                 * השרת צריך לקבל status בשם recommendations
                 * ולקרוא את התמונות מהתיקייה המתאימה בתוך public.
                 */
                const response = await api.get("/api/images/Testimonials");

                const fullUrls = response.data.map((url) => {
                    // אם השרת כבר החזיר כתובת מלאה
                    if (url.startsWith("http")) {
                        return url;
                    }

                    const baseURL = api.defaults.baseURL.replace(/\/$/, "");
                    const imagePath = url.startsWith("/") ? url : `/${url}`;

                    return `${baseURL}${imagePath}`;
                });

                setRecommendationImages(fullUrls);
            } catch (error) {
                console.error("שגיאה בטעינת תמונות ההמלצות:", error);
            } finally {
                setIsLoading(false);
            }
        };

        getRecommendationImages();
    }, []);

    useEffect(() => {
        const closeWithEscape = (event) => {
            if (event.key === "Escape") {
                setSelectedImage(null);
            }
        };

        window.addEventListener("keydown", closeWithEscape);

        return () => {
            window.removeEventListener("keydown", closeWithEscape);
        };
    }, []);

    return (
        <>
            <section
                dir="rtl"
                className="relative overflow-hidden bg-gradient-to-b from-[#F7FAF2] via-white to-[#F2F7EA] px-4 py-20 sm:px-6 lg:px-8"
            >
                {/* קישוטי רקע */}
                <div className="pointer-events-none absolute -right-24 top-12 h-72 w-72 rounded-full bg-[#A8D66D]/15 blur-3xl" />

                <div className="pointer-events-none absolute -left-24 bottom-8 h-80 w-80 rounded-full bg-[#DDEBC9]/40 blur-3xl" />

                <div className="relative mx-auto max-w-7xl">
                    {/* כותרת האזור */}
                    <div className="mx-auto mb-12 max-w-3xl text-center">
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#7CB342]/20 bg-white px-4 py-2 text-sm font-bold text-[#5E8E2E] shadow-sm">
                            <MessageSquareQuote size={18} />

                            תגובות אמיתיות ממשתתפי הקורס
                        </div>

                        <h2 className="text-3xl font-extrabold leading-tight text-[#1E2B18] sm:text-4xl lg:text-5xl">
                            מה אומרים המשתתפים?
                        </h2>

                        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#5C6657] sm:text-lg">
                            אנשים שכבר בחרו ללמוד, להבין את התהליך ולקבל
                            החלטות בצורה מסודרת ובטוחה יותר.
                        </p>

                        <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-[#7CB342]" />
                    </div>

                    {/* מצב טעינה */}
                    {isLoading && (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {[1, 2, 3].map((item) => (
                                <div
                                    key={item}
                                    className="h-80 animate-pulse rounded-3xl bg-[#E7EEDD]"
                                />
                            ))}
                        </div>
                    )}

                    {/* אין תמונות */}
                    {!isLoading && recommendationImages.length === 0 && (
                        <div className="rounded-3xl border border-[#DDE8CF] bg-white p-10 text-center shadow-sm">
                            <p className="text-[#5C6657]">
                                המלצות חדשות יופיעו כאן בקרוב.
                            </p>
                        </div>
                    )}

                    {/* גלריית המלצות */}
                    {!isLoading && recommendationImages.length > 0 && (
                        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
                            {recommendationImages.map((src, index) => (
                                <button
                                    key={src}
                                    type="button"
                                    onClick={() => setSelectedImage(src)}
                                    className="group relative mb-6 block w-full break-inside-avoid overflow-hidden rounded-[28px] border border-[#DDE8CF] bg-white p-3 text-right shadow-[0_15px_45px_rgba(48,75,29,0.10)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(48,75,29,0.16)]"
                                    aria-label={`פתיחת המלצה מספר ${index + 1}`}
                                >
                                    <div className="relative overflow-hidden rounded-[20px] bg-[#F5F7F1]">
                                        <img
                                            src={src}
                                            alt={`המלצה של משתתף בקורס ${
                                                index + 1
                                            }`}
                                            loading="lazy"
                                            className="block h-auto w-full transition duration-500 group-hover:scale-[1.02]"
                                        />

                                        <div className="absolute inset-0 flex items-center justify-center bg-[#17210F]/0 transition duration-300 group-hover:bg-[#17210F]/15">
                                            <span className="scale-75 rounded-full bg-white/95 p-3 text-[#5F922E] opacity-0 shadow-lg transition duration-300 group-hover:scale-100 group-hover:opacity-100">
                                                <ZoomIn size={23} />
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 px-2 pb-2 pt-4">
                                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EAF4DC] text-[#689E35]">
                                            <MessageSquareQuote size={18} />
                                        </span>

                                        <div>
                                            <p className="font-bold text-[#283521]">
                                                משתתף בקורס
                                            </p>

                                            <p className="mt-0.5 text-xs text-[#75806E]">
                                                המלצה שנשלחה לאחר הלמידה
                                            </p>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* פתיחת התמונה בגודל גדול */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
                    onClick={() => setSelectedImage(null)}
                    role="dialog"
                    aria-modal="true"
                    aria-label="תצוגת המלצה מוגדלת"
                >
                    <button
                        type="button"
                        onClick={() => setSelectedImage(null)}
                        className="absolute right-5 top-5 rounded-full bg-white p-3 text-[#26331F] shadow-lg transition hover:bg-[#EEF5E5]"
                        aria-label="סגירת התמונה"
                    >
                        <X size={24} />
                    </button>

                    <img
                        src={selectedImage}
                        alt="המלצה מוגדלת"
                        onClick={(event) => event.stopPropagation()}
                        className="max-h-[88vh] max-w-full rounded-2xl object-contain shadow-2xl"
                    />
                </div>
            )}
        </>
    );
}

export default RecommendationsSection;