import { useCallback, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Mail, Phone, AtSign, Eye, EyeOff, KeyRound, UserRound } from 'lucide-react'
import { useUpdateMeMutation } from './profileApiSlice'
import { useGetManagersQuery } from '../managers/managersApiSlice'
import { useRefreshMutation } from '../auth/authApiSlice'
import { setToken } from '../auth/authSlice'
import useCurrentManager from '../auth/useCurrentManager'
import Toast from '../../components/Toast'
import { useGetContactsQuery } from '../contacts/contactsApiSlice'
import { useGetEventsQuery, useGetTasksQuery } from '../calendar/calendarApiSlice'
import cover from '../../assets/profile-cover.webp'

// טווח השבוע הנוכחי: מיום ראשון 00:00 עד יום ראשון הבא
const thisWeek = () => {
    const start = new Date()
    start.setHours(0, 0, 0, 0)
    start.setDate(start.getDate() - start.getDay())
    const end = new Date(start)
    end.setDate(start.getDate() + 7)
    return { from: start.toISOString(), to: end.toISOString() }
}

// ההודעות של השרת -> עברית
const ERRORS = {
    'Invalid name': 'השם לא תקין',
    'Invalid email': 'המייל לא תקין',
    'Invalid phone': 'מספר הטלפון לא תקין',
    'Email already exists': 'המייל הזה כבר שייך למנהל אחר',
    'Current password is required': 'יש להקליד את הסיסמה הנוכחית',
    'Current password is incorrect': 'הסיסמה הנוכחית שגויה',
    'Password must be at least 6 characters with letters and numbers': 'הסיסמה החדשה צריכה לפחות 6 תווים, עם אותיות ומספרים',
}
const toHebrew = (err) => {
    if (err?.status === 'FETCH_ERROR') return 'אין חיבור לשרת'
    return ERRORS[err?.data?.message] || 'השמירה נכשלה, נסי שוב'
}

const inputBox = 'flex items-center gap-2 min-h-12 px-3 bg-sroia-bg border border-transparent rounded-xl focus-within:border-sroia-green focus-within:bg-white'
const inputClass = 'flex-1 min-w-0 bg-transparent outline-none text-[15px]'
const labelClass = 'flex flex-col gap-1.5 text-sm font-bold text-[#3a4436]'

