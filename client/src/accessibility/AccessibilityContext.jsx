import { createContext, useContext, useEffect, useMemo, useState } from "react";

// כל ההגדרות של תפריט הנגישות, במקום אחד.
// כל הגדרה שהגולש בוחר נשמרת אצלו בדפדפן, כך שהיא נשארת גם בביקור הבא.

export const DEFAULT_SETTINGS = {
    textScale: 0, //          0 עד 5: כל שלב מגדיל את הטקסט ב-10%
    contrast: 0, //           0 רגיל, 1 ניגודיות כהה, 2 ניגודיות בהירה
    grayscale: false, //      גווני אפור
    textSpacing: 0, //        0 רגיל, 1 מרווח, 2 מרווח מאוד
    bigCursor: false, //      סמן עכבר גדול
    highlightLinks: false, // הדגשת קישורים
    highlightHeadings: false, // הדגשת כותרות
    hideImages: false, //     הסתרת תמונות
    readingGuide: false, //   פס קריאה שעוקב אחרי העכבר
    stopAnimations: false, // עצירת אנימציות
};

export const MAX_TEXT_SCALE = 5;
const STORAGE_KEY = "sroia-accessibility";

function loadSettings() {
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
        return { ...DEFAULT_SETTINGS, ...(saved || {}) };
    } catch {
        return DEFAULT_SETTINGS;
    }
}

const AccessibilityContext = createContext(null);

export function AccessibilityProvider({ children }) {
    const [settings, setSettings] = useState(loadSettings);

    // מחילים את ההגדרות על תגית <html>, כך שכל האתר מגיב להן
    useEffect(() => {
        const root = document.documentElement;
        root.style.fontSize = settings.textScale ? `${100 + settings.textScale * 10}%` : "";

        const classes = {
            "a11y-contrast-dark": settings.contrast === 1,
            "a11y-contrast-light": settings.contrast === 2,
            "a11y-grayscale": settings.grayscale,
            "a11y-spacing-1": settings.textSpacing === 1,
            "a11y-spacing-2": settings.textSpacing === 2,
            "a11y-big-cursor": settings.bigCursor,
            "a11y-highlight-links": settings.highlightLinks,
            "a11y-highlight-headings": settings.highlightHeadings,
            "a11y-hide-images": settings.hideImages,
            "a11y-stop-animations": settings.stopAnimations,
        };
        Object.entries(classes).forEach(([name, on]) => root.classList.toggle(name, on));

        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
        } catch {
            // אם הדפדפן חוסם שמירה, ההגדרות פשוט לא יישמרו לביקור הבא
        }
    }, [settings]);

    const value = useMemo(() => {
        const update = (key, value) => setSettings((current) => ({ ...current, [key]: value }));
        return {
            settings,
            update,
            toggle: (key) => setSettings((current) => ({ ...current, [key]: !current[key] })),
            cycle: (key, levels) => setSettings((current) => ({ ...current, [key]: (current[key] + 1) % levels })),
            reset: () => setSettings(DEFAULT_SETTINGS),
            isChanged: JSON.stringify(settings) !== JSON.stringify(DEFAULT_SETTINGS),
        };
    }, [settings]);

    return <AccessibilityContext.Provider value={value}>{children}</AccessibilityContext.Provider>;
}

export function useAccessibility() {
    const context = useContext(AccessibilityContext);
    if (!context) throw new Error("useAccessibility חייב להיות בתוך AccessibilityProvider");
    return context;
}
