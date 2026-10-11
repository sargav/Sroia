const allowedOrigins = [
'http://localhost:5173',
'http://localhost:5500',
'https://sargav.github.io',
'https://sroia.onrender.com',
'https://sroia.co.il',
'https://www.sroia.co.il'


]
const corsOptions = {
origin: (origin, callback) => {
if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
callback(null, true)
} else {
callback(new Error('Not allowed by CORS'))
}
},
credentials: true,
optionsSuccessStatus: 200
}
module.exports = corsOptions