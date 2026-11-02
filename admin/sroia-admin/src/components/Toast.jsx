import { useEffect } from 'react'
import { CircleAlert, CircleCheck, X } from 'lucide-react'

// הודעה קופצת למעלה במרכז המסך, ונעלמת לבד אחרי כמה שניות
// message - הטקסט (ריק = לא מוצג) | type - 'error' או 'success' | onClose - סגירה
const Toast = ({ message, type = 'error', onClose, duration = 5000 }) => {
    useEffect(() => {
        if (!message) return
        const timer = setTimeout(onClose, duration)
        return () => clearTimeout(timer) // הודעה חדשה מתחילה את הספירה מחדש
    }, [message, duration, onClose])

    if (!message) return null

    const isError = type === 'error'
    const Icon = isError ? CircleAlert : CircleCheck

    return (
        <div
            role={isError ? 'alert' : 'status'}
            dir="rtl"
            className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[min(440px,calc(100%-32px))]
                flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl border font-sans animate-[toast-in_.2s_ease-out]
                ${isError ? 'bg-[#FBECEC] border-[#e8b4b4] text-[#8a2424]' : 'bg-[#E3EFD3] border-[#b9d49a] text-[#2f4a17]'}`}
        >
            <Icon size={22} aria-hidden="true" className="shrink-0" />
            <p className="flex-1 font-bold">{message}</p>
            <button type="button" onClick={onClose} aria-label="סגירת ההודעה"
                className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-black/5 cursor-pointer shrink-0">
                <X size={18} aria-hidden="true" />
            </button>
        </div>
    )
}

export default Toast
