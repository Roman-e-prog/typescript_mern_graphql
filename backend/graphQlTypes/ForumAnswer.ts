import {GraphQLObjectType, 
    GraphQLID, 
    GraphQLString, 
    GraphQLBoolean, 
    GraphQLInt, 
    GraphQLList} from 'graphql'
    import DateType from './Date';
const ForumAnswerType = new GraphQLObjectType({
    name:"ForumAnswer",
    fields:()=>({
        id:{type:GraphQLID},
        questionId:{type:GraphQLID},
        sendername:{type:GraphQLString},
        senderId:{type:GraphQLID},
        senderProfilePicture:{type:GraphQLString},
        hasSolved:{type:GraphQLBoolean},
        answer:{type:GraphQLString},
        answererUsername:{type:GraphQLString},
        answererId:{type:GraphQLID},
        likes:{type:GraphQLInt},
        dislikes:{type:GraphQLInt},
        dislikesAnswerIds:{type: new GraphQLList(GraphQLString)},
        likesAnswerIds: {type:new GraphQLList(GraphQLString)},
        createdAt:{type:DateType},
        updatedAt:{type:DateType},
    })
 })
 export default ForumAnswerType