import mongoose, { ObjectId } from 'mongoose';

export interface UebermichDocument extends mongoose.Document{
    myPerson:string,
    createdAt:Date
    updatedAt:Date
}
const uebermichSchema = new mongoose.Schema<UebermichDocument>({
    myPerson:{type:String, required:true},
},{timestamps:true});

export default mongoose.model('Uebermich', uebermichSchema);