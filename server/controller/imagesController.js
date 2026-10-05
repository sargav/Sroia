const fs = require('fs');
const path = require('path');
const returnImage=async (req, res) => {
    const folderName = String(req.params.folderName);

    const allowedFolders = ['finish', 'start', 'Testimonials'];
    if (!allowedFolders.includes(folderName)) {
        return res.status(400).json({ error: 'תיקייה לא חוקית' });
    }
    
    const dir = path.join(__dirname, '..', 'public', folderName);

    fs.readdir(dir, (err, files) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'שגיאה בקריאת התמונות' });
        }
        
        const images = files.filter(f => /\.(png|jpg|jpeg|webp)$/i.test(f));
        const urls = images.map(f => `/${folderName}/${f}`);
        res.json(urls);
    });
}
module.exports = returnImage;