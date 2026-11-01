import { useState } from 'react'
import { UserPlus, Trash2, X } from 'lucide-react'
import {
    useGetManagersQuery,
    useAddManagerMutation,
    useDeleteManagerMutation,
} from './managersApiSlice'
import ConfirmDialog from '../../components/ConfirmDialog'
import PageHeader from '../../components/PageHeader'

// ההודעות של השרת (באנגלית) -> הודעה בעברית למנהל
const ERRORS = {
    'All fields are required': 'יש למלא את כל השדות',
    'Invalid name': 'השם לא תקין',
    'Invalid email': 'המייל לא תקין',
    'Invalid phone': 'הטלפון לא תקין',
    'Password must be at least 6 characters with letters and numbers': 'סיסמה: לפחות 6 תווים, עם אותיות ומספרים',
    'Manager name already exists': 'שם המשתמש כבר תפוס',
    'Email already exists': 'המייל כבר קיים אצל מנהל אחר',
    'You cannot delete yourself': 'אי אפשר למחוק את עצמך',
}
const toHebrew = (err, fallback) => ERRORS[err?.data?.message] || fallback

const emptyForm = { name: '', manName: '', email: '', phone: '', password: '' }

const FIELDS = [
    { name: 'name', label: 'שם מלא', type: 'text', autoComplete: 'off' },
    { name: 'manName', label: 'שם משתמש', type: 'text', autoComplete: 'off' },
    { name: 'email', label: 'מייל', type: 'email', autoComplete: 'off', dir: 'ltr' },
    { name: 'phone', label: 'טלפון', type: 'tel', autoComplete: 'off', dir: 'ltr' },
    { name: 'password', label: 'סיסמה', type: 'password', autoComplete: 'new-password' },
]

const ManagersPage = () => {
    const { data: managers = [], isLoading, isError } = useGetManagersQuery()
    const [addManager, { isLoading: isAdding }] = useAddManagerMutation()
    const [deleteManager] = useDeleteManagerMutation()

    const [showForm, setShowForm] = useState(false)
    const [form, setForm] = useState(emptyForm)
    const [formError, setFormError] = useState('')
    const [listError, setListError] = useState('')
    const [toDelete, setToDelete] = useState(null)

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleAdd = async (e) => {
        e.preventDefault()
        setFormError('')
        try {
            await addManager(form).unwrap()
            setForm(emptyForm)
            setShowForm(false)
        } catch (err) {
            setFormError(toHebrew(err, 'ההוספה נכשלה, נסו שוב'))
        }
    }

    const confirmDelete = async () => {
        const manager = toDelete
        setToDelete(null)
        setListError('')
        try {
            await deleteManager(manager._id).unwrap()
        } catch (err) {
            setListError(toHebrew(err, 'המחיקה נכשלה'))
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
                <form onSubmit={handleAdd} className="bg-white border border-[#E1E8DA] rounded-xl p-5 flex flex-col gap-4">
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
                    </div>
                    {formError && <p role="alert" className="text-sm text-[#8a2424]">{formError}</p>}
                    <button type="submit" disabled={isAdding}
                        className="self-start min-h-11 px-5 rounded-lg bg-sroia-dark text-white font-bold cursor-pointer disabled:opacity-50">
                        {isAdding ? 'שומר...' : 'הוספת המנהל'}
                    </button>
                </form>
            )}

            {isLoading && <p>טוען מנהלים...</p>}
            {isError && <p role="alert">לא הצלחנו לטעון את המנהלים</p>}
            {listError && <p role="alert" className="text-[#8a2424]">{listError}</p>}

            <div className="bg-white border border-[#E1E8DA] rounded-xl overflow-x-auto">
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
                        {managers.map((m) => (
                            <tr key={m._id} className="border-t border-[#EEF2E9]">
                                <td className="p-3 font-bold">{m.name}</td>
                                <td className="p-3">{m.manName}</td>
                                <td className="p-3" dir="ltr">{m.email}</td>
                                <td className="p-3" dir="ltr">{m.phone}</td>
                                <td className="p-2 text-left">
                                    <button type="button" onClick={() => setToDelete(m)} aria-label={`מחיקת ${m.name}`}
                                        className="w-10 h-10 inline-flex items-center justify-center rounded-lg text-[#a12f2f] cursor-pointer hover:bg-[#FBECEC]">
                                        <Trash2 size={18} aria-hidden="true" />
                                    </button>
                                </td>
                            </tr>
                        ))}
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
