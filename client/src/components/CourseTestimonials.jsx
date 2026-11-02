import { useEffect, useState } from "react";
import { Compass, Play, Video, MessageCircle, ZoomIn, X } from "lucide-react";
import api from "../api-config";
import useAccessibleDialog from "./useAccessibleDialog";
import { normalizeSiteImages } from "../utils/siteImages";

const GREEN = "#7CB342";
const CREAM = "#FBF8F2";
const BLACK = "#1A1A1A";

// מוציא את מזהה הסרטון מכל סוג של קישור יוטיוב (youtu.be, watch?v=, shorts, embed)
const youtubeId = (url) => {
    try {
        const u = new URL(url);
        if (u.hostname.includes("youtu.be")) return u.pathname.slice(1).split("/")[0];
        if (u.pathname === "/watch") return u.searchParams.get("v") || "";
        const match = u.pathname.match(/^\/(shorts|embed)\/([^/?]+)/);
        return match ? match[2] : "";
    } catch {
        return "";
    }
};

// המלצות בדף הקורס: לשונית סרטונים ולשונית צילומי שיחות.
// בכל לשונית: אחד גדול, ולידו רשימה לבחירה (עם גלילה בתוכה) - כך האזור לא נמתח כשיש הרבה
function CourseTestimonials() {
    const [videos, setVideos] = useState([]);
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [tab, setTab] = useState("videos");
    const [videoIndex, setVideoIndex] = useState(0);
    const [imageIndex, setImageIndex] = useState(0);
    const [zoomed, setZoomed] = useState(false);
    const lightboxRef = useAccessibleDialog(zoomed, () => setZoomed(false));

    useEffect(() => {
        const load = async () => {
            // שתי הבקשות במקביל. אם אחת נכשלת - השנייה עדיין מוצגת
            const [videosRes, imagesRes] = await Promise.allSettled([
                api.get("/api/testi-urls/course"),
                api.get("/api/images/Testimonials"),
            ]);
            if (videosRes.status === "fulfilled") {
                setVideos(
                    (videosRes.value.data || [])
                        .map((v) => ({ ...v, id: youtubeId(v.url) }))
                        .filter((v) => v.id)
                );
            }
            if (imagesRes.status === "fulfilled") {
                setImages(normalizeSiteImages(imagesRes.value.data));
            }
            setIsLoading(false);
        };
        load();
    }, []);

    // אם אין סרטונים - פותחים ישר על צילומי השיחות
    const activeTab = videos.length === 0 ? "chats" : images.length === 0 ? "videos" : tab;
    const showTabs = videos.length > 0 && images.length > 0;

    const tabs = [
        { id: "videos", label: "סרטונים", count: videos.length, icon: Video },
        { id: "chats", label: "צילומי שיחות", count: images.length, icon: MessageCircle },
    ];

    const video = videos[videoIndex];
    const image = images[imageIndex];

    return (
        <section
            dir="rtl"
            className="relative overflow-hidden bg-gradient-to-b from-[#F7FAF2] via-white to-[#F2F7EA] px-4 py-20 sm:px-6 lg:px-8"
        >
            <div className="relative mx-auto max-w-6xl">
                {/* כותרת */}
                <div className="mx-auto mb-10 max-w-3xl text-center">
                    <div
                        className="relative mx-auto mb-4 flex w-fit items-center justify-center gap-3 px-9 py-4"
                        style={{ backgroundColor: BLACK, clipPath: "polygon(3% 0%, 97% 0%, 100% 50%, 97% 100%, 3% 100%, 0% 50%)" }}
                    >
                        <Compass size={20} style={{ color: GREEN }} className="flex-shrink-0" aria-hidden="true" />
                        <p className="text-base font-bold leading-snug md:text-lg" style={{ color: CREAM }}>
                            תגובות אמיתיות ממשתתפי הקורס
                        </p>
                    </div>
                    <h2 className="text-3xl font-extrabold leading-tight text-[#1E2B18] sm:text-4xl lg:text-5xl">
                        מה אומרים המשתתפים?
                    </h2>
                    <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-[#7CB342]" />
                </div>

                {isLoading && <div className="mx-auto h-96 max-w-4xl animate-pulse rounded-3xl bg-[#E7EEDD]" />}

                {!isLoading && videos.length === 0 && images.length === 0 && (
                    <p className="rounded-3xl border border-[#DDE8CF] bg-white p-10 text-center text-[#5C6657]">
                        המלצות חדשות יופיעו כאן בקרוב.
                    </p>
                )}

                {/* לשוניות */}
                {!isLoading && showTabs && (
                    <div role="tablist" aria-label="סוג ההמלצות" className="mx-auto mb-8 flex w-fit gap-1.5 rounded-full bg-[#E7EEDD] p-1.5">
                        {tabs.map(({ id, label, count, icon: Icon }) => {
                            const on = activeTab === id;
                            return (
                                <button
                                    key={id}
                                    type="button"
                                    role="tab"
                                    id={`testi-tab-${id}`}
                                    aria-selected={on}
                                    aria-controls={`testi-panel-${id}`}
                                    onClick={() => setTab(id)}
                                    className={`flex min-h-12 items-center gap-2 rounded-full px-5 text-[15px] font-bold transition ${on ? "bg-[#1A1A1A] text-[#FBF8F2]" : "text-[#1E2B18] hover:bg-white/60"}`}
                                >
                                    <Icon size={18} aria-hidden="true" className={on ? "text-[#7CB342]" : "text-[#51762b]"} />
                                    {label}
                                    <span className="text-xs opacity-80">({count})</span>
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* ===== סרטונים ===== */}
                {!isLoading && activeTab === "videos" && video && (
                    <div
                        role={showTabs ? "tabpanel" : undefined}
                        id="testi-panel-videos"
                        aria-labelledby={showTabs ? "testi-tab-videos" : undefined}
                        className="flex flex-col items-center gap-6 md:flex-row md:items-start md:justify-center"
                    >
                        {/* הסרטון הגדול */}
                        <div className="w-full max-w-[20rem] shrink-0">
                            <div className="relative aspect-[9/16] overflow-hidden rounded-3xl bg-neutral-900 shadow-[0_16px_40px_rgba(0,0,0,0.12)]">
                                <iframe
                                    key={video.id}
                                    src={`https://www.youtube-nocookie.com/embed/${video.id}`}
                                    title={video.name ? `סרטון המלצה של ${video.name}` : "סרטון המלצה"}
                                    className="absolute inset-0 h-full w-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                />
                            </div>
                            <p className="mt-3 text-center text-lg font-bold text-[#1E2B18]">
                                {video.name || "משתתף בקורס"}
                                {video.city && <span className="font-normal text-[#5C6657]"> · {video.city}</span>}
                            </p>
                        </div>

                        {/* הרשימה - גלילה בתוכה */}
                        {videos.length > 1 && (
                            <ul className="flex w-full gap-3 overflow-x-auto pb-2 md:w-80 md:max-h-[35rem] md:flex-col md:overflow-y-auto md:overflow-x-visible md:pb-0 md:pl-1">
                                {videos.map((v, i) => (
                                    <li key={v._id || v.id} className="shrink-0 md:shrink">
                                        <button
                                            type="button"
                                            onClick={() => setVideoIndex(i)}
                                            aria-current={i === videoIndex ? "true" : undefined}
                                            className={`flex w-64 items-center gap-3 rounded-2xl border p-2.5 text-right transition md:w-full ${i === videoIndex ? "border-[#7CB342] bg-[#E7EEDD]" : "border-[#DDE8CF] bg-white hover:border-[#7CB342]"}`}
                                        >
                                            <span className="relative h-20 w-14 shrink-0 overflow-hidden rounded-xl bg-neutral-800">
                                                <img src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`} alt="" loading="lazy" className="h-full w-full object-cover" />
                                                <span className="absolute inset-0 flex items-center justify-center bg-black/25 text-white">
                                                    <Play size={18} fill="currentColor" aria-hidden="true" />
                                                </span>
                                            </span>
                                            <span className="min-w-0">
                                                <span className="block truncate font-bold text-[#1E2B18]">{v.name || `סרטון ${i + 1}`}</span>
                                                {v.city && <span className="block text-sm text-[#5C6657]">{v.city}</span>}
                                            </span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}

                {/* ===== צילומי שיחות ===== */}
                {!isLoading && activeTab === "chats" && image && (
                    <div
                        role={showTabs ? "tabpanel" : undefined}
                        id="testi-panel-chats"
                        aria-labelledby={showTabs ? "testi-tab-chats" : undefined}
                        className="flex flex-col items-center gap-6 md:flex-row md:items-start md:justify-center"
                    >
                        {/* הצילום הגדול - לחיצה מגדילה */}
                        <div className="w-full max-w-[22rem] shrink-0">
                            <button
                                type="button"
                                onClick={() => setZoomed(true)}
                                aria-label={image.clientName ? `הגדלת ההמלצה של ${image.clientName}` : "הגדלת ההמלצה"}
                                className="group relative block w-full overflow-hidden rounded-3xl border border-[#DDE8CF] bg-white p-3 shadow-[0_15px_45px_rgba(48,75,29,0.10)]"
                            >
                                <img
                                    src={image.url}
                                    alt={image.alt || (image.clientName ? `המלצה של ${image.clientName}` : "המלצה של משתתף בקורס")}
                                    className="mx-auto max-h-[32rem] w-auto rounded-2xl object-contain"
                                />
                                <span className="absolute left-5 top-5 rounded-full bg-white/95 p-2.5 text-[#5F922E] shadow">
                                    <ZoomIn size={20} aria-hidden="true" />
                                </span>
                            </button>
                            {image.clientName && <p className="mt-3 text-center text-lg font-bold text-[#1E2B18]">{image.clientName}</p>}
                        </div>

                        {/* רשימת הצילומים בטור, כמו הסרטונים - גוללים בתוך הרשימה ולא בכל הדף */}
                        {images.length > 1 && (
                            <ul className="flex w-full gap-3 overflow-x-auto pb-2 md:w-80 md:max-h-[33rem] md:flex-col md:overflow-y-auto md:overflow-x-hidden md:pb-0 md:pl-1">
                                {images.map((img, i) => (
                                    <li key={img.url} className="shrink-0">
                                        <button
                                            type="button"
                                            onClick={() => setImageIndex(i)}
                                            aria-current={i === imageIndex ? "true" : undefined}
                                            className={`flex w-64 items-center gap-3 rounded-2xl border p-2.5 text-right transition md:w-full ${i === imageIndex ? "border-[#7CB342] bg-[#E7EEDD]" : "border-[#DDE8CF] bg-white hover:border-[#7CB342]"}`}
                                        >
                                            <span className="h-20 w-14 shrink-0 overflow-hidden rounded-xl bg-[#EFE7DD]">
                                                <img src={img.url} alt="" loading="lazy" className="h-full w-full object-cover object-top" />
                                            </span>
                                            <span className="min-w-0">
                                                <span className="block truncate font-bold text-[#1E2B18]">{img.clientName || `המלצה ${i + 1}`}</span>
                                                <span className="flex items-center gap-1.5 text-sm text-[#5C6657]">
                                                    <MessageCircle size={14} aria-hidden="true" />
                                                    צילום שיחה
                                                </span>
                                            </span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            </div>

            {/* הצילום בגדול */}
            {zoomed && image && (
                <div
                    ref={lightboxRef}
                    tabIndex={-1}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
                    onClick={() => setZoomed(false)}
                    role="dialog"
                    aria-modal="true"
                    aria-label="תצוגת המלצה מוגדלת"
                >
                    <button
                        type="button"
                        onClick={() => setZoomed(false)}
                        className="absolute right-5 top-5 rounded-full bg-white p-3 text-[#26331F] shadow-lg hover:bg-[#EEF5E5]"
                        aria-label="סגירת התמונה"
                    >
                        <X size={24} aria-hidden="true" />
                    </button>
                    <img
                        src={image.url}
                        alt={image.alt || "המלצה מוגדלת"}
                        onClick={(e) => e.stopPropagation()}
                        className="max-h-[88vh] max-w-full rounded-2xl object-contain shadow-2xl"
                    />
                </div>
            )}
        </section>
    );
}

export default CourseTestimonials;
