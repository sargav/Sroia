// ניהול המשימות (עבור המנהל)
// כל מנהל רואה כברירת מחדל רק את המשימות שלו. ?scope=all = המשימות של כולם
const mongoose = require('mongoose')
const Task = require('../../models/Task')
const { TASK_STATUSES } = require('../../models/Task')

// פונקציית עזר: id ריק / null = "בלי", id תקין = מותר, אחרת - לא תקין
const optionalId = (value) => {
    if (value === undefined) return { ok: true, skip: true }
    if (value === null || value === '') return { ok: true, value: null }
    if (!mongoose.isValidObjectId(value)) return { ok: false }
    return { ok: true, value }
}

// פונקציית עזר: תאריך ריק = "בלי", אחרת חייב להיות תאריך תקין
const optionalDate = (value) => {
    if (value === undefined) return { ok: true, skip: true }
    if (value === null || value === '') return { ok: true, value: null }
    const date = new Date(value)
    if (isNaN(date)) return { ok: false }
    return { ok: true, value: date }
}

// ===== כל המשימות =====
// ?scope=all  - של כל המנהלים (בלי זה - רק שלי)
// ?status=todo / doing / done
const getTasks = async (req, res) => {
    try {
        const { status, scope } = req.query
        const filter = {}

        // מי המנהל - תמיד מהטוקן, אף פעם לא מהבקשה
        if (scope !== 'all') {
            filter.manager = req.manager._id
        }

        if (status !== undefined) {
            if (!TASK_STATUSES.includes(status)) {
                return res.status(400).json({ message: 'Invalid status' })
            }
            filter.status = status
        }

        const tasks = await Task.find(filter)
            .sort({ status: 1, dueDate: 1, createdAt: -1 })
            .populate('manager', 'name')
            .populate('contact', 'name phone')
            .lean()
        res.json(tasks)
    } catch (error) {
        console.error('getTasks:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

// ===== הוספת משימה =====
// body: { title, status?, dueDate?, notes?, manager?, contact? }
const addTask = async (req, res) => {
    try {
        const { title, status, dueDate, notes, manager, contact } = req.body

        if (!title || !String(title).trim()) {
            return res.status(400).json({ message: 'Title is required' })
        }
        if (status !== undefined && !TASK_STATUSES.includes(status)) {
            return res.status(400).json({ message: 'Invalid status' })
        }
        const due = optionalDate(dueDate)
        if (!due.ok) return res.status(400).json({ message: 'Invalid dueDate' })
        const managerId = optionalId(manager)
        if (!managerId.ok) return res.status(400).json({ message: 'Invalid manager' })
        const contactId = optionalId(contact)
        if (!contactId.ok) return res.status(400).json({ message: 'Invalid contact' })

        const task = await Task.create({
            title: String(title).trim(),
            status: status || 'todo',
            dueDate: due.skip ? null : due.value,
            notes: notes ? String(notes) : '',
            // אם לא נבחר מנהל - המשימה של מי שיצר אותה
            manager: managerId.value || req.manager._id,
            contact: contactId.skip ? null : contactId.value,
            createdBy: req.manager._id
        })

        console.log(`משימה חדשה: "${task.title}", על ידי: ${req.manager?.manName}`)
        res.status(201).json(task)
    } catch (error) {
        console.error('addTask:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

// ===== עדכון משימה =====
// אפשר לשלוח רק חלק מהשדות, למשל { status: 'done' }
const updateTask = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: 'Invalid id' })
        }
        const task = await Task.findById(id)
        if (!task) return res.status(404).json({ message: 'Task not found' })

        const { title, status, dueDate, notes, manager, contact } = req.body

        if (title !== undefined) {
            if (!String(title).trim()) return res.status(400).json({ message: 'Title cannot be empty' })
            task.title = String(title).trim()
        }
        if (status !== undefined) {
            if (!TASK_STATUSES.includes(status)) return res.status(400).json({ message: 'Invalid status' })
            task.status = status
        }
        const due = optionalDate(dueDate)
        if (!due.ok) return res.status(400).json({ message: 'Invalid dueDate' })
        if (!due.skip) task.dueDate = due.value

        if (notes !== undefined) task.notes = String(notes)

        const managerId = optionalId(manager)
        if (!managerId.ok) return res.status(400).json({ message: 'Invalid manager' })
        if (!managerId.skip) task.manager = managerId.value

        const contactId = optionalId(contact)
        if (!contactId.ok) return res.status(400).json({ message: 'Invalid contact' })
        if (!contactId.skip) task.contact = contactId.value

        await task.save()
        res.json(task)
    } catch (error) {
        console.error('updateTask:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

// ===== מחיקת משימה =====
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: 'Invalid id' })
        }
        const task = await Task.findByIdAndDelete(id)
        if (!task) return res.status(404).json({ message: 'Task not found' })
        console.log(`משימה נמחקה: "${task.title}", על ידי: ${req.manager?.manName}`)
        res.json({ message: 'Task deleted' })
    } catch (error) {
        console.error('deleteTask:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

module.exports = { getTasks, addTask, updateTask, deleteTask }
