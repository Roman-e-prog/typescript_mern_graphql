import { gql } from "@apollo/client";

const GET_BLOGPOSTS = gql`
    query getBlogposts{
        blogposts{
            id,
            blogtheme,
            blogdescription,
            blogtext,
            author,
            images,
        }
    }
`;
const GET_BLOGPOST = gql`
    query getBlogpost($id:ID!){
        blogpost(id:$id){
            id,
            blogtheme,
            blogdescription,
            blogtext,
            author,
            images,
        }
    }
`;
export {GET_BLOGPOSTS, GET_BLOGPOST}