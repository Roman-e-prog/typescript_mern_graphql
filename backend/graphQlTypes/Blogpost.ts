import {GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID} from 'graphql';
const BlogpostType = new GraphQLObjectType({
    name:"Blogpost",
    fields:()=>({
        id:{type:GraphQLID},
        blogtheme:{type:GraphQLString},
        blogdescription:{type:GraphQLString},
        blogtext:{type:GraphQLString},
        author:{type:GraphQLString},
        images:{type: new GraphQLList(GraphQLString)},
        cloudinaryIds:{type: new GraphQLList(GraphQLString)},
    })
 })



export default BlogpostType