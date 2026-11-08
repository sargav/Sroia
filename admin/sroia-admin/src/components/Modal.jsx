import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'

// חלון כללי (dialog) עם כותרת וכפתור סגירה
// open - האם פתוח | onClose - סגירה (✕, Esc, לחיצה על הרקע)
// title / subtitle - כותרת | actions - כפתורים ליד ה-✕ | children - התוכן
const Modal = ({ open, onClose, title, subtitle, actions, children, wide = false }) => {
    const dialogRef = useRef(null)

    useEffect(() => {
        const dialog = dialogRef.current
        if (open && !dialog.open) dialog.showModal()
        if (!open && dialog.open) dialog.close()
    }, [open])

    return (
        <dialog
            ref={dialogRef}
            onCancel={(e) => { e.preventDefault(); onClose() }}
            onClick={(e) => { if (e.target === dialogRef.current) onClose() }}
            dir="rtl"
            className={`m-auto ${wide ? 'w-[min(640px,calc(100%-24px))]' : 'w-[min(480px,calc(100%-24px))]'} max-h-[calc(100%-24px)] rounded-2xl p-0 shadow-2xl backdrop:bg-black/50
                max-md:mb-0 max-md:w-full max-md:max-w-full max-md:rounded-b-none max-md:max-h-[85vh]`}
        >
            {open && (
                <div className="flex flex-col max-h-[inherit] font-sans">
                    <div className="flex items-start justify-between gap-3 px-5 pt-5 pb-3 border-b border-sroia-subtle">
                        <div>
                            <h2 className="text-xl font-extrabold text-sroia-dark">{title}</h2>
                            {subtitle && <p className="text-sm text-[#565f52]">{subtitle}</p>}
                        </div>
                        <div className="flex items-center gap-2">
                            {actions}
                            <button type="button" onClick={onClose} aria-label="סגירה"
                                className="w-10 h-10 flex items-center justify-center rounded-lg bg-sroia-bg text-sroia-dark cursor-pointer hover:bg-[#E6EBE0]">
                                <X size={20} aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                    <div className="px-5 py-4 overflow-y-auto">{children}</div>
                </div>
            )}
        </dialog>
    )
}

export default Modal
