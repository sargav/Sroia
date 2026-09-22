import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import api from "../api-config"; // ייבוא הגדרת axios המרכזית

function GallerySection({status}) {
    const scrollRef = useRef(null);
    const [finishedGalleryImages, setFinishedGalleryImages] = useState([]);

    useEffect(() => {
        api
            .get(`/api/images/${status}`) // בקשה לשרת לקבלת התמונות מהתיקייה המתאימה
            .then((res) => {
                const fullUrls = res.data.map((url) => `${api.defaults.baseURL}${url}`);
                setFinishedGalleryImages(fullUrls);
            })
            .catch((err) => console.error("שגיאה בטעינת תמונות:", err));
    }, [status]);

    const scroll = (direction) => {
        if (!scrollRef.current) return;
        scrollRef.current.scrollBy({
            left: direction * 300,
            behavior: "smooth",
        });
    };

    return (
        <section className="relative w-full px-2 py-7" dir="rtl">
            <div className="mx-auto max-w-7xl">
                <div className="relative w-full py-6">
                    <button
                        onClick={() => scroll(1)}
                        type="button"
                        className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full p-2.5 shadow-md transition hover:opacity-90"
                        style={{ backgroundColor: "#7CB342" }}
                    >
                        <ChevronRight size={24} color="white" />
                    </button>
                    <button
                        onClick={() => scroll(-1)}
                        type="button"
                        className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full p-2.5 shadow-md transition hover:opacity-90"
                        style={{ backgroundColor: "#7CB342" }}
                    >
                        <ChevronLeft size={24} color="white" />
                    </button>

                    <div
                        ref={scrollRef}
                        className="no-scrollbar flex gap-4 overflow-x-auto scroll-smooth px-2"
                    >
                        {finishedGalleryImages.map((src, i) => (
                            <img
                                key={i}
                                src={src}
                                alt={`תמונת סיום בנייה ${i + 1}`}
                                className="h-65 w-auto flex-shrink-0 rounded-2xl object-cover shadow-lg ring-2 ring-[#DCEAC7]"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default GallerySection;