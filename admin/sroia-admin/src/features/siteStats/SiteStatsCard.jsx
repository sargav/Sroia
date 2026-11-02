import { useState } from 'react'
import { Globe, Tag, Check, TriangleAlert } from 'lucide-react'
import { useGetSiteStatsQuery, useUpdateSiteStatsMutation } from './siteStatsApiSlice'

const inputClass = 'w-full min-h-11 px-3 border border-sroia-line rounded-lg bg-white text-lg font-bold text-sroia-dark'

// ברירות המחדל - כמו באתר
const DEFAULTS = { projectsCount: 100, avgSavings: 120000, coursePrice: 1987, courseInstallments: 10, coursePriceNext: 2700, compassPrice: 297 }

const price = (n) => `${Number(n).toLocaleString('en-US')} ₪`

// שתי קבוצות: מספרים ומחירים. preview = איך זה ייראה באתר
const GROUPS = [
    {
        title: 'המספרים באתר', sub: 'מופיעים בדף הבית ובדף ניהול פרויקטים', icon: Globe, iconClass: 'bg-[#E3EFD3] text-[#2f4a17]',
        fields: [
            { name: 'projectsCount', label: 'פרויקטים שליווינו', step: 1, dir: 'ltr', preview: (v) => `${v.projectsCount}+` },
            { name: 'avgSavings', label: 'חיסכון ממוצע ללקוח (₪)', step: 1000, dir: 'ltr', preview: (v) => `₪${Math.round(v.avgSavings / 1000)}K` },
        ],
    },
    {
        title: 'מחירים', sub: 'מופיעים בדף הקורס, בדף המצפן ובדף הבית', icon: Tag, iconClass: 'bg-[#FDF3DC] text-[#7a5a00]', warn: true,
        fields: [
            { name: 'coursePrice', label: 'קורס "בית בשתי ידיים" (₪)', step: 1, preview: (v) => price(v.coursePrice) },
            { name: 'courseInstallments', label: 'מספר תשלומים בקורס', step: 1, min: 1, max: 36,
                preview: (v) => `${Math.floor(v.coursePrice / Math.max(1, v.courseInstallments))} ₪ לחודש ב-${v.courseInstallments} תשלומים` },
            { name: 'coursePriceNext', label: '"בחודש הבא המחיר עולה ל-" (₪)', step: 1, preview: (v) => price(v.coursePriceNext) },
            { name: 'compassPrice', label: 'אפליקציית "המצפן לבונה" (₪)', step: 1, preview: (v) => price(v.compassPrice) },
        ],
    },
]

// עדכון המספרים והמחירים שמופיעים באתר
const SiteStatsCard = () => {
    const { data, isLoading } = useGetSiteStatsQuery()
    const [updateStats, { isLoading: isSaving }] = useUpdateSiteStatsMutation()
    const [status, setStatus] = useState('') // '' | 'saved' | 'error'
    const values = { ...DEFAULTS, ...data }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const f = Object.fromEntries(new FormData(e.target))
        const body = {}
        Object.keys(DEFAULTS).forEach((k) => { body[k] = Number(f[k]) })
        try {
            await updateStats(body).unwrap()
            setStatus('saved')
        } catch {
            setStatus('error')
        }
    }

    if (isLoading) return <p>טוען...</p>

    return (
        // key: כשהנתונים מגיעים, השדות מתמלאים בהם
        <form key={data?.updatedAt} onSubmit={handleSubmit} onChange={() => setStatus('')} className="flex flex-col gap-5 max-w-3xl">
            {GROUPS.map(({ title, sub, icon: Icon, iconClass, warn, fields }) => (
                <section key={title} className="bg-white rounded-2xl shadow-sm p-5 flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                        <span className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconClass}`}>
                            <Icon size={20} aria-hidden="true" />
                        </span>
                        <div>
                            <h2 className="text-lg font-extrabold text-sroia-dark">{title}</h2>
                            <p className="text-sm text-[#565f52]">{sub}</p>
                        </div>
                    </div>

                    {warn && (
                        <p className="flex items-start gap-2 p-3 rounded-xl bg-[#FDF3DC] text-[#6b4f00] text-sm">
                            <TriangleAlert size={18} aria-hidden="true" className="shrink-0 mt-0.5" />
                            <span>
                                <b>שימו לב:</b> כאן משתנה רק המחיר שכתוב באתר. הסכום שנגבה בתשלום מוגדר ב-Cardcom -
                                כשמשנים מחיר, צריך לשנות אותו גם שם.
                            </span>
                        </p>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {fields.map((field) => (
                            <label key={field.name} className="flex flex-col gap-1 text-sm font-bold text-[#3a4436]">
                                {field.label}
                                <input name={field.name} type="number" min={field.min ?? 0} max={field.max} step={field.step} required
                                    defaultValue={values[field.name]} className={inputClass} />
                                <span className="font-normal text-[#565f52]">באתר: <bdi dir={field.dir || 'rtl'}>{field.preview(values)}</bdi></span>
                            </label>
                        ))}
                    </div>
                </section>
            ))}

            <div className="flex items-center gap-3">
                <button type="submit" disabled={isSaving}
                    className="min-h-11 px-6 rounded-lg bg-sroia-green text-white font-bold cursor-pointer hover:bg-sroia-dark disabled:opacity-60">
                    {isSaving ? 'שומר...' : 'שמירה'}
                </button>
                <p role="status" className="text-sm">
                    {status === 'saved' && (
                        <span className="flex items-center gap-1 text-[#3d7a1f] font-bold">
                            <Check size={16} aria-hidden="true" /> נשמר, האתר כבר מעודכן
                        </span>
                    )}
                    {status === 'error' && <span className="text-[#a12f2f] font-bold">השמירה נכשלה, בדקו את המספרים ונסו שוב</span>}
                </p>
            </div>
        </form>
    )
}

export default SiteStatsCard
