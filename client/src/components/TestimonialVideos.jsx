import { useEffect, useState } from "react";
import {
    ChevronDown,
    MessageSquareQuote,
} from "lucide-react";
import api from "../api-config";

const GREEN = "#7CB342";
const DARK = "#1E2A22";
const CREAM = "#FBF8F2";
const BLACK = "#1A1A1A";

function TestimonialVideos({ type }) {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [visibleCount, setVisibleCount] = useState(2);

    useEffect(() => {
        const getItems = async () => {
            try {
                setIsLoading(true);
                setError("");
                setVisibleCount(2);

                const response = await api.get(
                    `/api/testi-urls/${type}`
                );

                console.log(
                    "הנתונים שהתקבלו:",
                    response.data
                );

                console.log(
                    "כמות:",
                    response.data.length
                );

                setItems(response.data);
            } catch (err) {
                console.error(
                    "שגיאה בקבלת ההמלצות:",
                    err
                );

                setError(
                    "לא ניתן לטעון את ההמלצות כרגע"
                );
            } finally {
                setIsLoading(false);
            }
        };

        if (type) {
            getItems();
        }
    }, [type]);

    const getEmbedUrl = (url) => {
        if (!url) return "";

        try {
            const parsedUrl = new URL(url);
            let id = "";

            if (
                parsedUrl.hostname.includes("youtu.be")
            ) {
                id = parsedUrl.pathname
                    .slice(1)
                    .split("/")[0];
            }

            if (
                parsedUrl.hostname.includes(
                    "youtube.com"
                )
            ) {
                if (parsedUrl.pathname === "/watch") {
                    id =
                        parsedUrl.searchParams.get("v") ||
                        "";
                }

                if (
                    parsedUrl.pathname.startsWith(
                        "/embed/"
                    )
                ) {
                    id = parsedUrl.pathname
                        .split("/embed/")[1]
                        .split("/")[0];
                }

                if (
                    parsedUrl.pathname.startsWith(
                        "/shorts/"
                    )
                ) {
                    id = parsedUrl.pathname
                        .split("/shorts/")[1]
                        .split("/")[0];
                }
            }

            if (!id) return "";

            return `https://www.youtube-nocookie.com/embed/${id}`;
        } catch (urlError) {
            console.error(
                "כתובת אינה תקינה:",
                url,
                urlError
            );

            return "";
        }
    };

    const validItems = items
        .map((item) => ({
            ...item,
            embedUrl: getEmbedUrl(item.url),
        }))
        .filter((item) => item.embedUrl);

    const visibleItems = validItems.slice(
        0,
        visibleCount
    );

    const hasMoreItems =
        visibleCount < validItems.length;

    const showMore = () => {
        setVisibleCount(
            (currentCount) => currentCount + 2
        );
    };

    return (
        <section
            dir="rtl"
            className="relative overflow-hidden px-6 py-16"
            style={{
                background:
                    "linear-gradient(180deg, #FAFBF7 0%, #F0F3E8 100%)",
            }}
        >
            {/* קישוטי רקע */}
            <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-[#8FC64C]/10 blur-3xl" />

            <div className="pointer-events-none absolute -left-24 bottom-10 h-80 w-80 rounded-full bg-white/80 blur-3xl" />

            <div className="relative mx-auto max-w-5xl">
                {/* כותרת */}
                <div className="mb-12 text-center">
                    <div className="flex justify-center px-6 pt-3">
                        <div
                            className="relative flex items-center gap-3 px-9 py-4"
                            style={{
                                backgroundColor: BLACK,
                                clipPath:
                                    "polygon(3% 0%, 97% 0%, 100% 50%, 97% 100%, 3% 100%, 0% 50%)",
                            }}
                        >
                            <MessageSquareQuote
                                size={20}
                                style={{ color: GREEN }}
                                className="shrink-0"
                            />

                            <p
                                className="text-base font-bold leading-snug md:text-lg"
                                style={{ color: CREAM }}
                            >
                                משתתפים משתפים מהחוויה שלהם
                            </p>
                        </div>
                    </div>

                    <div className="mx-auto mt-7 max-w-2xl">
                        <h2 className="text-2xl font-bold leading-relaxed text-neutral-900 md:text-3xl">
                            שומעים ישירות ממשתתפי הקורס
                        </h2>

                        <p className="mt-4 text-lg leading-relaxed text-neutral-700">
                            אנשים שכבר למדו בקורס משתפים כיצד
                            הוא עזר להם להבין את התהליך ולקבל
                            החלטות בצורה מסודרת.
                        </p>
                    </div>

                    <div
                        className="mx-auto mt-6 h-1 w-16 rounded-full"
                        style={{ backgroundColor: GREEN }}
                    />
                </div>

                {/* מצב טעינה */}
                {isLoading && (
                    <div className="grid grid-cols-1 justify-items-center gap-10 md:grid-cols-2">
                        {[1, 2].map((item) => (
                            <div
                                key={item}
                                className="w-full max-w-[350px] overflow-hidden rounded-3xl bg-white p-3"
                                style={{
                                    boxShadow:
                                        "0 16px 40px rgba(0,0,0,0.07)",
                                }}
                            >
                                <div className="aspect-[9/16] animate-pulse rounded-2xl bg-[#E1EAD7]" />

                                <div className="space-y-3 p-4">
                                    <div className="h-5 w-40 animate-pulse rounded bg-[#E1EAD7]" />

                                    <div className="h-4 w-24 animate-pulse rounded bg-[#EDF2E8]" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* שגיאה */}
                {!isLoading && error && (
                    <div
                        className="rounded-3xl bg-white p-8 text-center text-base text-red-700"
                        style={{
                            boxShadow:
                                "0 16px 40px rgba(0,0,0,0.07)",
                        }}
                    >
                        {error}
                    </div>
                )}

                {/* אין נתונים */}
                {!isLoading &&
                    !error &&
                    validItems.length === 0 && (
                        <div
                            className="rounded-3xl bg-white p-10 text-center"
                            style={{
                                boxShadow:
                                    "0 16px 40px rgba(0,0,0,0.07)",
                            }}
                        >
                            <p className="text-lg leading-relaxed text-neutral-700">
                                המלצות חדשות יופיעו כאן
                                בקרוב.
                            </p>
                        </div>
                    )}

                {/* הכרטיסים */}
                {!isLoading &&
                    !error &&
                    validItems.length > 0 && (
                        <>
                            <div className="grid grid-cols-1 justify-items-center gap-10 md:grid-cols-2">
                                {visibleItems.map(
                                    (item, index) => (
                                        <article
                                            key={
                                                item._id ||
                                                index
                                            }
                                            className="group w-full max-w-[350px] overflow-hidden rounded-3xl bg-white p-3 transition duration-300 hover:-translate-y-1"
                                            style={{
                                                boxShadow:
                                                    "0 16px 40px rgba(0,0,0,0.07)",
                                            }}
                                        >
                                            {/* תצוגה אנכית */}
                                            <div className="relative aspect-[9/16] overflow-hidden rounded-2xl bg-neutral-900">
                                                <iframe
                                                    src={
                                                        item.embedUrl
                                                    }
                                                    title={
                                                        item.name ||
                                                        `המלצה ${
                                                            index +
                                                            1
                                                        }`
                                                    }
                                                    className="absolute inset-0 h-full w-full"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    referrerPolicy="strict-origin-when-cross-origin"
                                                    allowFullScreen
                                                    loading="lazy"
                                                />
                                            </div>

                                            {/* שם ועיר */}
                                            <div className="flex items-center gap-4 px-3 pb-3 pt-5">
                                                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EAF4DD] text-[#659B32]">
                                                    <MessageSquareQuote
                                                        size={
                                                            21
                                                        }
                                                    />
                                                </span>

                                                <div>
                                                    <h3 className="text-lg font-bold leading-relaxed text-neutral-900">
                                                        {item.name ||
                                                            "משתתף בקורס"}
                                                    </h3>

                                                    {item.city && (
                                                        <p className="text-base text-neutral-500">
                                                            {
                                                                item.city
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </article>
                                    )
                                )}
                            </div>

                            {/* כפתור הצג עוד */}
                            {hasMoreItems && (
                                <div className="mt-12 flex justify-center">
                                    <button
                                        type="button"
                                        onClick={showMore}
                                        className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-base font-bold transition duration-300 hover:-translate-y-1"
                                        style={{
                                            color: DARK,
                                            boxShadow:
                                                "0 12px 35px rgba(0,0,0,0.12)",
                                        }}
                                    >
                                        <span>
                                            הצג עוד
                                        </span>

                                        <span
                                            className="flex h-8 w-8 items-center justify-center rounded-full transition duration-300"
                                            style={{
                                                backgroundColor:
                                                    "#EAF4DD",
                                                color: GREEN,
                                            }}
                                        >
                                            <ChevronDown
                                                size={
                                                    19
                                                }
                                                className="transition-transform duration-300 group-hover:translate-y-0.5"
                                            />
                                        </span>
                                    </button>
                                </div>
                            )}
                        </>
                    )}
            </div>
        </section>
    );
}

export default TestimonialVideos;