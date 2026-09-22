const express=require('express')
const router=express.Router()
const Contact=require('../models/Contact')
const contactController=require('../controller/contactController')

router.post('/',contactController.addContact)

module.exports =router

