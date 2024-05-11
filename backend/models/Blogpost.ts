import mongoose from 'mongoose';

export interface BlogpostDocument extends mongoose.Document{
    blogtheme:string
    blogdescription:string
    blogtext:string
    author:string
    images:string[],
    cloudinaryIds:string[],
    createdAt:Date,
    updatedAt:Date,
}
const blogpostSchema = new mongoose.Schema<BlogpostDocument>({
    blogtheme:{type:String, required:true},
    blogdescription:{type:String, required:true},
    blogtext:{type:String, required:true},
    author:{type:String, required:true},
    images:{type:[{type:String}]},
    cloudinaryIds:{type:[{type:String}]},
},{timestamps:true})

export default mongoose.model('Blogpost', blogpostSchema);