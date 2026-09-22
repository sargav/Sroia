const Testimonial = require('../models/Testimonial');

const getByType= async (req,res)=>{
    const enumTypes=['app','web','guide','course'];
    try {
        const {type}=req.params;
        if (!enumTypes.includes(type)) {
            return res.status(400).json({ message: 'Invalid type' });
        }
        const testimonials=await Testimonial.find({type},{name:1,message:1,_id:0})//.sort({createdAt:-1}).limit(3);
        res.json(testimonials);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getAll=async (req,res)=>{
    try{
        const testimonials=await Testimonial.find({},{name:1,message:1,_id:0})//.sort({createdAt:-1});
        res.status(200).json(testimonials);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    
}

module.exports = {getByType, getAll}
