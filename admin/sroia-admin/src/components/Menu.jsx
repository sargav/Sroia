import { Link, useLocation } from 'react-router-dom'
import { NAV_ITEMS, isActive } from './navItems'

// onNavigate - נקרא בלחיצה על קישור (בטלפון זה סוגר את התפריט)
const Menu = ({ onNavigate }) => {
    const { pathname } = useLocation()

    return (
        <nav aria-label="תפריט ראשי" className="flex flex-col gap-1.5">
            {NAV_ITEMS.map((item) => {
                const active = isActive(item, pathname)
                const Icon = item.icon
                return (
                    <Link
                        key={item.to}
                        to={item.to}
                        onClick={onNavigate}
                        aria-current={active ? 'page' : undefined}
                        className={`flex items-center justify-between gap-3 min-h-12 px-3.5 rounded-xl text-base no-underline ${active
                            ? 'bg-sroia-light/20 text-white font-bold'
                            : 'text-sroia-menu hover:bg-white/5'
                            }`}
                    >
                        <span>{item.label}</span>
                        <Icon size={21} aria-hidden="true" className={active ? 'text-sroia-light' : ''} />
                    </Link>
                )
            })}
        </nav>
    )
}

export default Menu
