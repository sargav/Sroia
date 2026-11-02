import { NavLink, Outlet } from 'react-router-dom'
import { TabGroupContext } from './tabGroup'

// דף עם כותרת ולשוניות. כל לשונית היא כתובת משלה, והדף שלה מוצג מתחת (Outlet).
// tabs: [{ to, label, icon, count }]
const SectionTabs = ({ title, subtitle, tabs }) => (
    <div className="flex flex-col gap-5">
        <div>
            <h1 className="text-3xl font-extrabold text-sroia-dark">{title}</h1>
            {subtitle && <p className="text-[#565f52]">{subtitle}</p>}
        </div>

        {/* בטלפון הלשוניות נגללות הצידה אם לא נכנסות. הקו התחתון מצויר עם צל, ופס הגלילה מוסתר -
            אחרת הדפדפן (בעיקר בווינדוס) הוסיף פס גלילה עם חיצים ליד הלשוניות */}
        <nav aria-label={title} className="flex gap-6 overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden shadow-[inset_0_-1px_0_#C6D3BB]">
            {tabs.map(({ to, label, icon: Icon, count }) => (
                <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                        `flex shrink-0 items-center gap-2 min-h-12 px-0.5 border-b-[3px] no-underline whitespace-nowrap ${isActive
                            ? 'border-sroia-green text-sroia-dark font-extrabold'
                            : 'border-transparent text-[#565f52] hover:text-sroia-dark'
                        }`
                    }
                >
                    {({ isActive }) => (
                        <>
                            <Icon size={18} aria-hidden="true" />
                            {label}
                            {count > 0 && (
                                <span className={`text-xs font-extrabold px-2 py-0.5 rounded-full ${isActive ? 'bg-[#E3EFD3] text-[#2f4a17]' : 'bg-[#EEF0EC] text-[#3a4436]'}`}>
                                    {count}
                                </span>
                            )}
                        </>
                    )}
                </NavLink>
            ))}
        </nav>

        <TabGroupContext.Provider value={true}>
            <Outlet />
        </TabGroupContext.Provider>
    </div>
)

export default SectionTabs
