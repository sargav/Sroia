import { useState } from 'react'
import Modal from '../../components/Modal'
import { EVENT_KINDS } from './calendarUtils'
import { useAddEventMutation } from './calendarApiSlice'
import { useGetManagersQuery } from '../managers/managersApiSlice'

// ההודעות של השרת -> עברית
const ERRORS = {
    'Title is required': 'יש לכתוב שם לאירוע',
    'Invalid type': 'יש לבחור סוג',
    'start and end are required dates': 'יש לבחור תאריך ושעות',
    'end must be after start': 'שעת הסיום חייבת להיות אחרי שעת ההתחלה',
}

const inputClass = 'font-normal min-h-11 px-3 border border-sroia-line rounded-lg bg-white'
const labelClass = 'flex flex-col gap-1 text-sm font-bold text-[#3a4436]'

// טופס אירוע חדש. date = "2026-11-12" (היום שנבחר)
const EventFormDialog = ({ open, date, onClose }) => {
    const [addEvent, { isLoading }] = useAddEventMutation()
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

        try {
            await addEvent({
                title: f.title,
                type: f.type,
                start: start.toISOString(),
                end: end.toISOString(),
                location: f.location,
                notes: f.notes,
                manager: f.manager || undefined, // ריק = מי שיצר
            }).unwrap()
            onClose()
        } catch (err) {
            setError(ERRORS[err.data?.message] || 'השמירה נכשלה, נסו שוב')
        }
    }

    return (
        <Modal open={open} onClose={onClose} title="אירוע חדש">
            {/* key - כדי שהטופס יתאפס כשמחליפים יום */}
            <form key={date} onSubmit={handleSubmit} className="flex flex-col gap-4">
                <label className={labelClass}>
                    מה
                    <input name="title" required maxLength={150} placeholder="למשל: פגישת היכרות – משפחת לוי" className={inputClass} />
                </label>

                <fieldset className="flex flex-wrap gap-2">
                    <legend className="text-sm font-bold text-[#3a4436] mb-1">סוג</legend>
                    {Object.entries(EVENT_KINDS).map(([id, kind], i) => (
                        <label key={id} className="cursor-pointer">
                            <input type="radio" name="type" value={id} defaultChecked={i === 0} className="peer sr-only" />
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
                        <input name="date" type="date" required defaultValue={date} className={inputClass} />
                    </label>
                    <label className={labelClass}>
                        משעה
                        <input name="startTime" type="time" required defaultValue="09:00" className={inputClass} />
                    </label>
                    <label className={labelClass}>
                        עד שעה
                        <input name="endTime" type="time" required defaultValue="10:00" className={inputClass} />
                    </label>
                </div>

                <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
                    <label className={labelClass}>
                        איפה
                        <input name="location" maxLength={150} placeholder="משרד / כתובת / טלפון" className={inputClass} />
                    </label>
                    <label className={labelClass}>
                        אחראי
                        <select name="manager" defaultValue="" className={inputClass}>
                            <option value="">אני</option>
                            {managers.map((m) => <option key={m._id} value={m._id}>{m.name}</option>)}
                        </select>
                    </label>
                </div>

                <label className={labelClass}>
                    הערות
                    <textarea name="notes" rows={2} maxLength={2000} className={`${inputClass} py-2`} />
                </label>

                {error && <p role="alert" className="text-sm text-[#8a2424]">{error}</p>}

                <button type="submit" disabled={isLoading}
                    className="min-h-11 px-5 rounded-lg bg-sroia-green text-white font-bold cursor-pointer disabled:opacity-50">
                    {isLoading ? 'שומר...' : 'שמירה'}
                </button>
            </form>
        </Modal>
    )
}

export default EventFormDialog
