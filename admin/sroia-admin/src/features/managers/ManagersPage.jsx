import { useCallback, useState } from 'react'
import { UserPlus, Trash2, X, Mail, Phone, Eye, EyeOff } from 'lucide-react'
import {
    useGetManagersQuery,
    useAddManagerMutation,
    useDeleteManagerMutation,
} from './managersApiSlice'
import ConfirmDialog from '../../components/ConfirmDialog'
import PageHeader from '../../components/PageHeader'
import Toast from '../../components/Toast'
import useCurrentManager from '../auth/useCurrentManager'

// ההודעות של השרת (באנגלית) -> הודעה בעברית למנהל
const ERRORS = {
    'All fields are required': 'יש למלא את כל השדות',
    'Invalid name': 'השם לא תקין',
    'Invalid manager name': 'שם משתמש: 3-30 תווים באנגלית, מספרים, נקודה, מקף או קו תחתון, בלי רווחים',
    'Invalid email': 'המייל לא תקין',
    'Invalid phone': 'הטלפון לא תקין',
    'Password must be at least 6 characters with letters and numbers': 'סיסמה: לפחות 6 תווים, עם אותיות ומספרים',
    'Manager name already exists': 'שם המשתמש כבר תפוס',
    'Email already exists': 'המייל כבר קיים אצל מנהל אחר',
    'You cannot delete yourself': 'אי אפשר למחוק את עצמך',
}
const toHebrew = (err, fallback) => ERRORS[err?.data?.message] || fallback

// שגיאה במחיקה -> כותרת + הסבר מה קרה ומה לעשות
const deleteErrorInfo = (err) => {
    const serverMessage = err?.data?.message
    if (serverMessage === 'You cannot delete yourself') {
        return { title: 'אי אפשר למחוק את עצמך', details: 'כדי להסיר את המשתמש שלך, צריך שמנהל אחר ימחק אותו.' }
    }
    if (err?.status === 404) {
        return { title: 'המנהל כבר לא קיים', details: 'כנראה מנהל אחר מחק אותו בינתיים. הרשימה עודכנה.' }
    }
    if (err?.status === 400) {
        return { title: 'המחיקה נכשלה', details: 'הפרטים של המנהל לא תקינים. רענני את הדף ונסי שוב.' }
    }
    if (err?.status === 'FETCH_ERROR') {
        return { title: 'אין חיבור לשרת', details: 'בדקי את חיבור האינטרנט ונסי שוב.' }
    }
    if (err?.status === 401 || err?.status === 403) {
        return { title: 'פג תוקף ההתחברות', details: 'יש להתחבר מחדש ולנסות שוב.' }
    }
    return { title: 'המחיקה נכשלה', details: 'קרתה תקלה בשרת. נסי שוב בעוד רגע.' }
}

const emptyForm = { name: '', manName: '', email: '', phone: '', password: '', confirmPassword: '' }

const FIELDS = [
    { name: 'name', label: 'שם מלא', type: 'text', autoComplete: 'off' },
    { name: 'manName', label: 'שם משתמש (באנגלית)', type: 'text', autoComplete: 'off', dir: 'ltr' },
    { name: 'email', label: 'מייל', type: 'email', autoComplete: 'off', dir: 'ltr' },
    { name: 'phone', label: 'טלפון', type: 'tel', autoComplete: 'off', dir: 'ltr' },
]

