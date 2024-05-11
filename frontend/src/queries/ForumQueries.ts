import { gql } from "@apollo/client";

const GET_FORUMS = gql`
    query getForums{
        forums{
            id,
            username,
            userId,
            profilePicture,
            userIsAdmin,
            ressort,
            questionTheme,
            question,
            views,
            likes,
            dislikes,
            isAnswered,
            dislikesIds,
            likesIds,
            createdAt,
        }
    }
`;
const GET_FORUM = gql`
    query getForum($id:ID!){
        forum(id:$id){
            id,
            username,
            userId,
            profilePicture,
            userIsAdmin,
            ressort,
            questionTheme,
            question,
            views,
            likes,
            dislikes,
            isAnswered,
            dislikesIds,
            likesIds,
            createdAt,
        }
    }
`;
export {GET_FORUMS, GET_FORUM}