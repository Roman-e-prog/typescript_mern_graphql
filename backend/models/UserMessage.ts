import mongoose from 'mongoose';

export interface UserMessageDocument extends mongoose.Document{
    userId:string,
    message:string,
    username:string,
    isAnswered:Boolean,
    createdAt:Date,
    updatedAt:Date,
};

const userMessageSchema = new mongoose.Schema({
    userId:{type:String, required:true},
    message:{type:String, required:true},
    username:{type:String, required:true},
    isAnswered:{type:Boolean, default:false},
},{timestamps:true})

export default mongoose.model("UserMessage", userMessageSchema);