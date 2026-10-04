import { useEffect, useState } from "react";
import {
    AlignJustify,
    Contrast,
    Droplet,
    Heading,
    ImageOff,
    Link as LinkIcon,
    MousePointer2,
    Pause,
    RectangleHorizontal,
    RotateCcw,
    X,
} from "lucide-react";
import { MAX_TEXT_SCALE, useAccessibility } from "./AccessibilityContext";
import useAccessibleDialog from "../components/useAccessibleDialog";
import "./accessibility.css";

// כפתור נגישות קבוע בפינת המסך, שפותח את תפריט הנגישות

// סמל הנגישות הבינלאומי: דמות עם ידיים פרושות
function AccessIcon() {
    return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="4.2" r="1.9" fill="currentColor" stroke="none" />
            <path d="M4.5 8.2 12 9.8l7.5-1.6" />
            <path d="M12 9.8v5.2" />
            <path d="m12 15-3.6 6.2" />
            <path d="m12 15 3.6 6.2" />
        </svg>
    );
}

function LevelDots({ level, levels }) {
    if (levels <= 2) return null;
    return (
        <span className="a11y-dots" aria-hidden="true">
            {Array.from({ length: levels - 1 }, (_, i) => (
                <span key={i} className={i < level ? "is-on" : ""} />
            ))}
        </span>
    );
}

function Tile({ icon: Icon, label, active, onClick, level, levels = 2, stateText, wide = false }) {
    return (
        <button
            type="button"
            className={`a11y-tile ${active ? "is-active" : ""} ${wide ? "is-wide" : ""}`}
            onClick={onClick}
            aria-pressed={active}
        >
            <Icon size={24} aria-hidden="true" />
            <span className="a11y-tile-label">{label}</span>
            {stateText && <span className="sr-only">{stateText}</span>}
            <LevelDots level={level} levels={levels} />
        </button>
    );
}

function ReadingGuide() {
    const [y, setY] = useState(null);
    useEffect(() => {
        const move = (event) => setY(event.clientY);
        window.addEventListener("pointermove", move);
        return () => window.removeEventListener("pointermove", move);
    }, []);
    if (y === null) return null;
    return <div className="a11y-reading-guide" style={{ top: y }} aria-hidden="true" />;
}

const CONTRAST_NAMES = ["", "ניגודיות כהה", "ניגודיות בהירה"];
const SPACING_NAMES = ["", "ריווח בינוני", "ריווח גדול"];

export default function AccessibilityMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const { settings, update, toggle, cycle, reset, isChanged } = useAccessibility();
    const panelRef = useAccessibleDialog(isOpen, () => setIsOpen(false));
    const percent = 100 + settings.textScale * 10;

    return (
        <div className="a11y-root" dir="rtl">
            {settings.readingGuide && <ReadingGuide />}

            <button
                type="button"
                className={`a11y-launcher ${isChanged ? "has-changes" : ""}`}
                onClick={() => setIsOpen((open) => !open)}
                aria-label="תפריט נגישות"
                aria-expanded={isOpen}
                aria-controls="a11y-panel"
                aria-haspopup="dialog"
            >
                <AccessIcon />
            </button>

            {isOpen && (
                <div
                    id="a11y-panel"
                    ref={panelRef}
                    tabIndex={-1}
                    className="a11y-panel"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="a11y-panel-title"
                >
                    <div className="a11y-panel-head">
                        <h2 id="a11y-panel-title">תפריט נגישות</h2>
                        <button type="button" className="a11y-close" onClick={() => setIsOpen(false)} aria-label="סגירת תפריט הנגישות">
                            <X size={22} aria-hidden="true" />
                        </button>
                    </div>

                    <div className="a11y-panel-body">
                        <div className="a11y-size" role="group" aria-labelledby="a11y-size-label">
                            <span id="a11y-size-label" className="a11y-size-label">
                                <span aria-hidden="true" className="a11y-size-icon">אA</span>
                                גודל טקסט
                            </span>
                            <div className="a11y-size-controls">
                                <button
                                    type="button"
                                    onClick={() => update("textScale", Math.max(settings.textScale - 1, 0))}
                                    disabled={settings.textScale === 0}
                                    aria-label="הקטנת טקסט"
                                >
                                    א-
                                </button>
                                <span className="a11y-size-value" aria-live="polite">
                                    {percent}%
                                </span>
                                <button
                                    type="button"
                                    onClick={() => update("textScale", Math.min(settings.textScale + 1, MAX_TEXT_SCALE))}
                                    disabled={settings.textScale === MAX_TEXT_SCALE}
                                    aria-label="הגדלת טקסט"
                                >
                                    א+
                                </button>
                            </div>
                        </div>

                        <div className="a11y-grid">
                            <Tile
                                icon={Contrast}
                                label="ניגודיות"
                                active={settings.contrast > 0}
                                level={settings.contrast}
                                levels={3}
                                stateText={CONTRAST_NAMES[settings.contrast]}
                                onClick={() => cycle("contrast", 3)}
                            />
                            <Tile icon={Droplet} label="גווני אפור" active={settings.grayscale} onClick={() => toggle("grayscale")} />
                            <Tile
                                icon={AlignJustify}
                                label="ריווח טקסט"
                                active={settings.textSpacing > 0}
                                level={settings.textSpacing}
                                levels={3}
                                stateText={SPACING_NAMES[settings.textSpacing]}
                                onClick={() => cycle("textSpacing", 3)}
                            />
                            <Tile icon={MousePointer2} label="סמן גדול" active={settings.bigCursor} onClick={() => toggle("bigCursor")} />
                            <Tile icon={LinkIcon} label="הדגשת קישורים" active={settings.highlightLinks} onClick={() => toggle("highlightLinks")} />
                            <Tile icon={Heading} label="הדגשת כותרות" active={settings.highlightHeadings} onClick={() => toggle("highlightHeadings")} />
                            <Tile icon={ImageOff} label="הסתרת תמונות" active={settings.hideImages} onClick={() => toggle("hideImages")} />
                            <Tile icon={RectangleHorizontal} label="מדריך קריאה" active={settings.readingGuide} onClick={() => toggle("readingGuide")} />
                            <Tile icon={Pause} label="עצירת אנימציות" active={settings.stopAnimations} onClick={() => toggle("stopAnimations")} wide />
                        </div>

                        <button type="button" className="a11y-reset" onClick={reset} disabled={!isChanged}>
                            <RotateCcw size={18} aria-hidden="true" />
                            איפוס הגדרות נגישות
                        </button>

                        <a className="a11y-statement-link" href={`${import.meta.env.BASE_URL}accessibility`}>
                            להצהרת הנגישות של האתר
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}
