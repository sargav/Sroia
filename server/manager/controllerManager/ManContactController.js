const Contact =require('../../models/Contact')

const getAllContacts = async (req,res)=>{
    try{
    const contacts=await Contact.find().sort({createdAt:-1})
    return res.status(200).json(contacts)
    }
    catch(error){
        return res.status(500).json({message:error.message})
    }
}
const updateContact = async (req,res)=>{
    try{
        const {id,readed,hasBeenReplied}=req.body
        if(!id){
            return res.status(400).json({message:'Contact id is required'})
        }
        const contact=await Contact.findOne({_id:id})
        if(!contact){
            return res.status(404).json({message:`No contact with id: ${id}`})
        }
        else{
            contact.readed=readed
            contact.hasBeenReplied=hasBeenReplied
            await contact.save()
            return res.status(200).json(contact)
        }

    }
    catch(error){
        return res.status(500).json({message:error.message})
    }
}
const deleteContact = async (req,res)=>{
    try{
        const {id}=req.params
        if(!id){
            return res.status(400).json({message:'Contact id is required'})
        }
        const contact=await Contact.findOne({_id:id})
        if(!contact){
            return res.status(404).json({message:`No contact with id: ${id}`})
        }
        await contact.deleteOne()
        return res.status(200).json({message:`Contact ${id} deleted successfully`})
    }
    catch(error){
        return res.status(500).json({message:`The contact ${id} not deleted`})
    }
}