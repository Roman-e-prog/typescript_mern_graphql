import mongoose from 'mongoose';

export interface BibliothekDocument extends mongoose.Document{
    videoTheme:string,
    videoContent:string,
    url:string,
    ressort:string,
    createdAt:Date,
    updatedAt:Date,
}
const bibliothekSchema = new mongoose.Schema({
    videoTheme:{type:String, required:true},
    videoContent:{type:String, required:true},
    url:{type:String, required:true},
    ressort:{type:String, required:true},
},{timestamps:true})

export default mongoose.model('Bibliothek', bibliothekSchema);