require('dotenv').config()

const express = require('express')
const cors = require('cors')
const  mongoose  = require('mongoose')

const connectDB = require('./config/dbConn')
const corsOptions = require('./config/corsOptions')
const { ensureDefaultBenefits } = require('./config/defaultBenefits')

const app = express()
const PORT = process.env.PORT || 7500 // אותו פורט שהריאקט מחפש כברירת מחדל

connectDB()

//middleware

// כל בקשה לנתיבי התשלום נרשמת בלוג עוד לפני כל עיבוד,
// כדי לראות ב-Render אם Cardcom בכלל הגיעו לשרת (גם אם משהו נכשל אחר כך)
app.use('/api/payment', (req, res, next) => {
    console.log('בקשת תשלום נכנסה:', req.method, req.path, {
        contentType: req.headers['content-type'] || '(אין)',
        origin: req.headers.origin || '(אין)',
        hasKey: 'key' in req.query,
    })
    next()
})

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static('public'))

//routes
app.use('/api/contacts', require('./routes/contactRoute'))
app.use('/api/testimonials', require('./routes/testimonialRoute'))
app.use('/api/submit-lead', require('./routes/submitLeadRoute'))//השרת ששןלח אחכ את כל המידע לרב מסר
app.use('/api/images', require('./routes/imagesRoute')) //נתיב להחזרת התמונות  
app.use('/api/testi-urls', require('./routes/TestiUrlRoute')) //נתיב להחזרת כתובות הוידאו של העדויות
app.use('/api/payment', require('./routes/paymentRoute')) // נתיב ליצירת תשלום
app.use('/api/benefits', require('./routes/benefitRoute')) // נתיב לשמירת לקוח וההטבות שבחר
app.use('/api/benefit-notifications', require('./routes/benefitNotificationRoute')) // ניהול רשימות המיילים של ההטבות (מוגן במפתח מנהל)
app.get('/', (req, res) => {
    res.send('hello from server')
})

// שגיאות שקרו לפני שהבקשה הגיעה לנתיב (JSON לא תקין, CORS וכו')
app.use((err, req, res, next) => {
    console.error('שגיאה בבקשה', req.method, req.originalUrl, '-', err.message)
    res.status(err.status || 500).json({ message: 'Server error' })
})

//DB conection
mongoose.connection.once('open', () => {
    console.log('connect to mongoDB')
    ensureDefaultBenefits() // מוודא שהטבת נגב (וכל הטבת ברירת מחדל) קיימת בקטלוג
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
})
mongoose.connection.on('error', err => {
    console.error(err)
})
