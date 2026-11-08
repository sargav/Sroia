import { House, Inbox, CalendarDays, LayoutTemplate, Settings } from 'lucide-react'

// 5 הפריטים של התפריט. (הפרופיל לא כאן - מגיעים אליו מהעיגול עם השם: למטה בתפריט במחשב, למעלה בטלפון). כל פריט "פעיל" גם בכתובות של הלשוניות שבתוכו (paths)
export const NAV_ITEMS = [
    { to: '/', label: 'דף הבית', short: 'בית', icon: House, paths: ['/'] },
    { to: '/contacts', label: 'פניות והרשמות', short: 'פניות', icon: Inbox, paths: ['/contacts', '/registrations'] },
    { to: '/calendar', label: 'יומן ומשימות', short: 'יומן', icon: CalendarDays, paths: ['/calendar'] },
    { to: '/images', label: 'תוכן האתר', short: 'תוכן', icon: LayoutTemplate, paths: ['/images', '/videos', '/site'] },
    { to: '/settings', label: 'הגדרות', short: 'הגדרות', icon: Settings, paths: ['/settings'] },
]

// האם הכתובת הנוכחית שייכת לפריט
export const isActive = (item, pathname) =>
    item.paths.some((p) => (p === '/' ? pathname === '/' : pathname.startsWith(p)))
