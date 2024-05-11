import Forum from "../models/Forum";
import ForumType from "../graphQlTypes/forum";
import {GraphQLID, GraphQLString, GraphQLNonNull, GraphQLBoolean} from 'graphql';

 const addForum = {
    type:ForumType,
    args:{
        username:{type:GraphQLString},
        userId:{type:GraphQLID},
        userIsAdmin:{type:GraphQLBoolean},
        profilePicture:{type:GraphQLString},
        questionTheme:{type:GraphQLString},
        question:{type:GraphQLString},
        ressort:{type:GraphQLString},
    },
    async resolve(parent:any, args:any){
        const newForum = new Forum({
        username:args.username,
        userId:args.userId,
        userIsAdmin:args.userIsAdmin,
        profilePicture:args.profilePicture,
        questionTheme:args.questionTheme,
        question:args.question,
        ressort:args.ressort,
        })
        return await newForum.save();
    }
}
const deleteForum = {
    type:ForumType,
    args:{
        id:{type: new GraphQLNonNull(GraphQLID)}
    },
    async resolve(parent:any,args:any){
        try{
            return await Forum.findByIdAndDelete(args.id);
        } catch(error){
            console.log(error)
        }
    }
}
const updateForum = {
    type:ForumType,
    args:{
        id:{type: new GraphQLNonNull(GraphQLID)},
        question:{type:GraphQLString},  
        questionTheme:{type:GraphQLString},    
    },
    async resolve(parent:any,args:any){
        try{
            return await Forum.findByIdAndUpdate(args.id, {
                $set: {
                    questionTheme:args.questionTheme,
                    question:args.question
                }
            },{new:true})
        } catch(error){
            console.log(error);
        }
    }
}
const updateViews = {
    type:ForumType,
    args:{
        id:{type:new GraphQLNonNull(GraphQLID)},
    },
    async resolve(parent:any, args:any){
        try{
            return await Forum.findOneAndUpdate({_id:args.id},{
                $inc:{views:1}, 
            })
        } catch(error){
            console.log(error)
        }
    }
}
 const updateLikes = {
    type:ForumType,
    args:{
        id:{type:new GraphQLNonNull(GraphQLID)},
        likeUserId:{type:GraphQLID},
    },
    async resolve(parent:any, args:any){
        try{
            return await Forum.findOneAndUpdate({_id:args.id},{
                $inc:{likes:1}, $addToSet:{likesIds:args.likeUserId}
            })
        } catch(error){
            console.log(error)
        }
    }
}
const updateDislikes = {
    type:ForumType,
    args:{
        id:{type:new GraphQLNonNull(GraphQLID)},
        dislikeUserId:{type:GraphQLID},
    },
    async resolve(parent:any, args:any){
        try{
            return await Forum.findOneAndUpdate({_id:args.id},{
                $inc:{dislikes:1}, $addToSet:{dislikesIds:args.dislikeUserId}
            })
        } catch(error){
            console.log(error)
        }
    }
}
export {addForum, deleteForum, updateForum, updateViews, updateLikes, updateDislikes}