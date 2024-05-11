import Blogpost from "../models/Blogpost";
import BlogpostType from "../graphQlTypes/Blogpost";
import { GraphQLNonNull, GraphQLString, GraphQLID , GraphQLList} from "graphql";
const addBlogpost = {
    type:BlogpostType,
    args:{
        blogtheme:{type:GraphQLString},
        blogdescription:{type:GraphQLString},
        blogtext:{type:GraphQLString},
        author:{type:GraphQLString},
        images:{type: new GraphQLList(GraphQLString)},
        cloudinaryIds:{type: new GraphQLList(GraphQLString)},
    },
    async resolve(parent:any, args:any){
        console.log(args, "Here I am logging the incoming data")
        try{
            const newBlogpost = new Blogpost({
                blogtheme:args.blogtheme,
                blogdescription:args.blogdescription,
                blogtext:args.blogtext,
                author:args.author,
                images:args.images,
                cloudinaryIds:args.cloudinaryIds,
            })
            return await newBlogpost.save();
        } catch(error){
            console.log(error)
            throw new Error("Upload fehlgeschlagen")
        }
    }
}
const updateBlogpost = {
    type:BlogpostType,
    args:{
        id:{type:new GraphQLNonNull(GraphQLID)},
        blogtheme:{type:GraphQLString},
        blogdescription:{type:GraphQLString},
        blogtext:{type:GraphQLString},
        author:{type:GraphQLString},
        images:{type:new GraphQLList(GraphQLString)},
        cloudinaryIds:{type:new GraphQLList(GraphQLString)},
    },
    async resolve(parent:any, args:any){
    try{
        return await Blogpost.findByIdAndUpdate(args.id,{
            $set:{
                blogtheme:args.blogtheme,
                blogdescription:args.blogdescription,
                blogtext:args.blogtext,
                author:args.author,
                images:args.images,
                cloudinaryIds:args.cloudinaryIds,
            }}, {new:true})
        } catch(error){
            console.log(error)
        }
    }
}
const deleteBlogpost = {
    type:BlogpostType,
    args:{id:{type:new GraphQLNonNull(GraphQLID)}},
    async resolve(parent:any, args:any){
        return await Blogpost.findByIdAndDelete(args.id)
    }
}
export {addBlogpost, deleteBlogpost, updateBlogpost}