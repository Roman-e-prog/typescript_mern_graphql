import { gql } from "@apollo/client";
//! after the type means it must be to set a condition take away this like in $images
const ADD_BLOGPOST = gql`
    mutation addBlogpost($blogtheme:String!, $blogdescription:String!, $blogtext:String!, $author:String!, $images:[String], $cloudinaryIds:[String]){
        addBlogpost(blogtheme:$blogtheme, blogdescription:$blogdescription, blogtext:$blogtext, author:$author, images:$images, cloudinaryIds:$cloudinaryIds){
            id,
            blogtheme,
            blogdescription,
            blogtext,
            author,
            images,
            cloudinaryIds,
        }
    }
`;
const UPDATE_BLOGPOST = gql`
    mutation updateBlogpost($id:ID!, $blogtheme:String!, $blogdescription:String!, $blogtext:String!, $author:String!, $images:[String], $cloudinaryIds:[String]){
            updateBlogpost(id:$id, blogtheme:$blogtheme, blogdescription:$blogdescription, blogtext:$blogtext, author:$author, images:$images, cloudinaryIds:$cloudinaryIds){
                id,
                blogtheme,
                blogdescription,
                blogtext,
                author,
                images,
                cloudinaryIds,
            }
    }
`;
const DELETE_BLOGPOST = gql`
    mutation deleteBlogpost($id:ID!){
        deleteBlogpost(id:$id){
            id,
        }
    }
`;

export {ADD_BLOGPOST, UPDATE_BLOGPOST, DELETE_BLOGPOST}