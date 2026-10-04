import { useEffect, useRef } from "react";

// הופך חלון קופץ לנגיש למקלדת ולקורא מסך:
// - בפתיחה: הסמן עובר לתוך החלון
// - Tab ו-Shift+Tab נשארים בתוך החלון ולא בורחים לדף שמאחוריו
// - Esc סוגר את החלון
// - בסגירה: הסמן חוזר לכפתור שפתח את החלון
export default function useAccessibleDialog(isOpen, onClose) {
    const dialogRef = useRef(null);
    const onCloseRef = useRef(onClose);
    onCloseRef.current = onClose;

    useEffect(() => {
        if (!isOpen) return;

        const opener = document.activeElement;
        const dialog = dialogRef.current;
        const focusableSelector =
            'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])';

        const firstFocusable = dialog?.querySelector(focusableSelector);
        (firstFocusable || dialog)?.focus();

        function handleKeyDown(event) {
            if (event.key === "Escape") {
                event.stopPropagation();
                onCloseRef.current();
                return;
            }
            if (event.key !== "Tab" || !dialog) return;

            const items = Array.from(dialog.querySelectorAll(focusableSelector));
            if (items.length === 0) {
                event.preventDefault();
                return;
            }
            const first = items[0];
            const last = items[items.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        }

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            if (opener && typeof opener.focus === "function") opener.focus();
        };
    }, [isOpen]);

    return dialogRef;
}
