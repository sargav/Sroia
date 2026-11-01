import { useState } from 'react'
import { Plus, Trash2, ExternalLink } from 'lucide-react'
import {
    useGetVideosQuery,
    useAddVideoMutation,
    useUpdateVideoMutation,
    useDeleteVideoMutation,
} from './videosApiSlice'
import ConfirmDialog from '../../components/ConfirmDialog'
import PageHeader from '../../components/PageHeader'

// מוציא את מזהה הסרטון מקישור יוטיוב, בשביל התמונה הקטנה
const getYoutubeId = (url) => {
    const match = String(url).match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/)
    return match ? match[1] : null
}

const emptyForm = { name: '', url: '', type: 'course' }

const VideosPage = () => {
    const { data: videos = [], isLoading, isError } = useGetVideosQuery()
    const [addVideo, { isLoading: isAdding }] = useAddVideoMutation()
    const [updateVideo] = useUpdateVideoMutation()
    const [deleteVideo] = useDeleteVideoMutation()

    const [form, setForm] = useState(emptyForm)
    const [error, setError] = useState('')
    const [toDelete, setToDelete] = useState(null)

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleAdd = async (e) => {
        e.preventDefault()
        setError('')
        try {
            await addVideo(form).unwrap()
            setForm(emptyForm)
        } catch (err) {
            setError(err.data?.message === 'url must be a YouTube link'
                ? 'הקישור חייב להיות קישור של יוטיוב'
                : 'ההוספה נכשלה, בדקו שכל השדות מלאים')
        }
    }

    // שם הממליץ נשמר כשיוצאים מהשדה, ורק אם השתנה
    const saveName = (video, value) => {
        if (value.trim() && value.trim() !== video.name) {
            updateVideo({ id: video._id, name: value.trim() })
        }
    }

    return (
        <div className="flex flex-col gap-6">
            <PageHeader title="סרטוני המלצות" subtitle="סרטוני היוטיוב שמופיעים באתר" />

            {/* הוספת סרטון */}
            <form onSubmit={handleAdd} className="bg-white border border-[#E1E8DA] rounded-xl p-4 flex flex-wrap items-end gap-3">
                <label className="flex flex-col gap-1 text-sm font-bold text-[#3a4436] flex-[1_1_180px]">
                    שם הממליץ
                    <input name="name" value={form.name} onChange={handleChange} required
                        className="font-normal min-h-11 px-3 border border-sroia-line rounded-lg" />
                </label>
                <label className="flex flex-col gap-1 text-sm font-bold text-[#3a4436] flex-[2_1_260px]">
                    קישור ליוטיוב
                    <input name="url" type="url" dir="ltr" value={form.url} onChange={handleChange} required
                        placeholder="https://youtu.be/..."
                        className="font-normal min-h-11 px-3 border border-sroia-line rounded-lg" />
                </label>
                <label className="flex flex-col gap-1 text-sm font-bold text-[#3a4436] flex-[1_1_140px]">
                    איפה יופיע
                    <input name="type" list="video-types" value={form.type} onChange={handleChange} required
                        className="font-normal min-h-11 px-3 border border-sroia-line rounded-lg" />
                    <datalist id="video-types">
                        <option value="course">course – דף הקורס</option>
                    </datalist>
                </label>
                <button type="submit" disabled={isAdding}
                    className="min-h-11 px-5 rounded-lg bg-sroia-green text-white font-bold flex items-center gap-2 cursor-pointer disabled:opacity-50">
                    <span>{isAdding ? 'מוסיף...' : 'הוספה'}</span>
                    <Plus size={18} aria-hidden="true" />
                </button>
                {error && <p role="alert" className="w-full text-sm text-[#8a2424]">{error}</p>}
            </form>

            {isLoading && <p>טוען סרטונים...</p>}
            {isError && <p role="alert">לא הצלחנו לטעון את הסרטונים</p>}
            {!isLoading && videos.length === 0 && <p className="text-[#565f52]">אין עדיין סרטונים</p>}

            <ul className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
                {videos.map((video) => {
                    const ytId = getYoutubeId(video.url)
                    return (
                        <li key={video._id} className="bg-white border border-[#E1E8DA] rounded-xl overflow-hidden flex flex-col">
                            {ytId
                                ? <img src={`https://img.youtube.com/vi/${ytId}/mqdefault.jpg`} alt="" loading="lazy" className="w-full aspect-video object-cover" />
                                : <div className="w-full aspect-video bg-[#EEF2E9]" />}
                            <div className="p-3 flex flex-col gap-2">
                                <label className="flex flex-col gap-1 text-xs font-bold text-[#3a4436]">
                                    שם הממליץ
                                    <input type="text" defaultValue={video.name}
                                        onBlur={(e) => saveName(video, e.target.value)}
                                        className="font-normal text-sm min-h-10 px-2 border border-sroia-line rounded-lg" />
                                </label>
                                <div className="flex items-center justify-between gap-2">
                                    <span className="text-xs text-[#565f52]">{video.type}</span>
                                    <div className="flex gap-1">
                                        <a href={video.url} target="_blank" rel="noreferrer" aria-label={`צפייה בסרטון של ${video.name}`}
                                            className="w-10 h-10 flex items-center justify-center rounded-lg text-sroia-dark hover:bg-sroia-bg">
                                            <ExternalLink size={18} aria-hidden="true" />
                                        </a>
                                        <button type="button" onClick={() => setToDelete(video)} aria-label={`מחיקת הסרטון של ${video.name}`}
                                            className="w-10 h-10 flex items-center justify-center rounded-lg text-[#a12f2f] cursor-pointer hover:bg-[#FBECEC]">
                                            <Trash2 size={18} aria-hidden="true" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>

            <ConfirmDialog
                open={toDelete !== null}
                title="למחוק את הסרטון?"
                message={toDelete ? `הסרטון של ${toDelete.name} יוסר מהאתר.` : ''}
                onConfirm={() => { deleteVideo(toDelete._id); setToDelete(null) }}
                onCancel={() => setToDelete(null)}
            />
        </div>
    )
}

export default VideosPage
