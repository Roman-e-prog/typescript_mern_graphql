import {GraphQLObjectType, 
        GraphQLID, 
        GraphQLString, 
        GraphQLBoolean, 
        GraphQLInt, 
        GraphQLList} from 'graphql'
        import DateType from './Date';
const ForumType = new GraphQLObjectType({
    name:"Forum",
    fields:()=>({
        id:{type:GraphQLID},
        username:{type:GraphQLString},
        userId:{type:GraphQLID},
        userIsAdmin:{type:GraphQLBoolean},
        profilePicture:{type:GraphQLString},
        questionTheme:{type:GraphQLString},
        question:{type:GraphQLString},
        ressort:{type:GraphQLString},
        views:{type:GraphQLInt},
        likes:{type:GraphQLInt},
        dislikes:{type:GraphQLInt},
        isAnswered:{type:GraphQLBoolean},
        dislikesIds:{type: new GraphQLList(GraphQLString)},
        likesIds:{type: new GraphQLList(GraphQLString)},
        createdAt:{type:DateType},
        updatedAt:{type:DateType},
    })
 })
 export default ForumType;