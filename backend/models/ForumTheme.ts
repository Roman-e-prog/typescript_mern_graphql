import mongoose from 'mongoose';

export interface ForumThemeDocument extends mongoose.Document{
    forumtheme:string
    forumressort:string
    forumcontent:string
    createdAt:Date
    updatedAt:Date
}
const forumThemeSchema = new mongoose.Schema<ForumThemeDocument>({
    forumtheme:{type:String, required:true},
    forumressort:{type:String, required:true},
    forumcontent:{type:String, required:true},
},{timestamps:true});

export default mongoose.model('ForumTheme', forumThemeSchema);