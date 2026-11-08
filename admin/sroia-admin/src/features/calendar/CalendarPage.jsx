import { useMemo, useState } from 'react'
import { ChevronRight, ChevronLeft, Plus, MapPin } from 'lucide-react'
import { useGetEventsQuery } from './calendarApiSlice'
import { EVENT_KINDS, WEEKDAYS, MONTHS, dayKey, timeLabel, sameDay, monthGrid, groupByDay } from './calendarUtils'
import useCurrentManager from '../auth/useCurrentManager'
import DayDialog from './DayDialog'
import EventFormDialog from './EventFormDialog'
import TasksPanel from './TasksPanel'

const CalendarPage = () => {
    const today = new Date()
    const me = useCurrentManager()

    const [month, setMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1))
    const [selectedDay, setSelectedDay] = useState(null)   // היום שהחלון שלו פתוח
    const [formDate, setFormDate] = useState(null)         // "2026-11-12" כשטופס אירוע חדש פתוח
    const [editing, setEditing] = useState(null)           // האירוע שעורכים (אם יש)
    const [onlyMine, setOnlyMine] = useState(false)

    // הימים בלוח, והטווח שמבקשים מהשרת
    const { days, from, to } = useMemo(() => monthGrid(month), [month])
    const { data: events = [], isLoading, isError } = useGetEventsQuery({ from: from.toISOString(), to: to.toISOString() })

    // סינון "רק שלי" בצד הלקוח - בלי לפנות שוב לשרת
    const shown = onlyMine && me ? events.filter((ev) => ev.manager?._id === me._id) : events
    const byDay = useMemo(() => groupByDay(shown), [shown])

    const moveMonth = (delta) => setMonth(new Date(month.getFullYear(), month.getMonth() + delta, 1))
    const todayEvents = byDay[dayKey(today)] || []

    return (
        <div className="flex flex-col gap-5">
            {/* פס עליון */}
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <h1 className="text-3xl font-extrabold text-sroia-dark min-w-[11ch]">{MONTHS[month.getMonth()]} {month.getFullYear()}</h1>
                    <button type="button" onClick={() => moveMonth(-1)} aria-label="החודש הקודם"
                        className="w-10 h-10 flex items-center justify-center rounded-lg border border-sroia-line bg-white cursor-pointer">
                        <ChevronRight size={18} aria-hidden="true" />
                    </button>
                    <button type="button" onClick={() => moveMonth(1)} aria-label="החודש הבא"
                        className="w-10 h-10 flex items-center justify-center rounded-lg border border-sroia-line bg-white cursor-pointer">
                        <ChevronLeft size={18} aria-hidden="true" />
                    </button>
                    <button type="button" onClick={() => setMonth(new Date(today.getFullYear(), today.getMonth(), 1))}
                        className="min-h-10 px-3 rounded-lg border border-sroia-line bg-white cursor-pointer">
                        היום
                    </button>
                </div>
                <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                        <input type="checkbox" checked={onlyMine} onChange={(e) => setOnlyMine(e.target.checked)} className="w-5 h-5 accent-sroia-green" />
                        רק שלי
                    </label>
                    <button type="button" onClick={() => setFormDate(dayKey(selectedDay || today))}
                        className="min-h-11 px-4 rounded-lg bg-sroia-green text-white font-bold flex items-center gap-2 cursor-pointer">
                        <span>אירוע חדש</span>
                        <Plus size={18} aria-hidden="true" />
                    </button>
                </div>
            </div>

            {/* מקרא */}
            <div className="flex flex-wrap gap-4 text-sm text-[#3a4436]">
                {Object.values(EVENT_KINDS).map((k) => (
                    <span key={k.label} className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded" style={{ background: k.bg, border: `1px solid ${k.fg}` }} />
                        {k.label}
                    </span>
                ))}
            </div>

            {isError && <p role="alert">לא הצלחנו לטעון את היומן</p>}

            <div className="flex flex-wrap gap-5 items-start">
                {/* הלוח החודשי */}
                <div className="flex-[999_1_560px] min-w-0 bg-white border border-sroia-edge rounded-xl overflow-hidden" aria-busy={isLoading}>
                    <div className="grid grid-cols-7 bg-[#F0F3E8]">
                        {WEEKDAYS.map((d, i) => (
                            <div key={d} className="py-2 text-center text-xs md:text-sm font-bold text-[#565f52]">
                                <span className="md:hidden" aria-hidden="true">{'אבגדהוש'[i]}</span>
                                <span className="max-md:hidden">{d}</span>
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-7">
                        {days.map((day) => {
                            const key = dayKey(day)
                            const dayEvents = byDay[key] || []
                            const inMonth = day.getMonth() === month.getMonth()
                            const isToday = sameDay(day, today)
                            return (
                                <button
                                    key={key}
                                    type="button"
                                    onClick={() => setSelectedDay(day)}
                                    aria-label={`${day.getDate()} ב${MONTHS[day.getMonth()]}, ${dayEvents.length ? `${dayEvents.length} אירועים` : 'אין אירועים'}`}
                                    className={`min-h-14 md:min-h-26 p-1 md:p-1.5 border-t border-l border-sroia-subtle flex flex-col items-center md:items-stretch gap-1 text-right cursor-pointer hover:bg-[#F4F8EE] min-w-0
                                        ${inMonth ? 'bg-white' : 'bg-[#FAFBF8]'}`}
                                >
                                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-sm
                                        ${isToday ? 'bg-sroia-green text-white font-extrabold' : inMonth ? 'text-[#1f261c]' : 'text-[#a3ab9f]'}`}>
                                        {day.getDate()}
                                    </span>

                                    {/* בטלפון: נקודות */}
                                    <span className="md:hidden flex gap-0.5 h-1.5">
                                        {dayEvents.slice(0, 3).map((ev) => (
                                            <span key={ev._id} className="w-1.5 h-1.5 rounded-full" style={{ background: EVENT_KINDS[ev.type]?.fg }} />
                                        ))}
                                    </span>

                                    {/* במחשב: עד שני אירועים + "עוד" */}
                                    <span className="max-md:hidden flex flex-col gap-1 min-w-0">
                                        {dayEvents.slice(0, 2).map((ev) => {
                                            const kind = EVENT_KINDS[ev.type] || EVENT_KINDS.meet
                                            return (
                                                <span key={ev._id} className="block truncate rounded-md px-1.5 py-0.5 text-xs"
                                                    style={{ background: kind.bg, color: kind.fg }}>
                                                    <b>{timeLabel(ev.start)}</b> {ev.title}
                                                </span>
                                            )
                                        })}
                                        {dayEvents.length > 2 && (
                                            <span className="text-xs font-bold text-sroia-green">+{dayEvents.length - 2} נוספים</span>
                                        )}
                                    </span>
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* בצד: היום + משימות */}
                <div className="flex-[1_1_280px] min-w-0 flex flex-col gap-4">
                    <section aria-labelledby="today-title" className="bg-white border border-sroia-edge rounded-xl p-4">
                        <h2 id="today-title" className="text-lg font-extrabold text-sroia-dark mb-1">
                            היום · {WEEKDAYS[today.getDay()]} {today.getDate()}.{today.getMonth() + 1}
                        </h2>
                        {todayEvents.length === 0
                            ? <p className="text-sm text-[#565f52]">אין אירועים היום</p>
                            : (
                                // גובה מוגבל - אם יש הרבה אירועים, גוללים בתוך הקופסה
                                <ul className="max-h-60 overflow-y-auto overscroll-contain -mx-1 px-1">
                                    {todayEvents.map((ev) => (
                                        <li key={ev._id} className="flex gap-3 py-2 border-t border-sroia-subtle first:border-t-0">
                                            <span className="w-1 rounded" style={{ background: EVENT_KINDS[ev.type]?.fg }} />
                                            <span className="flex flex-col">
                                                <span className="text-sm font-bold text-[#3a4436]">{timeLabel(ev.start)}</span>
                                                <span>{ev.title}</span>
                                                {ev.location && (
                                                    <span className="text-xs text-[#565f52] flex items-center gap-1">
                                                        <MapPin size={12} aria-hidden="true" />{ev.location}
                                                    </span>
                                                )}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                    </section>
                    <TasksPanel />
                </div>
            </div>

            <DayDialog
                day={selectedDay}
                events={selectedDay ? (byDay[dayKey(selectedDay)] || []) : []}
                onClose={() => setSelectedDay(null)}
                onAdd={() => setFormDate(dayKey(selectedDay))}
                onEdit={(ev) => setEditing(ev)}
            />
            <EventFormDialog
                open={formDate !== null || editing !== null}
                date={formDate || ''}
                event={editing}
                onClose={() => { setFormDate(null); setEditing(null) }}
            />
        </div>
    )
}

export default CalendarPage
