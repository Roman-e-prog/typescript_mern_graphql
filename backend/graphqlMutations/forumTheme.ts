import ForumTheme from "../models/ForumTheme";
import ForumThemeType from "../graphQlTypes/ForumTheme";
import { GraphQLID, GraphQLNonNull, GraphQLString } from "graphql";
const addForumTheme = {
    type:ForumThemeType,
    args:{
        forumtheme:{type:GraphQLString},
        forumressort:{type:GraphQLString},
        forumcontent:{type:GraphQLString}, 
    },
    async resolve(parent:any, args:any){
        const newForumTheme = new ForumTheme({
            forumtheme:args.forumtheme,
            forumressort:args.forumressort,
            forumcontent:args.forumcontent,
        })
        try{
            return await newForumTheme.save()
        } catch(error){
            console.log(error)
        }
    }
}
const deleteForumTheme = {
    type:ForumThemeType,
    args:{
        id:{type: new GraphQLNonNull(GraphQLID)}
    },
    async resolve(parent:any, args:any){
        try{
            return await ForumTheme.findByIdAndDelete(args.id)
        } catch(error){
            console.log(error)
        }
    }
}
const updateForumTheme = {
    type:ForumThemeType,
    args:{
        id:{type:new GraphQLNonNull(GraphQLID)},
        forumtheme:{type:GraphQLString},
        forumressort:{type:GraphQLString},
        forumcontent:{type:GraphQLString}, 
    },
    async resolve(parent:any, args:any){
        try{
            return await ForumTheme.findByIdAndUpdate(args.id,{
                $set:{
                    forumtheme:args.forumtheme,
                    forumressort:args.forumressort,
                    forumcontent:args.forumcontent
                }
            },{new:true})
        } catch(error){
            console.log(error)
        }
    }
}
export {addForumTheme, updateForumTheme, deleteForumTheme}