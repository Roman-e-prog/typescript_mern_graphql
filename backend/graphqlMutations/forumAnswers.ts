import ForumAnswer from "../models/ForumAnswer";
import Forum from "../models/Forum";
import ForumAnswerType from "../graphQlTypes/ForumAnswer";
import {GraphQLID, GraphQLString, GraphQLNonNull, GraphQLBoolean} from 'graphql';
 const addAnswer = {
    type:ForumAnswerType,
    args:{
        questionId:{type: new GraphQLNonNull(GraphQLID)},
        senderId: {type: new GraphQLNonNull(GraphQLID)},
        sendername:{type:GraphQLString},
        senderProfilePicture:{type:GraphQLString},
        answer:{type:GraphQLString},
        answererUsername:{type:GraphQLString},
        answererId:{type:GraphQLID},
    },
    async resolve(parent:any,args:any){
        const newForumAnswer = new ForumAnswer({
            questionId: args.questionId,
            senderId: args.senderId,
            sendername: args.sendername,
            senderProfilePicture: args.senderProfilePicture,
            answer: args.answer,
            answererUsername: args.answererUsername,
            answererId: args.answererId,
        })
        try{
            return await newForumAnswer.save();
        } catch(error){
            console.log(error)
        }
    }
}
const deleteAnswer = {
    type:ForumAnswerType,
    args:{id:{type: new GraphQLNonNull(GraphQLID)}},
    async resolve(parent:any,args:any){
        return await ForumAnswer.findByIdAndDelete(args.id)
    }
}
const updateAnswer = {
    type:ForumAnswerType,
    args:{
        id:{type:new GraphQLNonNull(GraphQLID)},
        answer:{type:GraphQLString},
    },
    async resolve(parent:any, args:any){
        try{
            const updatedForumAnswer = await ForumAnswer.findByIdAndUpdate(args.id, {
                $set:{answer:args.answer}
            },{new:true});
            return updatedForumAnswer;
        } catch(error){
            console.log(error)
        }     
    }
}
const updateAnswerlikes = {
    type:ForumAnswerType,
    args:{
        id:{type: new GraphQLNonNull(GraphQLID)},
        answerLikeUserId:{type:GraphQLID},
    },
    async resolve(parent:any, args:any){
        try{
            return await ForumAnswer.findOneAndUpdate({_id:args.id},{
                $inc:{likes:1}, $addToSet:{likesAnswerIds:args.answerLikeUserId}
            })
        } catch(error){
            console.log(error)
        }  
    }
}
const updateAnswerdislikes = {
    type:ForumAnswerType,
    args:{
        id:{type: new GraphQLNonNull(GraphQLID)},
        answerDislikeUserId:{type:GraphQLID},
    },
    async resolve(parent:any, args:any){
        try{
            return await ForumAnswer.findOneAndUpdate({_id:args.id},{
                $inc:{likes:1}, $addToSet:{dislikesAnswerIds:args.answerDislikeUserId}
            })
        } catch(error){
            console.log(error)
        }  
    }
}
const hasSolved = {
    type:ForumAnswerType,
    args:{
        id:{type: new GraphQLNonNull(GraphQLID)},
        questionId:{type: new GraphQLNonNull(GraphQLID)},
    },
    async resolve(parent:any, args:any){
        try{
            const solvedAnswer = await ForumAnswer.findOneAndUpdate({_id:args.id},{
                $set:{hasSolved:true}
            })
            await Forum.findOneAndUpdate({_id:args.questionId},{
                $set:{isAnswered:true}
            })
            return solvedAnswer
        } catch(error){
            console.log(error)
        }
    }
}
export {addAnswer,deleteAnswer, updateAnswer, updateAnswerlikes, updateAnswerdislikes, hasSolved}