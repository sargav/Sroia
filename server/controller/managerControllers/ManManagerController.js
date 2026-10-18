const mongoose = require('mongoose');
const Manager = require('../../models/Manager');

//לעשות מלא בדיקות על הנתונים בקטע של אבטחה

const getAllManagers = async (req, res) => {
    try {
        const managers = await Manager.find({}, {password: 0});  
        res.json(managers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching managers' });
    }
};
const getManagerById = async (req, res) => {
    try {
        const { id } = req.params;
        const manager = await Manager.findOne({ _id: id }, { password: 0 });
        if (!manager) {
            return res.status(404).json({ message: 'Manager not found' });
        }   
        res.json(manager);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching manager' });
    }
};
const updateManager = async (req, res) => {
    const{id}=req.body;
    const manager = await Manager.findById(id);
    if (!manager) {
        return res.status(404).json({ message: 'Manager not found' });
    }
    const parametersToUpdate = ['name', 'manName', 'email', 'phone', 'password'];
    for (const p of parametersToUpdate) {
        if (req.body[p] !== undefined) {
            manager[p] = req.body[p];
        }
    }
    await manager.save();
    const updatedManager = await Manager.findById(id, { password: 0 });
    res.json(updatedManager);

}
//לעשות את כל הבדיקות על הנתונים
//צריך לשים לב בין היתר שלא יהיו כפילויות
const addManager = async (req, res) => {
    try {
        const { name, manName, email, phone, password } = req.body;
        if (!name || !manName || !email || !phone || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        //בדיקות תקינות כל הנתונים
        const bcrPassword = await bcrypt.hash(password, 10);
        const manager = new Manager({ name, manName, email, phone, bcrPassword });
        await manager.save();
        res.status(201).json(manager);
    } catch (error) {
        res.status(400).json({ message: 'Error adding manager' });
    }
};

const deleteManager = async (req, res) => {
    try {
        const { id } = req.body;
        const manager = await Manager.findByIdAndDelete(id);
        if (!manager) {
            return res.status(404).json({ message: 'Manager not found' });
        }
        res.json({ message: 'Manager deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting manager' });
    }
};

module.exports = {
    getAllManagers,
    getManagerById,
    updateManager,
    addManager,
    deleteManager
};
