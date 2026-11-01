// ניהול סרטוני ההמלצות של הלקוחות (קישורים ליוטיוב) - למנהלים בלבד.
// הצגת הסרטונים באתר נשארת בנתיב הציבורי: GET /api/testi-urls/:type
const mongoose = require('mongoose')
const Testi_url = require('../../models/Testi_url')

// בודק שהקישור הוא קישור תקין ליוטיוב (youtube.com או youtu.be).
// הקליינט (TestimonialVideos) יודע להציג רק קישורים כאלה
const isYoutubeUrl = (url) => {
    try {
        const { hostname, protocol } = new URL(String(url).trim())
        if (protocol !== 'https:' && protocol !== 'http:') return false
        return hostname === 'youtu.be' || hostname === 'youtube.com' || hostname.endsWith('.youtube.com')
    } catch {
        return false // לא כתובת בכלל
    }
}

// כל הסרטונים מכל הסוגים, החדשים קודם (לרשימה בפאנל הניהול)
const getAll = async (req, res) => {
    try {
        const urls = await Testi_url.find().sort({ createdAt: -1 }).lean()
        res.json(urls)
    } catch (error) {
        console.error('getAll testi-urls:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

// סרטון אחד לפי id
const getById = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: 'Invalid id' })
        }
        const url = await Testi_url.findById(id).lean()
        if (!url) return res.status(404).json({ message: 'Video not found' })
        res.json(url)
    } catch (error) {
        console.error('getById testi-url:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

// הוספת סרטון
const addUrl = async (req, res) => {
    try {
        const { url, name, type } = req.body
        if (!url || !name || !type) {
            return res.status(400).json({ message: 'url, name and type are required' })
        }
        if (!isYoutubeUrl(url)) {
            return res.status(400).json({ message: 'url must be a YouTube link' })
        }

        const newUrl = await Testi_url.create({
            url: String(url).trim(),
            name: String(name).trim(),
            type: String(type).trim()
        })

        console.log(`סרטון נוסף: ${newUrl.name}, על ידי: ${req.manager?.manName}`)
        res.status(201).json(newUrl)
    } catch (error) {
        console.error('addUrl:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

// עדכון סרטון - רק השדות שנשלחו משתנים
const updateUrl = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: 'Invalid id' })
        }
        const video = await Testi_url.findById(id)
        if (!video) return res.status(404).json({ message: 'Video not found' })

        const { url, name, type } = req.body
        if (url !== undefined) {
            if (!isYoutubeUrl(url)) {
                return res.status(400).json({ message: 'url must be a YouTube link' })
            }
            video.url = String(url).trim()
        }
        if (name !== undefined) {
            if (!String(name).trim()) return res.status(400).json({ message: 'name cannot be empty' })
            video.name = String(name).trim()
        }
        if (type !== undefined) {
            if (!String(type).trim()) return res.status(400).json({ message: 'type cannot be empty' })
            video.type = String(type).trim()
        }

        await video.save()
        console.log(`סרטון ${id} עודכן על ידי ${req.manager?.manName}`)
        res.json(video)
    } catch (error) {
        console.error('updateUrl:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

// מחיקת סרטון
const deleteUrl = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: 'Invalid id' })
        }
        const deleted = await Testi_url.findByIdAndDelete(id)
        if (!deleted) return res.status(404).json({ message: 'Video not found' })

        console.log(`סרטון נמחק: ${deleted.name}, על ידי: ${req.manager?.manName}`)
        res.json({ message: 'Video deleted' })
    } catch (error) {
        console.error('deleteUrl:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

module.exports = { getAll, getById, addUrl, updateUrl, deleteUrl }
