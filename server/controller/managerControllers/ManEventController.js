// ניהול האירועים ביומן (עבור המנהל)
// היומן משותף: כל המנהלים רואים את כל האירועים
const mongoose = require('mongoose')
const Event = require('../../models/Event')
const { EVENT_TYPES } = require('../../models/Event')

// פונקציית עזר: id ריק / null = "בלי", id תקין = מותר, אחרת - לא תקין
const optionalId = (value) => {
    if (value === undefined) return { ok: true, skip: true }
    if (value === null || value === '') return { ok: true, value: null }
    if (!mongoose.isValidObjectId(value)) return { ok: false }
    return { ok: true, value }
}

// הופך טקסט לתאריך. מחזיר null אם הוא לא תקין
const toDate = (value) => {
    if (!value) return null
    const date = new Date(value)
    return isNaN(date) ? null : date
}

// כמה זמן מקסימום אפשר לבקש בבת אחת (כדי שלא יבקשו את כל השנים)
const MAX_RANGE_DAYS = 62

// ===== אירועים בטווח תאריכים =====
// ?from=2026-11-01&to=2026-12-01  (from כולל, to לא כולל)
const getEvents = async (req, res) => {
    try {
        const from = toDate(req.query.from)
        const to = toDate(req.query.to)
        if (!from || !to) {
            return res.status(400).json({ message: 'from and to are required dates' })
        }
        if (to <= from) {
            return res.status(400).json({ message: 'to must be after from' })
        }
        if ((to - from) / (24 * 60 * 60 * 1000) > MAX_RANGE_DAYS) {
            return res.status(400).json({ message: `Range can be up to ${MAX_RANGE_DAYS} days` })
        }

        // אירוע שמתחיל לפני הטווח ונגמר בתוכו - גם מופיע
        const events = await Event.find({ start: { $lt: to }, end: { $gt: from } })
            .sort({ start: 1 })
            .populate('manager', 'name')
            .populate('contact', 'name phone')
            .lean()
        res.json(events)
    } catch (error) {
        console.error('getEvents:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

// ===== אירוע אחד =====
const getEventById = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: 'Invalid id' })
        }
        const event = await Event.findById(id)
            .populate('manager', 'name')
            .populate('contact', 'name phone email')
            .lean()
        if (!event) return res.status(404).json({ message: 'Event not found' })
        res.json(event)
    } catch (error) {
        console.error('getEventById:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

// ===== הוספת אירוע =====
// body: { title, type, start, end, location?, notes?, manager?, contact? }
const addEvent = async (req, res) => {
    try {
        const { title, type, start, end, location, notes, manager, contact } = req.body

        if (!title || !String(title).trim()) {
            return res.status(400).json({ message: 'Title is required' })
        }
        if (!EVENT_TYPES.includes(type)) {
            return res.status(400).json({ message: 'Invalid type' })
        }
        const startDate = toDate(start)
        const endDate = toDate(end)
        if (!startDate || !endDate) {
            return res.status(400).json({ message: 'start and end are required dates' })
        }
        if (endDate <= startDate) {
            return res.status(400).json({ message: 'end must be after start' })
        }
        const managerId = optionalId(manager)
        if (!managerId.ok) return res.status(400).json({ message: 'Invalid manager' })
        const contactId = optionalId(contact)
        if (!contactId.ok) return res.status(400).json({ message: 'Invalid contact' })

        const event = await Event.create({
            title: String(title).trim(),
            type,
            start: startDate,
            end: endDate,
            location: location ? String(location) : '',
            notes: notes ? String(notes) : '',
            // אם לא נבחר מנהל אחראי - מי שיצר
            manager: managerId.value || req.manager._id,
            contact: contactId.skip ? null : contactId.value,
            createdBy: req.manager._id
        })

        console.log(`אירוע חדש ביומן: "${event.title}", על ידי: ${req.manager?.manName}`)
        res.status(201).json(event)
    } catch (error) {
        console.error('addEvent:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

// ===== עדכון אירוע =====
// אפשר לשלוח רק חלק מהשדות. אם משנים זמן - end עדיין חייב להיות אחרי start
const updateEvent = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: 'Invalid id' })
        }
        const event = await Event.findById(id)
        if (!event) return res.status(404).json({ message: 'Event not found' })

        const { title, type, start, end, location, notes, manager, contact } = req.body

        if (title !== undefined) {
            if (!String(title).trim()) return res.status(400).json({ message: 'Title cannot be empty' })
            event.title = String(title).trim()
        }
        if (type !== undefined) {
            if (!EVENT_TYPES.includes(type)) return res.status(400).json({ message: 'Invalid type' })
            event.type = type
        }
        if (start !== undefined) {
            const startDate = toDate(start)
            if (!startDate) return res.status(400).json({ message: 'Invalid start' })
            event.start = startDate
        }
        if (end !== undefined) {
            const endDate = toDate(end)
            if (!endDate) return res.status(400).json({ message: 'Invalid end' })
            event.end = endDate
        }
        // בודקים אחרי שני השינויים, כי אפשר להזיז את שניהם ביחד
        if (event.end <= event.start) {
            return res.status(400).json({ message: 'end must be after start' })
        }

        if (location !== undefined) event.location = String(location)
        if (notes !== undefined) event.notes = String(notes)

        const managerId = optionalId(manager)
        if (!managerId.ok) return res.status(400).json({ message: 'Invalid manager' })
        if (!managerId.skip) event.manager = managerId.value

        const contactId = optionalId(contact)
        if (!contactId.ok) return res.status(400).json({ message: 'Invalid contact' })
        if (!contactId.skip) event.contact = contactId.value

        await event.save()
        res.json(event)
    } catch (error) {
        console.error('updateEvent:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

// ===== מחיקת אירוע =====
const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: 'Invalid id' })
        }
        const event = await Event.findByIdAndDelete(id)
        if (!event) return res.status(404).json({ message: 'Event not found' })
        console.log(`אירוע נמחק מהיומן: "${event.title}", על ידי: ${req.manager?.manName}`)
        res.json({ message: 'Event deleted' })
    } catch (error) {
        console.error('deleteEvent:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

module.exports = { getEvents, getEventById, addEvent, updateEvent, deleteEvent }
