import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { LogOut, Menu as MenuIcon, X } from 'lucide-react'
import { logOut } from '../features/auth/authSlice'
import { useLogoutMutation } from '../features/auth/authApiSlice'
import apiSlice from '../app/apiSlice'
import Menu from './Menu'
import logo from '../assets/sroia-logo-white.png'

const Layout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [logoutRequest] = useLogoutMutation()

    // האם התפריט פתוח (רלוונטי רק בטלפון)
    const [menuOpen, setMenuOpen] = useState(false)

    const handleLogout = async () => {
        try {
            await logoutRequest().unwrap()          // השרת מוחק את העוגייה
        } catch (err) {
            console.log('שגיאה בהתנתקות:', err.status) // גם אם נכשל - מנתקים בצד שלנו
        }
        dispatch(logOut())                           // מרוקנים את המגירה
        dispatch(apiSlice.util.resetApiState())      // מוחקים את הנתונים מהזיכרון
        navigate('/login', { replace: true })
    }

    return (
        <div dir="rtl" className="min-h-screen bg-sroia-bg font-sans md:flex">

            {/* פס עליון - רק בטלפון */}
            <header className="md:hidden sticky top-0 z-20 flex items-center justify-between bg-sroia-dark px-4 h-16">
                <img src={logo} alt="סרויה" className="w-28 h-auto" />
                <button
                    type="button"
                    onClick={() => setMenuOpen(true)}
                    aria-label="פתיחת התפריט"
                    aria-expanded={menuOpen}
                    aria-controls="side-menu"
                    className="w-11 h-11 flex items-center justify-center rounded-lg text-white hover:bg-white/10 cursor-pointer"
                >
                    <MenuIcon size={26} aria-hidden="true" />
                </button>
            </header>

            {/* רקע כהה מאחורי התפריט הפתוח - לחיצה עליו סוגרת */}
            {menuOpen && (
                <div
                    className="md:hidden fixed inset-0 z-30 bg-black/50"
                    onClick={() => setMenuOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* תפריט הצד: בטלפון נפתח מהצד, במחשב תמיד מוצג */}
            <aside
                id="side-menu"
                className={`
                    fixed inset-y-0 right-0 z-40 w-72 transition-transform duration-200
                    ${menuOpen ? 'translate-x-0' : 'translate-x-full'}
                    md:static md:translate-x-0 md:w-64 md:shrink-0 md:min-h-screen
                    bg-sroia-dark text-white p-4 flex flex-col gap-8 overflow-y-auto
                `}
            >
                <div className="flex items-start justify-between px-2 pt-3">
                    <div className="flex flex-col gap-1">
                        <img src={logo} alt="סרויה – ניהול פרויקטים ופיקוח בנייה" className="w-40 h-auto" />
                    </div>

                    {/* כפתור סגירה - רק בטלפון */}
                    <button
                        type="button"
                        onClick={() => setMenuOpen(false)}
                        aria-label="סגירת התפריט"
                        className="md:hidden w-11 h-11 flex items-center justify-center rounded-lg hover:bg-white/10 cursor-pointer"
                    >
                        <X size={24} aria-hidden="true" />
                    </button>
                </div>

                {/* לחיצה על קישור סוגרת את התפריט בטלפון */}
                <Menu onNavigate={() => setMenuOpen(false)} />

                <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-auto flex items-center justify-between gap-3 min-h-11 px-3 rounded-lg text-[15px] text-[#D3DECC] hover:bg-white/5 cursor-pointer"
                >
                    <span>התנתקות</span>
                    <LogOut size={20} aria-hidden="true" />
                </button>
            </aside>

            {/* כאן מופיע העמוד הנוכחי */}
            <main className="flex-1 min-w-0 p-4 md:p-10">
                <Outlet />
            </main>
        </div>
    )
}

export default Layout