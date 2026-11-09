import { useState } from 'react'
import { Search, Download, Phone, Mail, Gift, CalendarDays, Users } from 'lucide-react'
import { useGetBenefitRequestsQuery } from './benefitsApiSlice'
import PageHeader from '../../components/PageHeader'
import Loading from '../../components/Loading'

const PAGE = 20
const dateLabel = (d) => new Date(d).toLocaleDateString('he-IL', { day: 'numeric', month: 'numeric', year: '2-digit' })

// ייצוא לקובץ שאקסל פותח (CSV). התו המיוחד בהתחלה (BOM) - כדי שאקסל יציג עברית נכון
const exportCsv = (rows) => {
    const cell = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`
    const lines = [
        ['שם', 'הטבה', 'שלב בנייה', 'טלפון', 'מייל', 'תאריך'],
        ...rows.map((r) => [r.name, r.nameCompany, r.levelOfBuilder, r.phone, r.email, dateLabel(r.date)]),
    ]
    const blob = new Blob(['﻿' + lines.map((l) => l.map(cell).join(',')).join('\n')], { type: 'text/csv;charset=utf-8' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `בקשות-הטבה-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(a.href)
}

const StatTile = ({ label, value, icon: Icon }) => (
    <div className="bg-white rounded-2xl shadow-sm p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
        <span className="w-9 h-9 sm:w-11 sm:h-11 shrink-0 rounded-xl flex items-center justify-center bg-[#FDF0E6] text-[#9a4a12]">
            <Icon size={20} aria-hidden="true" />
        </span>
        <span>
            <span className="block text-2xl font-extrabold leading-tight text-[#1f261c]">{value}</span>
            <span className="text-[13px] text-[#565f52]">{label}</span>
        </span>
    </div>
)

// פניות והרשמות > בקשות הטבה: כל מי שביקש הטבה בדף ההטבות (נגב קרמיקה וכו')
const BenefitRequestsPage = () => {
    const { data: rows = [], isLoading, isError, refetch } = useGetBenefitRequestsQuery()
    const [filter, setFilter] = useState('all')
    const [search, setSearch] = useState('')
    const [shown, setShown] = useState(PAGE)

    if (isLoading) return <Loading text="טוען בקשות הטבה..." />
    if (isError) return (
        <div role="alert" className="flex flex-wrap items-center gap-3 p-4 rounded-xl bg-[#FBEAEA] text-[#7a1f1f]">
            לא הצלחנו לטעון את בקשות ההטבה.
            <button type="button" onClick={refetch} className="underline font-bold cursor-pointer">נסו שוב</button>
        </div>
    )

    // ההטבות שיש להן בקשות - לכפתורי הסינון (מופיעים רק כשיש יותר מהטבה אחת)
    const benefits = [...new Map(rows.map((r) => [r.IDBenefit, r.nameCompany])).entries()]

    const monthStart = new Date()
    monthStart.setDate(1)
    monthStart.setHours(0, 0, 0, 0)
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    const thisMonth = rows.filter((r) => new Date(r.date) >= monthStart).length
    const thisWeek = rows.filter((r) => new Date(r.date) >= weekAgo).length

    const term = search.trim().toLowerCase()
    const filtered = rows.filter((r) => {
        if (filter !== 'all' && r.IDBenefit !== filter) return false
        if (term && !`${r.name} ${r.phone} ${r.email}`.toLowerCase().includes(term)) return false
        return true
    })

    return (
        <div className="flex flex-col gap-5">
            <PageHeader title="בקשות הטבה" subtitle="לקוחות שביקשו הטבה בדף ההטבות באתר">
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

            <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <StatTile label="בקשות השבוע" value={thisWeek} icon={CalendarDays} />
                <StatTile label="בקשות החודש" value={thisMonth} icon={Gift} />
                <StatTile label="בקשות עד היום" value={rows.length} icon={Users} />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
                {benefits.length > 1 ? (
                    <div role="group" aria-label="סינון לפי הטבה" className="flex flex-wrap gap-2">
                        {[['all', 'הכל'], ...benefits].map(([id, label]) => (
                            <button
                                key={id}
                                type="button"
                                aria-pressed={filter === id}
                                onClick={() => { setFilter(id); setShown(PAGE) }}
                                className={`min-h-10 px-4 rounded-full border text-sm font-bold cursor-pointer ${filter === id ? 'bg-sroia-dark border-sroia-dark text-white' : 'bg-white border-sroia-line text-sroia-dark'}`}
                            >
                                {label} · {id === 'all' ? rows.length : rows.filter((r) => r.IDBenefit === id).length}
                            </button>
                        ))}
                    </div>
                ) : <span />}
                <label className="flex items-center gap-2 min-h-11 px-4 bg-white border border-sroia-line rounded-xl w-full sm:w-72">
                    <Search size={18} aria-hidden="true" className="text-[#565f52]" />
                    <input
                        type="search"
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); setShown(PAGE) }}
                        placeholder="חיפוש לפי שם, טלפון או מייל"
                        aria-label="חיפוש בקשות הטבה"
                        className="flex-1 min-w-0 bg-transparent outline-none"
                    />
                </label>
            </div>

            {filtered.length === 0 ? (
                <p className="text-[#565f52]">{rows.length === 0 ? 'עוד אף אחד לא ביקש הטבה' : 'לא נמצאו בקשות'}</p>
            ) : (
                <section aria-label="רשימת בקשות ההטבה" className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <ul>
                        {filtered.slice(0, shown).map((r) => (
                            <li key={r._id} className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 sm:px-5 py-3 border-t first:border-t-0 border-sroia-subtle">
                                <span aria-hidden="true" className="w-9 h-9 shrink-0 rounded-full flex items-center justify-center font-extrabold bg-[#FDF0E6] text-[#9a4a12]">
                                    {r.name?.[0] || '?'}
                                </span>
                                <span className="flex-[1_1_140px] min-w-0">
                                    <span className="block truncate font-bold">{r.name}</span>
                                    <span className="text-[13px] text-[#6b7468]">{dateLabel(r.date)}</span>
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-[#FDF0E6] text-[#7a3a0e]">
                                    <Gift size={13} aria-hidden="true" />
                                    {r.nameCompany}
                                </span>
                                <span className="w-28 text-sm text-[#3a4436]">{r.levelOfBuilder}</span>
                                <bdi dir="ltr" className="hidden md:inline text-sm text-[#565f52]">{r.phone}</bdi>
                                <span className="flex gap-1 mr-auto">
                                    <a href={`tel:${r.phone}`} aria-label={`התקשרות ל${r.name}`} className="w-9 h-9 rounded-lg flex items-center justify-center text-sroia-ink hover:bg-sroia-bg">
                                        <Phone size={16} aria-hidden="true" />
                                    </a>
                                    <a href={`mailto:${r.email}`} aria-label={`מייל ל${r.name}`} className="w-9 h-9 rounded-lg flex items-center justify-center text-[#1d4a66] hover:bg-sroia-bg">
                                        <Mail size={16} aria-hidden="true" />
                                    </a>
                                </span>
                            </li>
                        ))}
                    </ul>
                    {shown < filtered.length && (
                        <div className="flex flex-col items-center gap-1 p-4 border-t border-sroia-subtle">
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

export default BenefitRequestsPage
