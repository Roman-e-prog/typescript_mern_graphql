import AdminAnswer from "../models/AdminAnswer";
import AdminAnswerType from "../graphQlTypes/AdminAnswer";
import {GraphQLID, GraphQLNonNull, GraphQLString} from 'graphql';
import UserMessage from "../models/UserMessage";

const addAdminAnswer = {
    type:AdminAnswerType,
    args:{
        firstMessageId:{type:GraphQLID},
        sendUserId:{type:GraphQLID},
        sendUsername:{type:GraphQLString},
        adminname:{type:GraphQLString},
        adminId:{type:GraphQLID},
        adminAnswer:{type:GraphQLString},
    },
    async resolve(parent:any, args:any){
        const newAdminAnswer = new AdminAnswer({
            firstMessageId:args.firstMessageId,
            sendUserId:args.sendUserId,
            sendUsername:args.sendUsername,
            adminname:args.adminname,
            adminId:args.adminId,
            adminAnswer:args.adminAnswer,
        })
        try{
             await UserMessage.findOneAndUpdate({_id:args.firstMessageId}, {$set:{isAnswered:true}})
            return await newAdminAnswer.save();
        } catch(error){
            console.log(error)
        }
    }
}
const updateAdminAnswer = {
    type:AdminAnswerType,
    args:{
        id:{type:new GraphQLNonNull(GraphQLID)},
        firstMessageId:{type:GraphQLID},
        sendUserId:{type:GraphQLID},
        sendUsername:{type:GraphQLString},
        adminname:{type:GraphQLString},
        adminId:{type:GraphQLID},
        adminAnswer:{type:GraphQLString},
    },
    async resolve(parent:any, args:any){
        try{
            const updatedata = {
                firstMessageId:args.firstMessageId,
                sendUserId:args.sendUserId,
                sendUsername:args.sendUsername,
                adminname:args.adminname,
                adminId:args.adminId,
                adminAnswer:args.adminAnswer,
            }
            const updatedAdminAnswer = await AdminAnswer.findByIdAndUpdate(args.id, updatedata, {new:true})
            return updatedAdminAnswer;
        } catch(error){
            console.log(error)
            throw new Error('Not found')
        }
    }
}
const deleteAdminAnswer = {
    type:AdminAnswerType,
    args:{
        id:{type:new GraphQLNonNull(GraphQLID)}
    },
    async resolve(parent:any, args:any){
        return AdminAnswer.findByIdAndDelete(args.id)
    }
}
export {addAdminAnswer, deleteAdminAnswer, updateAdminAnswer}