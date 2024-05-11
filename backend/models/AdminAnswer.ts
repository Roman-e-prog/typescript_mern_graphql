import mongoose from 'mongoose';

export interface AdminAnswerDocument extends mongoose.Document{
    firstMessageId:string,
    sendUserId:string,
    sendUsername:string,
    adminname:string,
    adminId:string,
    adminAnswer:string,
    createdAt:Date,
    updatedAt:Date,
}

const adminAnswerSchema = new mongoose.Schema({
    firstMessageId:{type:String, required:true},
    sendUserId:{type:String, required:true},
    sendUsername:{type:String, required:true},
    adminname:{type:String, required:true},
    adminId:{type:String, required:true},
    adminAnswer:{type:String, required:true},
},{timestamps:true})

export default mongoose.model('AdminAnswer', adminAnswerSchema)