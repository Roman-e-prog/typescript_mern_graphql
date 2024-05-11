import UserMessage from "../models/UserMessage";
import UserMessageType from "../graphQlTypes/Usermessage";
import { GraphQLID, GraphQLNonNull, GraphQLList } from "graphql";

const usermessages = {
    type:new GraphQLList(UserMessageType),
    resolve(parent:any, args:any){
        return UserMessage.find();
    }
};
const usermessage = {
    type:UserMessageType,
    args:{id:{type:new GraphQLNonNull(GraphQLID)}},
    resolve(parent:any, args:any){
        return UserMessage.findById(args.id)
    }
}
export {usermessages, usermessage}