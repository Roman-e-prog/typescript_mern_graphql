import {GraphQLID, GraphQLObjectType, GraphQLString} from 'graphql'
const ForumThemeType = new GraphQLObjectType({
    name:"ForumTheme",
    fields:()=>({
        id:{type:GraphQLID},
        forumtheme:{type:GraphQLString},
        forumressort:{type:GraphQLString},
        forumcontent:{type:GraphQLString},
    })
 })
 export default ForumThemeType