const Testi_url = require('../models/Testi_url');

const getByType = async (req, res) => {
    try {
        const { type } = req.params;
        const urls = await Testi_url.find({ type: type });
        res.status(200).json(urls);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving URLs', error });
    }
}
// const addUrl= async(req,res)=>{
//     try {
//         const { url, name, type } = req.body;   
//         if (!url || !name || !type) {
//             return res.status(400).json({ message: "Please fill all the fields" });
//         }
//         const newUrl =await Testi_url.create({
//             url: url.trim(),
//             name: name.trim(),
//             type: type.trim()
//         });
//         res.status(201).json(newUrl);
//     } catch (error) {
//         res.status(500).json({ message: 'Error adding URL', error });
//     }
// }

module.exports = {
    getByType,
   // addUrl
}