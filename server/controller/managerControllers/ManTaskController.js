// ניהול המשימות (עבור המנהל)
// פונקציות: getTasks (סינון לפי status ו-manager), addTask, updateTask, deleteTask


const getTasks = async (req, res) => {
    try {
        const { status, scope } = req.query
        const filter = {}

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
            .sort({ status: 1, dueDate: 1 })
            .populate('manager', 'name')
            .populate('contact', 'name phone')
            .lean()
        res.json(tasks)
    } catch (error) {
        console.error('getTasks:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

module.exports = {getTasks}