// שדה סיסמה עם כפתור עין להצגה/הסתרה
const PasswordInput = ({ label, name, value, onChange, invalid, describedBy }) => {
    const [show, setShow] = useState(false)
    return (
        <label className="flex flex-col gap-1 text-sm font-bold text-[#3a4436]">
            {label}
            <span className={`flex items-center min-h-11 pe-1 ps-3 border rounded-lg bg-white focus-within:border-sroia-green ${invalid ? 'border-[#c0392b]' : 'border-sroia-line'}`}>
                <input
                    name={name}
                    type={show ? 'text' : 'password'}
                    autoComplete="new-password"
                    value={value}
                    onChange={onChange}
                    required
                    aria-invalid={invalid || undefined}
                    aria-describedby={describedBy}
                    className="flex-1 min-w-0 font-normal bg-transparent outline-none"
                />
                <button type="button" onClick={() => setShow(!show)} aria-label={show ? 'הסתרת הסיסמה' : 'הצגת הסיסמה'}
                    className="w-9 h-9 flex items-center justify-center rounded-md text-[#565f52] hover:bg-sroia-bg cursor-pointer">
                    {show ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
                </button>
            </span>
        </label>
    )
}

const ManagersPage = () => {
    const { data: managers = [], isLoading, isError, refetch } = useGetManagersQuery()
    const [addManager, { isLoading: isAdding }] = useAddManagerMutation()
    const [deleteManager] = useDeleteManagerMutation()

    const [showForm, setShowForm] = useState(false)
    const [form, setForm] = useState(emptyForm)
    const [formError, setFormError] = useState('')
    const [listError, setListError] = useState(null) // { title, details }
    const closeToast = useCallback(() => setListError(null), [])
    const me = useCurrentManager()
    const [toDelete, setToDelete] = useState(null)

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleAdd = async (e) => {
        e.preventDefault()
        setFormError('')
        if (form.password !== form.confirmPassword) {
            return setFormError('הסיסמאות לא תואמות - הקלידו את אותה סיסמה פעמיים')
        }
        // את האימות לא שולחים לשרת - הוא רק לבדיקה כאן
        const data = { ...form }
        delete data.confirmPassword
        try {
            await addManager(data).unwrap()
            setForm(emptyForm)
            setShowForm(false)
        } catch (err) {
            setFormError(toHebrew(err, 'ההוספה נכשלה, נסו שוב'))
        }
    }

    const confirmDelete = async () => {
        const manager = toDelete
        setToDelete(null)
        setListError(null)
        try {
            await deleteManager(manager._id).unwrap()
        } catch (err) {
            setListError(deleteErrorInfo(err))
            if (err?.status === 404) refetch() // מישהו אחר כבר מחק - מרעננים את הרשימה
        }
    }

    return (
        <div className="flex flex-col gap-6">
            <PageHeader title="מנהלים" subtitle="מי יכול להיכנס לפאנל הניהול">
                {!showForm && (
                    <button type="button" onClick={() => setShowForm(true)}
                        className="min-h-11 px-5 rounded-lg bg-sroia-green text-white font-bold flex items-center gap-2 cursor-pointer">
                        <span>מנהל חדש</span>
                        <UserPlus size={18} aria-hidden="true" />
                    </button>
                )}
            </PageHeader>

            {/* הוספת מנהל */}
            {showForm && (
                <form onSubmit={handleAdd} className="bg-white border border-sroia-edge rounded-xl p-5 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-extrabold text-sroia-dark">מנהל חדש</h2>
                        <button type="button" onClick={() => { setShowForm(false); setFormError('') }} aria-label="סגירה"
                            className="w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer hover:bg-sroia-bg">
                            <X size={20} aria-hidden="true" />
                        </button>
                    </div>
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3">
                        {FIELDS.map((f) => (
                            <label key={f.name} className="flex flex-col gap-1 text-sm font-bold text-[#3a4436]">
                                {f.label}
                                <input name={f.name} type={f.type} dir={f.dir} autoComplete={f.autoComplete}
                                    value={form[f.name]} onChange={handleChange} required
                                    className="font-normal min-h-11 px-3 border border-sroia-line rounded-lg" />
                            </label>
                        ))}
                        <PasswordInput label="סיסמה" name="password" value={form.password} onChange={handleChange} describedBy="password-hint" />
                        <PasswordInput label="אימות סיסמה" name="confirmPassword" value={form.confirmPassword} onChange={handleChange}
                            invalid={form.confirmPassword !== '' && form.confirmPassword !== form.password} describedBy="password-match" />
                    </div>
                    <p id="password-hint" className="text-xs text-[#565f52] -mt-1">סיסמה: לפחות 6 תווים, עם אותיות באנגלית ומספרים</p>
                    {/* הודעה בזמן ההקלדה, כשהאימות לא תואם */}
                    <p id="password-match" aria-live="polite" className="text-sm text-[#8a2424] -mt-2 min-h-5">
                        {form.confirmPassword !== '' && form.confirmPassword !== form.password ? 'הסיסמאות לא תואמות' : ''}
                    </p>
                    {formError && <p role="alert" className="text-sm text-[#8a2424]">{formError}</p>}
                    <button type="submit" disabled={isAdding}
                        className="self-start min-h-11 px-5 rounded-lg bg-sroia-dark text-white font-bold cursor-pointer disabled:opacity-50">
                        {isAdding ? 'שומר...' : 'הוספת המנהל'}
                    </button>
                </form>
            )}

            {isLoading && <p>טוען מנהלים...</p>}
            {isError && <p role="alert">לא הצלחנו לטעון את המנהלים</p>}
            <Toast message={listError?.title} details={listError?.details} type="error" onClose={closeToast} />

            {/* בטלפון: כרטיס לכל מנהל */}
            <ul className="md:hidden flex flex-col gap-3">
                {managers.map((m) => {
                    const isMe = me?._id === m._id
                    return (
                        <li key={m._id} className={`bg-white border rounded-2xl p-4 flex flex-col gap-3 ${isMe ? 'border-sroia-light' : 'border-sroia-edge'}`}>
                            <div className="flex items-center gap-3">
                                <span aria-hidden="true" className="w-12 h-12 shrink-0 rounded-full bg-sroia-tint text-sroia-dark text-lg font-extrabold flex items-center justify-center">
                                    {m.name?.[0]}
                                </span>
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold flex flex-wrap items-center gap-2">
                                        {m.name}
                                        {isMe && <span className="px-2 py-0.5 rounded-full bg-sroia-tint text-sroia-ink text-xs font-bold">המשתמש שלי</span>}
                                    </p>
                                    <p className="text-sm text-[#565f52]" dir="ltr">@{m.manName}</p>
                                </div>
                                {!isMe && (
                                    <button type="button" onClick={() => setToDelete(m)} aria-label={`מחיקת ${m.name}`}
                                        className="w-11 h-11 shrink-0 inline-flex items-center justify-center rounded-xl text-[#a12f2f] bg-[#FBECEC] cursor-pointer">
                                        <Trash2 size={18} aria-hidden="true" />
                                    </button>
                                )}
                            </div>
                            <div className="flex flex-wrap gap-2 text-sm">
                                <a href={`mailto:${m.email}`} className="min-h-10 px-3 rounded-xl bg-sroia-bg text-sroia-dark inline-flex items-center gap-2 no-underline max-w-full">
                                    <Mail size={16} aria-hidden="true" className="shrink-0 text-sroia-green" />
                                    <span dir="ltr" className="truncate">{m.email}</span>
                                </a>
                                {m.phone && (
                                    <a href={`tel:${m.phone}`} className="min-h-10 px-3 rounded-xl bg-sroia-bg text-sroia-dark inline-flex items-center gap-2 no-underline">
                                        <Phone size={16} aria-hidden="true" className="text-sroia-green" />
                                        <span dir="ltr">{m.phone}</span>
                                    </a>
                                )}
                            </div>
                        </li>
                    )
                })}
            </ul>

            {/* במחשב: טבלה */}
            <div className="hidden md:block bg-white border border-sroia-edge rounded-xl overflow-x-auto">
                <table className="w-full min-w-[640px] text-[15px]">
                    <thead>
                        <tr className="bg-[#F0F3E8] text-right text-[#3a4436]">
                            <th scope="col" className="p-3 font-bold">שם</th>
                            <th scope="col" className="p-3 font-bold">שם משתמש</th>
                            <th scope="col" className="p-3 font-bold">מייל</th>
                            <th scope="col" className="p-3 font-bold">טלפון</th>
                            <th scope="col" className="p-3"><span className="sr-only">פעולות</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {managers.map((m) => {
                            const isMe = me?._id === m._id
                            return (
                            <tr key={m._id} className={`border-t border-sroia-subtle ${isMe ? 'bg-[#F7FAF3]' : ''}`}>
                                <td className="p-3 font-bold">
                                    {m.name}
                                    {isMe && <span className="mr-2 px-2 py-0.5 rounded-full bg-sroia-tint text-sroia-ink text-xs font-bold">המשתמש שלי</span>}
                                </td>
                                <td className="p-3">{m.manName}</td>
                                {/* bdi: המייל נכתב משמאל לימין, אבל התא נשאר מיושר לימין כמו הכותרת */}
                                <td className="p-3"><bdi dir="ltr">{m.email}</bdi></td>
                                <td className="p-3"><bdi dir="ltr">{m.phone}</bdi></td>
                                <td className="p-2 text-left">
                                    {/* את עצמך אי אפשר למחוק - לכן אין כפתור */}
                                    {!isMe && (
                                        <button type="button" onClick={() => setToDelete(m)} aria-label={`מחיקת ${m.name}`}
                                            className="w-10 h-10 inline-flex items-center justify-center rounded-lg text-[#a12f2f] cursor-pointer hover:bg-[#FBECEC]">
                                            <Trash2 size={18} aria-hidden="true" />
                                        </button>
                                    )}
                                </td>
                            </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            <ConfirmDialog
                open={toDelete !== null}
                title="למחוק את המנהל?"
                message={toDelete ? `${toDelete.name} לא יוכל יותר להיכנס לפאנל.` : ''}
                onConfirm={confirmDelete}
                onCancel={() => setToDelete(null)}
            />
        </div>
    )
}

export default ManagersPage
