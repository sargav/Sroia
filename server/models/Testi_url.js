const mongoose = require('mongoose');
const testi_urlSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    }
},{ timestamps: true });

module.exports = mongoose.model('Testi_url', testi_urlSchema);