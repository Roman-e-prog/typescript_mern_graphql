import { gql } from "@apollo/client"

const ADD_FORUM = gql`
    mutation addForum($username:String!, $userId:ID!, $ressort:String!, $questionTheme:String!, $question:String!, $userIsAdmin:Boolean, $profilePicture:String){
        addForum(username:$username, userId:$userId, ressort:$ressort, questionTheme:$questionTheme,question:$question, userIsAdmin:$userIsAdmin, profilePicture:$profilePicture){
            id,
            username,
            userId,
            ressort,
            questionTheme,
            question,
            userIsAdmin,
            profilePicture
        }
    }
`;
const DELETE_FORUM = gql`
    mutation deleteForum($id:ID!){
        deleteForum(id:$id){
            id,
        }
    }
`;
const UPDATE_FORUM = gql`
    mutation updateForum($id:ID!, $questionTheme:String, $question:String){
        updateForum(id:$id, questionTheme:$questionTheme, question:$question){
            id,
            questionTheme,
            question,
        }
    }
`;
const UPDATE_VIEWS = gql`
    mutation updateViews($id:ID!){
        updateViews(id:$id){
            id,
            views,
        }
    }
`;
const UPDATE_LIKES = gql`
    mutation updateLikes($id:ID! $likeUserId:ID!){
        updateLikes(id:$id, likeUserId:$likeUserId){
            id,
            likes,
        }
    }
`;
const UPDATE_DISLIKES = gql`
    mutation updateDislikes($id:ID!, $dislikeUserId:ID!){
        updateDislikes(id:$id dislikeUserId: $dislikeUserId){
            id,
            dislikes,
        }
    }
`;
export {ADD_FORUM, DELETE_FORUM, UPDATE_FORUM, UPDATE_VIEWS, UPDATE_LIKES, UPDATE_DISLIKES}