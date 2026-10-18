const mongoose = require('mongoose')

const managerSchema = new mongoose.Schema({
    
    name:{ 
        type: String, 
        required: true 
    },
    manName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
}
    ,
    {
        timestamps: true
    })

module.exports = mongoose.model('Manager', managerSchema)