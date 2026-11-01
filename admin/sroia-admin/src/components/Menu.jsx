import { NavLink } from 'react-router-dom'
import { House, Inbox, Users, Image, Video, UserRound } from 'lucide-react'

const menuLinks = [
    { to: '/', label: 'דף הבית', icon: House },
    { to: '/contacts', label: 'פניות', icon: Inbox },
    { to: '/managers', label: 'מנהלים', icon: Users },
    { to: '/images', label: 'תמונות', icon: Image },
    { to: '/videos', label: 'סרטוני המלצות', icon: Video },
    { to: '/me', label: 'פרופיל', icon: UserRound },
]

const Menu = () => {
    return (
        <nav aria-label="תפריט ראשי" className="flex flex-col gap-1">
            {menuLinks.map(({ to, label, icon: Icon }) => (
                <NavLink
                    key={to}
                    to={to}
                    end={to === '/'}
                    className={({ isActive }) =>
                        `flex items-center justify-between gap-3 min-h-11 px-3 rounded-lg text-[15px] no-underline ${isActive
                            ? 'bg-sroia-light/20 text-white font-bold'
                            : 'text-[#D3DECC] hover:bg-white/5'
                        }`
                    }
                >
                    {({ isActive }) => (
                        <>
                            <span>{label}</span>
                            <Icon
                                size={20}
                                aria-hidden="true"
                                className={isActive ? 'text-sroia-light' : ''}
                            />
                        </>
                    )}
                </NavLink>
            ))}
        </nav>
    )
}

export default Menu