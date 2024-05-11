import {GraphQLID, GraphQLString, GraphQLObjectType} from 'graphql';
import DateType from './Date';
const AdminAnswerType = new GraphQLObjectType({
    name:"AdminAnswer",
    fields:()=>({
        id:{type:GraphQLID},
        firstMessageId:{type:GraphQLID},
        sendUserId:{type:GraphQLID},
        sendUsername:{type:GraphQLString},
        adminname:{type:GraphQLString},
        adminId:{type:GraphQLID},
        adminAnswer:{type:GraphQLString},
        createdAt:{type: DateType},
        updatedAt:{type: DateType},
    }) 
})

export default AdminAnswerType;