import { Check } from 'lucide-react'
import PageHeader from '../../components/PageHeader'
import { THEMES, useTheme } from './theme'

// הגדרות > עיצוב: בחירת ערכת הצבעים של הפאנל
const AppearancePage = () => {
    const [theme, setTheme] = useTheme()

    return (
        <div className="flex flex-col gap-6">
            <PageHeader title="עיצוב" subtitle="הצבעים של הפאנל. הבחירה נשמרת במכשיר הזה." />

            <fieldset className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl">
                <legend className="sr-only">ערכת צבעים</legend>
                {THEMES.map((t) => {
                    const selected = theme === t.id
                    const [dark, main, light, bg] = t.swatches
                    return (
                        <label key={t.id}
                            className={`relative flex flex-col gap-3 p-4 rounded-2xl bg-white cursor-pointer border-2 shadow-[0_1px_2px_rgba(45,56,43,0.06),0_4px_16px_rgba(45,56,43,0.05)] has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-sroia-green ${selected ? 'border-sroia-green' : 'border-transparent hover:border-sroia-line'}`}>
                            <input type="radio" name="theme" value={t.id} checked={selected} onChange={() => setTheme(t.id)} className="sr-only" />

                            {/* תצוגה מקדימה קטנה של הפאנל: תפריט צד, כותרת, כפתור */}
                            <span aria-hidden="true" className="flex h-28 rounded-xl overflow-hidden border border-black/5" style={{ background: bg }}>
                                <span className="w-1/3 p-2.5 flex flex-col gap-1.5" style={{ background: dark }}>
                                    <span className="h-2 w-3/4 rounded-full bg-white/80" />
                                    <span className="h-4 rounded-md mt-2" style={{ background: light, opacity: 0.35 }} />
                                    <span className="h-1.5 w-2/3 rounded-full bg-white/30" />
                                    <span className="h-1.5 w-1/2 rounded-full bg-white/30" />
                                    <span className="mt-auto w-4 h-4 rounded-full" style={{ background: light }} />
                                </span>
                                <span className="flex-1 p-3 flex flex-col gap-2">
                                    <span className="h-2.5 w-1/2 rounded-full" style={{ background: dark }} />
                                    <span className="flex-1 rounded-lg bg-white" />
                                    <span className="h-4 w-14 rounded-md" style={{ background: main }} />
                                </span>
                            </span>

                            <span className="flex items-center gap-3">
                                <span className="flex-1">
                                    <b className="block text-sroia-dark">{t.label}</b>
                                    <span className="text-sm text-[#565f52]">{t.note}</span>
                                </span>
                                <span aria-hidden="true"
                                    className={`w-7 h-7 rounded-full flex items-center justify-center border-2 ${selected ? 'bg-sroia-green border-sroia-green text-white' : 'border-sroia-line'}`}>
                                    {selected && <Check size={16} strokeWidth={3} />}
                                </span>
                            </span>
                        </label>
                    )
                })}
            </fieldset>
        </div>
    )
}

export default AppearancePage
