import Forum from "../models/Forum";
import ForumType from "../graphQlTypes/Forum";
import { GraphQLID, GraphQLList, GraphQLNonNull } from "graphql";

const forums = {
    type:new GraphQLList(ForumType),
    async resolve(parent:any,args:any){
        return await Forum.find();
    }
}
const forum = {
    type:ForumType,
    args:{id:{type: new GraphQLNonNull(GraphQLID)}},
    async resolve(parent:any,args:any){
        try{
            return await Forum.findById(args.id)
        } catch(error){
            console.log(error)
        }
    }
}
export {forums, forum}