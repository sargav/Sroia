import { useEffect, useState } from 'react'
import logo from '../assets/sroia-logo-white.png'

// מסך טעינה מלא - בזמן שבודקים אם המנהל מחובר (אחרי רענון / כניסה לפאנל).
// השרת ב-Render "נרדם" כשאין בו שימוש, וההתעוררות יכולה לקחת עד דקה - אז אחרי כמה שניות מסבירים את זה
const FullScreenLoader = () => {
    const [slow, setSlow] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => setSlow(true), 5000)
        return () => clearTimeout(timer)
    }, [])

    return (
        <div dir="rtl" className="fixed inset-0 bg-sroia-dark text-white flex flex-col items-center justify-center gap-8 px-6 font-sans">
            <img src={logo} alt="סרויה" className="w-48 h-auto" />
            <span aria-hidden="true"
                className="w-10 h-10 rounded-full border-4 border-white/15 border-t-sroia-light motion-safe:animate-spin" />
            <p role="status" className="text-center text-sroia-menu min-h-12">
                {slow ? (
                    <>
                        עוד רגע...
                        <span className="block text-sm opacity-80">השרת מתעורר, זה יכול לקחת עד דקה</span>
                    </>
                ) : 'מתחברים לפאנל...'}
            </p>
        </div>
    )
}

export default FullScreenLoader
