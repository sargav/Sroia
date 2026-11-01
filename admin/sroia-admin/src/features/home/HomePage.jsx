import { Link } from 'react-router-dom'
import { Inbox, Image, Video, ChevronLeft } from 'lucide-react'
import { useGetContactsQuery } from '../contacts/contactsApiSlice'
import { useGetImagesQuery } from '../images/imagesApiSlice'
import { useGetVideosQuery } from '../videos/videosApiSlice'
import PageHeader from '../../components/PageHeader'

const HomePage = () => {
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
            <PageHeader title="שלום 👋" subtitle="מה קורה באתר של סרויה" />

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
