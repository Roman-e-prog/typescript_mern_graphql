import UserMessage from "../models/UserMessage";
import UserMessageType from "../graphQlTypes/Usermessage";
import { GraphQLID, GraphQLString, GraphQLNonNull } from "graphql";

const addUsermessage = {
    type:UserMessageType,
    args:{
      userId:{type:new GraphQLNonNull(GraphQLID)},
      message:{type:GraphQLString},
      username:{type:GraphQLString},
    },
    async resolve(parent:any, args:any){
        const newUsermessage = new UserMessage({
            userId:args.userId,
            message:args.message,
            username:args.username,
        })
        try{
            return await newUsermessage.save();
        } catch(error){
            console.log(error)
        }
    }
}
const deleteUsermessage = {
    type:UserMessageType,
    args:{
      id:{type:new GraphQLNonNull(GraphQLID)}
    },
    async resolve(parent:any, args:any){
        try{
            return await UserMessage.findByIdAndDelete(args.id);
        } catch(error){
            console.log(error)
        }
    }
}
export {addUsermessage, deleteUsermessage}