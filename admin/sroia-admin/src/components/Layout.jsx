import { Link, Outlet, useLocation } from 'react-router-dom'
import { ArrowLeft, LogOut } from 'lucide-react'
import useLogout from '../features/auth/useLogout'
import useCurrentManager from '../features/auth/useCurrentManager'
import { useGetContactsQuery } from '../features/contacts/contactsApiSlice'
import Menu from './Menu'
import { NAV_ITEMS, isActive } from './navItems'
import logo from '../assets/sroia-logo-white.png'

// העיגול עם האות הראשונה של השם
const Avatar = ({ name, className = '' }) => (
    <span aria-hidden="true"
        className={`rounded-full bg-sroia-light text-sroia-dark flex items-center justify-center font-extrabold shrink-0 ${className}`}>
        {name?.[0] || '?'}
    </span>
)

const Layout = () => {
    const { pathname } = useLocation()
    const handleLogout = useLogout()
    const me = useCurrentManager()
    const onProfile = pathname.startsWith('/me')

    // כמה פניות עוד לא נקראו - בשביל המספר על "פניות" בסרגל התחתון
    const { data: contacts = [] } = useGetContactsQuery()
    const unread = contacts.filter((c) => !c.isRead).length

    return (
        <div dir="rtl" className="min-h-screen bg-sroia-bg font-sans md:flex">

            {/* פס עליון - רק בטלפון: לוגו + עיגול הפרופיל (הניווט עצמו בסרגל התחתון) */}
            <header className="md:hidden sticky top-0 z-20 flex items-center justify-between bg-sroia-dark px-4 h-14 shadow-md">
                <img src={logo} alt="סרויה" className="w-24 h-auto" />
                <Link
                    to="/me"
                    aria-label="הפרופיל שלי"
                    aria-current={onProfile ? 'page' : undefined}
                    className="w-11 h-11 flex items-center justify-center rounded-full"
                >
                    <Avatar name={me?.name}
                        className={`w-9 h-9 text-base ${onProfile ? 'ring-[3px] ring-white' : ''}`} />
                </Link>
            </header>

            {/* תפריט הצד - רק במחשב */}
            <aside className="hidden md:flex sticky top-0 h-screen w-64 shrink-0 bg-sroia-dark text-white p-4 flex-col gap-8 overflow-y-auto">
                <div className="px-2 pt-3">
                    <img src={logo} alt="סרויה – ניהול פרויקטים ופיקוח בנייה" className="w-40 h-auto" />
                </div>

                <Menu />

                {/* למטה: הכרטיס שלי (פותח את הפרופיל) + התנתקות */}
                <div className={`mt-auto flex items-center gap-2 p-2 rounded-2xl transition-colors ${onProfile
                    ? 'bg-sroia-light/20 ring-1 ring-inset ring-sroia-light/40'
                    : 'bg-white/5 has-[a:hover]:bg-sroia-light/15 has-[a:hover]:ring-1 has-[a:hover]:ring-inset has-[a:hover]:ring-sroia-light/50'}`}>
                    <Link
                        to="/me"
                        title="לחיצה פותחת את הפרופיל שלך"
                        aria-current={onProfile ? 'page' : undefined}
                        className="group flex-1 min-w-0 flex items-center gap-2.5 p-1 rounded-xl text-white no-underline"
                    >
                        <Avatar name={me?.name}
                            className={`w-10 h-10 text-lg transition-shadow ${onProfile ? 'ring-[3px] ring-white' : 'group-hover:ring-[3px] group-hover:ring-sroia-light/40'}`} />
                        <span className="min-w-0">
                            <b className="block text-[15px] truncate">{me?.name}</b>
                            <span className="flex items-center gap-1 text-xs text-sroia-soft">
                                הפרופיל שלי
                                {!onProfile && (
                                    <ArrowLeft size={13} aria-hidden="true"
                                        className="opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" />
                                )}
                            </span>
                        </span>
                    </Link>
                    <button
                        type="button"
                        onClick={handleLogout}
                        aria-label="התנתקות"
                        title="התנתקות"
                        className="w-10 h-10 shrink-0 flex items-center justify-center rounded-xl text-sroia-menu hover:bg-white/10 hover:text-white cursor-pointer"
                    >
                        <LogOut size={20} aria-hidden="true" />
                    </button>
                </div>
            </aside>

            {/* כאן מופיע העמוד הנוכחי */}
            {/* pb-28 בטלפון - כדי שהסרגל התחתון לא יסתיר את סוף העמוד */}
            <main className="flex-1 min-w-0 px-4 pt-5 pb-28 md:p-10">
                <Outlet />
            </main>

            {/* סרגל תחתון - רק בטלפון, כמו באפליקציה */}
            <nav
                aria-label="ניווט מהיר"
                className="md:hidden fixed bottom-0 inset-x-0 z-20 bg-white border-t border-sroia-edge shadow-[0_-4px_16px_rgba(45,56,43,0.08)] pb-[env(safe-area-inset-bottom)]"
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
                                    <span className={`relative flex items-center justify-center w-12 h-8 rounded-full ${active ? 'bg-sroia-tint text-sroia-green' : ''}`}>
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