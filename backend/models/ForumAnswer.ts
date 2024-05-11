import mongoose from 'mongoose';

export interface ForumAnswerDocument extends mongoose.Document{
    id?:string,
    questionId:string,
    sendername:string,
    senderId:string,
    senderProfilePicture:string,
    hasSolved:Boolean,
    answer:string,
    answererUsername?:string,
    answererId?:string,
    likes:number,
    dislikes:number,
    dislikesAnswerIds:string[],
    likesAnswerIds:string[],
    createdAt:Date,
    updatedAt:Date,
}
const forumAnswerSchema = new mongoose.Schema<ForumAnswerDocument>({
    questionId:{type:String, required:true},
    sendername:{type:String, required:true},
    senderId:{type:String, required:true},
    senderProfilePicture:{type:String},
    hasSolved:{type:Boolean, default:false},
    answer:{type:String, required:true},
    answererUsername:{type:String},
    answererId:{type:String},
    likes:{type:Number, default:0},
    dislikes:{type:Number, default:0},
    dislikesAnswerIds:{type:[{type:String}]},
    likesAnswerIds:{type:[{type:String}]},
},{timestamps:true})

export default mongoose.model('ForumAnswer', forumAnswerSchema);