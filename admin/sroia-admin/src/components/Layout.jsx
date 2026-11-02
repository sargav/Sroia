import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { LogOut, Menu as MenuIcon, X } from 'lucide-react'
import { logOut } from '../features/auth/authSlice'
import { useLogoutMutation } from '../features/auth/authApiSlice'
import apiSlice from '../app/apiSlice'
import { useGetContactsQuery } from '../features/contacts/contactsApiSlice'
import Menu from './Menu'
import { NAV_ITEMS, isActive } from './navItems'
import logo from '../assets/sroia-logo-white.png'

const Layout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [logoutRequest] = useLogoutMutation()
    const { pathname } = useLocation()

    // האם התפריט פתוח (רלוונטי רק בטלפון)
    const [menuOpen, setMenuOpen] = useState(false)

    // כמה פניות עוד לא נקראו - בשביל המספר על "פניות" בסרגל התחתון
    const { data: contacts = [] } = useGetContactsQuery()
    const unread = contacts.filter((c) => !c.isRead).length

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
            <header className="md:hidden sticky top-0 z-20 flex items-center justify-between bg-sroia-dark px-4 h-14 shadow-md">
                <img src={logo} alt="סרויה" className="w-24 h-auto" />
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
            fixed inset-y-0 right-0 z-40 w-72 max-w-[85vw] transition-[translate,visibility] duration-200
            ${menuOpen ? 'translate-x-0 visible' : 'translate-x-full invisible'}
            md:visible md:sticky md:top-0 md:h-screen md:translate-x-0 md:w-64 md:shrink-0
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
            {/* pb-28 בטלפון - כדי שהסרגל התחתון לא יסתיר את סוף העמוד */}
            <main className="flex-1 min-w-0 px-4 pt-5 pb-28 md:p-10">
                <Outlet />
            </main>

            {/* סרגל תחתון - רק בטלפון, כמו באפליקציה */}
            <nav
                aria-label="ניווט מהיר"
                className="md:hidden fixed bottom-0 inset-x-0 z-20 bg-white border-t border-[#E1E8DA] shadow-[0_-4px_16px_rgba(45,56,43,0.08)] pb-[env(safe-area-inset-bottom)]"
            >
                {/* כל 5 הפריטים של התפריט - אין צורך ב"עוד" */}
                <ul className="grid grid-cols-5">
                    {NAV_ITEMS.map((item) => {
                        const active = isActive(item, pathname)
                        const Icon = item.icon
                        return (
                            <li key={item.to}>
                                <Link
                                    to={item.to}
                                    aria-current={active ? 'page' : undefined}
                                    className={`flex flex-col items-center justify-center gap-1 h-16 text-xs no-underline ${active ? 'text-sroia-dark font-bold' : 'text-[#6b7468]'}`}
                                >
                                    <span className={`relative flex items-center justify-center w-12 h-8 rounded-full ${active ? 'bg-[#E3EFD3] text-sroia-green' : ''}`}>
                                        <Icon size={22} aria-hidden="true" />
                                        {item.to === '/contacts' && unread > 0 && (
                                            <span className="absolute -top-1 left-1 min-w-5 h-5 px-1 rounded-full bg-[#c0392b] text-white text-[11px] font-bold flex items-center justify-center">
                                                {unread}
                                                <span className="sr-only"> לא נקראו</span>
                                            </span>
                                        )}
                                    </span>
                                    {item.short}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </div>
    )
}

export default Layout