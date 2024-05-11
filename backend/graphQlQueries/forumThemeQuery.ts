import ForumTheme from "../models/ForumTheme";
import ForumThemeType from "../graphQlTypes/ForumTheme";
import { GraphQLID, GraphQLList, GraphQLNonNull } from "graphql";

const forumThemes = {
    type:new GraphQLList(ForumThemeType),
    async resolve(parent:any,args:any){
        return ForumTheme.find();
    }
}
const forumTheme = {
    type:ForumThemeType,
    args:{
        id:{type:new GraphQLNonNull(GraphQLID)},
    },
    async resolve(parent:any, args:any){
        return await ForumTheme.findById(args.id)
    }
}
export {forumThemes, forumTheme}