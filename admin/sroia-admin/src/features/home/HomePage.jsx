import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
    CalendarDays, Mail, Clock, Check, TriangleAlert, TrendingUp, TrendingDown,
    ChevronLeft, Plus, MessageCircle, HardHat, MapPin, BookOpen,
} from 'lucide-react'
import { useGetContactsQuery } from '../contacts/contactsApiSlice'
import { useGetEventsQuery, useGetTasksQuery } from '../calendar/calendarApiSlice'
import { timeLabel, dayKey } from '../calendar/calendarUtils'
import EventFormDialog from '../calendar/EventFormDialog'
import useCurrentManager from '../auth/useCurrentManager'

// ברכה לפי השעה עכשיו
const greetingByHour = (hour) => {
    if (hour >= 5 && hour < 12) return 'בוקר טוב'
    if (hour >= 12 && hour < 17) return 'צהריים טובים'
    if (hour >= 17 && hour < 21) return 'ערב טוב'
    return 'לילה טוב'
}

const DAY = 24 * 60 * 60 * 1000
const SHORT_DAYS = ['א׳', 'ב׳', 'ג׳', 'ד׳', 'ה׳', 'ו׳', 'ש׳']

// כל מקור של פנייה: שם, צבעים ואייקון
const SOURCES = {
    main_contact: { label: 'צור קשר', bg: 'bg-[#E8F1FB]', fg: 'text-[#1d4a66]', icon: MessageCircle },
    project_mgmt: { label: 'ניהול פרויקטים', bg: 'bg-[#E9F3DF]', fg: 'text-[#2f4a17]', icon: HardHat },
    compass_app: { label: 'המצפן לבונה', bg: 'bg-[#F3ECFA]', fg: 'text-[#4f2d66]', icon: MapPin },
    builder_guide: { label: 'המדריך לבונה', bg: 'bg-[#FDF3DC]', fg: 'text-[#6b4f00]', icon: BookOpen },
}

// כל הזמנים שהדף צריך, מחושבים פעם אחת כשהדף נפתח
const makeDates = () => {
    const now = new Date()
    const today = new Date(now)
    today.setHours(0, 0, 0, 0)
    const weekStart = new Date(today)
    weekStart.setDate(today.getDate() - today.getDay()) // יום ראשון
    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekStart.getDate() + 7)
    return { now, today, week: { from: weekStart.toISOString(), to: weekEnd.toISOString() } }
}

// "היום, 10:42" / "אתמול, 21:03" / "28.10"
const whenLabel = (date, today) => {
    const d = new Date(date)
    if (d >= today) return `היום, ${timeLabel(d)}`
    if (d >= new Date(today.getTime() - DAY)) return `אתמול, ${timeLabel(d)}`
    return `${d.getDate()}.${d.getMonth() + 1}`
}

