import { useState } from 'react'
import { Search, Download, Phone, Mail, MapPin, BookOpen, GraduationCap, TrendingUp, Check } from 'lucide-react'
import { useGetRegistrationsQuery } from './registrationsApiSlice'
import PageHeader from '../../components/PageHeader'

// כל מוצר: שם, צבעים ואייקון
const PRODUCTS = {
    course: { label: 'קורס', bg: 'bg-[#E9F3DF]', fg: 'text-[#2f4a17]', icon: GraduationCap },
    compass: { label: 'מצפן', bg: 'bg-[#F3ECFA]', fg: 'text-[#4f2d66]', icon: MapPin },
    guide: { label: 'מדריך', bg: 'bg-[#FDF3DC]', fg: 'text-[#6b4f00]', icon: BookOpen },
}
const FILTERS = [{ id: 'all', label: 'הכל' }, { id: 'course', label: 'קורס' }, { id: 'compass', label: 'מצפן' }, { id: 'guide', label: 'מדריך' }]
const PAGE = 20

const money = (n) => `${Number(n || 0).toLocaleString('en-US')} ₪`
const dateLabel = (d) => new Date(d).toLocaleDateString('he-IL', { day: 'numeric', month: 'numeric', year: '2-digit' })

// ייצוא לקובץ שאקסל פותח (CSV). התו המיוחד בהתחלה (BOM) - כדי שאקסל יציג עברית נכון
const exportCsv = (rows) => {
    const cell = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`
    const lines = [
        ['שם', 'מוצר', 'סכום', 'תשלומים', 'טלפון', 'מייל', 'תאריך'],
        ...rows.map((r) => [
            r.name, PRODUCTS[r.product].label, r.amount, r.numberOfPayments || '', r.phone, r.email,
            dateLabel(r.date),
        ]),
    ]
    const blob = new Blob(['\uFEFF' + lines.map((l) => l.map(cell).join(',')).join('\n')], { type: 'text/csv;charset=utf-8' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `הרשמות-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(a.href)
}

const StatTile = ({ label, value, icon: Icon, iconClass }) => (
    <div className="bg-white rounded-2xl shadow-sm p-4 flex items-center gap-3">
        <span className={`w-11 h-11 shrink-0 rounded-xl flex items-center justify-center ${iconClass}`}>
            <Icon size={20} aria-hidden="true" />
        </span>
        <span>
            <span className="block text-2xl font-extrabold leading-tight text-[#1f261c]">{value}</span>
            <span className="text-[13px] text-[#565f52]">{label}</span>
        </span>
    </div>
)

