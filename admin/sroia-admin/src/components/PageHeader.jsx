import { useContext } from 'react'
import { TabGroupContext } from './tabGroup'

// כותרת אחידה לכל מסך: כותרת + משפט הסבר + (לא חובה) כפתור בצד.
// בתוך לשונית - הכותרת הגדולה כבר מופיעה למעלה, אז כאן רק משפט ההסבר והכפתור
const PageHeader = ({ title, subtitle, children }) => {
    const inTabs = useContext(TabGroupContext)

    if (inTabs) {
        return (
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h2 className="sr-only">{title}</h2>
                    {subtitle && <p className="text-[#565f52]">{subtitle}</p>}
                </div>
                {children}
            </div>
        )
    }

    return (
        <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
                <h1 className="text-3xl font-extrabold text-sroia-dark">{title}</h1>
                {subtitle && <p className="text-[#565f52]">{subtitle}</p>}
            </div>
            {children}
        </div>
    )
}

export default PageHeader
