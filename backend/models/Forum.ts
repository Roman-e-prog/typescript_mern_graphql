import mongoose from 'mongoose';

export interface ForumDocument extends mongoose.Document{
    username:string,
    userId:string,
    userIsAdmin:Boolean,
    profilePicture:string,
    questionTheme:string,
    question:string,
    ressort:string,
    views:number,
    likes:number,
    dislikes:number,
    isAnswered:Boolean,
    dislikesIds:string[],
    likesIds:string[],
    createdAt:Date,
    updatedAt:Date,
}
const forumSchema = new mongoose.Schema<ForumDocument>({
    username:{type:String, required:true},
    userId:{type:String, required:true},
    userIsAdmin:{type:Boolean, default:false},
    profilePicture:{type:String},
    questionTheme:{type:String, required:true},
    question:{type:String, required:true},
    ressort:{type:String, required:true},
    views:{type:Number, default:0},
    likes:{type:Number, default:0},
    dislikes:{type:Number, default:0},
    isAnswered:{type:Boolean, default:false},
    dislikesIds:{type:[{type:String}]},
    likesIds:{type:[{type:String}]},
},{timestamps:true})

export default mongoose.model('Forum', forumSchema);