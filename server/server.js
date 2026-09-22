require('dotenv').config()

const express = require('express')
const cors = require('cors')
const  mongoose  = require('mongoose')

const connectDB = require('./config/dbConn')
const corsOptions = require('./config/corsOptions')

const app = express()
const PORT = process.env.PORT || 9540

const cookieParser = require('cookie-parser');

connectDB()

//middleware

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser());
app.use(express.static('public'))

//routes
app.use('/api/contacts', require('./routes/contactRoute'))
app.use('/api/testimonials', require('./routes/testimonialRoute'))
app.use('/api/submit-lead', require('./routes/submitLeadRoute'))//השרת ששןלח אחכ את כל המידע לרב מסר
app.use('/api/images', require('./routes/imagesRoute')) //נתיב להחזרת התמונות  
app.use('/api/testi-urls', require('./routes/TestiUrlRoute')) //נתיב להחזרת כתובות הוידאו של העדויות
app.use('/api/payment', require('./routes/paymentRoute')) // נתיב ליצירת תשלום   
app.get('/', (req, res) => {
    res.send('hello from server')
})

//DB conection
mongoose.connection.once('open', () => {
    console.log('connect to mongoDB')
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
})
mongoose.connection.on('error', err => {
    console.error(err)
})
