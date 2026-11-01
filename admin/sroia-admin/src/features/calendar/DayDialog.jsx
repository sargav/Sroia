import { useState } from 'react'
import { Plus, Trash2, MapPin } from 'lucide-react'
import Modal from '../../components/Modal'
import ConfirmDialog from '../../components/ConfirmDialog'
import { EVENT_KINDS, WEEKDAYS, MONTHS, timeLabel } from './calendarUtils'
import { useDeleteEventMutation } from './calendarApiSlice'

const START_HOUR = 7   // הציר מתחיל ב-07:00
const END_HOUR = 21    // ונגמר ב-21:00
const HOUR_PX = 56     // גובה של שעה אחת בפיקסלים

// חלון של יום אחד, לפי שעות
const DayDialog = ({ day, events, onClose, onAdd }) => {
    const [deleteEvent] = useDeleteEventMutation()
    const [toDelete, setToDelete] = useState(null)

    const hours = []
    for (let h = START_HOUR; h < END_HOUR; h++) hours.push(h)

    // מיקום של אירוע על הציר: שעה עשרונית (9:30 = 9.5), חתוך לגבולות הציר
    const hourOf = (date) => {
        const d = new Date(date)
        return Math.min(Math.max(d.getHours() + d.getMinutes() / 60, START_HOUR), END_HOUR)
    }

    const title = day ? `יום ${WEEKDAYS[day.getDay()]}, ${day.getDate()} ב${MONTHS[day.getMonth()]}` : ''
    const subtitle = events.length ? `${events.length} אירועים` : 'אין אירועים ביום הזה'

    return (
        <>
            <Modal
                open={!!day}
                onClose={onClose}
                title={title}
                subtitle={subtitle}
                wide
                actions={
                    <button type="button" onClick={onAdd}
                        className="min-h-10 px-3 rounded-lg bg-sroia-green text-white font-bold text-sm flex items-center gap-1 cursor-pointer">
                        <Plus size={16} aria-hidden="true" />
                        <span>אירוע</span>
                    </button>
                }
            >
                {/* ציר השעות */}
                <div className="flex">
                    <div className="w-14 shrink-0" aria-hidden="true">
                        {hours.map((h) => (
                            <div key={h} style={{ height: HOUR_PX }} className="text-xs text-[#565f52] -translate-y-2">
                                {String(h).padStart(2, '0')}:00
                            </div>
                        ))}
                    </div>
                    <div className="relative flex-1">
                        {hours.map((h) => (
                            <div key={h} style={{ height: HOUR_PX }} className="border-t border-[#EEF2E9]" aria-hidden="true" />
                        ))}
                        {events.map((ev) => {
                            const kind = EVENT_KINDS[ev.type] || EVENT_KINDS.meet
                            const top = (hourOf(ev.start) - START_HOUR) * HOUR_PX
                            const height = Math.max((hourOf(ev.end) - hourOf(ev.start)) * HOUR_PX - 4, 28)
                            return (
                                <div key={ev._id}
                                    className="absolute inset-x-0 rounded-lg px-3 py-1 overflow-hidden text-[13px] leading-snug flex gap-2 group"
                                    style={{ top: top + 2, height, background: kind.bg, color: kind.fg, borderRight: `4px solid ${kind.fg}` }}>
                                    {height < 50 ? (
                                        // אירוע קצר (פחות משעה): הכל בשורה אחת
                                        <div className="flex-1 min-w-0 truncate">
                                            <b>{ev.title}</b> · {timeLabel(ev.start)}–{timeLabel(ev.end)}
                                        </div>
                                    ) : (
                                        <div className="flex-1 min-w-0">
                                            <b className="block truncate">{ev.title}</b>
                                            <span>{timeLabel(ev.start)}–{timeLabel(ev.end)} · {kind.label}{ev.manager?.name ? ` · ${ev.manager.name}` : ''}</span>
                                            {ev.location && <span className="flex items-center gap-1"><MapPin size={12} aria-hidden="true" />{ev.location}</span>}
                                        </div>
                                    )}
                                    <button type="button" onClick={() => setToDelete(ev)} aria-label={`מחיקת ${ev.title}`}
                                        className="self-start w-8 h-8 flex items-center justify-center rounded-md hover:bg-white/60 cursor-pointer">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </Modal>

            <ConfirmDialog
                open={toDelete !== null}
                title="למחוק את האירוע?"
                message={toDelete ? `"${toDelete.title}" יימחק מהיומן.` : ''}
                onConfirm={() => { deleteEvent(toDelete._id); setToDelete(null) }}
                onCancel={() => setToDelete(null)}
            />
        </>
    )
}

export default DayDialog
