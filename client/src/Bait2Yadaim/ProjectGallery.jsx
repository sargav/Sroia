import { useRef } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

/**
 * ProjectGallery
 * variant="raw"     -> גלריית "אמצע בנייה" (תחושה זורמת, גבהים משתנים)
 * variant="project" -> גלריית פרויקט מוגמר (מסגרת, כותרת, גדלים אחידים)
 */
function ProjectGallery({ title, images = [], variant = "raw" }) {
    const scrollRef = useRef(null);

    const scroll = (dir) => {
        scrollRef.current?.scrollBy({ left: dir * 300, behavior: "smooth" });
    };

    const isProject = variant === "project";

    return (
        <div
            className={
                isProject
                    ? "w-full py-6 px-4 bg-neutral-50 rounded-2xl"
                    : "w-full py-4"
            }
        >
            {title && (
                <h3
                    className={
                        isProject
                            ? "text-xl font-semibold mb-3 px-2"
                            : "text-lg font-medium mb-2 px-4 text-neutral-700"
                    }
                >
                    {title}
                </h3>
            )}

            <div className="relative w-full">
                <button
                    onClick={() => scroll(1)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full shadow-md p-2 hover:bg-neutral-100 transition"
                    aria-label="גלול ימינה"
                >
                    <ChevronRight size={24} />
                </button>
                <button
                    onClick={() => scroll(-1)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full shadow-md p-2 hover:bg-neutral-100 transition"
                    aria-label="גלול שמאלה"
                >
                    <ChevronLeft size={24} />
                </button>

                <div
                    ref={scrollRef}
                    className="flex gap-4 overflow-x-auto scroll-smooth px-4 no-scrollbar"
                >
                    {images.map((src, i) => (
                        <img
                            key={i}
                            src={src}
                            alt={`${title || "גלריה"} - תמונה ${i + 1}`}
                            className={
                                isProject
                                    ? "h-72 w-72 flex-shrink-0 rounded-xl object-cover shadow-md"
                                    : "h-64 w-auto flex-shrink-0 rounded-xl object-cover shadow-md"
                            }
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProjectGallery;

/*
דוגמת שימוש:

import gallery_finish from "./data/gallery_finish"; // מערך תמונות של פרויקט גמור
import galleryImages from "./data/galleryImages";   // מערך תמונות אמצע בנייה

<ProjectGallery
    title="בתהליך בנייה"
    images={galleryImages}
    variant="raw"
/>

<ProjectGallery
    title="שם הפרויקט"
    images={gallery_finish}
    variant="project"
/>
*/
