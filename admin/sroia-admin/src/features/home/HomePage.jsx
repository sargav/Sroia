import { Link } from 'react-router-dom'
import { Inbox, Image, Video, ChevronLeft, CalendarDays } from 'lucide-react'
import { useGetContactsQuery } from '../contacts/contactsApiSlice'
import { useGetImagesQuery } from '../images/imagesApiSlice'
import { useGetVideosQuery } from '../videos/videosApiSlice'
import useCurrentManager from '../auth/useCurrentManager'

// ברכה לפי השעה עכשיו
const greetingByHour = (hour) => {
    if (hour >= 5 && hour < 12) return 'בוקר טוב'
    if (hour >= 12 && hour < 17) return 'צהריים טובים'
    if (hour >= 17 && hour < 21) return 'ערב טוב'
    return 'לילה טוב'
}

// התאריך של היום, למשל: "יום שני, 2 בנובמבר 2026"
const todayLabel = () =>
    new Date().toLocaleDateString('he-IL', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

const HomePage = () => {
    const me = useCurrentManager() // השם של המנהל המחובר, מתוך הטוקן
    const { data: contacts = [] } = useGetContactsQuery()
    const { data: images = [] } = useGetImagesQuery()
    const { data: videos = [] } = useGetVideosQuery()

    const unread = contacts.filter((c) => !c.isRead)
    const unreplied = contacts.filter((c) => !c.isReplied)

    const tiles = [
        { to: '/contacts', label: 'פניות חדשות', value: unread.length, sub: `${unreplied.length} ממתינות למענה`, icon: Inbox },
        { to: '/images', label: 'תמונות באתר', value: images.length, icon: Image },
        { to: '/videos', label: 'סרטוני המלצות', value: videos.length, icon: Video },
    ]

    return (
        <div className="flex flex-col gap-8">
            {/* הברכה, ומתחתיה היום והתאריך */}
            <div className="flex flex-col gap-1.5">
                <h1 className="text-3xl font-extrabold text-sroia-dark">
                    {me?.name ? `${greetingByHour(new Date().getHours())}, ${me.name}` : greetingByHour(new Date().getHours())}
                </h1>
                <p className="flex items-center gap-2 font-medium text-sroia-green">
                    <CalendarDays size={18} aria-hidden="true" />
                    {todayLabel()}
                </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
                {tiles.map(({ to, label, value, sub, icon: Icon }) => (
                    <Link key={to} to={to}
                        className="bg-white border border-[#E1E8DA] rounded-xl p-5 flex flex-col gap-2 no-underline text-inherit hover:border-sroia-light">
                        <span className="flex items-center justify-between text-[#565f52]">
                            <span>{label}</span>
                            <Icon size={20} aria-hidden="true" className="text-sroia-green" />
                        </span>
                        <span className="text-4xl font-extrabold text-sroia-dark">{value}</span>
                        {sub && <span className="text-sm text-[#565f52]">{sub}</span>}
                    </Link>
                ))}
            </div>

            <section className="flex flex-col gap-3">
                <h2 className="text-xl font-extrabold text-sroia-dark">פניות שעוד לא נקראו</h2>
                {unread.length === 0
                    ? <p className="text-[#565f52]">אין פניות חדשות 🎉</p>
                    : (
                        <ul className="bg-white border border-[#E1E8DA] rounded-xl">
                            {unread.slice(0, 5).map((c) => (
                                <li key={c._id} className="border-t first:border-t-0 border-[#EEF2E9]">
                                    <Link to="/contacts" className="flex items-center gap-4 p-4 no-underline text-inherit hover:bg-sroia-bg">
                                        <span className="flex-1 font-bold">{c.name}</span>
                                        <span className="text-sm text-[#565f52]">{new Date(c.createdAt).toLocaleDateString('he-IL')}</span>
                                        <ChevronLeft size={18} aria-hidden="true" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
            </section>
        </div>
    )
}

export default HomePage
