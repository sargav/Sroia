import { useEffect, useRef } from 'react'
import { Trash2 } from 'lucide-react'

// חלון אישור כללי
// open      - האם החלון פתוח
// title     - כותרת, למשל "למחוק את הפנייה?"
// message   - הסבר קצר
// onConfirm - מה קורה בלחיצה על "מחיקה"
// onCancel  - מה קורה בלחיצה על "ביטול", או ב-Esc
const ConfirmDialog = ({ open, title, message, confirmText = 'מחיקה', onConfirm, onCancel }) => {
    const dialogRef = useRef(null)

    // פותח וסוגר את ה-dialog לפי open
    useEffect(() => {
        const dialog = dialogRef.current
        if (open && !dialog.open) dialog.showModal()
        if (!open && dialog.open) dialog.close()
    }, [open])

    return (
        <dialog
            ref={dialogRef}
            onCancel={onCancel}              // לחיצה על Esc
            onClick={(e) => {                // לחיצה על הרקע הכהה מסביב
                if (e.target === dialogRef.current) onCancel()
            }}
            dir="rtl"
            className="m-auto w-[min(420px,calc(100%-32px))] rounded-2xl p-0 shadow-2xl backdrop:bg-black/50"
        >
            <div className="p-6 flex flex-col gap-5 font-sans">
                <div className="flex items-start gap-4">
                    <span className="shrink-0 w-12 h-12 rounded-full bg-[#FBECEC] text-[#a12f2f] flex items-center justify-center">
                        <Trash2 size={22} aria-hidden="true" />
                    </span>
                    <div className="flex flex-col gap-1">
                        <h2 className="text-xl font-extrabold text-sroia-dark">{title}</h2>
                        <p className="text-[#565f52] leading-relaxed">{message}</p>
                    </div>
                </div>

                <div className="flex gap-2 justify-end">
                    <button
                        type="button"
                        onClick={onCancel}
                        autoFocus
                        className="min-h-11 px-5 rounded-lg border border-sroia-line text-sroia-dark cursor-pointer hover:bg-sroia-bg"
                    >
                        ביטול
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        className="min-h-11 px-5 rounded-lg bg-[#a12f2f] text-white font-bold cursor-pointer hover:bg-[#8a2424]"
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </dialog>
    )
}

export default ConfirmDialog