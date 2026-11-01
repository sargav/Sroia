// כותרת אחידה לכל מסך: כותרת + משפט הסבר + (לא חובה) כפתור בצד
const PageHeader = ({ title, subtitle, children }) => (
    <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
            <h1 className="text-3xl font-extrabold text-sroia-dark">{title}</h1>
            {subtitle && <p className="text-[#565f52]">{subtitle}</p>}
        </div>
        {children}
    </div>
)

export default PageHeader
