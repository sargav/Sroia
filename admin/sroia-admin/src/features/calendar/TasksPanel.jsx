import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import ConfirmDialog from '../../components/ConfirmDialog'
import Loading from '../../components/Loading'
import {
    useGetTasksQuery,
    useAddTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
} from './calendarApiSlice'

const SCOPES = [
    { id: 'mine', label: 'שלי' },
    { id: 'all', label: 'של כולם' },
]

// רשימת המשימות: הוספה מהירה, סימון "בוצע", מחיקה
const TasksPanel = () => {
    const [scope, setScope] = useState('mine')
    const { data: tasks = [], isLoading, isError } = useGetTasksQuery(scope)
    const [addTask, { isLoading: isAdding }] = useAddTaskMutation()
    const [updateTask] = useUpdateTaskMutation()
    const [deleteTask] = useDeleteTaskMutation()

    const [title, setTitle] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [toDelete, setToDelete] = useState(null)

    const handleAdd = async (e) => {
        e.preventDefault()
        if (!title.trim()) return
        try {
            await addTask({ title: title.trim(), dueDate: dueDate || undefined }).unwrap()
            setTitle('')
            setDueDate('')
        } catch (err) {
            console.log('שגיאה בהוספת משימה:', err.status)
        }
    }

    // משימות פתוחות קודם, אחר כך שבוצעו
    const open = tasks.filter((t) => t.status !== 'done')
    const done = tasks.filter((t) => t.status === 'done')

    const renderTask = (t) => {
        const isDone = t.status === 'done'
        const late = !isDone && t.dueDate && new Date(t.dueDate) < new Date(new Date().toDateString())
        return (
            <li key={t._id} className="flex items-start gap-3 py-2 border-t border-sroia-subtle first:border-t-0">
                <input
                    type="checkbox"
                    checked={isDone}
                    onChange={() => updateTask({ id: t._id, status: isDone ? 'todo' : 'done' })}
                    aria-label={`${t.title} – ${isDone ? 'סמן כלא בוצע' : 'סמן כבוצע'}`}
                    className="mt-1 w-5 h-5 accent-sroia-green cursor-pointer shrink-0"
                />
                <div className="flex-1 min-w-0">
                    <p className={`text-[15px] ${isDone ? 'line-through text-[#8a9386]' : ''}`}>{t.title}</p>
                    <p className="text-xs text-[#565f52]">
                        {scope === 'all' && t.manager?.name ? `${t.manager.name}` : ''}
                        {scope === 'all' && t.manager?.name && t.dueDate ? ' · ' : ''}
                        {t.dueDate && (
                            <span className={late ? 'text-[#a12f2f] font-bold' : ''}>
                                עד {new Date(t.dueDate).toLocaleDateString('he-IL')}{late ? ' (באיחור)' : ''}
                            </span>
                        )}
                    </p>
                </div>
                <button type="button" onClick={() => setToDelete(t)} aria-label={`מחיקת ${t.title}`}
                    className="w-8 h-8 flex items-center justify-center rounded-md text-[#a12f2f] hover:bg-[#FBECEC] cursor-pointer shrink-0">
                    <Trash2 size={16} aria-hidden="true" />
                </button>
            </li>
        )
    }

    return (
        <section aria-labelledby="tasks-title" className="bg-white border border-sroia-edge rounded-xl p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between gap-2">
                <h2 id="tasks-title" className="text-lg font-extrabold text-sroia-dark">משימות</h2>
                <div role="group" aria-label="של מי" className="flex gap-1 p-1 rounded-lg bg-sroia-subtle">
                    {SCOPES.map((s) => (
                        <button key={s.id} type="button" aria-pressed={scope === s.id} onClick={() => setScope(s.id)}
                            className={`min-h-9 px-3 rounded-md text-sm cursor-pointer ${scope === s.id ? 'bg-white font-bold shadow-sm' : ''}`}>
                            {s.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* הוספה מהירה */}
            <form onSubmit={handleAdd} className="flex flex-col gap-2">
                <div className="flex gap-2">
                    <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="משימה חדשה..."
                        aria-label="משימה חדשה" maxLength={200}
                        className="flex-1 min-w-0 min-h-11 px-3 border border-sroia-line rounded-lg" />
                    <button type="submit" disabled={isAdding || !title.trim()} aria-label="הוספת משימה"
                        className="w-11 h-11 flex items-center justify-center rounded-lg bg-sroia-green text-white cursor-pointer disabled:opacity-50">
                        <Plus size={20} aria-hidden="true" />
                    </button>
                </div>
                {title.trim() && (
                    <label className="flex items-center gap-2 text-sm text-[#3a4436]">
                        עד תאריך (לא חובה)
                        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)}
                            className="min-h-9 px-2 border border-sroia-line rounded-lg" />
                    </label>
                )}
            </form>

            {isLoading && <Loading text="טוען משימות..." className="py-6 text-sm" />}
            {isError && <p role="alert" className="text-sm">לא הצלחנו לטעון את המשימות</p>}
            {!isLoading && tasks.length === 0 && <p className="text-sm text-[#565f52]">אין משימות 🎉</p>}

            {/* גובה מוגבל - אם יש הרבה משימות, גוללים בתוך הקופסה */}
            {(open.length > 0 || done.length > 0) && (
                <div className="max-h-72 overflow-y-auto overscroll-contain -mx-1 px-1">
                    {open.length > 0 && <ul>{open.map(renderTask)}</ul>}
                    {done.length > 0 && (
                        <details>
                            <summary className="text-sm text-[#565f52] cursor-pointer min-h-9 flex items-center">בוצעו ({done.length})</summary>
                            <ul>{done.map(renderTask)}</ul>
                        </details>
                    )}
                </div>
            )}

            <ConfirmDialog
                open={toDelete !== null}
                title="למחוק את המשימה?"
                message={toDelete ? `"${toDelete.title}" תימחק.` : ''}
                onConfirm={() => { deleteTask(toDelete._id); setToDelete(null) }}
                onCancel={() => setToDelete(null)}
            />
        </section>
    )
}

export default TasksPanel
