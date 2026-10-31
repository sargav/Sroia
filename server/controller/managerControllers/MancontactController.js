const mongoose = require('mongoose');
const Contact = require('../../models/Contact');


const getAll = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 }).lean()
        res.json(contacts)
    } catch (error) {
        console.error('getAll contacts:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

const getById = async (req, res) => {
    try {
        const { id } = req.params
        if (!id){
            return res.status(400).json({ message: 'Invalid id' })
        }
        const contact = await Contact.findById(id).lean()
        if (!contact) return res.status(404).json({ message: 'Contact not found' })
        res.json(contact)
    } catch (error) {
        console.error('getById contact:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}
const updateContact = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({ message: 'Invalid id' })
        }
        const contact = await Contact.findById(id)
        if (!contact) return res.status(404).json({ message: 'Contact not found' })

        const { isRead, isReplied, adminNote } = req.body
        if (isRead !== undefined) contact.isRead = Boolean(isRead)
        if (isReplied !== undefined) contact.isReplied = Boolean(isReplied)
        if (adminNote !== undefined) contact.adminNote = String(adminNote)

        await contact.save()
        console.log(`פנייה ${id} עודכנה על ידי ${req.manager?.manName}`)
        res.json(contact)
    } catch (error) {
        console.error('updateContact:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

const deleteContact = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: 'Invalid id' })
        }
        const contact = await Contact.findByIdAndDelete(id)
        if (!contact) return res.status(404).json({ message: 'Contact not found' })
        console.log(`פנייה ${id} נמחקה על ידי ${req.manager?.manName}`)
        res.json({ message: 'Contact deleted' })
    } catch (error) {
        console.error('deleteContact:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

module.exports = {getAll,getById,updateContact,deleteContact}
