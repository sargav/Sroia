const Testimonial = require('../../models/Testimonial')

const getAllTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find().lean()
        res.json(testimonials)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
const addTestimonial = async (req, res) => {
    try{
        const { name, email, message, type } = req.body
        if (!name || !email || !message || !type) {
            return res.status(400).json({ message: "Please fill all the fields" })
        }
        const newTestimonial=await Testimonial.create({name, email, message, type})
        if (!newTestimonial) {
            return res.status(400).json({ message: "Error creating testimonial" })
        }
        res.status(201).json(newTestimonial)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
const updateTestimonial = async (req, res) => {
    try{
        const { id, name, email, message, type } = req.body
        if (!id || !name || !email || !message || !type) {
            return res.status(400).json({ message: "Please fill all the fields" })
        }
        const testimonial = await Testimonial.findById(id)
        if (!testimonial) {
            return res.status(404).json({ message: "Testimonial not found" })
        }
        testimonial.name = name
        testimonial.email = email
        testimonial.message = message
        testimonial.type = type
        const updatedTestimonial = await testimonial.save()
        res.json(updatedTestimonial)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
const deleteTestimonial = async (req, res) => {
    try{
        const { id } = req.params
        const testimonial = await Testimonial.findById(id)
        if(!testimonial){
            return res.status(404).json({ message: "Testimonial not found" })
        }
        await testimonial.deleteOne()
        res.json({ message: "Testimonial deleted successfully" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
module.exports = {
    getAllTestimonials,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial
}