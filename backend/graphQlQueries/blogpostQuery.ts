import Blogpost from "../models/Blogpost";
import BlogpostType from "../graphQlTypes/Blogpost";
import { GraphQLID, GraphQLList, GraphQLNonNull } from "graphql";
const blogposts = {
    type: new GraphQLList(BlogpostType),
   async resolve(parent:any, args:any){
    return await Blogpost.find();
   }
}
const blogpost = {
    type:BlogpostType,
    args:{
        id:{type:new GraphQLNonNull(GraphQLID)}},
        async resolve(parent:any, args:any){
            try{
                const result = await Blogpost.findById(args.id)
                return result 
            } catch(error){
                console.log(error)
            }
        }
    }
    export {blogposts, blogpost}