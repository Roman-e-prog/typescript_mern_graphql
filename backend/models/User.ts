import mongoose from 'mongoose';
export interface UserDocument extends mongoose.Document{
    _id?:string,
    vorname:string,
    nachname:string,
    username:string,
    email:string,
    profilePicture?:string,
    cloudinaryId?:string,
    password:string,
    isAdmin:Boolean,
    createdAt:Date,
    updatedAt:Date,
    _doc?:any
}
const userSchema = new mongoose.Schema<UserDocument>({
    vorname:{type:String, required:true},
    nachname:{type:String, required:true},
    username:{type:String, required:true, unique:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    profilePicture:{type:String},
    cloudinaryId:{type:String},
    isAdmin:{type:Boolean, default:false},
},{timestamps:true})

export default mongoose.model('User', userSchema)