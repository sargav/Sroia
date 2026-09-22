const Manager = require("../models/Manager")
const bcrypt = require('bcrypt')
const checking = require('../../functionChecking/functionChecking')
const jwt = require('jsonwebtoken')
const login = async (req, res) => {
    try {
        const { name, password } = req.body;
        if (!name || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const manager = await Manager.findOne({ name });
        if (!manager) {
            return res.status(400).json({ message: 'Manager or password is incorrect' });
        }
        const isMatch = await bcrypt.compare(password, manager.password);
        if (!isMatch) { 
            return res.status(400).json({ message: 'Manager or password is incorrect' });
        }

        const information = {
            id: manager._id,
            name: manager.name,
            email: manager.email,
            phone: manager.phone
        };

        const accessToken = jwt.sign(information, process.env.Access_Token_Secret, { expiresIn: '1h' });
        // שמירה בעוגייה מאובטחת
        res.cookie('token', accessToken, { httpOnly: true, secure: true });
        return res.status(200).json({ message: 'Manager logged in successfully' });
    } 
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
const register = async (req, res) => {
    const { name, email, password, phone } = req.body
    if (!name || !email || !password || !phone) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    const existManager = await Manager.findOne({ name })
    if (existManager) {
        return res.status(400).json({ message: 'Manager already exists' })
    }
    //בדיקות תקינות נתונים
    const checkedName = checking.isValidName(name)
    const checkedEmail = checking.isValidEmail(email)
    const checkedPhone = checking.isValidPhone(phone)
    const checkedPassword = checking.isValidPassword(password)
    if (!checkedName || !checkedEmail || !checkedPhone || !checkedPassword) {
        const dataErrors = {
            name: checkedName ? null : 'Invalid name',
            email: checkedEmail ? null : 'Invalid email',
            phone: checkedPhone ? null : 'Invalid phone number',
            password: checkedPassword ? null : 'Invalid password'
        }
        return res.status(400).json({ message: 'Invalid input data', errors: dataErrors })
    }
    //אם הכל תקין יצירת מנהל חדש במסד נתונים
    const hashedPassword = await bcrypt.hash(password, 10)
    const manager = await Manager.create({ name, email, password: hashedPassword, phone })
    res.status(201).json({ message: 'Manager registered successfully', manager })
}
module.exports = { login, register }