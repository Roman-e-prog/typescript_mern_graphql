import mongoose from 'mongoose';

const dbConnect = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL as string);
        console.log(`Successful connected with ${conn.connection.host}`)
    } catch(error){
        console.log(error)
    }
}
export default dbConnect;