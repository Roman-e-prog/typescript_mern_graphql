import ForumAnswer from "../models/ForumAnswer";
import ForumAnswerType from "../graphQlTypes/ForumAnswer";
import { GraphQLID, GraphQLList, GraphQLNonNull } from "graphql";
const forumAnswers = {
    type: new GraphQLList(ForumAnswerType),
    async resolve(parent:any, args:any){
        try{
            return await ForumAnswer.find();
        } catch(error){
            console.log(error)
        }
        
    }
}
const forumAnswer = {
    type:ForumAnswerType,
    args:{id:{type:new GraphQLNonNull(GraphQLID)}},
    async resolve(parent:any, args:any){
        try{
            return await ForumAnswer.findById(args.id)
        } catch(error){
            console.log(error)
        }
    }
}
export {forumAnswers, forumAnswer}