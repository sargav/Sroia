import { useState } from 'react'
import { Upload, Trash2, ImagePlus } from 'lucide-react'
import {
    useGetImagesQuery,
    useUploadImagesMutation,
    useUpdateImageMutation,
    useDeleteImageMutation,
} from './imagesApiSlice'
import ConfirmDialog from '../../components/ConfirmDialog'
import PageHeader from '../../components/PageHeader'
import Loading from '../../components/Loading'

// הקטגוריות - כמו IMAGE_CATEGORIES במודל בשרת
const CATEGORIES = [
    { id: 'start', label: 'תחילת בנייה' },
    { id: 'finish', label: 'בתים גמורים' },
    { id: 'Testimonials', label: 'המלצות' },
]

const ImagesPage = () => {
    const [category, setCategory] = useState('start')
    const { data: images = [], isLoading, isError } = useGetImagesQuery(category)
    const [uploadImages, { isLoading: isUploading }] = useUploadImagesMutation()
    const [updateImage] = useUpdateImageMutation()
    const [deleteImage] = useDeleteImageMutation()

    const [files, setFiles] = useState([])
    const [clientName, setClientName] = useState('')
    const [message, setMessage] = useState('')
    const [toDelete, setToDelete] = useState(null)

    const isTestimonials = category === 'Testimonials'

    const handleUpload = async (e) => {
        e.preventDefault()
        if (files.length === 0) return
        setMessage('')

        const formData = new FormData()
        formData.append('category', category)
        if (isTestimonials && clientName.trim()) formData.append('clientName', clientName.trim())
        files.forEach((file) => formData.append('images', file)) // אותו שם לכל הקבצים

        try {
            const { created, failed } = await uploadImages(formData).unwrap()
            setMessage(failed?.length
                ? `הועלו ${created.length} תמונות. נכשלו: ${failed.join(', ')}`
                : `הועלו ${created.length} תמונות`)
            setFiles([])
            setClientName('')
            e.target.reset() // מנקה את שדה הקבצים
        } catch (err) {
            setMessage(err.data?.message || 'ההעלאה נכשלה, נסו שוב')
        }
    }

    // נשמר כשיוצאים מהשדה, ורק אם השתנה
    const saveField = (image, field, value) => {
        if (value.trim() !== (image[field] || '')) {
            updateImage({ id: image._id, [field]: value.trim() })
        }
    }

    return (
        <div className="flex flex-col gap-6">
            <PageHeader title="תמונות" subtitle="התמונות שמופיעות באתר, לפי קטגוריה" />

            {/* הקטגוריות - כפתורים עגולים, כדי שלא ייראו כמו הלשוניות של "תוכן האתר" שמעליהן */}
            <div role="group" aria-label="קטגוריה" className="flex flex-wrap gap-2">
                {CATEGORIES.map((c) => (
                    <button
                        key={c.id}
                        type="button"
                        aria-pressed={category === c.id}
                        onClick={() => { setCategory(c.id); setMessage('') }}
                        className={`min-h-10 px-4 rounded-full border text-sm font-bold cursor-pointer ${category === c.id
                            ? 'bg-sroia-dark border-sroia-dark text-white'
                            : 'bg-white border-sroia-line text-sroia-dark'
                            }`}
                    >
                        {c.label}
                    </button>
                ))}
            </div>

            {/* העלאה */}
            <form onSubmit={handleUpload} className="bg-white border border-sroia-edge rounded-xl p-4 flex flex-wrap items-end gap-3">
                <div className="flex flex-col gap-1 flex-[1_1_240px]">
                    <span className="text-sm font-bold text-[#3a4436]">בחירת תמונות</span>
                    {/* הקלט האמיתי מוסתר, והתווית נראית כמו כפתור - ככה הכיתוב בעברית ולא "Choose Files" */}
                    <label className="min-h-12 px-4 rounded-xl border-2 border-dashed border-sroia-line bg-sroia-bg text-sroia-dark flex items-center gap-3 cursor-pointer hover:border-sroia-green focus-within:border-sroia-green focus-within:ring-2 focus-within:ring-sroia-light/40">
                        <ImagePlus size={22} aria-hidden="true" className="shrink-0 text-sroia-green" />
                        <span className="font-bold">
                            {files.length === 0 ? 'לחצו לבחירת תמונות' : `נבחרו ${files.length} תמונות`}
                        </span>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) => setFiles([...e.target.files])}
                            className="sr-only"
                        />
                    </label>
                </div>
                {isTestimonials && (
                    <label className="flex flex-col gap-1 text-sm font-bold text-[#3a4436] flex-[1_1_200px]">
                        שם הממליץ (לא חובה)
                        <input
                            type="text"
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                            className="font-normal min-h-11 px-3 border border-sroia-line rounded-lg"
                        />
                    </label>
                )}
                <button
                    type="submit"
                    disabled={files.length === 0 || isUploading}
                    className="min-h-11 px-5 rounded-lg bg-sroia-green text-white font-bold flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <span>{isUploading ? 'מעלה...' : `העלאה${files.length ? ` (${files.length})` : ''}`}</span>
                    <Upload size={18} aria-hidden="true" />
                </button>
                {message && <p role="status" className="w-full text-sm text-[#3a4436]">{message}</p>}
            </form>

            {/* התמונות */}
            {isLoading && <Loading text="טוען תמונות..." />}
            {isError && <p role="alert">לא הצלחנו לטעון את התמונות</p>}
            {!isLoading && images.length === 0 && <p className="text-[#565f52]">אין עדיין תמונות בקטגוריה הזו</p>}

            <ul className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
                {images.map((image) => (
                    <li key={image._id} className="bg-white border border-sroia-edge rounded-xl overflow-hidden flex flex-col">
                        <img src={image.url} alt={image.alt || ''} loading="lazy" className="w-full aspect-[4/3] object-cover" />
                        <div className="p-3 flex flex-col gap-2">
                            <label className="flex flex-col gap-1 text-xs font-bold text-[#3a4436]">
                                תיאור לנגישות
                                <input
                                    type="text"
                                    defaultValue={image.alt || ''}
                                    onBlur={(e) => saveField(image, 'alt', e.target.value)}
                                    placeholder="מה רואים בתמונה?"
                                    className="font-normal text-sm min-h-10 px-2 border border-sroia-line rounded-lg"
                                />
                            </label>
                            {isTestimonials && (
                                <label className="flex flex-col gap-1 text-xs font-bold text-[#3a4436]">
                                    שם הממליץ
                                    <input
                                        type="text"
                                        defaultValue={image.clientName || ''}
                                        onBlur={(e) => saveField(image, 'clientName', e.target.value)}
                                        className="font-normal text-sm min-h-10 px-2 border border-sroia-line rounded-lg"
                                    />
                                </label>
                            )}
                            <button
                                type="button"
                                onClick={() => setToDelete(image)}
                                className="self-end min-h-10 px-3 rounded-lg text-[#a12f2f] text-sm flex items-center gap-2 cursor-pointer hover:bg-[#FBECEC]"
                            >
                                <span>מחיקה</span>
                                <Trash2 size={16} aria-hidden="true" />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            <ConfirmDialog
                open={toDelete !== null}
                title="למחוק את התמונה?"
                message="התמונה תימחק מהאתר ומ-Cloudinary, ואי אפשר יהיה לשחזר אותה."
                onConfirm={() => { deleteImage(toDelete._id); setToDelete(null) }}
                onCancel={() => setToDelete(null)}
            />
        </div>
    )
}

export default ImagesPage