// ריבוע מספר אחד בראש הדף
const StatTile = ({ to, label, value, sub, warn, icon: Icon, iconClass }) => (
    <Link to={to} className="bg-white rounded-2xl shadow-sm border border-transparent hover:border-sroia-light p-5 flex flex-col gap-2.5 no-underline text-inherit">
        <span className="flex items-center justify-between">
            <span className="text-[15px] text-[#3a4436]">{label}</span>
            <span className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconClass}`}>
                <Icon size={20} aria-hidden="true" />
            </span>
        </span>
        <span className="text-4xl font-extrabold leading-none text-[#1f261c]">{value}</span>
        {sub && (
            <span className={`text-[13px] flex items-center gap-1.5 ${warn ? 'text-[#8a5a00]' : 'text-[#565f52]'}`}>
                {warn && <TriangleAlert size={14} aria-hidden="true" />}
                {sub}
            </span>
        )}
    </Link>
)

const HomePage = () => {
    const me = useCurrentManager()
    const [{ now, today, week }] = useState(makeDates)
    const [newEventOpen, setNewEventOpen] = useState(false)

    const { data: contacts = [] } = useGetContactsQuery()
    const { data: events = [] } = useGetEventsQuery(week)
    const { data: tasks = [] } = useGetTasksQuery('mine')

    // ===== הריבועים =====
    const unread = contacts.filter((c) => !c.isRead)
    const unreadToday = unread.filter((c) => new Date(c.createdAt) >= today).length
    const unreplied = contacts.filter((c) => !c.isReplied)
    // כמה ימים מחכה הפנייה הכי ותיקה שלא נענתה
    const oldestWaiting = unreplied.length
        ? Math.floor((now - Math.min(...unreplied.map((c) => new Date(c.createdAt)))) / DAY)
        : 0
    const nextEvent = events
        .filter((ev) => new Date(ev.start) > now)
        .sort((a, b) => new Date(a.start) - new Date(b.start))[0]
    const weekTasks = tasks.filter((t) => t.dueDate && t.dueDate >= week.from && t.dueDate < week.to)
    const doneTasks = weekTasks.filter((t) => t.status === 'done').length
    const lateTasks = tasks.filter((t) => t.status !== 'done' && t.dueDate && new Date(t.dueDate) < today).length

    const nextEventLabel = nextEvent
        ? `הבא: ${dayKey(nextEvent.start) === dayKey(now) ? 'היום' : SHORT_DAYS[new Date(nextEvent.start).getDay()]} ב-${timeLabel(nextEvent.start)}`
        : 'אין עוד אירועים השבוע'

    // ===== הגרף: 7 הימים האחרונים =====
    const days = Array.from({ length: 7 }, (_, i) => {
        const start = new Date(today.getTime() - (6 - i) * DAY)
        const end = new Date(start.getTime() + DAY)
        const count = contacts.filter((c) => {
            const d = new Date(c.createdAt)
            return d >= start && d < end
        }).length
        return { start, count, isToday: i === 6 }
    })
    const weekTotal = days.reduce((sum, d) => sum + d.count, 0)
    const prevStart = new Date(today.getTime() - 13 * DAY)
    const prevEnd = new Date(today.getTime() - 6 * DAY)
    const prevTotal = contacts.filter((c) => {
        const d = new Date(c.createdAt)
        return d >= prevStart && d < prevEnd
    }).length
    const diff = weekTotal - prevTotal
    const maxCount = Math.max(4, ...days.map((d) => d.count))

    // ===== 5 הפניות האחרונות =====
    const latest = [...contacts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5)

    return (
        <div className="flex flex-col gap-6">
            {/* ברכה, תאריך וכפתור */}
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div className="flex flex-col gap-1.5">
                    <h1 className="text-3xl font-extrabold text-sroia-dark">
                        {me?.name ? `${greetingByHour(now.getHours())}, ${me.name}` : greetingByHour(now.getHours())}
                    </h1>
                    <p className="flex items-center gap-2 font-medium text-sroia-green">
                        <CalendarDays size={18} aria-hidden="true" />
                        {now.toLocaleDateString('he-IL', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                </div>
                <button
                    type="button"
                    onClick={() => setNewEventOpen(true)}
                    className="min-h-11 px-4 rounded-xl bg-sroia-green text-white font-bold text-sm flex items-center gap-2 cursor-pointer hover:bg-sroia-dark"
                >
                    <Plus size={17} aria-hidden="true" />
                    אירוע חדש
                </button>
            </div>

            {/* 4 ריבועים */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
                <StatTile to="/contacts?filter=unread" label="פניות שלא נקראו" value={unread.length}
                    sub={unreadToday ? `${unreadToday} מהן הגיעו היום` : ''} icon={Mail} iconClass="bg-sroia-tint text-sroia-ink" />
                <StatTile to="/contacts?filter=unreplied" label="ממתינות למענה" value={unreplied.length}
                    sub={oldestWaiting >= 3 ? `הוותיקה מחכה ${oldestWaiting} ימים` : ''} warn icon={Clock} iconClass="bg-[#FDF3DC] text-[#7a5a00]" />
                <StatTile to="/calendar" label="אירועים השבוע" value={events.length}
                    sub={nextEventLabel} icon={CalendarDays} iconClass="bg-[#DCEBF5] text-[#1d4a66]" />
                <StatTile to="/calendar" label="משימות השבוע" value={weekTasks.length}
                    sub={`${doneTasks} בוצעו${lateTasks ? ` · ${lateTasks} באיחור` : ''}`} icon={Check} iconClass="bg-[#EFE4F5] text-[#4f2d66]" />
            </div>

            <div className="flex flex-wrap gap-3.5">
                {/* גרף: פניות בכל יום בשבוע האחרון */}
                <section className="flex-[3_1_420px] bg-white rounded-2xl shadow-sm p-5 flex flex-col gap-3.5">
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <h2 className="text-lg font-extrabold text-sroia-dark">פניות בשבוע האחרון</h2>
                            <p className="text-sm text-[#565f52]">כמה פניות נכנסו בכל יום</p>
                        </div>
                        <div className="text-left">
                            <span className="block text-3xl font-extrabold leading-none text-sroia-dark">{weekTotal}</span>
                            {diff !== 0 && (
                                <span className={`text-[13px] flex items-center gap-1 ${diff > 0 ? 'text-[#3d7a1f]' : 'text-[#8a5a00]'}`}>
                                    {diff > 0 ? <TrendingUp size={14} aria-hidden="true" /> : <TrendingDown size={14} aria-hidden="true" />}
                                    {diff > 0 ? `+${diff}` : diff} מהשבוע שעבר
                                </span>
                            )}
                        </div>
                    </div>
                    <div
                        role="img"
                        aria-label={`פניות לפי יום: ${days.map((d) => `${SHORT_DAYS[d.start.getDay()]} ${d.count}`).join(', ')}`}
                        className="flex items-end gap-3 h-60 pt-2 pb-0.5 border-b border-sroia-edge"
                    >
                        {days.map((d) => (
                            <div key={d.start.toISOString()} className="flex-1 h-full flex flex-col items-center justify-end gap-1.5">
                                <span className={`text-[13px] font-bold ${d.count ? 'text-sroia-dark' : 'text-[#a3ab9f]'}`}>{d.count}</span>
                                <div
                                    className={`w-full max-w-11 rounded-t-lg rounded-b-sm ${d.isToday ? 'bg-sroia-green' : d.count ? 'bg-sroia-soft' : 'bg-sroia-edge'}`}
                                    style={{ height: Math.max(4, (d.count / maxCount) * 160) }}
                                />
                                <span className="flex flex-col items-center leading-tight">
                                    <b className={`text-[13px] ${d.isToday ? 'text-sroia-dark' : 'text-[#3a4436]'}`}>{SHORT_DAYS[d.start.getDay()]}</b>
                                    <span className="text-xs text-[#6b7468]">
                                        {d.isToday ? 'היום' : `${d.start.getDate()}.${d.start.getMonth() + 1}`}
                                    </span>
                                </span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 5 הפניות האחרונות */}
                <section className="flex-[2_1_300px] bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col">
                    <div className="flex items-center justify-between gap-3 px-5 pt-5 pb-3">
                        <h2 className="text-lg font-extrabold text-sroia-dark">5 הפניות האחרונות</h2>
                        <Link to="/contacts" className="text-sm font-bold text-sroia-green no-underline flex items-center gap-1">
                            לכל הפניות
                            <ChevronLeft size={16} aria-hidden="true" />
                        </Link>
                    </div>
                    {latest.length === 0 && <p className="px-5 pb-5 text-[#565f52]">עוד אין פניות</p>}
                    <ul>
                        {latest.map((c) => {
                            const src = SOURCES[c.source] || SOURCES.main_contact
                            const SrcIcon = src.icon
                            return (
                                <li key={c._id}>
                                    <Link to="/contacts" className="flex items-center gap-3 px-5 py-2.5 border-t border-sroia-subtle no-underline text-inherit hover:bg-sroia-bg">
                                        <span className="relative shrink-0">
                                            <span aria-hidden="true" className={`w-9.5 h-9.5 rounded-full flex items-center justify-center font-extrabold ${src.bg} ${src.fg}`}>
                                                {c.name?.[0]}
                                            </span>
                                            {!c.isRead && (
                                                <span className="absolute -top-px -left-px w-3 h-3 rounded-full bg-sroia-light border-2 border-white">
                                                    <span className="sr-only">חדשה</span>
                                                </span>
                                            )}
                                        </span>
                                        <span className="flex-1 min-w-0 flex flex-col">
                                            <span className={`truncate text-[15px] ${c.isRead ? 'font-semibold' : 'font-extrabold'}`}>{c.name}</span>
                                            <span className="text-[13px] text-[#6b7468] flex items-center gap-1.5">
                                                <SrcIcon size={13} aria-hidden="true" />
                                                {src.label}
                                            </span>
                                        </span>
                                        <span className="text-xs text-[#6b7468] whitespace-nowrap">{whenLabel(c.createdAt, today)}</span>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </section>
            </div>

            <EventFormDialog open={newEventOpen} date={dayKey(now)} onClose={() => setNewEventOpen(false)} />
        </div>
    )
}

export default HomePage