const RegistrationsPage = () => {
    const { data: rows = [], isLoading, isError } = useGetRegistrationsQuery()
    const [filter, setFilter] = useState('all')
    const [search, setSearch] = useState('')
    const [shown, setShown] = useState(PAGE)

    if (isLoading) return <p>טוען הרשמות...</p>
    if (isError) return <p role="alert">לא הצלחנו לטעון את ההרשמות</p>

    // החודש הנוכחי
    const monthStart = new Date()
    monthStart.setDate(1)
    monthStart.setHours(0, 0, 0, 0)
    const thisMonth = rows.filter((r) => new Date(r.date) >= monthStart)
    const countOf = (list, product) => list.filter((r) => r.product === product).length
    const income = thisMonth.reduce((sum, r) => sum + (r.amount || 0), 0)

    const term = search.trim().toLowerCase()
    const filtered = rows.filter((r) => {
        if (filter !== 'all' && r.product !== filter) return false
        if (term && !`${r.name} ${r.phone} ${r.email}`.toLowerCase().includes(term)) return false
        return true
    })

    return (
        <div className="flex flex-col gap-5">
            <PageHeader title="הרשמות ורכישות" subtitle="רכישות של הקורס והמצפן (מ-Cardcom) ונרשמים למדריך">
                <button
                    type="button"
                    onClick={() => exportCsv(filtered)}
                    disabled={filtered.length === 0}
                    className="min-h-11 px-4 rounded-xl border border-sroia-line bg-white text-sroia-dark font-bold text-sm flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                    <Download size={17} aria-hidden="true" />
                    ייצוא לאקסל
                </button>
            </PageHeader>

            {/* החודש */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <StatTile label="נרשמו לקורס החודש" value={countOf(thisMonth, 'course')} icon={GraduationCap} iconClass="bg-[#E9F3DF] text-[#2f4a17]" />
                <StatTile label="רכשו את המצפן החודש" value={countOf(thisMonth, 'compass')} icon={MapPin} iconClass="bg-[#F3ECFA] text-[#4f2d66]" />
                <StatTile label="הורידו את המדריך החודש" value={countOf(thisMonth, 'guide')} icon={BookOpen} iconClass="bg-[#FDF3DC] text-[#6b4f00]" />
                <StatTile label="נכנס החודש" value={money(income)} icon={TrendingUp} iconClass="bg-[#E3EFD3] text-[#2f4a17]" />
            </div>

            {/* סינון וחיפוש */}
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div role="group" aria-label="סינון לפי מוצר" className="flex flex-wrap gap-2">
                    {FILTERS.map((f) => (
                        <button
                            key={f.id}
                            type="button"
                            aria-pressed={filter === f.id}
                            onClick={() => { setFilter(f.id); setShown(PAGE) }}
                            className={`min-h-10 px-4 rounded-full border text-sm font-bold cursor-pointer ${filter === f.id ? 'bg-sroia-dark border-sroia-dark text-white' : 'bg-white border-sroia-line text-sroia-dark'}`}
                        >
                            {f.label} · {f.id === 'all' ? rows.length : countOf(rows, f.id)}
                        </button>
                    ))}
                </div>
                <label className="flex items-center gap-2 min-h-11 px-4 bg-white border border-sroia-line rounded-xl w-full sm:w-72">
                    <Search size={18} aria-hidden="true" className="text-[#565f52]" />
                    <input
                        type="search"
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); setShown(PAGE) }}
                        placeholder="חיפוש לפי שם, טלפון או מייל"
                        aria-label="חיפוש הרשמות"
                        className="flex-1 min-w-0 bg-transparent outline-none"
                    />
                </label>
            </div>

            {filtered.length === 0 ? (
                <p className="text-[#565f52]">{rows.length === 0 ? 'עוד אין הרשמות' : 'לא נמצאו הרשמות'}</p>
            ) : (
                <section className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <ul>
                        {filtered.slice(0, shown).map((r) => {
                            const p = PRODUCTS[r.product]
                            const PIcon = p.icon
                            return (
                                <li key={r._id} className={`flex flex-wrap items-center gap-x-4 gap-y-2 px-4 sm:px-5 py-3 border-t first:border-t-0 border-[#EEF2E9]`}>
                                    <span aria-hidden="true" className={`w-9 h-9 shrink-0 rounded-full flex items-center justify-center font-extrabold ${p.bg} ${p.fg}`}>
                                        {r.name?.[0] || '?'}
                                    </span>
                                    <span className="flex-[1_1_140px] min-w-0">
                                        <span className="block truncate font-bold">{r.name || 'ללא שם'}</span>
                                        <span className="text-[13px] text-[#6b7468]">{dateLabel(r.date)}</span>
                                    </span>
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${p.bg} ${p.fg}`}>
                                        <PIcon size={13} aria-hidden="true" />
                                        {p.label}
                                    </span>
                                    <span className="w-28 text-sm">
                                        <b>{r.kind === 'guide' ? 'חינם' : money(r.amount)}</b>
                                        {r.numberOfPayments > 1 && <span className="block text-xs text-[#6b7468]">{r.numberOfPayments} תשלומים</span>}
                                    </span>

                                    {/* ליד נרשם למדריך: האם רב מסר שלחו לו את המדריך */}
                                    {r.kind === 'guide' && (
                                        <span className="inline-flex items-center gap-1.5 min-h-9 px-3 rounded-full text-xs font-bold bg-[#EEF0EC] text-[#565f52]">
                                            {r.sentToMailer && <Check size={14} aria-hidden="true" />}
                                            {r.sentToMailer ? 'נשלח במייל' : 'לא נשלח - לבדוק ברב מסר'}
                                        </span>
                                    )}

                                    <span className="flex gap-1 mr-auto">
                                        {r.phone && (
                                            <a href={`tel:${r.phone}`} aria-label={`התקשרות ל${r.name || 'נרשם'}`} className="w-9 h-9 rounded-lg flex items-center justify-center text-[#3d5a20] hover:bg-sroia-bg">
                                                <Phone size={16} aria-hidden="true" />
                                            </a>
                                        )}
                                        {r.email && (
                                            <a href={`mailto:${r.email}`} aria-label={`מייל ל${r.name || 'נרשם'}`} className="w-9 h-9 rounded-lg flex items-center justify-center text-[#1d4a66] hover:bg-sroia-bg">
                                                <Mail size={16} aria-hidden="true" />
                                            </a>
                                        )}
                                    </span>
                                </li>
                            )
                        })}
                    </ul>
                    {shown < filtered.length && (
                        <div className="flex flex-col items-center gap-1 p-4 border-t border-[#EEF2E9]">
                            <button type="button" onClick={() => setShown(shown + PAGE)}
                                className="min-h-11 px-5 rounded-xl border border-sroia-line bg-white font-bold text-sroia-dark cursor-pointer hover:bg-sroia-bg">
                                טעינת עוד {Math.min(PAGE, filtered.length - shown)}
                            </button>
                            <span className="text-[13px] text-[#6b7468]">מוצגות {shown} מתוך {filtered.length}</span>
                        </div>
                    )}
                </section>
            )}
        </div>
    )
}

export default RegistrationsPage
