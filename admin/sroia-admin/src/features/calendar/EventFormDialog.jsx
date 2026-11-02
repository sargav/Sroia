import { useState } from 'react'
import Modal from '../../components/Modal'
import { EVENT_KINDS, dayKey, timeLabel } from './calendarUtils'
import { useAddEventMutation, useUpdateEventMutation } from './calendarApiSlice'
import { useGetManagersQuery } from '../managers/managersApiSlice'
import useCurrentManager from '../auth/useCurrentManager'

// ההודעות של השרת -> עברית
const ERRORS = {
    'Title is required': 'יש לכתוב שם לאירוע',
    'Invalid type': 'יש לבחור סוג',
    'start and end are required dates': 'יש לבחור תאריך ושעות',
    'end must be after start': 'שעת הסיום חייבת להיות אחרי שעת ההתחלה',
}

const inputClass = 'font-normal min-h-11 px-3 border border-sroia-line rounded-lg bg-white'
const labelClass = 'flex flex-col gap-1 text-sm font-bold text-[#3a4436]'

// טופס אירוע: חדש, או עריכה של אירוע קיים
// date  = "2026-11-12" - היום שנבחר (לאירוע חדש)
// event = האירוע לעריכה (אם נשלח - הטופס במצב עריכה וממולא בפרטים שלו)
const EventFormDialog = ({ open, date, event, onClose }) => {
    const [addEvent, { isLoading: isAdding }] = useAddEventMutation()
    const [updateEvent, { isLoading: isUpdating }] = useUpdateEventMutation()
    const isLoading = isAdding || isUpdating
    const isEdit = !!event
    const me = useCurrentManager()
    const { data: managers = [] } = useGetManagersQuery()
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        const f = Object.fromEntries(new FormData(e.target))
        // "2026-11-12" + "09:30" -> תאריך מקומי -> ISO לשרת
        const start = new Date(`${f.date}T${f.startTime}`)
        const end = new Date(`${f.date}T${f.endTime}`)
        if (isNaN(start) || isNaN(end)) return setError('יש לבחור תאריך ושעות')
        if (end <= start) return setError('שעת הסיום חייבת להיות אחרי שעת ההתחלה')

        const data = {
            title: f.title,
            type: f.type,
            start: start.toISOString(),
            end: end.toISOString(),
            location: f.location,
            notes: f.notes,
        }
        try {
            if (isEdit) {
                // בעריכה: "אני" = המנהל המחובר
                await updateEvent({ id: event._id, ...data, manager: f.manager || me?._id }).unwrap()
            } else {
                await addEvent({ ...data, manager: f.manager || undefined }).unwrap() // ריק = מי שיצר
            }
            onClose()
        } catch (err) {
            setError(ERRORS[err.data?.message] || 'השמירה נכשלה, נסו שוב')
        }
    }

    return (
        <Modal open={open} onClose={onClose} title={isEdit ? 'עריכת אירוע' : 'אירוע חדש'}>
            {/* key - כדי שהטופס יתאפס כשמחליפים יום או אירוע */}
            <form key={event?._id || date} onSubmit={handleSubmit} className="flex flex-col gap-4">
                <label className={labelClass}>
                    מה
                    <input name="title" required maxLength={150} defaultValue={event?.title || ''} placeholder="למשל: פגישת היכרות – משפחת לוי" className={inputClass} />
                </label>

                <fieldset className="flex flex-wrap gap-2">
                    <legend className="text-sm font-bold text-[#3a4436] mb-1">סוג</legend>
                    {Object.entries(EVENT_KINDS).map(([id, kind], i) => (
                        <label key={id} className="cursor-pointer">
                            <input type="radio" name="type" value={id} defaultChecked={event ? event.type === id : i === 0} className="peer sr-only" />
                            <span className="inline-flex items-center min-h-10 px-4 rounded-full border-2 border-transparent text-sm font-bold peer-checked:border-current peer-focus-visible:outline-2"
                                style={{ background: kind.bg, color: kind.fg }}>
                                {kind.label}
                            </span>
                        </label>
                    ))}
                </fieldset>

                <div className="grid grid-cols-3 gap-3 max-sm:grid-cols-1">
                    <label className={labelClass}>
                        תאריך
                        <input name="date" type="date" required defaultValue={event ? dayKey(event.start) : date} className={inputClass} />
                    </label>
                    <label className={labelClass}>
                        משעה
                        <input name="startTime" type="time" required defaultValue={event ? timeLabel(event.start) : '09:00'} className={inputClass} />
                    </label>
                    <label className={labelClass}>
                        עד שעה
                        <input name="endTime" type="time" required defaultValue={event ? timeLabel(event.end) : '10:00'} className={inputClass} />
                    </label>
                </div>

                <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
                    <label className={labelClass}>
                        איפה
                        <input name="location" maxLength={150} defaultValue={event?.location || ''} placeholder="משרד / כתובת / טלפון" className={inputClass} />
                    </label>
                    <label className={labelClass}>
                        אחראי
                        <select name="manager" defaultValue={event?.manager?._id || ''} className={inputClass}>
                            <option value="">אני</option>
                            {managers.map((m) => <option key={m._id} value={m._id}>{m.name}</option>)}
                        </select>
                    </label>
                </div>

                <label className={labelClass}>
                    הערות
                    <textarea name="notes" rows={2} maxLength={2000} defaultValue={event?.notes || ''} className={`${inputClass} py-2`} />
                </label>

                {error && <p role="alert" className="text-sm text-[#8a2424]">{error}</p>}

                <button type="submit" disabled={isLoading}
                    className="min-h-11 px-5 rounded-lg bg-sroia-green text-white font-bold cursor-pointer disabled:opacity-50">
                    {isLoading ? 'שומר...' : isEdit ? 'שמירת השינויים' : 'שמירה'}
                </button>
            </form>
        </Modal>
    )
}

export default EventFormDialog
