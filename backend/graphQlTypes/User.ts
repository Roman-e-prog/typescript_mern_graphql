import {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean} from 'graphql';
const UserType = new GraphQLObjectType({
    name:"User",
    fields:()=>({
        id:{type:GraphQLID, resolve: (user) => user._id},
        vorname:{type:GraphQLString},
        nachname:{type:GraphQLString},
        username:{type:GraphQLString},
        email:{type:GraphQLString},
        profilePicture:{type:GraphQLString},
        cloudinaryId:{type:GraphQLString},
        password:{type:GraphQLString},
        accessToken:{type:GraphQLString},
        isAdmin:{type:GraphQLBoolean},
    })
 })
 export default UserType