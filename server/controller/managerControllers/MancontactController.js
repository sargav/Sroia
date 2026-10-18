const mongoose = require('mongoose');
const Contact = require('../models/Contact');


const getAll=async (req,res)=>{
    const contacts=await Contact.find();
    if(!contacts){
        return res.status(404).json({message:"No contacts found"});
    }
    res.json(contacts);
}

const getById=async (req,res)=>{
    const {id}=req.params;
    if(!id){
        return res.status(400).json({message:"Contact ID is required"});
    }
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        return res.status(404).json({message:"Contact not found"});
    }
    res.json(contact);
}

const updateContact=async (req,res)=>{
    const {id}=req.body;
    if(!id){
        return res.status(400).json({message:"Contact ID is required"});
    }
    const contact=await Contact.findById(id);
    if(!contact){
        return res.status(404).json({message:"Contact not found"});
    }
    const parametersToUpdate = ['isRead', 'isReplied', 'adminNote'];
    for (const p of parametersToUpdate) {
        if (req.body[p] !== undefined) {
            contact[p] = req.body[p];
        }
    }
    await contact.save();
    res.json(contact);
}

const deleteContact=async (req,res)=>{
    const contact=await Contact.findByIdAndDelete(req.params.id);
    if(!contact){
        return res.status(404).json({message:"Contact not found"});
    }
    res.json({message:"Contact deleted successfully"});
}

module.exports = {getAll,getById,updateContact,deleteContact}
