import { useState } from 'react'
import { Globe, Check } from 'lucide-react'
import { useGetSiteStatsQuery, useUpdateSiteStatsMutation } from './siteStatsApiSlice'

const inputClass = 'w-full min-h-11 px-3 border border-sroia-line rounded-lg bg-white text-lg font-bold text-sroia-dark'

// ריבוע קטן בדף הבית: עדכון המספרים שמופיעים באתר
const SiteStatsCard = () => {
    const { data, isLoading } = useGetSiteStatsQuery()
    const [updateStats, { isLoading: isSaving }] = useUpdateSiteStatsMutation()
    const [status, setStatus] = useState('') // '' | 'saved' | 'error'

    const handleSubmit = async (e) => {
        e.preventDefault()
        const f = Object.fromEntries(new FormData(e.target))
        try {
            await updateStats({ projectsCount: Number(f.projectsCount), avgSavings: Number(f.avgSavings) }).unwrap()
            setStatus('saved')
        } catch {
            setStatus('error')
        }
    }

    return (
        <section className="bg-white rounded-2xl shadow-sm p-5 flex flex-col gap-4 max-w-xl">
            <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-[#E3EFD3] text-[#2f4a17] flex items-center justify-center">
                    <Globe size={20} aria-hidden="true" />
                </span>
                <div>
                    <h2 className="text-lg font-extrabold text-sroia-dark">המספרים באתר</h2>
                    <p className="text-sm text-[#565f52]">מופיעים בדף הבית ובדף ניהול פרויקטים</p>
                </div>
            </div>

            {isLoading ? <p>טוען...</p> : (
                // key: כשהנתונים מגיעים, השדות מתמלאים בהם
                <form key={data?.updatedAt} onSubmit={handleSubmit} onChange={() => setStatus('')} className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <label className="flex flex-col gap-1 text-sm font-bold text-[#3a4436]">
                            פרויקטים שליווינו
                            <input name="projectsCount" type="number" min="0" step="1" required
                                defaultValue={data?.projectsCount ?? 100} className={inputClass} />
                            <span className="font-normal text-[#565f52]">באתר: <bdi dir="ltr">{data?.projectsCount ?? 100}+</bdi></span>
                        </label>
                        <label className="flex flex-col gap-1 text-sm font-bold text-[#3a4436]">
                            חיסכון ממוצע ללקוח (₪)
                            <input name="avgSavings" type="number" min="0" step="1000" required
                                defaultValue={data?.avgSavings ?? 120000} className={inputClass} />
                            <span className="font-normal text-[#565f52]">באתר: <bdi dir="ltr">₪{Math.round((data?.avgSavings ?? 120000) / 1000)}K</bdi></span>
                        </label>
                    </div>
                    <div className="flex items-center gap-3">
                        <button type="submit" disabled={isSaving}
                            className="min-h-11 px-5 rounded-lg bg-sroia-green text-white font-bold cursor-pointer hover:bg-sroia-dark disabled:opacity-60">
                            {isSaving ? 'שומר...' : 'שמירה'}
                        </button>
                        <p role="status" className="text-sm">
                            {status === 'saved' && (
                                <span className="flex items-center gap-1 text-[#3d7a1f] font-bold">
                                    <Check size={16} aria-hidden="true" /> נשמר, האתר כבר מעודכן
                                </span>
                            )}
                            {status === 'error' && <span className="text-[#a12f2f] font-bold">השמירה נכשלה, נסו שוב</span>}
                        </p>
                    </div>
                </form>
            )}
        </section>
    )
}

export default SiteStatsCard
