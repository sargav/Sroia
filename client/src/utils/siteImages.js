import api from "../api-config";

// ממיר את מה שהשרת מחזיר מ-/api/images/:folder לרשימה אחידה של { url, alt, clientName }.
// עובד עם שני הפורמטים:
//   - הישן: מערך של מחרוזות ("/finish/1.jpeg")
//   - החדש: מערך של אובייקטים ({ url, alt, clientName })
// וכתובת יחסית מהתיקייה בשרת מקבלת לפניה את כתובת השרת. כתובת מלאה (Cloudinary) נשארת כמו שהיא
export const normalizeSiteImages = (data) => {
    const baseURL = api.defaults.baseURL.replace(/\/$/, "");

    return (Array.isArray(data) ? data : []).map((item) => {
        const image = typeof item === "string" ? { url: item } : item;
        const url = String(image.url || "");
        const fullUrl = url.startsWith("http")
            ? url
            : `${baseURL}${url.startsWith("/") ? url : `/${url}`}`;

        return {
            url: fullUrl,
            alt: image.alt || "",
            clientName: image.clientName || "",
        };
    });
};
