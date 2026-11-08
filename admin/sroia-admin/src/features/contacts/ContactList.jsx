import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Trash2, ChevronDown, Search } from 'lucide-react'
import {
    useGetContactsQuery,
    useUpdateContactMutation,
    useDeleteContactMutation,
} from './contactsApiSlice'
import ConfirmDialog from '../../components/ConfirmDialog'
import PageHeader from '../../components/PageHeader'
import Loading from '../../components/Loading'

// השמות של המקורות, כמו ב-enum במודל
const SOURCES = {
    main_contact: 'צור קשר',
    builder_guide: 'המדריך לבונה',
    project_mgmt: 'ניהול פרויקטים',
    compass_app: 'המצפן לבונה',
}

const FILTERS = [
    { id: 'all', label: 'הכל' },
    { id: 'unread', label: 'לא נקראו' },
    { id: 'unreplied', label: 'לא נענו' },
]

const ContactsList = () => {
    const { data: contacts = [], isLoading, isError } = useGetContactsQuery()
    const [updateContact] = useUpdateContactMutation()
    const [deleteContact] = useDeleteContactMutation()
    const [search, setSearch] = useState('')
    // אפשר להגיע עם סינון מוכן, למשל מדף הבית: /contacts?filter=unreplied
    const [searchParams] = useSearchParams()
    const [filter, setFilter] = useState(searchParams.get('filter') || 'all')
    const [openId, setOpenId] = useState(null) // איזו פנייה פתוחה
    const [toDelete, setToDelete] = useState(null)
    if (isLoading) return <Loading text="טוען פניות..." />
    if (isError) return <p role="alert">לא הצלחנו לטעון את הפניות</p>

    // סינון בצד הלקוח
    const term = search.trim().toLowerCase()

    const shown = contacts.filter((c) => {
        // סינון לפי מצב
        if (filter === 'unread' && c.isRead) return false
        if (filter === 'unreplied' && c.isReplied) return false

        // חיפוש: אם הוקלד משהו, מחפשים בשם, בטלפון ובמייל
        if (term) {
            const text = `${c.name} ${c.phone} ${c.email}`.toLowerCase()
            if (!text.includes(term)) return false
        }
        return true
    })

    // פתיחה של פנייה = גם מסמנים אותה כנקראה
    const toggleOpen = (c) => {
        setOpenId(openId === c._id ? null : c._id)
        if (!c.isRead) updateContact({ id: c._id, isRead: true })
    }

    // לחיצה על "מחיקה" - רק פותחת את חלון האישור
    const handleDelete = (c) => setToDelete(c)

    // לחיצה על "מחיקה" בתוך החלון - מוחקת באמת
    const confirmDelete = () => {
        deleteContact(toDelete._id)
        setToDelete(null)
    }

    return (
        <div className="flex flex-col gap-6">
            <PageHeader title="פניות" subtitle="כל הפניות שהגיעו מהטפסים באתר" />

            {/* סינון */}
            <label className="flex items-center gap-2 min-h-11 px-4 bg-white border border-sroia-line rounded-lg max-w-md">
                <Search size={18} aria-hidden="true" className="text-[#565f52]" />
                <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="חיפוש לפי שם, טלפון או מייל"
                    aria-label="חיפוש פניות"
                    className="flex-1 bg-transparent outline-none"
                />
            </label>
            <div role="group" aria-label="סינון" className="flex flex-wrap gap-2">
                {FILTERS.map((f) => (
                    <button
                        key={f.id}
                        type="button"
                        aria-pressed={filter === f.id}
                        onClick={() => setFilter(f.id)}
                        className={`min-h-11 px-4 rounded-full border text-sm cursor-pointer ${filter === f.id
                            ? 'bg-sroia-dark border-sroia-dark text-white font-bold'
                            : 'bg-white border-sroia-line text-sroia-dark'
                            }`}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            {shown.length === 0 && <p className="text-[#565f52]">אין פניות להצגה</p>}

            {/* הרשימה */}
            <ul className="flex flex-col gap-2">
                {shown.map((c) => (
                    <li key={c._id} className="bg-white border border-sroia-edge rounded-xl">
                        {/* השורה הסגורה */}
                        <button
                            type="button"
                            onClick={() => toggleOpen(c)}
                            aria-expanded={openId === c._id}
                            className="w-full flex flex-wrap items-center gap-x-6 gap-y-1 p-4 text-right cursor-pointer"
                        >
                            <span className={`flex-[1_1_140px] ${c.isRead ? '' : 'font-extrabold'}`}>
                                {!c.isRead && <span className="inline-block w-2 h-2 rounded-full bg-sroia-green ml-2" aria-label="חדשה" />}
                                {c.name}
                            </span>
                            <span className="flex-[1_1_120px] text-[#3a4436]">{SOURCES[c.source] || c.source}</span>
                            <span className="text-sm text-[#565f52]">
                                {new Date(c.createdAt).toLocaleDateString('he-IL')}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${c.isReplied ? 'bg-sroia-dark text-white' : 'bg-sroia-tint text-sroia-ink'
                                }`}>
                                {c.isReplied ? 'נענתה' : 'ממתינה'}
                            </span>
                            <ChevronDown
                                size={20}
                                aria-hidden="true"
                                className={`transition-transform ${openId === c._id ? 'rotate-180' : ''}`}
                            />
                        </button>

                        {/* הפרטים - רק כשהפנייה פתוחה */}
                        {openId === c._id && (
                            <div className="border-t border-sroia-subtle p-4 flex flex-col gap-4">
                                <div className="flex flex-wrap gap-6 text-sm">
                                    <a href={`tel:${c.phone}`} dir="ltr">{c.phone}</a>
                                    <a href={`mailto:${c.email}`} dir="ltr">{c.email}</a>
                                </div>

                                {c.message && <p className="leading-relaxed">{c.message}</p>}

                                <label className="flex flex-col gap-1 text-sm font-bold text-[#3a4436]">
                                    הערה פנימית
                                    <textarea
                                        defaultValue={c.adminNote || ''}
                                        onBlur={(e) => {
                                            // נשמר כשיוצאים מהשדה, ורק אם השתנה
                                            if (e.target.value !== (c.adminNote || '')) {
                                                updateContact({ id: c._id, adminNote: e.target.value })
                                            }
                                        }}
                                        rows={2}
                                        className="font-normal p-2 border border-sroia-line rounded-lg"
                                    />
                                </label>

                                <div className="flex flex-wrap gap-2">
                                    <button
                                        type="button"
                                        onClick={() => updateContact({ id: c._id, isReplied: !c.isReplied })}
                                        className="min-h-11 px-4 rounded-lg bg-sroia-dark text-white font-bold cursor-pointer"
                                    >
                                        {c.isReplied ? 'סמן כלא נענתה' : 'סמן כנענתה'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => updateContact({ id: c._id, isRead: false })}
                                        className="min-h-11 px-4 rounded-lg border border-sroia-line cursor-pointer"
                                    >
                                        סמן כלא נקראה
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(c)}
                                        className="min-h-11 px-4 rounded-lg text-[#a12f2f] flex items-center gap-2 mr-auto cursor-pointer"
                                    >
                                        <span>מחיקה</span>
                                        <Trash2 size={18} aria-hidden="true" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
            <ConfirmDialog
                open={toDelete !== null}
                title="למחוק את הפנייה?"
                message={toDelete ? `הפנייה של ${toDelete.name} תימחק לצמיתות, ואי אפשר יהיה לשחזר אותה.` : ''}
                onConfirm={confirmDelete}
                onCancel={() => setToDelete(null)}
            />
        </div>
    )
}

export default ContactsList