// שדה סיסמה עם כפתור עין
const PasswordField = ({ label, name, autoComplete }) => {
    const [show, setShow] = useState(false)
    return (
        <label className={labelClass}>
            {label}
            <span className={inputBox}>
                <KeyRound size={18} aria-hidden="true" className="text-[#8a9386]" />
                <input name={name} type={show ? 'text' : 'password'} autoComplete={autoComplete} required className={inputClass} />
                <button type="button" onClick={() => setShow(!show)} aria-label={show ? 'הסתרת הסיסמה' : 'הצגת הסיסמה'}
                    className="w-9 h-9 flex items-center justify-center rounded-lg text-[#565f52] hover:bg-black/5 cursor-pointer">
                    {show ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
                </button>
            </span>
        </label>
    )
}

const ProfilePage = () => {
    const me = useCurrentManager()
    const dispatch = useDispatch()
    const { data: managers = [], isLoading } = useGetManagersQuery()
    const [updateMe, { isLoading: isSaving }] = useUpdateMeMutation()
    const [refresh] = useRefreshMutation()

    // המונים בראש הדף
    const week = useMemo(() => thisWeek(), [])
    const { data: contacts = [] } = useGetContactsQuery()
    const { data: events = [] } = useGetEventsQuery(week)
    const { data: tasks = [] } = useGetTasksQuery('mine')
    const stats = [
        { label: 'פניות חדשות', value: contacts.filter((c) => !c.isRead).length, color: 'text-[#2f4a17]' },
        { label: 'אירועים השבוע', value: events.filter((ev) => ev.manager?._id === me?._id).length, color: 'text-[#1d4a66]' },
        { label: 'משימות פתוחות', value: tasks.filter((t) => t.status !== 'done').length, color: 'text-[#6b4f00]' },
    ]

    const [toast, setToast] = useState(null) // { type, title, details }
    const closeToast = useCallback(() => setToast(null), [])

    // הפרטים המלאים (כולל טלפון) - מרשימת המנהלים, לפי ה-id שבטוקן
    const manager = managers.find((m) => m._id === me?._id)

    const saveDetails = async (e) => {
        e.preventDefault()
        const f = Object.fromEntries(new FormData(e.target))
        try {
            await updateMe({ name: f.name.trim(), email: f.email.trim(), phone: f.phone.trim() }).unwrap()
            // הטוקן שומר את השם - מבקשים טוקן חדש כדי שהשם יתעדכן גם בברכה בדף הבית
            const { accessToken } = await refresh().unwrap()
            dispatch(setToken(accessToken))
            setToast({ type: 'success', title: 'הפרטים נשמרו' })
        } catch (err) {
            setToast({ type: 'error', title: toHebrew(err) })
        }
    }

    const savePassword = async (e) => {
        e.preventDefault()
        const form = e.target
        const f = Object.fromEntries(new FormData(form))
        if (f.newPassword !== f.confirmPassword) {
            return setToast({ type: 'error', title: 'הסיסמאות לא תואמות', details: 'הסיסמה החדשה והאימות שלה צריכים להיות זהים.' })
        }
        if (f.newPassword === f.currentPassword) {
            return setToast({ type: 'error', title: 'זו אותה סיסמה', details: 'הסיסמה החדשה צריכה להיות שונה מהנוכחית.' })
        }
        try {
            await updateMe({ currentPassword: f.currentPassword, newPassword: f.newPassword }).unwrap()
            form.reset()
            setToast({ type: 'success', title: 'הסיסמה עודכנה', details: 'בפעם הבאה מתחברים עם הסיסמה החדשה.' })
        } catch (err) {
            setToast({ type: 'error', title: toHebrew(err) })
        }
    }

    if (isLoading) return <p>טוען...</p>
    if (!manager) return <p role="alert">לא הצלחנו לטעון את הפרטים שלך</p>

    const joined = manager.createdAt ? new Date(manager.createdAt).toLocaleDateString('he-IL', { month: 'long', year: 'numeric' }) : ''

    return (
        <div className="flex flex-col gap-6 max-w-5xl">
            {/* באנר עם תמונה מהאתר */}
            <div>
                <div className="relative h-36 md:h-44 rounded-3xl overflow-hidden">
                    <img src={cover} alt="" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, rgba(45,56,43,0.75), rgba(45,56,43,0.2))' }} />
                </div>
                <div className="relative flex flex-wrap items-end gap-x-4 gap-y-3 px-4 md:px-6">
                    <span aria-hidden="true"
                        className="-mt-12 w-24 h-24 md:w-26 md:h-26 rounded-[28px] bg-sroia-light text-sroia-dark border-[5px] border-sroia-bg flex items-center justify-center text-5xl font-extrabold">
                        {manager.name?.[0] || '?'}
                    </span>
                    <div className="flex-1 min-w-[160px] pb-1">
                        <h2 className="text-3xl font-extrabold text-sroia-dark">{manager.name}</h2>
                        <p className="text-[#565f52] flex flex-wrap gap-x-3">
                            <span className="flex items-center gap-1"><AtSign size={15} aria-hidden="true" />{manager.manName}</span>
                            {joined && <span>· מנהל/ת מאז {joined}</span>}
                        </p>
                    </div>
                    <ul className="flex gap-2 pb-2 w-full sm:w-auto">
                        {stats.map((st) => (
                            <li key={st.label} className="flex-1 sm:flex-none bg-white rounded-2xl px-4 py-2 flex flex-col items-center shadow-[0_1px_2px_rgba(45,56,43,0.06),0_4px_16px_rgba(45,56,43,0.05)]">
                                <span className={`text-2xl font-extrabold ${st.color}`}>{st.value}</span>
                                <span className="text-xs text-[#565f52] whitespace-nowrap">{st.label}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* פרטים אישיים */}
                <section aria-labelledby="details-title" className="bg-white rounded-2xl p-6 shadow-[0_1px_2px_rgba(45,56,43,0.06),0_4px_16px_rgba(45,56,43,0.05)] flex flex-col gap-5">
                    <div className="flex items-center gap-3">
                        <span className="w-10 h-10 rounded-xl bg-[#E3EFD3] text-sroia-green flex items-center justify-center"><UserRound size={20} aria-hidden="true" /></span>
                        <div>
                            <h2 id="details-title" className="text-lg font-extrabold text-sroia-dark">הפרטים שלי</h2>
                            <p className="text-sm text-[#565f52]">שם, מייל וטלפון ליצירת קשר</p>
                        </div>
                    </div>
                    {/* key - כדי שהשדות יתמלאו מחדש אחרי שמירה */}
                    <form key={manager.updatedAt} onSubmit={saveDetails} className="flex flex-col gap-4">
                        <label className={labelClass}>
                            שם מלא
                            <span className={inputBox}>
                                <UserRound size={18} aria-hidden="true" className="text-[#8a9386]" />
                                <input name="name" defaultValue={manager.name} required className={inputClass} />
                            </span>
                        </label>
                        <label className={labelClass}>
                            מייל
                            <span className={inputBox}>
                                <Mail size={18} aria-hidden="true" className="text-[#8a9386]" />
                                <input name="email" type="email" dir="ltr" defaultValue={manager.email} required className={`${inputClass} text-right`} />
                            </span>
                        </label>
                        <label className={labelClass}>
                            טלפון
                            <span className={inputBox}>
                                <Phone size={18} aria-hidden="true" className="text-[#8a9386]" />
                                <input name="phone" type="tel" dir="ltr" defaultValue={manager.phone} required className={`${inputClass} text-right`} />
                            </span>
                        </label>
                        <p className="text-xs text-[#8a9386]">את שם המשתמש ({manager.manName}) אי אפשר לשנות.</p>
                        <button type="submit" disabled={isSaving}
                            className="self-start min-h-11 px-6 rounded-xl bg-sroia-green text-white font-bold cursor-pointer disabled:opacity-50">
                            {isSaving ? 'שומר...' : 'שמירת הפרטים'}
                        </button>
                    </form>
                </section>

                {/* שינוי סיסמה */}
                <section aria-labelledby="password-title" className="bg-white rounded-2xl p-6 shadow-[0_1px_2px_rgba(45,56,43,0.06),0_4px_16px_rgba(45,56,43,0.05)] flex flex-col gap-5">
                    <div className="flex items-center gap-3">
                        <span className="w-10 h-10 rounded-xl bg-[#FDF3DC] text-[#6b4f00] flex items-center justify-center"><KeyRound size={20} aria-hidden="true" /></span>
                        <div>
                            <h2 id="password-title" className="text-lg font-extrabold text-sroia-dark">שינוי סיסמה</h2>
                            <p className="text-sm text-[#565f52]">לפחות 6 תווים, עם אותיות ומספרים</p>
                        </div>
                    </div>
                    <form onSubmit={savePassword} className="flex flex-col gap-4">
                        <PasswordField label="סיסמה נוכחית" name="currentPassword" autoComplete="current-password" />
                        <PasswordField label="סיסמה חדשה" name="newPassword" autoComplete="new-password" />
                        <PasswordField label="אימות הסיסמה החדשה" name="confirmPassword" autoComplete="new-password" />
                        <button type="submit" disabled={isSaving}
                            className="self-start min-h-11 px-6 rounded-xl bg-sroia-dark text-white font-bold cursor-pointer disabled:opacity-50">
                            {isSaving ? 'שומר...' : 'עדכון הסיסמה'}
                        </button>
                    </form>
                </section>
            </div>

            <Toast message={toast?.title} details={toast?.details} type={toast?.type} onClose={closeToast} />
        </div>
    )
}

export default ProfilePage
