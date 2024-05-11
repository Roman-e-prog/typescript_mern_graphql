import {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLNonNull, GraphQLBoolean} from 'graphql'
import DateType from './Date';
const UserMessageType = new GraphQLObjectType({
    name:"Usermessage",
    fields:()=>({
        id:{type:GraphQLID},
        userId:{type:new GraphQLNonNull(GraphQLID)},
        message:{type:GraphQLString},
        username:{type:GraphQLString},
        isAnswered:{type:GraphQLBoolean},
        createdAt:{type:DateType},
        updatedAt:{type:DateType},
    })
})
export default UserMessageType;